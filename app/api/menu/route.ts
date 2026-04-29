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

        // Run queries sequentially to avoid Neon serverless connection pool issues
        const products = await prisma.product.findMany({
            where: { restaurantId },
            orderBy: { name: "asc" },
            include: {
                category: { select: { id: true, name: true } },
                inventory: { select: { id: true, name: true } },
            },
        })
        const categories = await prisma.category.findMany({
            where: { restaurantId },
            orderBy: { sortOrder: "asc" },
        })
        const inventory = await prisma.inventory.findMany({
            where: { restaurantId },
            select: { id: true, name: true, unit: true },
            orderBy: { name: "asc" },
        })
        const settings = await prisma.settings.findUnique({
            where: { restaurantId },
            select: { inventoryDeduction: true }
        })

        return NextResponse.json({
            products,
            categories,
            inventory,
            inventoryDeduction: settings?.inventoryDeduction ?? true
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
            }
        })
    } catch (error) {
        console.error("Menu API error:", error)
        return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 })
    }
}
