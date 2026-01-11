export default function SuperAdminLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header */}
            <div className="mb-8">
                <div className="h-8 w-56 bg-slate-800 rounded-lg mb-2" />
                <div className="h-4 w-72 bg-slate-800 rounded" />
            </div>

            {/* Stats grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                        <div className="h-3 w-24 bg-slate-700 rounded mb-2" />
                        <div className="h-8 w-20 bg-slate-700 rounded" />
                    </div>
                ))}
            </div>

            {/* Subscription breakdown */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-8">
                <div className="h-6 w-48 bg-slate-700 rounded mb-4" />
                <div className="grid gap-4 md:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-slate-900/50 rounded-xl p-4">
                            <div className="h-4 w-20 bg-slate-700 rounded mb-2" />
                            <div className="h-8 w-12 bg-slate-700 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent restaurants */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <div className="h-6 w-40 bg-slate-700 rounded mb-4" />
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-700" />
                                <div>
                                    <div className="h-4 w-32 bg-slate-700 rounded mb-1" />
                                    <div className="h-3 w-24 bg-slate-700 rounded" />
                                </div>
                            </div>
                            <div className="h-6 w-16 bg-slate-700 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
