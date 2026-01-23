"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// =====================================
// MARKETPLACE PRODUCTS (Super Admin)
// =====================================

export async function getMarketplaceProducts() {
    try {
        const products = await prisma.marketplaceProduct.findMany({
            orderBy: [{ category: "asc" }, { name: "asc" }]
        })
        return { success: true, products }
    } catch (error) {
        console.error("Failed to fetch marketplace products:", error)
        return { success: false, error: "Failed to fetch products", products: [] }
    }
}

export async function getMarketplaceProductsInStock() {
    try {
        const products = await prisma.marketplaceProduct.findMany({
            where: { inStock: true },
            orderBy: [{ category: "asc" }, { name: "asc" }]
        })
        return { success: true, products }
    } catch (error) {
        console.error("Failed to fetch marketplace products:", error)
        return { success: false, error: "Failed to fetch products", products: [] }
    }
}

export async function createMarketplaceProduct(data: {
    name: string
    description?: string
    price: number
    unit: string
    category?: string
    image?: string
    minOrder?: number
}) {
    try {
        const product = await prisma.marketplaceProduct.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                unit: data.unit,
                category: data.category,
                image: data.image,
                minOrder: data.minOrder || 1
            }
        })
        revalidatePath("/super-admin/marketplace")
        return { success: true, product }
    } catch (error) {
        console.error("Failed to create marketplace product:", error)
        return { success: false, error: "Failed to create product" }
    }
}

export async function updateMarketplaceProduct(id: string, data: {
    name: string
    description?: string
    price: number
    unit: string
    category?: string
    image?: string
    minOrder?: number
    inStock?: boolean
}) {
    try {
        const product = await prisma.marketplaceProduct.update({
            where: { id },
            data
        })
        revalidatePath("/super-admin/marketplace")
        return { success: true, product }
    } catch (error) {
        console.error("Failed to update marketplace product:", error)
        return { success: false, error: "Failed to update product" }
    }
}

export async function deleteMarketplaceProduct(id: string) {
    try {
        await prisma.marketplaceProduct.delete({ where: { id } })
        revalidatePath("/super-admin/marketplace")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete marketplace product:", error)
        return { success: false, error: "Failed to delete product" }
    }
}

export async function toggleMarketplaceProductStock(id: string) {
    try {
        const product = await prisma.marketplaceProduct.findUnique({ where: { id } })
        if (!product) return { success: false, error: "Product not found" }

        await prisma.marketplaceProduct.update({
            where: { id },
            data: { inStock: !product.inStock }
        })
        revalidatePath("/super-admin/marketplace")
        return { success: true }
    } catch (error) {
        console.error("Failed to toggle stock:", error)
        return { success: false, error: "Failed to toggle stock" }
    }
}
