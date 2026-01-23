"use client"

import { useState, useEffect } from "react"
import {
    getMarketplaceProducts,
    createMarketplaceProduct,
    updateMarketplaceProduct,
    deleteMarketplaceProduct,
    toggleMarketplaceProductStock
} from "@/app/actions/marketplace"

type Product = {
    id: string
    name: string
    description: string | null
    price: number
    unit: string
    category: string | null
    image: string | null
    inStock: boolean
    minOrder: number
}

const categories = ["Vegetables", "Fruits", "Dairy", "Spices", "Grains", "Oils", "Beverages", "Other"]

export default function MarketplacePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        unit: "kg",
        category: "Vegetables",
        minOrder: "1"
    })

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts() {
        const res = await getMarketplaceProducts()
        if (res.success) setProducts(res.products as Product[])
        setLoading(false)
    }

    function openCreate() {
        setEditingProduct(null)
        setFormData({ name: "", description: "", price: "", unit: "kg", category: "Vegetables", minOrder: "1" })
        setShowModal(true)
    }

    function openEdit(product: Product) {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            description: product.description || "",
            price: product.price.toString(),
            unit: product.unit,
            category: product.category || "Other",
            minOrder: product.minOrder.toString()
        })
        setShowModal(true)
    }

    async function handleSubmit() {
        const data = {
            name: formData.name,
            description: formData.description || undefined,
            price: parseFloat(formData.price),
            unit: formData.unit,
            category: formData.category,
            minOrder: parseInt(formData.minOrder) || 1
        }

        if (editingProduct) {
            await updateMarketplaceProduct(editingProduct.id, data)
        } else {
            await createMarketplaceProduct(data)
        }

        setShowModal(false)
        loadProducts()
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this product?")) return
        await deleteMarketplaceProduct(id)
        loadProducts()
    }

    async function handleToggleStock(id: string) {
        await toggleMarketplaceProductStock(id)
        loadProducts()
    }

    // Group products by category
    const grouped = products.reduce((acc, p) => {
        const cat = p.category || "Other"
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(p)
        return acc
    }, {} as Record<string, Product[]>)

    if (loading) return <div className="p-6 text-center text-gray-400">Loading...</div>

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Marketplace Products</h1>
                    <p className="text-gray-400 text-sm">Manage products available for restaurants to order</p>
                </div>
                <button onClick={openCreate} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    + Add Product
                </button>
            </div>

            {/* Products by Category */}
            {Object.keys(grouped).length === 0 ? (
                <div className="bg-slate-800/50 rounded-xl p-8 text-center text-gray-400">
                    No products yet. Add your first product to get started.
                </div>
            ) : (
                Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-lg font-semibold text-purple-400 mb-3">{category}</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {items.map(product => (
                                <div key={product.id} className={`bg-slate-800/50 border border-purple-500/20 rounded-xl p-4 ${!product.inStock ? "opacity-50" : ""}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-white">{product.name}</h3>
                                        <span className={`px-2 py-0.5 rounded text-xs ${product.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                            {product.inStock ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>
                                    {product.description && (
                                        <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                                    )}
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xl font-bold text-purple-400">₹{product.price}/{product.unit}</span>
                                        <span className="text-xs text-gray-500">Min: {product.minOrder}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(product)} className="flex-1 py-1 text-sm bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30">
                                            Edit
                                        </button>
                                        <button onClick={() => handleToggleStock(product.id)} className="flex-1 py-1 text-sm bg-slate-700 text-gray-300 rounded hover:bg-slate-600">
                                            {product.inStock ? "Mark OOS" : "Mark In Stock"}
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="py-1 px-2 text-sm text-red-400 hover:bg-red-500/10 rounded">
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
                    <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6 relative z-10 w-full max-w-md">
                        <h2 className="text-xl font-bold text-white mb-4">
                            {editingProduct ? "Edit Product" : "Add Product"}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400">Product Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                    placeholder="e.g., Tomatoes"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                    rows={2}
                                    placeholder="Optional description"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-400">Price (₹) *</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400">Unit *</label>
                                    <select
                                        value={formData.unit}
                                        onChange={e => setFormData(p => ({ ...p, unit: e.target.value }))}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="L">L</option>
                                        <option value="pcs">pcs</option>
                                        <option value="dozen">dozen</option>
                                        <option value="pack">pack</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-400">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400">Min Order</label>
                                    <input
                                        type="number"
                                        value={formData.minOrder}
                                        onChange={e => setFormData(p => ({ ...p, minOrder: e.target.value }))}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!formData.name || !formData.price}
                                className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                            >
                                {editingProduct ? "Save Changes" : "Add Product"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
