"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getCategories } from "@/app/actions/menu"
import { getTableByNumber } from "@/app/actions/tables"
import { placeOrder, CartItem } from "@/app/actions/orders"

type Product = {
    id: string
    name: string
    price: number
    isVeg: boolean
    isAvailable: boolean
    image: string | null
}

type Category = {
    id: string
    name: string
    products: Product[]
}

export default function TableMenu() {
    const params = useParams()
    const tableId = params.tableId as string

    const [categories, setCategories] = useState<Category[]>([])
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [tableDbId, setTableDbId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch table info
                const tableNumber = parseInt(tableId)
                const tableResult = await getTableByNumber(tableNumber)
                if (tableResult.success && tableResult.table) {
                    setTableDbId(tableResult.table.id)
                } else {
                    setError("Table not found")
                    return
                }

                // Fetch menu
                const menuResult = await getCategories()
                if (menuResult.success) {
                    setCategories(menuResult.categories)
                    if (menuResult.categories.length > 0) {
                        setActiveCategory(menuResult.categories[0].id)
                    }
                }
            } catch (err) {
                setError("Failed to load menu")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [tableId])

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                },
            ]
        })
    }

    const updateQuantity = (productId: string, delta: number) => {
        setCart((prev) => {
            return prev
                .map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + delta }
                        : item
                )
                .filter((item) => item.quantity > 0)
        })
    }

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    const handlePlaceOrder = async () => {
        if (!tableDbId || cart.length === 0) return

        try {
            const result = await placeOrder(tableDbId, cart)
            if (result.success) {
                setOrderPlaced(true)
                setCart([])
                setIsCartOpen(false)
            } else {
                setError(result.error || "Failed to place order")
            }
        } catch (err) {
            setError("Failed to place order")
            console.error(err)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading menu...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-8 text-center">
                    <div className="text-2xl text-red-500 mb-4">⚠️</div>
                    <p className="text-lg">{error}</p>
                </div>
            </div>
        )
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card p-8 text-center max-w-md animate-fadeIn">
                    <div className="text-6xl mb-6">🎉</div>
                    <h1 className="text-2xl font-bold mb-4 text-[var(--primary)]">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Your order has been sent to the kitchen. We'll prepare it right away.
                    </p>
                    <button
                        onClick={() => setOrderPlaced(false)}
                        className="btn-primary"
                    >
                        Order More
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 glass-card rounded-none border-t-0 border-x-0 py-4 px-4">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    <div>
                        <h1 className="text-xl font-bold text-[var(--primary)]">Aerobill</h1>
                        <p className="text-sm text-gray-400">Table {tableId}</p>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="btn-primary relative flex items-center gap-2"
                    >
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Category tabs */}
            <div className="sticky top-[72px] z-30 bg-[var(--background)] border-b border-[var(--border)] overflow-x-auto">
                <div className="flex gap-2 p-4 max-w-4xl mx-auto">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === category.id
                                    ? "bg-[var(--primary)] text-white"
                                    : "bg-[var(--card)] text-gray-400 hover:bg-[var(--card-hover)]"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu items */}
            <main className="p-4 max-w-4xl mx-auto">
                {categories
                    .filter((cat) => cat.id === activeCategory)
                    .map((category) => (
                        <div key={category.id} className="grid gap-4 md:grid-cols-2">
                            {category.products.map((product) => (
                                <div
                                    key={product.id}
                                    className="glass-card p-4 flex gap-4 animate-fadeIn hover:border-[var(--primary)] transition-all"
                                >
                                    {/* Product image placeholder */}
                                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[var(--card)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🍽️</span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-2 mb-1">
                                            <div className={product.isVeg ? "veg-indicator" : "nonveg-indicator"} />
                                            <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                        </div>
                                        <p className="text-lg font-bold text-[var(--primary)] mb-2">
                                            ₹{product.price.toFixed(0)}
                                        </p>

                                        {/* Quantity controls or Add button */}
                                        {cart.find((item) => item.productId === product.id) ? (
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(product.id, -1)}
                                                    className="w-8 h-8 rounded-full bg-[var(--card)] hover:bg-[var(--card-hover)] flex items-center justify-center text-lg"
                                                >
                                                    −
                                                </button>
                                                <span className="font-semibold">
                                                    {cart.find((item) => item.productId === product.id)?.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(product.id, 1)}
                                                    className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="text-sm px-4 py-1.5 rounded-full bg-[var(--card)] border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all"
                                            >
                                                Add +
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {category.products.length === 0 && (
                                <div className="col-span-2 text-center py-12 text-gray-500">
                                    No items available in this category
                                </div>
                            )}
                        </div>
                    ))}
            </main>

            {/* Cart sidebar */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Cart panel */}
                    <div className="absolute right-0 top-0 h-full w-full max-w-md glass-card rounded-l-2xl animate-slideUp flex flex-col">
                        <div className="p-6 border-b border-[var(--border)]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Your Order</h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-2xl text-gray-400 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <div className="text-4xl mb-4">🛒</div>
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.productId}
                                            className="flex items-center justify-between p-3 bg-[var(--card)] rounded-lg"
                                        >
                                            <div>
                                                <h4 className="font-medium">{item.name}</h4>
                                                <p className="text-sm text-gray-400">
                                                    ₹{item.price} × {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, -1)}
                                                    className="w-7 h-7 rounded-full bg-[var(--background)] flex items-center justify-center"
                                                >
                                                    −
                                                </button>
                                                <span className="font-semibold w-4 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, 1)}
                                                    className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-[var(--border)]">
                                <div className="flex justify-between mb-4 text-lg">
                                    <span>Total</span>
                                    <span className="font-bold text-[var(--primary)]">
                                        ₹{cartTotal.toFixed(0)}
                                    </span>
                                </div>
                                <button
                                    onClick={handlePlaceOrder}
                                    className="btn-primary w-full text-lg"
                                >
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Floating cart button (mobile) */}
            {cart.length > 0 && !isCartOpen && (
                <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="w-full btn-primary flex items-center justify-between py-4 px-6 rounded-2xl"
                    >
                        <span className="flex items-center gap-2">
                            <span className="bg-white/20 px-2 py-1 rounded text-sm">
                                {cartCount} items
                            </span>
                        </span>
                        <span className="font-bold">₹{cartTotal.toFixed(0)} →</span>
                    </button>
                </div>
            )}
        </div>
    )
}
