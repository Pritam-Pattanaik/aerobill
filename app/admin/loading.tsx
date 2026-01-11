export default function AdminLoading() {
    return (
        <div className="p-6 animate-pulse">
            {/* Header skeleton */}
            <div className="mb-6">
                <div className="h-8 w-48 bg-[var(--card)] rounded-lg mb-2" />
                <div className="h-4 w-64 bg-[var(--card)] rounded" />
            </div>

            {/* Stats grid skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-3 w-20 bg-[var(--background)] rounded mb-2" />
                                <div className="h-8 w-16 bg-[var(--background)] rounded" />
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[var(--background)]" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick links skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="glass-card p-4">
                        <div className="h-8 w-8 bg-[var(--background)] rounded mb-2" />
                        <div className="h-4 w-20 bg-[var(--background)] rounded" />
                    </div>
                ))}
            </div>

            {/* Recent orders skeleton */}
            <div className="glass-card p-4">
                <div className="h-5 w-32 bg-[var(--background)] rounded mb-4" />
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[var(--card)]" />
                                <div>
                                    <div className="h-4 w-24 bg-[var(--card)] rounded mb-1" />
                                    <div className="h-3 w-16 bg-[var(--card)] rounded" />
                                </div>
                            </div>
                            <div className="h-4 w-16 bg-[var(--card)] rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
