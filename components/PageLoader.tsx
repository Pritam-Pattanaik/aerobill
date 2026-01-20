"use client"

import Image from "next/image"

/**
 * Beautiful branded loading animation component
 * Uses the Aerobill logo with smooth animations
 */

interface PageLoaderProps {
    variant?: "admin" | "super-admin"
    message?: string
}

export default function PageLoader({ variant = "admin", message = "Loading..." }: PageLoaderProps) {
    const isSuperAdmin = variant === "super-admin"

    return (
        <div className={`min-h-[60vh] flex flex-col items-center justify-center ${isSuperAdmin ? "bg-transparent" : ""
            }`}>
            {/* Animated Logo Container */}
            <div className="relative mb-8">
                {/* Outer ring - rotating */}
                <div className={`absolute inset-0 w-24 h-24 rounded-full border-4 border-t-transparent ${isSuperAdmin
                    ? "border-purple-500/30 border-t-purple-500"
                    : "border-[var(--primary)]/30 border-t-[var(--primary)]"
                    }`} style={{ animation: "spin 1.5s linear infinite" }} />

                {/* Inner ring - counter-rotating */}
                <div className={`absolute inset-2 w-20 h-20 rounded-full border-4 border-b-transparent ${isSuperAdmin
                    ? "border-indigo-500/30 border-b-indigo-400"
                    : "border-[var(--warning)]/30 border-b-[var(--warning)]"
                    }`} style={{ animation: "spin 1s linear infinite reverse" }} />

                {/* Logo in center */}
                <div className="absolute inset-4 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden animate-scalePulse">
                    <Image
                        src="/loading-logo.png"
                        alt="Aerobill"
                        width={56}
                        height={56}
                        className="object-contain animate-float"
                        priority
                    />
                </div>

                {/* Spacer for layout */}
                <div className="w-24 h-24" />
            </div>

            {/* Brand name with gradient */}
            <h2 className={`text-2xl font-bold mb-2 ${isSuperAdmin
                ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-[var(--primary)] to-[var(--warning)] bg-clip-text text-transparent"
                }`}>
                Aerobill
            </h2>

            {/* Loading message */}
            <p className="text-gray-400 text-sm animate-pulse">
                {message}
            </p>

            {/* Animated dots */}
            <div className="flex gap-1.5 mt-4">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${isSuperAdmin ? "bg-purple-500" : "bg-[var(--primary)]"
                            }`}
                        style={{
                            animation: `bounce 0.6s ease-in-out infinite`,
                            animationDelay: `${i * 0.15}s`
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

