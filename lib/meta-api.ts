/**
 * Meta Graph API Helper Library
 * Handles Facebook and Instagram API interactions
 */

const META_GRAPH_URL = "https://graph.facebook.com/v22.0"
const META_APP_ID = process.env.META_APP_ID!
const META_APP_SECRET = process.env.META_APP_SECRET!
const META_REDIRECT_URI = process.env.META_REDIRECT_URI!

// Required permissions for Facebook Page posting + Instagram
const SCOPES = [
    "pages_show_list",
    "pages_read_engagement",
    "instagram_basic",
    "instagram_content_publish",
].join(",")

/**
 * Generate OAuth authorization URL for Meta login
 */
export function getMetaAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
        client_id: META_APP_ID,
        redirect_uri: META_REDIRECT_URI,
        scope: SCOPES,
        response_type: "code",
        state: state, // restaurantId encoded for security
    })
    return `https://www.facebook.com/v22.0/dialog/oauth?${params.toString()}`
}

/**
 * Exchange authorization code for short-lived access token
 */
export async function exchangeCodeForToken(code: string): Promise<{
    access_token: string
    token_type: string
    expires_in: number
}> {
    const params = new URLSearchParams({
        client_id: META_APP_ID,
        client_secret: META_APP_SECRET,
        redirect_uri: META_REDIRECT_URI,
        code: code,
    })

    const res = await fetch(`${META_GRAPH_URL}/oauth/access_token?${params.toString()}`)
    const data = await res.json()

    if (data.error) {
        throw new Error(data.error.message || "Failed to exchange code for token")
    }

    return data
}

/**
 * Exchange short-lived token for long-lived token (60 days)
 */
export async function getLongLivedToken(shortLivedToken: string): Promise<{
    access_token: string
    token_type: string
    expires_in: number
}> {
    const params = new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: META_APP_ID,
        client_secret: META_APP_SECRET,
        fb_exchange_token: shortLivedToken,
    })

    const res = await fetch(`${META_GRAPH_URL}/oauth/access_token?${params.toString()}`)
    const data = await res.json()

    if (data.error) {
        throw new Error(data.error.message || "Failed to get long-lived token")
    }

    return data
}

/**
 * Get Facebook Pages the user manages
 */
export async function getFacebookPages(userAccessToken: string): Promise<Array<{
    id: string
    name: string
    access_token: string
    picture?: { data?: { url?: string } }
}>> {
    const res = await fetch(
        `${META_GRAPH_URL}/me/accounts?fields=id,name,access_token,picture&access_token=${userAccessToken}`
    )
    const data = await res.json()

    if (data.error) {
        throw new Error(data.error.message || "Failed to get Facebook pages")
    }

    return data.data || []
}

/**
 * Get Instagram Business account linked to a Facebook Page
 */
export async function getInstagramAccount(pageId: string, pageAccessToken: string): Promise<{
    id: string
    name: string
    username: string
    profile_picture_url?: string
} | null> {
    const res = await fetch(
        `${META_GRAPH_URL}/${pageId}?fields=instagram_business_account{id,name,username,profile_picture_url}&access_token=${pageAccessToken}`
    )
    const data = await res.json()

    if (data.error) {
        console.error("Instagram fetch error:", data.error)
        return null
    }

    return data.instagram_business_account || null
}

/**
 * Post text/image to a Facebook Page
 */
export async function postToFacebook(
    pageId: string,
    pageAccessToken: string,
    content: string,
    imageUrl?: string
): Promise<{ id: string }> {
    let endpoint = `${META_GRAPH_URL}/${pageId}/feed`
    const body: Record<string, string> = {
        access_token: pageAccessToken,
        message: content,
    }

    if (imageUrl) {
        endpoint = `${META_GRAPH_URL}/${pageId}/photos`
        body.url = imageUrl
        body.caption = content
        delete body.message
    }

    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })

    const data = await res.json()

    if (data.error) {
        throw new Error(data.error.message || "Failed to post to Facebook")
    }

    return { id: data.id || data.post_id }
}

/**
 * Post image to Instagram (Instagram requires an image)
 * Step 1: Create a media container
 * Step 2: Publish the container
 */
export async function postToInstagram(
    igUserId: string,
    pageAccessToken: string,
    content: string,
    imageUrl: string
): Promise<{ id: string }> {
    // Step 1: Create media container
    const containerRes = await fetch(`${META_GRAPH_URL}/${igUserId}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            image_url: imageUrl,
            caption: content,
            access_token: pageAccessToken,
        }),
    })

    const containerData = await containerRes.json()

    if (containerData.error) {
        throw new Error(containerData.error.message || "Failed to create Instagram media container")
    }

    const containerId = containerData.id

    // Wait briefly for container to process
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Step 2: Publish the container
    const publishRes = await fetch(`${META_GRAPH_URL}/${igUserId}/media_publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            creation_id: containerId,
            access_token: pageAccessToken,
        }),
    })

    const publishData = await publishRes.json()

    if (publishData.error) {
        throw new Error(publishData.error.message || "Failed to publish Instagram post")
    }

    return { id: publishData.id }
}

/**
 * Post text-only to Facebook (no image required)
 */
export async function postTextToFacebook(
    pageId: string,
    pageAccessToken: string,
    content: string
): Promise<{ id: string }> {
    const res = await fetch(`${META_GRAPH_URL}/${pageId}/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: content,
            access_token: pageAccessToken,
        }),
    })

    const data = await res.json()

    if (data.error) {
        throw new Error(data.error.message || "Failed to post to Facebook")
    }

    return { id: data.id }
}
