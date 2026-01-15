import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { getPublishedBlogPosts } from "@/app/actions/blog"

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
export const metadata: Metadata = {
    metadataBase: new URL("https://aerobill.in"),
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
        url: "https://aerobill.in/blog",
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
        canonical: "https://aerobill.in/blog",
    },
}

// JSON-LD for Blog Page
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Aerobill Blog",
    description: "Expert tips and insights on restaurant management, QR code ordering, and digital solutions for modern restaurants.",
    url: "https://aerobill.in/blog",
    publisher: {
        "@type": "Organization",
        name: "Aerobill",
        logo: {
            "@type": "ImageObject",
            url: "https://aerobill.in/logo.png",
        },
    },
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
            <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center">
                            <Image src="/logo.png" alt="Aerobill" width={150} height={50} className="h-12 w-auto" />
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
                            <Link href="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link>
                            <Link href="/blog" className="text-white font-medium">Blog</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-gray-300 hover:text-white transition">Login</Link>
                            <Link href="/register" className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#ff8c5a] transition">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-6">
                            📚 Aerobill Blog
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Restaurant Management
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]"> Tips & Insights</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Expert advice on running your restaurant efficiently with modern technology. Learn about QR ordering, kitchen management, billing systems, and more.
                        </p>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        {posts && posts.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {posts.map((post: BlogPost) => (
                                    <article key={post.id} className="group">
                                        <Link href={`/blog/${post.slug}`}>
                                            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff6b35]/50 transition">
                                                {post.coverImage && (
                                                    <div className="h-48 bg-gradient-to-br from-[#ff6b35]/20 to-[#ff8c5a]/20 relative overflow-hidden">
                                                        <Image
                                                            src={post.coverImage}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}
                                                {!post.coverImage && (
                                                    <div className="h-48 bg-gradient-to-br from-[#ff6b35]/20 to-[#ff8c5a]/20 flex items-center justify-center">
                                                        <span className="text-6xl opacity-50">📝</span>
                                                    </div>
                                                )}
                                                <div className="p-6">
                                                    <div className="text-sm text-gray-500 mb-2">
                                                        {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                    <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-[#ff6b35] transition line-clamp-2">
                                                        {post.title}
                                                    </h2>
                                                    <p className="text-gray-400 line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="mt-4 text-[#ff6b35] font-medium flex items-center gap-2">
                                                        Read More
                                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📝</div>
                                <h2 className="text-2xl font-semibold text-white mb-2">Coming Soon!</h2>
                                <p className="text-gray-400 max-w-md mx-auto mb-8">
                                    We&apos;re working on great content about restaurant management, QR ordering, and digital solutions. Stay tuned!
                                </p>
                                <Link
                                    href="/register"
                                    className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
                                >
                                    Get Started with Aerobill
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* SEO Content Section */}
                <section className="py-16 px-4 bg-[#111827]/50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center">Why Read Our Blog?</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="font-semibold mb-2">Actionable Tips</h3>
                                <p className="text-gray-400 text-sm">
                                    Practical advice you can implement immediately to improve your restaurant operations and customer experience.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="font-semibold mb-2">Industry Insights</h3>
                                <p className="text-gray-400 text-sm">
                                    Stay updated with the latest trends in restaurant technology, digital ordering, and hospitality management.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">💡</div>
                                <h3 className="font-semibold mb-2">Expert Guides</h3>
                                <p className="text-gray-400 text-sm">
                                    Comprehensive guides on QR code ordering, kitchen display systems, smart billing, and restaurant analytics.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
                        <p className="text-gray-400 mb-8">
                            Join hundreds of restaurants already using Aerobill&apos;s QR ordering, kitchen display, and smart billing solutions.
                        </p>
                        <Link
                            href="/register"
                            className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
                        >
                            Start Your Free Trial →
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 px-4 border-t border-white/10">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-gray-400 text-sm">
                            © 2026 Aerobill by{" "}
                            <a href="https://www.assetmagnets.com/" target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:underline">
                                ASSETMAGNETS
                            </a>
                            . All rights reserved.
                        </div>
                        <div className="flex gap-6 text-gray-400 text-sm">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <Link href="/about" className="hover:text-white">About</Link>
                            <Link href="/pricing" className="hover:text-white">Pricing</Link>
                            <Link href="/blog" className="hover:text-white">Blog</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
