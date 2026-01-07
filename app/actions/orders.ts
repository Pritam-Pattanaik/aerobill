"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type CartItem = {
    productId: string
    name: string
    price: number
    quantity: number
}

export async function placeOrder(tableId: string, items: CartItem[]) {
    try {
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

        const order = await prisma.order.create({
            data: {
                tableId,
                totalAmount,
                status: "PENDING",
                paymentStatus: "UNPAID",
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        priceAtTime: item.price
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                table: true
            }
        })

        revalidatePath("/kitchen")
        return { success: true, order }
    } catch (error) {
        console.error("Failed to place order:", error)
        return { success: false, error: "Failed to place order" }
    }
}

export async function getActiveOrders() {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: {
                    in: ["PENDING", "COOKING"]
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                table: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        return { success: true, orders }
    } catch (error) {
        console.error("Failed to fetch orders:", error)
        return { success: false, error: "Failed to fetch orders", orders: [] }
    }
}

export async function getReadyOrders() {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: "READY",
                paymentStatus: "UNPAID"
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                table: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        return { success: true, orders }
    } catch (error) {
        console.error("Failed to fetch ready orders:", error)
        return { success: false, error: "Failed to fetch ready orders", orders: [] }
    }
}

export async function updateOrderStatus(orderId: string, status: "PENDING" | "COOKING" | "READY" | "BILLED") {
    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                inventory: true
                            }
                        }
                    }
                }
            }
        })

        revalidatePath("/kitchen")
        revalidatePath("/admin/billing")

        return { success: true, order }
    } catch (error) {
        console.error("Failed to update order status:", error)
        return { success: false, error: "Failed to update order status" }
    }
}

export async function billOrder(orderId: string) {
    try {
        // Start transaction
        const order = await prisma.$transaction(async (tx) => {
            // Get order with items and inventory info
            const orderData = await tx.order.findUnique({
                where: { id: orderId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    inventory: true
                                }
                            }
                        }
                    }
                }
            })

            if (!orderData) {
                throw new Error("Order not found")
            }

            // Deduct inventory for each item
            for (const item of orderData.items) {
                if (item.product.inventory) {
                    await tx.inventory.update({
                        where: { id: item.product.inventory.id },
                        data: {
                            quantity: {
                                decrement: item.quantity
                            }
                        }
                    })
                }
            }

            // Update order status to BILLED and payment status to PAID
            return await tx.order.update({
                where: { id: orderId },
                data: {
                    status: "BILLED",
                    paymentStatus: "PAID"
                },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    },
                    table: true
                }
            })
        })

        revalidatePath("/admin/billing")
        revalidatePath("/admin/inventory")

        return { success: true, order }
    } catch (error) {
        console.error("Failed to bill order:", error)
        return { success: false, error: "Failed to bill order" }
    }
}

export async function getOrderById(orderId: string) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                table: true
            }
        })

        return { success: true, order }
    } catch (error) {
        console.error("Failed to fetch order:", error)
        return { success: false, error: "Failed to fetch order" }
    }
}
