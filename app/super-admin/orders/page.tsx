"use client"

import { useState, useEffect } from "react"
import { getOrdersAnalytics } from "@/app/actions/super-admin"

type AnalyticsData = {
    dailyStats: Record<string, { orders: number; revenue: number }>
    topRestaurants: Array<{ name: string; orders: number; revenue: number }>
    totalOrders: number
    totalRevenue: number
}

export default function OrdersPage() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [days, setDays] = useState(7)

    useEffect(() => {
        loadAnalytics()
    }, [days])

    const loadAnalytics = async () => {
        setLoading(true)
        const result = await getOrdersAnalytics(days)
        setData(result as AnalyticsData)
        setLoading(false)
    }

    // Sort daily stats by date
    const sortedDailyStats = data
        ? Object.entries(data.dailyStats)
            .sort(([a], [b]) => a.localeCompare(b))
        : []

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Order Analytics</h1>
                    <p className="text-gray-400 mt-1">Cross-restaurant order data and trends</p>
                </div>
                <div>
                    <select
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value={7}>Last 7 days</option>
                        <option value={14}>Last 14 days</option>
                        <option value={30}>Last 30 days</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center text-gray-400 py-12">Loading analytics...</div>
            ) : data ? (
                <>
                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                            <p className="text-sm text-gray-400">Total Orders ({days} days)</p>
                            <p className="text-3xl font-bold text-white mt-1">{data.totalOrders}</p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                            <p className="text-sm text-gray-400">Total Revenue ({days} days)</p>
                            <p className="text-3xl font-bold text-white mt-1">₹{data.totalRevenue.toFixed(0)}</p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                            <p className="text-sm text-gray-400">Avg Orders/Day</p>
                            <p className="text-3xl font-bold text-white mt-1">
                                {(data.totalOrders / days).toFixed(1)}
                            </p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                            <p className="text-sm text-gray-400">Avg Revenue/Day</p>
                            <p className="text-3xl font-bold text-white mt-1">
                                ₹{(data.totalRevenue / days).toFixed(0)}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Daily Stats */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Daily Breakdown</h2>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {sortedDailyStats.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No data for this period</p>
                                ) : (
                                    sortedDailyStats.map(([date, stats]) => (
                                        <div
                                            key={date}
                                            className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl"
                                        >
                                            <div>
                                                <p className="font-medium text-white">
                                                    {new Date(date).toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                                <p className="text-sm text-gray-400">{stats.orders} orders</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-white">₹{stats.revenue.toFixed(0)}</p>
                                                <p className="text-xs text-gray-500">
                                                    Avg: ₹{stats.orders > 0 ? (stats.revenue / stats.orders).toFixed(0) : 0}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Top Restaurants */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Top Performing Restaurants</h2>
                            <div className="space-y-3">
                                {data.topRestaurants.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No data for this period</p>
                                ) : (
                                    data.topRestaurants.map((restaurant, index) => (
                                        <div
                                            key={restaurant.name}
                                            className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl"
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${index === 0
                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                        : index === 1
                                                            ? "bg-gray-400/20 text-gray-400"
                                                            : index === 2
                                                                ? "bg-orange-500/20 text-orange-400"
                                                                : "bg-slate-700 text-gray-400"
                                                    }`}
                                            >
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-white">{restaurant.name}</p>
                                                <p className="text-sm text-gray-400">{restaurant.orders} orders</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-white">
                                                    ₹{restaurant.revenue.toFixed(0)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Visual Chart - Simple Bar Chart */}
                        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Revenue Trend</h2>
                            <div className="flex items-end gap-2 h-48">
                                {sortedDailyStats.length === 0 ? (
                                    <p className="text-gray-500 text-center w-full py-4">No data for this period</p>
                                ) : (
                                    sortedDailyStats.map(([date, stats]) => {
                                        const maxRevenue = Math.max(
                                            ...sortedDailyStats.map(([, s]) => s.revenue),
                                            1
                                        )
                                        const height = (stats.revenue / maxRevenue) * 100
                                        return (
                                            <div
                                                key={date}
                                                className="flex-1 flex flex-col items-center gap-2"
                                            >
                                                <div
                                                    className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg transition-all"
                                                    style={{ height: `${Math.max(height, 4)}%` }}
                                                    title={`${date}: ₹${stats.revenue.toFixed(0)}`}
                                                />
                                                <span className="text-xs text-gray-500 transform -rotate-45 origin-left">
                                                    {new Date(date).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}
