import Link from "next/link"
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

const fallbackMetadata: Metadata = {
    title: "Pricing - Aerobill | Affordable Restaurant Management Software Plans",
    description: "Simple, transparent pricing for Aerobill restaurant management software. Start free forever or upgrade for more features. No hidden fees, no commissions. Plans from ₹0/month.",
    keywords: ["aerobill pricing", "restaurant software cost", "pos system pricing", "free restaurant management", "qr ordering price"],
    openGraph: {
        title: "Aerobill Pricing - Restaurant Management Software Plans",
        description: "Start free forever. Plans from ₹0/month. No commissions, no hidden fees. Choose the plan that fits your restaurant.",
        url: "https://www.aerobill.in/pricing",
        siteName: "Aerobill",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aerobill Pricing" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Aerobill Pricing - Plans from ₹0/month",
        description: "Simple, transparent pricing. Free forever plan available. No hidden fees.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.aerobill.in/pricing",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/pricing", fallbackMetadata)
}

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "₹0",
            originalPrice: null,
            period: "/forever",
            tables: "5",
            products: "30",
            features: [
                "Basic QR ordering",
                "Customer menu",
                "Simple billing",
                "1 user account",
            ],
            cta: "Start Free",
            popular: false,
            color: "#10b981",
            icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            name: "Standard",
            price: "₹299",
            originalPrice: "₹499",
            period: "/month",
            tables: "10",
            products: "100",
            features: [
                "Everything in Free",
                "Kitchen display",
                "Order history",
                "Email support",
                "3 user accounts",
            ],
            cta: "Get Standard",
            popular: false,
            color: "#818cf8",
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
        },
        {
            name: "Premium",
            price: "₹999",
            originalPrice: null,
            period: "/month",
            tables: "25",
            products: "Unlimited",
            features: [
                "Everything in Standard",
                "Inventory tracking",
                "Analytics dashboard",
                "Priority support",
                "10 user accounts",
                "Custom reports",
            ],
            cta: "Go Premium",
            popular: true,
            color: "#ff6b35",
            icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
        },
        {
            name: "Elite",
            price: "₹1,999",
            originalPrice: null,
            period: "/month",
            tables: "Unlimited",
            products: "Unlimited",
            features: [
                "Everything in Premium",
                "Custom branding",
                "API access",
                "Dedicated support",
                "Unlimited users",
                "White-label option",
            ],
            cta: "Contact Sales",
            popular: false,
            color: "#a855f7",
            icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
        },
    ]

    const faqs = [
        {
            q: "Can I switch plans anytime?",
            a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing.",
        },
        {
            q: "Is there a contract or commitment?",
            a: "No contracts, no commitments. All plans are month-to-month. Cancel anytime with no cancellation fees.",
        },
        {
            q: "Do you charge commissions on orders?",
            a: "Never! Unlike food delivery platforms, we charge a simple monthly fee. You keep 100% of your order revenue.",
        },
        {
            q: "What payment methods do you accept?",
            a: "We accept all major credit/debit cards, UPI, net banking, and wallet payments through our secure payment gateway.",
        },
        {
            q: "Is there a free trial for paid plans?",
            a: "Yes! Start with our Free plan to explore features, then upgrade when you're ready. No credit card required to start.",
        },
        {
            q: "Can I get a custom plan for my restaurant chain?",
            a: "Absolutely! Contact our sales team for custom enterprise solutions tailored to multi-location restaurant chains.",
        },
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            {/* Hero */}
            <section className="pt-28 pb-12 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b35]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#818cf8]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-4xl mx-auto text-center">
                    <div className="reveal-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Simple, Transparent Pricing
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Choose the Plan That <span className="gradient-text">Fits Your Restaurant</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            Start free forever. Upgrade when you need more. No hidden fees, no commissions, no surprises.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((p, i) => (
                            <div
                                key={i}
                                className={`feature-card relative !rounded-3xl reveal-up delay-${i + 1} ${p.popular ? "!border-[#ff6b35]/50 shadow-lg shadow-[#ff6b35]/10" : ""}`}
                            >
                                {p.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg shadow-[#ff6b35]/30">
                                        Most Popular
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${p.color}15` }}>
                                    <svg className="w-6 h-6" style={{ color: p.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} /></svg>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                                <div className="mb-4">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-extrabold text-white">{p.price}</span>
                                        {p.originalPrice && (
                                            <span className="text-lg text-gray-500 line-through decoration-red-500/50">
                                                {p.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-gray-500 text-sm">{p.period}</span>
                                </div>

                                <div className="text-sm text-gray-400 mb-4 pb-4 border-b border-white/10 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" /></svg>
                                        {p.tables} Tables
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                        {p.products} Products
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {p.features.map((f, j) => (
                                        <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                                            <svg className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/register"
                                    className={`block w-full text-center py-3 rounded-xl font-medium transition-all duration-300 ${p.popular
                                        ? "bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white hover:shadow-lg hover:shadow-[#ff6b35]/30 hover:-translate-y-0.5"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    {p.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            {/* Features Included */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 reveal-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">All Plans <span className="gradient-text">Include</span></h2>
                        <p className="text-gray-400">Core features available on every plan</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", title: "QR Code Ordering", desc: "Customers scan & order from their phones", color: "blue" },
                            { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Digital Billing", desc: "Generate bills with one click", color: "orange" },
                            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Secure & Reliable", desc: "Bank-grade security, 99.9% uptime", color: "rose" },
                            { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Basic Analytics", desc: "Track daily orders and revenue", color: "purple" },
                            { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", title: "Cloud-Based", desc: "Access from anywhere, any device", color: "green" },
                            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: "Free Updates", desc: "Always get the latest features", color: "amber" },
                        ].map((f, i) => (
                            <div key={i} className={`feature-card text-center reveal-up delay-${i + 1}`}>
                                <div className={`icon-box icon-box-${f.color} mx-auto mb-4`}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                                </div>
                                <h3 className="font-bold text-white mb-1">{f.title}</h3>
                                <p className="text-gray-400 text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            {/* FAQ */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12 reveal-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
                        <p className="text-gray-400">Got questions? We&apos;ve got answers.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group faq-card [&_summary::-webkit-details-marker]:hidden reveal-up">
                                <summary className="cursor-pointer list-none flex justify-between items-center font-bold text-white text-lg">
                                    <span className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-[#ff6b35] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {faq.q}
                                    </span>
                                    <span className="text-[#ff6b35] group-open:rotate-45 transition-transform duration-300 text-2xl flex-shrink-0 ml-4">+</span>
                                </summary>
                                <div className="pt-3 pl-8 text-gray-400 leading-relaxed">{faq.a}</div>
                            </details>
                        ))}
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
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                For <span className="text-emerald-400 font-bold">every restaurant</span> that signs up,
                                we donate <span className="text-emerald-400 font-bold">₹100</span> to local food banks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-purple-900/5 -z-10" />
                <div className="max-w-3xl mx-auto text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Join hundreds of restaurants already using Aerobill. Start with our free plan today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register" className="cta-btn inline-block text-center text-lg">Start For Free →</Link>
                        <Link href="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/5 transition">Learn More</Link>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
