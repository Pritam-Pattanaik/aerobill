import Link from "next/link"
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"
import TestimonialCarousel from "@/components/TestimonialCarousel"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

// SEO Metadata for Homepage
const fallbackMetadata: Metadata = {
  metadataBase: new URL("https://www.aerobill.in"),
  title: "Best Restaurant Management Software in India | POS & Billing Software – Aerobill",
  description: "Aerobill offers advanced Restaurant Management Software in India with smart POS system, GST-compliant billing, inventory management, QR ordering, and real-time analytics. Simplify restaurant operations with our powerful cloud-based solution.",
  keywords: [
    "restaurant management software",
    "QR code ordering system",
    "restaurant POS",
    "digital menu",
    "kitchen display system",
    "restaurant billing software",
    "table management",
    "restaurant inventory management",
    "online ordering for restaurants",
    "contactless ordering",
  ],
  authors: [{ name: "Aerobill" }],
  creator: "Aerobill",
  publisher: "Aerobill",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aerobill.in",
    siteName: "Aerobill",
    title: "Aerobill - Best Restaurant Management Software | QR Code Ordering",
    description: "Transform your restaurant with QR-based ordering, real-time kitchen display, smart billing & powerful analytics. No hardware needed. Free plan available!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aerobill - Restaurant Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerobill - Best Restaurant Management Software",
    description: "QR-based ordering, kitchen display, smart billing & analytics. Transform your restaurant today!",
    images: ["/og-image.png"],
    creator: "@aerobill",
  },
  alternates: {
    canonical: "https://www.aerobill.in",
  },
  category: "Technology",
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("/", fallbackMetadata)
}

// JSON-LD Structured Data for Rich Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // FAQ Schema for Featured Snippets
    {
      "@type": "FAQPage",
      "@id": "https://www.aerobill.in/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Aerobill?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aerobill is a cloud-based Restaurant Management Software in India that helps restaurants manage billing, inventory, kitchen operations, and multi-outlet control from one centralized dashboard.",
          },
        },
        {
          "@type": "Question",
          name: "Is Aerobill GST-compliant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Aerobill provides fully GST-compliant Restaurant Billing Software in India, allowing you to generate tax invoices, manage GST reports, and stay compliant with Indian regulations.",
          },
        },
        {
          "@type": "Question",
          name: "Does Aerobill include a Restaurant POS system?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Aerobill includes an advanced Restaurant POS Software that enables fast billing, table management, order tracking, and seamless payment processing for restaurants of all sizes.",
          },
        },
        {
          "@type": "Question",
          name: "Can Aerobill manage multiple restaurant outlets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Aerobill allows you to manage multiple restaurant branches from a single dashboard, with real-time sales tracking, centralized reporting, and inventory synchronization.",
          },
        },
        {
          "@type": "Question",
          name: "Does Aerobill offer inventory management?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Aerobill provides real-time inventory and stock management features, including stock alerts, supplier tracking, and automated deductions based on sales activity.",
          },
        },
        {
          "@type": "Question",
          name: "Is Aerobill suitable for small restaurants and cafes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Aerobill is designed for small restaurants, cafes, cloud kitchens, QSRs, and large restaurant chains, offering scalable solutions based on business needs.",
          },
        },
        {
          "@type": "Question",
          name: "Does Aerobill support QR code ordering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Aerobill supports QR-based ordering, allowing customers to scan a QR code, view the digital menu, and place orders directly from their tables.",
          },
        },
        {
          "@type": "Question",
          name: "How can I book a demo of Aerobill?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book a free demo of our Restaurant Management Software through our website to explore features, pricing, and see how Aerobill can simplify your restaurant operations.",
          },
        },
      ],
    },
    // WebSite Schema for Sitelinks Search
    {
      "@type": "WebSite",
      "@id": "https://www.aerobill.in/#website",
      url: "https://www.aerobill.in",
      name: "Aerobill",
      description: "Restaurant Management Software",
      publisher: {
        "@id": "https://www.aerobill.in/#organization",
      },
    },
  ],
}

