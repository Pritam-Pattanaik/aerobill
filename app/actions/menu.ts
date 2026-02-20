"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { unstable_cache } from "next/cache"
import { requireRestaurantId } from "@/lib/session"

// Cached query for categories with products (30 second cache)
const getCategoriesFromDb = async (restaurantId: string) => {
    return prisma.category.findMany({
        where: { restaurantId },
        include: { products: { where: { isAvailable: true }, orderBy: { name: "asc" } } },
        orderBy: { sortOrder: "asc" }
    })
}

export async function getCategories() {
    try {
        const restaurantId = await requireRestaurantId()

        // Use cached query with restaurant-specific key
        const getCached = unstable_cache(
            () => getCategoriesFromDb(restaurantId),
            [`categories-${restaurantId}`],
            { revalidate: 30 }
        )

        const categories = await getCached()
        return { success: true, categories }
    } catch (error) {
        console.error("Failed to fetch categories:", error)
        return { success: false, error: "Failed to fetch categories", categories: [] }
    }
}

export async function getCategoriesPublic(restaurantSlug: string) {
    try {
        // Cache restaurant lookup
        const getRestaurant = unstable_cache(
            () => prisma.restaurant.findUnique({ where: { slug: restaurantSlug } }),
            [`restaurant-${restaurantSlug}`],
            { revalidate: 60 }
        )

        const restaurant = await getRestaurant()
        if (!restaurant) return { success: false, error: "Restaurant not found", categories: [] }

        const getCached = unstable_cache(
            () => getCategoriesFromDb(restaurant.id),
            [`categories-public-${restaurant.id}`],
            { revalidate: 30 }
        )

        const categories = await getCached()
        return { success: true, categories, restaurant }
    } catch (error) {
        console.error("Failed to fetch categories:", error)
        return { success: false, error: "Failed to fetch categories", categories: [] }
    }
}

// Cached query for all categories (without products)
const getAllCategoriesFromDb = async (restaurantId: string) => {
    return prisma.category.findMany({
        where: { restaurantId },
        orderBy: { sortOrder: "asc" }
    })
}

export async function getAllCategories() {
    try {
        const restaurantId = await requireRestaurantId()

        const getCached = unstable_cache(
            () => getAllCategoriesFromDb(restaurantId),
            [`all-categories-${restaurantId}`],
            { revalidate: 30 }
        )

        const categories = await getCached()
        return { success: true, categories }
    } catch (error) {
        console.error("Failed to fetch categories:", error)
        return { success: false, error: "Failed to fetch categories", categories: [] }
    }
}

export async function createCategory(name: string, sortOrder: number = 0) {
    try {
        const restaurantId = await requireRestaurantId()
        const category = await prisma.category.create({ data: { name, sortOrder, restaurantId } })
        revalidatePath("/admin/menu")
        return { success: true, category }
    } catch (error) {
        console.error("Failed to create category:", error)
        return { success: false, error: "Failed to create category" }
    }
}

export async function updateCategory(id: string, name: string, sortOrder: number) {
    try {
        const restaurantId = await requireRestaurantId()
        const category = await prisma.category.update({ where: { id, restaurantId }, data: { name, sortOrder } })
        revalidatePath("/admin/menu")
        return { success: true, category }
    } catch (error) {
        console.error("Failed to update category:", error)
        return { success: false, error: "Failed to update category" }
    }
}

export async function deleteCategory(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        await prisma.category.delete({ where: { id, restaurantId } })
        revalidatePath("/admin/menu")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete category:", error)
        return { success: false, error: "Failed to delete category. Make sure no products are linked to it." }
    }
}

// Cached query for products
const getProductsFromDb = async (restaurantId: string) => {
    return prisma.product.findMany({
        where: { restaurantId },
        include: { category: true, inventory: true },
        orderBy: { name: "asc" }
    })
}

export async function getProducts() {
    try {
        const restaurantId = await requireRestaurantId()

        const getCached = unstable_cache(
            () => getProductsFromDb(restaurantId),
            [`products-${restaurantId}`],
            { revalidate: 30 }
        )

        const products = await getCached()
        return { success: true, products }
    } catch (error) {
        console.error("Failed to fetch products:", error)
        return { success: false, error: "Failed to fetch products", products: [] }
    }
}

import { checkProductLimit } from "@/lib/subscription"

