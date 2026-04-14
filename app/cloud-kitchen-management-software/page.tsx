import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Cloud Kitchen Management Software | Aerobill",
    description: "Unified dashboard for all aggregator orders from Swiggy, Zomato, and direct channels.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />
            <div className="pt-24 pb-12 max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-8 border-b border-white/10 pb-4">
                    <Link href="/" className="hover:text-white transition flex items-center gap-1">
                        Home
                    </Link>
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    <Link href="/restaurant-pos-software-india" className="hover:text-white transition">Restaurant POS</Link>
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    <span className="text-gray-300">Cloud Kitchen Software</span>
                </div>

                {/* Hero */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Unified Cloud Kitchen <span className="text-[#ff6b35]">System</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-4xl">
                        Built specifically for multi-brand dark kitchens. Sync Swiggy, Zomato, and direct orders into a single, powerful command center.
                    </p>
                </div>

                <div className="py-12 space-y-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is Cloud Kitchen Software?</h2>
                            <p className="text-gray-400 mb-4 text-lg">
                                Cloud Kitchens (Dark Kitchens) often suffer from "tablet hell" — juggling 5 different blinking devices for different delivery aggregators.
                            </p>
                            <p className="text-gray-400 text-lg">
                                Aerobill unifies all aggregator orders into one central POS. You manage a single menu centrally, and it syncs outwardly, saving immense manual time.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">🚀 Key Features</h3>
                            <ul className="space-y-4">
                                <li className="text-gray-300"><strong>Aggregator Integration:</strong> Direct native Swiggy & Zomato sync.</li>
                                <li className="text-gray-300"><strong>Multi-Brand Routing:</strong> Run 10 virtual brands from 1 unified screen.</li>
                                <li className="text-gray-300"><strong>Centralized Control:</strong> Update prices on your POS, changes reflect everywhere.</li>
                                <li className="text-gray-300"><strong>Rider Tracking:</strong> Monitor dispatching and track delivery partners.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">📈 Key Benefits</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Ridiculously fast auto-order acceptance</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Never manually punch incoming aggregator codes anymore</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Consolidated inventory stock deduction across brands</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Absolutely zero tablet clutter</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">💡 Why Choose Aerobill?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li>✔️ Deep API integration massively minimizes sync failures</li>
                                <li>✔️ Designed to easily handle high volume order velocity</li>
                                <li>✔️ Native KDS module included out of the box</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    )
}
