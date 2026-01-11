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

        const inventory = await prisma.inventory.findMany({
            where: { restaurantId },
            orderBy: { name: "asc" },
        })

        return NextResponse.json({
            inventory,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
            }
        })
    } catch (error) {
        console.error("Inventory API error:", error)
        return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
    }
}
