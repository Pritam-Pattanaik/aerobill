import { NextResponse } from "next/server"
import { getMetaAuthorizationUrl } from "@/lib/meta-api"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import crypto from "crypto"

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

        // Encode restaurantId in the state parameter with HMAC signature for security
        const payload = JSON.stringify({
            restaurantId: session.user.restaurantId,
            timestamp: Date.now(),
        })
        const payloadBase64 = Buffer.from(payload).toString("base64")
        const secret = process.env.NEXTAUTH_SECRET || ''
        const signature = crypto.createHmac('sha256', secret).update(payloadBase64).digest('hex')
        const state = `${payloadBase64}.${signature}`

        const authUrl = getMetaAuthorizationUrl(state)
        return NextResponse.redirect(authUrl)
    } catch (error) {
        console.error("Social media connect error:", error)
        return NextResponse.json({ error: "Failed to initiate connection" }, { status: 500 })
    }
}
