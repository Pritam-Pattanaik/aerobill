import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Restaurant Inventory Management Software | Aerobill",
    description: "Track your food stock, manage recipes, and reduce kitchen waste automatically with advanced inventory tracking.",
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
                    <span className="text-gray-300">Inventory Management</span>
                </div>

                {/* Hero */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Intelligent Inventory & <span className="text-[#ff6b35]">Stock Control</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-4xl">
                        Never run out of key ingredients during a rush. Track stock levels automatically based on item sales, and drastically reduce food wastage and pilferage.
                    </p>
                </div>

                <div className="py-12 space-y-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is Inventory Management?</h2>
                            <p className="text-gray-400 mb-4 text-lg">
                                Inventory management gives you real-time visibility into your raw materials, ingredients, and packaged goods right from your dashboard.
                            </p>
                            <p className="text-gray-400 text-lg">
                                By directly linking your sales to your ingredient usage (recipe mapping), Aerobill automatically deducts stock as soon as a dish is sold.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">🚀 Key Features</h3>
                            <ul className="space-y-4">
                                <li className="text-gray-300"><strong>Real-time Tracking:</strong> Know exactly what’s in stock dynamically.</li>
                                <li className="text-gray-300"><strong>Low Stock Alerts:</strong> Get SMS/Email alerts before items run out.</li>
                                <li className="text-gray-300"><strong>Recipe Mapping:</strong> Link ingredients to menu items for auto-deduction.</li>
                                <li className="text-gray-300"><strong>Vendor Management:</strong> Send automated Purchase Orders.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">📈 Key Benefits</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Lower food costs by up to 15%</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Eliminate ingredient theft and pilferage</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Never 86 (run out of) popular dishes</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Streamlined vendor ordering</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">💡 Why Choose Aerobill?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li>✔️ Precise multi-unit conversions (kg to grams)</li>
                                <li>✔️ Detailed variance reports (physical vs digital)</li>
                                <li>✔️ Easy cloud access for owners</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    )
}
