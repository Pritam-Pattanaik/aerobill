"use client"

import { useState, useEffect } from "react"
import { getOffers, createOffer, updateOffer, deleteOffer, toggleOfferStatus } from "@/app/actions/offers"
import { DiscountType, TriggerType } from "@prisma/client"
import { useRouter } from "next/navigation"

type Offer = {
    id: string
    name: string
    description: string | null
    code: string
    discountType: DiscountType
    discountValue: number
    minOrderValue: number
    triggerType: TriggerType
    triggerValue: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export default function OffersPage() {
    const router = useRouter()
    const [offers, setOffers] = useState<Offer[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        code: "",
        discountType: "PERCENTAGE" as DiscountType,
        discountValue: 0,
        minOrderValue: 0,
        triggerType: "MANUAL" as TriggerType,
        triggerValue: 0,
    })

    const fetchOffers = async () => {
        setLoading(true)
        const res = await getOffers()
        if (res.success) {
            setOffers(res.offers as Offer[])
        } else {
            alert("Failed to fetch offers")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchOffers()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic validation
        if (formData.triggerType !== 'MANUAL' && formData.triggerValue <= 0) {
            alert("Trigger value must be greater than 0 for automatic triggers")
            return
        }

        if (editingOffer) {
            const res = await updateOffer(editingOffer.id, {
                ...formData,
                isActive: editingOffer.isActive
            })
            if (res.success) {
                setIsModalOpen(false)
                setEditingOffer(null)
                fetchOffers()
                setFormData({
                    name: "", description: "", code: "", discountType: "PERCENTAGE",
                    discountValue: 0, minOrderValue: 0, triggerType: "MANUAL", triggerValue: 0
                })
            } else {
                alert(res.error || "Failed to update offer")
            }
        } else {
            const res = await createOffer(formData)
            if (res.success) {
                setIsModalOpen(false)
                fetchOffers()
                setFormData({
                    name: "", description: "", code: "", discountType: "PERCENTAGE",
                    discountValue: 0, minOrderValue: 0, triggerType: "MANUAL", triggerValue: 0
                })
            } else {
                alert(res.error || "Failed to create offer")
            }
        }
    }

    const handleEdit = (offer: Offer) => {
        setEditingOffer(offer)
        setFormData({
            name: offer.name,
            description: offer.description || "",
            code: offer.code,
            discountType: offer.discountType,
            discountValue: offer.discountValue,
            minOrderValue: offer.minOrderValue,
            triggerType: offer.triggerType,
            triggerValue: offer.triggerValue,
        })
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this offer?")) return
        const res = await deleteOffer(id)
        if (res.success) fetchOffers()
        else alert(res.error)
    }

    const handleToggle = async (id: string) => {
        const res = await toggleOfferStatus(id)
        if (res.success) fetchOffers()
        else alert(res.error)
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Offers & Coupons</h1>
                    <p className="text-gray-400">Manage discounts and loyalty rewards</p>
                </div>
                <button
                    onClick={() => {
                        setEditingOffer(null)
                        setFormData({
                            name: "", description: "", code: "", discountType: "PERCENTAGE",
                            discountValue: 0, minOrderValue: 0, triggerType: "MANUAL", triggerValue: 0
                        })
                        setIsModalOpen(true)
                    }}
                    className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg hover:bg-[#ff8c5a]"
                >
                    + Create Offer
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading offers...</div>
            ) : offers.length === 0 ? (
                <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-gray-400 mb-4">No offers created yet</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#ff6b35] hover:underline"
                    >
                        Create your first offer
                    </button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {offers.map(offer => (
                        <div key={offer.id} className={`p-4 rounded-xl border ${offer.isActive ? 'border-white/10 bg-white/5' : 'border-red-500/20 bg-red-500/5'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">{offer.name}</h3>
                                <div className={`px-2 py-0.5 rounded text-xs ${offer.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {offer.isActive ? 'Active' : 'Inactive'}
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-3 min-h-[40px]">{offer.description || "No description"}</p>

                            <div className="space-y-2 text-sm text-gray-300 mb-4">
                                <div className="flex justify-between">
                                    <span>Code:</span>
                                    <code className="bg-white/10 px-2 rounded text-[#ff6b35]">{offer.code}</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount:</span>
                                    <span>{offer.discountValue}{offer.discountType === 'PERCENTAGE' ? '%' : ' ₹'} OFF</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Min Order:</span>
                                    <span>₹{offer.minOrderValue}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Trigger:</span>
                                    <span>
                                        {offer.triggerType === 'MANUAL' && 'Manual Code'}
                                        {offer.triggerType === 'VISIT_FREQUENCY' && `${offer.triggerValue}th Visit`}
                                        {offer.triggerType === 'ORDER_AMOUNT' && `Order > ₹${offer.triggerValue}`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-white/10">
                                <button
                                    onClick={() => handleToggle(offer.id)}
                                    className="flex-1 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-sm"
                                >
                                    {offer.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                    onClick={() => handleEdit(offer)}
                                    className="flex-1 px-3 py-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(offer.id)}
                                    className="px-3 py-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{editingOffer ? "Edit Offer" : "Create New Offer"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Offer Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#ff6b35] outline-none"
                                    placeholder="e.g. Summer Sale"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Promo Code</label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#ff6b35] outline-none"
                                    placeholder="e.g. SUMMER2024"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#ff6b35] outline-none"
                                    rows={2}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Discount Type</label>
                                    <select
                                        value={formData.discountType}
                                        onChange={e => setFormData({ ...formData, discountType: e.target.value as DiscountType })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#ff6b35] outline-none"
                                    >
                                        <option value="PERCENTAGE">Percentage (%)</option>
                                        <option value="FIXED">Fixed Amount (₹)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Value</label>
                                    <input
                                        type="number"
                                        value={formData.discountValue}
                                        onChange={e => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#ff6b35] outline-none"
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Minimum Order Value (₹)</label>
                                <input
                                    type="number"
                                    value={formData.minOrderValue}
                                    onChange={e => setFormData({ ...formData, minOrderValue: parseFloat(e.target.value) })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#ff6b35] outline-none"
                                    min="0"
                                />
                            </div>

                            <div className="border-t border-white/10 pt-4">
                                <label className="block text-sm font-semibold mb-2">Trigger Condition</label>
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                    <select
                                        value={formData.triggerType}
                                        onChange={e => setFormData({ ...formData, triggerType: e.target.value as TriggerType })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#ff6b35] outline-none"
                                    >
                                        <option value="MANUAL">Manual Code Entry</option>
                                        <option value="VISIT_FREQUENCY">Visit Frequency (e.g. 5th visit)</option>
                                        <option value="ORDER_AMOUNT">Order Amount (e.g. &gt; ₹1000)</option>
                                    </select>

                                    {formData.triggerType !== 'MANUAL' && (
                                        <input
                                            type="number"
                                            value={formData.triggerValue}
                                            onChange={e => setFormData({ ...formData, triggerValue: parseInt(e.target.value) })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#ff6b35] outline-none"
                                            placeholder="Value"
                                            min="1"
                                        />
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">
                                    {formData.triggerType === 'MANUAL' && "Customer must enter the code manually."}
                                    {formData.triggerType === 'VISIT_FREQUENCY' && `Auto-apply on every ${formData.triggerValue || 'N'}th visit.`}
                                    {formData.triggerType === 'ORDER_AMOUNT' && `Auto-apply when bill exceeds ₹${formData.triggerValue || '0'}.`}
                                </p>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl bg-[#ff6b35] text-white hover:bg-[#ff8c5a] font-semibold"
                                >
                                    {editingOffer ? "Update Offer" : "Create Offer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
