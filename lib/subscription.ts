
import { prisma } from "@/lib/prisma"

const PLAN_LIMITS = {
    FREE: {
        products: 30,
        tables: 5
    },
    STARTER: {
        products: 100,
        tables: 10
    },
    BUSINESS: {
        products: Infinity,
        tables: 25
    },
    ENTERPRISE: {
        products: Infinity,
        tables: Infinity
    }
} as const

type PlanType = keyof typeof PLAN_LIMITS

export async function checkProductLimit(restaurantId: string): Promise<{ allowed: boolean; limit: number; current: number }> {
    // 1. Get current plan
    const subscription = await prisma.subscription.findUnique({
        where: { restaurantId },
        select: { plan: true, status: true }
    })

    const plan = (subscription?.status === 'ACTIVE' ? subscription.plan : 'FREE') as PlanType
    const limit = PLAN_LIMITS[plan]?.products ?? PLAN_LIMITS.FREE.products

    if (limit === Infinity) {
        return { allowed: true, limit, current: 0 }
    }

    // 2. Get current count
    const count = await prisma.product.count({
        where: { restaurantId }
    })

    return {
        allowed: count < limit,
        limit,
        current: count
    }
}

async function checkTableLimit(restaurantId: string): Promise<{ allowed: boolean; limit: number; current: number }> {
    // 1. Get current plan
    const subscription = await prisma.subscription.findUnique({
        where: { restaurantId },
        select: { plan: true, status: true }
    })

    const plan = (subscription?.status === 'ACTIVE' ? subscription.plan : 'FREE') as PlanType
    const limit = PLAN_LIMITS[plan]?.tables ?? PLAN_LIMITS.FREE.tables

    if (limit === Infinity) {
        return { allowed: true, limit, current: 0 }
    }

    // 2. Get current count
    const count = await prisma.table.count({
        where: { restaurantId }
    })

    return {
        allowed: count < limit,
        limit,
        current: count
    }
}
