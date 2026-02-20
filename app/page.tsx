import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import TestimonialCarousel from "@/components/TestimonialCarousel"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

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
          description: "5 tables, 30 products, basic features",
        },
        {
          "@type": "Offer",
          name: "Starter Plan",
          price: "299",
          priceCurrency: "INR",
          description: "10 tables, 100 products, kitchen display",
        },
        {
          "@type": "Offer",
          name: "Business Plan",
          price: "999",
          priceCurrency: "INR",
          description: "25 tables, unlimited products, full analytics",
        },
        {
          "@type": "Offer",
          name: "Enterprise Plan",
          price: "1999",
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
        {/* Navigation - Mobile Responsive Header */}
        <PublicHeader />

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
                Start For Free &rarr;
              </Link>
              <Link href="/pricing" className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition">
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

        {/* Testimonials Carousel */}
        <TestimonialCarousel />

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
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
            <p className="text-gray-400 mb-8">Join hundreds of restaurants already using Aerobill to streamline their operations.</p>
            <Link href="/register" className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition">
              Start For Free &rarr;
            </Link>
          </div>
        </section>

        {/* Footer */}
        <PublicFooter />
      </div>
    </>
  )
}
