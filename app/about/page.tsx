import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Aerobill - By ASSETMAGNETS | Restaurant Management Software",
    description: "Learn about Aerobill by ASSETMAGNETS - India's most innovative restaurant management software with QR ordering, kitchen display, and smart billing. Zero commission, 100% cloud-based.",
    keywords: ["about aerobill", "assetmagnets", "restaurant software india", "qr code ordering", "restaurant management"],
    openGraph: {
        title: "About Aerobill - Restaurant Management Software by ASSETMAGNETS",
        description: "India's most innovative restaurant management software. Zero commission, cloud-based QR ordering, kitchen display & billing.",
        url: "https://aerobill.in/about",
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
        canonical: "https://aerobill.in/about",
    },
}

export default function AboutPage() {
    const features = [
        {
            icon: "⚡",
            title: "Lightning Fast Setup",
            desc: "Go live in under 10 minutes. No complex installations, no hardware requirements, no technical expertise needed.",
        },
        {
            icon: "📱",
            title: "Mobile-First Design",
            desc: "Built for the smartphone era. Your customers order from their phones, your staff manages from any device.",
        },
        {
            icon: "🔄",
            title: "Real-Time Sync",
            desc: "Orders flow instantly from customer phones to kitchen displays. No delays, no missed orders, no confusion.",
        },
        {
            icon: "💰",
            title: "Zero Commission",
            desc: "Unlike food delivery apps, we never take a cut from your orders. Pay a simple monthly fee, keep 100% of your revenue.",
        },
        {
            icon: "📊",
            title: "Smart Analytics",
            desc: "Understand your business with real-time dashboards. Track peak hours, popular items, and revenue trends.",
        },
        {
            icon: "🔒",
            title: "Enterprise Security",
            desc: "Bank-grade encryption protects your data. Secure authentication, role-based access, and regular backups.",
        },
    ]

    const comparisons = [
        { feature: "Setup Time", aerobill: "< 10 minutes", others: "Days to weeks" },
        { feature: "Hardware Required", aerobill: "None", others: "POS terminals, printers" },
        { feature: "Monthly Cost", aerobill: "From ₹0", others: "₹2,000 - ₹10,000+" },
        { feature: "Commission on Orders", aerobill: "0%", others: "15-30%" },
        { feature: "QR Ordering", aerobill: "Built-in", others: "Paid add-on" },
        { feature: "Kitchen Display", aerobill: "Included", others: "Extra cost" },
        { feature: "Updates", aerobill: "Automatic & Free", others: "Manual & Paid" },
        { feature: "Support", aerobill: "24/7 Chat & Email", others: "Business hours only" },
    ]

    const stats = [
        { value: "100+", label: "Restaurants Trust Us" },
        { value: "5L+", label: "Orders Processed" },
        { value: "99.9%", label: "Uptime Guaranteed" },
        { value: "4.8★", label: "Customer Rating" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Aerobill" width={150} height={50} className="h-12 w-auto" />
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/about" className="text-white font-medium">About</Link>
                        <Link href="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link>
                        <Link href="/blog" className="text-gray-300 hover:text-white transition">Blog</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-gray-300 hover:text-white transition">Login</Link>
                        <Link href="/register" className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#ff8c5a] transition">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-6">
                        🏢 About Us
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Powering Restaurants with
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]"> Innovation</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Aerobill is a product of <strong className="text-white">ASSETMAGNETS</strong> — a technology company dedicated to building smart solutions for modern businesses.
                    </p>
                    <a
                        href="https://www.assetmagnets.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[#ff6b35] text-[#ff6b35] px-6 py-3 rounded-xl font-semibold hover:bg-[#ff6b35]/10 transition"
                    >
                        Visit ASSETMAGNETS →
                    </a>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="glass-card p-6 text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#ff6b35] mb-2">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-4 bg-[#111827]/50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-4">
                            📖 Our Journey
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Our Story</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">How a simple observation turned into India&apos;s most innovative restaurant management platform</p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff6b35] via-[#ff8c5a] to-[#ff6b35]/20"></div>

                        {/* Timeline items */}
                        <div className="space-y-12 md:space-y-0">
                            {/* Item 1 */}
                            <div className="md:flex md:items-center md:gap-8 relative">
                                <div className="md:w-1/2 md:text-right md:pr-12">
                                    <div className="glass-card p-6 md:p-8 border border-white/10 hover:border-[#ff6b35]/30 transition">
                                        <div className="flex items-center gap-3 mb-4 md:justify-end">
                                            <span className="text-3xl">💡</span>
                                            <h3 className="text-xl font-bold text-[#ff6b35]">The Problem</h3>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed">
                                            We observed restaurants struggling with <strong className="text-white">outdated, expensive systems</strong>. Owners were juggling multiple apps, paying hefty commissions to delivery platforms, and dealing with complicated POS hardware.
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full shadow-lg shadow-[#ff6b35]/30">
                                    <span className="text-lg font-bold">1</span>
                                </div>
                                <div className="md:w-1/2 md:pl-12"></div>
                            </div>

                            {/* Item 2 */}
                            <div className="md:flex md:items-center md:gap-8 relative md:mt-12">
                                <div className="md:w-1/2 md:pr-12"></div>
                                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full shadow-lg shadow-[#ff6b35]/30">
                                    <span className="text-lg font-bold">2</span>
                                </div>
                                <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
                                    <div className="glass-card p-6 md:p-8 border border-white/10 hover:border-[#ff6b35]/30 transition">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-3xl">🚀</span>
                                            <h3 className="text-xl font-bold text-[#ff6b35]">The Solution</h3>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed">
                                            At <strong className="text-white">ASSETMAGNETS</strong>, we believe technology should simplify, not complicate. So we built Aerobill — a complete cloud-based solution. <strong className="text-white">No hardware. No setup hassles. Zero commissions.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="md:flex md:items-center md:gap-8 relative md:mt-12">
                                <div className="md:w-1/2 md:text-right md:pr-12 mt-8 md:mt-0">
                                    <div className="glass-card p-6 md:p-8 border border-white/10 hover:border-[#ff6b35]/30 transition">
                                        <div className="flex items-center gap-3 mb-4 md:justify-end">
                                            <span className="text-3xl">🎯</span>
                                            <h3 className="text-xl font-bold text-[#ff6b35]">Today</h3>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed">
                                            <strong className="text-white">Hundreds of restaurants</strong> across India trust Aerobill daily. From cozy cafes to multi-location chains, we&apos;re helping businesses embrace the digital future — <strong className="text-white">one order at a time</strong>.
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full shadow-lg shadow-[#ff6b35]/30">
                                    <span className="text-lg font-bold">3</span>
                                </div>
                                <div className="md:w-1/2 md:pl-12"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Aerobill is Different */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Makes Aerobill Different</h2>
                        <p className="text-gray-400">Innovative features that set us apart from traditional solutions</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="glass-card p-6 hover:border-[#ff6b35]/50 transition border border-transparent">
                                <div className="text-4xl mb-4">{f.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                <p className="text-gray-400">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-4 bg-[#111827]/50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-4">
                            ⚔️ The Comparison
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Aerobill vs. Traditional Solutions</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">See why hundreds of restaurants are making the switch to Aerobill</p>
                    </div>

                    <div className="glass-card overflow-hidden border border-white/10">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 bg-gradient-to-r from-[#1a1a2e] to-[#111827]">
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
                                    <span className="text-lg">
                                        {i === 0 && "⏱️"}
                                        {i === 1 && "🖥️"}
                                        {i === 2 && "💵"}
                                        {i === 3 && "💰"}
                                        {i === 4 && "📱"}
                                        {i === 5 && "🍳"}
                                        {i === 6 && "🔄"}
                                        {i === 7 && "🎧"}
                                    </span>
                                    <span className="text-gray-300 group-hover:text-white transition">{row.feature}</span>
                                </div>
                                <div className="p-5 border-b border-white/5 text-center bg-[#ff6b35]/5 flex items-center justify-center gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-green-400 font-semibold">{row.aerobill}</span>
                                </div>
                                <div className="p-5 border-b border-white/5 text-center flex items-center justify-center gap-2">
                                    <span className="text-red-400/70">✗</span>
                                    <span className="text-gray-500">{row.others}</span>
                                </div>
                            </div>
                        ))}

                        {/* Bottom Summary */}
                        <div className="grid grid-cols-3 bg-gradient-to-r from-[#1a1a2e] to-[#111827]">
                            <div className="p-5">
                                <span className="text-gray-400 font-medium">Verdict</span>
                            </div>
                            <div className="p-5 text-center bg-[#ff6b35]/5">
                                <span className="text-green-400 font-bold">🏆 Clear Winner</span>
                            </div>
                            <div className="p-5 text-center">
                                <span className="text-gray-500">Outdated</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400 mb-4">Ready to experience the difference?</p>
                        <a href="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#ff6b35]/30 transition">
                            Try Aerobill Free →
                        </a>
                    </div>
                </div>
            </section>

            {/* Social Responsibility Banner */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
                        <div className="relative">
                            <div className="inline-block px-4 py-1.5 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
                                🌱 Social Responsibility
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Every Signup Feeds Someone in Need
                            </h2>
                            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                                For <span className="text-emerald-400 font-bold">every restaurant</span> that signs up with Aerobill,
                                we donate <span className="text-emerald-400 font-bold">₹100</span> to local food banks.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <span className="text-3xl">🍽️</span>
                                    <span>Feeding communities together</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <span className="text-3xl">💚</span>
                                    <span>Building a hunger-free India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
                    <p className="text-gray-400 mb-8">
                        Join hundreds of restaurants already using Aerobill. Start free, upgrade when you&apos;re ready.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
                        >
                            Start For Free →
                        </Link>
                        <a
                            href="https://www.assetmagnets.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition"
                        >
                            Visit ASSETMAGNETS
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-gray-400 text-sm">
                        © 2026 Aerobill by{" "}
                        <a href="https://www.assetmagnets.com/" target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:underline">
                            ASSETMAGNETS
                        </a>
                        . All rights reserved.
                    </div>
                    <div className="flex gap-6 text-gray-400 text-sm">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <Link href="/about" className="hover:text-white">About</Link>
                        <Link href="/pricing" className="hover:text-white">Pricing</Link>
                        <Link href="/blog" className="hover:text-white">Blog</Link>
                        <Link href="#" className="hover:text-white">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
