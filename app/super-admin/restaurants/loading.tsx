export default function RestaurantsLoading() {
    return (
        <div className="p-8 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-8 w-40 bg-slate-800 rounded-lg mb-2" />
                    <div className="h-4 w-56 bg-slate-800 rounded" />
                </div>
                <div className="h-10 w-48 bg-slate-800 rounded-xl" />
            </div>

            {/* Restaurants list */}
            <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-700" />
                                <div>
                                    <div className="h-5 w-40 bg-slate-700 rounded mb-2" />
                                    <div className="h-3 w-32 bg-slate-700 rounded" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-6 w-20 bg-slate-700 rounded-full" />
                                <div className="h-6 w-16 bg-slate-700 rounded-full" />
                                <div className="h-8 w-20 bg-slate-700 rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-slate-800 rounded-lg" />
                ))}
            </div>
        </div>
    )
}
