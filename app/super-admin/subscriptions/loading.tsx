export default function SubscriptionsLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-8 w-44 bg-slate-800 rounded-lg mb-2" />
                    <div className="h-4 w-64 bg-slate-800 rounded" />
                </div>
                <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-9 w-24 bg-slate-800 rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Subscriptions list */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="p-4 border-b border-slate-700/50 last:border-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-700" />
                                <div>
                                    <div className="h-4 w-36 bg-slate-700 rounded mb-1" />
                                    <div className="h-3 w-28 bg-slate-700 rounded" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-6 w-20 bg-slate-700 rounded-full" />
                                <div className="h-6 w-16 bg-slate-700 rounded-full" />
                                <div className="h-3 w-24 bg-slate-700 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
