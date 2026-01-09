import Link from "next/link"

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
            <Link href="#demo" className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition">
              View Demo
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
  )
}
