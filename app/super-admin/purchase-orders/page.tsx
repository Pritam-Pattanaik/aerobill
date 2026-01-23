"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    getAllPurchaseOrders,
    getPurchaseOrderStats,
    updatePurchaseOrderStatusAdmin,
    getRestaurantsForFilter
} from "@/app/actions/purchase-orders"
import { POStatus } from "@prisma/client"

type OrderItem = {
    id: string
    quantity: number
    unitPrice: number
    marketplaceProduct: {
        id: string
        name: string
        unit: string
    }
}

type PurchaseOrder = {
    id: string
    orderNumber: string
    status: POStatus
    notes: string | null
    totalAmount: number
    restaurantId: string
    estimatedDelivery: Date | null
    createdAt: Date
    items: OrderItem[]
    restaurant: {
        id: string
        name: string
        email: string
        phone: string | null
    } | null
}

type Stats = {
    total: number
    pending: number
    ordered: number
    received: number
    cancelled: number
    totalRevenue: number
    receivedRevenue: number
}

const statusColors: Record<POStatus, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    ORDERED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    RECEIVED: "bg-green-500/20 text-green-400 border-green-500/30",
    CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30"
}

const statusIcons: Record<POStatus, string> = {
    PENDING: "⏳",
    ORDERED: "📦",
    RECEIVED: "✅",
    CANCELLED: "❌"
}

export default function PurchaseOrdersPage() {
    const [orders, setOrders] = useState<PurchaseOrder[]>([])
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState<POStatus | "ALL">("ALL")
    const [search, setSearch] = useState("")
    const [restaurants, setRestaurants] = useState<Array<{ id: string; name: string }>>([])
    const [restaurantFilter, setRestaurantFilter] = useState("")
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        loadData()
        loadRestaurants()
    }, [])

    useEffect(() => {
        loadOrders()
    }, [statusFilter, restaurantFilter])

    async function loadData() {
        const [ordersRes, statsRes] = await Promise.all([
            getAllPurchaseOrders(),
            getPurchaseOrderStats()
        ])
        if (ordersRes.success) setOrders(ordersRes.orders as PurchaseOrder[])
        if (statsRes.success) setStats(statsRes.stats)
        setLoading(false)
    }

    async function loadOrders() {
        const filters: { status?: POStatus; restaurantId?: string; search?: string } = {}
        if (statusFilter !== "ALL") filters.status = statusFilter
        if (restaurantFilter) filters.restaurantId = restaurantFilter
        if (search) filters.search = search

        const res = await getAllPurchaseOrders(filters)
        if (res.success) setOrders(res.orders as PurchaseOrder[])
    }

    async function loadRestaurants() {
        const res = await getRestaurantsForFilter()
        if (res.success) setRestaurants(res.restaurants)
    }

    async function handleStatusUpdate(orderId: string, newStatus: POStatus) {
        setUpdating(orderId)
        await updatePurchaseOrderStatusAdmin(orderId, newStatus)
        await loadData()
        setUpdating(null)
    }

    function handleSearch() {
        loadOrders()
    }

    // Filter orders by search locally for instant feedback
    const filteredOrders = search
        ? orders.filter(o =>
            o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
            o.restaurant?.name.toLowerCase().includes(search.toLowerCase())
        )
        : orders

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-10 bg-slate-800 rounded w-64"></div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-slate-800 rounded-xl"></div>
                        ))}
                    </div>
                    <div className="h-96 bg-slate-800 rounded-xl"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Purchase Orders</h1>
                <p className="text-gray-400 mt-1">Manage orders from restaurants</p>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-5 mb-8">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                        <p className="text-sm text-gray-400">Total Orders</p>
                        <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                        <p className="text-sm text-yellow-400">Pending</p>
                        <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-sm text-blue-400">Ordered</p>
                        <p className="text-2xl font-bold text-blue-400 mt-1">{stats.ordered}</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <p className="text-sm text-green-400">Received</p>
                        <p className="text-2xl font-bold text-green-400 mt-1">{stats.received}</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 col-span-2 lg:col-span-1">
                        <p className="text-sm text-purple-400">Total Revenue</p>
                        <p className="text-2xl font-bold text-purple-400 mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Status Filter */}
                    <div className="flex flex-wrap gap-2">
                        {(["ALL", "PENDING", "ORDERED", "RECEIVED", "CANCELLED"] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter === status
                                        ? status === "ALL"
                                            ? "bg-purple-600 text-white"
                                            : statusColors[status as POStatus]
                                        : "bg-slate-700/50 text-gray-400 hover:bg-slate-700"
                                    }`}
                            >
                                {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    {/* Restaurant Filter */}
                    <select
                        value={restaurantFilter}
                        onChange={(e) => setRestaurantFilter(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white"
                    >
                        <option value="">All Restaurants</option>
                        {restaurants.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>

                    {/* Search */}
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Search order# or restaurant..."
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-12 text-center">
                    <p className="text-gray-400">No purchase orders found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/30 transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                {/* Order Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Link
                                            href={`/super-admin/purchase-orders/${order.id}`}
                                            className="font-bold text-white hover:text-purple-400 transition-colors"
                                        >
                                            {order.orderNumber}
                                        </Link>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColors[order.status]}`}>
                                            {statusIcons[order.status]} {order.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                                        <span>🏪 {order.restaurant?.name || "Unknown"}</span>
                                        <span>📦 {order.items.length} items</span>
                                        <span>📅 {new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="text-right">
                                    <p className="text-xl font-bold text-white">₹{order.totalAmount.toLocaleString()}</p>
                                    {order.estimatedDelivery && order.status !== "RECEIVED" && order.status !== "CANCELLED" && (
                                        <p className="text-xs text-gray-500">
                                            Est: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {order.status === "PENDING" && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, "ORDERED")}
                                            disabled={updating === order.id}
                                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {updating === order.id ? "..." : "Mark Ordered"}
                                        </button>
                                    )}
                                    {order.status === "ORDERED" && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, "RECEIVED")}
                                            disabled={updating === order.id}
                                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
                                        >
                                            {updating === order.id ? "..." : "Mark Received"}
                                        </button>
                                    )}
                                    {(order.status === "PENDING" || order.status === "ORDERED") && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                                            disabled={updating === order.id}
                                            className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <Link
                                        href={`/super-admin/purchase-orders/${order.id}`}
                                        className="px-3 py-1.5 bg-slate-700 text-gray-300 rounded-lg text-sm hover:bg-slate-600"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
