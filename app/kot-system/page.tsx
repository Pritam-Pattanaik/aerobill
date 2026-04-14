import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Digital KOT System | Aerobill",
    description: "Send orders to the kitchen instantly without manual errors. Perfect synchronization between front-desk and back-house.",
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
                    <span className="text-gray-300">KOT System</span>
                </div>

                {/* Hero */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Digital KOT Printing & <span className="text-[#ff6b35]">Management</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-4xl">
                        Ensure flawless communication between the front desk, waiters, and the kitchen with automated Kitchen Order Tickets.
                    </p>
                </div>

                <div className="py-12 space-y-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is a KOT System?</h2>
                            <p className="text-gray-400 mb-4 text-lg">
                                Kitchen Order Tickets (KOT) are the communication lifeline of any busy restaurant. Aerobill digitizes and automates this entire flow.
                            </p>
                            <p className="text-gray-400 text-lg">
                                When an order is punched in, digital receipts are immediately sent directly to respective kitchen stations instantly.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">🚀 Key Features</h3>
                            <ul className="space-y-4">
                                <li className="text-gray-300"><strong>Auto-Routing:</strong> Send cocktails to bar, food to the kitchen.</li>
                                <li className="text-gray-300"><strong>Detailed Modifiers:</strong> Clear "No Onion" print notes.</li>
                                <li className="text-gray-300"><strong>KOT Merging:</strong> Merge tickets during rush properly.</li>
                                <li className="text-gray-300"><strong>Void Tracking:</strong> Catch deleted orders instantly.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">📈 Key Benefits</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Virtually zero miscommunication errors</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Faster prep times</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Clearer kitchen workflows</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Accountability for voided items</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">💡 Why Choose Aerobill?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li>✔️ Supports unlimited kitchen printers</li>
                                <li>✔️ Seamless multi-network routing</li>
                                <li>✔️ Flexible formatting and layout sizes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    )
}
