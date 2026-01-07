"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getTables() {
    try {
        const tables = await prisma.table.findMany({
            orderBy: {
                number: "asc"
            }
        })

        return { success: true, tables }
    } catch (error) {
        console.error("Failed to fetch tables:", error)
        return { success: false, error: "Failed to fetch tables", tables: [] }
    }
}

export async function getTableByNumber(number: number) {
    try {
        const table = await prisma.table.findUnique({
            where: { number }
        })

        return { success: true, table }
    } catch (error) {
        console.error("Failed to fetch table:", error)
        return { success: false, error: "Failed to fetch table" }
    }
}

export async function createTables(count: number) {
    try {
        // Get the highest existing table number
        const lastTable = await prisma.table.findFirst({
            orderBy: {
                number: "desc"
            }
        })

        const startNumber = (lastTable?.number || 0) + 1

        // Create tables in bulk
        const tables = await prisma.table.createMany({
            data: Array.from({ length: count }, (_, i) => ({
                number: startNumber + i,
                isActive: true
            }))
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
        const table = await prisma.table.findUnique({
            where: { id }
        })

        if (!table) {
            return { success: false, error: "Table not found" }
        }

        const updated = await prisma.table.update({
            where: { id },
            data: {
                isActive: !table.isActive
            }
        })

        revalidatePath("/admin/tables")
        return { success: true, table: updated }
    } catch (error) {
        console.error("Failed to toggle table status:", error)
        return { success: false, error: "Failed to toggle table status" }
    }
}

export async function deleteTable(id: string) {
    try {
        // Check if table has any orders
        const orders = await prisma.order.findMany({
            where: { tableId: id }
        })

        if (orders.length > 0) {
            return {
                success: false,
                error: "Cannot delete: This table has order history"
            }
        }

        await prisma.table.delete({
            where: { id }
        })

        revalidatePath("/admin/tables")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete table:", error)
        return { success: false, error: "Failed to delete table" }
    }
}

export async function getSettings() {
    try {
        let settings = await prisma.settings.findFirst()

        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    cafeName: "Aerobill Cafe",
                    taxRate: 0
                }
            })
        }

        return { success: true, settings }
    } catch (error) {
        console.error("Failed to fetch settings:", error)
        return { success: false, error: "Failed to fetch settings" }
    }
}

export async function updateSettings(data: {
    cafeName: string
    feedbackLink?: string
    taxRate: number
}) {
    try {
        let settings = await prisma.settings.findFirst()

        if (settings) {
            settings = await prisma.settings.update({
                where: { id: settings.id },
                data: {
                    cafeName: data.cafeName,
                    feedbackLink: data.feedbackLink || null,
                    taxRate: data.taxRate
                }
            })
        } else {
            settings = await prisma.settings.create({
                data: {
                    cafeName: data.cafeName,
                    feedbackLink: data.feedbackLink || null,
                    taxRate: data.taxRate
                }
            })
        }

        revalidatePath("/admin/settings")
        return { success: true, settings }
    } catch (error) {
        console.error("Failed to update settings:", error)
        return { success: false, error: "Failed to update settings" }
    }
}
