import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Role } from "@prisma/client"

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

export async function requireRole(allowedRoles: Role[]): Promise<{ restaurantId: string; role: Role }> {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
        throw new Error("Unauthorized: Not logged in")
    }

    const restaurantId = session.user.restaurantId
    const role = session.user.role as Role

    if (!restaurantId) {
        throw new Error("Unauthorized: No restaurant context")
    }

    if (!allowedRoles.includes(role)) {
        throw new Error(`Forbidden: Cannot access this resource with role ${role}`)
    }

    return { restaurantId, role }
}
