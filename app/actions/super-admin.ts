"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Plan, SubStatus } from "@prisma/client"
import { unstable_cache, CacheConfig } from "@/lib/cache"

// Helper to validate super admin session
async function validateSuperAdmin() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isSuperAdmin) {
        throw new Error("Unauthorized: Super admin access required")
    }
    return session
}

// Internal function to fetch system stats
async function fetchSystemStats() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Run queries sequentially — Neon's serverless adapter uses a single WebSocket
    // connection and can't reliably handle many concurrent queries via Promise.all.
    const totalRestaurants = await prisma.restaurant.count()
    const activeRestaurants = await prisma.restaurant.count({ where: { isActive: true } })
    const subscriptionsByPlan = await prisma.subscription.groupBy({
        by: ["plan"],
        _count: { _all: true },
        orderBy: { plan: "asc" },
    })
    const todayOrders = await prisma.order.count({ where: { createdAt: { gte: today } } })
    const todayRevenue = await prisma.order.aggregate({
        where: { createdAt: { gte: today }, status: "BILLED" },
        _sum: { totalAmount: true },
    })
    const totalOrders = await prisma.order.count()
    const totalUsers = await prisma.user.count()

    // Format subscription counts
    const subscriptions = {
        FREE: 0,
        STARTER: 0,
        BUSINESS: 0,
        ENTERPRISE: 0,
    }
    subscriptionsByPlan.forEach((sub) => {
        const count = typeof sub._count === 'object' && sub._count !== null ? sub._count._all ?? 0 : 0
        subscriptions[sub.plan] = count
    })

    return {
        totalRestaurants,
        activeRestaurants,
        inactiveRestaurants: totalRestaurants - activeRestaurants,
        subscriptions,
        todayOrders,
        todayRevenue: todayRevenue._sum.totalAmount || 0,
        totalOrders,
        totalUsers,
    }
}

// Cached version of system stats (60 second TTL)
const getCachedSystemStats = unstable_cache(
    fetchSystemStats,
    ['system-stats'],
    CacheConfig.systemStats
)

// Get platform-wide statistics (with caching)
export async function getSystemStats() {
    await validateSuperAdmin()
    return getCachedSystemStats()
}

// Get all restaurants with subscription info
export async function getAllRestaurants(page = 1, limit = 20, search = "") {
    await validateSuperAdmin()

    const skip = (page - 1) * limit
    const where = search
        ? {
            OR: [
                { name: { contains: search, mode: "insensitive" as const } },
                { email: { contains: search, mode: "insensitive" as const } },
                { slug: { contains: search, mode: "insensitive" as const } },
            ],
        }
        : {}

    // Run queries sequentially — Neon's serverless adapter uses a single WebSocket
    // connection and can't reliably handle many concurrent queries via Promise.all.
    const restaurants = await prisma.restaurant.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
            subscription: true,
            _count: {
                select: {
                    orders: true,
                    users: true,
                    products: true,
                    tables: true,
                },
            },
        },
    })
    const total = await prisma.restaurant.count({ where })

    return {
        restaurants,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
    }
}

// Get single restaurant details
export async function getRestaurantDetails(id: string) {
    await validateSuperAdmin()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const restaurant = await prisma.restaurant.findUnique({
        where: { id },
        include: {
            subscription: true,
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            },
            settings: true,
            _count: {
                select: {
                    orders: true,
                    products: true,
                    tables: true,
                    categories: true,
                },
            },
        },
    })

    if (!restaurant) {
        return { success: false, error: "Restaurant not found" }
    }

    // Get today's stats for this restaurant
    // Run queries sequentially — Neon's serverless adapter uses a single WebSocket
    // connection and can't reliably handle many concurrent queries via Promise.all.
    const todayOrders = await prisma.order.count({
        where: { restaurantId: id, createdAt: { gte: today } },
    })
    const todayRevenue = await prisma.order.aggregate({
        where: { restaurantId: id, createdAt: { gte: today }, status: "BILLED" },
        _sum: { totalAmount: true },
    })
    const recentOrders = await prisma.order.findMany({
        where: { restaurantId: id },
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
            table: { select: { number: true } },
            _count: { select: { items: true } },
        },
    })

    return {
        success: true,
        restaurant,
        todayOrders,
        todayRevenue: todayRevenue._sum.totalAmount || 0,
        recentOrders,
    }
}

