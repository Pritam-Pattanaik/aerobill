"use client"

import { useState, useEffect, useRef } from "react"
import { getReadyOrders, billOrder, getOrderById, getBillingHistory } from "@/app/actions/orders"
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
    updatedAt?: string
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

type BillingSummary = {
    totalRevenue: number
    totalOrders: number
    date: string
}

export default function BillingPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [settings, setSettings] = useState<Settings | null>(null)
    const [billingOrder, setBillingOrder] = useState<Order | null>(null)
    const [processing, setProcessing] = useState(false)
    const receiptRef = useRef<HTMLDivElement>(null)

    // History Modal State
    const [showHistory, setShowHistory] = useState(false)
    const [historyDate, setHistoryDate] = useState(new Date().toISOString().split('T')[0])
    const [historyOrders, setHistoryOrders] = useState<Order[]>([])
    const [historySummary, setHistorySummary] = useState<BillingSummary | null>(null)
    const [historyLoading, setHistoryLoading] = useState(false)

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

    const fetchHistory = async (date: string) => {
        setHistoryLoading(true)
        try {
            const result = await getBillingHistory(date)
            if (result.success) {
                setHistoryOrders(result.orders as Order[])
                setHistorySummary(result.summary)
            }
        } catch (error) {
            console.error("Failed to fetch history:", error)
        } finally {
            setHistoryLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
        // Poll every 10 seconds
        const interval = setInterval(fetchData, 10000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (showHistory) {
            fetchHistory(historyDate)
        }
    }, [showHistory, historyDate])

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

    const formatDateShort = (date: string) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    const calculateTax = (amount: number) => {
        if (!settings) return 0
        return amount * (settings.taxRate / 100)
    }

    const isToday = (dateStr: string) => {
        const today = new Date().toISOString().split('T')[0]
        return dateStr === today
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
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Billing</h1>
                    <p className="text-gray-400">
                        Process payments and print receipts for ready orders
                    </p>
                </div>
                <button
                    onClick={() => setShowHistory(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 rounded-xl hover:bg-indigo-500/30 transition-all"
                >
                    <span className="text-lg">📜</span>
                    <span className="font-medium">History</span>
                </button>
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

            {/* History Modal */}
            {showHistory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col m-4">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between flex-shrink-0">
                            <div>
                                <h2 className="text-2xl font-bold">Billing History</h2>
                                <p className="text-gray-400 text-sm">View past billings by date</p>
                            </div>
                            <button
                                onClick={() => setShowHistory(false)}
                                className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition"
                            >
                                <span className="text-2xl">✕</span>
                            </button>
                        </div>

                        {/* Date Picker */}
                        <div className="p-4 border-b border-[var(--border)] flex items-center gap-4 flex-shrink-0">
                            <label className="text-gray-400">Select Date:</label>
                            <input
                                type="date"
                                value={historyDate}
                                onChange={(e) => setHistoryDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-white focus:outline-none focus:border-[var(--primary)]"
                            />
                            <button
                                onClick={() => setHistoryDate(new Date().toISOString().split('T')[0])}
                                className={`px-4 py-2 rounded-lg transition ${isToday(historyDate)
                                        ? "bg-[var(--primary)] text-white"
                                        : "bg-[var(--card-hover)] text-gray-300 hover:bg-[var(--primary)]/50"
                                    }`}
                            >
                                Today
                            </button>
                        </div>

                        {/* Summary */}
                        {historySummary && (
                            <div className="p-4 border-b border-[var(--border)] flex items-center gap-8 bg-[var(--card-hover)]/30 flex-shrink-0">
                                <div>
                                    <p className="text-gray-400 text-sm">Date</p>
                                    <p className="text-lg font-semibold">{formatDateShort(historySummary.date)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Total Orders</p>
                                    <p className="text-2xl font-bold text-[var(--primary)]">{historySummary.totalOrders}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Total Revenue</p>
                                    <p className="text-2xl font-bold text-green-400">₹{historySummary.totalRevenue.toFixed(0)}</p>
                                </div>
                            </div>
                        )}

                        {/* Orders List */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {historyLoading ? (
                                <div className="text-center py-10">
                                    <div className="animate-pulse text-xl">Loading history...</div>
                                </div>
                            ) : historyOrders.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="text-4xl mb-3">📭</div>
                                    <p className="text-gray-400">No billings found for this date</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {historyOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)] hover:border-[var(--primary)]/30 transition"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xl font-bold">Table #{order.table.number}</span>
                                                    <span className="text-sm text-gray-400">
                                                        {order.id.slice(-6).toUpperCase()}
                                                    </span>
                                                    <span className="badge bg-green-500/20 text-green-400 text-xs">
                                                        Billed
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-[var(--primary)]">
                                                        ₹{order.totalAmount.toFixed(0)}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatDate(order.updatedAt || order.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {order.items.map((item) => (
                                                    <span
                                                        key={item.id}
                                                        className="text-xs px-2 py-1 bg-[var(--card-hover)] rounded-lg text-gray-300"
                                                    >
                                                        {item.quantity}× {item.product.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
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
