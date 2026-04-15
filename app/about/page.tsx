import Link from "next/link"
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

const fallbackMetadata: Metadata = {
    title: "About Aerobill - By ASSETMAGNETS | Restaurant Management Software",
    description: "Learn about Aerobill by ASSETMAGNETS - India's most innovative restaurant management software with QR ordering, kitchen display, and smart billing. Zero commission, 100% cloud-based.",
    keywords: ["about aerobill", "assetmagnets", "restaurant software india", "qr code ordering", "restaurant management"],
    openGraph: {
        title: "About Aerobill - Restaurant Management Software by ASSETMAGNETS",
        description: "India's most innovative restaurant management software. Zero commission, cloud-based QR ordering, kitchen display & billing.",
        url: "https://www.aerobill.in/about",
        siteName: "Aerobill",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Aerobill" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Aerobill - Restaurant Management Software",
        description: "Learn how Aerobill is revolutionizing restaurant management in India.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.aerobill.in/about",
    },
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/about", fallbackMetadata)
}

export default function AboutPage() {
    const features = [
        {
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
            title: "Lightning Fast Setup",
            desc: "Go live in under 10 minutes. No complex installations, no hardware requirements, no technical expertise needed.",
            color: "amber",
        },
        {
            icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
            title: "Mobile-First Design",
            desc: "Built for the smartphone era. Customers order from their phones, staff manages from any device.",
            color: "blue",
        },
        {
            icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
            title: "Real-Time Sync",
            desc: "Orders flow instantly from customer phones to kitchen displays. No delays, no missed orders.",
            color: "green",
        },
        {
            icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            title: "Zero Commission",
            desc: "Unlike food delivery apps, we never take a cut from your orders. Pay a simple monthly fee, keep 100%.",
            color: "orange",
        },
        {
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            title: "Smart Analytics",
            desc: "Understand your business with real-time dashboards. Track peak hours, popular items, trends.",
            color: "purple",
        },
        {
            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
            title: "Enterprise Security",
            desc: "Bank-grade encryption, secure authentication, role-based access, and regular backups.",
            color: "rose",
        },
    ]

    const comparisons = [
        { feature: "Setup Time", aerobill: "< 10 minutes", others: "Days to weeks", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { feature: "Hardware Required", aerobill: "None", others: "POS terminals, printers", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { feature: "Monthly Cost", aerobill: "From ₹0", others: "₹2,000 - ₹10,000+", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { feature: "Commission on Orders", aerobill: "0%", others: "15-30%", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
        { feature: "QR Ordering", aerobill: "Built-in", others: "Paid add-on", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
        { feature: "Kitchen Display", aerobill: "Included", others: "Extra cost", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { feature: "Updates", aerobill: "Automatic & Free", others: "Manual & Paid", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
        { feature: "Support", aerobill: "24/7 Chat & Email", others: "Business hours only", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            {/* Hero Section */}
            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b35]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -z-10" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                About Us
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Powering Restaurants with <span className="gradient-text">Innovation</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Aerobill is a product of <strong className="text-white">ASSETMAGNETS</strong> — a technology company dedicated to building smart solutions for modern businesses.
                            </p>
                            <a
                                href="https://www.assetmagnets.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cta-btn inline-block text-center"
                            >
                                Visit ASSETMAGNETS →
                            </a>
                        </div>

                        {/* Stats mockup */}
                        <div className="reveal-right delay-2 hidden md:block">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { value: "100+", label: "Restaurants Trust Us", color: "#ff6b35" },
                                            { value: "5L+", label: "Orders Processed", color: "#818cf8" },
                                            { value: "99.9%", label: "Uptime Guaranteed", color: "#10b981" },
                                            { value: "4.8★", label: "Customer Rating", color: "#f59e0b" },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/5 text-center">
                                                <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                                                <div className="text-xs text-gray-500">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats bar (mobile-visible) */}
            <section className="py-8 border-y border-white/5 bg-white/[0.02] md:hidden">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 gap-6">
                    {[
                        { num: "100+", label: "Restaurants" },
                        { num: "5L+", label: "Orders" },
                        { num: "99.9%", label: "Uptime" },
                        { num: "4.8★", label: "Rating" },
                    ].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}>
                            <div className="stat-number text-2xl">{s.num}</div>
                            <span className="text-sm text-gray-500">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Story Timeline */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16 reveal-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            Our Journey
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our <span className="gradient-text">Story</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">How a simple observation turned into India&apos;s most innovative restaurant management platform</p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff6b35] via-[#ff8c5a] to-[#ff6b35]/20" />

                        <div className="space-y-12 md:space-y-0">
                            {[
                                {
                                    num: "1",
                                    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                                    title: "The Problem",
                                    desc: "We observed restaurants struggling with outdated, expensive systems. Owners were juggling multiple apps, paying hefty commissions, and dealing with complicated POS hardware.",
                                    align: "right",
                                },
                                {
                                    num: "2",
                                    icon: "M13 10V3L4 14h7v7l9-11h-7z",
                                    title: "The Solution",
                                    desc: "At ASSETMAGNETS, we believe technology should simplify, not complicate. So we built Aerobill — a complete cloud-based solution. No hardware. No setup hassles. Zero commissions.",
                                    align: "left",
                                },
                                {
                                    num: "3",
                                    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                                    title: "Today",
                                    desc: "Hundreds of restaurants across India trust Aerobill daily. From cozy cafes to multi-location chains, we're helping businesses embrace the digital future — one order at a time.",
                                    align: "right",
                                },
                            ].map((item, i) => (
                                <div key={i} className={`md:flex md:items-center md:gap-8 relative ${i > 0 ? "md:mt-12" : ""}`}>
                                    {item.align === "right" ? (
                                        <>
                                            <div className="md:w-1/2 md:text-right md:pr-12">
                                                <div className={`feature-card !border-white/10 hover:!border-[#ff6b35]/30 reveal-left delay-${i + 1}`}>
                                                    <div className="flex items-center gap-3 mb-4 md:justify-end">
                                                        <div className="icon-box icon-box-orange">
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-[#ff6b35]">{item.title}</h3>
                                                    </div>
                                                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full shadow-lg shadow-[#ff6b35]/30">
                                                <span className="text-lg font-bold text-white">{item.num}</span>
                                            </div>
                                            <div className="md:w-1/2 md:pl-12" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="md:w-1/2 md:pr-12" />
                                            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full shadow-lg shadow-[#ff6b35]/30">
                                                <span className="text-lg font-bold text-white">{item.num}</span>
                                            </div>
                                            <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
                                                <div className={`feature-card !border-white/10 hover:!border-[#ff6b35]/30 reveal-right delay-${i + 1}`}>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="icon-box icon-box-orange">
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-[#ff6b35]">{item.title}</h3>
                                                    </div>
                                                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            {/* What Makes Aerobill Different */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 reveal-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Makes Aerobill <span className="gradient-text">Different</span></h2>
                        <p className="text-gray-400">Innovative features that set us apart</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className={`feature-card reveal-up delay-${(i % 6) + 1}`}>
                                <div className={`icon-box icon-box-${f.color} mb-5`}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-400">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            {/* Comparison Table */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16 reveal-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            The Comparison
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Aerobill vs. <span className="gradient-text">Traditional Solutions</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">See why hundreds of restaurants are making the switch</p>
                    </div>

                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 overflow-hidden reveal-up">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 bg-white/5">
                            <div className="p-5 border-b border-white/10">
                                <span className="text-gray-400 font-medium">Feature</span>
                            </div>
                            <div className="p-5 border-b border-white/10 text-center bg-[#ff6b35]/5">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl font-bold text-[#ff6b35]">Aerobill</span>
                                    <span className="px-2 py-0.5 bg-[#ff6b35] text-white text-xs rounded-full font-semibold">Winner</span>
                                </div>
                            </div>
                            <div className="p-5 border-b border-white/10 text-center">
                                <span className="text-gray-400 font-medium">Traditional POS</span>
                            </div>
                        </div>

                        {/* Table Body */}
                        {comparisons.map((row, i) => (
                            <div key={i} className="grid grid-cols-3 hover:bg-white/5 transition group">
                                <div className="p-5 border-b border-white/5 flex items-center gap-3">
                                    <svg className="w-5 h-5 text-gray-500 flex-shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={row.icon} /></svg>
                                    <span className="text-gray-300 group-hover:text-white transition text-sm sm:text-base">{row.feature}</span>
                                </div>
                                <div className="p-5 border-b border-white/5 text-center bg-[#ff6b35]/5 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[#10b981] font-semibold text-sm sm:text-base">{row.aerobill}</span>
                                </div>
                                <div className="p-5 border-b border-white/5 text-center flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 text-red-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    <span className="text-gray-500 text-sm sm:text-base">{row.others}</span>
                                </div>
                            </div>
                        ))}

                        {/* Bottom Summary */}
                        <div className="grid grid-cols-3 bg-white/5">
                            <div className="p-5"><span className="text-gray-400 font-medium">Verdict</span></div>
                            <div className="p-5 text-center bg-[#ff6b35]/5">
                                <span className="text-[#10b981] font-bold flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                    Clear Winner
                                </span>
                            </div>
                            <div className="p-5 text-center"><span className="text-gray-500">Outdated</span></div>
                        </div>
                    </div>

                    <div className="mt-8 text-center reveal-up">
                        <p className="text-gray-400 mb-4">Ready to experience the difference?</p>
                        <Link href="/register" className="cta-btn inline-block">Try Aerobill Free →</Link>
                    </div>
                </div>
            </section>

            {/* Social Responsibility */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden glow-border">
                        <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px] -z-10" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 rounded-full blur-[80px] -z-10" />
                        <div className="relative reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                Social Responsibility
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Every Signup Feeds Someone in Need</h2>
                            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                                For <span className="text-emerald-400 font-bold">every restaurant</span> that signs up,
                                we donate <span className="text-emerald-400 font-bold">₹100</span> to local food banks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-purple-900/5 -z-10" />
                <div className="max-w-3xl mx-auto text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Restaurant?</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Join hundreds of restaurants already using Aerobill. Start free, upgrade when you&apos;re ready.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register" className="cta-btn inline-block text-center text-lg">Start For Free →</Link>
                        <a
                            href="https://www.assetmagnets.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/5 transition"
                        >
                            Visit ASSETMAGNETS
                        </a>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
