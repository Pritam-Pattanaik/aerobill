import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: string
            restaurantId?: string
            restaurantSlug?: string
            restaurantName?: string
            isSuperAdmin?: boolean
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        role: string
        restaurantId?: string
        restaurantSlug?: string
        restaurantName?: string
        isSuperAdmin?: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: string
        restaurantId?: string
        restaurantSlug?: string
        restaurantName?: string
        isSuperAdmin?: boolean
    }
}
