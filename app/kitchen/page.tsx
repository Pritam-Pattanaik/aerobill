"use client"

import { useState, useEffect, useCallback } from "react"
import { getActiveOrders, updateOrderStatus } from "@/app/actions/orders"
import { signOut } from "next-auth/react"
import Link from "next/link"

type OrderItem = {
    id: string
    quantity: number
    priceAtTime: number
    product: {
        id: string
        name: string
        isVeg: boolean
    }
}

type Order = {
    id: string
    status: "PENDING" | "COOKING" | "READY" | "BILLED"
    totalAmount: number
    createdAt: string
    table: {
        number: number
    }
    items: OrderItem[]
}

export default function KitchenPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState<string | null>(null)

    const fetchOrders = useCallback(async () => {
        try {
            const result = await getActiveOrders()
            if (result.success) {
                setOrders(result.orders as Order[])
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchOrders()
        // Poll every 5 seconds for new orders
        const interval = setInterval(fetchOrders, 5000)
        return () => clearInterval(interval)
    }, [fetchOrders])

    const handleStatusUpdate = async (orderId: string, newStatus: "COOKING" | "READY") => {
        setUpdating(orderId)
        try {
            const result = await updateOrderStatus(orderId, newStatus)
            if (result.success) {
                await fetchOrders()
            }
        } catch (error) {
            console.error("Failed to update status:", error)
        } finally {
            setUpdating(null)
        }
    }

    const getElapsedTime = (createdAt: string) => {
        const created = new Date(createdAt)
        const now = new Date()
        const diffMs = now.getTime() - created.getTime()
        const diffMins = Math.floor(diffMs / 60000)

        if (diffMins < 1) return "Just now"
        if (diffMins === 1) return "1 min ago"
        if (diffMins < 60) return `${diffMins} mins ago`

        const hours = Math.floor(diffMins / 60)
        return `${hours}h ${diffMins % 60}m ago`
    }

    const pendingOrders = orders.filter((o) => o.status === "PENDING")
    const cookingOrders = orders.filter((o) => o.status === "COOKING")

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading kitchen display...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Header */}
            <header className="sticky top-0 z-40 glass-card rounded-none border-t-0 border-x-0 py-4 px-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-gray-400 hover:text-white">
                            ← Admin
                        </Link>
                        <h1 className="text-2xl font-bold text-[var(--primary)]">
                            🍳 Kitchen Display
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">
                            Auto-refresh: 5s
                        </span>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="btn-secondary text-sm"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats bar */}
            <div className="bg-[var(--card)] border-b border-[var(--border)] py-3 px-6">
                <div className="flex gap-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[var(--warning)] animate-pulse" />
                        <span className="text-sm">Pending: {pendingOrders.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse" />
                        <span className="text-sm">Cooking: {cookingOrders.length}</span>
                    </div>
                </div>
            </div>

            {/* Orders grid */}
            <main className="p-6 max-w-7xl mx-auto">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">✨</div>
                        <h2 className="text-2xl font-semibold mb-2">All caught up!</h2>
                        <p className="text-gray-400">No active orders at the moment</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className={`glass-card p-6 animate-fadeIn transition-all ${order.status === "PENDING"
                                        ? "border-[var(--warning)] shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                                        : "border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.1)]"
                                    }`}
                            >
                                {/* Order header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-3xl font-bold">#{order.table.number}</span>
                                            <span className={`badge ${order.status === "PENDING" ? "badge-pending" : "badge-cooking"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Order ID: {order.id.slice(-6).toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-medium ${order.status === "PENDING" ? "text-[var(--warning)]" : "text-indigo-400"
                                            }`}>
                                            ⏱️ {getElapsedTime(order.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Order items */}
                                <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 p-2 bg-[var(--background)] rounded-lg"
                                        >
                                            <div className={item.product.isVeg ? "veg-indicator" : "nonveg-indicator"} style={{ transform: "scale(0.8)" }} />
                                            <span className="flex-1 text-sm">{item.product.name}</span>
                                            <span className="font-bold text-lg">×{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action button */}
                                {order.status === "PENDING" && (
                                    <button
                                        onClick={() => handleStatusUpdate(order.id, "COOKING")}
                                        disabled={updating === order.id}
                                        className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50"
                                    >
                                        {updating === order.id ? "Updating..." : "🍳 Start Cooking"}
                                    </button>
                                )}

                                {order.status === "COOKING" && (
                                    <button
                                        onClick={() => handleStatusUpdate(order.id, "READY")}
                                        disabled={updating === order.id}
                                        className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50"
                                    >
                                        {updating === order.id ? "Updating..." : "✅ Mark Ready"}
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
