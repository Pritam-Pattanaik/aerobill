"use client"

/**
 * Beautiful branded loading animation component
 * Used across admin and super-admin pages
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
            {/* Animated Logo/Icon */}
            <div className="relative mb-8">
                {/* Outer ring - rotating */}
                <div className={`absolute inset-0 w-20 h-20 rounded-full border-4 border-t-transparent animate-spin ${isSuperAdmin
                        ? "border-purple-500/30 border-t-purple-500"
                        : "border-[var(--primary)]/30 border-t-[var(--primary)]"
                    }`} style={{ animationDuration: "1s" }} />

                {/* Inner ring - counter-rotating */}
                <div className={`absolute inset-2 w-16 h-16 rounded-full border-4 border-b-transparent animate-spin ${isSuperAdmin
                        ? "border-indigo-500/30 border-b-indigo-400"
                        : "border-[var(--warning)]/30 border-b-[var(--warning)]"
                    }`} style={{ animationDuration: "0.8s", animationDirection: "reverse" }} />

                {/* Center dot - pulsing */}
                <div className={`absolute inset-5 w-10 h-10 rounded-full animate-pulse flex items-center justify-center ${isSuperAdmin
                        ? "bg-gradient-to-br from-purple-600 to-indigo-600"
                        : "bg-gradient-to-br from-[var(--primary)] to-[var(--warning)]"
                    }`}>
                    <span className="text-white text-2xl">🍽️</span>
                </div>

                {/* Spacer for layout */}
                <div className="w-20 h-20" />
            </div>

            {/* Brand name with fade animation */}
            <h2 className={`text-2xl font-bold mb-2 animate-pulse ${isSuperAdmin
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
                        className={`w-2 h-2 rounded-full animate-bounce ${isSuperAdmin ? "bg-purple-500" : "bg-[var(--primary)]"
                            }`}
                        style={{
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: "0.6s"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
