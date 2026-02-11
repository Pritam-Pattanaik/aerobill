import Link from "next/link"
import type { Metadata } from "next"
import { getContactInfo } from "@/app/actions/contact"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
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

export default async function ContactPage() {
    const { contact } = await getContactInfo()

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
            {/* Navigation */}
            {/* Navigation */}
            <PublicHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-6">
                        📞 Get in Touch
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        We&apos;re Here to
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]"> Help You</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
                            className="glass-card p-6 text-center hover:border-[#ff6b35]/50 transition group"
                        >
                            <div className="text-4xl mb-4">📧</div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-[#ff6b35] transition">Email Us</h3>
                            <p className="text-gray-400 text-sm mb-2">For support & inquiries</p>
                            <p className="text-[#ff6b35] font-medium">{contact?.email}</p>
                        </a>

                        {/* Phone */}
                        <a
                            href={`tel:${contact?.phone?.replace(/\s/g, '')}`}
                            className="glass-card p-6 text-center hover:border-[#ff6b35]/50 transition group"
                        >
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-[#ff6b35] transition">Call Us</h3>
                            <p className="text-gray-400 text-sm mb-2">Mon-Sat, 9AM - 6PM IST</p>
                            <p className="text-[#ff6b35] font-medium">{contact?.phone}</p>
                        </a>

                        {/* WhatsApp */}
                        {contact?.whatsapp && (
                            <a
                                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-6 text-center hover:border-green-500/50 transition group"
                            >
                                <div className="text-4xl mb-4">💬</div>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">WhatsApp</h3>
                                <p className="text-gray-400 text-sm mb-2">Quick response</p>
                                <p className="text-green-400 font-medium">Chat with us</p>
                            </a>
                        )}
                    </div>

                    {/* Main Contact Section */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <h3 className="font-semibold mb-1">Address</h3>
                                        <p className="text-gray-400">{contact?.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">🕐</span>
                                    <div>
                                        <h3 className="font-semibold mb-1">Office Hours</h3>
                                        <p className="text-gray-400">{contact?.officeHours}</p>
                                    </div>
                                </div>

                                {/* Social Links */}
                                {(contact?.facebook || contact?.twitter || contact?.instagram || contact?.linkedin) && (
                                    <div className="pt-4 border-t border-white/10">
                                        <h3 className="font-semibold mb-4">Follow Us</h3>
                                        <div className="flex gap-4">
                                            {contact?.facebook && (
                                                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center hover:bg-blue-600/40 transition">
                                                    <span className="text-lg">📘</span>
                                                </a>
                                            )}
                                            {contact?.twitter && (
                                                <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center hover:bg-sky-500/40 transition">
                                                    <span className="text-lg">🐦</span>
                                                </a>
                                            )}
                                            {contact?.instagram && (
                                                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center hover:bg-pink-500/40 transition">
                                                    <span className="text-lg">📷</span>
                                                </a>
                                            )}
                                            {contact?.linkedin && (
                                                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-700/20 flex items-center justify-center hover:bg-blue-700/40 transition">
                                                    <span className="text-lg">💼</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Help */}
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold mb-6">Quick Help</h2>

                            <div className="space-y-4">
                                <div className="p-4 bg-[var(--background)] rounded-xl">
                                    <h3 className="font-semibold mb-2">🆕 New to Aerobill?</h3>
                                    <p className="text-gray-400 text-sm mb-3">Get started with our free plan and explore all features.</p>
                                    <Link href="/register" className="text-[#ff6b35] text-sm font-medium hover:underline">
                                        Create free account &rarr;
                                    </Link>
                                </div>

                                <div className="p-4 bg-[var(--background)] rounded-xl">
                                    <h3 className="font-semibold mb-2">💰 Pricing Questions?</h3>
                                    <p className="text-gray-400 text-sm mb-3">Check our transparent pricing with no hidden fees.</p>
                                    <Link href="/pricing" className="text-[#ff6b35] text-sm font-medium hover:underline">
                                        View pricing &rarr;
                                    </Link>
                                </div>

                                <div className="p-4 bg-[var(--background)] rounded-xl">
                                    <h3 className="font-semibold mb-2">🏢 Enterprise Solutions?</h3>
                                    <p className="text-gray-400 text-sm mb-3">Custom solutions for restaurant chains.</p>
                                    <a href={`mailto:${contact?.email}?subject=Enterprise Inquiry`} className="text-[#ff6b35] text-sm font-medium hover:underline">
                                        Contact sales &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
                    <p className="text-gray-400 mb-8">
                        Join hundreds of restaurants already using Aerobill. Start free today!
                    </p>
                    <Link
                        href="/register"
                        className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
                    >
                        Start For Free &rarr;
                    </Link>
                </div>
            </section>

            {/* Footer */}
            {/* Footer */}
            <PublicFooter />
        </div>
    )
}
