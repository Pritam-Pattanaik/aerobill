"use client"

import { useState, useEffect } from "react"
import {
    getInventory,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    adjustInventoryQuantity,
    getInventoryLogs,
} from "@/app/actions/inventory"
import { getSettings, updateSettings } from "@/app/actions/tables"

type InventoryItem = {
    id: string
    name: string
    quantity: number
    unit: string
    pricePerUnit: number
    products: { id: string; name: string }[]
}

type InventoryLog = {
    id: string
    inventoryId: string
    type: string
    quantity: number
    previousQty: number
    newQty: number
    reason: string | null
    createdAt: Date
    inventory: { name: string; unit: string }
}

export default function InventoryManagement() {
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
    const [adjustingId, setAdjustingId] = useState<string | null>(null)
    const [adjustAmount, setAdjustAmount] = useState("")
    const [autoDeduction, setAutoDeduction] = useState(true)

    const [logs, setLogs] = useState<InventoryLog[]>([])
    const [showLogsModal, setShowLogsModal] = useState(false)
    const [logsLoading, setLogsLoading] = useState(false)
    const [viewingInventoryId, setViewingInventoryId] = useState<string | undefined>(undefined)

    const [form, setForm] = useState({
        name: "",
        quantity: "",
        unit: "",
        pricePerUnit: "",
    })

    const fetchInventory = async () => {
        try {
            const [invRes, settingsRes] = await Promise.all([
                getInventory(),
                getSettings()
            ])

            if (invRes.success) {
                setInventory(invRes.inventory as InventoryItem[])
            }
            if (settingsRes.success && settingsRes.settings) {
                setAutoDeduction(settingsRes.settings.inventoryDeduction ?? true)
            }
        } catch (error) {
            console.error("Failed to fetch inventory:", error)
        } finally {
            setLoading(false)
        }
    }

    const toggleAutoDeduction = async () => {
        const newValue = !autoDeduction
        setAutoDeduction(newValue)
        try {
            // We need to fetch current settings first to preserve other fields
            const currentSettings = await getSettings()
            if (currentSettings.success && currentSettings.settings) {
                const settings = currentSettings.settings as any
                await updateSettings({
                    ...settings,
                    // Ensure required fields are present (with defaults if missing)
                    cafeName: settings.cafeName,
                    taxRate: settings.taxRate,
                    cgst: settings.cgst || 0,
                    sgst: settings.sgst || 0,
                    whatsappEnabled: settings.whatsappEnabled || false,
                    inventoryDeduction: newValue
                })
            }
        } catch (error) {
            console.error("Failed to update settings:", error)
            setAutoDeduction(!newValue) // Revert on error
        }
    }

    useEffect(() => {
        fetchInventory()
    }, [])

    const fetchLogs = async (inventoryId?: string) => {
        setLogsLoading(true)
        setViewingInventoryId(inventoryId)
        setShowLogsModal(true)
        try {
            const res = await getInventoryLogs(inventoryId)
            if (res.success) {
                setLogs(res.logs as unknown as InventoryLog[])
            } else {
                alert(res.error)
            }
        } catch (error) {
            console.error("Failed to fetch logs:", error)
        } finally {
            setLogsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            name: form.name,
            quantity: parseFloat(form.quantity),
            unit: form.unit,
            pricePerUnit: parseFloat(form.pricePerUnit),
        }

        if (editingItem) {
            await updateInventoryItem(editingItem.id, data)
        } else {
            await createInventoryItem(data)
        }

        setShowModal(false)
        setEditingItem(null)
        resetForm()
        fetchInventory()
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            const result = await deleteInventoryItem(id)
            if (!result.success) {
                alert(result.error)
            }
            fetchInventory()
        }
    }

    const handleAdjust = async (id: string) => {
        const amount = parseFloat(adjustAmount)
        if (isNaN(amount)) return

        await adjustInventoryQuantity(id, amount)
        setAdjustingId(null)
        setAdjustAmount("")
        fetchInventory()
    }

    const editItem = (item: InventoryItem) => {
        setEditingItem(item)
        setForm({
            name: item.name,
            quantity: item.quantity.toString(),
            unit: item.unit,
            pricePerUnit: item.pricePerUnit.toString(),
        })
        setShowModal(true)
    }

    const resetForm = () => {
        setForm({ name: "", quantity: "", unit: "", pricePerUnit: "" })
    }

    const lowStockItems = inventory.filter((item) => item.quantity <= 10)

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading inventory...</div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
                    <p className="text-gray-400">Track and manage your stock levels</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Auto Deduction Toggle */}
                    <div className="flex items-center gap-3 bg-[var(--card)] px-4 py-2 rounded-xl border border-[var(--border)]">
                        <span className="text-sm font-medium">Auto-Deduct on Billing</span>
                        <button
                            onClick={toggleAutoDeduction}
                            className={`w-12 h-6 rounded-full transition-colors relative ${autoDeduction ? "bg-[var(--primary)]" : "bg-gray-600"
                                }`}
                        >
                            <span
                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${autoDeduction ? "translate-x-6" : "translate-x-0"
                                    }`}
                            />
                        </button>
                    </div>

                    <button
                        onClick={() => fetchLogs()}
                        className="btn-secondary whitespace-nowrap"
                    >
                        View History
                    </button>
                    <button
                        onClick={() => {
                            resetForm()
                            setEditingItem(null)
                            setShowModal(true)
                        }}
                        className="btn-primary whitespace-nowrap"
                    >
                        + Add Item
                    </button>
                </div>
            </div>

            {/* Low stock alert */}
            {lowStockItems.length > 0 && (
                <div className="glass-card p-4 mb-8 border-[var(--warning)]">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <h3 className="font-semibold text-[var(--warning)]">Low Stock Alert</h3>
                            <p className="text-sm text-gray-400">
                                {lowStockItems.length} item(s) are running low on stock
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Inventory table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[var(--card)]">
                            <th className="text-left p-4 font-medium">Item Name</th>
                            <th className="text-left p-4 font-medium">Quantity</th>
                            <th className="text-left p-4 font-medium">Unit</th>
                            <th className="text-left p-4 font-medium">Price/Unit</th>
                            <th className="text-left p-4 font-medium">Linked Products</th>
                            <th className="text-right p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item) => (
                            <tr key={item.id} className="border-t border-[var(--border)]">
                                <td className="p-4 font-medium">{item.name}</td>
                                <td className="p-4">
                                    <span
                                        className={`font-semibold ${item.quantity <= 10 ? "text-[var(--warning)]" : ""
                                            }`}
                                    >
                                        {item.quantity}
                                    </span>
                                    {/* Adjust quantity inline */}
                                    {adjustingId === item.id ? (
                                        <div className="flex items-center gap-2 mt-2">
                                            <input
                                                type="number"
                                                value={adjustAmount}
                                                onChange={(e) => setAdjustAmount(e.target.value)}
                                                className="input w-20 py-1"
                                                placeholder="+/-"
                                            />
                                            <button
                                                onClick={() => handleAdjust(item.id)}
                                                className="text-sm text-green-400"
                                            >
                                                ✓
                                            </button>
                                            <button
                                                onClick={() => setAdjustingId(null)}
                                                className="text-sm text-red-400"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setAdjustingId(item.id)
                                                setAdjustAmount("")
                                            }}
                                            className="text-xs text-blue-400 hover:underline ml-2"
                                        >
                                            Adjust
                                        </button>
                                    )}
                                </td>
                                <td className="p-4 text-gray-400">{item.unit}</td>
                                <td className="p-4">₹{item.pricePerUnit.toFixed(2)}</td>
                                <td className="p-4 text-sm text-gray-400">
                                    {item.products.length > 0
                                        ? item.products.map((p) => p.name).join(", ")
                                        : "-"}
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => fetchLogs(item.id)}
                                        className="text-sm text-purple-400 hover:text-purple-300 mr-3"
                                    >
                                        History
                                    </button>
                                    <button
                                        onClick={() => editItem(item)}
                                        className="text-sm text-blue-400 hover:text-blue-300 mr-3"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-sm text-red-400 hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {inventory.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No inventory items yet. Add your first item!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="glass-card p-6 w-full max-w-md relative z-10 animate-fadeIn">
                        <h2 className="text-xl font-bold mb-6">
                            {editingItem ? "Edit Item" : "Add New Item"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Item Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="input"
                                    placeholder="e.g., Rice, Cooking Oil"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={form.quantity}
                                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                        className="input"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Unit</label>
                                    <input
                                        type="text"
                                        value={form.unit}
                                        onChange={(e) => setForm({ ...form, unit: e.target.value })}
                                        className="input"
                                        placeholder="kg, liters, pcs"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Price per Unit (₹)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={form.pricePerUnit}
                                    onChange={(e) => setForm({ ...form, pricePerUnit: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary flex-1">
                                    {editingItem ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Logs Modal */}
            {showLogsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogsModal(false)} />
                    <div className="glass-card p-6 w-full max-w-4xl relative z-10 animate-fadeIn max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                {viewingInventoryId ? "Item History" : "Inventory History"}
                            </h2>
                            <button onClick={() => setShowLogsModal(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>

                        {logsLoading ? (
                            <div className="text-center py-8 text-gray-400 animate-pulse">Loading history...</div>
                        ) : logs.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">No history found.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[var(--background)] text-gray-400 border-b border-[var(--border)]">
                                            <th className="text-left p-3 font-medium">Date & Time</th>
                                            <th className="text-left p-3 font-medium">Item</th>
                                            <th className="text-left p-3 font-medium">Type</th>
                                            <th className="text-right p-3 font-medium">Change</th>
                                            <th className="text-right p-3 font-medium">Previous</th>
                                            <th className="text-right p-3 font-medium">New Qty</th>
                                            <th className="text-left p-3 font-medium">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.map((log) => (
                                            <tr key={log.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--card-hover)]">
                                                <td className="p-3 text-gray-300">
                                                    {new Date(log.createdAt).toLocaleString(undefined, {
                                                        year: 'numeric', month: 'short', day: 'numeric',
                                                        hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="p-3 font-medium">{log.inventory.name}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        log.type === 'ADDITION' || log.type === 'PURCHASE_RECEIVED' ? 'bg-green-500/20 text-green-400' :
                                                        log.type === 'ORDER_DEDUCTION' || log.type === 'WASTAGE' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                        {log.type.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className={`p-3 text-right font-medium ${log.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {log.quantity > 0 ? '+' : ''}{log.quantity} {log.inventory.unit}
                                                </td>
                                                <td className="p-3 text-right text-gray-400">{log.previousQty}</td>
                                                <td className="p-3 text-right font-medium text-white">{log.newQty}</td>
                                                <td className="p-3 text-gray-400 italic">{log.reason || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
