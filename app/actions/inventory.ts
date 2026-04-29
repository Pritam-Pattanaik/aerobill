"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { unstable_cache } from "next/cache"
import { requireRestaurantId, requireRole } from "@/lib/session"
import { LogType, POStatus } from "@prisma/client"

// =====================================
// INVENTORY ITEMS
// =====================================

const getInventoryFromDb = async (restaurantId: string) => {
    return prisma.inventory.findMany({
        where: { restaurantId },
        include: {
            products: { select: { id: true, name: true } },
            ingredients: { include: { product: { select: { id: true, name: true } } } }
        },
        orderBy: { name: "asc" }
    })
}

export async function getInventory() {
    try {
        const restaurantId = await requireRestaurantId()
        const getCached = unstable_cache(
            () => getInventoryFromDb(restaurantId),
            [`inventory-${restaurantId}`],
            { revalidate: 30 }
        )
        const inventory = await getCached()
        return { success: true, inventory }
    } catch (error) {
        console.error("Failed to fetch inventory:", error)
        return { success: false, error: "Failed to fetch inventory", inventory: [] }
    }
}

export async function createInventoryItem(data: {
    name: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    lowStockThreshold?: number;
}) {
    try {
        const restaurantId = await requireRestaurantId()
        const item = await prisma.inventory.create({
            data: {
                ...data,
                lowStockThreshold: data.lowStockThreshold ?? 10,
                restaurantId
            }
        })

        // Log the addition
        await prisma.inventoryLog.create({
            data: {
                inventoryId: item.id,
                type: LogType.ADDITION,
                quantity: data.quantity,
                previousQty: 0,
                newQty: data.quantity,
                reason: "Initial stock"
            }
        })

        revalidatePath("/admin/inventory")
        revalidatePath("/admin")
        return { success: true, item }
    } catch (error) {
        console.error("Failed to create inventory item:", error)
        return { success: false, error: "Failed to create inventory item" }
    }
}

export async function updateInventoryItem(id: string, data: {
    name: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    lowStockThreshold?: number;
}) {
    try {
        const restaurantId = await requireRestaurantId()
        const oldItem = await prisma.inventory.findUnique({ where: { id } })

        const item = await prisma.inventory.update({
            where: { id, restaurantId },
            data: {
                name: data.name,
                quantity: data.quantity,
                unit: data.unit,
                pricePerUnit: data.pricePerUnit,
                lowStockThreshold: data.lowStockThreshold ?? 10
            }
        })

        // Log if quantity changed
        if (oldItem && oldItem.quantity !== data.quantity) {
            await prisma.inventoryLog.create({
                data: {
                    inventoryId: id,
                    type: LogType.ADJUSTMENT,
                    quantity: data.quantity - oldItem.quantity,
                    previousQty: oldItem.quantity,
                    newQty: data.quantity,
                    reason: "Manual update"
                }
            })
        }

        revalidatePath("/admin/inventory")
        revalidatePath("/admin")
        return { success: true, item }
    } catch (error) {
        console.error("Failed to update inventory item:", error)
        return { success: false, error: "Failed to update inventory item" }
    }
}

export async function deleteInventoryItem(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const linkedProducts = await prisma.product.findMany({ where: { inventoryId: id, restaurantId } })
        if (linkedProducts.length > 0) {
            return { success: false, error: `Cannot delete: ${linkedProducts.length} product(s) linked` }
        }
        await prisma.inventory.delete({ where: { id, restaurantId } })
        revalidatePath("/admin/inventory")
        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete inventory item:", error)
        return { success: false, error: "Failed to delete inventory item" }
    }
}

export async function adjustInventoryQuantity(id: string, adjustment: number, reason?: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const oldItem = await prisma.inventory.findUnique({ where: { id } })
        if (!oldItem) return { success: false, error: "Item not found" }

        const newQuantity = oldItem.quantity + adjustment
        if (newQuantity < 0) {
            return { success: false, error: "Adjustment would result in negative stock" }
        }

        const item = await prisma.inventory.update({
            where: { id, restaurantId },
            data: { quantity: { increment: adjustment } }
        })

        // Log the adjustment
        await prisma.inventoryLog.create({
            data: {
                inventoryId: id,
                type: adjustment > 0 ? LogType.ADDITION : LogType.DEDUCTION,
                quantity: adjustment,
                previousQty: oldItem.quantity,
                newQty: item.quantity,
                reason: reason || "Manual adjustment"
            }
        })

        revalidatePath("/admin/inventory")
        revalidatePath("/admin")
        return { success: true, item }
    } catch (error) {
        console.error("Failed to adjust inventory quantity:", error)
        return { success: false, error: "Failed to adjust quantity" }
    }
}

