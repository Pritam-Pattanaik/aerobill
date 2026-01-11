export default function BillingLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header */}
            <div className="mb-8">
                <div className="h-8 w-48 bg-[var(--card)] rounded-lg mb-2" />
                <div className="h-4 w-64 bg-[var(--card)] rounded" />
            </div>

            {/* Orders grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass-card p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="h-6 w-20 bg-[var(--background)] rounded mb-1" />
                                <div className="h-3 w-16 bg-[var(--background)] rounded" />
                            </div>
                            <div className="h-5 w-16 bg-[var(--background)] rounded-full" />
                        </div>
                        <div className="space-y-2 mb-4">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="h-4 w-full bg-[var(--background)] rounded" />
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="h-5 w-20 bg-[var(--background)] rounded" />
                            <div className="h-8 w-24 bg-[var(--primary)]/30 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
