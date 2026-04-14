import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Restaurant Analytics & Reporting | Aerobill",
    description: "Understand your growth with clear, actionable insights into sales, items, and team performance.",
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
                    <span className="text-gray-300">Analytics & Reporting</span>
                </div>

                {/* Hero */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Powerful Restaurant <span className="text-[#ff6b35]">Analytics</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-4xl">
                        Turn raw numbers into actionable insights. Understand what sells, who buys, and how to increase your profit margins sustainably.
                    </p>
                </div>

                <div className="py-12 space-y-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is Restaurant Analytics?</h2>
                            <p className="text-gray-400 mb-4 text-lg">
                                Aerobill Analytics crunches millions of data points from your POS daily to present beautiful, easy-to-read charts and reliable reports.
                            </p>
                            <p className="text-gray-400 text-lg">
                                Knowing your peak hours, best-selling dishes, and staff efficiency is the undisputed key to scaling your operations sustainably.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">🚀 Key Features</h3>
                            <ul className="space-y-4">
                                <li className="text-gray-300"><strong>Real-time Dashboard:</strong> Watch your sales grow live.</li>
                                <li className="text-gray-300"><strong>Item Performance:</strong> Locate your true profit-making dishes.</li>
                                <li className="text-gray-300"><strong>Shift Reports:</strong> Fast end-of-day cash drawer tracking.</li>
                                <li className="text-gray-300"><strong>Cloud Exports:</strong> Download to CSV for accounting.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">📈 Key Benefits</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Identify under-performing dead-stock quickly</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Optimize staff schedules based on rush heatmaps</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Clear data-backed menu engineering</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Check metrics remotely from anywhere via mobile</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">💡 Why Choose Aerobill?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li>✔️ Complete zero manual calculation necessary</li>
                                <li>✔️ Taxes strictly pre-formatted for Indian CS standards</li>
                                <li>✔️ Massive bird's eye view tailored for multi-outlet owners</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    )
}
