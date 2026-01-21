"use client"

import { useState, useEffect } from "react"
import {
    getPurchaseOrders,
    createPurchaseOrder,
    updatePurchaseOrderStatus,
    deletePurchaseOrder,
    getInventory
} from "@/app/actions/inventory"
import { POStatus } from "@prisma/client"

type InventoryItem = { id: string; name: string; unit: string; pricePerUnit: number }
type POItem = { inventoryId: string; quantity: number; unitPrice: number; inventory?: InventoryItem }
type PurchaseOrder = {
    id: string
    orderNumber: string
    status: string
    supplierName: string | null
    notes: string | null
    totalAmount: number
    items: POItem[]
    createdAt: string
}

export default function PurchaseOrdersPage() {
    const [orders, setOrders] = useState<PurchaseOrder[]>([])
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [newOrder, setNewOrder] = useState({
        supplierName: "",
        notes: "",
        items: [] as { inventoryId: string; quantity: number; unitPrice: number }[]
    })

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        setLoading(true)
        const [ordersRes, invRes] = await Promise.all([
            getPurchaseOrders(),
            getInventory()
        ])
        if (ordersRes.success) setOrders(ordersRes.orders as unknown as PurchaseOrder[])
        if (invRes.success) setInventory(invRes.inventory as unknown as InventoryItem[])
        setLoading(false)
    }

    async function handleCreate() {
        if (newOrder.items.length === 0) return alert("Add at least one item")
        await createPurchaseOrder(newOrder)
        setShowModal(false)
        setNewOrder({ supplierName: "", notes: "", items: [] })
        loadData()
    }

    async function handleStatusChange(id: string, status: POStatus) {
        await updatePurchaseOrderStatus(id, status)
        loadData()
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this purchase order?")) return
        await deletePurchaseOrder(id)
        loadData()
    }

    function addItem() {
        if (inventory.length === 0) return
        setNewOrder(prev => ({
            ...prev,
            items: [...prev.items, { inventoryId: inventory[0].id, quantity: 1, unitPrice: inventory[0].pricePerUnit }]
        }))
    }

    function removeItem(index: number) {
        setNewOrder(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }))
    }

    function updateItem(index: number, field: string, value: string | number) {
        setNewOrder(prev => ({
            ...prev,
            items: prev.items.map((item, i) => {
                if (i !== index) return item
                if (field === "inventoryId") {
                    const inv = inventory.find(inv => inv.id === value)
                    return { ...item, inventoryId: value as string, unitPrice: inv?.pricePerUnit || item.unitPrice }
                }
                return { ...item, [field]: Number(value) }
            })
        }))
    }

    const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        ORDERED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        RECEIVED: "bg-green-500/20 text-green-400 border-green-500/30",
        CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30"
    }

    if (loading) return <div className="p-6 text-center">Loading...</div>

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Purchase Orders</h1>
                    <p className="text-gray-400 text-sm">Manage supplier orders and restock inventory</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary py-2">
                    + New Order
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.length === 0 ? (
                    <div className="glass-card p-8 text-center text-gray-500">
                        No purchase orders yet. Create one to get started.
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="glass-card p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                                    {order.supplierName && <p className="text-sm text-gray-400">{order.supplierName}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs border ${statusColors[order.status]}`}>
                                        {order.status}
                                    </span>
                                    <span className="font-semibold">₹{order.totalAmount.toFixed(0)}</span>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="bg-[var(--background)] rounded-lg p-3 mb-4">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between py-1 text-sm">
                                        <span>{item.inventory?.name || "Unknown"}</span>
                                        <span>{item.quantity} × ₹{item.unitPrice}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                {order.status === "PENDING" && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(order.id, POStatus.ORDERED)}
                                            className="btn-secondary py-1 px-3 text-sm"
                                        >
                                            Mark Ordered
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="text-red-400 text-sm px-3"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                                {order.status === "ORDERED" && (
                                    <button
                                        onClick={() => handleStatusChange(order.id, POStatus.RECEIVED)}
                                        className="btn-primary py-1 px-3 text-sm"
                                    >
                                        ✓ Mark Received (Update Stock)
                                    </button>
                                )}
                                {order.status === "RECEIVED" && (
                                    <span className="text-green-400 text-sm">✓ Stock updated</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* New Order Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
                    <div className="glass-card p-6 relative z-10 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">New Purchase Order</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400">Supplier Name</label>
                                <input
                                    type="text"
                                    value={newOrder.supplierName}
                                    onChange={e => setNewOrder(p => ({ ...p, supplierName: e.target.value }))}
                                    className="input w-full mt-1"
                                    placeholder="Optional"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400">Notes</label>
                                <textarea
                                    value={newOrder.notes}
                                    onChange={e => setNewOrder(p => ({ ...p, notes: e.target.value }))}
                                    className="input w-full mt-1"
                                    rows={2}
                                    placeholder="Optional"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm text-gray-400">Items</label>
                                    <button onClick={addItem} className="text-sm text-[var(--primary)]">+ Add Item</button>
                                </div>

                                {newOrder.items.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No items added</p>
                                ) : (
                                    <div className="space-y-2">
                                        {newOrder.items.map((item, i) => (
                                            <div key={i} className="flex gap-2 items-center">
                                                <select
                                                    value={item.inventoryId}
                                                    onChange={e => updateItem(i, "inventoryId", e.target.value)}
                                                    className="input flex-1"
                                                >
                                                    {inventory.map(inv => (
                                                        <option key={inv.id} value={inv.id}>{inv.name}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={e => updateItem(i, "quantity", e.target.value)}
                                                    className="input w-20"
                                                    min="1"
                                                />
                                                <input
                                                    type="number"
                                                    value={item.unitPrice}
                                                    onChange={e => updateItem(i, "unitPrice", e.target.value)}
                                                    className="input w-24"
                                                    min="0"
                                                    step="0.01"
                                                />
                                                <button onClick={() => removeItem(i)} className="text-red-400">×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                <span className="font-semibold">
                                    Total: ₹{newOrder.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0).toFixed(0)}
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={() => setShowModal(false)} className="btn-secondary py-2 px-4">Cancel</button>
                                    <button onClick={handleCreate} className="btn-primary py-2 px-4">Create Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
