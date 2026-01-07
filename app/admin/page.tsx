import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const dynamic = "force-dynamic"

async function getStats() {
    try {
        const [
            totalOrders,
            pendingOrders,
            todayRevenue,
            totalProducts,
            lowStockCount,
            totalTables,
        ] = await Promise.all([
            prisma.order.count(),
            prisma.order.count({ where: { status: { in: ["PENDING", "COOKING"] } } }),
            prisma.order.aggregate({
                where: {
                    status: "BILLED",
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
                _sum: { totalAmount: true },
            }),
            prisma.product.count(),
            prisma.inventory.count({ where: { quantity: { lte: 10 } } }),
            prisma.table.count({ where: { isActive: true } }),
        ])

        return {
            totalOrders,
            pendingOrders,
            todayRevenue: todayRevenue._sum.totalAmount || 0,
            totalProducts,
            lowStockCount,
            totalTables,
        }
    } catch (error) {
        console.error("Failed to fetch stats:", error)
        return {
            totalOrders: 0,
            pendingOrders: 0,
            todayRevenue: 0,
            totalProducts: 0,
            lowStockCount: 0,
            totalTables: 0,
        }
    }
}

async function getRecentOrders() {
    try {
        return await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
                table: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })
    } catch (error) {
        console.error("Failed to fetch recent orders:", error)
        return []
    }
}

export default async function AdminDashboard() {
    const stats = await getStats()
    const recentOrders = await getRecentOrders()

    const statCards = [
        {
            label: "Today's Revenue",
            value: `₹${stats.todayRevenue.toFixed(0)}`,
            icon: "💰",
            color: "from-green-500 to-emerald-600",
        },
        {
            label: "Active Orders",
            value: stats.pendingOrders,
            icon: "🔥",
            color: "from-orange-500 to-red-500",
            alert: stats.pendingOrders > 0,
        },
        {
            label: "Total Products",
            value: stats.totalProducts,
            icon: "🍽️",
            color: "from-blue-500 to-indigo-600",
        },
        {
            label: "Active Tables",
            value: stats.totalTables,
            icon: "🪑",
            color: "from-purple-500 to-pink-600",
        },
        {
            label: "Low Stock Items",
            value: stats.lowStockCount,
            icon: "⚠️",
            color: "from-yellow-500 to-orange-500",
            alert: stats.lowStockCount > 0,
        },
        {
            label: "Total Orders",
            value: stats.totalOrders,
            icon: "📊",
            color: "from-cyan-500 to-blue-600",
        },
    ]

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-400">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            {/* Stats grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className={`glass-card p-6 relative overflow-hidden ${stat.alert ? "border-[var(--warning)]" : ""
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold">{stat.value}</p>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                        {stat.alert && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-[var(--warning)] rounded-full animate-pulse" />
                        )}
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Link
                    href="/kitchen"
                    className="glass-card p-6 hover:border-[var(--primary)] transition-all group"
                >
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🍳</div>
                    <h3 className="font-semibold mb-1">Kitchen Display</h3>
                    <p className="text-sm text-gray-400">View and manage active orders</p>
                </Link>

                <Link
                    href="/admin/billing"
                    className="glass-card p-6 hover:border-[var(--primary)] transition-all group"
                >
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🧾</div>
                    <h3 className="font-semibold mb-1">Billing</h3>
                    <p className="text-sm text-gray-400">Process payments and print receipts</p>
                </Link>

                <Link
                    href="/admin/menu"
                    className="glass-card p-6 hover:border-[var(--primary)] transition-all group"
                >
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">➕</div>
                    <h3 className="font-semibold mb-1">Add Product</h3>
                    <p className="text-sm text-gray-400">Add new items to menu</p>
                </Link>

                <Link
                    href="/admin/tables"
                    className="glass-card p-6 hover:border-[var(--primary)] transition-all group"
                >
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📱</div>
                    <h3 className="font-semibold mb-1">QR Codes</h3>
                    <p className="text-sm text-gray-400">Generate table QR codes</p>
                </Link>
            </div>

            {/* Recent orders */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <Link href="/admin/billing" className="text-sm text-[var(--primary)] hover:underline">
                        View all →
                    </Link>
                </div>

                {recentOrders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No orders yet</p>
                ) : (
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between p-4 bg-[var(--background)] rounded-xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center font-bold">
                                        {order.table.number}
                                    </div>
                                    <div>
                                        <p className="font-medium">Table {order.table.number}</p>
                                        <p className="text-sm text-gray-400">
                                            {order.items.length} items • {new Date(order.createdAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">₹{order.totalAmount.toFixed(0)}</p>
                                    <span className={`badge badge-${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
