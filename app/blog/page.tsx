import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"
import { getPublishedBlogPosts } from "@/app/actions/blog"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const dynamic = "force-dynamic"


type BlogPost = {
    id: string
    title: string
    slug: string
    excerpt: string
    coverImage: string | null
    author: string
    createdAt: Date
}

// SEO Metadata for Blog Page
const fallbackMetadata: Metadata = {
    metadataBase: new URL("https://www.aerobill.in"),
    title: "Blog | Aerobill - Restaurant Management Tips & Insights",
    description: "Discover expert tips on restaurant management, QR code ordering, kitchen display systems, smart billing, and digital menu strategies. Learn how to grow your restaurant business.",
    keywords: [
        "restaurant management blog",
        "QR code ordering tips",
        "restaurant technology",
        "digital menu guide",
        "kitchen display system",
        "restaurant billing software",
        "restaurant POS tips",
        "food service technology",
        "restaurant efficiency",
        "hospitality industry trends",
    ],
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://www.aerobill.in/blog",
        siteName: "Aerobill",
        title: "Blog | Aerobill - Restaurant Management Tips & Insights",
        description: "Expert insights on restaurant management, QR ordering, and digital solutions for modern restaurants.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Aerobill Blog - Restaurant Management Insights",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Aerobill Blog - Restaurant Management Tips",
        description: "Expert insights on restaurant management and digital solutions.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.aerobill.in/blog",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/blog", fallbackMetadata)
}

// JSON-LD for Blog Page
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Aerobill Blog",
    description: "Expert tips and insights on restaurant management, QR code ordering, and digital solutions for modern restaurants.",
    url: "https://www.aerobill.in/blog",
    publisher: {
        "@type": "Organization",
        name: "Aerobill",
        logo: {
            "@type": "ImageObject",
            url: "https://www.aerobill.in/logo.png",
        },
    },
}

// Helper to bypass Next.js default /_next/image optimizer
// which often throws 400 Bad Request in production for remote URLs
const getOptimizedCloudinaryUrl = (src: string) => {
    // If it's already a cloudinary URL, we can inject optimization params
    if (src.includes('res.cloudinary.com')) {
        // Find the upload/ part to inject transformations
        const parts = src.split('/upload/')
        if (parts.length === 2) {
            return `${parts[0]}/upload/w_1080,q_75,f_auto/${parts[1]}`
        }
    }
    return src
}

export default async function BlogPage() {
    const result = await getPublishedBlogPosts()
    const posts = result.success ? result.data : []

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
                <PublicHeader />

                {/* Hero Section */}
                <section className="pt-28 pb-16 px-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b35]/8 rounded-full blur-[120px] -z-10" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#818cf8]/8 rounded-full blur-[100px] -z-10" />
                    <div className="max-w-4xl mx-auto text-center reveal-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            Aerobill Blog
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Restaurant Management <span className="gradient-text">Tips & Insights</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            Expert advice on running your restaurant efficiently with modern technology. Learn about QR ordering, kitchen management, billing systems, and more.
                        </p>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        {posts && posts.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {posts.map((post: BlogPost, i: number) => (
                                    <article key={post.id} className={`group reveal-up delay-${(i % 6) + 1}`}>
                                        <Link href={`/blog/${post.slug}`}>
                                            <div className="feature-card !p-0 overflow-hidden">
                                                {post.coverImage && (
                                                    <div className="h-48 bg-gradient-to-br from-[#ff6b35]/20 to-[#ff8c5a]/20 relative overflow-hidden">
                                                        <Image
                                                            src={getOptimizedCloudinaryUrl(post.coverImage.replace(/[\n\r\s]+/g, ''))}
                                                            alt={post.title}
                                                            fill
                                                            unoptimized={true}
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}
                                                {!post.coverImage && (
                                                    <div className="h-48 bg-gradient-to-br from-[#ff6b35]/10 to-[#818cf8]/10 flex items-center justify-center">
                                                        <svg className="w-16 h-16 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </div>
                                                )}
                                                <div className="p-6">
                                                    <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff6b35] transition line-clamp-2">
                                                        {post.title}
                                                    </h2>
                                                    <p className="text-gray-400 line-clamp-3 text-sm leading-relaxed">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="mt-4 text-[#ff6b35] font-medium flex items-center gap-2 text-sm">
                                                        Read More
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 reveal-up">
                                <div className="icon-box icon-box-orange mx-auto mb-6" style={{ width: 80, height: 80 }}>
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Coming Soon!</h2>
                                <p className="text-gray-400 max-w-md mx-auto mb-8">
                                    We&apos;re working on great content about restaurant management, QR ordering, and digital solutions. Stay tuned!
                                </p>
                                <Link href="/register" className="cta-btn inline-block">Get Started with Aerobill</Link>
                            </div>
                        )}
                    </div>
                </section>

                <div className="section-divider max-w-6xl mx-auto" />

                {/* SEO Content Section */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center reveal-up">Why Read Our <span className="gradient-text">Blog?</span></h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "Actionable Tips", desc: "Practical advice you can implement immediately to improve operations.", color: "green" },
                                { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Industry Insights", desc: "Stay updated with latest trends in restaurant technology.", color: "blue" },
                                { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Expert Guides", desc: "Comprehensive guides on QR ordering, KDS, billing, and analytics.", color: "amber" },
                            ].map((f, i) => (
                                <div key={i} className={`feature-card text-center reveal-up delay-${i + 1}`}>
                                    <div className={`icon-box icon-box-${f.color} mx-auto mb-4`}>
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                                    </div>
                                    <h3 className="font-bold text-white mb-2">{f.title}</h3>
                                    <p className="text-gray-400 text-sm">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Social Responsibility */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden glow-border">
                            <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px] -z-10" />
                            <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 rounded-full blur-[80px] -z-10" />
                            <div className="relative reveal-up">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    Social Responsibility
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Every Signup Feeds Someone in Need</h2>
                                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                    For <span className="text-emerald-400 font-bold">every restaurant</span> that signs up,
                                    we donate <span className="text-emerald-400 font-bold">₹100</span> to local food banks.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-purple-900/5 -z-10" />
                    <div className="max-w-3xl mx-auto text-center reveal-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Restaurant?</h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Join hundreds of restaurants already using Aerobill&apos;s QR ordering, kitchen display, and smart billing solutions.
                        </p>
                        <Link href="/register" className="cta-btn inline-block text-lg">Start For Free →</Link>
                    </div>
                </section>

                <PublicFooter />
            </div>
        </>
    )
}
