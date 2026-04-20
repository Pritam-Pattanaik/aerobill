import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import type { NextAuthOptions } from "next-auth"
import { sendEmail } from "@/lib/email"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                loginType: { label: "Login Type", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    // Check if this is a super admin login attempt
                    if (credentials.loginType === "super-admin") {
                        const superAdmin = await prisma.superAdmin.findUnique({
                            where: { email: credentials.email }
                        })

                        if (!superAdmin || !superAdmin.isActive) {
                            return null
                        }

                        const isValid = await compare(credentials.password, superAdmin.passwordHash)
                        if (!isValid) {
                            return null
                        }

                        return {
                            id: superAdmin.id,
                            email: superAdmin.email,
                            name: superAdmin.name,
                            role: "SUPER_ADMIN",
                            isSuperAdmin: true,
                        }
                    }

                    // Regular user authentication
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
                        isSuperAdmin: false,
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
                token.isSuperAdmin = (user as { isSuperAdmin?: boolean }).isSuperAdmin || false
                token.restaurantId = (user as { restaurantId?: string }).restaurantId
                token.restaurantSlug = (user as { restaurantSlug?: string }).restaurantSlug
                token.restaurantName = (user as { restaurantName?: string }).restaurantName
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.isSuperAdmin = token.isSuperAdmin as boolean
                session.user.restaurantId = token.restaurantId as string | undefined
                session.user.restaurantSlug = token.restaurantSlug as string | undefined
                session.user.restaurantName = token.restaurantName as string | undefined
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
    events: {
        async signIn({ user }) {
            try {
                // Send email to user
                if (user.email) {
                    await sendEmail({
                        to: user.email,
                        subject: "Welcome to Aerobill - New Sign In",
                        text: `Hello ${user.name || 'User'},\n\nYou have successfully signed in to your Aerobill account.\nIf this wasn't you, please change your password immediately or contact support.\n\nBest,\nAerobill Team`,
                        html: `<p>Hello ${user.name || 'User'},</p><p>You have successfully signed in to your Aerobill account.</p><p>If this wasn't you, please change your password immediately or contact support.</p><p>Best,<br>Aerobill Team</p>`
                    });
                }
                
                // Send email to super admin
                const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "support@aerobill.in";
                if (superAdminEmail) {
                    await sendEmail({
                        to: superAdminEmail,
                        subject: "New Sign In Alert - Aerobill",
                        text: `A user has signed in to Aerobill.\n\nUser: ${user.name || 'Unknown'}\nEmail: ${user.email}\nRole: ${(user as any).role || 'Unknown'}`,
                        html: `<p>A user has signed in to Aerobill.</p><ul><li>User: ${user.name || 'Unknown'}</li><li>Email: ${user.email}</li><li>Role: ${(user as any).role || 'Unknown'}</li></ul>`
                    });
                }
            } catch (error) {
                console.error("Error sending signIn notification emails:", error);
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}
