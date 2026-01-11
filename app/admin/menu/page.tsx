"use client"

import { useState } from "react"
import useSWR from "swr"
import {
    createCategory,
    deleteCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability
} from "@/app/actions/menu"

type Product = {
    id: string
    name: string
    price: number
    isVeg: boolean
    isAvailable: boolean
    image: string | null
    categoryId: string
    inventoryId: string | null
    category: { id: string; name: string }
    inventory: { id: string; name: string } | null
}

type Category = {
    id: string
    name: string
    sortOrder: number
}

type InventoryItem = {
    id: string
    name: string
}

type MenuData = {
    products: Product[]
    categories: Category[]
    inventory: InventoryItem[]
}

export default function MenuManagement() {
    // SWR for instant data on repeat visits - keepPreviousData shows stale data immediately
    const { data, isLoading, mutate } = useSWR<MenuData>('/api/menu', {
        revalidateOnFocus: false,
        dedupingInterval: 30000,
        keepPreviousData: true, // KEY: Show old data instantly while revalidating
    })

    const products = data?.products || []
    const categories = data?.categories || []
    const inventory = data?.inventory || []

    const [showProductModal, setShowProductModal] = useState(false)
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [filterCategory, setFilterCategory] = useState<string>("all")

    // Form states
    const [productForm, setProductForm] = useState({
        name: "",
        price: "",
        isVeg: true,
        isAvailable: true,
        categoryId: "",
        inventoryId: "",
    })
    const [categoryForm, setCategoryForm] = useState({
        name: "",
        sortOrder: 0,
    })

    const refreshData = () => mutate()

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            name: productForm.name,
            price: parseFloat(productForm.price),
            isVeg: productForm.isVeg,
            isAvailable: productForm.isAvailable,
            categoryId: productForm.categoryId,
            inventoryId: productForm.inventoryId || undefined,
        }

        if (editingProduct) {
            await updateProduct(editingProduct.id, data)
        } else {
            await createProduct(data)
        }

        setShowProductModal(false)
        setEditingProduct(null)
        resetProductForm()
        refreshData()
    }

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await createCategory(categoryForm.name, categoryForm.sortOrder)
        setShowCategoryModal(false)
        setCategoryForm({ name: "", sortOrder: 0 })
        refreshData()
    }

    const handleDeleteProduct = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id)
            refreshData()
        }
    }

    const handleDeleteCategory = async (id: string) => {
        if (confirm("Are you sure? This will fail if products are linked to this category.")) {
            const result = await deleteCategory(id)
            if (!result.success) {
                alert(result.error)
            }
            refreshData()
        }
    }

    const handleToggleAvailability = async (id: string) => {
        await toggleProductAvailability(id)
        refreshData()
    }

    const editProduct = (product: Product) => {
        setEditingProduct(product)
        setProductForm({
            name: product.name,
            price: product.price.toString(),
            isVeg: product.isVeg,
            isAvailable: product.isAvailable,
            categoryId: product.categoryId,
            inventoryId: product.inventoryId || "",
        })
        setShowProductModal(true)
    }

    const resetProductForm = () => {
        setProductForm({
            name: "",
            price: "",
            isVeg: true,
            isAvailable: true,
            categoryId: categories[0]?.id || "",
            inventoryId: "",
        })
    }

    const filteredProducts = filterCategory === "all"
        ? products
        : products.filter(p => p.categoryId === filterCategory)

    // Show skeleton only on very first load (no cached data yet)
    if (isLoading && !data) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading menu...</div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Menu Management</h1>
                    <p className="text-gray-400">Manage your categories and products</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowCategoryModal(true)}
                        className="btn-secondary"
                    >
                        + Add Category
                    </button>
                    <button
                        onClick={() => {
                            resetProductForm()
                            setEditingProduct(null)
                            setShowProductModal(true)
                        }}
                        className="btn-primary"
                    >
                        + Add Product
                    </button>
                </div>
            </div>

            {/* Categories list */}
            <div className="glass-card p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] rounded-lg"
                        >
                            <span>{category.name}</span>
                            <span className="text-xs text-gray-500">(#{category.sortOrder})</span>
                            <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-red-400 hover:text-red-300 ml-2"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <p className="text-gray-500">No categories yet. Add one to get started!</p>
                    )}
                </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-4 mb-6">
                <label className="text-sm text-gray-400">Filter by category:</label>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="input w-48"
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Products grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className={`glass-card p-4 ${!product.isAvailable ? "opacity-60" : ""}`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className={product.isVeg ? "veg-indicator" : "nonveg-indicator"} />
                                <h3 className="font-semibold">{product.name}</h3>
                            </div>
                            <span className="text-lg font-bold text-[var(--primary)]">
                                ₹{product.price.toFixed(0)}
                            </span>
                        </div>

                        <div className="text-sm text-gray-400 mb-4">
                            <p>Category: {product.category.name}</p>
                            {product.inventory && (
                                <p>Inventory: {product.inventory.name}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => handleToggleAvailability(product.id)}
                                className={`text-sm px-3 py-1 rounded-full ${product.isAvailable
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {product.isAvailable ? "Available" : "Unavailable"}
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => editProduct(product)}
                                    className="text-sm text-blue-400 hover:text-blue-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="text-sm text-red-400 hover:text-red-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredProducts.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No products found. Add your first product!
                    </div>
                )}
            </div>

            {/* Product Modal */}
            {showProductModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowProductModal(false)} />
                    <div className="glass-card p-6 w-full max-w-md relative z-10 animate-fadeIn">
                        <h2 className="text-xl font-bold mb-6">
                            {editingProduct ? "Edit Product" : "Add New Product"}
                        </h2>

                        <form onSubmit={handleProductSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <select
                                    value={productForm.categoryId}
                                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                                    className="input"
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Inventory Item (Optional)</label>
                                <select
                                    value={productForm.inventoryId}
                                    onChange={(e) => setProductForm({ ...productForm, inventoryId: e.target.value })}
                                    className="input"
                                >
                                    <option value="">None</option>
                                    {inventory.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={productForm.isVeg}
                                        onChange={(e) => setProductForm({ ...productForm, isVeg: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <span>Vegetarian</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={productForm.isAvailable}
                                        onChange={(e) => setProductForm({ ...productForm, isAvailable: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <span>Available</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowProductModal(false)} className="btn-secondary flex-1">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary flex-1">
                                    {editingProduct ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCategoryModal(false)} />
                    <div className="glass-card p-6 w-full max-w-md relative z-10 animate-fadeIn">
                        <h2 className="text-xl font-bold mb-6">Add New Category</h2>

                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Category Name</label>
                                <input
                                    type="text"
                                    value={categoryForm.name}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                    className="input"
                                    placeholder="e.g., Indian, Chinese, Beverages"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Sort Order</label>
                                <input
                                    type="number"
                                    value={categoryForm.sortOrder}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: parseInt(e.target.value) })}
                                    className="input"
                                    placeholder="0"
                                />
                                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowCategoryModal(false)} className="btn-secondary flex-1">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary flex-1">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
