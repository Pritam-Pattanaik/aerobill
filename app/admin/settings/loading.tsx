export default function SettingsLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header */}
            <div className="mb-8">
                <div className="h-8 w-32 bg-[var(--card)] rounded-lg mb-2" />
                <div className="h-4 w-56 bg-[var(--card)] rounded" />
            </div>

            {/* Settings form skeleton */}
            <div className="glass-card p-6 max-w-2xl">
                <div className="space-y-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <div className="h-4 w-28 bg-[var(--background)] rounded mb-2" />
                            <div className="h-11 w-full bg-[var(--background)] rounded-lg" />
                        </div>
                    ))}
                    <div className="pt-4">
                        <div className="h-11 w-32 bg-[var(--primary)]/30 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}
