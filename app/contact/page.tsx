import Link from "next/link"
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"
import { getContactInfo } from "@/app/actions/contact"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const dynamic = 'force-dynamic'

const fallbackMetadata: Metadata = {
    title: "Contact Us - Aerobill | Get in Touch",
    description: "Contact Aerobill for support, sales inquiries, or partnership opportunities. We're here to help your restaurant succeed with our management software.",
    keywords: ["contact aerobill", "aerobill support", "restaurant software help", "aerobill phone", "aerobill email"],
    openGraph: {
        title: "Contact Aerobill - Get in Touch",
        description: "Reach out for support, sales, or partnership inquiries. We're here to help!",
        url: "https://www.aerobill.in/contact",
        siteName: "Aerobill",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Aerobill" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Aerobill",
        description: "Get in touch with our team for support or inquiries.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.aerobill.in/contact",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/contact", fallbackMetadata)
}

export default async function ContactPage() {
    const { contact } = await getContactInfo()

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            {/* Hero Section */}
            <section className="pt-28 pb-12 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b35]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#818cf8]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-4xl mx-auto text-center reveal-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Get in Touch
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                        We&apos;re Here to <span className="gradient-text">Help You</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Have questions about Aerobill? Need support? Want to partner with us? Reach out and we&apos;ll get back to you promptly.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {/* Email */}
                        <a
                            href={`mailto:${contact?.email}`}
                            className="feature-card text-center group reveal-up delay-1"
                        >
                            <div className="icon-box icon-box-orange mx-auto mb-4">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff6b35] transition">Email Us</h3>
                            <p className="text-gray-500 text-sm mb-2">For support & inquiries</p>
                            <p className="text-[#ff6b35] font-medium">{contact?.email}</p>
                        </a>

                        {/* Phone */}
                        <a
                            href={`tel:${contact?.phone?.replace(/\s/g, '')}`}
                            className="feature-card text-center group reveal-up delay-2"
                        >
                            <div className="icon-box icon-box-blue mx-auto mb-4">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#818cf8] transition">Call Us</h3>
                            <p className="text-gray-500 text-sm mb-2">Mon-Sat, 9AM - 6PM IST</p>
                            <p className="text-[#818cf8] font-medium">{contact?.phone}</p>
                        </a>

                        {/* WhatsApp */}
                        {contact?.whatsapp && (
                            <a
                                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="feature-card text-center group reveal-up delay-3"
                            >
                                <div className="icon-box icon-box-green mx-auto mb-4">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#10b981] transition">WhatsApp</h3>
                                <p className="text-gray-500 text-sm mb-2">Quick response</p>
                                <p className="text-[#10b981] font-medium">Chat with us</p>
                            </a>
                        )}
                    </div>

                    <div className="section-divider max-w-4xl mx-auto" />

                    {/* Main Contact Section */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        {/* Contact Info */}
                        <div className="feature-card reveal-left">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="icon-box icon-box-orange" style={{ width: 40, height: 40 }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <svg className="w-5 h-5 text-[#ff6b35] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Address</h3>
                                        <p className="text-gray-400">{contact?.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <svg className="w-5 h-5 text-[#818cf8] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Office Hours</h3>
                                        <p className="text-gray-400">{contact?.officeHours}</p>
                                    </div>
                                </div>

                                {/* Social Links */}
                                {(contact?.facebook || contact?.twitter || contact?.instagram || contact?.linkedin) && (
                                    <div className="pt-4 border-t border-white/10">
                                        <h3 className="font-bold text-white mb-4">Follow Us</h3>
                                        <div className="flex gap-3">
                                            {contact?.facebook && (
                                                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center hover:bg-blue-600/20 transition">
                                                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                                </a>
                                            )}
                                            {contact?.twitter && (
                                                <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center hover:bg-sky-500/20 transition">
                                                    <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                                </a>
                                            )}
                                            {contact?.instagram && (
                                                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center hover:bg-pink-500/20 transition">
                                                    <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                                </a>
                                            )}
                                            {contact?.linkedin && (
                                                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-700/10 border border-blue-700/20 flex items-center justify-center hover:bg-blue-700/20 transition">
                                                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Help */}
                        <div className="feature-card reveal-right delay-2">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="icon-box icon-box-blue" style={{ width: 40, height: 40 }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </div>
                                Quick Help
                            </h2>

                            <div className="space-y-4">
                                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-[#ff6b35]/20 transition">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                        New to Aerobill?
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">Get started with our free plan and explore all features.</p>
                                    <Link href="/register" className="text-[#ff6b35] text-sm font-medium hover:underline inline-flex items-center gap-1">
                                        Create free account
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                </div>

                                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-[#818cf8]/20 transition">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#818cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Pricing Questions?
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">Check our transparent pricing with no hidden fees.</p>
                                    <Link href="/pricing" className="text-[#818cf8] text-sm font-medium hover:underline inline-flex items-center gap-1">
                                        View pricing
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                </div>

                                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-[#a855f7]/20 transition">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        Enterprise Solutions?
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">Custom solutions for restaurant chains.</p>
                                    <a href={`mailto:${contact?.email}?subject=Enterprise Inquiry`} className="text-[#a855f7] text-sm font-medium hover:underline inline-flex items-center gap-1">
                                        Contact sales
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                {contact?.mapUrl && (
                    <div className="max-w-5xl mx-auto mt-12 reveal-up">
                        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-2 overflow-hidden h-[400px]">
                            <iframe
                                src={contact.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '1.25rem' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Office Location"
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-purple-900/5 -z-10" />
                <div className="max-w-3xl mx-auto text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Restaurant?</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Join hundreds of restaurants already using Aerobill. Start free today!
                    </p>
                    <Link href="/register" className="cta-btn inline-block text-lg">Start For Free →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
