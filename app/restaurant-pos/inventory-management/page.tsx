import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Best Restaurant Inventory Management Software in India | Fast & Accurate Tracking",
    description: "Take control of your restaurant inventory with Aerobill. Track stock in real time, reduce wastage, and manage purchases easily. Book a free demo today.",
    keywords: "restaurant inventory management software, inventory management software for restaurants, restaurant inventory software India, stock management software restaurant, food inventory management system, inventory software India, Aerobill inventory software",
    alternates: {
        canonical: "https://www.aerobill.in/restaurant-pos/inventory-management"
    }
}

export default function Page() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is restaurant inventory management software?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Restaurant inventory management software is a digital solution that helps restaurants track stock levels, manage ingredients, and reduce wastage efficiently."
                }
            },
            {
                "@type": "Question",
                "name": "How does inventory software reduce food wastage?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Inventory software tracks ingredient usage and provides alerts for overuse or expiry, helping restaurants take timely action and minimize food wastage."
                }
            },
            {
                "@type": "Question",
                "name": "Can inventory software integrate with billing systems?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, inventory software integrates with restaurant billing software to automatically update stock levels after each transaction."
                }
            },
            {
                "@type": "Question",
                "name": "Is inventory management software suitable for small restaurants?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, inventory management software is suitable for small, medium, and large restaurants to efficiently manage stock and reduce manual work."
                }
            },
            {
                "@type": "Question",
                "name": "Does Aerobill provide inventory management features?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Aerobill offers a complete inventory management solution integrated with POS and billing systems to help restaurants manage stock efficiently."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <PublicHeader />

            {/* Hero */}
            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10b981]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos/overview" className="hover:text-white transition whitespace-nowrap">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#10b981] whitespace-nowrap">Inventory Management</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                Aerobill Inventory Software
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Best Restaurant <span className="gradient-text">Inventory Management Software</span> in India <span className="hidden">| Aerobill</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Managing inventory efficiently is one of the biggest challenges in the restaurant industry. From tracking raw materials to minimizing wastage, everything depends on how well your inventory is controlled. With the best restaurant inventory management software in India, restaurants can monitor stock in real time, automate updates, and improve operational efficiency. When integrated with a powerful restaurant POS software, it ensures that every sale reflects accurately in your inventory, eliminating manual errors and saving time.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="cta-btn inline-block text-center">Book a Free Demo</Link>
                            </div>
                        </div>

                        {/* Animated stock dashboard graphic */}
                        <div className="reveal-right delay-2 relative hidden md:block">
                            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float space-y-3">
                                    <div className="text-sm text-gray-500 mb-2">Live Stock Tracking</div>
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

            {/* Why Inventory Management is Important */}
            <section className="py-20 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div className="reveal-left">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 aspect-video flex items-center justify-center">
                             <svg className="w-32 h-32 text-indigo-400/50 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                    </div>
                    <div className="reveal-right">
                        <h2 className="text-3xl font-bold text-white mb-6">Why Inventory Management is <span className="text-indigo-400">Important for Restaurants</span></h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Inventory plays a crucial role in maintaining food quality, controlling costs, and ensuring smooth kitchen operations. Without a proper system, restaurants often face issues like overstocking, understocking, and unnecessary wastage.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            By using the best inventory management software for restaurants, businesses can maintain optimal stock levels and avoid last-minute shortages. It also works seamlessly with restaurant billing software, ensuring that every transaction automatically updates stock levels without manual intervention.
                        </p>
                        <Link href="/contact" className="cta-btn inline-block">Book a Free Demo</Link>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center reveal-up">Key Features of the Best <span className="gradient-text">Restaurant Inventory</span> Management Software</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center mb-12 reveal-up delay-1">A modern inventory system comes equipped with essential features that simplify daily operations and improve accuracy:</p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Real-time stock tracking", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "green" },
                            { title: "Automatic stock deduction after each sale", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "blue" },
                            { title: "Low stock alerts and notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", color: "amber" },
                            { title: "Supplier and purchase management", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "purple" },
                            { title: "Wastage tracking and control", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", color: "red" },
                            { title: "Batch and expiry management", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "indigo" },
                        ].map((f, i) => (
                            <div key={i} className={`feature-card reveal-up delay-${i + 1} flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition`}>
                                <div className={`icon-box icon-box-${f.color} flex-shrink-0`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center reveal-up delay-7">
                        <div className="inline-block p-4 rounded-xl bg-white/5 border border-white/10">
                             <div className="flex items-center gap-3 text-left">
                                <svg className="w-8 h-8 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <h4 className="text-white font-medium">Detailed inventory reports</h4>
                                    <p className="text-sm text-gray-400">With these features, the restaurant inventory management software provides complete visibility over stock movement and helps prevent losses caused by poor inventory handling.</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            {/* Seamless Integration */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div className="reveal-left order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-white mb-6">Seamless Integration with <span className="text-[#10b981]">POS and Billing Systems</span></h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            One of the biggest advantages of using inventory software is its seamless integration with billing and POS systems. Every time an order is processed through restaurant billing software, the system automatically deducts the required ingredients from inventory.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            This ensures accurate tracking without manual updates. When used alongside the restaurant POS software in India, it creates a fully automated system that connects billing, orders, and inventory into one streamlined workflow.
                        </p>
                    </div>
                    <div className="reveal-right order-1 md:order-2">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#10b981]/10 to-blue-500/10 p-8 aspect-video flex items-center justify-center glow-border">
                            <div className="flex items-center justify-between w-full max-w-xs">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <svg className="w-8 h-8 text-[#10b981] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                     <svg className="w-10 h-10 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits List */}
            <section className="py-20 bg-white/[0.01] border-y border-white/5">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12 reveal-up">
                        <h2 className="text-3xl font-bold text-white mb-4">Benefits of Using <span className="gradient-text">Inventory Management Software</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Implementing a smart inventory system provides multiple benefits that directly impact business performance:</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {[
                            "Reduces food wastage and spoilage",
                            "Improves stock visibility and control",
                            "Saves time by automating manual tasks",
                            "Prevents stock shortages during peak hours",
                            "Enhances overall profitability"
                        ].map((benefit, i) => (
                             <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 reveal-up delay-${i + 1}`}>
                                <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-4 text-[#10b981]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h3 className="text-white font-medium text-lg">{benefit}</h3>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#10b981]/10 to-transparent border-l-4 border-[#10b981] p-6 rounded-r-xl max-w-3xl mx-auto reveal-up">
                        <p className="text-gray-300">
                            By adopting the inventory management software for restaurants in India, businesses can improve efficiency and make better operational decisions based on real-time data.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3 Sections in alternating layout */}
            <section className="py-20 space-y-24">
                {/* Advanced Inventory Insights & Reporting */}
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                     <div className="reveal-left">
                        <h2 className="text-3xl font-bold text-white mb-6">Advanced Inventory <span className="text-amber-400">Insights & Reporting</span></h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Data-driven decision-making is essential for scaling a restaurant business. With advanced reporting tools, restaurant owners can analyze stock consumption, identify high-usage items, and optimize purchasing decisions.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            The insights provided by the best restaurant inventory management software help forecast demand, reduce unnecessary expenses, and improve profit margins over time.
                        </p>
                    </div>
                    <div className="reveal-right">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 aspect-video flex items-center justify-center">
                             <svg className="w-32 h-32 text-amber-400/50 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Multi-Outlet Inventory Management Made Easy */}
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div className="reveal-left order-2 md:order-1">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8 aspect-video flex items-center justify-center">
                            <svg className="w-32 h-32 text-blue-400/50 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                    </div>
                    <div className="reveal-right order-1 md:order-2">
                        <h2 className="text-3xl font-bold text-white mb-6">Multi-Outlet Inventory <span className="text-blue-400">Management Made Easy</span></h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            For restaurant chains and multi-outlet businesses, managing inventory across locations can be complex. A centralized system allows owners to track stock across all outlets, transfer inventory between locations, and maintain consistency.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            With integrated restaurant POS software, businesses can manage multiple outlets efficiently while ensuring accurate inventory tracking across all branches.
                        </p>
                    </div>
                </div>

                {/* Reduce Losses and Improve Cost Control */}
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div className="reveal-left">
                        <h2 className="text-3xl font-bold text-white mb-6">Reduce Losses and <span className="text-red-400">Improve Cost Control</span></h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Inventory mismanagement often leads to hidden losses that impact overall profitability. Issues like theft, wastage, and incorrect stock entries can go unnoticed without proper tracking.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Using the restaurant inventory management software in Bhubaneswar like cities, businesses can monitor every stock movement, identify discrepancies, and take corrective action immediately. This improves cost control and ensures better financial management.
                        </p>
                    </div>
                    <div className="reveal-right">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-red-500/10 to-pink-500/10 p-8 aspect-video flex items-center justify-center">
                             <svg className="w-32 h-32 text-red-400/50 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Automation */}
            <section className="py-16 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20 border-y border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl font-bold text-white mb-6">Automation That Saves Time and Effort</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Manual inventory tracking is time-consuming and prone to errors. Automation simplifies this process by updating stock levels in real time and generating alerts when inventory is low. When integrated with restaurant billing software, it eliminates the need for manual stock updates and reduces workload for staff, allowing them to focus more on customer service.
                    </p>
                </div>
            </section>

            {/* Why Choose Aerobill */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div className="reveal-left">
                        <h2 className="text-3xl font-bold text-white mb-6">Why Choose Aerobill for <span className="gradient-text">Inventory Management</span></h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Aerobill provides a complete solution tailored for modern restaurants in India. It combines inventory tracking, billing, and reporting into one easy-to-use platform.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            With seamless integration with restaurant POS software and restaurant billing software, Aerobill ensures accurate stock management and smooth operations. Its user-friendly interface and powerful features make it a reliable choice for businesses looking for the best restaurant inventory management software.
                        </p>
                        <Link href="/contact" className="cta-btn inline-block">Simplify Your Inventory Today</Link>
                    </div>
                    <div className="reveal-right">
                         <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-8 aspect-video flex flex-col items-center justify-center glow-border">
                             <div className="w-20 h-20 mb-4 bg-gradient-to-br from-[#10b981] to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-[#10b981]/30">
                                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2">Aerobill POS Ecosystem</h3>
                             <p className="text-gray-400 text-center text-sm">All-in-one platform for your restaurant</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="section-divider max-w-6xl mx-auto" />

            {/* Related Solutions */}
            <section className="py-20 bg-white/[0.01]">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6 reveal-up">Related Solutions for <span className="text-indigo-400">Complete Restaurant Management</span></h2>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto reveal-up delay-1">
                        To build a fully optimized restaurant system, you can also explore:
                        These solutions work together with inventory management to create a connected and efficient workflow across all operations.
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 reveal-up delay-2">
                        {[
                            { title: "Restaurant Billing Software", url: "/restaurant-pos/restaurant-billing-software" },
                            { title: "QR Code Ordering System", url: "/restaurant-pos/qr-code-ordering-system" },
                            { title: "KOT System", url: "/restaurant-pos/kot-system" },
                            { title: "Table Management System", url: "/restaurant-pos/table-management-system" }
                        ].map((link, i) => (
                            <Link key={i} href={link.url} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition group text-left">
                                <div className="text-white font-medium mb-2 group-hover:text-[#10b981] transition">{link.title}</div>
                                <div className="flex items-center text-sm text-[#10b981]">
                                    Explore <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center reveal-up">FAQs – Best Restaurant Inventory Management Software</h2>
                    <div className="grid md:grid-cols-1 gap-5">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <details key={i} className={`faq-card group reveal-up delay-${i % 3 + 1}`}>
                                <summary className="flex items-center justify-between cursor-pointer list-none select-none p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition">
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-white font-bold flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {faq.name}
                                        </h3>
                                    </div>
                                    <span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
                                </summary>
                                <div className="p-4 pt-0 mt-2">
                                    <p className="animate-in fade-in slide-in-from-top-2 text-gray-400 text-sm leading-relaxed pl-7">{faq.acceptedAnswer.text}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-indigo-900/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start using Aerobill today and simplify your inventory management.</h2>
                    <p className="text-gray-400 mb-8 text-lg">Efficient stock control is essential for running a profitable restaurant. By using the best restaurant inventory management software, businesses can reduce wastage, improve efficiency, and gain better control over operations. When combined with tools like restaurant POS software and restaurant billing software, it creates a powerful ecosystem that drives growth and long-term success.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Get Started with Aerobill →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
