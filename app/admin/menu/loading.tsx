export default function MenuLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header skeleton */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-8 w-56 bg-[var(--card)] rounded-lg mb-2" />
                    <div className="h-4 w-72 bg-[var(--card)] rounded" />
                </div>
                <div className="flex gap-3">
                    <div className="h-10 w-32 bg-[var(--card)] rounded-lg" />
                    <div className="h-10 w-32 bg-[var(--primary)]/30 rounded-lg" />
                </div>
            </div>

            {/* Categories skeleton */}
            <div className="glass-card p-6 mb-8">
                <div className="h-5 w-24 bg-[var(--background)] rounded mb-4" />
                <div className="flex flex-wrap gap-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-9 w-24 bg-[var(--background)] rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Filter skeleton */}
            <div className="flex items-center gap-4 mb-6">
                <div className="h-4 w-28 bg-[var(--card)] rounded" />
                <div className="h-10 w-48 bg-[var(--card)] rounded-lg" />
            </div>

            {/* Products grid skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass-card p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-[var(--background)] rounded" />
                                <div className="h-5 w-32 bg-[var(--background)] rounded" />
                            </div>
                            <div className="h-6 w-16 bg-[var(--primary)]/30 rounded" />
                        </div>
                        <div className="mb-4">
                            <div className="h-3 w-28 bg-[var(--background)] rounded mb-1" />
                            <div className="h-3 w-24 bg-[var(--background)] rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="h-6 w-20 bg-[var(--background)] rounded-full" />
                            <div className="flex gap-2">
                                <div className="h-4 w-10 bg-[var(--background)] rounded" />
                                <div className="h-4 w-12 bg-[var(--background)] rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