// =====================================
// LOW STOCK NOTIFICATIONS
// =====================================

async function getLowStockItems() {
    try {
        const restaurantId = await requireRestaurantId()
        // Get items where quantity <= lowStockThreshold
        const items = await prisma.inventory.findMany({
            where: {
                restaurantId,
                quantity: { lte: prisma.inventory.fields.lowStockThreshold }
            },
            orderBy: { quantity: "asc" }
        })
        return { success: true, items }
    } catch {
        // Fallback: manual comparison
        try {
            const restaurantId = await requireRestaurantId()
            const allItems = await prisma.inventory.findMany({ where: { restaurantId } })
            const lowStock = allItems.filter(item => item.quantity <= item.lowStockThreshold)
            return { success: true, items: lowStock }
        } catch (error) {
            console.error("Failed to fetch low stock items:", error)
            return { success: false, error: "Failed to fetch low stock items", items: [] }
        }
    }
}

async function getLowStockCount() {
    try {
        const restaurantId = await requireRestaurantId()
        const allItems = await prisma.inventory.findMany({ where: { restaurantId } })
        const count = allItems.filter(item => item.quantity <= item.lowStockThreshold).length
        return { success: true, count }
    } catch (error) {
        console.error("Failed to get low stock count:", error)
        return { success: false, count: 0 }
    }
}

// =====================================
// PRODUCT INGREDIENTS (RECIPES)
// =====================================

async function getProductIngredients(productId: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const ingredients = await prisma.productIngredient.findMany({
            where: { productId, restaurantId },
            include: { inventory: true }
        })
        return { success: true, ingredients }
    } catch (error) {
        console.error("Failed to fetch product ingredients:", error)
        return { success: false, error: "Failed to fetch ingredients", ingredients: [] }
    }
}

async function addProductIngredient(productId: string, inventoryId: string, quantity: number) {
    try {
        const restaurantId = await requireRestaurantId()
        const ingredient = await prisma.productIngredient.create({
            data: { productId, inventoryId, quantity, restaurantId }
        })
        revalidatePath("/admin/menu")
        return { success: true, ingredient }
    } catch (error) {
        console.error("Failed to add ingredient:", error)
        return { success: false, error: "Failed to add ingredient" }
    }
}

async function updateProductIngredient(id: string, quantity: number) {
    try {
        const restaurantId = await requireRestaurantId()
        const ingredient = await prisma.productIngredient.updateMany({
            where: { id, restaurantId },
            data: { quantity }
        })
        revalidatePath("/admin/menu")
        return { success: true, ingredient }
    } catch (error) {
        console.error("Failed to update ingredient:", error)
        return { success: false, error: "Failed to update ingredient" }
    }
}

async function removeProductIngredient(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        await prisma.productIngredient.deleteMany({ where: { id, restaurantId } })
        revalidatePath("/admin/menu")
        return { success: true }
    } catch (error) {
        console.error("Failed to remove ingredient:", error)
        return { success: false, error: "Failed to remove ingredient" }
    }
}

// Auto-deduct inventory when order is completed
export async function deductInventoryForOrder(orderId: string, restaurantId?: string) {
    try {
        // Build query with restaurantId scoping if provided
        const whereClause: { id: string; restaurantId?: string } = { id: orderId }
        if (restaurantId) {
            whereClause.restaurantId = restaurantId
        }

        const order = await prisma.order.findUnique({
            where: whereClause,
            include: {
                items: {
                    include: {
                        product: {
                            include: { ingredients: true }
                        }
                    }
                }
            }
        })

        if (!order) return { success: false, error: "Order not found" }

        // For each order item, deduct ingredients
        for (const item of order.items) {
            for (const ingredient of item.product.ingredients) {
                const deductQty = ingredient.quantity * item.quantity
                const inv = await prisma.inventory.findUnique({ where: { id: ingredient.inventoryId } })
                if (!inv) continue

                await prisma.inventory.update({
                    where: { id: ingredient.inventoryId },
                    data: { quantity: { decrement: deductQty } }
                })

                await prisma.inventoryLog.create({
                    data: {
                        inventoryId: ingredient.inventoryId,
                        type: LogType.ORDER_DEDUCTION,
                        quantity: -deductQty,
                        previousQty: inv.quantity,
                        newQty: inv.quantity - deductQty,
                        reason: `Order #${orderId.slice(-6)}`
                    }
                })
            }
        }

        revalidatePath("/admin/inventory")
        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error("Failed to deduct inventory:", error)
        return { success: false, error: "Failed to deduct inventory" }
    }
}

