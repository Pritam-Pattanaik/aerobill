"use client"

import { useState, useEffect } from "react"
import { getAllSubscriptions, updateSubscription } from "@/app/actions/super-admin"
import { Plan, SubStatus } from "@prisma/client"
import Link from "next/link"

type Subscription = {
    id: string
    plan: Plan
    status: SubStatus
    expiresAt: Date | null
    createdAt: Date
    restaurant: {
        id: string
        name: string
        email: string
        isActive: boolean
    }
}

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [loading, setLoading] = useState(true)
    const [filterPlan, setFilterPlan] = useState<Plan | "">("")
    const [filterStatus, setFilterStatus] = useState<SubStatus | "">("")
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        loadSubscriptions()
    }, [filterPlan, filterStatus])

    const loadSubscriptions = async () => {
        setLoading(true)
        const filter: { plan?: Plan; status?: SubStatus } = {}
        if (filterPlan) filter.plan = filterPlan
        if (filterStatus) filter.status = filterStatus

        const result = await getAllSubscriptions(Object.keys(filter).length ? filter : undefined)
        setSubscriptions(result.subscriptions as Subscription[])
        setLoading(false)
    }

    const handleQuickUpgrade = async (restaurantId: string, newPlan: Plan) => {
        setUpdating(restaurantId)
        const result = await updateSubscription(restaurantId, newPlan)
        if (result.success) {
            loadSubscriptions()
        } else {
            alert("Failed to update subscription")
        }
        setUpdating(null)
    }

    const planOrder: Plan[] = ["FREE", "STARTER", "BUSINESS", "ENTERPRISE"]

    const getNextPlan = (currentPlan: Plan): Plan | null => {
        const currentIndex = planOrder.indexOf(currentPlan)
        if (currentIndex < planOrder.length - 1) {
            return planOrder[currentIndex + 1]
        }
        return null
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
                <p className="text-gray-400 mt-1">Manage restaurant subscription plans</p>
            </div>

            {/* Filters */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 mb-6">
                <div className="flex gap-4 flex-wrap">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Plan</label>
                        <select
                            value={filterPlan}
                            onChange={(e) => setFilterPlan(e.target.value as Plan | "")}
                            className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        >
                            <option value="">All Plans</option>
                            <option value="FREE">FREE</option>
                            <option value="STARTER">STARTER</option>
                            <option value="BUSINESS">BUSINESS</option>
                            <option value="ENTERPRISE">ENTERPRISE</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as SubStatus | "")}
                            className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        >
                            <option value="">All Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="EXPIRED">Expired</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/50">
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Restaurant</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Plan</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Expires</th>
                                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.map((sub) => {
                                    const nextPlan = getNextPlan(sub.plan)
                                    return (
                                        <tr key={sub.id} className="border-b border-slate-700/30 hover:bg-slate-700/20">
                                            <td className="py-4 px-6">
                                                <div>
                                                    <Link
                                                        href={`/super-admin/restaurants/${sub.restaurant.id}`}
                                                        className="font-medium text-white hover:text-purple-400"
                                                    >
                                                        {sub.restaurant.name}
                                                    </Link>
                                                    <p className="text-sm text-gray-400">{sub.restaurant.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${sub.plan === "ENTERPRISE" ? "bg-yellow-500/20 text-yellow-400" :
                                                        sub.plan === "BUSINESS" ? "bg-purple-500/20 text-purple-400" :
                                                            sub.plan === "STARTER" ? "bg-blue-500/20 text-blue-400" :
                                                                "bg-gray-500/20 text-gray-400"
                                                    }`}>
                                                    {sub.plan}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.status === "ACTIVE" ? "bg-green-500/20 text-green-400" :
                                                        sub.status === "EXPIRED" ? "bg-red-500/20 text-red-400" :
                                                            "bg-gray-500/20 text-gray-400"
                                                    }`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-400">
                                                {sub.expiresAt
                                                    ? new Date(sub.expiresAt).toLocaleDateString()
                                                    : "-"
                                                }
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex justify-end gap-2">
                                                    {nextPlan && (
                                                        <button
                                                            onClick={() => handleQuickUpgrade(sub.restaurant.id, nextPlan)}
                                                            disabled={updating === sub.restaurant.id}
                                                            className="px-3 py-1.5 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-purple-400 text-sm rounded-lg hover:from-purple-600/30 hover:to-indigo-600/30 transition-colors disabled:opacity-50"
                                                        >
                                                            {updating === sub.restaurant.id ? "..." : `→ ${nextPlan}`}
                                                        </button>
                                                    )}
                                                    <Link
                                                        href={`/super-admin/restaurants/${sub.restaurant.id}`}
                                                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
                                                    >
                                                        Manage
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {subscriptions.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-gray-500">
                                            No subscriptions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
