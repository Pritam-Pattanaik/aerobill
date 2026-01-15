import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getAllBlogPosts, deleteBlogPost, toggleBlogPostPublish } from "@/app/actions/blog"
import BlogPostActions from "./BlogPostActions"

export default async function SuperAdminBlogPage() {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "super-admin") {
        redirect("/super-admin/login")
    }

    const result = await getAllBlogPosts()
    const posts = result.success ? result.data : []

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Blog Management
                    </h1>
                    <p className="text-gray-400 mt-1">Create and manage SEO-optimized blog posts</p>
                </div>
                <Link
                    href="/super-admin/blog/new"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition"
                >
                    <span>✏️</span>
                    New Post
                </Link>
            </div>

            {/* Posts Table */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden">
                {posts && posts.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-purple-500/20">
                                <th className="text-left p-4 text-gray-400 font-medium">Title</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Slug</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Created</th>
                                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition">
                                    <td className="p-4">
                                        <div className="font-medium text-white">{post.title}</div>
                                        <div className="text-sm text-gray-500 mt-1 line-clamp-1">{post.excerpt}</div>
                                    </td>
                                    <td className="p-4">
                                        <code className="text-sm text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                                            /blog/{post.slug}
                                        </code>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.isPublished
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                            }`}>
                                            {post.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="p-4">
                                        <BlogPostActions post={post} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No blog posts yet</h3>
                        <p className="text-gray-400 mb-6">Create your first blog post to improve your website&apos;s SEO</p>
                        <Link
                            href="/super-admin/blog/new"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition"
                        >
                            Create First Post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
