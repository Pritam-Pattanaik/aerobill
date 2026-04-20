import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Table Management System for Restaurants | Aerobill",
    description: "Optimize seating, track table status visually, and maximize walk-in guests with intuitive digital floor mapping.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a855f7]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10b981]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos/overview" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#a855f7]">Table Management</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                                Visual Floor Control
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Visual Table <span className="gradient-text">Optimization</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Map your floor digitally. Track occupied, reserved, and open tables to seat more guests per shift with zero confusion.
                            </p>
                            <Link href="/contact" className="cta-btn inline-block text-center">Start Free Trial →</Link>
                        </div>
                        <div className="reveal-right delay-2">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float">
                                    <div className="text-xs text-gray-500 mb-3">Floor Map — Ground Floor</div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { id: "T1", status: "open", color: "#10b981" },
                                            { id: "T2", status: "occupied", color: "#f59e0b" },
                                            { id: "T3", status: "occupied", color: "#f59e0b" },
                                            { id: "T4", status: "billed", color: "#818cf8" },
                                            { id: "T5", status: "open", color: "#10b981" },
                                            { id: "T6", status: "reserved", color: "#a855f7" },
                                            { id: "T7", status: "occupied", color: "#f59e0b" },
                                            { id: "T8", status: "open", color: "#10b981" },
                                        ].map((t, i) => (
                                            <div key={i} className="aspect-square rounded-xl border flex flex-col items-center justify-center text-xs gap-1 transition-all hover:scale-105" style={{ borderColor: `${t.color}40`, background: `${t.color}10` }}>
                                                <span className="text-white font-bold">{t.id}</span>
                                                <span style={{ color: t.color }} className="capitalize text-[10px]">{t.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 mt-3 text-[10px]">
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]" />Open</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f59e0b]" />Occupied</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#818cf8]" />Billed</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#a855f7]" />Reserved</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[{ num: "20%", label: "Faster Table Turns" }, { num: "Multi", label: "Floor Support" }, { num: "Live", label: "Status Updates" }, { num: "Drag", label: "& Drop Layout" }].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}><div className="stat-number text-2xl">{s.num}</div><span className="text-sm text-gray-500">{s.label}</span></div>
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center reveal-up">Smart <span className="gradient-text">Table Features</span></h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", title: "Custom Floor Map", desc: "Drag and drop tables to match your real physical restaurant layout.", color: "purple" },
                            { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", title: "Color-Coded Status", desc: "Green for open, amber for occupied, purple for reserved — instant clarity.", color: "green" },
                            { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Reservation Log", desc: "Accept and allocate table bookings. Track VIP guests seamlessly.", color: "blue" },
                            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Time Tracking", desc: "Visual alerts if a table has been waiting unusually long for food.", color: "amber" },
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
                            { q: "Can I have multiple dining areas?", a: "Yes — create limitless zones like AC Room, Patio, and Rooftop." },
                            { q: "Does it link to billing?", a: "When a bill settles, the table auto-turns green (Empty) on the floor map." },
                            { q: "Can we merge tables?", a: "Yes, drag and link tables together natively for large group seating." },
                            { q: "Is it easy to change the layout?", a: "Absolutely — enter Edit Mode anytime to rearrange tables via drag & drop." },
                        ].map((faq, i) => (
                            <div key={i} className={`faq-card reveal-up delay-${i + 1}`}>
<summary className="flex items-center justify-between cursor-pointer list-none select-none"><div className="flex-1 pr-4">
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {faq.q}
                                </h3>
                                </div><span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span></summary>
<p className="mt-4 animate-in fade-in slide-in-from-top-2 text-gray-400 text-sm leading-relaxed pl-7">{faq.a}</p>
                            </details>))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-[#10b981]/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Optimize your floor today</h2>
                    <p className="text-gray-400 mb-8 text-lg">Seat more guests, serve faster, and eliminate front-desk chaos.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book a Free Demo →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
