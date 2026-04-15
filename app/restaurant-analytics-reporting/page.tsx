import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Restaurant Analytics & Reporting Software | Aerobill",
    description: "Gain real-time insights into sales, menu performance, staff efficiency, and profitability with powerful restaurant analytics.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#818cf8]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10b981]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos-software-india" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#818cf8]">Analytics & Reporting</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#818cf8]/10 border border-[#818cf8]/20 text-[#818cf8] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                Data-Driven Decisions
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Powerful Restaurant <span className="gradient-text">Analytics</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Turn raw numbers into actionable insights. Understand what sells, who buys, and how to sustainably grow your profit margins.
                            </p>
                            <Link href="/contact" className="cta-btn inline-block text-center">Get Started →</Link>
                        </div>

                        <div className="reveal-right delay-2">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float">
                                    <div className="text-xs text-gray-500 mb-3">Today&apos;s Performance</div>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                            <div className="text-xl font-bold text-[#10b981]">₹47,250</div>
                                            <div className="text-[10px] text-gray-500">Revenue</div>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                            <div className="text-xl font-bold text-[#818cf8]">142</div>
                                            <div className="text-[10px] text-gray-500">Orders</div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-3">
                                        <div className="text-[10px] text-gray-500 mb-2">Hourly Sales</div>
                                        <div className="flex items-end gap-1 h-16">
                                            {[20, 35, 25, 55, 80, 95, 70, 85, 60, 40, 30, 15].map((h, i) => (
                                                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `linear-gradient(to top, rgba(129,140,248,0.3), rgba(129,140,248,0.8))` }} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-xs">
                                        <div className="flex justify-between text-gray-400 mb-1"><span>Top Seller</span><span className="text-white font-medium">Butter Chicken</span></div>
                                        <div className="flex justify-between text-gray-400"><span>Peak Hour</span><span className="text-white font-medium">8:00 PM</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[{ num: "Live", label: "Dashboard" }, { num: "Menu", label: "Engineering" }, { num: "CSV", label: "Exports" }, { num: "Multi", label: "Outlet View" }].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}><div className="stat-number text-2xl">{s.num}</div><span className="text-sm text-gray-500">{s.label}</span></div>
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center reveal-up">Analytics <span className="gradient-text">Features</span></h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Real-time Dashboard", desc: "Watch sales grow live, from anywhere on any device.", color: "green" },
                            { icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z", title: "Item Performance", desc: "Identify your true profit-makers with automated menu engineering.", color: "blue" },
                            { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Shift Reports", desc: "End-of-day balances, cash drawer tracking, and handover summaries.", color: "amber" },
                            { icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4", title: "Cloud Exports", desc: "Download CSV reports instantly for accountants and auditing.", color: "purple" },
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
                            { q: "Can I check reports on my phone?", a: "Yes — fully mobile-responsive dashboard for owners on the go." },
                            { q: "Can staff access be limited?", a: "Absolutely — Role-Based Access Control means only admins see financial analytics." },
                            { q: "Are taxes factored in?", a: "Sales figures toggle between inclusive/exclusive of GST for clear metrics." },
                            { q: "How long is data saved?", a: "Securely stored on Aerobill cloud for the entire lifetime of your subscription." },
                        ].map((faq, i) => (
                            <div key={i} className={`faq-card reveal-up delay-${i + 1}`}>
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#818cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {faq.q}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed pl-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#818cf8]/5 to-[#10b981]/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Make data-driven decisions</h2>
                    <p className="text-gray-400 mb-8 text-lg">Know exactly what&apos;s working and what needs to change.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book a Free Demo →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
