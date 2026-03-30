"use server"

import { prisma } from "@/lib/prisma"
import { hash, compare } from "bcryptjs"
import { cookies } from "next/headers"

export async function registerReseller(data: { name: string; email: string; phone?: string; password: string }) {
    try {
        const existingInfo = await prisma.reseller.findUnique({
            where: { email: data.email }
        })

        if (existingInfo) {
            return { success: false, error: "Email already registered as a reseller." }
        }

        const passwordHash = await hash(data.password, 12)

        // Generate base referral code
        let referralCode = data.name.substring(0, 4).toUpperCase() + Math.floor(1000 + Math.random() * 9000).toString()
        referralCode = referralCode.replace(/[^A-Z0-9]/g, '')
        
        // Ensure unique
        let isUnique = false
        while (!isUnique) {
            const existingCode = await prisma.reseller.findUnique({ where: { referralCode } })
            if (existingCode) {
                referralCode = referralCode.substring(0, 4) + Math.floor(1000 + Math.random() * 9000).toString()
            } else {
                isUnique = true
            }
        }

        const reseller = await prisma.reseller.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                passwordHash,
                referralCode
            }
        })

        // Simply set a cookie for auth (since this is a separate portal)
        const cookieStore = await cookies()
        cookieStore.set("reseller_session", reseller.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/"
        })

        return { success: true }
    } catch (error) {
        console.error("Reseller registration error:", error)
        return { success: false, error: "Registration failed." }
    }
}

export async function loginReseller(data: { email: string; password: string }) {
    try {
        const reseller = await prisma.reseller.findUnique({
            where: { email: data.email }
        })

        if (!reseller) {
            return { success: false, error: "Invalid email or password." }
        }

        const isValid = await compare(data.password, reseller.passwordHash)
        if (!isValid) {
            return { success: false, error: "Invalid email or password." }
        }

        const cookieStore = await cookies()
        cookieStore.set("reseller_session", reseller.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/"
        })

        return { success: true }
    } catch (error) {
        console.error("Reseller login error:", error)
        return { success: false, error: "Login failed." }
    }
}

export async function logoutReseller() {
    const cookieStore = await cookies()
    cookieStore.delete("reseller_session")
    return { success: true }
}

export async function getResellerData() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("reseller_session")?.value
    if (!sessionId) return null

    try {
        const reseller = await prisma.reseller.findUnique({
            where: { id: sessionId },
            include: {
                commissions: {
                    include: {
                        restaurant: { select: { name: true } }
                    },
                    orderBy: { createdAt: "desc" }
                },
                _count: {
                    select: { restaurants: true }
                }
            }
        })
        return reseller
    } catch (error) {
        console.error("Failed to fetch reseller data:", error)
        return null
    }
}
