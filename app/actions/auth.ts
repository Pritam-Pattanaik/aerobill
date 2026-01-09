"use server"

import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

type RegisterInput = {
    restaurantName: string
    ownerName: string
    email: string
    password: string
    phone?: string
}

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .substring(0, 50)
}

export async function registerRestaurant(data: RegisterInput) {
    try {
        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        })
        if (existingUser) {
            return { success: false, error: "Email already registered" }
        }

        // Generate unique slug
        let slug = generateSlug(data.restaurantName)
        const existingSlug = await prisma.restaurant.findUnique({ where: { slug } })
        if (existingSlug) {
            slug = `${slug}-${Date.now().toString(36)}`
        }

        // Hash password
        const passwordHash = await hash(data.password, 12)

        // Create restaurant with subscription, owner, and settings in transaction
        const restaurant = await prisma.$transaction(async (tx) => {
            // Create restaurant
            const rest = await tx.restaurant.create({
                data: {
                    name: data.restaurantName,
                    slug,
                    email: data.email,
                    phone: data.phone || null,
                },
            })

            // Create FREE subscription
            await tx.subscription.create({
                data: {
                    restaurantId: rest.id,
                    plan: "FREE",
                    status: "ACTIVE",
                },
            })

            // Create owner user
            await tx.user.create({
                data: {
                    name: data.ownerName,
                    email: data.email,
                    passwordHash,
                    role: "OWNER",
                    restaurantId: rest.id,
                },
            })

            // Create default settings
            await tx.settings.create({
                data: {
                    cafeName: data.restaurantName,
                    restaurantId: rest.id,
                    taxRate: 0,
                },
            })

            return rest
        })

        return { success: true, restaurantId: restaurant.id, slug: restaurant.slug }
    } catch (error) {
        console.error("Registration error:", error)
        return { success: false, error: "Failed to create restaurant" }
    }
}
