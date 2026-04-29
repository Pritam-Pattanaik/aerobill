"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getCategoriesPublic } from "@/app/actions/menu"
import { getTableByNumber } from "@/app/actions/tables"
import { placeOrder, CartItem, getActiveOrderForTable } from "@/app/actions/orders"

type Product = { id: string; name: string; price: number; isVeg: boolean; isAvailable: boolean; image: string | null }
type Category = { id: string; name: string; products: Product[] }

export default function TableMenu() {
    const params = useParams()
    const slug = params.slug as string
    const tableNumber = parseInt(params.tableId as string)

    const [categories, setCategories] = useState<Category[]>([])
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [tableDbId, setTableDbId] = useState<string | null>(null)
    const [restaurantName, setRestaurantName] = useState("")
    const [loading, setLoading] = useState(true)
    const [ordering, setOrdering] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Customer Info
    const [guestName, setGuestName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")

    // Tracking State
    const [activeOrder, setActiveOrder] = useState<any>(null)
    const [showGreeting, setShowGreeting] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setError(null)
            try {
                const tableResult = await getTableByNumber(slug, tableNumber)
                if (tableResult.success && tableResult.table && tableResult.restaurant) {
                    setTableDbId(tableResult.table.id)
                    setRestaurantName(tableResult.restaurant.name)

                    // Check for existing active order
                    const orderResult = await getActiveOrderForTable(tableResult.table.id)
                    if (orderResult.success && orderResult.order) {
                        setActiveOrder(orderResult.order)
                    }
                } else {
                    setError("Table not found")
                    return
                }

                const menuResult = await getCategoriesPublic(slug)
                if (menuResult.success) {
                    setCategories(menuResult.categories)
                    if (menuResult.categories.length > 0) setActiveCategory(menuResult.categories[0].id)
                }
            } catch {
                setError("Failed to load menu")
            } finally {
                setLoading(false)
            }
        }
        fetchData()

        // Load saved info
        const savedName = localStorage.getItem('guestName')
        const savedPhone = localStorage.getItem('customerPhone')
        if (savedName) setGuestName(savedName)
        if (savedPhone) setCustomerPhone(savedPhone)
    }, [slug, tableNumber])

    // Poll for order updates
    useEffect(() => {
        if (!tableDbId || !activeOrder) return

        // If order exists but not unpaid/active, stop polling
        if (activeOrder.paymentStatus === 'PAID') {
            setActiveOrder(null)
            return
        }

        const interval = setInterval(async () => {
            const res = await getActiveOrderForTable(tableDbId)
            if (res.success && res.order) {
                setActiveOrder(res.order)
                if (res.order.status === 'READY') {
                    setShowGreeting(true)
                }
            } else {
                // Order might be resolved/paid
                setActiveOrder(null)
            }
        }, 10000)
        return () => clearInterval(interval)
    }, [tableDbId, activeOrder])

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.productId === product.id)
            if (existing) return prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1 }]
        })
    }

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0))
    }

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    const handlePlaceOrder = async () => {
        if (!tableDbId || cart.length === 0 || ordering) return
        if (!customerPhone.trim()) {
            alert("Please enter your phone number")
            return
        }

        setOrdering(true)

        // Save to localStorage
        if (guestName.trim()) localStorage.setItem('guestName', guestName.trim())
        if (customerPhone.trim()) localStorage.setItem('customerPhone', customerPhone.trim())

        try {
            const result = await placeOrder(tableDbId, cart, guestName.trim() || undefined, customerPhone.trim())
            if (result.success) {
                setActiveOrder(result.order)
                setCart([])
                setIsCartOpen(false)
            }
            else setError(result.error || "Failed to place order")
        } catch { setError("Failed to place order") } finally {
            setOrdering(false)
        }
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        let timeGreeting = "Good Morning"
        if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon"
        else if (hour >= 17) timeGreeting = "Good Evening"

        return `${timeGreeting}, ${guestName || 'Valued Customer'}! Your food is ready. Have a nice day.`
    }

    const getProgress = (status: string) => {
        if (status === 'PENDING') return 25
        if (status === 'COOKING') return 60
        if (status === 'READY') return 100
        return 0
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    if (error) return <div className="min-h-screen flex items-center justify-center"><div className="glass-card p-8 text-center"><div className="text-2xl text-red-500 mb-4">⚠️</div><p>{error}</p></div></div>

    // TRACKING VIEW
    if (activeOrder) return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
            <div className="glass-card w-full max-w-md p-8 relative overflow-hidden">
                {/* Greeting Alert */}
                {showGreeting && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 text-center animate-fadeIn">
                        <div className="bg-[#1a1a2e] border border-[var(--primary)] rounded-2xl p-6 shadow-[0_0_50px_rgba(255,107,53,0.3)]">
                            <div className="text-6xl mb-4 animate-bounce">😋</div>
                            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Order Ready!</h2>
                            <p className="text-xl text-gray-200 leading-relaxed font-medium">
                                {getGreeting()}
                            </p>
                            <button onClick={() => setShowGreeting(false)} className="mt-8 btn-primary w-full">
                                Enjoy!
                            </button>
                        </div>
                    </div>
                )}

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Order Tracking</h1>
                    <p className="text-gray-400 text-sm">Order ID: #{activeOrder.id.slice(-6).toUpperCase()}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-10 relative">
                    <div className="h-2 bg-[var(--card)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--warning)] transition-all duration-1000 ease-in-out relative"
                            style={{ width: `${getProgress(activeOrder.status)}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-3 text-xs font-medium text-gray-400">
                        <span className={activeOrder.status === 'PENDING' ? 'text-[var(--primary)]' : ''}>Order Placed</span>
                        <span className={activeOrder.status === 'COOKING' ? 'text-[var(--primary)]' : ''}>Cooking</span>
                        <span className={activeOrder.status === 'READY' ? 'text-[var(--success)]' : ''}>Ready</span>
                    </div>
                </div>

                {/* Status Display */}
                <div className="text-center py-6 bg-[var(--card)]/50 rounded-2xl mb-8 border border-[var(--border)]">
                    {activeOrder.status === 'PENDING' && <div className="text-5xl mb-4 animate-pulse">⏳</div>}
                    {activeOrder.status === 'COOKING' && <div className="text-5xl mb-4 animate-bounce">🍳</div>}
                    {activeOrder.status === 'READY' && <div className="text-5xl mb-4 animate-pulse">✅</div>}

                    <h2 className="text-xl font-bold text-[var(--foreground)]">
                        {activeOrder.status === 'PENDING' && "Waiting for confirmation..."}
                        {activeOrder.status === 'COOKING' && "Preparing your food..."}
                        {activeOrder.status === 'READY' && "Ready to serve!"}
                    </h2>
                </div>

                {/* Order Summary */}
                <div className="border-t border-[var(--border)] pt-6">
                    <h3 className="font-semibold mb-4 text-gray-400 text-sm uppercase tracking-wider">Order Summary</h3>
                    <div className="space-y-3 max-h-40 overflow-y-auto mb-4">
                        {activeOrder.items?.map((item: any) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.quantity}× {item.product.name}</span>
                                <span className="text-gray-400">₹{item.priceAtTime * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-[var(--border)] pt-4">
                        <span>Total Status</span>
                        <span className="text-[var(--primary)]">₹{activeOrder.totalAmount}</span>
                    </div>
                </div>

                <button
                    onClick={() => setActiveOrder(null)}
                    className="w-full mt-6 py-3 text-sm text-gray-500 hover:text-white transition"
                >
                    Start New Order
                </button>
            </div>
        </div>
    )

    // ORDERING VIEW
    return (
        <div className="min-h-screen pb-24">
            <header className="sticky top-0 z-40 glass-card rounded-none border-t-0 border-x-0 py-4 px-4">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    <div>
                        <h1 className="text-xl font-bold text-[var(--primary)]">{restaurantName}</h1>
                        <p className="text-sm text-gray-400">Table {tableNumber}</p>
                    </div>
                    <button onClick={() => setIsCartOpen(true)} className="btn-primary relative flex items-center gap-2">
                        🛒 Cart
                        {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">{cartCount}</span>}
                    </button>
                </div>
            </header>

            <div className="sticky top-[72px] z-30 bg-[var(--background)] border-b border-[var(--border)] overflow-x-auto">
                <div className="flex gap-2 p-4 max-w-4xl mx-auto">
                    {categories.map(cat => (
                        <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === cat.id ? "bg-[var(--primary)] text-white" : "bg-[var(--card)] text-gray-400"}`}>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <main className="p-4 max-w-4xl mx-auto">
                {categories.filter(cat => cat.id === activeCategory).map(category => (
                    <div key={category.id} className="grid gap-4 md:grid-cols-2">
                        {category.products.map(product => (
                            <div key={product.id} className="glass-card p-4 flex gap-4 hover:border-[var(--primary)] transition-all">
                                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[var(--card)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🍽️</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2 mb-1">
                                        <div className={product.isVeg ? "veg-indicator" : "nonveg-indicator"} />
                                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                    </div>
                                    <p className="text-lg font-bold text-[var(--primary)] mb-2">₹{product.price.toFixed(0)}</p>
                                    {cart.find(item => item.productId === product.id) ? (
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => updateQuantity(product.id, -1)} className="w-8 h-8 rounded-full bg-[var(--card)]">−</button>
                                            <span className="font-semibold">{cart.find(item => item.productId === product.id)?.quantity}</span>
                                            <button onClick={() => updateQuantity(product.id, 1)} className="w-8 h-8 rounded-full bg-[var(--primary)] text-white">+</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => addToCart(product)} className="text-sm px-4 py-1.5 rounded-full bg-[var(--card)] border border-[var(--primary)] text-[var(--primary)]">Add +</button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {category.products.length === 0 && <div className="col-span-2 text-center py-12 text-gray-500">No items available</div>}
                    </div>
                ))}
            </main>

            {isCartOpen && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setIsCartOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-full max-w-md glass-card rounded-l-2xl flex flex-col">
                        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
                            <h2 className="text-xl font-bold">Your Order</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-2xl text-gray-400">×</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12 text-gray-500"><div className="text-4xl mb-4">🛒</div><p>Your cart is empty</p></div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map(item => (
                                        <div key={item.productId} className="flex items-center justify-between p-3 bg-[var(--card)] rounded-lg">
                                            <div><h4 className="font-medium">{item.name}</h4><p className="text-sm text-gray-400">₹{item.price} × {item.quantity}</p></div>
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => updateQuantity(item.productId, -1)} className="w-7 h-7 rounded-full bg-[var(--background)]">−</button>
                                                <span className="font-semibold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.productId, 1)} className="w-7 h-7 rounded-full bg-[var(--primary)] text-white">+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-[var(--border)]">
                                {/* Guest Info Inputs */}
                                <div className="space-y-4 mb-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Your Name (Optional)</label>
                                        <input
                                            type="text"
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            placeholder="e.g., Rahul"
                                            className="input"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder="e.g., 9876543210"
                                            className="input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between mb-4 text-lg"><span>Total</span><span className="font-bold text-[var(--primary)]">₹{cartTotal.toFixed(0)}</span></div>
                                <button onClick={handlePlaceOrder} disabled={ordering} className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {ordering ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Placing Order...
                                        </>
                                    ) : "Place Order"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {cart.length > 0 && !isCartOpen && (
                <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
                    <button onClick={() => setIsCartOpen(true)} className="w-full btn-primary flex items-center justify-between py-4 px-6 rounded-2xl">
                        <span className="bg-white/20 px-2 py-1 rounded text-sm">{cartCount} items</span>
                        <span className="font-bold">₹{cartTotal.toFixed(0)} →</span>
                    </button>
                </div>
            )}
        </div>
    )
}