// =====================================
// PURCHASE ORDERS (Marketplace Orders)
// =====================================

export async function getPurchaseOrders() {
    try {
        const restaurantId = await requireRestaurantId()
        const orders = await prisma.purchaseOrder.findMany({
            where: { restaurantId },
            include: { items: { include: { marketplaceProduct: true } } },
            orderBy: { createdAt: "desc" }
        })
        return { success: true, orders }
    } catch (error) {
        console.error("Failed to fetch purchase orders:", error)
        return { success: false, error: "Failed to fetch purchase orders", orders: [] }
    }
}

export async function createMarketplaceOrder(data: {
    notes?: string;
    items: Array<{ marketplaceProductId: string; quantity: number; unitPrice: number }>;
}) {
    try {
        const restaurantId = await requireRestaurantId()
        const orderNumber = `PO-${Date.now().toString().slice(-8)}`
        const productIds = data.items.map(item => item.marketplaceProductId)
        const products = await prisma.marketplaceProduct.findMany({
            where: { id: { in: productIds } }
        })

        const productMap = new Map(products.map(p => [p.id, p]))

        // Recalculate total securely
        const secureItems = data.items.map(item => {
            const dbProduct = productMap.get(item.marketplaceProductId)
            if (!dbProduct) throw new Error(`Marketplace product not found: ${item.marketplaceProductId}`)
            return {
                marketplaceProductId: item.marketplaceProductId,
                quantity: item.quantity,
                unitPrice: dbProduct.price
            }
        })

        const totalAmount = secureItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)

        // 48 hours from now
        const estimatedDelivery = new Date()
        estimatedDelivery.setHours(estimatedDelivery.getHours() + 48)

        const order = await prisma.purchaseOrder.create({
            data: {
                orderNumber,
                notes: data.notes,
                totalAmount,
                restaurantId,
                status: "ORDERED", // Immediately ordered from marketplace
                estimatedDelivery,
                items: { create: secureItems }
            },
            include: { items: true }
        })

        revalidatePath("/admin/purchase-orders")
        return { success: true, order }
    } catch (error) {
        console.error("Failed to create marketplace order:", error)
        return { success: false, error: "Failed to create order" }
    }
}

export async function updatePurchaseOrderStatus(id: string, status: POStatus) {
    try {
        const { restaurantId } = await requireRole(["OWNER", "ADMIN"])

        const order = await prisma.purchaseOrder.update({
            where: { id, restaurantId },
            data: { status },
            include: { items: { include: { marketplaceProduct: true } } }
        })

        // If status is RECEIVED, add items to restaurant's inventory
        if (status === "RECEIVED") {
            for (const item of order.items) {
                const product = item.marketplaceProduct

                // Try to find existing inventory item with same name
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
                            pricePerUnit: item.unitPrice
                        }
                    })

                    // Log the addition
                    await prisma.inventoryLog.create({
                        data: {
                            inventoryId: inventoryItem.id,
                            type: LogType.PURCHASE_RECEIVED,
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
                            type: LogType.PURCHASE_RECEIVED,
                            quantity: item.quantity,
                            previousQty: 0,
                            newQty: item.quantity,
                            reason: `Purchase Order ${order.orderNumber} (New Item)`
                        }
                    })
                }
            }

            revalidatePath("/admin/inventory")
        }

        revalidatePath("/admin/purchase-orders")
        revalidatePath("/admin")
        return { success: true, order }
    } catch (error) {
        console.error("Failed to update purchase order:", error)
        return { success: false, error: "Failed to update purchase order" }
    }
}

async function deletePurchaseOrder(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        await prisma.purchaseOrder.delete({ where: { id, restaurantId } })
        revalidatePath("/admin/purchase-orders")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete purchase order:", error)
        return { success: false, error: "Failed to delete purchase order" }
    }
}

