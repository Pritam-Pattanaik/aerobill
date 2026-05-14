import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "Best QR Code Ordering System for Restaurants in India | Aerobill",
    description: "Streamline restaurant operations in India with Aerobill’s QR code ordering system. Enable fast, contactless ordering, reduce wait time, and boost customer satisfaction. Book a free demo today.",
    keywords: "QR code ordering software, restaurant QR ordering system, digital menu software, contactless restaurant ordering, restaurant POS software, QR menu ordering India, restaurant billing software, self ordering system, Aerobill QR ordering, restaurant automation software",
    alternates: {
        canonical: "https://www.aerobill.in/restaurant-pos/qr-code-ordering",
    },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a QR code ordering system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A QR code ordering system allows customers to scan a code, view the menu, and place orders using their smartphones without staff assistance."
      }
    },
    {
      "@type": "Question",
      "name": "How does QR code ordering improve restaurant operations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It speeds up order processing, reduces errors, and minimizes staff workload, improving overall efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "Can QR ordering integrate with billing software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it integrates with restaurant billing software to ensure automatic billing and accurate transactions."
      }
    },
    {
      "@type": "Question",
      "name": "Is QR code ordering suitable for small restaurants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it is ideal for small, medium, and large restaurants looking to improve service speed and customer experience."
      }
    },
    {
      "@type": "Question",
      "name": "Does Aerobill provide QR code ordering solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Aerobill offers a complete QR code menu ordering software integrated with POS and billing features."
      }
    }
  ]
};

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
                                Best QR Code <span className="gradient-text">Ordering Software</span> for Restaurants
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                In today’s fast-paced dining environment, speed and convenience matter more than ever. The best QR code ordering software for restaurants in India allows customers to scan a code, view the menu, and place orders directly from their smartphones. This contactless ordering solution reduces wait time, minimizes staff dependency, and enhances overall customer experience. Restaurants adopting QR-based systems are able to streamline operations while offering a modern, tech-driven dining experience.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <Link href="/contact" className="cta-btn inline-block text-center w-full sm:w-auto">Get a Free Demo</Link>
                                <span className="text-sm text-gray-500">Experience seamless QR ordering today.</span>
                            </div>
                        </div>

                        <div className="reveal-right delay-2">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                                <div className="animate-float">
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

            <section className="py-16 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="reveal-up">
                            <h2 className="text-2xl font-bold text-white mb-4">🍽️ What is a QR Code Ordering System?</h2>
                            <p className="text-gray-400 leading-relaxed">
                                A QR code ordering system for restaurants is a digital solution that enables customers to browse menus and place orders by scanning a QR code placed on tables or counters. Instead of waiting for staff, customers can order instantly, making the entire process faster and more efficient. This system is especially useful for busy restaurants looking to improve service speed and reduce manual workload.
                            </p>
                        </div>
                        <div className="reveal-up delay-1">
                            <h2 className="text-2xl font-bold text-white mb-4">🚀 Why Restaurants Need QR Code Ordering</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Traditional ordering methods can slow down service, especially during peak hours. By implementing a QR code menu ordering system, restaurants can eliminate delays and reduce errors in order taking. Customers enjoy a self-service experience, while staff can focus more on food preparation and service quality. This not only improves operational efficiency but also increases table turnover and revenue.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center reveal-up">⚙️ Key Features of QR Code <span className="gradient-text">Ordering Software</span></h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto text-center mb-12 reveal-up delay-1">
                        A modern QR code ordering software comes with powerful features designed to simplify restaurant operations. With these features, the best QR code ordering software for restaurants ensures a smooth and efficient ordering process from start to finish.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Digital Menu", desc: "Digital menu with real-time updates.", color: "purple", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                            { title: "Contactless Processing", desc: "Contactless ordering and payment.", color: "green", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
                            { title: "Multi-device", desc: "Multi-device compatibility (mobile/tablet).", color: "blue", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
                            { title: "Order Tracking", desc: "Order tracking and notifications.", color: "orange", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
                            { title: "Seamless Integration", desc: "Integration with kitchen and billing systems.", color: "amber", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                            { title: "Customizable", desc: "Customizable menu categories and pricing.", color: "rose", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
                        ].map((f, i) => (
                            <div key={i} className={`feature-card reveal-up delay-${i % 3 + 1}`}>
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

            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal-up">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                🔄 Integration with <span className="gradient-text">POS and Billing</span> Systems
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                One of the biggest advantages of QR ordering is its seamless integration with existing systems. Orders placed through the QR system are automatically synced with restaurant billing software, reducing manual entry and ensuring accurate billing.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                When combined with the best restaurant POS software in India, it creates a complete ecosystem where orders, billing, and reporting are fully connected.
                            </p>
                        </div>
                        <div className="reveal-right">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-8 glow-border text-center">
                                <h3 className="text-2xl font-bold text-white mb-6">📊 Benefits of Using QR Code Ordering System</h3>
                                <ul className="text-left space-y-4">
                                    {[
                                        "Faster order placement and processing",
                                        "Reduced dependency on staff",
                                        "Improved order accuracy",
                                        "Contactless and hygienic experience",
                                        "Increased table turnover",
                                        "Better customer satisfaction",
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <div className="w-6 h-6 rounded-full bg-[#818cf8]/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 text-[#818cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8">
                                    <Link href="/contact" className="cta-btn inline-block text-center w-full">Simplify Your Ordering Process Now</Link>
                                    <p className="text-sm text-gray-500 mt-3">Reduce wait time and improve customer experience instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/5 reveal-up delay-1">
                            <h3 className="text-xl font-bold text-white mb-4">📈 Enhancing Customer Experience</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Customer expectations are evolving, and convenience is a top priority. A digital ordering system for restaurants allows customers to browse menus at their own pace, customize orders, and avoid waiting time. This not only improves the dining experience but also encourages repeat visits. Restaurants that adopt QR technology are seen as modern and customer-focused.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/5 reveal-up delay-2">
                            <h3 className="text-xl font-bold text-white mb-4">🏪 Perfect for All Types of Restaurants</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Whether you run a small cafe, fine dining restaurant, or a multi-outlet chain, QR ordering systems can adapt to your needs. A reliable QR code ordering service in India, including growing markets like Bhubaneswar, ensures that the system is scalable and easy to manage. From single-location restaurants to large chains, QR ordering simplifies operations and improves efficiency across all setups.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/5 reveal-up delay-3">
                            <h3 className="text-xl font-bold text-white mb-4">⚡ Reduce Errors & Improve Efficiency</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Manual order taking can lead to communication gaps and mistakes. With a QR code ordering system, orders go directly from the customer to the kitchen, eliminating errors caused by miscommunication. This improves order accuracy and ensures faster service, especially during busy hours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
                    <div className="reveal-up">
                        <h2 className="text-3xl font-bold text-white mb-6">🤝 Why Choose Aerobill for QR Code Ordering</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Aerobill offers a smart and easy-to-use QR ordering solution tailored for modern restaurants. As a trusted QR code ordering service provider, it integrates seamlessly with restaurant billing software and POS systems to create a unified platform.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            With features like real-time order tracking, digital menus, and smooth payment processing, Aerobill helps restaurants deliver a faster and more efficient dining experience.
                        </p>
                    </div>
                    <div className="reveal-up delay-1">
                        <h2 className="text-3xl font-bold text-white mb-6">🔗 Related Solutions</h2>
                        <p className="text-gray-400 mb-6">To fully optimize your restaurant operations, you can also explore:</p>
                        <div className="space-y-4">
                            {[
                                { name: "Restaurant Billing Software", link: "/restaurant-pos/restaurant-billing-software" },
                                { name: "Restaurant Inventory Management Software", link: "/restaurant-pos/inventory-management" },
                                { name: "KOT (Kitchen Order Ticket) System", link: "/restaurant-pos/kot-system" },
                                { name: "Table Management System for Restaurants", link: "/restaurant-pos/table-management-system" },
                            ].map((item, i) => (
                                <Link key={i} href={item.link} className="block bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-xl p-4 flex justify-between items-center group">
                                    <span className="text-gray-300 font-medium group-hover:text-white transition">👉 {item.name}</span>
                                    <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center reveal-up">❓ FAQs – QR Code Ordering System</h2>
                    <div className="grid gap-5">
                        {[
                            { q: "What is a QR code ordering system?", a: "A QR code ordering system allows customers to scan a code, view the menu, and place orders using their smartphones without staff assistance." },
                            { q: "How does QR code ordering improve restaurant operations?", a: "It speeds up order processing, reduces errors, and minimizes staff workload, improving overall efficiency." },
                            { q: "Can QR ordering integrate with billing software?", a: "Yes, it integrates with restaurant billing software to ensure automatic billing and accurate transactions." },
                            { q: "Is QR code ordering suitable for small restaurants?", a: "Yes, it is ideal for small, medium, and large restaurants looking to improve service speed and customer experience." },
                            { q: "Does Aerobill provide QR code ordering solutions?", a: "Yes, Aerobill offers a complete QR code menu ordering software integrated with POS and billing features." },
                        ].map((faq, i) => (
                            <details key={i} className={`faq-card group reveal-up delay-${i + 1}`}>
                                <summary className="flex items-center justify-between cursor-pointer list-none select-none">
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#818cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {faq.q}
                                        </h3>
                                    </div>
                                    <span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
                                </summary>
                                <p className="mt-4 animate-in fade-in slide-in-from-top-2 text-gray-400 text-sm leading-relaxed pl-7">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#818cf8]/5 to-[#ff6b35]/5 -z-10" />
                <div className="max-w-3xl mx-auto px-4 text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🎯 Transform your restaurant operations</h2>
                    <p className="text-gray-400 mb-8 text-lg">Adopting a QR code ordering system for restaurants is a smart step toward modernizing operations and improving customer experience. If you want to stay ahead in the competitive restaurant industry, investing in the best QR code ordering software in India is the right move.</p>
                    <Link href="/contact" className="cta-btn inline-block text-lg">Book Your Free Demo Today →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
