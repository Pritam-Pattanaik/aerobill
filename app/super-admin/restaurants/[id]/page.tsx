"use client"

import { useState, useEffect, use } from "react"
import { getRestaurantDetails, updateSubscription, toggleRestaurantActive } from "@/app/actions/super-admin"
import Link from "next/link"
import { Plan, SubStatus } from "@prisma/client"

type RestaurantDetails = {
    id: string
    name: string
    slug: string
    email: string
    phone: string | null
    address: string | null
    gstNumber: string | null
    fssaiLicense: string | null
    isActive: boolean
    createdAt: Date
    subscription: {
        id: string
        plan: Plan
        status: SubStatus
        expiresAt: Date | null
    } | null
    users: Array<{
        id: string
        name: string
        email: string
        role: string
        createdAt: Date
    }>
    settings: {
        cafeName: string
        taxRate: number
    } | null
    _count: {
        orders: number
        products: number
        tables: number
        categories: number
    }
}

type RecentOrder = {
    id: string
    status: string
    totalAmount: number
    createdAt: Date
    table: { number: number }
    _count: { items: number }
}

export default function RestaurantDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null)
    const [todayOrders, setTodayOrders] = useState(0)
    const [todayRevenue, setTodayRevenue] = useState(0)
    const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<Plan>("FREE")

    useEffect(() => {
        loadDetails()
    }, [id])

    const loadDetails = async () => {
        const result = await getRestaurantDetails(id)
        if (result.success && result.restaurant) {
            setRestaurant(result.restaurant as RestaurantDetails)
            setTodayOrders(result.todayOrders || 0)
            setTodayRevenue(result.todayRevenue || 0)
            setRecentOrders((result.recentOrders || []) as RecentOrder[])
            setSelectedPlan(result.restaurant.subscription?.plan || "FREE")
        }
        setLoading(false)
    }

    const handleUpdatePlan = async () => {
        if (!restaurant) return
        setUpdating(true)
        const result = await updateSubscription(restaurant.id, selectedPlan)
        if (result.success) {
            loadDetails()
            alert("Subscription updated successfully")
        }
        setUpdating(false)
    }

    const handleToggleActive = async () => {
        if (!restaurant) return
        if (!confirm(`Are you sure you want to ${restaurant.isActive ? "deactivate" : "activate"} this restaurant?`)) {
            return
        }
        const result = await toggleRestaurantActive(restaurant.id)
        if (result.success) {
            loadDetails()
        }
    }

    if (loading) {
        return (
            <div className="p-8">
                <div className="text-center text-gray-400">Loading...</div>
            </div>
        )
    }

    if (!restaurant) {
        return (
            <div className="p-8">
                <div className="text-center text-gray-400">Restaurant not found</div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href="/super-admin/restaurants"
                        className="text-sm text-purple-400 hover:text-purple-300 mb-2 inline-block"
                    >
                        ← Back to Restaurants
                    </Link>
                    <h1 className="text-3xl font-bold text-white">{restaurant.name}</h1>
                    <p className="text-gray-400 mt-1">/{restaurant.slug}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleToggleActive}
                        className={`px-4 py-2 rounded-xl font-medium transition-colors ${restaurant.isActive
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            }`}
                    >
                        {restaurant.isActive ? "Deactivate" : "Activate"}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <p className="text-sm text-gray-400">Today&apos;s Orders</p>
                    <p className="text-2xl font-bold text-white mt-1">{todayOrders}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <p className="text-sm text-gray-400">Today&apos;s Revenue</p>
                    <p className="text-2xl font-bold text-white mt-1">₹{todayRevenue.toFixed(0)}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <p className="text-sm text-gray-400">Total Orders</p>
                    <p className="text-2xl font-bold text-white mt-1">{restaurant._count.orders}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <p className="text-sm text-gray-400">Status</p>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-sm font-medium ${restaurant.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}>
                        {restaurant.isActive ? "Active" : "Inactive"}
                    </span>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Restaurant Info */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Restaurant Information</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="text-white">{restaurant.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Phone</p>
                            <p className="text-white">{restaurant.phone || "-"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Address</p>
                            <p className="text-white">{restaurant.address || "-"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">GST Number</p>
                                <p className="text-white">{restaurant.gstNumber || "-"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">FSSAI License</p>
                                <p className="text-white">{restaurant.fssaiLicense || "-"}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                            <div>
                                <p className="text-sm text-gray-400">Products</p>
                                <p className="text-xl font-bold text-white">{restaurant._count.products}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Tables</p>
                                <p className="text-xl font-bold text-white">{restaurant._count.tables}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Subscription</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Current Plan</p>
                            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${restaurant.subscription?.plan === "ENTERPRISE" ? "bg-yellow-500/20 text-yellow-400" :
                                    restaurant.subscription?.plan === "BUSINESS" ? "bg-purple-500/20 text-purple-400" :
                                        restaurant.subscription?.plan === "STARTER" ? "bg-blue-500/20 text-blue-400" :
                                            "bg-gray-500/20 text-gray-400"
                                }`}>
                                {restaurant.subscription?.plan || "FREE"}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Change Plan</p>
                            <div className="flex gap-3">
                                <select
                                    value={selectedPlan}
                                    onChange={(e) => setSelectedPlan(e.target.value as Plan)}
                                    className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value="FREE">FREE</option>
                                    <option value="STARTER">STARTER</option>
                                    <option value="BUSINESS">BUSINESS</option>
                                    <option value="ENTERPRISE">ENTERPRISE</option>
                                </select>
                                <button
                                    onClick={handleUpdatePlan}
                                    disabled={updating || selectedPlan === restaurant.subscription?.plan}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50"
                                >
                                    {updating ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </div>
                        {restaurant.subscription?.expiresAt && (
                            <div>
                                <p className="text-sm text-gray-400">Expires</p>
                                <p className="text-white">
                                    {new Date(restaurant.subscription.expiresAt).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Users */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Staff Members ({restaurant.users.length})</h2>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {restaurant.users.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                                <div>
                                    <p className="font-medium text-white">{user.name}</p>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "OWNER" ? "bg-purple-500/20 text-purple-400" :
                                        user.role === "ADMIN" ? "bg-blue-500/20 text-blue-400" :
                                            user.role === "WAITER" ? "bg-yellow-500/20 text-yellow-400" :
                                                "bg-green-500/20 text-green-400"
                                    }`}>
                                    {user.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {recentOrders.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No orders yet</p>
                        ) : (
                            recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                                    <div>
                                        <p className="font-medium text-white">Table {order.table.number}</p>
                                        <p className="text-sm text-gray-400">{order._count.items} items</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-white">₹{order.totalAmount.toFixed(0)}</p>
                                        <span className={`text-xs ${order.status === "BILLED" ? "text-gray-400" :
                                                order.status === "READY" ? "text-green-400" :
                                                    order.status === "COOKING" ? "text-blue-400" :
                                                        "text-yellow-400"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