// Toggle restaurant active status
export async function toggleRestaurantActive(id: string) {
    await validateSuperAdmin()

    const restaurant = await prisma.restaurant.findUnique({
        where: { id },
        select: { isActive: true },
    })

    if (!restaurant) {
        return { success: false, error: "Restaurant not found" }
    }

    await prisma.restaurant.update({
        where: { id },
        data: { isActive: !restaurant.isActive },
    })

    return {
        success: true,
        isActive: !restaurant.isActive,
        message: `Restaurant ${!restaurant.isActive ? "activated" : "deactivated"} successfully`,
    }
}

// Update restaurant subscription
export async function updateSubscription(
    restaurantId: string,
    plan: Plan,
    status?: SubStatus,
    expiresAt?: Date
) {
    await validateSuperAdmin()

    const subscription = await prisma.subscription.findUnique({
        where: { restaurantId },
    })

    if (!subscription) {
        // Create subscription if doesn't exist
        await prisma.subscription.create({
            data: {
                restaurantId,
                plan,
                status: status || "ACTIVE",
                expiresAt,
            },
        })
    } else {
        await prisma.subscription.update({
            where: { restaurantId },
            data: {
                plan,
                ...(status && { status }),
                ...(expiresAt && { expiresAt }),
            },
        })
    }

    return { success: true, message: "Subscription updated successfully" }
}

// Get all subscriptions with restaurant info
export async function getAllSubscriptions(filter?: { plan?: Plan; status?: SubStatus }) {
    await validateSuperAdmin()

    const where = {
        ...(filter?.plan && { plan: filter.plan }),
        ...(filter?.status && { status: filter.status }),
    }

    const subscriptions = await prisma.subscription.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
            restaurant: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    isActive: true,
                },
            },
        },
    })

    return { subscriptions }
}

// Get orders analytics across all restaurants
export async function getOrdersAnalytics(days = 7) {
    await validateSuperAdmin()

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)

    // Get daily order counts and revenue
    const orders = await prisma.order.findMany({
        where: { createdAt: { gte: startDate } },
        select: {
            createdAt: true,
            totalAmount: true,
            status: true,
            restaurant: {
                select: { name: true },
            },
        },
    })

    // Group by date
    const dailyStats: Record<string, { orders: number; revenue: number }> = {}

    orders.forEach((order) => {
        const date = order.createdAt.toISOString().split("T")[0]
        if (!dailyStats[date]) {
            dailyStats[date] = { orders: 0, revenue: 0 }
        }
        dailyStats[date].orders++
        if (order.status === "BILLED") {
            dailyStats[date].revenue += order.totalAmount
        }
    })

    // Get top restaurants by orders
    const topRestaurants = await prisma.order.groupBy({
        by: ["restaurantId"],
        where: { createdAt: { gte: startDate } },
        _count: { id: true },
        _sum: { totalAmount: true },
        orderBy: { _count: { id: "desc" } },
        take: 5,
    })

    // Get restaurant names
    const restaurantIds = topRestaurants.map((r) => r.restaurantId)
    const restaurants = await prisma.restaurant.findMany({
        where: { id: { in: restaurantIds } },
        select: { id: true, name: true },
    })

    const restaurantMap = Object.fromEntries(
        restaurants.map((r) => [r.id, r.name])
    )

    return {
        dailyStats,
        topRestaurants: topRestaurants.map((r) => ({
            name: restaurantMap[r.restaurantId],
            orders: r._count.id,
            revenue: r._sum.totalAmount || 0,
        })),
        totalOrders: orders.length,
        totalRevenue: orders
            .filter((o) => o.status === "BILLED")
            .reduce((sum, o) => sum + o.totalAmount, 0),
    }
}
