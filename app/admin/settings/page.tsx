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
    inventoryDeduction: boolean
    address: string | null
    phone: string | null
    email: string | null
    gstin: string | null
    fssai: string | null
    logo: string | null
    gstCertificate: string | null
    fssaiCertificate: string | null
}

function FileUploader({ label, value, onChange, accept = "image/*" }: { label: string, value: string | null, onChange: (url: string) => void, accept?: string }) {
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            if (data.success) {
                onChange(data.url)
            } else {
                alert("Upload failed")
            }
        } catch (error) {
            console.error("Upload error:", error)
            alert("Upload failed")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="flex items-center gap-4">
                {value && (
                    <div className="relative group">
                        {accept.startsWith("image") ? (
                            <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-[var(--border)]" />
                        ) : (
                            <div className="w-16 h-16 flex items-center justify-center bg-[var(--card)] rounded-lg border border-[var(--border)]">
                                <span className="text-2xl">📄</span>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ×
                        </button>
                    </div>
                )}
                <label className="flex-1 cursor-pointer">
                    <div className={`border-2 border-dashed border-[var(--border)] rounded-lg p-4 text-center hover:border-[var(--primary)] transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                        <span className="text-sm text-gray-400">
                            {uploading ? "Uploading..." : value ? "Change File" : "Click to upload"}
                        </span>
                        <input type="file" className="hidden" accept={accept} onChange={handleUpload} />
                    </div>
                </label>
            </div>
            {value && !accept.startsWith("image") && (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--primary)] mt-1 inline-block hover:underline">
                    View Uploaded File
                </a>
            )}
        </div>
    )
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
        whatsappMessage: "Thank you for visiting {restaurant}! 🙏 Your bill of ₹{amount} has been paid. Visit again!",
        inventoryDeduction: true,
        address: "",
        phone: "",
        email: "",
        gstin: "",
        fssai: "",
        logo: "",
        gstCertificate: "",
        fssaiCertificate: ""
    })

    useEffect(() => {
        async function fetchSettings() {
            try {
                const result = await getSettings()
                if (result.success && result.settings) {
                    const s = result.settings as unknown as Settings
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
                        whatsappMessage: s.whatsappMessage || "Thank you for visiting {restaurant}! 🙏 Your bill of ₹{amount} has been paid. Visit again!",
                        inventoryDeduction: s.inventoryDeduction ?? true,
                        address: s.address || "",
                        phone: s.phone || "",
                        email: s.email || "",
                        gstin: s.gstin || "",
                        fssai: s.fssai || "",
                        logo: s.logo || "",
                        gstCertificate: s.gstCertificate || "",
                        fssaiCertificate: s.fssaiCertificate || ""
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
                whatsappMessage: form.whatsappMessage || undefined,
                inventoryDeduction: form.inventoryDeduction,
                address: form.address || undefined,
                phone: form.phone || undefined,
                email: form.email || undefined,
                gstin: form.gstin || undefined,
                fssai: form.fssai || undefined,
                logo: form.logo || undefined,
                gstCertificate: form.gstCertificate || undefined,
                fssaiCertificate: form.fssaiCertificate || undefined
            })

            if (result.success) {
                setMessage({ type: "success", text: "Settings saved successfully!" })
                if (result.settings) {
                    setSettings(result.settings as unknown as Settings)
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

            <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">

                    {/* Restaurant Tab */}
                    {activeTab === "restaurant" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <FileUploader
                                        label="Restaurant Logo"
                                        value={form.logo}
                                        onChange={(url) => setForm({ ...form, logo: url })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="text"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="input"
                                        placeholder="Restaurant Phone"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="input"
                                        placeholder="restaurant@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Address</label>
                                <textarea
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    className="input min-h-[80px]"
                                    placeholder="Full restaurant address"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">GSTIN</label>
                                        <input
                                            type="text"
                                            value={form.gstin}
                                            onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                                            className="input uppercase mb-2"
                                            placeholder="GST Number"
                                        />
                                    </div>
                                    <FileUploader
                                        label="GST Certificate"
                                        value={form.gstCertificate}
                                        onChange={(url) => setForm({ ...form, gstCertificate: url })}
                                        accept=".pdf,image/*"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">FSSAI License</label>
                                        <input
                                            type="text"
                                            value={form.fssai}
                                            onChange={(e) => setForm({ ...form, fssai: e.target.value })}
                                            className="input mb-2"
                                            placeholder="FSSAI Number"
                                        />
                                    </div>
                                    <FileUploader
                                        label="FSSAI License"
                                        value={form.fssaiCertificate}
                                        onChange={(url) => setForm({ ...form, fssaiCertificate: url })}
                                        accept=".pdf,image/*"
                                    />
                                </div>
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
                            </div>
                        </div>
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
