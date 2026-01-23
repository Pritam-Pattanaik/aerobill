"use client"

import { useState, useEffect } from "react"
import { getSettings, updateSettings } from "@/app/actions/tables"

type Settings = {
    id: string
    cafeName: string
    feedbackLink: string | null
    taxRate: number
    cgst: number
    sgst: number
    whatsappEnabled: boolean
    whatsappInstance: string | null
    whatsappToken: string | null
    whatsappMessage: string
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const [activeTab, setActiveTab] = useState<"restaurant" | "tax" | "whatsapp">("restaurant")

    const [form, setForm] = useState({
        cafeName: "",
        feedbackLink: "",
        taxRate: "0",
        cgst: "0",
        sgst: "0",
        whatsappEnabled: false,
        whatsappInstance: "",
        whatsappToken: "",
        whatsappMessage: "Thank you for visiting {restaurant}! 🙏 Your bill of ₹{amount} has been paid. Visit again!"
    })

    useEffect(() => {
        async function fetchSettings() {
            try {
                const result = await getSettings()
                if (result.success && result.settings) {
                    const s = result.settings as Settings
                    setSettings(s)
                    setForm({
                        cafeName: s.cafeName,
                        feedbackLink: s.feedbackLink || "",
                        taxRate: s.taxRate.toString(),
                        cgst: (s.cgst || 0).toString(),
                        sgst: (s.sgst || 0).toString(),
                        whatsappEnabled: s.whatsappEnabled || false,
                        whatsappInstance: s.whatsappInstance || "",
                        whatsappToken: s.whatsappToken || "",
                        whatsappMessage: s.whatsappMessage || "Thank you for visiting {restaurant}! 🙏 Your bill of ₹{amount} has been paid. Visit again!"
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
                cgst: parseFloat(form.cgst) || 0,
                sgst: parseFloat(form.sgst) || 0,
                whatsappEnabled: form.whatsappEnabled,
                whatsappInstance: form.whatsappInstance || undefined,
                whatsappToken: form.whatsappToken || undefined,
                whatsappMessage: form.whatsappMessage || undefined
            })

            if (result.success) {
                setMessage({ type: "success", text: "Settings saved successfully!" })
                if (result.settings) {
                    setSettings(result.settings as Settings)
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

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {[
                    { id: "restaurant" as const, label: "Restaurant", icon: "🏪" },
                    { id: "tax" as const, label: "Tax Settings", icon: "💰" },
                    { id: "whatsapp" as const, label: "WhatsApp", icon: "📱" }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === tab.id
                                ? "bg-[var(--primary)] text-white"
                                : "bg-[var(--card)] text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">

                    {/* Restaurant Tab */}
                    {activeTab === "restaurant" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                                <input
                                    type="text"
                                    value={form.cafeName}
                                    onChange={(e) => setForm({ ...form, cafeName: e.target.value })}
                                    className="input"
                                    placeholder="Your Restaurant Name"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Appears on receipts and bills</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Feedback Link (Optional)</label>
                                <input
                                    type="url"
                                    value={form.feedbackLink}
                                    onChange={(e) => setForm({ ...form, feedbackLink: e.target.value })}
                                    className="input"
                                    placeholder="https://your-feedback-form.com"
                                />
                                <p className="text-xs text-gray-500 mt-1">Google Form or feedback page URL</p>
                            </div>
                        </>
                    )}

                    {/* Tax Tab */}
                    {activeTab === "tax" && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">CGST (%)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="50"
                                        value={form.cgst}
                                        onChange={(e) => setForm({ ...form, cgst: e.target.value })}
                                        className="input"
                                        placeholder="2.5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">SGST (%)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="50"
                                        value={form.sgst}
                                        onChange={(e) => setForm({ ...form, sgst: e.target.value })}
                                        className="input"
                                        placeholder="2.5"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Total GST: {(parseFloat(form.cgst || "0") + parseFloat(form.sgst || "0")).toFixed(2)}%</p>

                            <div>
                                <label className="block text-sm font-medium mb-2">Legacy Tax Rate (%) - Deprecated</label>
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
                                <p className="text-xs text-gray-500 mt-1">Use CGST + SGST instead</p>
                            </div>
                        </>
                    )}

                    {/* WhatsApp Tab */}
                    {activeTab === "whatsapp" && (
                        <>
                            <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-lg">
                                <div>
                                    <h3 className="font-medium">Enable WhatsApp Notifications</h3>
                                    <p className="text-sm text-gray-400">Send thank you message after billing</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.whatsappEnabled}
                                        onChange={(e) => setForm({ ...form, whatsappEnabled: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                                </label>
                            </div>

                            {form.whatsappEnabled && (
                                <>
                                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                                        <p className="text-sm text-green-400">
                                            <strong>Green API Setup:</strong> Get your Instance ID and Token from{" "}
                                            <a href="https://green-api.com" target="_blank" rel="noopener noreferrer" className="underline">
                                                green-api.com
                                            </a>
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Instance ID</label>
                                        <input
                                            type="text"
                                            value={form.whatsappInstance}
                                            onChange={(e) => setForm({ ...form, whatsappInstance: e.target.value })}
                                            className="input font-mono"
                                            placeholder="7107487998"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">API Token</label>
                                        <input
                                            type="password"
                                            value={form.whatsappToken}
                                            onChange={(e) => setForm({ ...form, whatsappToken: e.target.value })}
                                            className="input font-mono"
                                            placeholder="Your API Token"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Message Template</label>
                                        <textarea
                                            value={form.whatsappMessage}
                                            onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
                                            className="input min-h-[100px]"
                                            placeholder="Thank you for visiting!"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Use <code className="bg-[var(--background)] px-1 rounded">{"{restaurant}"}</code> for restaurant name and{" "}
                                            <code className="bg-[var(--background)] px-1 rounded">{"{amount}"}</code> for bill amount
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}

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
            </div>
        </div>
    )
}
