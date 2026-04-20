import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Best Restaurant POS Software in India | Billing & Management | Aerobill",
    description: "Looking for the best restaurant POS software in India? Aerobill offers fast billing, QR code ordering, inventory management, GST compliance, and cloud-based solutions for restaurants of all sizes. Book a free demo today!",
}

export default function RestaurantPOSPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />
            <div className="pt-24 pb-12 max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-8 border-b border-white/10 pb-4">
                    <Link href="/" className="hover:text-white transition flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Home
                    </Link>
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    <span className="text-gray-300">Restaurant POS</span>
                </div>

                {/* Hero Section */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl -z-10 mix-blend-screen" />

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Best Restaurant <span className="text-[#ff6b35]">POS Software</span> in India
                    </h1>
                    <div className="space-y-4 text-lg md:text-xl text-gray-400 max-w-4xl mb-8">
                        <p>
                            Running a restaurant in today’s competitive market requires more than just good food — it demands speed, accuracy, and smart management. Many restaurant owners struggle with slow billing, stock mismanagement, and lack of business insights.
                        </p>
                        <p>
                            This is where choosing the <strong className="text-white">best restaurant POS software in India</strong> becomes essential. Aerobill provides a powerful and easy-to-use <strong className="text-white">restaurant POS system</strong> that helps streamline billing, manage inventory, track sales, and improve customer experience — all from one platform.
                        </p>
                        <p>
                            Whether you run a cafe, QSR, or multi-outlet restaurant, the right POS software can transform your operations.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-8 relative z-10">
                        <Link href="/register" className="bg-[#ff6b35] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#ff8c5a] transition shadow-[0_0_20px_rgba(255,107,53,0.3)]">
                            Start Free Trial
                        </Link>
                        <Link href="/pricing" className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 border border-white/10 transition">
                            View Pricing
                        </Link>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="py-12 space-y-20">
                    {/* What is */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is Restaurant POS Software?</h2>
                            <p className="text-gray-400 mb-4 text-lg leading-relaxed">
                                Restaurant POS (Point of Sale) software is a complete solution that helps manage billing, orders, inventory, staff, and reporting in a single system.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                A modern <strong className="text-white">restaurant management software in India</strong> allows businesses to automate daily operations, reduce manual errors, and make data-driven decisions.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-2xl">🚀</span> Key Features
                            </h3>
                            <ul className="space-y-3">
                                {["Fast and accurate billing system", "GST-compliant invoices", "Inventory and stock management", "QR code ordering system", "KOT and kitchen integration", "Real-time sales reports", "Multi-user access", "Cloud backup and remote access"].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <svg className="w-5 h-5 text-[#ff6b35] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Features breakdown */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            Complete Restaurant Management Software in India
                        </h2>
                        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
                            Aerobill is designed to handle every aspect of restaurant operations efficiently. It combines multiple tools into one seamless system for better control and performance.
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "Restaurant Billing Software", desc: "Fast and accurate billing is the backbone of any restaurant. Aerobill offers advanced restaurant billing software with GST compliance, quick invoice generation, and smooth payment processing.", link: "Explore our Restaurant Billing Software", url: "/restaurant-pos/restaurant-billing-software" },
                                { title: "Restaurant Inventory Management Software", desc: "Avoid stock shortages and reduce wastage with smart restaurant inventory management software. Track ingredients, monitor usage, and optimize purchasing decisions.", link: "Learn more about Inventory Management Software", url: "/restaurant-pos/inventory-management-software" },
                                { title: "QR Code Ordering System for Restaurants", desc: "Enhance customer convenience with a modern QR code ordering system for restaurants. Customers can scan, view menus, and place orders directly from their phones.", link: "Discover QR Code Ordering System", url: "/restaurant-pos/qr-code-ordering-system" },
                                { title: "KOT (Kitchen Order Ticket) System", desc: "Ensure seamless communication between kitchen and billing with a reliable KOT system for restaurants, reducing delays and improving order accuracy.", link: "Check KOT System", url: "/restaurant-pos/kot-system" },
                                { title: "Table Management System for Restaurants", desc: "Efficient seating and faster service are possible with a smart table management system for restaurants.", link: "View Table Management System", url: "/restaurant-pos/table-management-system" },
                                { title: "Kitchen Display System (KDS)", desc: "Replace traditional paper tickets with a digital kitchen display system (KDS) for restaurants. Improve kitchen efficiency, reduce errors, and ensure faster order preparation with real-time updates.", link: "Explore Kitchen Display System", url: "/restaurant-pos/kitchen-display-system" },
                                { title: "Restaurant Analytics & Reporting", desc: "Make smarter decisions with powerful restaurant analytics and reporting software. Track sales, monitor performance, and gain valuable insights to grow your business.", link: "View Analytics & Reporting", url: "/restaurant-pos/restaurant-analytics-reporting" },
                                { title: "Cloud Kitchen Management", desc: "Manage your cloud kitchen operations effortlessly with dedicated cloud kitchen management software. Handle multiple online orders, streamline workflows, and optimize delivery performance.", link: "Discover Cloud Kitchen Software", url: "/restaurant-pos/cloud-kitchen-management-software" },
                                { title: "Multi-Outlet Management", desc: "Easily manage multiple branches with centralized multi-outlet restaurant management software. Monitor sales, inventory, and staff across all locations from a single dashboard.", link: "Explore Multi-Outlet Management", url: "/restaurant-pos/restaurant-analytics-reporting" },
                                { title: "GST Billing Software", desc: "Stay compliant with Indian tax regulations using reliable GST billing software for restaurants. Generate accurate invoices, manage taxes, and simplify your accounting process.", link: "Learn more about GST Billing", url: "/restaurant-pos/restaurant-billing-software" },
                                { title: "Order Management System", desc: "Streamline your entire order process with an efficient restaurant order management system. Manage dine-in, takeaway, and online orders from one unified platform.", link: "Check Order Management", url: "/restaurant-pos/table-management-system" },
                            ].map((feature, i) => (
                                <Link href={feature.url} key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition group flex flex-col pt-12 mt-[-3rem] block">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff6b35] transition">{feature.title}</h3>
                                    <p className="text-gray-400 mb-6 flex-grow">{feature.desc}</p>
                                    <span className="flex items-center gap-2 text-[#ff6b35] text-sm font-medium group-hover:text-[#ff8c5a] transition mt-auto">
                                        👉 {feature.link}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Choose and Benefits */}
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white">How to Choose the Best Restaurant POS Software in India</h2>
                            <p className="text-gray-400">When selecting a POS system, consider these key factors for long-term growth and smooth operations:</p>
                            <ul className="space-y-3">
                                {["Ease of use and fast billing", "GST compliance and accurate invoicing", "Cloud access and data security", "Real-time reporting and analytics", "Mobile and tablet compatibility", "Customer support and scalability"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300 bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                                        <svg className="w-5 h-5 text-[#ff6b35] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-400 italic pt-2">Choosing the right system ensures smooth operations and long-term business growth.</p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                                <span className="text-3xl">📈</span> Benefits of Using It
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Faster service and reduced wait time",
                                    "Improved billing accuracy",
                                    "Better inventory control",
                                    "Enhanced customer experience",
                                    "Data-driven decision making",
                                    "Easy scalability for growing businesses"
                                ].map((benefit, i) => (
                                    <div key={i} className="bg-gradient-to-br from-white/10 to-transparent p-4 rounded-xl border border-white/10">
                                        <p className="text-gray-300 font-medium">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mid-page CTA */}
                    <div className="text-center bg-gradient-to-r from-[#ff6b35]/20 to-purple-900/20 py-12 px-6 rounded-3xl border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Restaurant?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">Join thousands of restaurants currently growing their operations with Aerobill's powerful POS and management suite.</p>
                        <Link href="/register" className="inline-block bg-[#ff6b35] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#ff8c5a] transition shadow-[0_0_20px_rgba(255,107,53,0.3)]">Start Your Free Trial</Link>
                    </div>

                    {/* Who Should Use It & Why Aerobill */}
                    <div className="grid md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-3xl">🍴</span> Who Should Use This Software?
                            </h2>
                            <p className="text-gray-400 mb-6">This software is ideal for:</p>
                            <div className="flex flex-wrap gap-3">
                                {["Restaurants and fine dining outlets", "Cafes and QSRs", "Cloud kitchens", "Food trucks and small eateries", "Multi-outlet restaurant chains"].map((who, i) => (
                                    <span key={i} className="px-4 py-2 bg-[#ff6b35]/20 text-[#ff8c5a] rounded-full text-sm font-medium border border-[#ff6b35]/30">
                                        {who}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-3xl">💡</span> Why Choose Aerobill?
                            </h2>
                            <p className="text-gray-400 mb-6">Aerobill is built specifically for Indian restaurants looking for a reliable and scalable solution.</p>
                            <ul className="space-y-3 mb-6">
                                {["Easy-to-use interface", "Fast billing and GST compliance", "Complete restaurant management system", "Cloud-based access", "Suitable for all restaurant types"].map((reason, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <svg className="w-5 h-5 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {reason}
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg flex gap-3 text-blue-200">
                                <span className="text-xl">📍</span>
                                <p className="text-sm">Restaurants in growing cities are rapidly adopting <strong className="text-white">restaurant POS software in Bhubaneswar</strong> like Aerobill to improve efficiency and customer experience.</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="border-t border-white/10 pt-16">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions (FAQs)</h2>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {[
                                { q: "What is the best restaurant POS software in India?", a: "The best restaurant POS software in India is one that offers billing, inventory, reporting, and ease of use. Aerobill is a reliable option for restaurants of all sizes." },
                                { q: "Is restaurant POS software necessary for small restaurants?", a: "Yes, POS software helps even small restaurants manage billing, reduce errors, and improve efficiency." },
                                { q: "Can restaurant POS software be used on mobile devices?", a: "Yes, modern POS systems support mobile and tablet usage for flexible operations." },
                                { q: "Does restaurant POS software support GST billing?", a: "Yes, most systems provide GST-compliant billing with accurate tax calculations." },
                                { q: "What features should I look for in restaurant POS software?", a: "Key features include billing, inventory management, reporting, KOT system, and cloud access." },
                                { q: "Is cloud-based restaurant POS software better?", a: "Yes, it allows access to data anytime and improves flexibility and security." },
                                { q: "How much does restaurant POS software cost in India?", a: "Pricing varies depending on features, but many providers offer flexible plans and free demos." },
                                { q: "Can restaurant POS software increase profits?", a: "Yes, it improves efficiency, reduces errors, and provides insights that help increase profitability." },
                                { q: "Is POS software useful for multi-outlet restaurants?", a: "Yes, it allows centralized control and reporting across multiple locations." },
                                { q: "Why choose Aerobill for restaurant POS software?", a: "Aerobill offers a complete solution with billing, inventory, reporting, and cloud access tailored for Indian restaurants." }
                            ].map((faq, i) => (
                                <details key={i} className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex items-center justify-between cursor-pointer list-none">
                                        <h3 className="text-lg font-bold text-white mb-2 pr-4">{faq.q}</h3>
                                        <span className="transition group-open:rotate-180 text-[#ff6b35]">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </span>
                                    </summary>
                                    <p className="text-gray-400 text-sm leading-relaxed mt-4 animate-in fade-in slide-in-from-top-2">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center py-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Take Control of Your Restaurant Today</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Get setup in minutes. No credit card required to start your free trial.</p>
                        <Link href="/register" className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition">Create Free Account</Link>
                    </div>
                </div>
            </div>

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is the best restaurant POS software in India?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The best restaurant POS software in India offers billing, inventory, and reporting features in one system. Aerobill is a reliable option for restaurants of all sizes."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is restaurant POS software necessary for small restaurants?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, POS software helps small restaurants manage billing, reduce errors, and improve operational efficiency."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does restaurant POS software support GST billing?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, most restaurant POS software in India provides GST-compliant billing with accurate tax calculations."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can restaurant POS software be used on mobile devices?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, modern POS systems support mobile and tablet devices, allowing flexible restaurant management."
                                }
                            }
                        ]
                    })
                }}
            />
            <PublicFooter />
        </div>
    )
}
