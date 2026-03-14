import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import TestimonialCarousel from "@/components/TestimonialCarousel"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

// SEO Metadata for Homepage
export const metadata: Metadata = {
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
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
        {/* Navigation - Mobile Responsive Header */}
        <PublicHeader />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-6">
              ⭐ Trusted Restaurant Management Software in India
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Restaurant Management Software in India for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]">Smart POS & Billing</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Aerobill is a powerful Restaurant POS Software and Billing Software designed to simplify daily operations, manage inventory, handle GST billing, and streamline restaurant growth across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition">
                Start For Free &rarr;
              </Link>
              <Link href="/contact" className="border border-[#ff6b35]/50 bg-[#ff6b35]/10 text-[#ff6b35] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#ff6b35]/20 transition">
                Book Free Demo
              </Link>
              <Link href="/pricing" className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition">
                View Pricing
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4">No credit card required • Free forever plan available</p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 px-4 bg-[#111827]/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">All-in-One Restaurant POS & Billing Software</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Aerobill combines Restaurant Management Software, advanced POS system, and smart billing software into one easy-to-use platform. From order management to inventory tracking and real-time sales reports, everything is automated for maximum efficiency.
            </p>
          </div>
        </section>

        {/* SEO Content Sections */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-[#1a1a2e] p-8 rounded-2xl border border-white/10">
              <h2 className="text-3xl font-bold mb-8">Key Features of Our Restaurant Management Software</h2>
              <ul className="space-y-4">
                {[
                  "Smart Restaurant POS System",
                  "Fast & Secure Billing Software",
                  "GST-Compliant Restaurant Billing",
                  "Inventory & Stock Management",
                  "QR-Based Ordering System",
                  "Real-Time Sales & Analytics",
                  "Multi-Outlet Management"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] shrink-0">
                      ✓
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Restaurant POS Software in India?</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-10">
                Our Restaurant Management Software in India is designed for restaurants, cafes, QSRs, and cloud kitchens. With easy setup, cloud-based access, and powerful billing automation, Aerobill helps reduce manual errors and increase profits.
              </p>

              <h2 className="text-2xl font-bold mb-6">Restaurant Software for Every Food Business</h2>
              <div className="flex flex-wrap gap-3">
                {["Fine Dine Restaurants", "Cafes", "Quick Service Restaurants", "Food Courts", "Cloud Kitchens"].map((type, i) => (
                  <div key={i} className="px-5 py-2.5 bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-full text-gray-300 hover:border-[#ff6b35]/50 transition">
                    {type}
                  </div>
                ))}
              </div>
            </div>
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

        {/* Growing Businesses SEO Section */}
        <section className="py-20 px-4 bg-[#111827]/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Best Restaurant Management Software for Growing Businesses</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              If you are looking for the best Restaurant Management Software in India, Aerobill offers a scalable solution with advanced POS features and smart billing tools. Our Restaurant Billing Software helps manage daily sales, taxes, inventory, and reporting — all from a single dashboard.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
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
                  q: "Does Aerobill offer inventory management?",
                  a: "Yes, Aerobill provides real-time inventory and stock management features, including stock alerts, supplier tracking, and automated deductions based on sales activity."
                },
                {
                  q: "Is Aerobill suitable for small restaurants and cafes?",
                  a: "Yes, Aerobill is designed for small restaurants, cafes, cloud kitchens, QSRs, and large restaurant chains, offering scalable solutions based on business needs."
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
                <details key={i} className="group border border-white/10 bg-[#1a1a2e] rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="cursor-pointer list-none px-6 py-4 font-semibold text-lg flex justify-between items-center hover:bg-white/5 transition">
                    {faq.q}
                    <span className="text-[#ff6b35] group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
                  </summary>
                  <div className="px-6 pb-4 pt-2 text-gray-400">
                    {faq.a}
                  </div>
                </details>
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
