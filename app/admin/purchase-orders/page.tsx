"use client"

import { useState, useEffect } from "react"
import { getMarketplaceProductsInStock } from "@/app/actions/marketplace"
import {
    getPurchaseOrders,
    createMarketplaceOrder,
    updatePurchaseOrderStatus,
    createDailyPurchase,
    getDailyPurchases,
    deleteDailyPurchase,
    getPurchaseHistory
} from "@/app/actions/inventory"
import { POStatus } from "@prisma/client"

type MarketplaceProduct = {
    id: string
    name: string
    description: string | null
    price: number
    unit: string
    category: string | null
    minOrder: number
}

type OrderItem = {
    marketplaceProduct: MarketplaceProduct
    quantity: number
    unitPrice: number
}

type PurchaseOrder = {
    id: string
    orderNumber: string
    status: string
    totalAmount: number
    estimatedDelivery: string | null
    items: OrderItem[]
    createdAt: string
}

type DailyPurchaseItem = {
    id: string
    name: string
    quantity: number
    unit: string
    price: number
    createdAt: string
}

type TabType = "orders" | "daily" | "history"

export default function MarketplacePage() {
    const [activeTab, setActiveTab] = useState<TabType>("orders")
    const [orders, setOrders] = useState<PurchaseOrder[]>([])
    const [products, setProducts] = useState<MarketplaceProduct[]>([])
    const [dailyPurchases, setDailyPurchases] = useState<DailyPurchaseItem[]>([])
    const [dailyTotal, setDailyTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [showShop, setShowShop] = useState(false)
    const [cart, setCart] = useState<Record<string, number>>({})

    // Daily purchase form
    const [dailyForm, setDailyForm] = useState({ name: "", quantity: "", unit: "kg", price: "" })
    const [submitting, setSubmitting] = useState(false)

    // History
    const [historyDate, setHistoryDate] = useState(new Date().toISOString().split("T")[0])
    const [historyData, setHistoryData] = useState<{
        marketplaceOrders: PurchaseOrder[]
        dailyPurchases: DailyPurchaseItem[]
        summary: { marketplaceTotal: number; dailyTotal: number; grandTotal: number }
    } | null>(null)

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if (activeTab === "daily") loadDailyPurchases()
        if (activeTab === "history") loadHistory()
    }, [activeTab, historyDate])

    async function loadData() {
        setLoading(true)
        const [ordersRes, productsRes] = await Promise.all([
            getPurchaseOrders(),
            getMarketplaceProductsInStock()
        ])
        if (ordersRes.success) setOrders(ordersRes.orders as unknown as PurchaseOrder[])
        if (productsRes.success) setProducts(productsRes.products as MarketplaceProduct[])
        setLoading(false)
    }

    async function loadDailyPurchases() {
        const res = await getDailyPurchases()
        if (res.success) {
            setDailyPurchases(res.purchases as unknown as DailyPurchaseItem[])
            setDailyTotal(res.total)
        }
    }

    async function loadHistory() {
        const res = await getPurchaseHistory(historyDate)
        if (res.success) {
            setHistoryData({
                marketplaceOrders: res.marketplaceOrders as unknown as PurchaseOrder[],
                dailyPurchases: res.dailyPurchases as unknown as DailyPurchaseItem[],
                summary: res.summary
            })
        }
    }

    // Cart functions
    function addToCart(productId: string, minOrder: number) {
        setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + minOrder }))
    }

    function updateCartQty(productId: string, qty: number) {
        if (qty <= 0) {
            setCart(prev => { const next = { ...prev }; delete next[productId]; return next })
        } else {
            setCart(prev => ({ ...prev, [productId]: qty }))
        }
    }

    async function handlePlaceOrder() {
        const items = Object.entries(cart).map(([productId, quantity]) => {
            const product = products.find(p => p.id === productId)!
            return { marketplaceProductId: productId, quantity, unitPrice: product.price }
        })
        if (items.length === 0) return alert("Add items to cart first")
        await createMarketplaceOrder({ items })
        setCart({})
        setShowShop(false)
        loadData()
    }

    async function handleDelivered(id: string) {
        await updatePurchaseOrderStatus(id, POStatus.RECEIVED)
        loadData()
    }

    // Daily purchase
    async function handleAddDailyPurchase(e: React.FormEvent) {
        e.preventDefault()
        if (!dailyForm.name || !dailyForm.quantity || !dailyForm.price) {
            alert("Please fill all fields")
            return
        }
        setSubmitting(true)
        try {
            const result = await createDailyPurchase({
                name: dailyForm.name,
                quantity: parseFloat(dailyForm.quantity),
                unit: dailyForm.unit,
                price: parseFloat(dailyForm.price)
            })
            if (result.success) {
                setDailyForm({ name: "", quantity: "", unit: "kg", price: "" })
                await loadDailyPurchases()
            } else {
                alert(result.error || "Failed to add purchase")
            }
        } catch (error) {
            console.error("Error adding daily purchase:", error)
            alert("Failed to add purchase")
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDeleteDaily(id: string) {
        if (confirm("Delete this entry?")) {
            await deleteDailyPurchase(id)
            loadDailyPurchases()
        }
    }

    const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = products.find(p => p.id === id)
        return sum + (product?.price || 0) * qty
    }, 0)

    const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        ORDERED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        RECEIVED: "bg-green-500/20 text-green-400 border-green-500/30"
    }

    const grouped = products.reduce((acc, p) => {
        const cat = p.category || "Other"
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(p)
        return acc
    }, {} as Record<string, MarketplaceProduct[]>)

    if (loading) return <div className="p-6 text-center">Loading...</div>

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Marketplace</h1>
                    <p className="text-gray-400 text-sm">Order supplies & track purchases</p>
                </div>
                <button onClick={() => setShowShop(true)} className="btn-primary py-2">
                    🛒 Browse & Order
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {[
                    { id: "orders" as const, label: "Marketplace Orders", icon: "📦" },
                    { id: "daily" as const, label: "Daily Purchase", icon: "📝" },
                    { id: "history" as const, label: "History", icon: "📅" }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === tab.id
                            ? "bg-[var(--primary)] text-white"
                            : "bg-[var(--card)] text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "orders" && (
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="glass-card p-8 text-center text-gray-500">
                            No orders yet. Click &quot;Browse & Order&quot; to place your first order.
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="glass-card p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold">{order.orderNumber}</h3>
                                        <p className="text-xs text-gray-400">
                                            Ordered: {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs border ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                        <p className="text-lg font-semibold mt-1">₹{order.totalAmount.toFixed(0)}</p>
                                    </div>
                                </div>
                                {order.estimatedDelivery && order.status !== "RECEIVED" && (
                                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 mb-3 text-sm">
                                        🚚 Expected: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                    </div>
                                )}
                                <div className="bg-[var(--background)] rounded-lg p-3 mb-3">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex justify-between py-1 text-sm">
                                            <span>{item.marketplaceProduct?.name || "Unknown"}</span>
                                            <span>{item.quantity} × ₹{item.unitPrice}</span>
                                        </div>
                                    ))}
                                </div>
                                {order.status === "ORDERED" && (
                                    <button onClick={() => handleDelivered(order.id)} className="btn-primary py-2 w-full">
                                        ✓ Mark as Delivered
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === "daily" && (
                <div>
                    {/* Add Form */}
                    <form onSubmit={handleAddDailyPurchase} className="glass-card p-4 mb-6">
                        <h3 className="font-semibold mb-4">Add Daily Purchase</h3>
                        <div className="grid gap-4 md:grid-cols-5">
                            <input
                                type="text"
                                placeholder="Item name"
                                value={dailyForm.name}
                                onChange={e => setDailyForm({ ...dailyForm, name: e.target.value })}
                                className="input"
                                required
                            />
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Quantity"
                                value={dailyForm.quantity}
                                onChange={e => setDailyForm({ ...dailyForm, quantity: e.target.value })}
                                className="input"
                                required
                            />
                            <select
                                value={dailyForm.unit}
                                onChange={e => setDailyForm({ ...dailyForm, unit: e.target.value })}
                                className="input"
                            >
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="L">L</option>
                                <option value="mL">mL</option>
                                <option value="pcs">pcs</option>
                                <option value="dozen">dozen</option>
                            </select>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Total Price (₹)"
                                value={dailyForm.price}
                                onChange={e => setDailyForm({ ...dailyForm, price: e.target.value })}
                                className="input"
                                required
                            />
                            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
                                {submitting ? "Adding..." : "+ Add"}
                            </button>
                        </div>
                    </form>

                    {/* Today's Summary */}
                    <div className="glass-card p-4 mb-4 flex items-center justify-between">
                        <span className="text-gray-400">Today&apos;s Total</span>
                        <span className="text-2xl font-bold text-[var(--primary)]">₹{dailyTotal.toLocaleString()}</span>
                    </div>

                    {/* List */}
                    <div className="space-y-2">
                        {dailyPurchases.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">No purchases added today</div>
                        ) : (
                            dailyPurchases.map(item => (
                                <div key={item.id} className="glass-card p-3 flex items-center justify-between">
                                    <div>
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-gray-400 ml-2">{item.quantity} {item.unit}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold">₹{item.price}</span>
                                        <button onClick={() => handleDeleteDaily(item.id)} className="text-red-400 hover:text-red-300">
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {activeTab === "history" && (
                <div>
                    {/* Date Picker */}
                    <div className="glass-card p-4 mb-6">
                        <div className="flex items-center gap-4">
                            <label className="text-gray-400">Select Date:</label>
                            <input
                                type="date"
                                value={historyDate}
                                onChange={e => setHistoryDate(e.target.value)}
                                className="input w-auto"
                            />
                        </div>
                    </div>

                    {historyData && (
                        <>
                            {/* Summary Cards */}
                            <div className="grid gap-4 md:grid-cols-3 mb-6">
                                <div className="glass-card p-4">
                                    <p className="text-sm text-gray-400">Marketplace</p>
                                    <p className="text-2xl font-bold text-blue-400">₹{historyData.summary.marketplaceTotal.toLocaleString()}</p>
                                </div>
                                <div className="glass-card p-4">
                                    <p className="text-sm text-gray-400">Daily Purchases</p>
                                    <p className="text-2xl font-bold text-orange-400">₹{historyData.summary.dailyTotal.toLocaleString()}</p>
                                </div>
                                <div className="glass-card p-4">
                                    <p className="text-sm text-gray-400">Total</p>
                                    <p className="text-2xl font-bold text-[var(--primary)]">₹{historyData.summary.grandTotal.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Marketplace Orders */}
                            {historyData.marketplaceOrders.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">📦 Marketplace Orders</h3>
                                    {historyData.marketplaceOrders.map(order => (
                                        <div key={order.id} className="glass-card p-3 mb-2">
                                            <div className="flex justify-between">
                                                <span className="font-medium">{order.orderNumber}</span>
                                                <span>₹{order.totalAmount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Daily Purchases */}
                            {historyData.dailyPurchases.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3">📝 Daily Purchases</h3>
                                    {historyData.dailyPurchases.map(item => (
                                        <div key={item.id} className="glass-card p-3 mb-2">
                                            <div className="flex justify-between">
                                                <span>{item.name} ({item.quantity} {item.unit})</span>
                                                <span>₹{item.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {historyData.marketplaceOrders.length === 0 && historyData.dailyPurchases.length === 0 && (
                                <div className="text-center text-gray-500 py-8">No purchases on this date</div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Shop Modal */}
            {showShop && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowShop(false)} />
                    <div className="relative z-10 glass-card ml-auto w-full max-w-2xl h-full overflow-y-auto">
                        <div className="sticky top-0 bg-[var(--card)] p-4 border-b border-white/10 z-20">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Order Supplies</h2>
                                <button onClick={() => setShowShop(false)} className="text-2xl">×</button>
                            </div>
                        </div>
                        <div className="p-4">
                            {Object.entries(grouped).map(([category, items]) => (
                                <div key={category} className="mb-6">
                                    <h3 className="font-semibold text-[var(--primary)] mb-3">{category}</h3>
                                    <div className="space-y-2">
                                        {items.map(product => (
                                            <div key={product.id} className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                                                <div className="flex-1">
                                                    <h4 className="font-medium">{product.name}</h4>
                                                    <p className="text-sm text-gray-400">₹{product.price}/{product.unit} • Min: {product.minOrder}</p>
                                                </div>
                                                {cart[product.id] ? (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateCartQty(product.id, cart[product.id] - product.minOrder)}
                                                            className="w-8 h-8 rounded bg-[var(--card)] text-lg"
                                                        >−</button>
                                                        <span className="w-12 text-center font-semibold">{cart[product.id]}</span>
                                                        <button
                                                            onClick={() => updateCartQty(product.id, cart[product.id] + product.minOrder)}
                                                            className="w-8 h-8 rounded bg-[var(--primary)] text-white text-lg"
                                                        >+</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => addToCart(product.id, product.minOrder)} className="btn-secondary py-1 px-4">
                                                        + Add
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {Object.keys(cart).length > 0 && (
                            <div className="sticky bottom-0 bg-[var(--card)] p-4 border-t border-white/10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-gray-400">{Object.keys(cart).length} items</span>
                                    <span className="text-xl font-bold">₹{cartTotal.toFixed(0)}</span>
                                </div>
                                <button onClick={handlePlaceOrder} className="btn-primary w-full py-3">
                                    Place Order (Delivery in 48 hours)
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
