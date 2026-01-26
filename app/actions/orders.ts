"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { requireRestaurantId } from "@/lib/session"
import { deductInventoryForOrder } from "./inventory"
import { sendWhatsAppMessage, formatThankYouMessage } from "@/lib/whatsapp"

// Helper: Send WhatsApp notification after billing
async function sendBillingWhatsApp(restaurantId: string, customerPhone: string | null, totalAmount: number) {
    if (!customerPhone) return // No phone, skip

    try {
        const settings = await prisma.settings.findUnique({
            where: { restaurantId },
            select: {
                whatsappEnabled: true,
                whatsappInstance: true,
                whatsappToken: true,
                whatsappMessage: true,
                cafeName: true
            }
        })

        if (!settings?.whatsappEnabled || !settings.whatsappInstance || !settings.whatsappToken) {
            return // WhatsApp not configured
        }

        const message = formatThankYouMessage(
            settings.whatsappMessage,
            settings.cafeName,
            totalAmount
        )

        await sendWhatsAppMessage(customerPhone, message, {
            instanceId: settings.whatsappInstance,
            token: settings.whatsappToken
        })

        console.log(`WhatsApp sent to ${customerPhone} for ₹${totalAmount}`)
    } catch (error) {
        console.error("Failed to send WhatsApp:", error)
        // Don't throw - billing should still succeed even if WhatsApp fails
    }
}

export type CartItem = { productId: string; name: string; price: number; quantity: number }

// Phone is optional
export async function placeOrder(tableId: string, items: CartItem[], guestName?: string, customerPhone?: string) {
    try {
        // Get restaurant from table
        const table = await prisma.table.findUnique({ where: { id: tableId } })
        if (!table) return { success: false, error: "Table not found" }

        // Find or create customer if phone provided
        let customerId: string | undefined
        if (customerPhone && guestName) {
            try {
                const customer = await prisma.customer.upsert({
                    where: {
                        restaurantId_phone: {
                            restaurantId: table.restaurantId,
                            phone: customerPhone
                        }
                    },
                    update: { name: guestName }, // Update name to latest
                    create: {
                        name: guestName,
                        phone: customerPhone,
                        restaurantId: table.restaurantId
                    }
                })
                customerId = customer.id
            } catch (e) {
                console.error("Failed to create/link customer", e)
            }
        }

        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const order = await prisma.order.create({
            data: {
                tableId,
                totalAmount,
                status: "PENDING",
                paymentStatus: "UNPAID",
                restaurantId: table.restaurantId,
                guestName: guestName || null,
                customerId,
                items: { create: items.map((item) => ({ productId: item.productId, quantity: item.quantity, priceAtTime: item.price })) }
            },
            include: { items: { include: { product: true } }, table: true }
        })

        // Handle Customer Creation/Linking (Fire and forget or await)
        if (guestName || (items as any).phone) { // Casting items to any to access phone if passed, wait, I need to update signature.
            // Moving logic outside to keep placeOrder clean, or I should update signature.
        }

        revalidatePath("/kitchen")
        return { success: true, order }
    } catch (error) {
        console.error("Failed to place order:", error)
        return { success: false, error: "Failed to place order" }
    }
}

export async function getActiveOrders() {
    try {
        const restaurantId = await requireRestaurantId()
        const orders = await prisma.order.findMany({
            where: { restaurantId, status: { in: ["PENDING", "COOKING"] } },
            include: { items: { include: { product: true } }, table: true },
            orderBy: { createdAt: "asc" }
        })
        return { success: true, orders }
    } catch (error) {
        console.error("Failed to fetch orders:", error)
        return { success: false, error: "Failed to fetch orders", orders: [] }
    }
}

export async function getReadyOrders() {
    try {
        const restaurantId = await requireRestaurantId()
        const orders = await prisma.order.findMany({
            where: { restaurantId, status: "READY", paymentStatus: "UNPAID" },
            include: { items: { include: { product: true } }, table: true },
            orderBy: { createdAt: "asc" }
        })
        return { success: true, orders }
    } catch (error) {
        console.error("Failed to fetch ready orders:", error)
        return { success: false, error: "Failed to fetch ready orders", orders: [] }
    }
}

