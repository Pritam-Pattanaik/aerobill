import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Cloud Kitchen Management Software | Aerobill",
    description: "Unified dashboard for all aggregator orders from Swiggy, Zomato, and direct channels. Manage multi-brand dark kitchens efficiently.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b35]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a855f7]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos/overview" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#ff6b35]">Cloud Kitchen</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                                Multi-brand Operations
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Unified Cloud Kitchen <span className="gradient-text">System</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Built for multi-brand dark kitchens. Sync Swiggy, Zomato, and direct orders into a single, powerful command center. End tablet hell forever.
                            </p>
                            <Link href="/contact" className="cta-btn inline-block text-center">Get Started →</Link>
                        </div>

                        <div className="reveal-right delay-2">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float">
                                    <div className="text-xs text-gray-500 mb-3">Aggregator Orders — Live</div>
                                    <div className="space-y-2">
                                        {[
                                            { platform: "Swiggy", id: "#SW-8921", items: "Biryani × 2, Raita", time: "30s ago", color: "#ff6b35" },
                                            { platform: "Zomato", id: "#ZM-4502", items: "Pizza Large, Coke", time: "1m ago", color: "#ef4444" },
                                            { platform: "Direct", id: "#DR-0078", items: "Thali Combo × 3", time: "2m ago", color: "#10b981" },
                                        ].map((order, i) => (
                                            <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${order.color}15`, color: order.color }}>
                                                    {order.platform.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white text-sm font-medium">{order.id}</span>
                                                        <span className="text-[10px] text-gray-500">{order.time}</span>
                                                    </div>
                                                    <div className="text-xs text-gray-400 truncate">{order.items}</div>
                                                </div>
                                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: order.color }} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg p-2 text-center text-xs text-[#10b981]">
                                        ✓ All orders auto-accepted
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[{ num: "1", label: "Unified Screen" }, { num: "Auto", label: "Order Accept" }, { num: "10+", label: "Virtual Brands" }, { num: "Zero", label: "Tablet Clutter" }].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}><div className="stat-number text-2xl">{s.num}</div><span className="text-sm text-gray-500">{s.label}</span></div>
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center reveal-up">Cloud Kitchen <span className="gradient-text">Features</span></h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", title: "Aggregator Sync", desc: "Native Swiggy & Zomato integration. Orders flow directly into your POS.", color: "orange" },
                            { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", title: "Multi-Brand", desc: "Run 10 virtual brands from a single kitchen and unified screen.", color: "purple" },
                            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: "Centralized Menu", desc: "Update prices once on POS, changes reflect across all platforms instantly.", color: "blue" },
                            { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", title: "Rider Tracking", desc: "Monitor dispatching status and track delivery partner assignments.", color: "green" },
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
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center reveal-up">FAQs</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { q: "Do I still need the Swiggy tablet?", a: "You can largely bypass it. Orders fall directly into Aerobill and auto-accept if configured." },
                            { q: "Does it support multiple brands?", a: "Yes — manage unlimited virtual brands mapping to the same physical kitchen inventory." },
                            { q: "What if an aggregator drops offline?", a: "Aerobill acts independently. API downtime is flagged while internal systems stay up." },
                            { q: "Can I set different pricing per app?", a: "Yes — define specific price multipliers or menus natively tailored for each platform." },
                        ].map((faq, i) => (
                            <div key={i} className={`faq-card reveal-up delay-${i + 1}`}>
<summary className="flex items-center justify-between cursor-pointer list-none select-none"><div className="flex-1 pr-4">
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {faq.q}
                                </h3>
                                </div><span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span></summary>
<p className="mt-4 animate-in fade-in slide-in-from-top-2 text-gray-400 text-sm leading-relaxed pl-7">{faq.a}</p>
                            </details>))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-[#a855f7]/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">End tablet chaos today</h2>
                    <p className="text-gray-400 mb-8 text-lg">Unify all aggregator orders into one powerful dashboard.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book a Free Demo →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
