"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { unstable_cache } from "next/cache"
import { requireRestaurantId } from "@/lib/session"

// Cached query for inventory
const getInventoryFromDb = async (restaurantId: string) => {
    return prisma.inventory.findMany({
        where: { restaurantId },
        include: { products: { select: { id: true, name: true } } },
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

export async function createInventoryItem(data: { name: string; quantity: number; unit: string; pricePerUnit: number }) {
    try {
        const restaurantId = await requireRestaurantId()
        const item = await prisma.inventory.create({
            data: { ...data, restaurantId }
        })
        revalidatePath("/admin/inventory")
        return { success: true, item }
    } catch (error) {
        console.error("Failed to create inventory item:", error)
        return { success: false, error: "Failed to create inventory item" }
    }
}

export async function updateInventoryItem(id: string, data: { name: string; quantity: number; unit: string; pricePerUnit: number }) {
    try {
        const restaurantId = await requireRestaurantId()
        const item = await prisma.inventory.update({
            where: { id, restaurantId },
            data: { name: data.name, quantity: data.quantity, unit: data.unit, pricePerUnit: data.pricePerUnit }
        })
        revalidatePath("/admin/inventory")
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
        return { success: true }
    } catch (error) {
        console.error("Failed to delete inventory item:", error)
        return { success: false, error: "Failed to delete inventory item" }
    }
}

export async function adjustInventoryQuantity(id: string, adjustment: number) {
    try {
        const restaurantId = await requireRestaurantId()
        const item = await prisma.inventory.update({
            where: { id, restaurantId },
            data: { quantity: { increment: adjustment } }
        })
        revalidatePath("/admin/inventory")
        return { success: true, item }
    } catch (error) {
        console.error("Failed to adjust inventory quantity:", error)
        return { success: false, error: "Failed to adjust quantity" }
    }
}

// Cached query for low stock items
const getLowStockFromDb = async (restaurantId: string, threshold: number) => {
    return prisma.inventory.findMany({
        where: { restaurantId, quantity: { lte: threshold } },
        orderBy: { quantity: "asc" }
    })
}

export async function getLowStockItems(threshold: number = 10) {
    try {
        const restaurantId = await requireRestaurantId()

        const getCached = unstable_cache(
            () => getLowStockFromDb(restaurantId, threshold),
            [`lowstock-${restaurantId}-${threshold}`],
            { revalidate: 30 }
        )

        const items = await getCached()
        return { success: true, items }
    } catch (error) {
        console.error("Failed to fetch low stock items:", error)
        return { success: false, error: "Failed to fetch low stock items", items: [] }
    }
}