export async function updateOrderStatus(orderId: string, status: "PENDING" | "COOKING" | "READY" | "BILLED") {
    try {
        const restaurantId = await requireRestaurantId()
        const order = await prisma.order.update({
            where: { id: orderId, restaurantId },
            data: { status },
            include: { items: { include: { product: { include: { inventory: true } } } } }
        })
        revalidatePath("/kitchen")
        revalidatePath("/admin/billing")
        return { success: true, order }
    } catch (error) {
        console.error("Failed to update order status:", error)
        return { success: false, error: "Failed to update order status" }
    }
}

export async function billOrder(orderId: string, customerPhone?: string) {
    try {
        const restaurantId = await requireRestaurantId()

        // Update order status
        const order = await prisma.order.update({
            where: { id: orderId, restaurantId },
            data: { status: "BILLED", paymentStatus: "PAID" },
            include: { items: { include: { product: true } }, table: true }
        })

        // Deduct inventory if enabled
        const settings = await prisma.settings.findUnique({ where: { restaurantId }, select: { inventoryDeduction: true } })
        if (settings?.inventoryDeduction !== false) {
            await deductInventoryForOrder(orderId)
        }

        // Send WhatsApp notification (non-blocking)
        if (customerPhone) {
            sendBillingWhatsApp(restaurantId, customerPhone, order.totalAmount)
        }

        revalidatePath("/admin/billing")
        revalidatePath("/admin/inventory")
        revalidatePath("/admin")
        return { success: true, order }
    } catch (error) {
        console.error("Failed to bill order:", error)
        return { success: false, error: "Failed to bill order" }
    }
}

export async function getOrderById(orderId: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const order = await prisma.order.findUnique({
            where: { id: orderId, restaurantId },
            include: { items: { include: { product: true } }, table: true }
        })
        return { success: true, order }
    } catch (error) {
        console.error("Failed to fetch order:", error)
        return { success: false, error: "Failed to fetch order" }
    }
}

