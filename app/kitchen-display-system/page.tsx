import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Kitchen Display System (KDS) for Restaurants | Aerobill",
    description: "Replace paper tickets with smart digital screens. Real-time order queues, color-coded priority, and prep time analytics.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f43f5e]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#818cf8]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos-software-india" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#f43f5e]">Kitchen Display</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f43f5e]/10 border border-[#f43f5e]/20 text-[#f43f5e] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Paperless Kitchen
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Digital Kitchen <span className="gradient-text">Display Systems</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Modernize your kitchen. Toss the paper tickets, cut the chaos, and serve food at maximum speed with real-time digital order boards.
                            </p>
                            <Link href="/contact" className="cta-btn inline-block text-center">Get Started →</Link>
                        </div>

                        <div className="reveal-right delay-2">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float">
                                    <div className="text-xs text-gray-500 mb-3 flex items-center justify-between">
                                        <span>Kitchen Display</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"/>Live</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { table: "T3", items: ["Butter Chicken", "Naan ×2"], time: "2m", status: "Preparing", color: "#f59e0b" },
                                            { table: "T7", items: ["Pizza Margherita"], time: "5m", status: "New", color: "#f43f5e" },
                                            { table: "T1", items: ["Biryani", "Raita"], time: "8m", status: "Ready", color: "#10b981" },
                                            { table: "T12", items: ["Pasta ×2", "Soup"], time: "1m", status: "Rush!", color: "#ef4444" },
                                        ].map((order, i) => (
                                            <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5 text-xs">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-white font-bold">{order.table}</span>
                                                    <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: `${order.color}20`, color: order.color }}>{order.status}</span>
                                                </div>
                                                {order.items.map((item, j) => <div key={j} className="text-gray-400">{item}</div>)}
                                                <div className="mt-2 text-gray-500 flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    {order.time} ago
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[{ num: "Zero", label: "Lost Tickets" }, { num: "Real-time", label: "Order Sync" }, { num: "Touch", label: "To Bump" }, { num: "Analytics", label: "Prep Speed" }].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}><div className="stat-number text-2xl">{s.num}</div><span className="text-sm text-gray-500">{s.label}</span></div>
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center reveal-up">Powerful <span className="gradient-text">KDS Features</span></h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M4 6h16M4 10h16M4 14h16M4 18h16", title: "Digital Queue", desc: "Clear, prioritized ticket boards on screen with visual priority.", color: "rose" },
                            { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", title: "Course Control", desc: "Fire appetizers first, hold main courses until ready to serve.", color: "blue" },
                            { icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", title: "Ready Alerts", desc: "Chef taps 'Done' — waiters are instantly notified to pick up the dish.", color: "green" },
                            { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Prep Analytics", desc: "Measure real kitchen speed over time. Identify bottlenecks.", color: "amber" },
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
                            { q: "Can I use iPads for this?", a: "Yes! Our KDS runs in browser — iPads, Android tablets, and smart TVs all work perfectly." },
                            { q: "Can it group identical items?", a: "Yes, it can consolidate items (e.g. 5× Burgers total) across multiple orders." },
                            { q: "Does it ring a bell?", a: "Sound notifications can be enabled for critical or rush orders arriving on the board." },
                            { q: "Is it synced with QR ordering?", a: "Absolutely. Customer phone orders appear on the KDS instantly in real-time." },
                        ].map((faq, i) => (
                            <div key={i} className={`faq-card reveal-up delay-${i + 1}`}>
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#f43f5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {faq.q}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed pl-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f43f5e]/5 to-[#818cf8]/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Go paperless in the kitchen</h2>
                    <p className="text-gray-400 mb-8 text-lg">Faster food prep, fewer mistakes, happier customers.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book a Free Demo →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
