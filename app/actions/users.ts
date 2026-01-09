"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { requireRestaurantId } from "@/lib/session"
import { hash } from "bcryptjs"
import { Role } from "@prisma/client"

export async function getUsers() {
    try {
        const restaurantId = await requireRestaurantId()
        const users = await prisma.user.findMany({
            where: { restaurantId },
            orderBy: { name: "asc" },
            select: { id: true, name: true, email: true, role: true, createdAt: true }
        })
        return { success: true, users }
    } catch (error) {
        console.error("Failed to fetch users:", error)
        return { success: false, error: "Failed to fetch users", users: [] }
    }
}

export async function createUser(data: { name: string; email: string; password: string; role: Role }) {
    try {
        const restaurantId = await requireRestaurantId()

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
        if (existingUser) {
            return { success: false, error: "Email already registered" }
        }

        const passwordHash = await hash(data.password, 12)

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash,
                role: data.role,
                restaurantId
            }
        })

        revalidatePath("/admin/users")
        return { success: true, user }
    } catch (error) {
        console.error("Failed to create user:", error)
        return { success: false, error: "Failed to create user" }
    }
}

export async function deleteUser(id: string) {
    try {
        const restaurantId = await requireRestaurantId()

        // Prevent deleting the last owner (basic check)
        const userToDelete = await prisma.user.findUnique({ where: { id, restaurantId } })
        if (userToDelete?.role === "OWNER") {
            const ownerCount = await prisma.user.count({ where: { restaurantId, role: "OWNER" } })
            if (ownerCount <= 1) {
                return { success: false, error: "Cannot delete the only owner account" }
            }
        }

        await prisma.user.delete({ where: { id, restaurantId } })
        revalidatePath("/admin/users")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete user:", error)
        return { success: false, error: "Failed to delete user" }
    }
}
