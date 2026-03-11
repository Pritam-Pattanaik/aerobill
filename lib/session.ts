import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function getRestaurantId(): Promise<string | null> {
    const session = await getServerSession(authOptions)
    return session?.user?.restaurantId ?? null
}

export async function requireRestaurantId(): Promise<string> {
    const restaurantId = await getRestaurantId()
    if (!restaurantId) {
        throw new Error("Unauthorized: No restaurant context")
    }
    return restaurantId
}
