import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Restaurant Inventory Management Software | Aerobill",
    description: "Track food stock, manage recipes, reduce waste automatically with real-time inventory tracking, low stock alerts, and vendor management.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            {/* Hero */}
            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10b981]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos/overview" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#10b981]">Inventory Management</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                Smart Stock Control
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Intelligent Inventory & <span className="gradient-text">Stock Control</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Never run out of key ingredients during a rush. Track stock levels automatically based on item sales, and drastically reduce food wastage.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="cta-btn inline-block text-center">Start Free Trial</Link>
                            </div>
                        </div>

                        {/* Animated stock dashboard */}
                        <div className="reveal-right delay-2 relative">
                            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float space-y-3">
                                    <div className="text-sm text-gray-500 mb-2">Live Stock Levels</div>
                                    {[
                                        { item: "Paneer", qty: "12 kg", level: 85, color: "#10b981" },
                                        { item: "Tomatoes", qty: "4 kg", level: 30, color: "#f59e0b" },
                                        { item: "Basmati Rice", qty: "1.5 kg", level: 12, color: "#ef4444" },
                                        { item: "Cooking Oil", qty: "8 L", level: 65, color: "#10b981" },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                                            <div className="flex justify-between mb-1.5">
                                                <span className="text-white text-sm font-medium">{s.item}</span>
                                                <span className="text-gray-400 text-xs">{s.qty}</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.level}%`, backgroundColor: s.color }} />
                                            </div>
                                            {s.level < 20 && (
                                                <div className="flex items-center gap-1 mt-1.5 text-xs text-red-400">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                    Low Stock Alert!
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { num: "15%", label: "Lower Food Cost" },
                        { num: "0", label: "Stock-outs" },
                        { num: "Auto", label: "Deduction" },
                        { num: "Real-time", label: "Stock Visibility" },
                    ].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}>
                            <div className="stat-number text-2xl">{s.num}</div>
                            <span className="text-sm text-gray-500">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center reveal-up">Smart Features That <span className="gradient-text">Save Money</span></h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center mb-12 reveal-up delay-1">Automate stock tracking and eliminate waste with intelligent inventory tools.</p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Real-time Tracking", desc: "Know exactly what's in stock, updated dynamically as dishes are sold.", color: "green" },
                            { icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", title: "Low Stock Alerts", desc: "Get SMS/Email alerts before items run dangerously low.", color: "amber" },
                            { icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", title: "Recipe Mapping", desc: "Link raw materials to menu items. Sell a pizza, auto-deduct cheese & dough.", color: "blue" },
                            { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "Vendor Management", desc: "Send automated Purchase Orders directly to your suppliers.", color: "purple" },
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

            {/* Benefits + Why */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16">
                    <div className="reveal-left">
                        <h2 className="text-3xl font-bold text-white mb-8">Impact on Your Business</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { num: "15%", label: "Lower food costs" },
                                { num: "Zero", label: "Pilferage & theft" },
                                { num: "Never", label: "Run out of popular dishes" },
                                { num: "Auto", label: "Vendor PO generation" },
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
                                "Precise multi-unit conversions (kg ↔ grams)",
                                "Detailed variance reports (physical vs digital stock)",
                                "Multi-outlet stock transfers from central kitchen",
                                "Wastage logging for complete accuracy",
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

            {/* FAQ */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center reveal-up">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { q: "Does it handle recipe variations?", a: "Yes, map multiple ingredients per variant (Large vs Regular pizza, etc.)." },
                            { q: "Can I manage centralized inventory?", a: "Yes, multi-outlet inventory transfers from central base kitchen are fully supported." },
                            { q: "Will it track wastage?", a: "Staff can log spoiled/wasted items to keep stock records completely accurate." },
                            { q: "How do I add physical stock?", a: "Perform physical audits easily. Auto-generated variance reports compare digital vs actual." },
                        ].map((faq, i) => (
                            <details key={i} className={`faq-card group reveal-up delay-${i + 1}`}>
<summary className="flex items-center justify-between cursor-pointer list-none select-none"><div className="flex-1 pr-4">
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {faq.q}
                                </h3>
                                </div><span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span></summary>
<p className="mt-4 animate-in fade-in slide-in-from-top-2 text-gray-400 text-sm leading-relaxed pl-7">{faq.a}</p>
                            </details>))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-indigo-900/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Take control of your inventory today</h2>
                    <p className="text-gray-400 mb-8 text-lg">Stop wasting money on ingredients that spoil. Start tracking smartly.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book a Free Demo →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
