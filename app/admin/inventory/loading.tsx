export default function InventoryLoading() {
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

            {/* Inventory table skeleton */}
            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-[var(--border)]">
                    <div className="grid grid-cols-5 gap-4">
                        {['Item', 'Quantity', 'Unit', 'Price/Unit', 'Actions'].map((_, i) => (
                            <div key={i} className="h-4 w-20 bg-[var(--background)] rounded" />
                        ))}
                    </div>
                </div>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="p-4 border-b border-[var(--border)] last:border-0">
                        <div className="grid grid-cols-5 gap-4 items-center">
                            <div className="h-4 w-28 bg-[var(--background)] rounded" />
                            <div className="h-4 w-16 bg-[var(--background)] rounded" />
                            <div className="h-4 w-12 bg-[var(--background)] rounded" />
                            <div className="h-4 w-16 bg-[var(--background)] rounded" />
                            <div className="flex gap-2">
                                <div className="h-6 w-12 bg-[var(--background)] rounded" />
                                <div className="h-6 w-12 bg-[var(--background)] rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
