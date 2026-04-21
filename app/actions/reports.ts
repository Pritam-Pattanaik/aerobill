"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { startOfDay, endOfDay } from "date-fns"

export type ReportData = {
    totalSales: number
    totalPurchases: number
    totalGST: number
    inventoryValue: number
    inventoryDeduction: boolean
    dateRange: {
        from: Date
        to: Date
    }
    restaurant: {
        name: string
        email: string | null
        phone: string | null
        address: string | null
    }
}

export async function getRestaurantReport(
    restaurantId: string,
    startDate: Date,
    endDate: Date
): Promise<{ success: boolean; data?: ReportData; error?: string }> {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user || session.user.restaurantId !== restaurantId) {
            return { success: false, error: "Unauthorized access" }
        }

        // Fetch restaurant details for the report header
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: restaurantId },
            select: {
                name: true,
                email: true,
                phone: true,
                address: true,
            }
        })

        if (!restaurant) {
            return { success: false, error: "Restaurant not found" }
        }

        const start = startOfDay(startDate)
        const end = endOfDay(endDate)

        // 1. Total Sales (Orders)
        // Aggregating totalAmount from orders that are BILLED or whose paymentStatus is PAID
        const salesAgg = await prisma.order.aggregate({
            where: {
                restaurantId,
                createdAt: {
                    gte: start,
                    lte: end,
                },
                OR: [
                    { status: "BILLED" },
                    { paymentStatus: "PAID" }
                ]
            },
            _sum: {
                totalAmount: true,
            },
        })

        const totalSales = salesAgg._sum.totalAmount || 0

        // 2. Total Purchases
        // A. Marketplace Purchase Orders (Status: RECEIVED)
        // using updatedAt as proxy for received date if we don't have a specific receivedAt field
        const poAgg = await prisma.purchaseOrder.aggregate({
            where: {
                restaurantId,
                status: "RECEIVED",
                updatedAt: {
                    gte: start,
                    lte: end,
                },
            },
            _sum: {
                totalAmount: true,
            },
        })

        // B. Manual Daily Purchases
        const dailyPoAgg = await prisma.dailyPurchase.aggregate({
            where: {
                restaurantId,
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
            _sum: {
                price: true,
            },
        })

        const totalPurchases = (poAgg._sum.totalAmount || 0) + (dailyPoAgg._sum.price || 0)

        // 3. Fetch settings for GST rates and inventory deduction flag
        const settings = await prisma.settings.findFirst({
            where: { restaurantId },
            select: {
                cgst: true,
                sgst: true,
                taxRate: true,
                inventoryDeduction: true,
            },
        })

        // 4. Total GST Collected
        const gstRate = (settings?.cgst || 0) + (settings?.sgst || 0) + (settings?.taxRate || 0)
        const totalGST = Math.round(totalSales * (gstRate / 100) * 100) / 100

        const inventoryDeduction = settings?.inventoryDeduction ?? false

        // 5. Current Inventory Value (Snapshot - only if inventory deduction is enabled)
        let inventoryValue = 0
        if (inventoryDeduction) {
            const inventoryItems = await prisma.inventory.findMany({
                where: { restaurantId },
                select: {
                    quantity: true,
                    pricePerUnit: true,
                },
            })
            inventoryValue = inventoryItems.reduce((acc: number, item) => {
                return acc + (item.quantity * item.pricePerUnit)
            }, 0)
        }

        return {
            success: true,
            data: {
                totalSales,
                totalPurchases,
                totalGST,
                inventoryValue,
                inventoryDeduction,
                dateRange: {
                    from: start,
                    to: end,
                },
                restaurant,
            },
        }

    } catch (error) {
        console.error("Error generating report:", error)
        return { success: false, error: "Failed to generate report" }
    }
}
