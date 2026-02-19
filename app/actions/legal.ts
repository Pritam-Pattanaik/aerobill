"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const defaultPrivacyPolicy = `
# Privacy Policy

**Effective Date:** ${new Date().toLocaleDateString()}

## 1. Introduction
Welcome to Aerobill. We respect your privacy and are committed to protecting your personal data.

## 2. Data We Collect
We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us.

## 3. How We Use Your Data
We use your data to provide, maintain, and improve our services.

## 4. Contact Us
If you have any questions about this Privacy Policy, please contact us at support@aerobill.in.
`

// Get privacy policy content (public)
export async function getPrivacyPolicy() {
    try {
        let policy = await prisma.privacyPolicy.findUnique({
            where: { id: "privacy-policy" }
        })

        // If no record exists, create one with defaults
        if (!policy) {
            policy = await prisma.privacyPolicy.create({
                data: {
                    id: "privacy-policy",
                    content: defaultPrivacyPolicy.trim()
                }
            })
        }

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to get privacy policy:", error)
        return { success: false, error: "Failed to get privacy policy", policy: { content: defaultPrivacyPolicy.trim() } }
    }
}

// Update privacy policy content (super-admin only)
export async function updatePrivacyPolicy(content: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.isSuperAdmin) {
            return { success: false, error: "Unauthorized: Super admin access required" }
        }

        const policy = await prisma.privacyPolicy.upsert({
            where: { id: "privacy-policy" },
            update: { content },
            create: {
                id: "privacy-policy",
                content
            }
        })

        revalidatePath("/privacy-policy")
        revalidatePath("/super-admin/privacy-policy")

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to update privacy policy:", error)
        return { success: false, error: "Failed to update privacy policy" }
    }
}
