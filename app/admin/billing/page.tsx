"use client"

import { useState, useEffect, useRef } from "react"
import { getReadyOrdersByTable, billTableOrders, billGuestOrders, getBillingHistory } from "@/app/actions/orders"
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
    guestName?: string | null
    table: {
        number: number
    }
    items: OrderItem[]
}

type GuestGroup = {
    guestName: string
    orders: Order[]
    totalAmount: number
    totalItems: number
}

type TableGroup = {
    tableId: string
    tableNumber: number
    orders: Order[]
    totalAmount: number
    totalItems: number
    guests: Record<string, GuestGroup>
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

type BillingReceipt = {
    tableNumber: number
    guestName?: string
    orders: Array<{
        id: string
        createdAt: Date
        items: OrderItem[]
    }>
    totalAmount: number
    allItems: OrderItem[]
    orderCount: number
}

export default function BillingPage() {
    const [tables, setTables] = useState<TableGroup[]>([])
    const [loading, setLoading] = useState(true)
    const [settings, setSettings] = useState<Settings | null>(null)
    const [billingReceipt, setBillingReceipt] = useState<BillingReceipt | null>(null)
    const [processing, setProcessing] = useState<string | null>(null)
    const receiptRef = useRef<HTMLDivElement>(null)

    // History Modal State
    const [showHistory, setShowHistory] = useState(false)
    const [historyDate, setHistoryDate] = useState(new Date().toISOString().split('T')[0])
    const [historyOrders, setHistoryOrders] = useState<Order[]>([])
    const [historySummary, setHistorySummary] = useState<BillingSummary | null>(null)
    const [historyLoading, setHistoryLoading] = useState(false)

    const fetchData = async () => {
        try {
            const [tablesRes, settingsRes] = await Promise.all([
                getReadyOrdersByTable(),
                getSettings(),
            ])

            if (tablesRes.success) {
                setTables(tablesRes.tables as TableGroup[])
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

    const handleBillTable = async (tableId: string, tableNumber: number) => {
        if (!confirm(`Bill all orders for Table #${tableNumber}?`)) return

        setProcessing(tableId)

        try {
            const result = await billTableOrders(tableId)
            if (result.success) {
                setBillingReceipt(result as unknown as BillingReceipt)
                // Wait a moment for the receipt to render
                setTimeout(() => {
                    window.print()
                    setBillingReceipt(null)
                    fetchData()
                }, 100)
            } else {
                alert(result.error || "Failed to bill orders")
            }
        } catch (error) {
            console.error("Failed to bill table:", error)
            alert("Failed to bill orders")
        } finally {
            setProcessing(null)
        }
    }

    const handleBillGuest = async (tableId: string, guestName: string, tableNumber: number) => {
        if (!confirm(`Bill ${guestName}'s orders at Table #${tableNumber}?`)) return

        setProcessing(`${tableId}-${guestName}`)

        try {
            const result = await billGuestOrders(tableId, guestName)
            if (result.success) {
                setBillingReceipt(result as unknown as BillingReceipt)
                // Wait a moment for the receipt to render
                setTimeout(() => {
                    window.print()
                    setBillingReceipt(null)
                    fetchData()
                }, 100)
            } else {
                alert(result.error || "Failed to bill guest orders")
            }
        } catch (error) {
            console.error("Failed to bill guest:", error)
            alert("Failed to bill orders")
        } finally {
            setProcessing(null)
        }
    }

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        })
    }

    const formatTime = (date: string | Date) => {
        return new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
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
            <div className="p-4 md:p-8 flex items-center justify-center min-h-[60vh]">
                <div className="animate-pulse text-xl">Loading billing...</div>
            </div>
        )
    }

    const totalOrdersCount = tables.reduce((sum, t) => sum + t.orders.length, 0)

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Billing</h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Combined billing for tables with multiple orders
                    </p>
                </div>
                <button
                    onClick={() => setShowHistory(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 rounded-xl hover:bg-indigo-500/30 transition-all w-full sm:w-auto"
                >
                    <span className="text-lg">📜</span>
                    <span className="font-medium">History</span>
                </button>
            </div>

            {/* Stats */}
            <div className="glass-card p-3 md:p-4 mb-6 md:mb-8 flex flex-wrap items-center gap-3 md:gap-6 text-sm md:text-base">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[var(--success)]" />
                    <span>Tables ready: {tables.length}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">|</span>
                    <span>Total orders: {totalOrdersCount}</span>
                </div>
                <div className="text-gray-400 hidden sm:block">Auto-refresh: 10s</div>
            </div>

            {/* Tables list */}
            {tables.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">✨</div>
                    <h2 className="text-2xl font-semibold mb-2">No tables to bill</h2>
                    <p className="text-gray-400">Orders marked as Ready will appear here grouped by table</p>
                </div>
            ) : (
                <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
                    {tables.map((table) => (
                        <div
                            key={table.tableId}
                            className="glass-card p-6 border-[var(--success)]"
                        >
                            {/* Table header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-3xl">🍽️</span>
                                        <span className="text-3xl font-bold">Table #{table.tableNumber}</span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {table.orders.length} order{table.orders.length > 1 ? 's' : ''} • {table.totalItems} items
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-[var(--primary)]">
                                        ₹{table.totalAmount.toFixed(0)}
                                    </p>
                                    {settings && settings.taxRate > 0 && (
                                        <p className="text-xs text-gray-400">
                                            +₹{calculateTax(table.totalAmount).toFixed(0)} tax
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Guest-based billing sections */}
                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                                {Object.values(table.guests || {}).map((guest) => (
                                    <div
                                        key={guest.guestName}
                                        className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]"
                                    >
                                        {/* Guest header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">👤</span>
                                                <span className="font-semibold">{guest.guestName}</span>
                                                <span className="text-xs text-gray-500">
                                                    {guest.orders.length} order{guest.orders.length > 1 ? 's' : ''} • {guest.totalItems} items
                                                </span>
                                            </div>
                                            <span className="font-bold text-[var(--primary)]">
                                                ₹{guest.totalAmount.toFixed(0)}
                                            </span>
                                        </div>

                                        {/* Guest's items */}
                                        <div className="space-y-1 mb-3">
                                            {guest.orders.flatMap(order => order.items).map((item, idx) => (
                                                <div
                                                    key={`${guest.guestName}-${idx}`}
                                                    className="flex items-center justify-between text-sm"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full ${item.product.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                                                        <span className="font-medium">{item.quantity}×</span>
                                                        <span>{item.product.name}</span>
                                                    </div>
                                                    <span className="text-gray-400">₹{(item.priceAtTime * item.quantity).toFixed(0)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bill this guest button */}
                                        <button
                                            onClick={() => handleBillGuest(table.tableId, guest.guestName, table.tableNumber)}
                                            disabled={processing === `${table.tableId}-${guest.guestName}`}
                                            className="w-full py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 transition disabled:opacity-50"
                                        >
                                            {processing === `${table.tableId}-${guest.guestName}`
                                                ? "Processing..."
                                                : `💳 Bill ${guest.guestName} — ₹${guest.totalAmount.toFixed(0)}`}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="border-t border-[var(--border)] pt-4 mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span>₹{table.totalAmount.toFixed(0)}</span>
                                </div>
                                {settings && settings.taxRate > 0 && (
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Tax ({settings.taxRate}%)</span>
                                        <span>₹{calculateTax(table.totalAmount).toFixed(0)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-[var(--primary)]">
                                        ₹{(table.totalAmount + calculateTax(table.totalAmount)).toFixed(0)}
                                    </span>
                                </div>
                            </div>

                            {/* Bill All Action */}
                            <button
                                onClick={() => handleBillTable(table.tableId, table.tableNumber)}
                                disabled={processing === table.tableId}
                                className="w-full btn-primary py-3 text-lg"
                            >
                                {processing === table.tableId
                                    ? "Processing..."
                                    : `🧾 Bill Entire Table — ₹${(table.totalAmount + calculateTax(table.totalAmount)).toFixed(0)}`}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* History Modal */}
            {showHistory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4">
                    <div className="glass-card w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
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
            {billingReceipt && (
                <div className="receipt" ref={receiptRef}>
                    <div className="receipt-header">
                        <h1>{settings?.cafeName || "Aerobill Cafe"}</h1>
                        <p>{formatDate(new Date())}</p>
                        <p>Table: {billingReceipt.tableNumber}</p>
                        {billingReceipt.orderCount > 1 && (
                            <p style={{ fontSize: '10px' }}>({billingReceipt.orderCount} orders combined)</p>
                        )}
                    </div>

                    <div className="receipt-items">
                        {billingReceipt.allItems.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="receipt-item">
                                <span className="receipt-item-name">{item.product.name}</span>
                                <span className="receipt-item-qty">{item.quantity}</span>
                                <span className="receipt-item-price">
                                    ₹{(item.priceAtTime * item.quantity).toFixed(0)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="receipt-item">
                        <span className="receipt-item-name">Subtotal</span>
                        <span className="receipt-item-qty"></span>
                        <span className="receipt-item-price">
                            ₹{billingReceipt.totalAmount.toFixed(0)}
                        </span>
                    </div>

                    {settings && settings.taxRate > 0 && (
                        <div className="receipt-item">
                            <span className="receipt-item-name">Tax ({settings.taxRate}%)</span>
                            <span className="receipt-item-qty"></span>
                            <span className="receipt-item-price">
                                ₹{calculateTax(billingReceipt.totalAmount).toFixed(0)}
                            </span>
                        </div>
                    )}

                    <div className="receipt-total">
                        <span>TOTAL</span>
                        <span>
                            ₹{(billingReceipt.totalAmount + calculateTax(billingReceipt.totalAmount)).toFixed(0)}
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
