"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { requireRestaurantId } from "@/lib/session"

export async function getTables() {
    try {
        const restaurantId = await requireRestaurantId()
        const tables = await prisma.table.findMany({ where: { restaurantId }, orderBy: { number: "asc" } })
        return { success: true, tables }
    } catch (error) {
        console.error("Failed to fetch tables:", error)
        return { success: false, error: "Failed to fetch tables", tables: [] }
    }
}

export async function getTableByNumber(restaurantSlug: string, number: number) {
    try {
        const restaurant = await prisma.restaurant.findUnique({ where: { slug: restaurantSlug } })
        if (!restaurant) return { success: false, error: "Restaurant not found" }
        const table = await prisma.table.findUnique({ where: { restaurantId_number: { restaurantId: restaurant.id, number } } })
        return { success: true, table, restaurant }
    } catch (error) {
        console.error("Failed to fetch table:", error)
        return { success: false, error: "Failed to fetch table" }
    }
}

export async function createTables(count: number) {
    try {
        const restaurantId = await requireRestaurantId()
        const lastTable = await prisma.table.findFirst({ where: { restaurantId }, orderBy: { number: "desc" } })
        const startNumber = (lastTable?.number || 0) + 1
        const tables = await prisma.table.createMany({
            data: Array.from({ length: count }, (_, i) => ({ number: startNumber + i, isActive: true, restaurantId }))
        })
        revalidatePath("/admin/tables")
        return { success: true, count: tables.count }
    } catch (error) {
        console.error("Failed to create tables:", error)
        return { success: false, error: "Failed to create tables" }
    }
}

export async function toggleTableStatus(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const table = await prisma.table.findUnique({ where: { id, restaurantId } })
        if (!table) return { success: false, error: "Table not found" }
        const updated = await prisma.table.update({ where: { id, restaurantId }, data: { isActive: !table.isActive } })
        revalidatePath("/admin/tables")
        return { success: true, table: updated }
    } catch (error) {
        console.error("Failed to toggle table status:", error)
        return { success: false, error: "Failed to toggle table status" }
    }
}

export async function deleteTable(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const orders = await prisma.order.findMany({ where: { tableId: id, restaurantId } })
        if (orders.length > 0) return { success: false, error: "Cannot delete: This table has order history" }
        await prisma.table.delete({ where: { id, restaurantId } })
        revalidatePath("/admin/tables")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete table:", error)
        return { success: false, error: "Failed to delete table" }
    }
}

export async function getSettings() {
    try {
        const restaurantId = await requireRestaurantId()
        let settings = await prisma.settings.findUnique({ where: { restaurantId } })
        if (!settings) {
            settings = await prisma.settings.create({ data: { cafeName: "My Restaurant", taxRate: 0, restaurantId } })
        }
        return { success: true, settings }
    } catch (error) {
        console.error("Failed to fetch settings:", error)
        return { success: false, error: "Failed to fetch settings" }
    }
}

export async function updateSettings(data: { cafeName: string; feedbackLink?: string; taxRate: number }) {
    try {
        const restaurantId = await requireRestaurantId()
        const settings = await prisma.settings.upsert({
            where: { restaurantId },
            update: { cafeName: data.cafeName, feedbackLink: data.feedbackLink || null, taxRate: data.taxRate },
            create: { cafeName: data.cafeName, feedbackLink: data.feedbackLink || null, taxRate: data.taxRate, restaurantId }
        })
        revalidatePath("/admin/settings")
        return { success: true, settings }
    } catch (error) {
        console.error("Failed to update settings:", error)
        return { success: false, error: "Failed to update settings" }
    }
}
