import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Restaurant Billing Software | Fast GST Billing | Aerobill",
    description: "Lightning fast restaurant billing software with GST compliance, split payments, offline mode, and multi-payment support. Try Aerobill free today.",
    keywords: [
        "restaurant POS software India",
        "best restaurant POS software India",
        "cloud based restaurant POS India",
        "POS software for restaurants India",
        "restaurant POS system with inventory India",
        "affordable restaurant POS software India",
        "small restaurant POS software India",
        "POS software for cafes India",
        "POS software for QSR India",
        "restaurant POS software Bhubaneswar"
    ],
    alternates: {
        canonical: "https://aerobill.in/restaurant-pos/restaurant-billing-software"
    }
}

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is restaurant billing software?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Restaurant billing software is a digital solution that helps restaurants generate bills, manage invoices, and process payments quickly and accurately."
            }
        },
        {
            "@type": "Question",
            "name": "How does restaurant billing software improve billing speed?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Restaurant billing software automates calculations and invoice generation, allowing staff to create bills in seconds and reduce customer wait time."
            }
        },
        {
            "@type": "Question",
            "name": "Is GST billing mandatory for restaurants in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, GST billing is mandatory for GST-registered restaurants. Billing software ensures accurate tax calculation and compliant invoice generation."
            }
        },
        {
            "@type": "Question",
            "name": "Can restaurant billing software generate invoices automatically?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, modern restaurant billing software can automatically generate invoices with item details, taxes, and totals, reducing manual effort."
            }
        },
        {
            "@type": "Question",
            "name": "Does billing software help reduce billing errors?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, automated calculations and predefined tax settings in billing software significantly reduce human errors in billing."
            }
        },
        {
            "@type": "Question",
            "name": "Can restaurant billing software work offline?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, many restaurant billing systems offer offline functionality, allowing billing operations to continue even without an internet connection."
            }
        },
        {
            "@type": "Question",
            "name": "What features should a restaurant billing software include?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Key features include fast billing, GST compliance, invoice generation, payment tracking, and basic sales reporting."
            }
        },
        {
            "@type": "Question",
            "name": "Is restaurant billing software suitable for small businesses?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, restaurant billing software like Aerobill is ideal for small restaurants, cafes, and food stalls to manage billing efficiently and professionally."
            }
        },
        {
            "@type": "Question",
            "name": "How secure is restaurant billing software?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most modern billing software provides secure data storage and backup to protect sales and transaction data."
            }
        },
        {
            "@type": "Question",
            "name": "Why choose Aerobill for restaurant billing software?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aerobill offers fast, GST-compliant billing, an easy-to-use interface, and reliable performance, making it a great choice for restaurant billing in India."
            }
        }
    ]
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            {/* SEO FAQ Schema placed in head via next/script or dangerouslySetInnerHTML */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            
            <PublicHeader />

            {/* Hero */}
            <section className="pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b35]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[150px] -z-10" />

                <div className="max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-gray-500 mb-10 reveal-up">
                        <Link href="/" className="hover:text-white transition flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/restaurant-pos/overview" className="hover:text-white transition">Restaurant POS</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#ff6b35]">Billing Software</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                #1 Billing Software for Restaurants
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Smart Restaurant <span className="gradient-text">Billing Software</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                Process orders faster, eliminate calculation errors, and give your customers a seamless checkout experience with India&apos;s most robust billing platform.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="cta-btn inline-block text-center">Book Free Demo</Link>
                                <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/10 text-gray-300 hover:border-[#ff6b35]/30 hover:text-white transition-all duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    View Pricing
                                </Link>
                            </div>
                        </div>

                        {/* Animated illustration */}
                        <div className="reveal-right delay-2 relative">
                            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-8 glow-border">
                                {/* Floating receipt mockup */}
                                <div className="space-y-4 animate-float">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-white font-bold">Bill #1042</span>
                                            <span className="text-xs text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">GST Applied</span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span className="text-gray-400">Paneer Tikka × 2</span><span className="text-white">₹560</span></div>
                                            <div className="flex justify-between"><span className="text-gray-400">Butter Naan × 4</span><span className="text-white">₹240</span></div>
                                            <div className="flex justify-between"><span className="text-gray-400">Dal Makhani × 1</span><span className="text-white">₹280</span></div>
                                            <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                                                <span className="text-gray-300">Total (incl. GST)</span><span className="text-[#ff6b35] text-lg">₹1,080</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg p-3 text-center text-sm">
                                            <svg className="w-5 h-5 mx-auto mb-1 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                            <span className="text-[#10b981]">Card</span>
                                        </div>
                                        <div className="flex-1 bg-[#818cf8]/10 border border-[#818cf8]/20 rounded-lg p-3 text-center text-sm">
                                            <svg className="w-5 h-5 mx-auto mb-1 text-[#818cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                            <span className="text-[#818cf8]">UPI</span>
                                        </div>
                                        <div className="flex-1 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg p-3 text-center text-sm">
                                            <svg className="w-5 h-5 mx-auto mb-1 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            <span className="text-[#f59e0b]">Cash</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 1: Intro */}
            <section className="py-20 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Best Restaurant Billing Software in India</h2>
                    <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                        Running a successful restaurant today requires more than just good food—it demands speed, accuracy, and smart technology. Choosing the best restaurant billing software in India helps streamline billing, reduce errors, and improve overall efficiency. From small cafés to large restaurant chains, businesses are rapidly adopting digital tools to stay competitive.
                    </p>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Aerobill is a modern, cloud-based restaurant software designed to simplify billing and automate daily operations. Whether you run a café, cloud kitchen, or a growing restaurant in Bhubaneswar, Aerobill provides everything needed to manage operations efficiently.
                    </p>
                    <Link href="/contact" className="cta-btn inline-block px-8 py-4 shadow-xl shadow-[#ff6b35]/20">👉 Book Free Demo</Link>
                </div>
            </section>

            {/* Content Section 2 & 3: Challenges & Why Aerobill */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="reveal-left bg-red-500/5 border border-red-500/10 rounded-3xl p-10 glow-border">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-red-400">🚨 Challenges with Traditional Restaurant Billing</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">Many restaurants still rely on manual or outdated systems, leading to:</p>
                            <ul className="space-y-5">
                                {[
                                    "Slow billing during peak hours",
                                    "Errors in calculations and order management",
                                    "Difficulty generating GST-compliant invoices",
                                    "No real-time sales tracking",
                                    "Poor coordination between billing and kitchen",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1 bg-red-500/20 p-1.5 rounded-full">
                                            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </div>
                                        <span className="text-gray-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 mt-8 text-sm italic">These issues directly impact customer satisfaction and revenue growth.</p>
                        </div>

                        <div className="reveal-right delay-1 bg-[#10b981]/5 border border-[#10b981]/10 rounded-3xl p-10 glow-border">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-[#10b981]">💡 Why Aerobill is the Best Restaurant Billing Software in India</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">Aerobill is built specifically for Indian restaurants and acts as a complete POS system for restaurants that connects billing, kitchen, and management into one platform. With Aerobill, you get:</p>
                            <ul className="space-y-5">
                                {[
                                    "One-click fast billing system",
                                    "GST-compliant billing software for restaurants",
                                    "Real-time sales tracking and reports",
                                    "Mobile-friendly restaurant billing app",
                                    "Seamless integration with kitchen and inventory",
                                    "QR-based ordering for faster service"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1 bg-[#10b981]/20 p-1.5 rounded-full">
                                            <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <span className="text-gray-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 mt-8 text-sm italic">This makes it one of the most easy-to-use restaurant billing software solutions available today.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 4: Advanced Features Grid */}
            <section className="py-24 bg-white/[0.02] border-y border-white/5 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16 reveal-up">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">⚙️ Advanced Features of Restaurant Billing Software</h2>
                        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">Aerobill goes beyond basic billing and works as a complete restaurant automation software for modern businesses.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {[
                            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Smart POS System", desc: "A powerful POS system for restaurants that enables fast, accurate, and error-free billing. This software helps streamline billing, manage orders, and improve operational efficiency for modern restaurants.", color: "orange" },
                            { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "Kitchen Order Ticket (KOT) Management", desc: "Automatically sends orders to the kitchen, improving coordination and reducing delays. The Kitchen Order Ticket (KOT) system ensures smooth communication between billing and kitchen staff.", color: "red" },
                            { icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", title: "QR Code Ordering System", desc: "Customers can scan and place orders instantly, improving table turnover and service speed. With an advanced QR code ordering system, restaurants can offer contactless dining and faster service without increasing staff workload.", color: "blue" },
                            { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", title: "Inventory & Stock Management", desc: "Track stock levels in real time, reduce wastage, and manage supplies efficiently. The built-in restaurant inventory management software ensures accurate stock tracking and better resource utilization.", color: "purple" },
                            { icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z", title: "Table & Order Management", desc: "Handle dine-in, takeaway, and delivery orders smoothly with smart table tracking. Aerobill’s table management system for restaurants helps manage multiple orders efficiently.", color: "green" },
                            { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", title: "Cloud-Based Access", desc: "Access your data anytime, anywhere with secure cloud technology. This cloud-based restaurant software allows owners to monitor reports and manage operations remotely.", color: "indigo" },
                        ].map((f, i) => (
                            <div key={i} className={`feature-card reveal-up delay-${(i % 3) + 1} h-full p-8`}>
                                <div className={`icon-box icon-box-${f.color} mb-6`} style={{ width: 56, height: 56 }}>
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center reveal-up delay-4">
                        <Link href="/register" className="cta-btn inline-block px-10 py-4 font-bold text-lg shadow-xl shadow-[#ff6b35]/20">👉 Start Free Trial</Link>
                    </div>
                </div>
            </section>

            {/* Content Section 5, 6 & 7: Comparison, Benefits & Who Should Use */}
            <section className="py-24 relative">
                <div className="absolute top-1/2 left-0 w-full h-[300px] bg-indigo-900/10 blur-[120px] -z-10 -translate-y-1/2 rounded-[100%]" />
                <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Comparison */}
                    <div className="reveal-left lg:col-span-3">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">📊 Aerobill vs Other Restaurant Billing Software</h2>
                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="p-5 text-white font-semibold flex-1">Feature</th>
                                        <th className="p-5 border-x border-[#ff6b35]/20 text-[#ff6b35] font-bold text-center bg-[#ff6b35]/10 whitespace-nowrap min-w-[120px]">Aerobill</th>
                                        <th className="p-5 text-gray-400 font-semibold text-center whitespace-nowrap min-w-[140px]">Typical Software</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["GST Billing", "✅", "⚠️ Limited"],
                                        ["Mobile Billing App", "✅", "❌"],
                                        ["QR Ordering", "✅", "❌"],
                                        ["KOT System", "✅", "⚠️ Basic"],
                                        ["Cloud Access", "✅", "❌"],
                                        ["Multi-Outlet Management", "✅", "❌"],
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                            <td className="p-5 text-gray-300 font-medium">{row[0]}</td>
                                            <td className="p-5 text-center border-x border-[#ff6b35]/10 bg-[#ff6b35]/5 text-xl">{row[1]}</td>
                                            <td className="p-5 text-center text-gray-500 text-xl filter grayscale opacity-60">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Benefits & Who Should Use */}
                    <div className="space-y-10 lg:col-span-2">
                        <div className="reveal-right delay-1">
                            <h2 className="text-2xl font-bold text-white mb-5">📈 Benefits of Using Restaurant Billing Software</h2>
                            <p className="text-gray-400 mb-6 text-sm">Using a modern restaurant billing software in India provides:</p>
                            <ul className="space-y-4 mb-6">
                                {[
                                    "Faster checkout and reduced waiting time",
                                    "Accurate billing with GST compliance",
                                    "Real-time insights into sales performance",
                                    "Improved staff productivity",
                                    "Better customer experience",
                                    "Easy scalability for multi-outlet restaurants",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="bg-[#ff6b35]/20 p-1.5 rounded-full text-[#ff6b35] shrink-0">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <span className="text-gray-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 text-sm leading-relaxed">Restaurants in growing cities like Bhubaneswar are increasingly adopting such systems to stay competitive and efficient.</p>
                        </div>
                        
                        <div className="reveal-right delay-2 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-3xl p-8 border border-indigo-500/20 glow-border">
                            <h2 className="text-2xl font-bold text-white mb-4">🍽️ Who Should Use Aerobill?</h2>
                            <p className="text-indigo-200/80 mb-6 text-sm leading-relaxed">Whether you need billing software for small restaurants or a scalable enterprise solution, Aerobill adapts to your needs. Ideal for:</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {[
                                    "Small restaurants and cafes",
                                    "Fine dining restaurants",
                                    "Cloud kitchens",
                                    "QSRs and food chains",
                                    "Multi-outlet businesses"
                                ].map((tag, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-black/40 rounded-full text-xs font-medium text-indigo-200 border border-indigo-500/30">{tag}</span>
                                ))}
                            </div>
                            <Link href="/contact" className="cta-btn inline-block text-sm py-3 px-8 shadow-[#ff6b35]/20 shadow-lg w-full text-center">👉 Talk to Our Team</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 8: Top Restaurant Software */}
            <section className="py-24 text-center border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-4xl mx-auto px-4 reveal-up">
                    <div className="inline-flex items-center justify-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">🧠 Top Restaurant Software in India for 2026</h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-6 leading-relaxed max-w-3xl mx-auto">
                        As the food industry evolves, restaurants are moving towards automation and data-driven operations. Aerobill stands out as a top restaurant software in India for 2026 by combining billing, analytics, inventory, and customer experience tools into one platform.
                    </p>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                        Its ease of use, affordability, and advanced features make it a preferred choice for restaurants looking to grow faster and operate smarter.
                    </p>
                </div>
            </section>

            {/* Content Section 9: FAQs */}
            <section className="py-24 border-y border-white/5 relative">
                <div className="absolute inset-0 grid-bg opacity-30 -z-10" />
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center reveal-up">❓ Frequently Asked Questions (FAQs)</h2>
                    <p className="text-gray-400 text-lg text-center mb-16 reveal-up delay-1">Everything you need to know about Aerobill Billing Software</p>

                    <div className="space-y-4">
                        {[
                            { q: "What is restaurant billing software?", a: "Restaurant billing software is a digital solution that helps restaurants generate bills, manage invoices, and process payments quickly and accurately." },
                            { q: "How does restaurant billing software improve billing speed?", a: "Restaurant billing software automates calculations and invoice generation, allowing staff to create bills in seconds and reduce customer wait time." },
                            { q: "Is GST billing mandatory for restaurants in India?", a: "Yes, GST billing is mandatory for GST-registered restaurants. Billing software ensures accurate tax calculation and compliant invoice generation." },
                            { q: "Can restaurant billing software generate invoices automatically?", a: "Yes, modern restaurant billing software can automatically generate invoices with item details, taxes, and totals, reducing manual effort." },
                            { q: "Does billing software help reduce billing errors?", a: "Yes, automated calculations and predefined tax settings in billing software significantly reduce human errors in billing." },
                            { q: "Can restaurant billing software work offline?", a: "Yes, many restaurant billing systems offer offline functionality, allowing billing operations to continue even without an internet connection." },
                            { q: "What features should a restaurant billing software include?", a: "Key features include fast billing, GST compliance, invoice generation, payment tracking, and basic sales reporting." },
                            { q: "Is restaurant billing software suitable for small businesses?", a: "Yes, restaurant billing software like Aerobill is ideal for small restaurants, cafes, and food stalls to manage billing efficiently and professionally." },
                            { q: "How secure is restaurant billing software?", a: "Most modern billing software provides secure data storage and backup to protect sales and transaction data." },
                            { q: "Why choose Aerobill for restaurant billing software?", a: "Aerobill offers fast, GST-compliant billing, an easy-to-use interface, and reliable performance, making it a great choice for restaurant billing in India." },
                        ].map((faq, i) => (
                            <details key={i} className={`faq-card group reveal-up delay-${(i % 5) + 1} overflow-hidden bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-2xl transition-all duration-300`}>
                                <summary className="flex items-center justify-between cursor-pointer list-none select-none p-6">
                                    <div className="flex-1 pr-4">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-[#ff6b35]/10 p-2 rounded-lg shrink-0">
                                                <svg className="w-5 h-5 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <h3 className="text-white text-lg font-bold">{faq.q}</h3>
                                        </div>
                                    </div>
                                    <span className="transition-transform group-open:rotate-180 text-gray-500 bg-white/5 p-2 rounded-full flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-4">
                                    <div className="border-t border-white/10 pt-4 pl-14">
                                        <p className="text-gray-400 text-base leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section 10: Final CTA */}
            <section className="py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 via-black to-purple-900/20 -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff6b35]/10 rounded-full blur-[150px] -z-10" />
                
                <div className="max-w-4xl mx-auto px-4 text-center reveal-up">
                    <div className="inline-flex items-center justify-center p-4 bg-[#ff6b35]/20 rounded-3xl mb-8 border border-[#ff6b35]/30">
                        <svg className="w-10 h-10 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">🚀 Start Using the Best Restaurant Billing Software in India</h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                        If you are searching for the best restaurant billing software in India, Aerobill is a complete solution to manage billing, orders, inventory, and analytics in one place. Designed for modern restaurants across India, including cities like Bhubaneswar, it helps businesses operate faster, smarter, and more efficiently.
                    </p>
                    <Link href="/register" className="cta-btn inline-block px-12 py-5 text-xl font-bold shadow-2xl shadow-[#ff6b35]/30 hover:-translate-y-1 hover:shadow-[#ff6b35]/50 transition-all duration-300">👉 Get Started with Aerobill</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
