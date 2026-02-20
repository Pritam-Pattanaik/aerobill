"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { requireRestaurantId } from "@/lib/session"
import { DiscountType, TriggerType } from "@prisma/client"

export async function getOffers() {
    try {
        const restaurantId = await requireRestaurantId()
        const offers = await prisma.offer.findMany({
            where: { restaurantId },
            orderBy: { createdAt: "desc" }
        })
        return { success: true, offers }
    } catch (error) {
        console.error("Failed to fetch offers:", error)
        return { success: false, error: "Failed to fetch offers", offers: [] }
    }
}

export async function createOffer(data: {
    name: string
    description?: string
    code: string
    discountType: DiscountType
    discountValue: number
    minOrderValue: number
    triggerType: TriggerType
    triggerValue: number
}) {
    try {
        const restaurantId = await requireRestaurantId()

        // Check if code exists
        const existing = await prisma.offer.findUnique({
            where: { code: data.code }
        })

        if (existing) {
            return { success: false, error: "Offer code already exists" }
        }

        const offer = await prisma.offer.create({
            data: {
                ...data,
                restaurantId
            }
        })
        revalidatePath("/admin/offers")
        return { success: true, offer }
    } catch (error) {
        console.error("Failed to create offer:", error)
        return { success: false, error: "Failed to create offer" }
    }
}

export async function updateOffer(id: string, data: {
    name: string
    description?: string
    discountType: DiscountType
    discountValue: number
    minOrderValue: number
    triggerType: TriggerType
    triggerValue: number
    isActive: boolean
}) {
    try {
        const restaurantId = await requireRestaurantId()
        const offer = await prisma.offer.update({
            where: { id, restaurantId },
            data
        })
        revalidatePath("/admin/offers")
        return { success: true, offer }
    } catch (error) {
        console.error("Failed to update offer:", error)
        return { success: false, error: "Failed to update offer" }
    }
}

export async function deleteOffer(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        await prisma.offer.delete({
            where: { id, restaurantId }
        })
        revalidatePath("/admin/offers")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete offer:", error)
        return { success: false, error: "Failed to delete offer" }
    }
}

export async function toggleOfferStatus(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const offer = await prisma.offer.findUnique({ where: { id, restaurantId } })
        if (!offer) return { success: false, error: "Offer not found" }

        const updated = await prisma.offer.update({
            where: { id, restaurantId },
            data: { isActive: !offer.isActive }
        })
        revalidatePath("/admin/offers")
        return { success: true, offer: updated }
    } catch (error) {
        console.error("Failed to toggle offer status:", error)
        return { success: false, error: "Failed to toggle status" }
    }
}
