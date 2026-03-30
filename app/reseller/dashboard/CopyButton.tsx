"use client"

import { useState } from "react"

export function CopyButton({ textToCopy }: { textToCopy: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy text:", err)
        }
    }

    return (
        <button 
            onClick={handleCopy}
            className="bg-[#1a1a2e] border border-white/10 hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/10 text-white px-6 py-3 rounded-lg font-medium transition-all"
        >
            {copied ? "Copied! ✓" : "Copy Link"}
        </button>
    )
}
