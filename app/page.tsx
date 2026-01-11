import Link from "next/link"
import type { Metadata } from "next"

// SEO Metadata for Homepage
export const metadata: Metadata = {
  metadataBase: new URL("https://aerobill.in"),
  title: "Aerobill - Best Restaurant Management Software | QR Code Ordering & Billing System",
  description: "Aerobill is India's #1 restaurant management software. QR-based ordering, real-time kitchen display, smart billing & analytics. No hardware needed. Start free today!",
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
    url: "https://aerobill.in",
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
    canonical: "https://aerobill.in",
  },
  category: "Technology",
}

// JSON-LD Structured Data for Rich Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization Schema
    {
      "@type": "Organization",
      "@id": "https://aerobill.in/#organization",
      name: "Aerobill",
      url: "https://aerobill.in",
      logo: {
        "@type": "ImageObject",
        url: "https://aerobill.in/logo.png",
        width: 512,
        height: 512,
      },
      description: "Aerobill is a modern restaurant management software providing QR-based ordering, kitchen display, billing, and analytics solutions.",
      sameAs: [
        "https://twitter.com/aerobill",
        "https://linkedin.com/company/aerobill",
        "https://facebook.com/aerobill",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
    },
    // SoftwareApplication Schema
    {
      "@type": "SoftwareApplication",
      "@id": "https://aerobill.in/#software",
      name: "Aerobill",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Complete restaurant management software with QR code ordering, kitchen display system, smart billing, and real-time analytics.",
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "INR",
          description: "1 table, 10 products, basic features",
        },
        {
          "@type": "Offer",
          name: "Starter Plan",
          price: "499",
          priceCurrency: "INR",
          description: "5 tables, 50 products, kitchen display",
        },
        {
          "@type": "Offer",
          name: "Business Plan",
          price: "999",
          priceCurrency: "INR",
          description: "20 tables, unlimited products, full analytics",
        },
        {
          "@type": "Offer",
          name: "Enterprise Plan",
          price: "2499",
          priceCurrency: "INR",
          description: "Unlimited tables & products, custom branding, API access",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "150",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "QR Code Ordering",
        "Kitchen Display System",
        "Smart Billing",
        "Real-time Analytics",
        "Inventory Management",
        "Table Management",
      ],
    },
    // FAQ Schema for Featured Snippets
    {
      "@type": "FAQPage",
      "@id": "https://aerobill.in/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Aerobill?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aerobill is a modern restaurant management software that offers QR-based ordering, real-time kitchen display, smart billing, and powerful analytics. It helps restaurants digitize their operations without requiring any hardware.",
          },
        },
        {
          "@type": "Question",
          name: "How does QR code ordering work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Customers simply scan the QR code placed on their table, browse your digital menu, and place orders directly from their phones. Orders instantly appear on your kitchen display for preparation.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a free plan available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Aerobill offers a forever-free plan that includes 1 table, 10 products, basic QR ordering, customer menu, and simple billing. No credit card required to start.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need any special hardware?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No special hardware is needed. Aerobill works entirely on web browsers. You just need a device (phone, tablet, or computer) with internet access to manage your restaurant.",
          },
        },
      ],
    },
    // WebSite Schema for Sitelinks Search
    {
      "@type": "WebSite",
      "@id": "https://aerobill.in/#website",
      url: "https://aerobill.in",
      name: "Aerobill",
      description: "Restaurant Management Software",
      publisher: {
        "@id": "https://aerobill.in/#organization",
      },
    },
  ],
}

export default function HomePage() {
  const features = [
    { icon: "📱", title: "QR Code Ordering", desc: "Customers scan, browse menu, and order directly from their phones" },
    { icon: "🍳", title: "Kitchen Display", desc: "Real-time order management with auto-refresh for kitchen staff" },
    { icon: "🧾", title: "Smart Billing", desc: "One-click billing with thermal receipt printing support" },
    { icon: "📊", title: "Analytics Dashboard", desc: "Track revenue, orders, and inventory in real-time" },
    { icon: "📦", title: "Inventory Management", desc: "Monitor stock levels and get low-stock alerts" },
    { icon: "🪑", title: "Table Management", desc: "Manage tables and generate QR codes instantly" },
  ]

  const plans = [
    { name: "Free", price: "₹0", period: "/forever", tables: "1", products: "10", features: ["Basic QR ordering", "Customer menu", "Simple billing"], cta: "Start Free", popular: false },
    { name: "Starter", price: "₹499", period: "/month", tables: "5", products: "50", features: ["Everything in Free", "Kitchen display", "Order history", "Email support"], cta: "Get Started", popular: false },
    { name: "Business", price: "₹999", period: "/month", tables: "20", products: "Unlimited", features: ["Everything in Starter", "Inventory tracking", "Analytics dashboard", "Priority support"], cta: "Go Business", popular: true },
    { name: "Enterprise", price: "₹2,499", period: "/month", tables: "Unlimited", products: "Unlimited", features: ["Everything in Business", "Custom branding", "API access", "Dedicated support"], cta: "Contact Sales", popular: false },
  ]

  const steps = [
    { num: "1", title: "Sign Up", desc: "Create your restaurant account in under 2 minutes" },
    { num: "2", title: "Add Menu", desc: "Upload your menu items with prices and images" },
    { num: "3", title: "Print QR Codes", desc: "Generate and print QR codes for each table" },
    { num: "4", title: "Start Receiving Orders", desc: "Customers scan, order, and you deliver!" },
  ]

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#ff6b35]">Aerobill</Link>
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
              🚀 The Future of Restaurant Management
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Turn Your Restaurant into a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]"> Digital Powerhouse</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              QR-based ordering, real-time kitchen display, smart billing, and powerful analytics — all in one platform. No hardware needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition">
                Start Free Trial →
              </Link>
              <Link href="#pricing" className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition">
                View Pricing
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4">No credit card required • Free forever plan available</p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-[#111827]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need to Run Your Restaurant</h2>
              <p className="text-gray-400">Powerful features designed for modern restaurants</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 hover:border-[#ff6b35]/50 transition">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get Started in 4 Simple Steps</h2>
              <p className="text-gray-400">From signup to first order in under 10 minutes</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 bg-[#111827]/50" id="pricing">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-gray-400">Choose the plan that fits your restaurant</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((p, i) => (
                <div key={i} className={`bg-[#1a1a2e] rounded-2xl p-6 border ${p.popular ? "border-[#ff6b35] shadow-lg shadow-[#ff6b35]/20" : "border-white/10"} relative`}>
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff6b35] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{p.price}</span>
                    <span className="text-gray-400">{p.period}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-4">
                    <div>{p.tables} Tables</div>
                    <div>{p.products} Products</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {p.features.map((f, j) => (
                      <li key={j} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="text-[#ff6b35]">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className={`block w-full text-center py-3 rounded-lg font-medium transition ${p.popular ? "bg-[#ff6b35] text-white hover:bg-[#ff8c5a]" : "bg-white/10 text-white hover:bg-white/20"}`}>
                    {p.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
            <p className="text-gray-400 mb-8">Join hundreds of restaurants already using Aerobill to streamline their operations.</p>
            <Link href="/register" className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition">
              Start Your Free Trial →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">© 2024 Aerobill. All rights reserved.</div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <Link href="#" className="hover:text-white">Privacy</Link>
              <Link href="#" className="hover:text-white">Terms</Link>
              <Link href="#" className="hover:text-white">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
