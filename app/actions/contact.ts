"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Default contact info used when no record exists
const defaultContactInfo = {
    id: "contact-info",
    email: "support@aerobill.in",
    phone: "+91 8736098253",
    whatsapp: "+91 8736098253",
    address: "Bhubaneswar, Odisha, India",
    mapUrl: null,
    officeHours: "Mon-Sat: 9AM - 6PM IST",
    facebook: null,
    twitter: null,
    instagram: null,
    linkedin: null,
}

// Get contact info (public)
export async function getContactInfo() {
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

        revalidatePath("/contact")
        revalidatePath("/super-admin/contact")

        return { success: true, contact }
    } catch (error) {
        console.error("Failed to update contact info:", error)
        return { success: false, error: "Failed to update contact info" }
    }
}
