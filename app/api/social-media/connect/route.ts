import { NextResponse } from "next/server"
import { getMetaAuthorizationUrl } from "@/lib/meta-api"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * GET /api/social-media/connect
 * Initiates the Meta OAuth flow by redirecting to Facebook login
 */
export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.restaurantId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Encode restaurantId in the state parameter for security
        const state = Buffer.from(JSON.stringify({
            restaurantId: session.user.restaurantId,
            timestamp: Date.now(),
        })).toString("base64")

        const authUrl = getMetaAuthorizationUrl(state)
        return NextResponse.redirect(authUrl)
    } catch (error) {
        console.error("Social media connect error:", error)
        return NextResponse.json({ error: "Failed to initiate connection" }, { status: 500 })
    }
}
