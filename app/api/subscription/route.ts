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

        const subscription = await prisma.subscription.findUnique({
            where: { restaurantId: session.user.restaurantId },
        })

        if (!subscription) {
            return NextResponse.json({
                plan: "FREE",
                status: "ACTIVE",
                expiresAt: null,
            })
        }

        return NextResponse.json({
            plan: subscription.plan,
            status: subscription.status,
            expiresAt: subscription.expiresAt?.toISOString() || null,
        })
    } catch (error) {
        console.error("Subscription API error:", error)
        return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
    }
}
