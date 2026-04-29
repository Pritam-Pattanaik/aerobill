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

// ====== PUBLIC / CUSTOMER-FACING ======

// Get active offers for a restaurant (by slug) — shown on QR menu
export async function getPublicOffers(slug: string) {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { slug },
            select: { id: true }
        })
        if (!restaurant) return { success: false, offers: [] }

        const offers = await prisma.offer.findMany({
            where: { restaurantId: restaurant.id, isActive: true },
            select: {
                id: true,
                name: true,
                description: true,
                code: true,
                discountType: true,
                discountValue: true,
                minOrderValue: true,
                triggerType: true,
                triggerValue: true,
            },
            orderBy: { createdAt: "desc" }
        })
        return { success: true, offers }
    } catch (error) {
        console.error("Failed to fetch public offers:", error)
        return { success: false, offers: [] }
    }
}

// Validate a coupon code entered by customer or staff
export async function validateCoupon(code: string, restaurantSlug: string, orderAmount: number) {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { slug: restaurantSlug },
            select: { id: true }
        })
        if (!restaurant) return { success: false, error: "Restaurant not found" }

        const offer = await prisma.offer.findUnique({
            where: { code: code.toUpperCase() }
        })

        if (!offer) return { success: false, error: "Invalid coupon code" }
        if (!offer.isActive) return { success: false, error: "This offer is no longer active" }
        if (offer.restaurantId !== restaurant.id) return { success: false, error: "Invalid coupon code" }
        if (orderAmount < offer.minOrderValue) {
            return { success: false, error: `Minimum order ₹${offer.minOrderValue} required` }
        }

        // Calculate discount
        let discount = 0
        if (offer.discountType === "PERCENTAGE") {
            discount = Math.round(orderAmount * (offer.discountValue / 100) * 100) / 100
        } else {
            discount = offer.discountValue
        }

        // Discount should not exceed order total
        discount = Math.min(discount, orderAmount)

        return {
            success: true,
            offer: {
                id: offer.id,
                name: offer.name,
                code: offer.code,
                discountType: offer.discountType,
                discountValue: offer.discountValue,
            },
            discount
        }
    } catch (error) {
        console.error("Failed to validate coupon:", error)
        return { success: false, error: "Failed to validate coupon" }
    }
}

// Get auto-apply offers for billing (ORDER_AMOUNT trigger)
export async function getAutoApplyOffers(restaurantId: string, orderAmount: number) {
    try {
        const offers = await prisma.offer.findMany({
            where: {
                restaurantId,
                isActive: true,
                triggerType: "ORDER_AMOUNT",
                triggerValue: { lte: orderAmount },
                minOrderValue: { lte: orderAmount },
            },
            orderBy: { discountValue: "desc" },
            take: 1 // Best offer
        })

        if (offers.length === 0) return { success: true, offer: null, discount: 0 }

        const offer = offers[0]
        let discount = 0
        if (offer.discountType === "PERCENTAGE") {
            discount = Math.round(orderAmount * (offer.discountValue / 100) * 100) / 100
        } else {
            discount = offer.discountValue
        }
        discount = Math.min(discount, orderAmount)

        return {
            success: true,
            offer: {
                id: offer.id,
                name: offer.name,
                code: offer.code,
                discountType: offer.discountType,
                discountValue: offer.discountValue,
            },
            discount
        }
    } catch (error) {
        console.error("Failed to get auto-apply offers:", error)
        return { success: true, offer: null, discount: 0 }
    }
}
