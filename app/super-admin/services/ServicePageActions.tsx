"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { deleteServicePage, toggleServicePageStatus } from "@/app/actions/service-pages"

export default function ServicePageActions({ page }: { page: any }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const [isToggling, setIsToggling] = useState(false)

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${page.name}"?`)) return
        
        setIsDeleting(true)
        const result = await deleteServicePage(page.id)
        
        if (result.success) {
            router.refresh()
        } else {
            alert(result.error || "Failed to delete page")
            setIsDeleting(false)
        }
    }

    const handleToggle = async () => {
        setIsToggling(true)
        const result = await toggleServicePageStatus(page.id, page.isActive)
        
        if (result.success) {
            router.refresh()
        } else {
            alert(result.error || "Failed to toggle status")
        }
        setIsToggling(false)
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <Link
                href={`/services/${page.slug}`}
                target="_blank"
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="View Page"
            >
                👁️
            </Link>
            <button
                onClick={handleToggle}
                disabled={isToggling}
                className={`p-2 rounded-lg transition ${
                    page.isActive
                        ? "text-yellow-400 hover:bg-yellow-400/10"
                        : "text-green-400 hover:bg-green-400/10"
                }`}
                title={page.isActive ? "Hide Page" : "Publish Page"}
            >
                {page.isActive ? "⏸️" : "▶️"}
            </button>
            <Link
                href={`/super-admin/services/${page.id}`}
                className="p-2 text-teal-400 hover:bg-teal-400/10 rounded-lg transition"
                title="Edit Page"
            >
                ✏️
            </Link>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                title="Delete Page"
            >
                {isDeleting ? "..." : "🗑️"}
            </button>
        </div>
    )
}