export async function getBillingHistory(date?: string) {
    try {
        const restaurantId = await requireRestaurantId()

        // Default to today if no date provided
        const targetDate = date ? new Date(date) : new Date()
        const startOfDay = new Date(targetDate)
        startOfDay.setHours(0, 0, 0, 0)
        const endOfDay = new Date(targetDate)
        endOfDay.setHours(23, 59, 59, 999)

        const orders = await prisma.order.findMany({
            where: {
                restaurantId,
                status: "BILLED",
                updatedAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            include: { items: { include: { product: true } }, table: true },
            orderBy: { updatedAt: "desc" }
        })

        // Calculate totals for the day
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
        const totalOrders = orders.length

        return {
            success: true,
            orders,
            summary: {
                totalRevenue,
                totalOrders,
                date: targetDate.toISOString().split('T')[0]
            }
        }
    } catch (error) {
        console.error("Failed to fetch billing history:", error)
        return { success: false, error: "Failed to fetch billing history", orders: [], summary: null }
    }
}

// Get ready orders grouped by table and guest for combined billing
export async function getReadyOrdersByTable() {
    try {
        const restaurantId = await requireRestaurantId()
        const orders = await prisma.order.findMany({
            where: { restaurantId, status: "READY", paymentStatus: "UNPAID" },
            include: { items: { include: { product: true } }, table: true },
            orderBy: { createdAt: "asc" }
        })

        // Group orders by table, then by guest
        const tableGroups: Record<string, {
            tableId: string
            tableNumber: number
            orders: typeof orders
            totalAmount: number
            totalItems: number
            guests: Record<string, {
                guestName: string
                orders: typeof orders
                totalAmount: number
                totalItems: number
            }>
        }> = {}

        for (const order of orders) {
            const tableId = order.tableId
            const guestName = order.guestName || "Guest"

            if (!tableGroups[tableId]) {
                tableGroups[tableId] = {
                    tableId,
                    tableNumber: order.table.number,
                    orders: [],
                    totalAmount: 0,
                    totalItems: 0,
                    guests: {}
                }
            }

            // Add to table totals
            tableGroups[tableId].orders.push(order)
            tableGroups[tableId].totalAmount += order.totalAmount
            tableGroups[tableId].totalItems += order.items.reduce((sum, item) => sum + item.quantity, 0)

            // Add to guest grouping
            if (!tableGroups[tableId].guests[guestName]) {
                tableGroups[tableId].guests[guestName] = {
                    guestName,
                    orders: [],
                    totalAmount: 0,
                    totalItems: 0
                }
            }
            tableGroups[tableId].guests[guestName].orders.push(order)
            tableGroups[tableId].guests[guestName].totalAmount += order.totalAmount
            tableGroups[tableId].guests[guestName].totalItems += order.items.reduce((sum, item) => sum + item.quantity, 0)
        }

        // Convert to array and sort by table number
        const tables = Object.values(tableGroups).sort((a, b) => a.tableNumber - b.tableNumber)

        return { success: true, tables }
    } catch (error) {
        console.error("Failed to fetch orders by table:", error)
        return { success: false, error: "Failed to fetch orders by table", tables: [] }
    }
}

// Bill all orders for a table at once
export async function billTableOrders(tableId: string, customerPhone?: string) {
    try {
        const restaurantId = await requireRestaurantId()

        const result = await prisma.$transaction(async (tx) => {
            // Get all unpaid ready orders for this table
            const orders = await tx.order.findMany({
                where: { tableId, restaurantId, status: "READY", paymentStatus: "UNPAID" },
                include: { items: { include: { product: { include: { inventory: true } } } }, table: true }
            })

            if (orders.length === 0) {
                throw new Error("No orders to bill for this table")
            }

            // Deduct inventory for all orders if enabled
            const settings = await tx.settings.findUnique({ where: { restaurantId }, select: { inventoryDeduction: true } })

            if (settings?.inventoryDeduction !== false) {
                for (const order of orders) {
                    for (const item of order.items) {
                        if (item.product.inventory) {
                            await tx.inventory.update({
                                where: { id: item.product.inventory.id },
                                data: { quantity: { decrement: item.quantity } }
                            })
                        }
                    }
                }
            }

            // Update all orders to BILLED
            await tx.order.updateMany({
                where: {
                    id: { in: orders.map(o => o.id) },
                    restaurantId
                },
                data: { status: "BILLED", paymentStatus: "PAID" }
            })

            // Return combined order data for receipt
            const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0)
            const allItems = orders.flatMap(order => order.items)

            return {
                tableNumber: orders[0].table.number,
                orders: orders.map(o => ({
                    id: o.id,
                    createdAt: o.createdAt,
                    items: o.items
                })),
                totalAmount,
                allItems,
                orderCount: orders.length
            }
        })

        // Send WhatsApp notification (non-blocking)
        if (customerPhone) {
            sendBillingWhatsApp(restaurantId, customerPhone, result.totalAmount)
        }

        revalidatePath("/admin/billing")
        revalidatePath("/admin/inventory")
        return { success: true, ...result }
    } catch (error) {
        console.error("Failed to bill table orders:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to bill orders" }
    }
}

