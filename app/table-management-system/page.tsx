import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Table Management System | Aerobill",
    description: "Optimize seating, track turning times visually, and maximize walk-in guests with intuitive digital floor mapping.",
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
                    <span className="text-gray-300">Table Management</span>
                </div>

                {/* Hero */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Visual Table <span className="text-[#ff6b35]">Optimization Software</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-4xl">
                        Map your floor digitally. Track occupied, reserved, and open tables to seat more guests per shift with zero confusion.
                    </p>
                </div>

                <div className="py-12 space-y-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is Table Management?</h2>
                            <p className="text-gray-400 mb-4 text-lg">
                                Aerobill Table Management allows your front-of-house staff to visualize your entire restaurant floor layout directly on a screen.
                            </p>
                            <p className="text-gray-400 text-lg">
                                It helps track wait times, reserve specific tables for incoming VIPs, and ensures waiters know exactly which tables require immediate attention.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">🚀 Key Features</h3>
                            <ul className="space-y-4">
                                <li className="text-gray-300"><strong>Custom Floor Mapping:</strong> Match your real physical layout.</li>
                                <li className="text-gray-300"><strong>Status Indicators:</strong> Color coding for Open, Occupied, and bBilled.</li>
                                <li className="text-gray-300"><strong>Reservation Log:</strong> Accept and trace table bookings seamlessly.</li>
                                <li className="text-gray-300"><strong>Time Tracking:</strong> Know if a table has been waiting too long.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">📈 Key Benefits</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Reduce host-stand chaos instantly</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Turn tables 20% faster safely</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Smoother reservations mapping</div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">Better waiter zone assignments</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">💡 Why Choose Aerobill?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li>✔️ Works flawlessly on host-stand tablets</li>
                                <li>✔️ Supports multiple floors intuitively</li>
                                <li>✔️ Changes layout effortlessly in edit mode</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    )
}
