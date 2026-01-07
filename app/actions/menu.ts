"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                products: {
                    where: {
                        isAvailable: true
                    },
                    orderBy: {
                        name: "asc"
                    }
                }
            },
            orderBy: {
                sortOrder: "asc"
            }
        })

        return { success: true, categories }
    } catch (error) {
        console.error("Failed to fetch categories:", error)
        return { success: false, error: "Failed to fetch categories", categories: [] }
    }
}

export async function getAllCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                sortOrder: "asc"
            }
        })

        return { success: true, categories }
    } catch (error) {
        console.error("Failed to fetch categories:", error)
        return { success: false, error: "Failed to fetch categories", categories: [] }
    }
}

export async function createCategory(name: string, sortOrder: number = 0) {
    try {
        const category = await prisma.category.create({
            data: {
                name,
                sortOrder
            }
        })

        revalidatePath("/admin/menu")
        return { success: true, category }
    } catch (error) {
        console.error("Failed to create category:", error)
        return { success: false, error: "Failed to create category" }
    }
}

export async function updateCategory(id: string, name: string, sortOrder: number) {
    try {
        const category = await prisma.category.update({
            where: { id },
            data: {
                name,
                sortOrder
            }
        })

        revalidatePath("/admin/menu")
        return { success: true, category }
    } catch (error) {
        console.error("Failed to update category:", error)
        return { success: false, error: "Failed to update category" }
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id }
        })

        revalidatePath("/admin/menu")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete category:", error)
        return { success: false, error: "Failed to delete category. Make sure no products are linked to it." }
    }
}

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                inventory: true
            },
            orderBy: {
                name: "asc"
            }
        })

        return { success: true, products }
    } catch (error) {
        console.error("Failed to fetch products:", error)
        return { success: false, error: "Failed to fetch products", products: [] }
    }
}

export async function createProduct(data: {
    name: string
    price: number
    isVeg: boolean
    isAvailable: boolean
    categoryId: string
    inventoryId?: string
    image?: string
}) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                isVeg: data.isVeg,
                isAvailable: data.isAvailable,
                categoryId: data.categoryId,
                inventoryId: data.inventoryId || null,
                image: data.image || null
            }
        })

        revalidatePath("/admin/menu")
        return { success: true, product }
    } catch (error) {
        console.error("Failed to create product:", error)
        return { success: false, error: "Failed to create product" }
    }
}

export async function updateProduct(
    id: string,
    data: {
        name: string
        price: number
        isVeg: boolean
        isAvailable: boolean
        categoryId: string
        inventoryId?: string | null
        image?: string | null
    }
) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                price: data.price,
                isVeg: data.isVeg,
                isAvailable: data.isAvailable,
                categoryId: data.categoryId,
                inventoryId: data.inventoryId || null,
                image: data.image || null
            }
        })

        revalidatePath("/admin/menu")
        return { success: true, product }
    } catch (error) {
        console.error("Failed to update product:", error)
        return { success: false, error: "Failed to update product" }
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        })

        revalidatePath("/admin/menu")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete product:", error)
        return { success: false, error: "Failed to delete product" }
    }
}

export async function toggleProductAvailability(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id }
        })

        if (!product) {
            return { success: false, error: "Product not found" }
        }

        const updated = await prisma.product.update({
            where: { id },
            data: {
                isAvailable: !product.isAvailable
            }
        })

        revalidatePath("/admin/menu")
        return { success: true, product: updated }
    } catch (error) {
        console.error("Failed to toggle product availability:", error)
        return { success: false, error: "Failed to toggle availability" }
    }
}
