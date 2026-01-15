import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Pricing - Aerobill | Restaurant Management Software Plans",
    description: "Simple, transparent pricing for Aerobill restaurant management software. Start free forever or upgrade for more features. No hidden fees, no commissions.",
}

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "₹0",
            period: "/forever",
            tables: "5",
            products: "15",
            features: [
                "Basic QR ordering",
                "Customer menu",
                "Simple billing",
                "1 user account",
            ],
            cta: "Start Free",
            popular: false,
        },
        {
            name: "Standard",
            price: "₹299",
            period: "/month",
            tables: "10",
            products: "50",
            features: [
                "Everything in Free",
                "Kitchen display",
                "Order history",
                "Email support",
                "3 user accounts",
            ],
            cta: "Get Standard",
            popular: false,
        },
        {
            name: "Premium",
            price: "₹999",
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
        },
        {
            name: "Elite",
            price: "₹1,999",
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
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Aerobill" width={150} height={50} className="h-12 w-auto" />
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
                        <Link href="/pricing" className="text-white font-medium">Pricing</Link>
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

            {/* Hero */}
            <section className="pt-32 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-6">
                        💰 Simple, Transparent Pricing
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Choose the Plan That
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]"> Fits Your Restaurant</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Start free forever. Upgrade when you need more. No hidden fees, no commissions, no surprises.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((p, i) => (
                            <div
                                key={i}
                                className={`bg-[#1a1a2e] rounded-2xl p-6 border ${p.popular ? "border-[#ff6b35] shadow-lg shadow-[#ff6b35]/20" : "border-white/10"
                                    } relative hover:border-[#ff6b35]/50 transition`}
                            >
                                {p.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff6b35] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{p.price}</span>
                                    <span className="text-gray-400">{p.period}</span>
                                </div>
                                <div className="text-sm text-gray-400 mb-4 pb-4 border-b border-white/10">
                                    <div>📦 {p.tables} Tables</div>
                                    <div>🍽️ {p.products} Products</div>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {p.features.map((f, j) => (
                                        <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                                            <span className="text-[#ff6b35] mt-0.5">✓</span>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className={`block w-full text-center py-3 rounded-lg font-medium transition ${p.popular
                                        ? "bg-[#ff6b35] text-white hover:bg-[#ff8c5a]"
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

            {/* Features Comparison */}
            <section className="py-20 px-4 bg-[#111827]/50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">All Plans Include</h2>
                        <p className="text-gray-400">Core features available on every plan</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: "📱", title: "QR Code Ordering", desc: "Customers scan & order from their phones" },
                            { icon: "🧾", title: "Digital Billing", desc: "Generate bills with one click" },
                            { icon: "🔒", title: "Secure & Reliable", desc: "Bank-grade security, 99.9% uptime" },
                            { icon: "📊", title: "Basic Analytics", desc: "Track daily orders and revenue" },
                            { icon: "🌐", title: "Cloud-Based", desc: "Access from anywhere, any device" },
                            { icon: "🔄", title: "Free Updates", desc: "Always get the latest features" },
                        ].map((f, i) => (
                            <div key={i} className="glass-card p-6 text-center">
                                <div className="text-3xl mb-3">{f.icon}</div>
                                <h3 className="font-semibold mb-1">{f.title}</h3>
                                <p className="text-gray-400 text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-400">Got questions? We&apos;ve got answers.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass-card p-6">
                                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                                <p className="text-gray-400">{faq.a}</p>
                            </div>
                        ))}
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

            {/* CTA */}
            <section className="py-20 px-4 bg-[#111827]/50">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-400 mb-8">
                        Join hundreds of restaurants already using Aerobill. Start with our free plan today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
                        >
                            Start Free Trial →
                        </Link>
                        <Link
                            href="/about"
                            className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition"
                        >
                            Learn More
                        </Link>
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
