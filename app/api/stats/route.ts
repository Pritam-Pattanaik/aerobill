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

        // Run queries sequentially to avoid Neon serverless connection pool issues
        const totalOrders = await prisma.order.count({ where: { restaurantId } })
        const pendingOrders = await prisma.order.count({ where: { restaurantId, status: { in: ["PENDING", "COOKING"] } } })
        const todayRevenue = await prisma.order.aggregate({
            where: { restaurantId, status: "BILLED", createdAt: { gte: today } },
            _sum: { totalAmount: true },
        })
        const totalProducts = await prisma.product.count({ where: { restaurantId } })
        const totalTables = await prisma.table.count({ where: { restaurantId, isActive: true } })
        const allInventory = await prisma.inventory.findMany({
            where: { restaurantId },
            select: { id: true, name: true, quantity: true, unit: true, lowStockThreshold: true }
        })

        // Filter low stock items (quantity <= threshold)
        const lowStockItems = allInventory.filter(item => item.quantity <= item.lowStockThreshold)

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
                lowStockCount: lowStockItems.length,
                totalTables,
            },
            recentOrders,
            lowStockItems,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
            }
        })
    } catch (error) {
        console.error("Stats API error:", error)
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
    }
}
