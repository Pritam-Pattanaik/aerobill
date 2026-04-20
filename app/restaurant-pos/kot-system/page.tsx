import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Digital KOT System for Restaurants | Aerobill",
    description: "Send kitchen orders instantly with auto-routing, modifier printing, and void tracking. Digital KOT system built for speed.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f59e0b]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff6b35]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos/overview" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#f59e0b]">KOT System</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                Smart Kitchen Tickets
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Digital KOT <span className="gradient-text">Printing & Management</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Ensure flawless communication between front desk, waiters, and kitchen with automated Kitchen Order Tickets.
                            </p>
                            <Link href="/contact" className="cta-btn inline-block text-center">Get Started →</Link>
                        </div>

                        <div className="reveal-right delay-2">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float space-y-3">
                                    {/* KOT mockup */}
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse" />
                                                <span className="text-white font-bold text-sm">KOT #347</span>
                                            </div>
                                            <span className="text-xs bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-1 rounded-full">Table 12</span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-gray-300"><span>Butter Chicken × 1</span><span className="text-xs text-red-400 italic">Extra Spicy</span></div>
                                            <div className="flex justify-between text-gray-300"><span>Garlic Naan × 3</span><span></span></div>
                                            <div className="flex justify-between text-gray-300"><span>Mojito × 2</span><span className="text-xs bg-[#818cf8]/10 text-[#818cf8] px-1.5 rounded">→ Bar</span></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg p-2 text-center text-xs text-[#10b981]">
                                            ✓ Kitchen
                                        </div>
                                        <div className="flex-1 bg-[#818cf8]/10 border border-[#818cf8]/20 rounded-lg p-2 text-center text-xs text-[#818cf8]">
                                            ✓ Bar
                                        </div>
                                        <div className="flex-1 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg p-2 text-center text-xs text-[#f59e0b]">
                                            ✓ Pantry
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { num: "0", label: "Miscommunication" },
                        { num: "Auto", label: "Station Routing" },
                        { num: "Instant", label: "Void Alerts" },
                        { num: "∞", label: "Kitchen Printers" },
                    ].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}>
                            <div className="stat-number text-2xl">{s.num}</div>
                            <span className="text-sm text-gray-500">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center reveal-up">Powerful <span className="gradient-text">KOT Features</span></h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", title: "Auto-Routing", desc: "Cocktails to Bar, food to Kitchen. Automated per-category routing.", color: "amber" },
                            { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", title: "Detailed Modifiers", desc: "Clearly print 'No Onion, Extra Spicy' notes for every item.", color: "orange" },
                            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: "KOT Merging", desc: "Merge multiple tickets efficiently during peak rush hours.", color: "blue" },
                            { icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", title: "Void Tracking", desc: "Log every cancelled ticket to prevent fraud and ensure accountability.", color: "rose" },
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

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16">
                    <div className="reveal-left">
                        <h2 className="text-3xl font-bold text-white mb-8">Key Benefits</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { num: "Zero", label: "Miscommunication errors" },
                                { num: "2×", label: "Faster prep times" },
                                { num: "Clear", label: "Kitchen workflows" },
                                { num: "Full", label: "Void accountability" },
                            ].map((b, i) => (
                                <div key={i} className={`stat-card reveal-scale delay-${i + 1}`}>
                                    <div className="stat-number text-xl">{b.num}</div>
                                    <p className="text-gray-400 text-sm mt-1">{b.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="reveal-right delay-2">
                        <h2 className="text-3xl font-bold text-white mb-8">Why Aerobill?</h2>
                        <div className="space-y-3">
                            {[
                                "Supports unlimited printer stations across any floor",
                                "Seamless LAN and network routing topologies",
                                "Flexible KOT header, font, and table layout",
                                "Easy re-print from POS at any time",
                            ].map((t, i) => (
                                <div key={i} className={`check-item reveal-up delay-${i + 1}`}>
                                    <svg className="w-5 h-5 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-gray-300">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center reveal-up">FAQs</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { q: "Can I route to different printers?", a: "Yes, define routing rules per category. Beverages go to Printer A, Main Course to B." },
                            { q: "What if an order is cancelled?", a: "A red 'Void KOT' prints immediately to alert chefs to stop preparation." },
                            { q: "Is a LAN connection necessary?", a: "For thermal kitchen printers, a stable local network (LAN) is highly recommended." },
                            { q: "Can I customize the KOT layout?", a: "Yes. Header, table number, waiter name, and font sizes are all customizable." },
                        ].map((faq, i) => (
                            <details key={i} className={`faq-card group reveal-up delay-${i + 1}`}>
<summary className="flex items-center justify-between cursor-pointer list-none select-none"><div className="flex-1 pr-4">
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {faq.q}
                                </h3>
                                </div><span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span></summary>
<p className="mt-4 animate-in fade-in slide-in-from-top-2 text-gray-400 text-sm leading-relaxed pl-7">{faq.a}</p>
                            </details>))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/5 to-[#ff6b35]/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Digitize your kitchen today</h2>
                    <p className="text-gray-400 mb-8 text-lg">Eliminate errors and speed up your kitchen operations.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book a Free Demo →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
