import { Metadata } from "next"
import Link from "next/link"
import { getActiveServicePages } from "@/app/actions/service-pages"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
  title: "Restaurant Management Services & Solutions | Aerobill",
  description: "Explore Aerobill's comprehensive suite of restaurant management services including POS, Billing, KDS, QR Ordering, Inventory, and CRM software.",
}

export default async function ServicesPage() {
  const result = await getActiveServicePages()
  const servicesData = result.success && result.data ? result.data : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]">Restaurant Solutions</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            From QR ordering to multi-outlet management, Aerobill provides all the tools you need to run, manage, and scale your food business efficiently.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service: any, idx: number) => (
              <Link 
                href={`/services/${service.slug}`} 
                key={idx}
                className="group block bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] font-bold">
                    {idx + 1}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-[#ff6b35] group-hover:border-[#ff6b35] transition">
                    &rarr;
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white truncate">{service.name}</h3>
                <p className="text-gray-400 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#111827]/50 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Can't decide what you need?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Book a one-on-one free consultation with our restaurant tech experts. We will help you identify the right modules for your specific business type.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
          >
            Speak to an Expert
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
