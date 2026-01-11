import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.restaurantId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const restaurantId = session.user.restaurantId
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

        // Get recent orders
        const recentOrders = await prisma.order.findMany({
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

        return NextResponse.json({
            stats: {
                totalOrders,
                pendingOrders,
                todayRevenue: todayRevenue._sum.totalAmount || 0,
                totalProducts,
                lowStockCount,
                totalTables,
            },
            recentOrders,
        }, {
            headers: {
                // Cache for 30 seconds on CDN edge
                'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
            }
        })
    } catch (error) {
        console.error("Stats API error:", error)
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
    }
}
