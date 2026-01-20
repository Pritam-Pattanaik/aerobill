"use client"

/**
 * Skeleton loading component for data-heavy pages
 * Provides smooth shimmer animation while content loads
 */

interface LoadingSkeletonProps {
    variant?: "card" | "text" | "avatar" | "table-row"
    count?: number
    className?: string
}

export function LoadingSkeleton({ variant = "card", count = 1, className = "" }: LoadingSkeletonProps) {
    const items = Array.from({ length: count }, (_, i) => i)

    if (variant === "text") {
        return (
            <div className={`space-y-2 ${className}`}>
                {items.map((i) => (
                    <div
                        key={i}
                        className="skeleton skeleton-text"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                ))}
            </div>
        )
    }

    if (variant === "avatar") {
        return (
            <div className={`flex gap-3 ${className}`}>
                {items.map((i) => (
                    <div key={i} className="skeleton skeleton-avatar" />
                ))}
            </div>
        )
    }

    if (variant === "table-row") {
        return (
            <div className={`space-y-3 ${className}`}>
                {items.map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--card)]">
                        <div className="skeleton w-10 h-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <div className="skeleton h-4 w-3/4 rounded" />
                            <div className="skeleton h-3 w-1/2 rounded" />
                        </div>
                        <div className="skeleton h-8 w-20 rounded-lg" />
                    </div>
                ))}
            </div>
        )
    }

    // Default: card variant
    return (
        <div className={`grid gap-4 ${className}`}>
            {items.map((i) => (
                <div key={i} className="skeleton skeleton-card p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="skeleton skeleton-avatar" />
                            <div className="space-y-2">
                                <div className="skeleton h-4 w-24 rounded" />
                                <div className="skeleton h-3 w-16 rounded" />
                            </div>
                        </div>
                        <div className="skeleton h-6 w-16 rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <div className="skeleton h-3 w-full rounded" />
                        <div className="skeleton h-3 w-4/5 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )
}

/**
 * Dashboard stats skeleton
 */
export function DashboardSkeleton() {
    return (
        <div className="p-4 md:p-8">
            {/* Header skeleton */}
            <div className="mb-8">
                <div className="skeleton h-8 w-48 rounded mb-2" />
                <div className="skeleton h-4 w-64 rounded" />
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="glass-card p-4 md:p-6">
                        <div className="skeleton h-4 w-20 rounded mb-3" />
                        <div className="skeleton h-8 w-16 rounded mb-2" />
                        <div className="skeleton h-3 w-full rounded" />
                    </div>
                ))}
            </div>

            {/* Content area */}
            <div className="grid md:grid-cols-2 gap-6">
                <LoadingSkeleton variant="card" count={2} />
                <LoadingSkeleton variant="table-row" count={3} />
            </div>
        </div>
    )
}

/**
 * Billing page skeleton
 */
export function BillingSkeleton() {
    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <div className="skeleton h-8 w-32 rounded mb-2" />
                    <div className="skeleton h-4 w-48 rounded" />
                </div>
                <div className="skeleton h-10 w-28 rounded-xl" />
            </div>

            {/* Stats bar */}
            <div className="glass-card p-4 mb-8">
                <div className="flex flex-wrap gap-4">
                    <div className="skeleton h-4 w-32 rounded" />
                    <div className="skeleton h-4 w-32 rounded" />
                    <div className="skeleton h-4 w-24 rounded" />
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {[1, 2].map((i) => (
                    <div key={i} className="glass-card p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-2">
                                <div className="skeleton h-8 w-32 rounded" />
                                <div className="skeleton h-4 w-24 rounded" />
                            </div>
                            <div className="skeleton h-8 w-20 rounded" />
                        </div>
                        <div className="space-y-3 mb-6">
                            <LoadingSkeleton variant="table-row" count={2} />
                        </div>
                        <div className="skeleton h-12 w-full rounded-xl" />
                    </div>
                ))}
            </div>
        </div>
    )
}
