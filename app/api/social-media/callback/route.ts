import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {
    exchangeCodeForToken,
    getLongLivedToken,
    getFacebookPages,
    getInstagramAccount,
} from "@/lib/meta-api"

/**
 * GET /api/social-media/callback
 * Handles the OAuth callback from Meta, stores tokens and account info
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const code = searchParams.get("code")
        const state = searchParams.get("state")
        const error = searchParams.get("error")

        // User denied permission
        if (error) {
            console.error("OAuth error:", error)
            return NextResponse.redirect(
                new URL("/admin/social-media?error=denied", request.url)
            )
        }

        if (!code || !state) {
            return NextResponse.redirect(
                new URL("/admin/social-media?error=invalid", request.url)
            )
        }

        // Decode state to get restaurantId
        let restaurantId: string
        try {
            const decoded = JSON.parse(Buffer.from(state, "base64").toString())
            restaurantId = decoded.restaurantId
        } catch {
            return NextResponse.redirect(
                new URL("/admin/social-media?error=invalid_state", request.url)
            )
        }

        // Verify restaurant exists
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: restaurantId },
        })
        if (!restaurant) {
            return NextResponse.redirect(
                new URL("/admin/social-media?error=restaurant_not_found", request.url)
            )
        }

        // Step 1: Exchange code for short-lived token
        const tokenData = await exchangeCodeForToken(code)

        // Step 2: Exchange for long-lived token (60 days)
        const longLivedData = await getLongLivedToken(tokenData.access_token)
        const tokenExpiry = new Date(Date.now() + longLivedData.expires_in * 1000)

        // Step 3: Get Facebook Pages the user manages
        const pages = await getFacebookPages(longLivedData.access_token)

        if (pages.length === 0) {
            return NextResponse.redirect(
                new URL("/admin/social-media?error=no_pages", request.url)
            )
        }

        // Store each Facebook Page as a connected account
        for (const page of pages) {
            // Upsert Facebook Page account
            await prisma.socialMediaAccount.upsert({
                where: {
                    restaurantId_platform_accountId: {
                        restaurantId,
                        platform: "FACEBOOK",
                        accountId: page.id,
                    },
                },
                update: {
                    accountName: page.name,
                    accessToken: page.access_token,
                    tokenExpiry,
                    profileImage: page.picture?.data?.url || null,
                    isActive: true,
                },
                create: {
                    platform: "FACEBOOK",
                    accountId: page.id,
                    accountName: page.name,
                    accessToken: page.access_token,
                    tokenExpiry,
                    profileImage: page.picture?.data?.url || null,
                    pageId: page.id,
                    restaurantId,
                },
            })

            // Step 4: Check for linked Instagram Business account
            const igAccount = await getInstagramAccount(page.id, page.access_token)

            if (igAccount) {
                await prisma.socialMediaAccount.upsert({
                    where: {
                        restaurantId_platform_accountId: {
                            restaurantId,
                            platform: "INSTAGRAM",
                            accountId: igAccount.id,
                        },
                    },
                    update: {
                        accountName: igAccount.username || igAccount.name,
                        accessToken: page.access_token, // IG uses the Page access token
                        tokenExpiry,
                        profileImage: igAccount.profile_picture_url || null,
                        pageId: page.id,
                        isActive: true,
                    },
                    create: {
                        platform: "INSTAGRAM",
                        accountId: igAccount.id,
                        accountName: igAccount.username || igAccount.name,
                        accessToken: page.access_token,
                        tokenExpiry,
                        profileImage: igAccount.profile_picture_url || null,
                        pageId: page.id,
                        restaurantId,
                    },
                })
            }
        }

        return NextResponse.redirect(
            new URL("/admin/social-media?success=connected", request.url)
        )
    } catch (error) {
        console.error("OAuth callback error:", error)
        return NextResponse.redirect(
            new URL("/admin/social-media?error=connection_failed", request.url)
        )
    }
}
