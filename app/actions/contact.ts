"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Default contact info used when no record exists
const defaultContactInfo = {
    id: "contact-info",
    email: "support@aerobill.in",
    phone: "+91 9777295707",
    whatsapp: "+91 9777295707",
    address: "Bhubaneswar, Odisha, India",
    mapUrl: null,
    officeHours: "Mon-Sat: 9AM - 6PM IST",
    facebook: null,
    twitter: null,
    instagram: null,
    linkedin: null,
}

// Global cache to prevent excessive DB hits in serverless/dev
const globalForContact = globalThis as unknown as {
    contactCache: any
    contactCacheTime: number
}

// Get contact info (public)
export async function getContactInfo() {

    // Check in-memory cache first (valid for 5 minutes)
    const now = Date.now()
    if (globalForContact.contactCache && globalForContact.contactCacheTime > now - 5 * 60 * 1000) {
        return { success: true, contact: globalForContact.contactCache }
    }

    try {
        let contact = await prisma.contactInfo.findUnique({
            where: { id: "contact-info" }
        })

        // If no record exists, create one with defaults
        if (!contact) {
            contact = await prisma.contactInfo.create({
                data: defaultContactInfo
            })
        }

        // Update cache
        globalForContact.contactCache = contact
        globalForContact.contactCacheTime = Date.now()

        return { success: true, contact }
    } catch (error) {
        console.error("Failed to get contact info:", error)
        return { success: false, error: "Failed to get contact info", contact: defaultContactInfo }
    }
}

// Update contact info (super-admin only)
export async function updateContactInfo(data: {
    email?: string
    phone?: string
    whatsapp?: string
    address?: string
    mapUrl?: string
    officeHours?: string
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
}) {
    try {
        // Verify super-admin authentication
        const session = await getServerSession(authOptions)
        if (!session?.user?.isSuperAdmin) {
            return { success: false, error: "Unauthorized: Super admin access required" }
        }

        const contact = await prisma.contactInfo.upsert({
            where: { id: "contact-info" },
            update: {
                email: data.email,
                phone: data.phone,
                whatsapp: data.whatsapp || null,
                address: data.address,
                mapUrl: data.mapUrl || null,
                officeHours: data.officeHours,
                facebook: data.facebook || null,
                twitter: data.twitter || null,
                instagram: data.instagram || null,
                linkedin: data.linkedin || null,
            },
            create: {
                id: "contact-info",
                email: data.email || defaultContactInfo.email,
                phone: data.phone || defaultContactInfo.phone,
                whatsapp: data.whatsapp || defaultContactInfo.whatsapp,
                address: data.address || defaultContactInfo.address,
                mapUrl: data.mapUrl || null,
                officeHours: data.officeHours || defaultContactInfo.officeHours,
                facebook: data.facebook || null,
                twitter: data.twitter || null,
                instagram: data.instagram || null,
                linkedin: data.linkedin || null,
            }
        })

        // Invalidate global cache immediately
        globalForContact.contactCache = null
        globalForContact.contactCacheTime = 0

        // Invalidating all paths to ensure the footer and contact page update immediately
        try {
            revalidatePath("/", "layout")
        } catch (error) {
            console.warn("Failed to revalidate path (likely due to standalone context):", error)
        }

        return { success: true, contact }
    } catch (error) {
        console.error("Failed to update contact info:", error)
        return { success: false, error: "Failed to update contact info" }
    }
}
