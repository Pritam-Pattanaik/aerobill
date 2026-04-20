import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "QR Code Ordering System for Restaurants | Aerobill",
    description: "Let your customers scan, browse a digital menu, and order from their phone. Contactless QR code ordering with instant KOT integration.",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#818cf8]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff6b35]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos/overview" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#818cf8]">QR Code Ordering</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#818cf8]/10 border border-[#818cf8]/20 text-[#818cf8] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                                Contactless Ordering
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Touchless QR Code <span className="gradient-text">Menu & Ordering</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Turn tables 25% faster and elevate the diner experience. Customers scan, browse your beautiful menu, and order — all from their own phone.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="cta-btn inline-block text-center">Get Started Free</Link>
                            </div>
                        </div>

                        <div className="reveal-right delay-2">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float">
                                    {/* Phone mockup */}
                                    <div className="bg-[#111] rounded-2xl border border-white/10 p-4 max-w-[280px] mx-auto">
                                        <div className="flex items-center justify-center gap-1 mb-3">
                                            <div className="w-2 h-2 rounded-full bg-white/20" />
                                            <div className="w-16 h-1 rounded-full bg-white/10" />
                                        </div>
                                        <div className="text-center text-xs text-gray-500 mb-3">📱 Digital Menu</div>
                                        <div className="space-y-2">
                                            {[
                                                { name: "Butter Chicken", price: "₹350", tag: "🔥 Popular" },
                                                { name: "Paneer Tikka", price: "₹280", tag: "🌿 Veg" },
                                                { name: "Garlic Naan", price: "₹60", tag: "" },
                                            ].map((item, i) => (
                                                <div key={i} className="bg-white/5 rounded-lg p-3 flex justify-between items-center border border-white/5 hover:border-[#818cf8]/30 transition">
                                                    <div>
                                                        <div className="text-white text-sm font-medium">{item.name}</div>
                                                        {item.tag && <span className="text-xs text-gray-500">{item.tag}</span>}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#ff6b35] text-sm font-bold">{item.price}</span>
                                                        <div className="w-6 h-6 rounded-full bg-[#ff6b35]/20 flex items-center justify-center">
                                                            <svg className="w-3 h-3 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-3 bg-[#ff6b35] text-white text-center text-sm py-2.5 rounded-lg font-medium">
                                            Place Order (3 items)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { num: "25%", label: "Faster Table Turns" },
                        { num: "₹0", label: "Menu Print Costs" },
                        { num: "No App", label: "Required by Diners" },
                        { num: "Instant", label: "Menu Updates" },
                    ].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}>
                            <div className="stat-number text-2xl">{s.num}</div>
                            <span className="text-sm text-gray-500">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center reveal-up">How It <span className="gradient-text">Works</span></h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center mb-12 reveal-up delay-1">From scan to serve in 3 simple steps</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", title: "Scan QR Code", desc: "Customer scans the unique QR code placed on their table using their phone camera.", color: "blue" },
                            { step: "02", icon: "M4 6h16M4 10h16M4 14h16M4 18h16", title: "Browse & Order", desc: "An interactive digital menu pops up. Select dishes, customize, and add to cart.", color: "purple" },
                            { step: "03", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", title: "Auto-KOT to Kitchen", desc: "Order goes straight to the kitchen display. No waiter needed. Food prep starts instantly.", color: "orange" },
                        ].map((s, i) => (
                            <div key={i} className={`feature-card text-center reveal-up delay-${i + 1}`}>
                                <div className="text-4xl font-extrabold text-white/5 mb-4">{s.step}</div>
                                <div className={`icon-box icon-box-${s.color} mx-auto mb-5`}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                                <p className="text-gray-400 text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center reveal-up">Key Features</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Interactive Menus", desc: "Show mouth-watering food photos that make customers order more.", color: "purple" },
                            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Direct to KOT", desc: "Orders bypass waiters and go straight to the kitchen display.", color: "orange" },
                            { icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z", title: "Dynamic Pricing", desc: "Update prices and out-of-stock items in real-time, instantly.", color: "amber" },
                            { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Table Payments", desc: "Customers pay via UPI securely directly from their phone.", color: "green" },
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
                            { q: "Do diners need to install an app?", a: "No! They just scan the QR code with their camera. Works instantly in any browser." },
                            { q: "Can waiters still take orders?", a: "Absolutely. Waiter-taken orders sync with QR orders into the same single table bill." },
                            { q: "Can I hide out-of-stock items?", a: "Yes. Mark an item as out-of-stock on POS and it vanishes from the QR menu instantly." },
                            { q: "Does it support payments?", a: "Yes. Major Indian payment gateways are natively supported for table-side checkout." },
                        ].map((faq, i) => (
                            <details key={i} className={`faq-card group reveal-up delay-${i + 1}`}>
<summary className="flex items-center justify-between cursor-pointer list-none select-none"><div className="flex-1 pr-4">
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#818cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {faq.q}
                                </h3>
                                </div><span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span></summary>
<p className="mt-4 animate-in fade-in slide-in-from-top-2 text-gray-400 text-sm leading-relaxed pl-7">{faq.a}</p>
                            </details>))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#818cf8]/5 to-[#ff6b35]/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Go contactless today</h2>
                    <p className="text-gray-400 mb-8 text-lg">Let your customers order from their phones. It&apos;s the future.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book a Free Demo →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