export default function HomePage() {
  const features = [
    { icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", title: "QR Code Ordering", desc: "Customers scan, browse menu, and order directly from their phones", color: "blue" },
    { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Kitchen Display", desc: "Real-time order management with auto-refresh for kitchen staff", color: "rose" },
    { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Smart Billing", desc: "One-click billing with GST compliance and thermal receipt printing", color: "orange" },
    { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Analytics Dashboard", desc: "Track revenue, orders, and inventory in real-time", color: "purple" },
    { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", title: "Inventory Management", desc: "Monitor stock levels and get low-stock alerts automatically", color: "green" },
    { icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", title: "Table Management", desc: "Manage tables, seating zones, and generate QR codes instantly", color: "amber" },
  ]

  const steps = [
    { num: "01", title: "Sign Up", desc: "Create your restaurant account in under 2 minutes", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
    { num: "02", title: "Add Menu", desc: "Upload your menu items with prices and images", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { num: "03", title: "Print QR Codes", desc: "Generate and print QR codes for each table", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
    { num: "04", title: "Start Receiving", desc: "Customers scan, order, and you deliver!", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  ]

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* SoftwareApplication Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Aerobill",
  "operatingSystem": "Web-based",
  "applicationCategory": "BusinessApplication",
  "description": "Aerobill is a Restaurant Management Software in India that provides Restaurant POS Software, GST-compliant billing, inventory management, QR ordering, and multi-outlet control for restaurants.",
  "url": "https://www.aerobill.in/",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "provider": {
    "@type": "Organization",
    "name": "Aerobill"
  }
}` }} />
      <div className="min-h-screen bg-[#0a0a0a]">
        <PublicHeader />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff6b35]/8 rounded-full blur-[150px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] -z-10" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[100px] -z-10" />

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="reveal-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  Trusted Restaurant Management Software in India
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white">
                  Restaurant Software for <span className="gradient-text">Smart POS & Billing</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                  Aerobill is a powerful Restaurant POS Software and Billing Software designed to simplify daily operations, manage inventory, handle GST billing, and streamline restaurant growth across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register" className="cta-btn inline-block text-center text-lg">
                    Start For Free →
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-[#ff6b35]/30 text-[#ff6b35] font-semibold hover:bg-[#ff6b35]/10 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Book Free Demo
                  </Link>
                </div>
                <p className="text-gray-600 text-sm mt-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  No credit card required • Free forever plan available
                </p>
              </div>

              {/* Animated dashboard preview */}
              <div className="reveal-right delay-2 hidden md:block">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-6 glow-border">
                  <div className="animate-float">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="text-xs text-gray-600 ml-2">dashboard.aerobill.in</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                        <div className="text-lg font-bold text-[#10b981]">₹47K</div>
                        <div className="text-[10px] text-gray-500">Today&apos;s Revenue</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                        <div className="text-lg font-bold text-[#818cf8]">142</div>
                        <div className="text-[10px] text-gray-500">Orders</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                        <div className="text-lg font-bold text-[#ff6b35]">24</div>
                        <div className="text-[10px] text-gray-500">Active Tables</div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-3">
                      <div className="text-[10px] text-gray-500 mb-2">Live Orders</div>
                      <div className="space-y-2">
                        {[
                          { table: "T3", items: "Butter Chicken, Naan ×2", status: "Preparing", color: "#f59e0b" },
                          { table: "T7", items: "Pizza Margherita", status: "Ready", color: "#10b981" },
                          { table: "T1", items: "Biryani, Raita", status: "New", color: "#f43f5e" },
                        ].map((o, i) => (
                          <div key={i} className="flex items-center justify-between text-xs bg-white/[0.03] rounded-lg p-2">
                            <span className="text-white font-medium">{o.table}</span>
                            <span className="text-gray-400 truncate mx-2 flex-1">{o.items}</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: `${o.color}20`, color: o.color }}>{o.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="py-8 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "500+", label: "Active Restaurants", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
              { num: "5L+", label: "Orders Processed", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
              { num: "99.9%", label: "Uptime Guaranteed", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { num: "4.8★", label: "Customer Rating", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
            ].map((s, i) => (
              <div key={i} className={`flex items-center justify-center gap-3 reveal-up delay-${i + 1}`}>
                <svg className="w-6 h-6 text-[#ff6b35] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
                <div>
                  <div className="stat-number text-xl">{s.num}</div>
                  <span className="text-xs text-gray-500">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4 reveal-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">All-in-One Restaurant <span className="gradient-text">POS & Billing</span></h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Aerobill combines Restaurant Management Software, advanced POS system, and smart billing into one easy-to-use platform. From order management to inventory tracking, everything is automated.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider max-w-6xl mx-auto" />

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to <span className="gradient-text">Run Your Restaurant</span></h2>
              <p className="text-gray-400 text-lg">Powerful features designed for modern restaurants</p>
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

        {/* How it Works */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 reveal-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get Started in <span className="gradient-text">4 Simple Steps</span></h2>
              <p className="text-gray-400 text-lg">From signup to first order in under 10 minutes</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={i} className={`feature-card text-center reveal-up delay-${i + 1}`}>
                  <div className="text-4xl font-extrabold text-white/5 mb-2">{s.num}</div>
                  <div className="icon-box icon-box-orange mx-auto mb-4">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
                  </div>
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <TestimonialCarousel />

        {/* Social Responsibility Banner */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden glow-border" style={{ animationDuration: '4s' }}>
              <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px] -z-10" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 rounded-full blur-[80px] -z-10" />
              <div className="relative reveal-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  Social Responsibility
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Every Signup Feeds Someone in Need
                </h2>
                <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                  For <span className="text-emerald-400 font-bold">every restaurant</span> that signs up with Aerobill,
                  we donate <span className="text-emerald-400 font-bold">₹100</span> to local food banks.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="icon-box icon-box-green" style={{ width: 40, height: 40 }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span>Feeding communities together</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="icon-box icon-box-green" style={{ width: 40, height: 40 }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span>Building a hunger-free India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider max-w-6xl mx-auto" />

        {/* Restaurant types */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose <span className="gradient-text">Aerobill POS?</span></h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                Our Restaurant Management Software is designed for restaurants, cafes, QSRs, and cloud kitchens. Easy setup, cloud-based access, and powerful billing automation.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "Smart Restaurant POS System" },
                  { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: "GST-Compliant Restaurant Billing" },
                  { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", text: "Inventory & Stock Management" },
                  { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", text: "Cloud-Based Access Anywhere" },
                  { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", text: "Real-Time Sales & Analytics" },
                ].map((item, i) => (
                  <div key={i} className={`check-item reveal-up delay-${i + 1}`}>
                    <svg className="w-5 h-5 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right delay-2">
              <h2 className="text-2xl font-bold text-white mb-6">Software for Every Food Business</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Fine Dine", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
                  { name: "Cafes", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
                  { name: "QSR & Fast Food", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { name: "Food Courts", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                  { name: "Cloud Kitchens", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
                  { name: "Food Trucks", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
                ].map((type, i) => (
                  <div key={i} className={`feature-card flex items-center gap-3 !p-4 reveal-scale delay-${i + 1}`}>
                    <div className="icon-box icon-box-orange" style={{ width: 40, height: 40 }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={type.icon} /></svg>
                    </div>
                    <span className="text-gray-300 font-medium">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider max-w-6xl mx-auto" />

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 reveal-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
              <p className="text-gray-400">Everything you need to know about Aerobill</p>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "What is Aerobill?",
                  a: "Aerobill is a cloud-based Restaurant Management Software in India that helps restaurants manage billing, inventory, kitchen operations, and multi-outlet control from one centralized dashboard."
                },
                {
                  q: "Is Aerobill GST-compliant?",
                  a: "Yes, Aerobill provides fully GST-compliant Restaurant Billing Software in India, allowing you to generate tax invoices, manage GST reports, and stay compliant with Indian regulations."
                },
                {
                  q: "Does Aerobill include a Restaurant POS system?",
                  a: "Yes, Aerobill includes an advanced Restaurant POS Software that enables fast billing, table management, order tracking, and seamless payment processing for restaurants of all sizes."
                },
                {
                  q: "Can Aerobill manage multiple restaurant outlets?",
                  a: "Yes, Aerobill allows you to manage multiple restaurant branches from a single dashboard, with real-time sales tracking, centralized reporting, and inventory synchronization."
                },
                {
                  q: "Does Aerobill support QR code ordering?",
                  a: "Yes, Aerobill supports QR-based ordering, allowing customers to scan a QR code, view the digital menu, and place orders directly from their tables."
                },
                {
                  q: "How can I book a demo of Aerobill?",
                  a: "You can book a free demo of our Restaurant Management Software through our website to explore features, pricing, and see how Aerobill can simplify your restaurant operations."
                }
              ].map((faq, i) => (
                <details key={i} className="group faq-card [&_summary::-webkit-details-marker]:hidden reveal-up">
                  <summary className="cursor-pointer list-none flex justify-between items-center font-bold text-white text-lg">
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[#ff6b35] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {faq.q}
                    </span>
                    <span className="text-[#ff6b35] group-open:rotate-45 transition-transform duration-300 text-2xl flex-shrink-0 ml-4">+</span>
                  </summary>
                  <div className="pt-3 pl-8 text-gray-400 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-purple-900/5 -z-10" />
          <div className="max-w-3xl mx-auto text-center reveal-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Restaurant?</h2>
            <p className="text-gray-400 mb-8 text-lg">Join hundreds of restaurants already using Aerobill to streamline their operations.</p>
            <Link href="/register" className="cta-btn inline-block text-lg">
              Start For Free →
            </Link>
          </div>
        </section>

        <PublicFooter />
      </div>
    </>
  )
}
