"use server"

import { prisma } from "@/lib/prisma"
import { requireRestaurantId } from "@/lib/session"
import { postToFacebook, postToInstagram } from "@/lib/meta-api"
import { revalidatePath } from "next/cache"

/**
 * Get all connected social media accounts for the current restaurant
 */
export async function getConnectedAccounts() {
    try {
        const restaurantId = await requireRestaurantId()
        const accounts = await prisma.socialMediaAccount.findMany({
            where: { restaurantId, isActive: true },
            orderBy: { createdAt: "desc" },
        })
        return { success: true, accounts }
    } catch (error) {
        console.error("Failed to fetch social accounts:", error)
        return { success: false, error: "Failed to fetch accounts", accounts: [] }
    }
}

/**
 * Disconnect a social media account
 */
export async function disconnectAccount(accountId: string) {
    try {
        const restaurantId = await requireRestaurantId()
        await prisma.socialMediaAccount.delete({
            where: { id: accountId, restaurantId },
        })
        revalidatePath("/admin/social-media")
        return { success: true }
    } catch (error) {
        console.error("Failed to disconnect account:", error)
        return { success: false, error: "Failed to disconnect account" }
    }
}

/**
 * Publish a post to selected social media platforms
 */
export async function publishPost(data: {
    content: string
    imageUrl?: string
    platforms: string[] // ["FACEBOOK", "INSTAGRAM"]
}) {
    try {
        const restaurantId = await requireRestaurantId()

        // Get connected accounts for selected platforms
        const accounts = await prisma.socialMediaAccount.findMany({
            where: {
                restaurantId,
                isActive: true,
                platform: { in: data.platforms as ("FACEBOOK" | "INSTAGRAM")[] },
            },
        })

        if (accounts.length === 0) {
            return { success: false, error: "No connected accounts for selected platforms" }
        }

        // Instagram requires an image
        if (data.platforms.includes("INSTAGRAM") && !data.imageUrl) {
            return { success: false, error: "Instagram posts require an image" }
        }

        // Create the post record
        const post = await prisma.socialPost.create({
            data: {
                content: data.content,
                imageUrl: data.imageUrl || null,
                platforms: data.platforms.join(","),
                status: "PUBLISHING",
                restaurantId,
            },
        })

        const platformIds: Record<string, string> = {}
        const errors: string[] = []

        // Publish to each platform
        for (const account of accounts) {
            try {
                if (account.platform === "FACEBOOK") {
                    const result = await postToFacebook(
                        account.accountId,
                        account.accessToken,
                        data.content,
                        data.imageUrl
                    )
                    platformIds.facebook = result.id
                } else if (account.platform === "INSTAGRAM") {
                    if (!data.imageUrl) continue

                    const result = await postToInstagram(
                        account.accountId,
                        account.accessToken,
                        data.content,
                        data.imageUrl
                    )
                    platformIds.instagram = result.id
                }
            } catch (error) {
                const msg = error instanceof Error ? error.message : "Unknown error"
                errors.push(`${account.platform}: ${msg}`)
                console.error(`Failed to post to ${account.platform}:`, error)
            }
        }

        // Update post status
        const hasSuccess = Object.keys(platformIds).length > 0
        await prisma.socialPost.update({
            where: { id: post.id },
            data: {
                status: hasSuccess ? "PUBLISHED" : "FAILED",
                publishedAt: hasSuccess ? new Date() : null,
                platformIds: platformIds,
                error: errors.length > 0 ? errors.join("; ") : null,
            },
        })

        revalidatePath("/admin/social-media")

        if (errors.length > 0 && hasSuccess) {
            return {
                success: true,
                partial: true,
                message: `Published with some errors: ${errors.join("; ")}`,
                platformIds,
            }
        }

        if (!hasSuccess) {
            return { success: false, error: errors.join("; ") }
        }

        return { success: true, platformIds }
    } catch (error) {
        console.error("Failed to publish post:", error)
        return { success: false, error: "Failed to publish post" }
    }
}

/**
 * Get post history for the current restaurant
 */
export async function getPostHistory(limit = 20) {
    try {
        const restaurantId = await requireRestaurantId()
        const posts = await prisma.socialPost.findMany({
            where: { restaurantId },
            orderBy: { createdAt: "desc" },
            take: limit,
        })
        return { success: true, posts }
    } catch (error) {
        console.error("Failed to fetch post history:", error)
        return { success: false, error: "Failed to fetch history", posts: [] }
    }
}
