"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

type PageSEOInput = {
    route: string
    title: string
    description?: string
    keywords?: string
}

// Helper to validate super admin session
async function validateSuperAdmin() {
    const session = await getServerSession(authOptions)
    if (!session || (!session.user?.isSuperAdmin && session.user?.role !== "SUPER_ADMIN")) {
        throw new Error("Unauthorized: Super admin access required")
    }
    return session
}

export async function getAllPageSEO() {
    try {
        await validateSuperAdmin()

        const seoList = await prisma.pageSeo.findMany({
            orderBy: { route: 'asc' }
        })

        return { success: true, data: seoList }
    } catch (error) {
        console.error("Error fetching all page SEO:", error)
        return { success: false, error: "Failed to fetch SEO data" }
    }
}

export async function upsertPageSEO(data: PageSEOInput) {
    try {
        await validateSuperAdmin()

        const formattedRoute = data.route.startsWith('/') ? data.route : `/${data.route}`

        const seo = await prisma.pageSeo.upsert({
            where: { route: formattedRoute },
            update: {
                title: data.title,
                description: data.description || null,
                keywords: data.keywords || null,
            },
            create: {
                route: formattedRoute,
                title: data.title,
                description: data.description || null,
                keywords: data.keywords || null,
            }
        })

        // Revalidate the specific route so changes reflect immediately
        revalidatePath(formattedRoute)

        return { success: true, data: seo }
    } catch (error) {
        console.error("Error upserting page SEO:", error)
        return { success: false, error: "Failed to save SEO data" }
    }
}

export async function deletePageSEO(id: string) {
    try {
        await validateSuperAdmin()

        const seo = await prisma.pageSeo.delete({
            where: { id }
        })

        revalidatePath(seo.route)

        return { success: true, data: seo }
    } catch (error) {
        console.error("Error deleting page SEO:", error)
        return { success: false, error: "Failed to delete SEO data" }
    }
}

// Public method to fetch SEO for a specific route during metadata generation
export async function getPageSEOByRoute(route: string) {
    try {
        const seo = await prisma.pageSeo.findUnique({
            where: { route }
        })

        return { success: true, data: seo }
    } catch (error) {
        console.error(`Error fetching SEO for route ${route}:`, error)
        return { success: false, error: "Failed to fetch SEO for route" }
    }
}
