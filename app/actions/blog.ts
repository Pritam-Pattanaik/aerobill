"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Types for blog post data
export type BlogPostInput = {
    title: string
    slug: string
    excerpt: string
    content: string
    coverImage?: string
    author?: string
    isPublished?: boolean
    metaTitle?: string
    metaDesc?: string
    keywords?: string
}

// Helper to validate super admin session
async function validateSuperAdmin() {
    const session = await getServerSession(authOptions)
    // Check for either isSuperAdmin flag (preferred) or SUPER_ADMIN role (fallback)
    if (!session || (!session.user?.isSuperAdmin && session.user?.role !== "SUPER_ADMIN")) {
        throw new Error("Unauthorized: Super admin access required")
    }
    return session
}

// Helper to generate slug from title
export async function generateSlug(title: string): Promise<string> {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// Get all blog posts (for admin - includes unpublished)
export async function getAllBlogPosts() {
    try {
        await validateSuperAdmin()

        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return { success: true, data: posts }
    } catch (error) {
        console.error("Error fetching all blog posts:", error)
        return { success: false, error: "Failed to fetch blog posts" }
    }
}

// Get published blog posts (for public pages)
export async function getPublishedBlogPosts() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                coverImage: true,
                author: true,
                createdAt: true,
            }
        })

        return { success: true, data: posts }
    } catch (error) {
        console.error("Error fetching published blog posts:", error)
        return { success: false, error: "Failed to fetch blog posts" }
    }
}

// Get single blog post by slug (for public pages)
export async function getBlogPostBySlug(slug: string) {
    try {
        const post = await prisma.blogPost.findUnique({
            where: { slug, isPublished: true }
        })

        if (!post) {
            return { success: false, error: "Blog post not found" }
        }

        return { success: true, data: post }
    } catch (error) {
        console.error("Error fetching blog post by slug:", error)
        return { success: false, error: "Failed to fetch blog post" }
    }
}

// Get single blog post by ID (for admin edit)
export async function getBlogPostById(id: string) {
    try {
        await validateSuperAdmin()

        const post = await prisma.blogPost.findUnique({
            where: { id }
        })

        if (!post) {
            return { success: false, error: "Blog post not found" }
        }

        return { success: true, data: post }
    } catch (error) {
        console.error("Error fetching blog post by ID:", error)
        return { success: false, error: "Failed to fetch blog post" }
    }
}

// Create new blog post
export async function createBlogPost(data: BlogPostInput) {
    try {
        await validateSuperAdmin()

        // Check if slug already exists
        const existing = await prisma.blogPost.findUnique({
            where: { slug: data.slug }
        })

        if (existing) {
            return { success: false, error: "A blog post with this slug already exists" }
        }

        const post = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                coverImage: data.coverImage || null,
                author: data.author || "Aerobill Team",
                isPublished: data.isPublished || false,
                metaTitle: data.metaTitle || null,
                metaDesc: data.metaDesc || null,
                keywords: data.keywords || null,
            }
        })

        revalidatePath('/blog')
        revalidatePath('/super-admin/blog')

        return { success: true, data: post }
    } catch (error) {
        console.error("Error creating blog post:", error)
        return { success: false, error: "Failed to create blog post" }
    }
}

// Update existing blog post
export async function updateBlogPost(id: string, data: Partial<BlogPostInput>) {
    try {
        await validateSuperAdmin()

        // Check if slug is being changed and if new slug already exists
        if (data.slug) {
            const existing = await prisma.blogPost.findFirst({
                where: {
                    slug: data.slug,
                    NOT: { id }
                }
            })

            if (existing) {
                return { success: false, error: "A blog post with this slug already exists" }
            }
        }

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.slug && { slug: data.slug }),
                ...(data.excerpt && { excerpt: data.excerpt }),
                ...(data.content && { content: data.content }),
                ...(data.coverImage !== undefined && { coverImage: data.coverImage || null }),
                ...(data.author && { author: data.author }),
                ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
                ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle || null }),
                ...(data.metaDesc !== undefined && { metaDesc: data.metaDesc || null }),
                ...(data.keywords !== undefined && { keywords: data.keywords || null }),
            }
        })

        revalidatePath('/blog')
        revalidatePath(`/blog/${post.slug}`)
        revalidatePath('/super-admin/blog')

        return { success: true, data: post }
    } catch (error) {
        console.error("Error updating blog post:", error)
        return { success: false, error: "Failed to update blog post" }
    }
}

// Delete blog post
export async function deleteBlogPost(id: string) {
    try {
        await validateSuperAdmin()

        const post = await prisma.blogPost.delete({
            where: { id }
        })

        revalidatePath('/blog')
        revalidatePath('/super-admin/blog')

        return { success: true, data: post }
    } catch (error) {
        console.error("Error deleting blog post:", error)
        return { success: false, error: "Failed to delete blog post" }
    }
}

// Toggle blog post publish status
export async function toggleBlogPostPublish(id: string) {
    try {
        await validateSuperAdmin()

        const post = await prisma.blogPost.findUnique({
            where: { id }
        })

        if (!post) {
            return { success: false, error: "Blog post not found" }
        }

        const updated = await prisma.blogPost.update({
            where: { id },
            data: { isPublished: !post.isPublished }
        })

        revalidatePath('/blog')
        revalidatePath(`/blog/${post.slug}`)
        revalidatePath('/super-admin/blog')

        return { success: true, data: updated }
    } catch (error) {
        console.error("Error toggling blog post publish status:", error)
        return { success: false, error: "Failed to update blog post" }
    }
}
