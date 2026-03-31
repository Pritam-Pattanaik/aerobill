"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getServicePages() {
  try {
    const pages = await prisma.servicePage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, data: pages }
  } catch (error) {
    console.error("Error fetching service pages:", error)
    return { success: false, error: "Failed to fetch service pages" }
  }
}

export async function getActiveServicePages() {
  try {
    const pages = await prisma.servicePage.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })
    return { success: true, data: pages }
  } catch (error) {
    console.error("Error fetching active service pages:", error)
    return { success: false, error: "Failed to fetch active service pages" }
  }
}

export async function getServicePageById(id: string) {
  try {
    const page = await prisma.servicePage.findUnique({
      where: { id },
    })
    
    if (!page) {
        return { success: false, error: "Service page not found" }
    }
    
    return { success: true, data: page }
  } catch (error) {
    console.error("Error fetching service page:", error)
    return { success: false, error: "Failed to fetch service page" }
  }
}

export async function getServicePageBySlug(slug: string) {
  try {
    const page = await prisma.servicePage.findUnique({
      where: { slug, isActive: true },
    })
    
    if (!page) {
        return { success: false, error: "Service page not found" }
    }
    
    return { success: true, data: page }
  } catch (error) {
    console.error("Error fetching service page by slug:", error)
    return { success: false, error: "Failed to fetch service page" }
  }
}

export async function createServicePage(data: any) {
  try {
    const newPage = await prisma.servicePage.create({
      data: {
        name: data.name,
        slug: data.slug,
        title: data.title,
        description: data.description,
        heroHeading: data.heroHeading,
        heroSubheading: data.heroSubheading,
        features: data.features, // JSON
        benefits: data.benefits, // JSON
        faqs: data.faqs,         // JSON
        isActive: data.isActive ?? true,
      },
    })
    
    revalidatePath("/services")
    return { success: true, data: newPage }
  } catch (error: any) {
    console.error("Error creating service page:", error)
    if (error.code === 'P2002') return { success: false, error: "Slug already exists" }
    return { success: false, error: "Failed to create service page" }
  }
}

export async function updateServicePage(id: string, data: any) {
  try {
    const updated = await prisma.servicePage.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        title: data.title,
        description: data.description,
        heroHeading: data.heroHeading,
        heroSubheading: data.heroSubheading,
        features: data.features, // JSON
        benefits: data.benefits, // JSON
        faqs: data.faqs,         // JSON
        isActive: data.isActive,
      },
    })
    
    revalidatePath("/services")
    if (updated.slug) {
        revalidatePath(`/services/${updated.slug}`)
    }
    
    return { success: true, data: updated }
  } catch (error: any) {
    console.error("Error updating service page:", error)
    if (error.code === 'P2002') return { success: false, error: "Slug already exists" }
    return { success: false, error: "Failed to update service page" }
  }
}

export async function toggleServicePageStatus(id: string, currentStatus: boolean) {
  try {
    const updated = await prisma.servicePage.update({
      where: { id },
      data: { isActive: !currentStatus },
    })
    revalidatePath("/services")
    if (updated.slug) {
        revalidatePath(`/services/${updated.slug}`)
    }
    return { success: true, data: updated }
  } catch (error) {
    console.error("Error toggling service status:", error)
    return { success: false, error: "Failed to update service status" }
  }
}

export async function deleteServicePage(id: string) {
  try {
    const page = await prisma.servicePage.findUnique({ where: { id }})
    await prisma.servicePage.delete({
      where: { id },
    })
    
    revalidatePath("/services")
    if (page?.slug) {
      revalidatePath(`/services/${page.slug}`)
    }
    return { success: true }
  } catch (error) {
    console.error("Error deleting service page:", error)
    return { success: false, error: "Failed to delete service page" }
  }
}
