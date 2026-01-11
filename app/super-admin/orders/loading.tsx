export default function OrdersLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-8 w-44 bg-slate-800 rounded-lg mb-2" />
                    <div className="h-4 w-64 bg-slate-800 rounded" />
                </div>
                <div className="h-10 w-36 bg-slate-800 rounded-xl" />
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                        <div className="h-3 w-28 bg-slate-700 rounded mb-2" />
                        <div className="h-8 w-20 bg-slate-700 rounded" />
                    </div>
                ))}
            </div>

            {/* Charts area */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="h-6 w-36 bg-slate-700 rounded mb-4" />
                    <div className="space-y-3">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="h-12 w-full bg-slate-700/50 rounded-xl" />
                        ))}
                    </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="h-6 w-48 bg-slate-700 rounded mb-4" />
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-14 w-full bg-slate-700/50 rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