// Bill orders for a specific guest at a table
export async function billGuestOrders(tableId: string, guestName: string) {
    try {
        const restaurantId = await requireRestaurantId()

        // Normalize guest name for matching
        const matchGuestName = guestName === "Guest" ? null : guestName

        const result = await prisma.$transaction(async (tx) => {
            // Get all unpaid ready orders for this guest at this table
            const orders = await tx.order.findMany({
                where: {
                    tableId,
                    restaurantId,
                    status: "READY",
                    paymentStatus: "UNPAID",
                    guestName: matchGuestName
                },
                include: { items: { include: { product: { include: { inventory: true } } } }, table: true }
            })

            if (orders.length === 0) {
                throw new Error("No orders to bill for this guest")
            }

            // Deduct inventory for all orders if enabled
            const settings = await tx.settings.findUnique({ where: { restaurantId }, select: { inventoryDeduction: true } })

            if (settings?.inventoryDeduction !== false) {
                for (const order of orders) {
                    for (const item of order.items) {
                        if (item.product.inventory) {
                            await tx.inventory.update({
                                where: { id: item.product.inventory.id },
                                data: { quantity: { decrement: item.quantity } }
                            })
                        }
                    }
                }
            }

            // Update all orders to BILLED
            await tx.order.updateMany({
                where: {
                    id: { in: orders.map(o => o.id) },
                    restaurantId
                },
                data: { status: "BILLED", paymentStatus: "PAID" }
            })

            // Return order data for receipt
            const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0)
            const allItems = orders.flatMap(order => order.items)

            return {
                guestName: guestName,
                tableNumber: orders[0].table.number,
                orders: orders.map(o => ({
                    id: o.id,
                    createdAt: o.createdAt,
                    items: o.items
                })),
                totalAmount,
                allItems,
                orderCount: orders.length
            }
        })

        revalidatePath("/admin/billing")
        revalidatePath("/admin/inventory")
        return { success: true, ...result }
    } catch (error) {
        console.error("Failed to bill guest orders:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to bill orders" }
    }
}

// Update order items (add/remove/update quantity) - Manual Edit
export async function updateOrderItems(orderId: string, items: { productId: string; quantity: number }[]) {
    try {
        const restaurantId = await requireRestaurantId()

        const order = await prisma.order.findUnique({
            where: { id: orderId, restaurantId },
            include: { items: true }
        })

        if (!order) return { success: false, error: "Order not found" }
        if (order.status === "BILLED" || order.paymentStatus === "PAID") {
            return { success: false, error: "Cannot edit billed orders" }
        }

        await prisma.$transaction(async (tx) => {
            // Process each item update
            for (const item of items) {
                if (item.quantity <= 0) {
                    // Remove item
                    await tx.orderItem.deleteMany({
                        where: { orderId, productId: item.productId }
                    })
                } else {
                    // Get current product price
                    const product = await tx.product.findUnique({
                        where: { id: item.productId }
                    })

                    if (!product) continue

                    // Upsert item
                    const existingItem = order.items.find(i => i.productId === item.productId)
                    if (existingItem) {
                        await tx.orderItem.update({
                            where: { id: existingItem.id },
                            data: { quantity: item.quantity }
                        })
                    } else {
                        await tx.orderItem.create({
                            data: {
                                orderId,
                                productId: item.productId,
                                quantity: item.quantity,
                                priceAtTime: product.price
                            }
                        })
                    }
                }
            }

            // Recalculate total amount
            const updatedItems = await tx.orderItem.findMany({
                where: { orderId }
            })
            const newTotalAmount = updatedItems.reduce((sum, item) => sum + (item.priceAtTime * item.quantity), 0)

            // Update order total
            await tx.order.update({
                where: { id: orderId },
                data: { totalAmount: newTotalAmount }
            })
        })

        revalidatePath("/kitchen")
        revalidatePath("/admin/billing")

        return { success: true }
    } catch (error) {
        console.error("Failed to update order items:", error)
        return { success: false, error: "Failed to update order items" }
    }
}

// Get active order for tracking by customer/table
export async function getActiveOrderForTable(tableId: string) {
    try {
        // Fetch the most recent active order for the table
        const order = await prisma.order.findFirst({
            where: {
                tableId,
                status: { in: ["PENDING", "COOKING", "READY"] },
                paymentStatus: "UNPAID"
            },
            include: {
                items: { include: { product: true } },
                customer: { select: { name: true } }
            },
            orderBy: { createdAt: "desc" }
        })

        if (!order) return { success: true, order: null }
        return { success: true, order }
    } catch (error) {
        console.error("Failed to fetch active order:", error)
        return { success: false, error: "Failed to fetch active order" }
    }
}
