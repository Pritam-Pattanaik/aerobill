import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/app/actions/blog"

export const dynamic = "force-dynamic"

// Helper to bypass Next.js default /_next/image optimizer
const getOptimizedCloudinaryUrl = (src: string) => {
    if (!src) return src;
    if (src.includes('res.cloudinary.com')) {
        const parts = src.split('/upload/')
        if (parts.length === 2) {
            return `${parts[0]}/upload/w_1200,q_75,f_auto/${parts[1]}`
        }
    }
    return src
}

type BlogPostSummary = {
    id: string
    title: string
    slug: string
}



// Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params
    const result = await getBlogPostBySlug(resolvedParams.slug)

    if (!result.success || !result.data) {
        return {
            title: "Post Not Found | Aerobill Blog",
            description: "The blog post you're looking for doesn't exist.",
        }
    }

    const post = result.data
    const title = post.metaTitle || `${post.title} | Aerobill Blog`
    const description = post.metaDesc || post.excerpt
    const keywords = post.keywords ? post.keywords.split(",").map((k: string) => k.trim()) : []

    return {
        metadataBase: new URL("https://www.aerobill.in"),
        title,
        description,
        keywords: [
            ...keywords,
            "restaurant management",
            "Aerobill",
            "restaurant software",
        ],
        authors: [{ name: post.author }],
        openGraph: {
            type: "article",
            locale: "en_IN",
            url: `https://www.aerobill.in/blog/${post.slug}`,
            siteName: "Aerobill",
            title: post.title,
            description: post.excerpt,
            images: post.coverImage
                ? [
                    {
                        url: post.coverImage,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ]
                : [
                    {
                        url: "/og-image.png",
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
            publishedTime: post.createdAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: [post.author],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [post.coverImage] : ["/og-image.png"],
        },
        alternates: {
            canonical: `https://www.aerobill.in/blog/${post.slug}`,
        },
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const result = await getBlogPostBySlug(resolvedParams.slug)

    if (!result.success || !result.data) {
        notFound()
    }

    const post = result.data

    // JSON-LD for Article
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage || "https://www.aerobill.in/og-image.png",
        author: {
            "@type": "Person",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "Aerobill",
            logo: {
                "@type": "ImageObject",
                url: "https://www.aerobill.in/logo.png",
            },
        },
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.aerobill.in/blog/${post.slug}`,
        },
        keywords: post.keywords,
    }

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

                {/* Article Header */}
                <article className="pt-32 pb-20 px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                            <Link href="/" className="hover:text-white transition">Home</Link>
                            <span>/</span>
                            <Link href="/blog" className="hover:text-white transition">Blog</Link>
                            <span>/</span>
                            <span className="text-gray-300 line-clamp-1">{post.title}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full flex items-center justify-center text-sm font-bold">
                                    {post.author.charAt(0)}
                                </span>
                                <span>{post.author}</span>
                            </div>
                            <span>•</span>
                            <time dateTime={post.createdAt.toISOString()}>
                                {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </time>
                        </div>

                        {post.coverImage && (
                            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
                                <Image
                                    src={getOptimizedCloudinaryUrl(post.coverImage.replace(/[\n\r\s]+/g, ''))}
                                    alt={post.title}
                                    fill
                                    unoptimized={true}
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-invert prose-lg max-w-none
                                prose-headings:text-white prose-headings:font-bold
                                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                                prose-strong:text-white
                                prose-a:text-[#ff6b35] prose-a:no-underline hover:prose-a:underline
                                prose-ul:text-gray-300 prose-ol:text-gray-300
                                prose-li:mb-2
                                prose-blockquote:border-l-[#ff6b35] prose-blockquote:bg-[#1a1a2e] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl
                                prose-code:text-[#ff6b35] prose-code:bg-[#1a1a2e] prose-code:px-2 prose-code:py-1 prose-code:rounded
                            ">
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Keywords Tags */}
                        {post.keywords && (
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h3 className="text-sm font-medium text-gray-400 mb-4">Related Topics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.keywords.split(',').map((keyword: string, i: number) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-[#ff6b35]/10 text-[#ff6b35] text-sm rounded-full"
                                        >
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

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

                {/* CTA Section */}
                <section className="py-20 px-4 bg-[#111827]/50">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
                        <p className="text-gray-400 mb-8">
                            Join hundreds of restaurants already using Aerobill&apos;s QR ordering, kitchen display, and smart billing solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition"
                            >
                                Start For Free →
                            </Link>
                            <Link
                                href="/blog"
                                className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition"
                            >
                                ← Back to Blog
                            </Link>
                        </div>
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
