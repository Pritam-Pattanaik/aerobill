"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    getPurchaseOrderById,
    updatePurchaseOrderStatusAdmin
} from "@/app/actions/purchase-orders"
import { POStatus } from "@prisma/client"

type OrderItem = {
    id: string
    quantity: number
    unitPrice: number
    marketplaceProduct: {
        id: string
        name: string
        description: string | null
        unit: string
        category: string | null
    }
}

type PurchaseOrder = {
    id: string
    orderNumber: string
    status: POStatus
    notes: string | null
    totalAmount: number
    restaurantId: string
    estimatedDelivery: Date | null
    createdAt: Date
    updatedAt: Date
    items: OrderItem[]
    restaurant: {
        id: string
        name: string
        email: string
        phone: string | null
        address: string | null
    } | null
}

const statusColors: Record<POStatus, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    ORDERED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    RECEIVED: "bg-green-500/20 text-green-400 border-green-500/30",
    CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30"
}

const statusIcons: Record<POStatus, string> = {
    PENDING: "⏳",
    ORDERED: "📦",
    RECEIVED: "✅",
    CANCELLED: "❌"
}

export default function PurchaseOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [order, setOrder] = useState<PurchaseOrder | null>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        loadOrder()
    }, [id])

    async function loadOrder() {
        const res = await getPurchaseOrderById(id)
        if (res.success && res.order) {
            setOrder(res.order as PurchaseOrder)
        }
        setLoading(false)
    }

    async function handleStatusUpdate(newStatus: POStatus) {
        if (!order) return
        setUpdating(true)
        await updatePurchaseOrderStatusAdmin(order.id, newStatus)
        await loadOrder()
        setUpdating(false)
    }

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-slate-800 rounded w-48"></div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="h-40 bg-slate-800 rounded-xl"></div>
                            <div className="h-64 bg-slate-800 rounded-xl"></div>
                        </div>
                        <div className="h-80 bg-slate-800 rounded-xl"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="p-8">
                <div className="bg-slate-800/50 border border-red-500/30 rounded-xl p-8 text-center">
                    <p className="text-red-400 mb-4">Order not found</p>
                    <Link href="/super-admin/purchase-orders" className="text-purple-400 hover:underline">
                        ← Back to Orders
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <Link
                        href="/super-admin/purchase-orders"
                        className="text-gray-400 hover:text-white text-sm mb-2 inline-block"
                    >
                        ← Back to Orders
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">{order.orderNumber}</h1>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${statusColors[order.status]}`}>
                            {statusIcons[order.status]} {order.status}
                        </span>
                    </div>
                    <p className="text-gray-400 mt-1">
                        Created on {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>

                {/* Status Actions */}
                <div className="flex gap-2">
                    {order.status === "PENDING" && (
                        <button
                            onClick={() => handleStatusUpdate("ORDERED")}
                            disabled={updating}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {updating ? "Updating..." : "Mark as Ordered"}
                        </button>
                    )}
                    {order.status === "ORDERED" && (
                        <button
                            onClick={() => handleStatusUpdate("RECEIVED")}
                            disabled={updating}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {updating ? "Updating..." : "Mark as Received"}
                        </button>
                    )}
                    {(order.status === "PENDING" || order.status === "ORDERED") && (
                        <button
                            onClick={() => handleStatusUpdate("CANCELLED")}
                            disabled={updating}
                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 disabled:opacity-50"
                        >
                            Cancel Order
                        </button>
                    )}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Order Items</h2>
                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-white">{item.marketplaceProduct.name}</p>
                                        <p className="text-sm text-gray-400">
                                            {item.marketplaceProduct.category && (
                                                <span className="text-purple-400">{item.marketplaceProduct.category}</span>
                                            )}
                                            {item.marketplaceProduct.description && (
                                                <span className="ml-2">{item.marketplaceProduct.description}</span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white">
                                            {item.quantity} {item.marketplaceProduct.unit} × ₹{item.unitPrice}
                                        </p>
                                        <p className="text-lg font-bold text-purple-400">
                                            ₹{(item.quantity * item.unitPrice).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                            <span className="text-lg text-gray-400">Total Amount</span>
                            <span className="text-2xl font-bold text-white">₹{order.totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Order Notes */}
                    {order.notes && (
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-3">Notes</h2>
                            <p className="text-gray-300">{order.notes}</p>
                        </div>
                    )}

                    {/* Timeline */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Order Timeline</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    ✓
                                </div>
                                <div>
                                    <p className="font-medium text-white">Order Created</p>
                                    <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            {order.status !== "PENDING" && order.status !== "CANCELLED" && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        📦
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Marked as Ordered</p>
                                        <p className="text-sm text-gray-400">Order confirmed for processing</p>
                                    </div>
                                </div>
                            )}

                            {order.status === "RECEIVED" && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        ✅
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Order Received</p>
                                        <p className="text-sm text-gray-400">Order successfully delivered</p>
                                    </div>
                                </div>
                            )}

                            {order.status === "CANCELLED" && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                                        ❌
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Order Cancelled</p>
                                        <p className="text-sm text-gray-400">This order was cancelled</p>
                                    </div>
                                </div>
                            )}

                            {order.estimatedDelivery && order.status !== "RECEIVED" && order.status !== "CANCELLED" && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-gray-400">
                                        📅
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-400">Estimated Delivery</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Restaurant Info */}
                <div className="space-y-6">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Restaurant Details</h2>
                        {order.restaurant ? (
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-400">Name</p>
                                    <p className="text-white font-medium">{order.restaurant.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-white">{order.restaurant.email}</p>
                                </div>
                                {order.restaurant.phone && (
                                    <div>
                                        <p className="text-sm text-gray-400">Phone</p>
                                        <p className="text-white">{order.restaurant.phone}</p>
                                    </div>
                                )}
                                {order.restaurant.address && (
                                    <div>
                                        <p className="text-sm text-gray-400">Address</p>
                                        <p className="text-white">{order.restaurant.address}</p>
                                    </div>
                                )}
                                <Link
                                    href={`/super-admin/restaurants/${order.restaurant.id}`}
                                    className="block mt-4 text-center py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30"
                                >
                                    View Restaurant
                                </Link>
                            </div>
                        ) : (
                            <p className="text-gray-400">Restaurant information not available</p>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Items</span>
                                <span className="text-white">{order.items.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Total Qty</span>
                                <span className="text-white">
                                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-700">
                                <span className="text-gray-400">Total</span>
                                <span className="text-xl font-bold text-purple-400">
                                    ₹{order.totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
