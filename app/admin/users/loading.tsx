export default function UsersLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-8 w-40 bg-[var(--card)] rounded-lg mb-2" />
                    <div className="h-4 w-56 bg-[var(--card)] rounded" />
                </div>
                <div className="h-10 w-32 bg-[var(--primary)]/30 rounded-lg" />
            </div>

            {/* Users list */}
            <div className="glass-card">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 border-b border-[var(--border)] last:border-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[var(--background)]" />
                                <div>
                                    <div className="h-4 w-32 bg-[var(--background)] rounded mb-1" />
                                    <div className="h-3 w-40 bg-[var(--background)] rounded" />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-16 bg-[var(--background)] rounded-full" />
                                <div className="h-6 w-12 bg-[var(--background)] rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
