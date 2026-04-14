import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "QR Code Ordering System | Aerobill",
    description: "Allow customers to view digital menus, select addons, and pay interactively straight from their mobile phones without waiting.",
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
                    <span className="text-gray-300">QR Code Ordering</span>
                </div>

                {/* Hero */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Touchless QR Code <span className="text-[#ff6b35]">Menu & Ordering</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-4xl">
                        Turn tables 25% faster and elevate the diner experience with secure, contactless digital menus and instant table-side ordering.
                    </p>
                </div>

                <div className="py-12 space-y-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is QR Code Ordering?</h2>
                            <p className="text-gray-400 mb-4 text-lg">
                                QR Code Ordering bridges the gap between your customers and the kitchen. Customers simply scan a code placed on their table to open an interactive menu.
                            </p>
                            <p className="text-gray-400 text-lg">
                                They can independently select dishes, specify instructions, and pay the bill without having to flag down a busy waiter.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">🚀 Key Features</h3>
                            <ul className="space-y-4">
                                <li className="text-gray-300"><strong>Interactive Menus:</strong> Show mouth-watering food photos.</li>
                                <li className="text-gray-300"><strong>Direct to KOT:</strong> Orders bypass waiters entirely.</li>
                                <li className="text-gray-300"><strong>Dynamic Pricing:</strong> Update prices instantly online.</li>
                                <li className="text-gray-300"><strong>Table Payments:</strong> Customers can pay via secure UPI links.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">📈 Key Benefits</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Increase average order value via upselling</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Save massive costs on printing menus</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Lower dependency on floor staff</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Collect valuable customer data</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">💡 Why Choose Aerobill?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li>✔️ No app required for diners</li>
                                <li>✔️ Native integration with Aerobill POS</li>
                                <li>✔️ Fast, lightweight interface</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    )
}
