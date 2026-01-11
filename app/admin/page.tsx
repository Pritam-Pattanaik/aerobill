import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { unstable_cache } from "next/cache"

// Cached stats fetching (30 second TTL for restaurant owners)
const getCachedStats = unstable_cache(
    async (restaurantId: string) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const [
            totalOrders,
            pendingOrders,
            todayRevenue,
            totalProducts,
            lowStockCount,
            totalTables,
        ] = await prisma.$transaction([
            prisma.order.count({ where: { restaurantId } }),
            prisma.order.count({ where: { restaurantId, status: { in: ["PENDING", "COOKING"] } } }),
            prisma.order.aggregate({
                where: { restaurantId, status: "BILLED", createdAt: { gte: today } },
                _sum: { totalAmount: true },
            }),
            prisma.product.count({ where: { restaurantId } }),
            prisma.inventory.count({ where: { restaurantId, quantity: { lte: 10 } } }),
            prisma.table.count({ where: { restaurantId, isActive: true } }),
        ])

        return {
            totalOrders,
            pendingOrders,
            todayRevenue: todayRevenue._sum.totalAmount || 0,
            totalProducts,
            lowStockCount,
            totalTables,
        }
    },
    ['restaurant-stats'],
    { tags: ['restaurant-stats'], revalidate: 30 }
)

// Cached recent orders
const getCachedRecentOrders = unstable_cache(
    async (restaurantId: string) => {
        return await prisma.order.findMany({
            where: { restaurantId },
            take: 5,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                status: true,
                totalAmount: true,
                createdAt: true,
                table: { select: { number: true } },
                _count: { select: { items: true } },
            },
        })
    },
    ['recent-orders'],
    { tags: ['orders'], revalidate: 15 }
)

// Skeleton components
function StatsGridSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-3 w-20 bg-slate-700 rounded mb-2" />
                            <div className="h-7 w-16 bg-slate-700 rounded" />
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-slate-700" />
                    </div>
                </div>
            ))}
        </div>
    )
}

function RecentOrdersSkeleton() {
    return (
        <div className="glass-card p-4 animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-28 bg-slate-700 rounded" />
                <div className="h-4 w-16 bg-slate-700 rounded" />
            </div>
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700" />
                            <div>
                                <div className="h-4 w-16 bg-slate-700 rounded mb-1" />
                                <div className="h-3 w-12 bg-slate-700 rounded" />
                            </div>
                        </div>
                        <div className="h-6 w-14 bg-slate-700 rounded" />
                    </div>
                ))}
            </div>
        </div>
    )
}

// Async stats component
async function StatsGrid({ restaurantId }: { restaurantId: string }) {
    const stats = await getCachedStats(restaurantId)

    const statCards = [
        { label: "Today's Revenue", value: `₹${stats.todayRevenue.toFixed(0)}`, icon: "💰", color: "from-green-500 to-emerald-600" },
        { label: "Active Orders", value: stats.pendingOrders, icon: "🔥", color: "from-orange-500 to-red-500", alert: stats.pendingOrders > 0 },
        { label: "Total Products", value: stats.totalProducts, icon: "🍽️", color: "from-blue-500 to-indigo-600" },
        { label: "Active Tables", value: stats.totalTables, icon: "🪑", color: "from-purple-500 to-pink-600" },
        { label: "Low Stock", value: stats.lowStockCount, icon: "⚠️", color: "from-yellow-500 to-orange-500", alert: stats.lowStockCount > 0 },
        { label: "Total Orders", value: stats.totalOrders, icon: "📊", color: "from-cyan-500 to-blue-600" },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {statCards.map((stat, i) => (
                <div key={i} className={`glass-card p-4 ${stat.alert ? "border-[var(--warning)]" : ""}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

type RecentOrder = {
    id: string
    status: string
    totalAmount: number
    createdAt: Date
    table: { number: number }
    _count: { items: number }
}

// Async recent orders component
async function RecentOrders({ restaurantId }: { restaurantId: string }) {
    const recentOrders = await getCachedRecentOrders(restaurantId) as RecentOrder[]

    return (
        <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Recent Orders</h2>
                <Link href="/admin/billing" className="text-xs text-[var(--primary)]">View all →</Link>
            </div>
            {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No orders yet</p>
            ) : (
                <div className="space-y-2">
                    {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-sm font-bold">
                                    {order.table.number}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Table {order.table.number}</p>
                                    <p className="text-xs text-gray-400">{order._count.items} items</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">₹{order.totalAmount.toFixed(0)}</p>
                                <span className={`badge badge-${order.status.toLowerCase()} text-xs`}>{order.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.restaurantId) {
        redirect("/login")
    }

    const restaurantId = session.user.restaurantId
    const restaurantName = session.user.restaurantName || "Restaurant"

    return (
        <div className="p-6">
            {/* Header - renders immediately */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-400 text-sm">Welcome back, {restaurantName}!</p>
            </div>

            {/* Stats Grid - streams in */}
            <Suspense fallback={<StatsGridSkeleton />}>
                <StatsGrid restaurantId={restaurantId} />
            </Suspense>

            {/* Quick Actions - renders immediately */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Link href="/kitchen" className="glass-card p-4 hover:border-[var(--primary)]">
                    <div className="text-2xl mb-2">🍳</div>
                    <h3 className="font-medium">Kitchen</h3>
                </Link>
                <Link href="/admin/billing" className="glass-card p-4 hover:border-[var(--primary)]">
                    <div className="text-2xl mb-2">🧾</div>
                    <h3 className="font-medium">Billing</h3>
                </Link>
                <Link href="/admin/menu" className="glass-card p-4 hover:border-[var(--primary)]">
                    <div className="text-2xl mb-2">➕</div>
                    <h3 className="font-medium">Menu</h3>
                </Link>
                <Link href="/admin/tables" className="glass-card p-4 hover:border-[var(--primary)]">
                    <div className="text-2xl mb-2">📱</div>
                    <h3 className="font-medium">QR Codes</h3>
                </Link>
            </div>

            {/* Recent Orders - streams in */}
            <Suspense fallback={<RecentOrdersSkeleton />}>
                <RecentOrders restaurantId={restaurantId} />
            </Suspense>
        </div>
    )
}
