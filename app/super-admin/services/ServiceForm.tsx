"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createServicePage, updateServicePage } from "@/app/actions/service-pages"

export default function ServiceForm({ initialData = null }: { initialData?: any }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(initialData || {
        name: "",
        slug: "",
        title: "",
        description: "",
        heroHeading: "",
        heroSubheading: "",
        features: [{ title: "", description: "", icon: "✨" }],
        benefits: [""],
        faqs: [{ question: "", answer: "" }],
        isActive: true
    })

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFeatureChange = (index: number, field: string, value: string) => {
        const updated = [...formData.features]
        updated[index][field] = value
        setFormData({ ...formData, features: updated })
    }

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, { title: "", description: "", icon: "✨" }] })
    }

    const removeFeature = (index: number) => {
        const updated = formData.features.filter((_: any, i: number) => i !== index)
        setFormData({ ...formData, features: updated })
    }

    const handleBenefitChange = (index: number, value: string) => {
        const updated = [...formData.benefits]
        updated[index] = value
        setFormData({ ...formData, benefits: updated })
    }

    const addBenefit = () => {
        setFormData({ ...formData, benefits: [...formData.benefits, ""] })
    }

    const removeBenefit = (index: number) => {
        const updated = formData.benefits.filter((_: any, i: number) => i !== index)
        setFormData({ ...formData, benefits: updated })
    }

    const handleFaqChange = (index: number, field: string, value: string) => {
        const updated = [...formData.faqs]
        updated[index][field] = value
        setFormData({ ...formData, faqs: updated })
    }

    const addFaq = () => {
        setFormData({ ...formData, faqs: [...formData.faqs, { question: "", answer: "" }] })
    }

    const removeFaq = (index: number) => {
        const updated = formData.faqs.filter((_: any, i: number) => i !== index)
        setFormData({ ...formData, faqs: updated })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Generate slug if none provided
        let submitData = { ...formData }
        if (!submitData.slug) {
            submitData.slug = submitData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        }

        const result = initialData 
            ? await updateServicePage(initialData.id, submitData)
            : await createServicePage(submitData)

        if (result.success) {
            router.push("/super-admin/services")
            router.refresh()
        } else {
            alert(result.error)
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {/* General Info */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-teal-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">General Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">URL Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="auto-generated-if-empty"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-5 h-5 accent-teal-500"
                            />
                            <span className="text-white">Active (Visible on public site)</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* SEO & Meta */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-teal-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">SEO & Header Metadata</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Meta Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Meta Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Hero Heading</label>
                        <input
                            type="text"
                            name="heroHeading"
                            value={formData.heroHeading}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Hero Subheading</label>
                        <textarea
                            name="heroSubheading"
                            value={formData.heroSubheading}
                            onChange={handleChange}
                            required
                            rows={2}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                        />
                    </div>
                </div>
            </div>

            {/* Features Array */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-teal-500/20">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Features List</h2>
                    <button type="button" onClick={addFeature} className="text-sm px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30">
                        + Add Feature
                    </button>
                </div>
                <div className="space-y-4">
                    {formData.features.map((feature: any, index: number) => (
                        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 relative">
                            <button type="button" onClick={() => removeFeature(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">
                                ❌
                            </button>
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-2">
                                    <label className="block text-xs text-gray-400 mb-1">Icon (Emoji)</label>
                                    <input
                                        type="text"
                                        value={feature.icon}
                                        onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                                    />
                                </div>
                                <div className="col-span-10">
                                    <label className="block text-xs text-gray-400 mb-1">Feature Title</label>
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                                    />
                                </div>
                                <div className="col-span-12">
                                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                                    <textarea
                                        value={feature.description}
                                        onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                                        rows={2}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Benefits Array */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-teal-500/20">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Benefits List</h2>
                    <button type="button" onClick={addBenefit} className="text-sm px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30">
                        + Add Benefit
                    </button>
                </div>
                <div className="space-y-2">
                    {formData.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={benefit}
                                onChange={(e) => handleBenefitChange(index, e.target.value)}
                                placeholder="Benefit point..."
                                className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:border-teal-500"
                            />
                            <button type="button" onClick={() => removeBenefit(index)} className="px-3 text-red-400 hover:bg-red-400/10 rounded">
                                ❌
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQs Array */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-teal-500/20">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">FAQs</h2>
                    <button type="button" onClick={addFaq} className="text-sm px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30">
                        + Add FAQ
                    </button>
                </div>
                <div className="space-y-4">
                    {formData.faqs.map((faq: any, index: number) => (
                        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 relative">
                            <button type="button" onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">
                                ❌
                            </button>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Question</label>
                                    <input
                                        type="text"
                                        value={faq.question}
                                        onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Answer</label>
                                    <textarea
                                        value={faq.answer}
                                        onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                                        rows={2}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-800">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : initialData ? "Update Page" : "Create Page"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-gray-400 hover:text-white"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
