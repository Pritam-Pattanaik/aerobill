"use client"

import { useState, useEffect } from "react"
import { getShippingPolicy, updateShippingPolicy } from "@/app/actions/legal"

export default function ShippingPolicyAdminPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [content, setContent] = useState("")
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    useEffect(() => {
        async function loadData() {
            const result = await getShippingPolicy()
            if (result.success && result.policy) {
                setContent(result.policy.content)
            }
            setLoading(false)
        }
        loadData()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        const result = await updateShippingPolicy(content)

        if (result.success) {
            setMessage({ type: "success", text: "Shipping Policy updated successfully!" })
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
                <h1 className="text-3xl font-bold mb-2">Shipping Policy Settings</h1>
                <p className="text-gray-400">Manage the content of the public Shipping and Delivery Policy page.</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">📝 Policy Content (Markdown)</h2>
                    <div className="space-y-4">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={20}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] outline-none font-mono text-sm"
                            placeholder="# Shipping and Delivery Policy..."
                        />
                        <p className="text-xs text-gray-500">
                            Supports Markdown formatting. Use # for headers, ** for bold, etc.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <a
                        href="/shipping-policy"
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