// =====================================
// INVENTORY LOGS
// =====================================

export async function getInventoryLogs(inventoryId?: string, limit: number = 50) {
    try {
        const restaurantId = await requireRestaurantId()
        const inventoryIds = inventoryId
            ? [inventoryId]
            : (await prisma.inventory.findMany({ where: { restaurantId }, select: { id: true } })).map(i => i.id)

        const logs = await prisma.inventoryLog.findMany({
            where: { inventoryId: { in: inventoryIds } },
            include: { inventory: { select: { name: true, unit: true } } },
            orderBy: { createdAt: "desc" },
            take: limit
        })
        return { success: true, logs }
    } catch (error) {
        console.error("Failed to fetch inventory logs:", error)
        return { success: false, error: "Failed to fetch logs", logs: [] }
    }
}

// =====================================
// DAILY PURCHASES (Manual entries)
// =====================================

export async function createDailyPurchase(data: {
    name: string
    quantity: number
    unit: string
    price: number
}) {
    try {
        const restaurantId = await requireRestaurantId()
        const purchase = await prisma.dailyPurchase.create({
            data: {
                name: data.name,
                quantity: data.quantity,
                unit: data.unit,
                price: data.price,
                restaurantId
            }
        })
        revalidatePath("/admin/purchase-orders")
        return { success: true, purchase }
    } catch (error) {
        console.error("Failed to create daily purchase:", error)
        return { success: false, error: "Failed to create daily purchase" }
    }
}

export async function getDailyPurchases(date?: string) {
    try {
        const restaurantId = await requireRestaurantId()

        // If date provided, filter by that date
        const targetDate = date ? new Date(date) : new Date()
        const startOfDay = new Date(targetDate)
        startOfDay.setHours(0, 0, 0, 0)
        const endOfDay = new Date(targetDate)
        endOfDay.setHours(23, 59, 59, 999)

        const purchases = await prisma.dailyPurchase.findMany({
            where: {
                restaurantId,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            orderBy: { createdAt: "desc" }
        })

        const total = purchases.reduce((sum, p) => sum + p.price, 0)

        return { success: true, purchases, total }
    } catch (error) {
        console.error("Failed to fetch daily purchases:", error)
        return { success: false, error: "Failed to fetch daily purchases", purchases: [], total: 0 }
    }
}

export async function deleteDailyPurchase(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        await prisma.dailyPurchase.delete({
            where: { id, restaurantId }
        })
        revalidatePath("/admin/purchase-orders")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete daily purchase:", error)
        return { success: false, error: "Failed to delete daily purchase" }
    }
}

// Get purchase history for a specific date (both marketplace + daily)
export async function getPurchaseHistory(date: string) {
    try {
        const restaurantId = await requireRestaurantId()

        const targetDate = new Date(date)
        const startOfDay = new Date(targetDate)
        startOfDay.setHours(0, 0, 0, 0)
        const endOfDay = new Date(targetDate)
        endOfDay.setHours(23, 59, 59, 999)

        // Get marketplace purchase orders for this date
        const marketplaceOrders = await prisma.purchaseOrder.findMany({
            where: {
                restaurantId,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            include: {
                items: {
                    include: {
                        marketplaceProduct: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        })

        // Get daily purchases for this date
        const dailyPurchases = await prisma.dailyPurchase.findMany({
            where: {
                restaurantId,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            orderBy: { createdAt: "desc" }
        })

        const marketplaceTotal = marketplaceOrders.reduce((sum, o) => sum + o.totalAmount, 0)
        const dailyTotal = dailyPurchases.reduce((sum, p) => sum + p.price, 0)

        return {
            success: true,
            marketplaceOrders,
            dailyPurchases,
            summary: {
                marketplaceTotal,
                dailyTotal,
                grandTotal: marketplaceTotal + dailyTotal,
                marketplaceCount: marketplaceOrders.length,
                dailyCount: dailyPurchases.length
            }
        }
    } catch (error) {
        console.error("Failed to fetch purchase history:", error)
        return {
            success: false,
            error: "Failed to fetch purchase history",
            marketplaceOrders: [],
            dailyPurchases: [],
            summary: { marketplaceTotal: 0, dailyTotal: 0, grandTotal: 0, marketplaceCount: 0, dailyCount: 0 }
        }
    }
}
