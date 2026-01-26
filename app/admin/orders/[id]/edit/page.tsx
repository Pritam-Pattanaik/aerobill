"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getOrderById, updateOrderItems } from "@/app/actions/orders"
import { getCategories } from "@/app/actions/menu"
import Link from "next/link"

type OrderItem = {
    id?: string // Optional for new items
    productId: string
    quantity: number
    product: { name: string; price: number; isVeg: boolean }
}

type Category = {
    id: string
    name: string
    products: { id: string; name: string; price: number; isVeg: boolean; isAvailable: boolean }[]
}

export default function EditOrderPage() {
    const params = useParams()
    const router = useRouter()
    const orderId = params.id as string

    const [items, setItems] = useState<OrderItem[]>([])
    const [originalItems, setOriginalItems] = useState<OrderItem[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [orderInfo, setOrderInfo] = useState<any>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const [orderRes, menuRes] = await Promise.all([
                    getOrderById(orderId),
                    getCategories()
                ])

                if (orderRes.success && orderRes.order) {
                    setOrderInfo(orderRes.order)
                    setItems(orderRes.order.items)
                    setOriginalItems(orderRes.order.items)
                } else {
                    setError("Order not found")
                }

                if (menuRes.success) {
                    setCategories(menuRes.categories)
                }
            } catch (err) {
                setError("Failed to load data")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [orderId])

    const updateQuantity = (productId: string, delta: number) => {
        setItems(prev => {
            return prev.map(item => {
                if (item.productId === productId) {
                    const newQty = Math.max(0, item.quantity + delta)
                    return { ...item, quantity: newQty }
                }
                return item
            })
        })
    }

    const addItem = (product: any) => {
        setItems(prev => {
            const existing = prev.find(i => i.productId === product.id)
            if (existing) {
                return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, {
                productId: product.id,
                quantity: 1,
                product: { name: product.name, price: product.price, isVeg: product.isVeg }
            }]
        })
        setShowAddModal(false)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            // Prepare payload
            const payload = items.map(i => ({
                productId: i.productId,
                quantity: i.quantity
            }))

            const result = await updateOrderItems(orderId, payload)
            if (result.success) {
                alert("Order updated successfully")
                router.back()
                router.refresh()
            } else {
                alert(result.error || "Failed to update order")
            }
        } catch (e) {
            alert("Failed to save changes")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8 text-center">Loading...</div>
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>

    const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/kitchen" className="text-sm text-gray-400 hover:text-white mb-2 block">← Back</Link>
                    <h1 className="text-2xl font-bold">Edit Order #{orderInfo?.table?.number}</h1>
                    <p className="text-gray-400 text-sm">Order ID: {orderId}</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowAddModal(true)} className="btn-secondary">
                        + Add Item
                    </button>
                    <button onClick={handleSave} disabled={saving} className="btn-primary w-32">
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </header>

            <div className="glass-card p-6">
                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.productId} className={`flex items-center justify-between p-4 rounded-xl border ${item.quantity === 0 ? 'border-red-500/30 bg-red-500/5' : 'border-[var(--border)] bg-[var(--background)]'}`}>
                            <div className="flex items-center gap-3">
                                <div className={item.product.isVeg ? "veg-indicator" : "nonveg-indicator"} />
                                <div>
                                    <h3 className={`font-medium ${item.quantity === 0 ? 'text-gray-500 line-through' : ''}`}>{item.product.name}</h3>
                                    <p className="text-sm text-gray-400">₹{item.product.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-[var(--card)] rounded-lg p-1">
                                    <button onClick={() => updateQuantity(item.productId, -1)} className="w-8 h-8 flex items-center justify-center rounded bg-[var(--background)] hover:bg-gray-700 transition">
                                        −
                                    </button>
                                    <span className={`w-8 text-center font-bold ${item.quantity === 0 ? 'text-red-500' : ''}`}>
                                        {item.quantity}
                                    </span>
                                    <button onClick={() => updateQuantity(item.productId, 1)} className="w-8 h-8 flex items-center justify-center rounded bg-[var(--background)] hover:bg-gray-700 transition">
                                        +
                                    </button>
                                </div>
                                <div className="w-20 text-right font-medium">
                                    ₹{item.product.price * item.quantity}
                                </div>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && <p className="text-center text-gray-500 py-8">No items in order</p>}
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)] flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[var(--primary)]">₹{totalAmount}</span>
                </div>
            </div>

            {/* Add Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="glass-card w-full max-w-2xl max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center">
                            <h2 className="text-lg font-bold">Add Item to Order</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-2xl text-gray-400">×</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {categories.map(cat => (
                                <div key={cat.id} className="mb-6">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{cat.name}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {cat.products.filter(p => p.isAvailable).map(product => (
                                            <button
                                                key={product.id}
                                                onClick={() => addItem(product)}
                                                className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)] hover:border-[var(--primary)] border border-transparent transition text-left"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={product.isVeg ? "veg-indicator" : "nonveg-indicator"} />
                                                    <span className="font-medium">{product.name}</span>
                                                </div>
                                                <span className="text-[var(--primary)]">₹{product.price}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
