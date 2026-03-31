"use client"

import { useState } from "react"
import { upsertPageSEO, deletePageSEO } from "@/app/actions/seo"

type PageSEO = {
    id: string
    route: string
    title: string
    description: string | null
    keywords: string | null
    createdAt: Date
    updatedAt: Date
}

export default function SEOManager({ initialData }: { initialData: PageSEO[] }) {
    const [seoList, setSeoList] = useState<PageSEO[]>(initialData)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // Form state
    const [id, setId] = useState("")
    const [route, setRoute] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [keywords, setKeywords] = useState("")

    const openModal = (seo?: PageSEO) => {
        if (seo) {
            setId(seo.id)
            setRoute(seo.route)
            setTitle(seo.title)
            setDescription(seo.description || "")
            setKeywords(seo.keywords || "")
        } else {
            setId("")
            setRoute("/")
            setTitle("")
            setDescription("")
            setKeywords("")
        }
        setIsModalOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        const res = await upsertPageSEO({
            route,
            title,
            description,
            keywords
        })

        if (res.success && res.data) {
            alert("SEO data saved successfully!")
            
            // update local state
            const exists = seoList.find(s => s.id === (res.data as PageSEO).id)
            if (exists) {
                setSeoList(seoList.map(s => s.id === (res.data as PageSEO).id ? (res.data as PageSEO) : s))
            } else {
                setSeoList([...seoList, (res.data as PageSEO)])
            }
            
            setIsModalOpen(false)
        } else {
            alert(res.error || "Failed to save")
        }

        setIsSaving(false)
    }

    const handleDelete = async (deleteId: string) => {
        if (!confirm("Are you sure you want to delete this SEO metadata? The page will fall back to its default.")) return

        const res = await deletePageSEO(deleteId)
        if (res.success) {
            setSeoList(seoList.filter(s => s.id !== deleteId))
            alert("Deleted successfully")
        } else {
            alert(res.error || "Failed to delete")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                    <span>+ Add Route SEO</span>
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-purple-500/20 bg-slate-800/50">
                <table className="w-full text-left text-sm text-gray-300">
                    <thead className="text-xs uppercase bg-slate-900/80 text-gray-400 border-b border-purple-500/20">
                        <tr>
                            <th className="px-4 py-4 font-semibold">Route</th>
                            <th className="px-4 py-4 font-semibold">Title</th>
                            <th className="px-4 py-4 font-semibold">Description</th>
                            <th className="px-4 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-500/10">
                        {seoList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                    No custom SEO data found. Add one above.
                                </td>
                            </tr>
                        ) : (
                            seoList.map(item => (
                                <tr key={item.id} className="hover:bg-purple-500/5 transition-colors">
                                    <td className="px-4 py-4">
                                        <div className="font-mono text-purple-400">{item.route}</div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="font-medium text-white max-w-[200px] truncate" title={item.title}>{item.title}</div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-gray-400 max-w-[300px] truncate" title={item.description || ""}>
                                            {item.description || <span className="text-gray-600 italic">None</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => openModal(item)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-purple-500/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-purple-500/20 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">
                                {id ? "Edit SEO Metadata" : "Add SEO Metadata"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Route Path</label>
                                <input
                                    type="text"
                                    required
                                    value={route}
                                    onChange={e => setRoute(e.target.value)}
                                    placeholder="e.g. / or /about or /pricing"
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors font-mono"
                                />
                                <p className="text-xs text-gray-500 mt-1">Must start with a forward slash (/). Use / for the homepage.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="e.g. Best Restaurant POS System | Aerobill"
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Meta Description</label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    rows={3}
                                    placeholder="A brief summary of the page for search engines..."
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Keywords</label>
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={e => setKeywords(e.target.value)}
                                    placeholder="restaurant pos, billing software, qr menu (comma separated)"
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-purple-500/20 mt-6 relative z-10">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? "Saving..." : "Save SEO Metadata"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
