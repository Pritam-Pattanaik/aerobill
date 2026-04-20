import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Restaurant Billing Software | Fast GST Billing | Aerobill",
    description: "Lightning fast restaurant billing software with GST compliance, split payments, offline mode, and multi-payment support. Try Aerobill free today.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            {/* Hero */}
            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b35]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[150px] -z-10" />

                <div className="max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos/overview" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#ff6b35]">Billing Software</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                #1 Billing Software for Restaurants
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Smart Restaurant <span className="gradient-text">Billing Software</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Process orders faster, eliminate calculation errors, and give your customers a seamless checkout experience with India&apos;s most robust billing platform.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="cta-btn inline-block text-center">Book Free Demo</Link>
                                <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/10 text-gray-300 hover:border-[#ff6b35]/30 hover:text-white transition-all duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    View Pricing
                                </Link>
                            </div>
                        </div>

                        {/* Animated illustration */}
                        <div className="reveal-right delay-2 relative">
                            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-8 glow-border">
                                {/* Floating receipt mockup */}
                                <div className="space-y-4 animate-float">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-white font-bold">Bill #1042</span>
                                            <span className="text-xs text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">GST Applied</span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span className="text-gray-400">Paneer Tikka × 2</span><span className="text-white">₹560</span></div>
                                            <div className="flex justify-between"><span className="text-gray-400">Butter Naan × 4</span><span className="text-white">₹240</span></div>
                                            <div className="flex justify-between"><span className="text-gray-400">Dal Makhani × 1</span><span className="text-white">₹280</span></div>
                                            <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                                                <span className="text-gray-300">Total (incl. GST)</span><span className="text-[#ff6b35] text-lg">₹1,080</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg p-3 text-center text-sm">
                                            <svg className="w-5 h-5 mx-auto mb-1 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                            <span className="text-[#10b981]">Card</span>
                                        </div>
                                        <div className="flex-1 bg-[#818cf8]/10 border border-[#818cf8]/20 rounded-lg p-3 text-center text-sm">
                                            <svg className="w-5 h-5 mx-auto mb-1 text-[#818cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                            <span className="text-[#818cf8]">UPI</span>
                                        </div>
                                        <div className="flex-1 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg p-3 text-center text-sm">
                                            <svg className="w-5 h-5 mx-auto mb-1 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            <span className="text-[#f59e0b]">Cash</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { num: "3s", label: "Avg Bill Time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                        { num: "100%", label: "GST Accuracy", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                        { num: "60%", label: "Faster Service", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                        { num: "24/7", label: "Support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                    ].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}>
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <svg className="w-5 h-5 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} /></svg>
                                <span className="stat-number text-2xl">{s.num}</span>
                            </div>
                            <span className="text-sm text-gray-500">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16 reveal-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features for <span className="gradient-text">Every Restaurant</span></h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to run a fast, error-free checkout — from GST compliance to split payments.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Lightning Fast Checkouts", desc: "Process complete bills in under 3 seconds flat with our optimized interface.", color: "orange" },
                            { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "GST Compliance", desc: "Auto-apply correct SGST/CGST rates for every invoice. Always audit-ready.", color: "green" },
                            { icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", title: "Split Payments", desc: "Accept Cash, Card, and UPI on a single bill with ease. Split any way you want.", color: "blue" },
                            { icon: "M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3", title: "Offline Mode", desc: "Internet down? No problem. Bills keep flowing and auto-sync when you're back online.", color: "amber" },
                        ].map((f, i) => (
                            <div key={i} className={`feature-card reveal-up delay-${i + 1}`}>
                                <div className={`icon-box icon-box-${f.color} mb-5`}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            {/* Benefits */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="reveal-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Key Benefits</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { num: "60%", label: "Faster Checkouts" },
                                    { num: "100%", label: "Tax Accuracy" },
                                    { num: "0%", label: "Revenue Leakage" },
                                    { num: "1-click", label: "End-of-Day Reports" },
                                ].map((b, i) => (
                                    <div key={i} className={`stat-card reveal-scale delay-${i + 1}`}>
                                        <div className="stat-number">{b.num}</div>
                                        <p className="text-gray-400 text-sm mt-1">{b.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="reveal-right delay-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Why Aerobill?</h2>
                            <div className="space-y-3">
                                {[
                                    { icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122", text: "Intuitive touch interface — no training needed" },
                                    { icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4", text: "Integrated with KOT, Inventory, and KDS" },
                                    { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z", text: "24/7 localized support in India" },
                                    { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", text: "Cloud-synced across all your outlets" },
                                ].map((item, i) => (
                                    <div key={i} className={`check-item reveal-up delay-${i + 1}`}>
                                        <div className="icon-box icon-box-green" style={{ width: 40, height: 40 }}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                        </div>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            {/* FAQs */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center reveal-up">Frequently Asked Questions</h2>
                    <p className="text-gray-400 text-center mb-12 reveal-up delay-1">Everything you need to know about Aerobill Billing Software</p>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { q: "Does it work offline?", a: "Yes, offline mode keeps billing intact. It syncs to the cloud automatically once internet restores." },
                            { q: "Is it GST ready?", a: "Fully compliant with Indian GST laws. Generate accurate SGST/CGST invoices every time." },
                            { q: "Can I add service charges?", a: "Yes — service charges, packing fees, and custom discounts can be auto-applied or manually triggered." },
                            { q: "What hardware do I need?", a: "Works on any standard PC, laptop, tablet, or modern POS terminal via our web platform." },
                        ].map((faq, i) => (
                            <div key={i} className={`faq-card reveal-up delay-${i + 1}`}>
<summary className="flex items-center justify-between cursor-pointer list-none select-none"><div className="flex-1 pr-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="icon-box icon-box-orange" style={{ width: 36, height: 36 }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h3 className="text-white font-bold">{faq.q}</h3>
                                </div>
                                </div><span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span></summary>
<p className="mt-4 animate-in fade-in slide-in-from-top-2 text-gray-400 text-sm leading-relaxed pl-12">{faq.a}</p>
                            </details>))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-purple-900/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to supercharge your billing?</h2>
                    <p className="text-gray-400 mb-8 text-lg">Join thousands of Indian restaurants already using Aerobill</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book a Free Demo →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
