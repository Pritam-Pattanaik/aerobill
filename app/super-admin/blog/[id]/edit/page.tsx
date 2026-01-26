"use client"

import { useState, useEffect, use, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getBlogPostById, updateBlogPost } from "@/app/actions/blog"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const router = useRouter()
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [imageUploading, setImageUploading] = useState(false)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

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

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || !e.target.files[0]) return

        setImageUploading(true)
        setError("")
        const file = e.target.files[0]
        const data = new FormData()
        data.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            })

            if (!res.ok) throw new Error("Upload failed")

            const json = await res.json()
            if (json.success) {
                setFormData({ ...formData, coverImage: json.url })
            } else {
                setError(json.error || "Upload failed")
            }
        } catch (err) {
            setError("Failed to upload image")
        } finally {
            setImageUploading(false)
        }
    }

    function handleFormat(type: string) {
        if (!contentRef.current) return
        const start = contentRef.current.selectionStart
        const end = contentRef.current.selectionEnd
        const text = formData.content
        const scrollTop = contentRef.current.scrollTop
        let replacement = ""
        let cursorOffset = 0

        switch (type) {
            case "h2": replacement = `## ${text.substring(start, end)}`; cursorOffset = 3; break;
            case "h3": replacement = `### ${text.substring(start, end)}`; cursorOffset = 4; break;
            case "bold": replacement = `**${text.substring(start, end)}**`; cursorOffset = 2; break;
            case "italic": replacement = `*${text.substring(start, end)}*`; cursorOffset = 1; break;
            case "list": replacement = `- ${text.substring(start, end)}`; cursorOffset = 2; break;
            case "link": replacement = `[${text.substring(start, end)}](url)`; cursorOffset = 1; break;
        }

        const newContent = text.substring(0, start) + replacement + text.substring(end)
        setFormData({ ...formData, content: newContent })

        // Focus back and restore scroll position
        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.focus()
                contentRef.current.setSelectionRange(start + cursorOffset, start + cursorOffset + (end - start))
                contentRef.current.scrollTop = scrollTop
            }
        }, 0)
    }

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
        <div className="p-8 max-w-5xl">
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
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-300">
                                Content <span className="text-red-400">*</span>
                            </label>
                            <div className="flex bg-slate-800/50 p-1 rounded-lg border border-purple-500/20">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("write")}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition ${activeTab === "write" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
                                >
                                    Write
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("preview")}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition ${activeTab === "preview" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>

                        {activeTab === "write" ? (
                            <div className="space-y-2">
                                {/* Markdown Helpers */}
                                <div className="flex flex-wrap gap-2 p-2 bg-slate-800/30 rounded-t-xl border border-purple-500/20 border-b-0">
                                    <button type="button" onClick={() => handleFormat("h2")} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white">H2</button>
                                    <button type="button" onClick={() => handleFormat("h3")} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white">H3</button>
                                    <button type="button" onClick={() => handleFormat("bold")} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs font-bold text-white">B</button>
                                    <button type="button" onClick={() => handleFormat("italic")} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs italic text-white">I</button>
                                    <button type="button" onClick={() => handleFormat("list")} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white">List</button>
                                    <button type="button" onClick={() => handleFormat("link")} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white">Link</button>
                                </div>
                                <textarea
                                    ref={contentRef}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    required
                                    rows={15}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-b-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none font-mono text-sm"
                                    placeholder="Write your blog post content here. Use double Enter for new paragraphs. Markdown is supported."
                                />
                                <p className="text-[10px] text-gray-500 italic mt-1">
                                    Tip: Use double Enter/Return to start a new paragraph.
                                </p>
                            </div>
                        ) : (
                            <div className="w-full h-[400px] overflow-y-auto px-6 py-4 bg-slate-800/50 border border-purple-500/20 rounded-xl prose prose-invert prose-sm max-w-none">
                                {formData.content ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                        {formData.content}
                                    </ReactMarkdown>
                                ) : (
                                    <p className="text-gray-500 italic">Nothing to preview yet...</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Cover Image
                            </label>
                            {formData.coverImage ? (
                                <div className="relative h-40 rounded-xl overflow-hidden group border border-purple-500/20">
                                    <Image
                                        src={formData.coverImage}
                                        alt="Cover"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, coverImage: "" })}
                                        className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="border border-dashed border-gray-600 rounded-xl h-40 flex flex-col items-center justify-center p-4 hover:border-purple-500/50 transition bg-slate-800/50">
                                    {imageUploading ? (
                                        <div className="text-purple-400 animate-pulse">Uploading...</div>
                                    ) : (
                                        <label className="cursor-pointer text-center">
                                            <span className="block text-sm text-gray-400 mb-2">Click to upload image</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <div className="px-4 py-2 bg-slate-700/50 rounded-lg text-xs text-gray-300 hover:bg-slate-700 transition inline-block">
                                                Choose File
                                            </div>
                                        </label>
                                    )}
                                </div>
                            )}
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
