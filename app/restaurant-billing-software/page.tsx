import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Restaurant Billing Software | Aerobill",
    description: "Fast, customized billing solutions for your restaurant with complete GST compliance and multi-payment support.",
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
                    <span className="text-gray-300">Billing Software</span>
                </div>

                {/* Hero */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Smart Restaurant <span className="text-[#ff6b35]">Billing Software</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-4xl">
                        Process orders faster, eliminate calculation errors, and give your customers a seamless checkout experience with India’s most robust restaurant billing platform.
                    </p>
                </div>

                <div className="py-12 space-y-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is Billing Software?</h2>
                            <p className="text-gray-400 mb-4 text-lg">
                                Restaurant billing software automates your checkout process, ensuring accuracy in pricing, automatic tax deductions (GST), and simplified split payments.
                            </p>
                            <p className="text-gray-400 text-lg">
                                Aerobill billing software is designed for raw speed, capable of handling rapid QSR checkouts while robust enough for complex fine-dining settlements.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">🚀 Key Features</h3>
                            <ul className="space-y-4">
                                <li className="text-gray-300"><strong>Lightning Fast Checkouts:</strong> Process bills in under 3 seconds.</li>
                                <li className="text-gray-300"><strong>GST Compliance:</strong> Auto-apply the right SGST/CGST instantly.</li>
                                <li className="text-gray-300"><strong>Split Payments:</strong> Accept Cash, Card, and UPI on one bill.</li>
                                <li className="text-gray-300"><strong>Offline Mode:</strong> Internet down? Keep billing seamlessly.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">📈 Key Benefits</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Reduce customer wait time by 60%</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">100% Tax calculation accuracy</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Minimize revenue leakage</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Easy daily settlement reports</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">💡 Why Choose Aerobill?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li>✔️ Intuitive touch interface without deep training</li>
                                <li>✔️ Direct integration with KOT and Inventory</li>
                                <li>✔️ 24/7 localized support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    )
}
