import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        include: { restaurant: true }
                    })

                    if (!user || !user.restaurant.isActive) {
                        return null
                    }

                    const isValid = await compare(credentials.password, user.passwordHash)
                    if (!isValid) {
                        return null
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        restaurantId: user.restaurantId,
                        restaurantSlug: user.restaurant.slug,
                        restaurantName: user.restaurant.name,
                    }
                } catch (error) {
                    console.error("Auth error:", error)
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as { role: string }).role
                token.restaurantId = (user as { restaurantId: string }).restaurantId
                token.restaurantSlug = (user as { restaurantSlug: string }).restaurantSlug
                token.restaurantName = (user as { restaurantName: string }).restaurantName
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.restaurantId = token.restaurantId as string
                session.user.restaurantSlug = token.restaurantSlug as string
                session.user.restaurantName = token.restaurantName as string
            }
            return session
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}
