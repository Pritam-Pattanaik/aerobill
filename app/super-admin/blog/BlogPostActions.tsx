"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { deleteBlogPost, toggleBlogPostPublish } from "@/app/actions/blog"

type BlogPost = {
    id: string
    title: string
    slug: string
    isPublished: boolean
}

export default function BlogPostActions({ post }: { post: BlogPost }) {
    const router = useRouter()

    async function handleTogglePublish() {
        const result = await toggleBlogPostPublish(post.id)
        if (result.success) {
            router.refresh()
        }
    }

    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete "${post.title}"? This cannot be undone.`)) {
            return
        }

        const result = await deleteBlogPost(post.id)
        if (result.success) {
            router.refresh()
        }
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={handleTogglePublish}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${post.isPublished
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
            >
                {post.isPublished ? 'Unpublish' : 'Publish'}
            </button>
            <Link
                href={`/super-admin/blog/${post.id}/edit`}
                className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition"
            >
                Edit
            </Link>
            <button
                onClick={handleDelete}
                className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition"
            >
                Delete
            </button>
        </div>
    )
}
