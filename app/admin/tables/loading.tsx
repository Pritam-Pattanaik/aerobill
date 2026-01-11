export default function TablesLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-8 w-48 bg-[var(--card)] rounded-lg mb-2" />
                    <div className="h-4 w-64 bg-[var(--card)] rounded" />
                </div>
                <div className="h-10 w-32 bg-[var(--primary)]/30 rounded-lg" />
            </div>

            {/* Tables grid */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="glass-card p-4 text-center">
                        <div className="h-12 w-12 mx-auto bg-[var(--background)] rounded-xl mb-3" />
                        <div className="h-5 w-20 mx-auto bg-[var(--background)] rounded mb-2" />
                        <div className="h-4 w-16 mx-auto bg-[var(--background)] rounded mb-3" />
                        <div className="h-8 w-full bg-[var(--background)] rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    )
}
