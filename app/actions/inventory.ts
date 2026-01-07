"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getInventory() {
    try {
        const inventory = await prisma.inventory.findMany({
            include: {
                products: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                name: "asc"
            }
        })

        return { success: true, inventory }
    } catch (error) {
        console.error("Failed to fetch inventory:", error)
        return { success: false, error: "Failed to fetch inventory", inventory: [] }
    }
}

export async function createInventoryItem(data: {
    name: string
    quantity: number
    unit: string
    pricePerUnit: number
}) {
    try {
        const item = await prisma.inventory.create({
            data: {
                name: data.name,
                quantity: data.quantity,
                unit: data.unit,
                pricePerUnit: data.pricePerUnit
            }
        })

        revalidatePath("/admin/inventory")
        return { success: true, item }
    } catch (error) {
        console.error("Failed to create inventory item:", error)
        return { success: false, error: "Failed to create inventory item" }
    }
}

export async function updateInventoryItem(
    id: string,
    data: {
        name: string
        quantity: number
        unit: string
        pricePerUnit: number
    }
) {
    try {
        const item = await prisma.inventory.update({
            where: { id },
            data: {
                name: data.name,
                quantity: data.quantity,
                unit: data.unit,
                pricePerUnit: data.pricePerUnit
            }
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
        // Check if any products are linked to this inventory item
        const linkedProducts = await prisma.product.findMany({
            where: { inventoryId: id }
        })

        if (linkedProducts.length > 0) {
            return {
                success: false,
                error: `Cannot delete: ${linkedProducts.length} product(s) linked to this inventory item`
            }
        }

        await prisma.inventory.delete({
            where: { id }
        })

        revalidatePath("/admin/inventory")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete inventory item:", error)
        return { success: false, error: "Failed to delete inventory item" }
    }
}

export async function adjustInventoryQuantity(id: string, adjustment: number) {
    try {
        const item = await prisma.inventory.update({
            where: { id },
            data: {
                quantity: {
                    increment: adjustment
                }
            }
        })

        revalidatePath("/admin/inventory")
        return { success: true, item }
    } catch (error) {
        console.error("Failed to adjust inventory quantity:", error)
        return { success: false, error: "Failed to adjust quantity" }
    }
}

export async function getLowStockItems(threshold: number = 10) {
    try {
        const items = await prisma.inventory.findMany({
            where: {
                quantity: {
                    lte: threshold
                }
            },
            orderBy: {
                quantity: "asc"
            }
        })

        return { success: true, items }
    } catch (error) {
        console.error("Failed to fetch low stock items:", error)
        return { success: false, error: "Failed to fetch low stock items", items: [] }
    }
}
