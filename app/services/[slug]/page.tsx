import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getActiveServicePages, getServicePageBySlug } from "@/app/actions/service-pages"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

// Generate static routes at build time
export async function generateStaticParams() {
  const result = await getActiveServicePages()
  if (!result.success || !result.data) return []
  return result.data.map((service: any) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = await getServicePageBySlug(slug)
  const service: any = result.success ? result.data : null

  if (!service) {
    return { title: "Service Not Found" }
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getServicePageBySlug(slug)
  const service: any = result.success ? result.data : null

  if (!service) {
    notFound()
  }

  const features = service.features || []
  const benefits = service.benefits || []
  const faqs = service.faqs || []

  // JSON-LD for Software Application and FAQ Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: service.name,
        operatingSystem: "Web-based",
        applicationCategory: "BusinessApplication",
        description: service.description,
        url: `https://www.aerobill.in/services/${service.slug}`,
        provider: {
          "@type": "Organization",
          name: "Aerobill",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq: any) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
        <PublicHeader />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-6">
              ⭐ {service.name}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {service.heroHeading}
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              {service.heroSubheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
              >
                Start For Free &rarr;
              </Link>
              <Link
                href="/contact"
                className="border border-[#ff6b35]/50 bg-[#ff6b35]/10 text-[#ff6b35] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#ff6b35]/20 transition"
              >
                Book Free Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-[#111827]/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Key Features of Our {service.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 hover:border-[#ff6b35]/50 transition"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
              <div className="relative text-center">
                <h2 className="text-3xl font-bold mb-8">Why You Need It</h2>
                <ul className="text-left space-y-4 max-w-2xl mx-auto">
                  {benefits.map((benefit: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-4 text-xl text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        ✓
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="py-20 px-4 bg-[#111827]/30">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-400">Everything you need to know about our {service.name}</p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq: any, i: number) => (
                  <details
                    key={i}
                    className="group border border-white/10 bg-[#1a1a2e] rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="cursor-pointer list-none px-6 py-4 font-semibold text-lg flex justify-between items-center hover:bg-white/5 transition">
                      {faq.question}
                      <span className="text-[#ff6b35] group-open:rotate-45 transition-transform duration-300 text-2xl">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-4 pt-2 text-gray-400">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Restaurant?</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of businesses scaling up with Aerobill today.
            </p>
            <Link
              href="/register"
              className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
            >
              Get Started For Free &rarr;
            </Link>
          </div>
        </section>

        <PublicFooter />
      </div>
    </>
  )
}
