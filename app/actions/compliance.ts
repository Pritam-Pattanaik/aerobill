"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DeletionStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"

// Request data deletion (Restaurant Admin)
export async function requestDataDeletion(reason: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.restaurantId) {
            return { success: false, error: "Unauthorized" }
        }

        // Check if there's already a pending request
        const existingRequest = await prisma.dataDeletionRequest.findFirst({
            where: {
                restaurantId: session.user.restaurantId,
                status: { in: ["PENDING", "PROCESSING"] }
            }
        })

        if (existingRequest) {
            return { success: false, error: "You already have a pending deletion request." }
        }

        const request = await prisma.dataDeletionRequest.create({
            data: {
                restaurantId: session.user.restaurantId,
                reason,
                status: "PENDING"
            }
        })

        revalidatePath("/admin/settings/data-deletion")
        return { success: true, request }
    } catch (error) {
        console.error("Failed to request data deletion:", error)
        return { success: false, error: "Failed to submit request" }
    }
}

// Get pending request for current restaurant (Restaurant Admin)
export async function getMyDeletionRequest() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.restaurantId) {
            return { success: false, error: "Unauthorized" }
        }

        const request = await prisma.dataDeletionRequest.findFirst({
            where: {
                restaurantId: session.user.restaurantId
            },
            orderBy: { createdAt: "desc" }
        })

        return { success: true, request }
    } catch (error) {
        console.error("Failed to get deletion request:", error)
        return { success: false, error: "Failed to fetch request" }
    }
}

// Get all deletion requests (Super Admin)
export async function getAllDeletionRequests() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.isSuperAdmin) {
            return { success: false, error: "Unauthorized: Super Admin only" }
        }

        const requests = await prisma.dataDeletionRequest.findMany({
            include: {
                restaurant: {
                    select: {
                        name: true,
                        email: true,
                        phone: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        })

        return { success: true, requests }
    } catch (error) {
        console.error("Failed to get all deletion requests:", error)
        return { success: false, error: "Failed to fetch requests" }
    }
}

// Update request status (Super Admin)
export async function updateDeletionStatus(requestId: string, status: DeletionStatus, adminNote?: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.isSuperAdmin) {
            return { success: false, error: "Unauthorized: Super Admin only" }
        }

        const request = await prisma.dataDeletionRequest.update({
            where: { id: requestId },
            data: {
                status,
                adminNote
            }
        })

        revalidatePath("/super-admin/data-deletion")
        return { success: true, request }
    } catch (error) {
        console.error("Failed to update deletion status:", error)
        return { success: false, error: "Failed to update status" }
    }
}
