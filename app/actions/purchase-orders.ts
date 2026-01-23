"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { POStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"

// Helper to validate super admin session
async function validateSuperAdmin() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isSuperAdmin) {
        throw new Error("Unauthorized: Super admin access required")
    }
    return session
}

// Get all purchase orders across all restaurants
export async function getAllPurchaseOrders(filters?: {
    status?: POStatus
    restaurantId?: string
    search?: string
    dateFrom?: Date
    dateTo?: Date
}) {
    try {
        await validateSuperAdmin()

        const where: Record<string, unknown> = {}

        if (filters?.status) {
            where.status = filters.status
        }

        if (filters?.restaurantId) {
            where.restaurantId = filters.restaurantId
        }

        if (filters?.dateFrom || filters?.dateTo) {
            where.createdAt = {}
            if (filters.dateFrom) {
                (where.createdAt as Record<string, Date>).gte = filters.dateFrom
            }
            if (filters.dateTo) {
                (where.createdAt as Record<string, Date>).lte = filters.dateTo
            }
        }

        const orders = await prisma.purchaseOrder.findMany({
            where,
            include: {
                items: {
                    include: {
                        marketplaceProduct: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        })

        // Get restaurant info for each order
        const restaurantIds = [...new Set(orders.map(o => o.restaurantId))]
        const restaurants = await prisma.restaurant.findMany({
            where: { id: { in: restaurantIds } },
            select: { id: true, name: true, email: true, phone: true }
        })

        const restaurantMap = new Map(restaurants.map(r => [r.id, r]))

        // Filter by search if provided
        let filteredOrders = orders.map(order => ({
            ...order,
            restaurant: restaurantMap.get(order.restaurantId) || null
        }))

        if (filters?.search) {
            const searchLower = filters.search.toLowerCase()
            filteredOrders = filteredOrders.filter(order =>
                order.orderNumber.toLowerCase().includes(searchLower) ||
                order.restaurant?.name.toLowerCase().includes(searchLower)
            )
        }

        return { success: true, orders: filteredOrders }
    } catch (error) {
        console.error("Failed to fetch purchase orders:", error)
        return { success: false, error: "Failed to fetch purchase orders", orders: [] }
    }
}

// Get single purchase order by ID
export async function getPurchaseOrderById(id: string) {
    try {
        await validateSuperAdmin()

        const order = await prisma.purchaseOrder.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        marketplaceProduct: true
                    }
                }
            }
        })

        if (!order) {
            return { success: false, error: "Order not found", order: null }
        }

        // Get restaurant info
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: order.restaurantId },
            select: { id: true, name: true, email: true, phone: true, address: true }
        })

        return {
            success: true,
            order: { ...order, restaurant }
        }
    } catch (error) {
        console.error("Failed to fetch purchase order:", error)
        return { success: false, error: "Failed to fetch purchase order", order: null }
    }
}

// Update purchase order status (super admin only)
// When marked as RECEIVED, auto-add items to restaurant's inventory
export async function updatePurchaseOrderStatusAdmin(id: string, status: POStatus) {
    try {
        await validateSuperAdmin()

        // Get the order first to access items and restaurantId
        const existingOrder = await prisma.purchaseOrder.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        marketplaceProduct: true
                    }
                }
            }
        })

        if (!existingOrder) {
            return { success: false, error: "Order not found" }
        }

        // Update the status
        const order = await prisma.purchaseOrder.update({
            where: { id },
            data: { status },
            include: {
                items: {
                    include: {
                        marketplaceProduct: true
                    }
                }
            }
        })

        // If status is RECEIVED, add items to restaurant's inventory
        if (status === "RECEIVED") {
            for (const item of order.items) {
                const product = item.marketplaceProduct

                // Try to find existing inventory item with same name in the restaurant
                let inventoryItem = await prisma.inventory.findFirst({
                    where: {
                        restaurantId: order.restaurantId,
                        name: product.name
                    }
                })

                if (inventoryItem) {
                    // Add quantity to existing inventory item
                    const previousQty = inventoryItem.quantity
                    inventoryItem = await prisma.inventory.update({
                        where: { id: inventoryItem.id },
                        data: {
                            quantity: { increment: item.quantity },
                            pricePerUnit: item.unitPrice // Update price to latest
                        }
                    })

                    // Log the addition
                    await prisma.inventoryLog.create({
                        data: {
                            inventoryId: inventoryItem.id,
                            type: "PURCHASE_RECEIVED",
                            quantity: item.quantity,
                            previousQty: previousQty,
                            newQty: inventoryItem.quantity,
                            reason: `Purchase Order ${order.orderNumber}`
                        }
                    })
                } else {
                    // Create new inventory item
                    inventoryItem = await prisma.inventory.create({
                        data: {
                            name: product.name,
                            quantity: item.quantity,
                            unit: product.unit,
                            pricePerUnit: item.unitPrice,
                            lowStockThreshold: 10,
                            restaurantId: order.restaurantId
                        }
                    })

                    // Log the addition
                    await prisma.inventoryLog.create({
                        data: {
                            inventoryId: inventoryItem.id,
                            type: "PURCHASE_RECEIVED",
                            quantity: item.quantity,
                            previousQty: 0,
                            newQty: item.quantity,
                            reason: `Purchase Order ${order.orderNumber} (New Item)`
                        }
                    })
                }
            }

            // Revalidate inventory pages
            revalidatePath("/admin/inventory")
            revalidatePath("/admin")
        }

        revalidatePath("/super-admin/purchase-orders")
        revalidatePath(`/super-admin/purchase-orders/${id}`)

        return { success: true, order }
    } catch (error) {
        console.error("Failed to update purchase order status:", error)
        return { success: false, error: "Failed to update status" }
    }
}

// Get purchase order statistics
export async function getPurchaseOrderStats() {
    try {
        await validateSuperAdmin()

        const [total, pending, ordered, received, cancelled] = await Promise.all([
            prisma.purchaseOrder.count(),
            prisma.purchaseOrder.count({ where: { status: "PENDING" } }),
            prisma.purchaseOrder.count({ where: { status: "ORDERED" } }),
            prisma.purchaseOrder.count({ where: { status: "RECEIVED" } }),
            prisma.purchaseOrder.count({ where: { status: "CANCELLED" } })
        ])

        // Get total revenue from all orders
        const allOrders = await prisma.purchaseOrder.findMany({
            select: { totalAmount: true }
        })
        const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0)

        // Get revenue from received orders only
        const receivedOrders = await prisma.purchaseOrder.findMany({
            where: { status: "RECEIVED" },
            select: { totalAmount: true }
        })
        const receivedRevenue = receivedOrders.reduce((sum, o) => sum + o.totalAmount, 0)

        return {
            success: true,
            stats: {
                total,
                pending,
                ordered,
                received,
                cancelled,
                totalRevenue,
                receivedRevenue
            }
        }
    } catch (error) {
        console.error("Failed to fetch purchase order stats:", error)
        return {
            success: false,
            stats: { total: 0, pending: 0, ordered: 0, received: 0, cancelled: 0, totalRevenue: 0, receivedRevenue: 0 }
        }
    }
}

// Get all restaurants for filter dropdown
export async function getRestaurantsForFilter() {
    try {
        await validateSuperAdmin()

        const restaurants = await prisma.restaurant.findMany({
            select: { id: true, name: true },
            orderBy: { name: "asc" }
        })

        return { success: true, restaurants }
    } catch (error) {
        console.error("Failed to fetch restaurants:", error)
        return { success: false, restaurants: [] }
    }
}
