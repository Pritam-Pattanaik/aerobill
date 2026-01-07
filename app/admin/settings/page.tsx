"use client"

import { useState, useEffect } from "react"
import { getSettings, updateSettings } from "@/app/actions/tables"

type Settings = {
    id: string
    cafeName: string
    feedbackLink: string | null
    taxRate: number
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const [form, setForm] = useState({
        cafeName: "",
        feedbackLink: "",
        taxRate: "",
    })

    useEffect(() => {
        async function fetchSettings() {
            try {
                const result = await getSettings()
                if (result.success && result.settings) {
                    setSettings(result.settings)
                    setForm({
                        cafeName: result.settings.cafeName,
                        feedbackLink: result.settings.feedbackLink || "",
                        taxRate: result.settings.taxRate.toString(),
                    })
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSettings()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        try {
            const result = await updateSettings({
                cafeName: form.cafeName,
                feedbackLink: form.feedbackLink || undefined,
                taxRate: parseFloat(form.taxRate) || 0,
            })

            if (result.success) {
                setMessage({ type: "success", text: "Settings saved successfully!" })
                if (result.settings) {
                    setSettings(result.settings)
                }
            } else {
                setMessage({ type: "error", text: result.error || "Failed to save settings" })
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to save settings" })
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading settings...</div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-gray-400">Configure your restaurant settings</p>
            </div>

            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                    {/* Cafe Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            value={form.cafeName}
                            onChange={(e) => setForm({ ...form, cafeName: e.target.value })}
                            className="input"
                            placeholder="Your Restaurant Name"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            This will appear on receipts and the customer interface
                        </p>
                    </div>

                    {/* Tax Rate */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Tax Rate (%)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            value={form.taxRate}
                            onChange={(e) => setForm({ ...form, taxRate: e.target.value })}
                            className="input"
                            placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Applied to all orders. Set to 0 for no tax.
                        </p>
                    </div>

                    {/* Feedback Link */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Feedback Link (Optional)
                        </label>
                        <input
                            type="url"
                            value={form.feedbackLink}
                            onChange={(e) => setForm({ ...form, feedbackLink: e.target.value })}
                            className="input"
                            placeholder="https://your-feedback-form.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Link to a Google Form, Typeform, or any feedback page. Appears on receipts.
                        </p>
                    </div>

                    {/* Message */}
                    {message && (
                        <div
                            className={`p-4 rounded-lg ${message.type === "success"
                                    ? "bg-green-500/10 border border-green-500/50 text-green-400"
                                    : "bg-red-500/10 border border-red-500/50 text-red-400"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary w-full"
                    >
                        {saving ? "Saving..." : "Save Settings"}
                    </button>
                </form>

                {/* Additional info */}
                <div className="glass-card p-6 mt-8">
                    <h3 className="font-semibold mb-4">Environment Variables</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        The following environment variables are required for full functionality:
                    </p>
                    <div className="space-y-2 font-mono text-sm">
                        <div className="p-3 bg-[var(--background)] rounded-lg">
                            <span className="text-[var(--primary)]">DATABASE_URL</span>=&quot;postgresql://...&quot;
                        </div>
                        <div className="p-3 bg-[var(--background)] rounded-lg">
                            <span className="text-[var(--primary)]">NEXTAUTH_SECRET</span>=&quot;your-secret&quot;
                        </div>
                        <div className="p-3 bg-[var(--background)] rounded-lg">
                            <span className="text-[var(--primary)]">NEXTAUTH_URL</span>=&quot;https://your-domain.com&quot;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
