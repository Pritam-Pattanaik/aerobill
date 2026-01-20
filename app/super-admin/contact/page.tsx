"use client"

import { useState, useEffect } from "react"
import { getContactInfo, updateContactInfo } from "@/app/actions/contact"

type ContactInfo = {
    id: string
    email: string
    phone: string
    whatsapp: string | null
    address: string
    mapUrl: string | null
    officeHours: string
    facebook: string | null
    twitter: string | null
    instagram: string | null
    linkedin: string | null
}

export default function ContactManagementPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const [form, setForm] = useState<ContactInfo>({
        id: "contact-info",
        email: "",
        phone: "",
        whatsapp: "",
        address: "",
        mapUrl: "",
        officeHours: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
    })

    useEffect(() => {
        async function loadData() {
            const result = await getContactInfo()
            if (result.success && result.contact) {
                setForm({
                    ...result.contact,
                    whatsapp: result.contact.whatsapp || "",
                    mapUrl: result.contact.mapUrl || "",
                    facebook: result.contact.facebook || "",
                    twitter: result.contact.twitter || "",
                    instagram: result.contact.instagram || "",
                    linkedin: result.contact.linkedin || "",
                })
            }
            setLoading(false)
        }
        loadData()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        const result = await updateContactInfo(form)

        if (result.success) {
            setMessage({ type: "success", text: "Contact information updated successfully!" })
        } else {
            setMessage({ type: "error", text: result.error || "Failed to update" })
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-gray-400">Loading...</div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Contact Page Settings</h1>
                <p className="text-gray-400">Manage the content displayed on the public contact page</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Contact Info */}
                <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">📞 Basic Contact</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="support@aerobill.in"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="+91 8736098253"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">WhatsApp Number</label>
                            <input
                                type="tel"
                                value={form.whatsapp}
                                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="+91 8736098253"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Office Hours *</label>
                            <input
                                type="text"
                                value={form.officeHours}
                                onChange={(e) => setForm({ ...form, officeHours: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="Mon-Sat: 9AM - 6PM IST"
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">📍 Location</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Address *</label>
                            <textarea
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                required
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none resize-none"
                                placeholder="Bhubaneswar, Odisha, India"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Google Maps Embed URL</label>
                            <input
                                type="url"
                                value={form.mapUrl}
                                onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="https://www.google.com/maps/embed?..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Optional: Get embed URL from Google Maps → Share → Embed</p>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">🔗 Social Media Links</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Facebook URL</label>
                            <input
                                type="url"
                                value={form.facebook}
                                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="https://facebook.com/aerobill"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Twitter/X URL</label>
                            <input
                                type="url"
                                value={form.twitter}
                                onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="https://twitter.com/aerobill"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Instagram URL</label>
                            <input
                                type="url"
                                value={form.instagram}
                                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="https://instagram.com/aerobill"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
                            <input
                                type="url"
                                value={form.linkedin}
                                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none"
                                placeholder="https://linkedin.com/company/aerobill"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-4">
                    <a
                        href="/contact"
                        target="_blank"
                        className="px-6 py-3 rounded-xl border border-[var(--border)] hover:bg-white/5 transition"
                    >
                        Preview Page ↗
                    </a>
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary px-8 py-3 disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    )
}
