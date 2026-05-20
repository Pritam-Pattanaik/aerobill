"use client"

import { useEffect, useState } from "react"
import { getRefundPolicy } from "@/app/actions/legal"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"

export default function CancellationsRefundsPage() {
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadContent() {
            const result = await getRefundPolicy()
            if (result.success && result.policy) {
                setContent(result.policy.content)
            }
            setLoading(false)
        }
        loadContent()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <div className="text-gray-400">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Simple Header */}
            <header className="border-b border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-[#ff6b35]">Aerobill</Link>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white transition">
                        ← Back to Home
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                </div>
            </main>

            <footer className="border-t border-[var(--border)] mt-12 py-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Aerobill. All rights reserved.
            </footer>
        </div>
    )
}
