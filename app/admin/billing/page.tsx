"use client"

import { useState, useEffect, useRef } from "react"
import { getReadyOrders, billOrder, getOrderById } from "@/app/actions/orders"
import { getSettings } from "@/app/actions/tables"

type OrderItem = {
    id: string
    quantity: number
    priceAtTime: number
    product: {
        id: string
        name: string
        isVeg: boolean
    }
}

type Order = {
    id: string
    status: string
    totalAmount: number
    createdAt: string
    table: {
        number: number
    }
    items: OrderItem[]
}

type Settings = {
    cafeName: string
    feedbackLink: string | null
    taxRate: number
}

export default function BillingPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [settings, setSettings] = useState<Settings | null>(null)
    const [billingOrder, setBillingOrder] = useState<Order | null>(null)
    const [processing, setProcessing] = useState(false)
    const receiptRef = useRef<HTMLDivElement>(null)

    const fetchData = async () => {
        try {
            const [ordersRes, settingsRes] = await Promise.all([
                getReadyOrders(),
                getSettings(),
            ])

            if (ordersRes.success) {
                setOrders(ordersRes.orders as Order[])
            }
            if (settingsRes.success && settingsRes.settings) {
                setSettings(settingsRes.settings)
            }
        } catch (error) {
            console.error("Failed to fetch data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
        // Poll every 10 seconds
        const interval = setInterval(fetchData, 10000)
        return () => clearInterval(interval)
    }, [])

    const handleBillAndPrint = async (order: Order) => {
        setBillingOrder(order)
        setProcessing(true)

        try {
            const result = await billOrder(order.id)
            if (result.success) {
                // Wait a moment for the receipt to render
                setTimeout(() => {
                    window.print()
                    setBillingOrder(null)
                    fetchData()
                }, 100)
            } else {
                alert(result.error || "Failed to bill order")
                setBillingOrder(null)
            }
        } catch (error) {
            console.error("Failed to bill order:", error)
            alert("Failed to bill order")
            setBillingOrder(null)
        } finally {
            setProcessing(false)
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        })
    }

    const calculateTax = (amount: number) => {
        if (!settings) return 0
        return amount * (settings.taxRate / 100)
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading billing...</div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Billing</h1>
                <p className="text-gray-400">
                    Process payments and print receipts for ready orders
                </p>
            </div>

            {/* Stats */}
            <div className="glass-card p-4 mb-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[var(--success)]" />
                    <span>Ready for billing: {orders.length}</span>
                </div>
                <div className="text-gray-400">Auto-refresh: 10s</div>
            </div>

            {/* Orders list */}
            {orders.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">✨</div>
                    <h2 className="text-2xl font-semibold mb-2">No orders to bill</h2>
                    <p className="text-gray-400">Orders marked as Ready will appear here</p>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="glass-card p-6 border-[var(--success)]"
                        >
                            {/* Order header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-3xl font-bold">#{order.table.number}</span>
                                        <span className="badge badge-ready">Ready</span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Order: {order.id.slice(-6).toUpperCase()} • {formatDate(order.createdAt)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-[var(--primary)]">
                                        ₹{order.totalAmount.toFixed(0)}
                                    </p>
                                    {settings && settings.taxRate > 0 && (
                                        <p className="text-xs text-gray-400">
                                            +₹{calculateTax(order.totalAmount).toFixed(0)} tax
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Items */}
                            <div className="space-y-2 mb-6 max-h-40 overflow-y-auto">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-2 bg-[var(--background)] rounded-lg text-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{item.quantity}×</span>
                                            <span>{item.product.name}</span>
                                        </div>
                                        <span>₹{(item.priceAtTime * item.quantity).toFixed(0)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Action */}
                            <button
                                onClick={() => handleBillAndPrint(order)}
                                disabled={processing}
                                className="w-full btn-primary py-3 text-lg"
                            >
                                {processing && billingOrder?.id === order.id
                                    ? "Processing..."
                                    : "🧾 Bill & Print Receipt"}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Receipt for printing */}
            {billingOrder && (
                <div className="receipt" ref={receiptRef}>
                    <div className="receipt-header">
                        <h1>{settings?.cafeName || "Aerobill Cafe"}</h1>
                        <p>{formatDate(billingOrder.createdAt)}</p>
                        <p>Order: {billingOrder.id.slice(-6).toUpperCase()}</p>
                        <p>Table: {billingOrder.table.number}</p>
                    </div>

                    <div className="receipt-items">
                        {billingOrder.items.map((item) => (
                            <div key={item.id} className="receipt-item">
                                <span className="receipt-item-name">{item.product.name}</span>
                                <span className="receipt-item-qty">{item.quantity}</span>
                                <span className="receipt-item-price">
                                    ₹{(item.priceAtTime * item.quantity).toFixed(0)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {settings && settings.taxRate > 0 && (
                        <div className="receipt-item">
                            <span className="receipt-item-name">Tax ({settings.taxRate}%)</span>
                            <span className="receipt-item-qty"></span>
                            <span className="receipt-item-price">
                                ₹{calculateTax(billingOrder.totalAmount).toFixed(0)}
                            </span>
                        </div>
                    )}

                    <div className="receipt-total">
                        <span>TOTAL</span>
                        <span>
                            ₹{(billingOrder.totalAmount + calculateTax(billingOrder.totalAmount)).toFixed(0)}
                        </span>
                    </div>

                    <div className="receipt-footer">
                        <p>Thank you for dining with us!</p>
                        {settings?.feedbackLink && (
                            <p>Feedback: {settings.feedbackLink}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