export async function createProduct(data: { name: string; price: number; isVeg: boolean; isAvailable: boolean; categoryId: string; inventoryId?: string; image?: string }) {
    try {
        const restaurantId = await requireRestaurantId()

        // Check subscription limit
        const limitCheck = await checkProductLimit(restaurantId)
        if (!limitCheck.allowed) {
            return {
                success: false,
                error: `Plan limit reached. You can only add ${limitCheck.limit} products on your current plan.`
            }
        }

        // Check for duplicate product name
        const existingProduct = await prisma.product.findFirst({
            where: {
                restaurantId,
                name: {
                    equals: data.name,
                    mode: "insensitive"
                }
            }
        })

        if (existingProduct) {
            return {
                success: false,
                error: "A product with this name already exists."
            }
        }

        const product = await prisma.product.create({
            data: { ...data, inventoryId: data.inventoryId || null, image: data.image || null, restaurantId }
        })
        revalidatePath("/admin/menu")
        return { success: true, product }
    } catch (error) {
        console.error("Failed to create product:", error)
        return { success: false, error: "Failed to create product" }
    }
}

export async function updateProduct(id: string, data: { name: string; price: number; isVeg: boolean; isAvailable: boolean; categoryId: string; inventoryId?: string | null; image?: string | null }) {
    try {
        const restaurantId = await requireRestaurantId()
        const product = await prisma.product.update({
            where: { id, restaurantId },
            data: { name: data.name, price: data.price, isVeg: data.isVeg, isAvailable: data.isAvailable, categoryId: data.categoryId, inventoryId: data.inventoryId || null, image: data.image || null }
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
        const restaurantId = await requireRestaurantId()
        await prisma.product.delete({ where: { id, restaurantId } })
        revalidatePath("/admin/menu")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete product:", error)
        return { success: false, error: "Failed to delete product" }
    }
}

export async function toggleProductAvailability(id: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const product = await prisma.product.findUnique({ where: { id, restaurantId } })
        if (!product) return { success: false, error: "Product not found" }
        const updated = await prisma.product.update({ where: { id, restaurantId }, data: { isAvailable: !product.isAvailable } })
        revalidatePath("/admin/menu")
        return { success: true, product: updated }
    } catch (error) {
        console.error("Failed to toggle product availability:", error)
        return { success: false, error: "Failed to toggle availability" }
    }
}

// =====================================
// RECIPE MANAGEMENT (Product Ingredients)
// =====================================

export async function getProductIngredients(productId: string) {
    try {
        const restaurantId = await requireRestaurantId()
        const ingredients = await prisma.productIngredient.findMany({
            where: { productId, restaurantId },
            include: {
                inventory: {
                    select: { id: true, name: true, unit: true, quantity: true }
                }
            }
        })
        return { success: true, ingredients }
    } catch (error) {
        console.error("Failed to fetch product ingredients:", error)
        return { success: false, error: "Failed to fetch ingredients", ingredients: [] }
    }
}

export async function addProductIngredient(productId: string, inventoryId: string, quantity: number) {
    try {
        const restaurantId = await requireRestaurantId()

        // Check if ingredient already exists for this product
        const existing = await prisma.productIngredient.findUnique({
            where: { productId_inventoryId: { productId, inventoryId } }
        })

        if (existing) {
            // Update quantity instead
            const updated = await prisma.productIngredient.update({
                where: { id: existing.id },
                data: { quantity }
            })
            revalidatePath("/admin/menu")
            return { success: true, ingredient: updated }
        }

        const ingredient = await prisma.productIngredient.create({
            data: {
                productId,
                inventoryId,
                quantity,
                restaurantId
            }
        })
        revalidatePath("/admin/menu")
        return { success: true, ingredient }
    } catch (error) {
        console.error("Failed to add product ingredient:", error)
        return { success: false, error: "Failed to add ingredient" }
    }
}

export async function updateProductIngredient(ingredientId: string, quantity: number) {
    try {
        await requireRestaurantId()
        const ingredient = await prisma.productIngredient.update({
            where: { id: ingredientId },
            data: { quantity }
        })
        revalidatePath("/admin/menu")
        return { success: true, ingredient }
    } catch (error) {
        console.error("Failed to update product ingredient:", error)
        return { success: false, error: "Failed to update ingredient" }
    }
}

export async function removeProductIngredient(ingredientId: string) {
    try {
        await requireRestaurantId()
        await prisma.productIngredient.delete({
            where: { id: ingredientId }
        })
        revalidatePath("/admin/menu")
        return { success: true }
    } catch (error) {
        console.error("Failed to remove product ingredient:", error)
        return { success: false, error: "Failed to remove ingredient" }
    }
}
