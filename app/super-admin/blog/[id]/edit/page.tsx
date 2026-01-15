"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getBlogPostById, updateBlogPost } from "@/app/actions/blog"

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        author: "",
        metaTitle: "",
        metaDesc: "",
        keywords: "",
        isPublished: false,
    })

    useEffect(() => {
        async function fetchPost() {
            const result = await getBlogPostById(resolvedParams.id)
            if (result.success && result.data) {
                setFormData({
                    title: result.data.title,
                    slug: result.data.slug,
                    excerpt: result.data.excerpt,
                    content: result.data.content,
                    coverImage: result.data.coverImage || "",
                    author: result.data.author,
                    metaTitle: result.data.metaTitle || "",
                    metaDesc: result.data.metaDesc || "",
                    keywords: result.data.keywords || "",
                    isPublished: result.data.isPublished,
                })
            } else {
                setError("Failed to load blog post")
            }
            setFetching(false)
        }
        fetchPost()
    }, [resolvedParams.id])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const result = await updateBlogPost(resolvedParams.id, {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                coverImage: formData.coverImage || undefined,
                author: formData.author,
                metaTitle: formData.metaTitle || undefined,
                metaDesc: formData.metaDesc || undefined,
                keywords: formData.keywords || undefined,
                isPublished: formData.isPublished,
            })

            if (result.success) {
                router.push("/super-admin/blog")
            } else {
                setError(result.error || "Failed to update blog post")
            }
        } catch {
            setError("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/super-admin/blog"
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition"
                >
                    ←
                </Link>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Edit Blog Post
                    </h1>
                    <p className="text-gray-400 mt-1">Update your blog post content and SEO settings</p>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                            placeholder="Enter blog post title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Slug <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">/blog/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                required
                                className="flex-1 px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                                placeholder="url-friendly-slug"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Excerpt <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            required
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                            placeholder="Short description for blog listings (150-200 characters)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Content <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                            rows={15}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none font-mono text-sm"
                            placeholder="Write your blog post content here. HTML is supported."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Cover Image URL
                            </label>
                            <input
                                type="url"
                                value={formData.coverImage}
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Author
                            </label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                                placeholder="Aerobill Team"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-white mb-4">🔍 SEO Settings</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            value={formData.metaTitle}
                            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                            placeholder="Custom SEO title (leave blank to use post title)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Meta Description
                        </label>
                        <textarea
                            value={formData.metaDesc}
                            onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                            placeholder="SEO meta description (150-160 characters)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Keywords
                        </label>
                        <input
                            type="text"
                            value={formData.keywords}
                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                            placeholder="restaurant management, QR ordering, billing software"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                            className="w-5 h-5 rounded border-purple-500/30 bg-slate-800/50 text-purple-600 focus:ring-purple-500/50"
                        />
                        <span className="text-gray-300">Published</span>
                    </label>

                    <div className="flex gap-3">
                        <Link
                            href="/super-admin/blog"
                            className="px-6 py-3 border border-purple-500/30 text-gray-300 rounded-xl font-medium hover:bg-purple-500/10 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
