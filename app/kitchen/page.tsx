"use client"

import { useState, useEffect, useCallback } from "react"
import { getActiveOrders, updateOrderStatus } from "@/app/actions/orders"
import { signOut } from "next-auth/react"
import Link from "next/link"

type OrderItem = { id: string; quantity: number; product: { name: string; isVeg: boolean } }
type Order = { id: string; status: "PENDING" | "COOKING"; createdAt: string; table: { number: number }; items: OrderItem[] }

export default function KitchenPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState<string | null>(null)

    const fetchOrders = useCallback(async () => {
        const result = await getActiveOrders()
        if (result.success) setOrders(result.orders as Order[])
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchOrders()
        const interval = setInterval(fetchOrders, 10000)
        return () => clearInterval(interval)
    }, [fetchOrders])

    const handleStatus = async (id: string, status: "COOKING" | "READY") => {
        setUpdating(id)
        await updateOrderStatus(id, status)
        await fetchOrders()
        setUpdating(null)
    }

    const getTime = (createdAt: string) => {
        const mins = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000)
        if (mins < 1) return "Now"
        if (mins < 60) return `${mins}m`
        return `${Math.floor(mins / 60)}h ${mins % 60}m`
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    const pending = orders.filter(o => o.status === "PENDING")
    const cooking = orders.filter(o => o.status === "COOKING")

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <header className="sticky top-0 z-40 glass-card rounded-none border-t-0 border-x-0 py-3 px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-white text-sm">← Admin</Link>
                        <h1 className="text-xl font-bold text-[var(--primary)]">🍳 Kitchen Display</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">Auto-refresh: 10s</span>
                        <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary text-xs py-1.5">Sign Out</button>
                    </div>
                </div>
            </header>

            <div className="bg-[var(--card)] border-b border-[var(--border)] py-2 px-4">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--warning)]" />
                        <span className="text-xs">Pending: {pending.length}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        <span className="text-xs">Cooking: {cooking.length}</span>
                    </div>
                </div>
            </div>

            <main className="p-4">
                {orders.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-4xl mb-2">✨</div>
                        <h2 className="text-lg font-semibold">All caught up!</h2>
                        <p className="text-gray-400 text-sm">No active orders at the moment</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {orders.map(order => (
                            <div key={order.id} className={`glass-card p-4 ${order.status === "PENDING" ? "border-[var(--warning)]" : "border-indigo-400"}`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-2xl font-bold">#{order.table.number}</span>
                                            <span className={`badge text-xs ${order.status === "PENDING" ? "badge-pending" : "badge-cooking"}`}>{order.status}</span>
                                        </div>
                                        <p className="text-xs text-gray-400">ID: {order.id.slice(-6).toUpperCase()}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">⏱️ {getTime(order.createdAt)}</span>
                                </div>
                                <div className="space-y-1.5 mb-4 max-h-36 overflow-y-auto">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex items-center gap-2 p-1.5 bg-[var(--background)] rounded text-sm">
                                            <div className={item.product.isVeg ? "veg-indicator" : "nonveg-indicator"} style={{ transform: "scale(0.7)" }} />
                                            <span className="flex-1">{item.product.name}</span>
                                            <span className="font-bold">×{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                                {order.status === "PENDING" && (
                                    <button onClick={() => handleStatus(order.id, "COOKING")} disabled={updating === order.id}
                                        className="w-full py-2 rounded-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm disabled:opacity-50">
                                        {updating === order.id ? "..." : "🍳 Start Cooking"}
                                    </button>
                                )}
                                {order.status === "COOKING" && (
                                    <button onClick={() => handleStatus(order.id, "READY")} disabled={updating === order.id}
                                        className="w-full py-2 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm disabled:opacity-50">
                                        {updating === order.id ? "..." : "✅ Mark Ready"}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
