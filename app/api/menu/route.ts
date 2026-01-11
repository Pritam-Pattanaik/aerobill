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

        const [products, categories, inventory] = await prisma.$transaction([
            prisma.product.findMany({
                where: { restaurantId },
                orderBy: { name: "asc" },
                include: {
                    category: { select: { id: true, name: true } },
                    inventory: { select: { id: true, name: true } },
                },
            }),
            prisma.category.findMany({
                where: { restaurantId },
                orderBy: { sortOrder: "asc" },
            }),
            prisma.inventory.findMany({
                where: { restaurantId },
                select: { id: true, name: true },
                orderBy: { name: "asc" },
            }),
        ])

        return NextResponse.json({
            products,
            categories,
            inventory,
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
