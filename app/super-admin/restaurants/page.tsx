"use client"

import { useState, useEffect } from "react"
import { getAllRestaurants, toggleRestaurantActive } from "@/app/actions/super-admin"
import Link from "next/link"

type Restaurant = {
    id: string
    name: string
    slug: string
    email: string
    phone: string | null
    isActive: boolean
    createdAt: Date
    subscription: {
        plan: string
        status: string
    } | null
    _count: {
        orders: number
        users: number
        products: number
        tables: number
    }
}

export default function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        loadRestaurants()
    }, [page, search])

    const loadRestaurants = async () => {
        setLoading(true)
        const result = await getAllRestaurants(page, 10, search)
        setRestaurants(result.restaurants as Restaurant[])
        setTotalPages(result.pages)
        setLoading(false)
    }

    const handleToggleActive = async (id: string, name: string, currentStatus: boolean) => {
        if (!confirm(`Are you sure you want to ${currentStatus ? "deactivate" : "activate"} ${name}?`)) {
            return
        }

        const result = await toggleRestaurantActive(id)
        if (result.success) {
            loadRestaurants()
        } else {
            alert(result.error)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setPage(1)
        loadRestaurants()
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Restaurants</h1>
                    <p className="text-gray-400 mt-1">Manage all restaurants on the platform</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, or slug..."
                        className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400">Loading...</div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700/50">
                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Restaurant</th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Plan</th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Stats</th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                                        <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {restaurants.map((restaurant) => (
                                        <tr key={restaurant.id} className="border-b border-slate-700/30 hover:bg-slate-700/20">
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-medium text-white">{restaurant.name}</p>
                                                    <p className="text-sm text-gray-400">{restaurant.email}</p>
                                                    <p className="text-xs text-gray-500">/{restaurant.slug}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${restaurant.subscription?.plan === "ENTERPRISE" ? "bg-yellow-500/20 text-yellow-400" :
                                                        restaurant.subscription?.plan === "BUSINESS" ? "bg-purple-500/20 text-purple-400" :
                                                            restaurant.subscription?.plan === "STARTER" ? "bg-blue-500/20 text-blue-400" :
                                                                "bg-gray-500/20 text-gray-400"
                                                    }`}>
                                                    {restaurant.subscription?.plan || "FREE"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-4 text-sm">
                                                    <span className="text-gray-400">
                                                        <span className="text-white font-medium">{restaurant._count.orders}</span> orders
                                                    </span>
                                                    <span className="text-gray-400">
                                                        <span className="text-white font-medium">{restaurant._count.users}</span> users
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${restaurant.isActive
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-red-500/20 text-red-400"
                                                    }`}>
                                                    {restaurant.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/super-admin/restaurants/${restaurant.id}`}
                                                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleToggleActive(restaurant.id, restaurant.name, restaurant.isActive)}
                                                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${restaurant.isActive
                                                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                                                : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                                            }`}
                                                    >
                                                        {restaurant.isActive ? "Deactivate" : "Activate"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {restaurants.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-center text-gray-500">
                                                No restaurants found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 p-4 border-t border-slate-700/50">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-gray-400">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
