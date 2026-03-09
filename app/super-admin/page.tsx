import { Suspense } from "react"
import { getSystemStats } from "@/app/actions/super-admin"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

// Skeleton component for loading state
function DashboardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-3 w-24 bg-slate-700 rounded mb-2" />
                                <div className="h-8 w-20 bg-slate-700 rounded" />
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-slate-700" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-8">
                <div className="h-6 w-48 bg-slate-700 rounded mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-slate-900/50 rounded-xl p-4 text-center">
                            <div className="h-5 w-16 bg-slate-700 rounded-full mx-auto mb-3" />
                            <div className="h-8 w-12 bg-slate-700 rounded mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Single async component that fetches stats ONCE and renders all sections
async function DashboardContent() {
    const stats = await getSystemStats()

    const statCards = [
        { label: "Total Restaurants", value: stats.totalRestaurants, icon: "🍽️", color: "from-purple-500 to-indigo-600" },
        { label: "Active Restaurants", value: stats.activeRestaurants, icon: "✅", color: "from-green-500 to-emerald-600" },
        { label: "Inactive", value: stats.inactiveRestaurants, icon: "⏸️", color: "from-gray-500 to-slate-600", alert: stats.inactiveRestaurants > 0 },
        { label: "Today's Orders", value: stats.todayOrders, icon: "📦", color: "from-blue-500 to-cyan-600" },
        { label: "Today's Revenue", value: `₹${stats.todayRevenue.toFixed(0)}`, icon: "💰", color: "from-yellow-500 to-orange-500" },
        { label: "Total Users", value: stats.totalUsers, icon: "👥", color: "from-pink-500 to-rose-600" },
    ]

    const planCards = [
        { plan: "FREE", count: stats.subscriptions.FREE, color: "bg-gray-500/20 text-gray-400" },
        { plan: "STARTER", count: stats.subscriptions.STARTER, color: "bg-blue-500/20 text-blue-400" },
        { plan: "BUSINESS", count: stats.subscriptions.BUSINESS, color: "bg-purple-500/20 text-purple-400" },
        { plan: "ENTERPRISE", count: stats.subscriptions.ENTERPRISE, color: "bg-yellow-500/20 text-yellow-400" },
    ]

    return (
        <>
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {statCards.map((stat, i) => (
                    <div
                        key={i}
                        className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 ${stat.alert ? "border-yellow-500/30" : ""}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">{stat.label}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Subscription Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Subscriptions by Plan</h2>
                    <Link href="/super-admin/subscriptions" className="text-sm text-purple-400 hover:text-purple-300">
                        View all →
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {planCards.map((plan) => (
                        <div key={plan.plan} className="bg-slate-900/50 rounded-xl p-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${plan.color}`}>
                                {plan.plan}
                            </span>
                            <p className="text-3xl font-bold text-white mt-3">{plan.count}</p>
                            <p className="text-xs text-gray-500 mt-1">restaurants</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link
                    href="/super-admin/restaurants"
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all group"
                >
                    <div className="text-3xl mb-3">🍽️</div>
                    <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        Manage Restaurants
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        View, edit, activate/deactivate
                    </p>
                </Link>
                <Link
                    href="/super-admin/subscriptions"
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all group"
                >
                    <div className="text-3xl mb-3">💳</div>
                    <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        Subscriptions
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Manage plans & billing
                    </p>
                </Link>
                <Link
                    href="/super-admin/orders"
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all group"
                >
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        Order Analytics
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Cross-restaurant data
                    </p>
                </Link>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                    <div className="text-3xl mb-3">📈</div>
                    <h3 className="font-semibold text-white">Total Orders</h3>
                    <p className="text-2xl font-bold text-purple-400 mt-1">
                        {stats.totalOrders.toLocaleString()}
                    </p>
                </div>
            </div>
        </>
    )
}

export default async function SuperAdminDashboard() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isSuperAdmin) {
        redirect("/super-admin/login")
    }

    return (
        <div className="p-8">
            {/* Header - renders immediately */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Platform Dashboard</h1>
                <p className="text-gray-400 mt-1">
                    Welcome back, {session.user.name || "Super Admin"}!
                </p>
            </div>

            {/* All dashboard content - single data fetch, streams in with skeleton */}
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent />
            </Suspense>
        </div>
    )
}
