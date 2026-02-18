"use client"

import { useState, useEffect } from "react"
import { getConnectedAccounts, disconnectAccount, publishPost, getPostHistory } from "@/app/actions/social-media"

type SocialAccount = {
    id: string
    platform: "FACEBOOK" | "INSTAGRAM"
    accountId: string
    accountName: string
    profileImage: string | null
    isActive: boolean
    tokenExpiry: string | null
    createdAt: string
}

type SocialPost = {
    id: string
    content: string
    imageUrl: string | null
    platforms: string
    status: "DRAFT" | "PUBLISHING" | "PUBLISHED" | "FAILED"
    publishedAt: string | null
    error: string | null
    createdAt: string
}

export default function SocialMediaPage() {
    const [accounts, setAccounts] = useState<SocialAccount[]>([])
    const [posts, setPosts] = useState<SocialPost[]>([])
    const [loading, setLoading] = useState(true)
    const [publishing, setPublishing] = useState(false)
    const [disconnecting, setDisconnecting] = useState<string | null>(null)
    const [message, setMessage] = useState<{ type: "success" | "error" | "warning"; text: string } | null>(null)
    const [activeTab, setActiveTab] = useState<"accounts" | "compose" | "history">("accounts")

    // Post composer state
    const [postContent, setPostContent] = useState("")
    const [postImage, setPostImage] = useState("")
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchData()
        // Check URL params for connection result
        const params = new URLSearchParams(window.location.search)
        if (params.get("success") === "connected") {
            setMessage({ type: "success", text: "🎉 Social media accounts connected successfully!" })
            window.history.replaceState({}, "", "/admin/social-media")
        } else if (params.get("error")) {
            const errorMap: Record<string, string> = {
                denied: "You denied permission. Please try again and grant all permissions.",
                invalid: "Invalid callback parameters. Please try again.",
                invalid_state: "Security validation failed. Please try again.",
                no_pages: "No Facebook Pages found. You need a Facebook Page to connect.",
                restaurant_not_found: "Restaurant not found. Please log in again.",
                connection_failed: "Connection failed. Please try again.",
            }
            const err = params.get("error") || "unknown"
            setMessage({ type: "error", text: errorMap[err] || "Connection failed. Please try again." })
            window.history.replaceState({}, "", "/admin/social-media")
        }
    }, [])

    async function fetchData() {
        setLoading(true)
        try {
            const [accountsRes, postsRes] = await Promise.all([
                getConnectedAccounts(),
                getPostHistory(),
            ])
            if (accountsRes.success) setAccounts(accountsRes.accounts as unknown as SocialAccount[])
            if (postsRes.success) setPosts(postsRes.posts as unknown as SocialPost[])
        } catch (error) {
            console.error("Failed to fetch data:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDisconnect(accountId: string) {
        if (!confirm("Are you sure you want to disconnect this account?")) return
        setDisconnecting(accountId)
        try {
            const res = await disconnectAccount(accountId)
            if (res.success) {
                setAccounts(prev => prev.filter(a => a.id !== accountId))
                setMessage({ type: "success", text: "Account disconnected successfully" })
            } else {
                setMessage({ type: "error", text: res.error || "Failed to disconnect" })
            }
        } finally {
            setDisconnecting(null)
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await fetch("/api/upload", { method: "POST", body: formData })
            const data = await res.json()
            if (data.success) {
                setPostImage(data.url)
            } else {
                setMessage({ type: "error", text: "Image upload failed" })
            }
        } catch {
            setMessage({ type: "error", text: "Image upload failed" })
        } finally {
            setUploading(false)
        }
    }

    async function handlePublish() {
        if (!postContent.trim()) {
            setMessage({ type: "error", text: "Please enter post content" })
            return
        }
        if (selectedPlatforms.length === 0) {
            setMessage({ type: "error", text: "Please select at least one platform" })
            return
        }
        if (selectedPlatforms.includes("INSTAGRAM") && !postImage) {
            setMessage({ type: "error", text: "Instagram posts require an image. Please upload an image." })
            return
        }

        setPublishing(true)
        setMessage(null)
        try {
            const res = await publishPost({
                content: postContent,
                imageUrl: postImage || undefined,
                platforms: selectedPlatforms,
            })

            if (res.success) {
                if (res.partial) {
                    setMessage({ type: "warning", text: res.message || "Published with some issues" })
                } else {
                    setMessage({ type: "success", text: "🎉 Post published successfully to all platforms!" })
                }
                setPostContent("")
                setPostImage("")
                setSelectedPlatforms([])
                fetchData()
            } else {
                setMessage({ type: "error", text: res.error || "Failed to publish" })
            }
        } catch {
            setMessage({ type: "error", text: "Failed to publish post" })
        } finally {
            setPublishing(false)
        }
    }

    const facebookAccount = accounts.find(a => a.platform === "FACEBOOK")
    const instagramAccount = accounts.find(a => a.platform === "INSTAGRAM")

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading social media...</div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">📱 Social Media</h1>
                <p className="text-gray-400">Connect and manage your social media from one place</p>
            </div>

            {/* Message */}
            {message && (
                <div className={`mb-6 p-4 rounded-xl border ${message.type === "success"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : message.type === "warning"
                            ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}>
                    <div className="flex items-center justify-between">
                        <span>{message.text}</span>
                        <button onClick={() => setMessage(null)} className="text-lg opacity-60 hover:opacity-100">×</button>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {[
                    { id: "accounts" as const, label: "Accounts", icon: "🔗" },
                    { id: "compose" as const, label: "Create Post", icon: "✍️" },
                    { id: "history" as const, label: "Post History", icon: "📋" },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25"
                                : "bg-[var(--card)] text-gray-400 hover:text-white hover:bg-[var(--card-hover)]"
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* ====================== ACCOUNTS TAB ====================== */}
            {activeTab === "accounts" && (
                <div className="space-y-6">
                    {/* Connect Button */}
                    {(!facebookAccount || !instagramAccount) && (
                        <div className="glass-card p-6">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold mb-1">Connect Your Accounts</h2>
                                    <p className="text-sm text-gray-400">
                                        Link your Facebook Page & Instagram Business account to start posting
                                    </p>
                                </div>
                                <a
                                    href="/api/social-media/connect"
                                    className="btn-primary flex items-center gap-2 whitespace-nowrap"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Connect with Facebook
                                </a>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">
                                ℹ️ This will connect both your Facebook Page and linked Instagram Business account automatically
                            </p>
                        </div>
                    )}

                    {/* Connected Accounts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Facebook Card */}
                        <div className={`glass-card p-6 rounded-2xl border-2 transition-all ${facebookAccount
                                ? "border-blue-500/30 bg-blue-500/5"
                                : "border-[var(--border)] opacity-60"
                            }`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Facebook</h3>
                                        <p className="text-xs text-gray-400">Page</p>
                                    </div>
                                </div>
                                {facebookAccount && (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                        ● Connected
                                    </span>
                                )}
                            </div>

                            {facebookAccount ? (
                                <div>
                                    <div className="flex items-center gap-3 mb-4 p-3 bg-[var(--background)] rounded-xl">
                                        {facebookAccount.profileImage ? (
                                            <img src={facebookAccount.profileImage} alt="" className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">📄</div>
                                        )}
                                        <div>
                                            <p className="font-medium">{facebookAccount.accountName}</p>
                                            <p className="text-xs text-gray-500">
                                                Token expires: {facebookAccount.tokenExpiry
                                                    ? new Date(facebookAccount.tokenExpiry).toLocaleDateString()
                                                    : "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDisconnect(facebookAccount.id)}
                                        disabled={disconnecting === facebookAccount.id}
                                        className="w-full py-2 rounded-xl text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all disabled:opacity-50"
                                    >
                                        {disconnecting === facebookAccount.id ? "Disconnecting..." : "Disconnect"}
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-500">Not connected</p>
                                    <p className="text-xs text-gray-600 mt-1">Click &quot;Connect with Facebook&quot; above</p>
                                </div>
                            )}
                        </div>

                        {/* Instagram Card */}
                        <div className={`glass-card p-6 rounded-2xl border-2 transition-all ${instagramAccount
                                ? "border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-purple-500/5"
                                : "border-[var(--border)] opacity-60"
                            }`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-pink-600/30">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Instagram</h3>
                                        <p className="text-xs text-gray-400">Business Account</p>
                                    </div>
                                </div>
                                {instagramAccount && (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                        ● Connected
                                    </span>
                                )}
                            </div>

                            {instagramAccount ? (
                                <div>
                                    <div className="flex items-center gap-3 mb-4 p-3 bg-[var(--background)] rounded-xl">
                                        {instagramAccount.profileImage ? (
                                            <img src={instagramAccount.profileImage} alt="" className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">📷</div>
                                        )}
                                        <div>
                                            <p className="font-medium">@{instagramAccount.accountName}</p>
                                            <p className="text-xs text-gray-500">
                                                Token expires: {instagramAccount.tokenExpiry
                                                    ? new Date(instagramAccount.tokenExpiry).toLocaleDateString()
                                                    : "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDisconnect(instagramAccount.id)}
                                        disabled={disconnecting === instagramAccount.id}
                                        className="w-full py-2 rounded-xl text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all disabled:opacity-50"
                                    >
                                        {disconnecting === instagramAccount.id ? "Disconnecting..." : "Disconnect"}
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-500">Not connected</p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {facebookAccount
                                            ? "No Instagram Business account linked to your Page"
                                            : "Connect Facebook first (Instagram links automatically)"
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="glass-card p-5 rounded-xl border border-blue-500/20 bg-blue-500/5">
                        <h3 className="font-medium text-blue-400 mb-2">💡 How it works</h3>
                        <ul className="text-sm text-gray-400 space-y-1.5">
                            <li>• Click &quot;Connect with Facebook&quot; to authorize Aerobill</li>
                            <li>• Your Facebook Page and linked Instagram will be connected automatically</li>
                            <li>• Go to &quot;Create Post&quot; tab to publish to both platforms at once</li>
                            <li>• Instagram requires a Business or Creator account linked to a Facebook Page</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* ====================== COMPOSE TAB ====================== */}
            {activeTab === "compose" && (
                <div className="max-w-2xl space-y-6">
                    {accounts.length === 0 ? (
                        <div className="glass-card p-8 text-center">
                            <p className="text-6xl mb-4">🔗</p>
                            <h3 className="text-xl font-semibold mb-2">No Accounts Connected</h3>
                            <p className="text-gray-400 mb-4">Connect your social media accounts first to start posting</p>
                            <button onClick={() => setActiveTab("accounts")} className="btn-primary">
                                Go to Accounts
                            </button>
                        </div>
                    ) : (
                        <div className="glass-card p-6 md:p-8 space-y-6">
                            <h2 className="text-xl font-semibold">Create New Post</h2>

                            {/* Platform Selector */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Select Platforms</label>
                                <div className="flex flex-wrap gap-3">
                                    {facebookAccount && (
                                        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all border-2 ${selectedPlatforms.includes("FACEBOOK")
                                                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                                                : "border-[var(--border)] text-gray-400 hover:border-blue-500/50"
                                            }`}>
                                            <input
                                                type="checkbox"
                                                checked={selectedPlatforms.includes("FACEBOOK")}
                                                onChange={(e) => {
                                                    setSelectedPlatforms(prev =>
                                                        e.target.checked
                                                            ? [...prev, "FACEBOOK"]
                                                            : prev.filter(p => p !== "FACEBOOK")
                                                    )
                                                }}
                                                className="sr-only"
                                            />
                                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                            <span className="font-medium">Facebook</span>
                                            {selectedPlatforms.includes("FACEBOOK") && (
                                                <span className="text-xs">✓</span>
                                            )}
                                        </label>
                                    )}
                                    {instagramAccount && (
                                        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all border-2 ${selectedPlatforms.includes("INSTAGRAM")
                                                ? "border-pink-500 bg-pink-500/10 text-pink-400"
                                                : "border-[var(--border)] text-gray-400 hover:border-pink-500/50"
                                            }`}>
                                            <input
                                                type="checkbox"
                                                checked={selectedPlatforms.includes("INSTAGRAM")}
                                                onChange={(e) => {
                                                    setSelectedPlatforms(prev =>
                                                        e.target.checked
                                                            ? [...prev, "INSTAGRAM"]
                                                            : prev.filter(p => p !== "INSTAGRAM")
                                                    )
                                                }}
                                                className="sr-only"
                                            />
                                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                            </svg>
                                            <span className="font-medium">Instagram</span>
                                            {selectedPlatforms.includes("INSTAGRAM") && (
                                                <span className="text-xs">✓</span>
                                            )}
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Post Content */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Post Content</label>
                                <textarea
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    className="input min-h-[150px] resize-y"
                                    placeholder="Write your post content here... Use hashtags, emojis, and mentions to boost engagement! 🚀"
                                    maxLength={2200}
                                />
                                <div className="flex justify-between mt-1">
                                    <p className="text-xs text-gray-500">
                                        {selectedPlatforms.includes("INSTAGRAM") && "Instagram limit: 2,200 characters"}
                                    </p>
                                    <p className={`text-xs ${postContent.length > 2000 ? "text-yellow-400" : "text-gray-500"}`}>
                                        {postContent.length}/2,200
                                    </p>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Image {selectedPlatforms.includes("INSTAGRAM") && <span className="text-red-400">*</span>}
                                    {selectedPlatforms.includes("INSTAGRAM") && (
                                        <span className="text-xs text-gray-500 font-normal ml-1">(Required for Instagram)</span>
                                    )}
                                </label>
                                {postImage ? (
                                    <div className="relative inline-block">
                                        <img src={postImage} alt="Post preview" className="max-w-full max-h-64 rounded-xl border border-[var(--border)]" />
                                        <button
                                            onClick={() => setPostImage("")}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer block">
                                        <div className={`border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--primary)] transition-colors ${uploading ? 'opacity-50' : ''}`}>
                                            <p className="text-3xl mb-2">🖼️</p>
                                            <p className="text-sm text-gray-400">
                                                {uploading ? "Uploading..." : "Click to upload an image"}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">JPG, PNG (recommended: 1080×1080 for Instagram)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Preview */}
                            {postContent && (
                                <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--background)]">
                                    <h3 className="text-sm font-medium text-gray-400 mb-3">📝 Preview</h3>
                                    {postImage && (
                                        <img src={postImage} alt="Preview" className="w-full max-h-48 object-cover rounded-lg mb-3" />
                                    )}
                                    <p className="text-sm whitespace-pre-wrap">{postContent}</p>
                                </div>
                            )}

                            {/* Publish Button */}
                            <button
                                onClick={handlePublish}
                                disabled={publishing || !postContent.trim() || selectedPlatforms.length === 0}
                                className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {publishing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin">⏳</span> Publishing...
                                    </span>
                                ) : (
                                    `🚀 Publish to ${selectedPlatforms.length} Platform${selectedPlatforms.length !== 1 ? 's' : ''}`
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ====================== HISTORY TAB ====================== */}
            {activeTab === "history" && (
                <div className="space-y-4">
                    {posts.length === 0 ? (
                        <div className="glass-card p-8 text-center">
                            <p className="text-6xl mb-4">📭</p>
                            <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
                            <p className="text-gray-400 mb-4">Start creating posts to see your history here</p>
                            <button onClick={() => setActiveTab("compose")} className="btn-primary">
                                Create First Post
                            </button>
                        </div>
                    ) : (
                        posts.map(post => (
                            <div key={post.id} className="glass-card p-5 rounded-xl">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {/* Platform Icons */}
                                        {post.platforms.split(",").map(p => (
                                            <span
                                                key={p}
                                                className={`px-2 py-1 rounded-lg text-xs font-medium ${p.trim() === "FACEBOOK"
                                                        ? "bg-blue-500/20 text-blue-400"
                                                        : "bg-pink-500/20 text-pink-400"
                                                    }`}
                                            >
                                                {p.trim() === "FACEBOOK" ? "📘 Facebook" : "📸 Instagram"}
                                            </span>
                                        ))}
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${post.status === "PUBLISHED"
                                            ? "bg-green-500/20 text-green-400"
                                            : post.status === "FAILED"
                                                ? "bg-red-500/20 text-red-400"
                                                : post.status === "PUBLISHING"
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : "bg-gray-500/20 text-gray-400"
                                        }`}>
                                        {post.status === "PUBLISHED" && "✓ "}
                                        {post.status === "FAILED" && "✕ "}
                                        {post.status === "PUBLISHING" && "⏳ "}
                                        {post.status}
                                    </span>
                                </div>

                                {post.imageUrl && (
                                    <img src={post.imageUrl} alt="" className="w-full max-h-40 object-cover rounded-lg mb-3" />
                                )}

                                <p className="text-sm whitespace-pre-wrap mb-3 line-clamp-3">{post.content}</p>

                                {post.error && (
                                    <div className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg mb-2">
                                        ⚠️ {post.error}
                                    </div>
                                )}

                                <div className="text-xs text-gray-500">
                                    {post.publishedAt
                                        ? `Published: ${new Date(post.publishedAt).toLocaleString()}`
                                        : `Created: ${new Date(post.createdAt).toLocaleString()}`
                                    }
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
