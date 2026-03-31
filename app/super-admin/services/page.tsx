import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getServicePages } from "@/app/actions/service-pages"
import ServicePageActions from "./ServicePageActions"

export default async function SuperAdminServicesPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isSuperAdmin) {
        redirect("/super-admin/login")
    }

    const result = await getServicePages()
    const pages = result.success && result.data ? result.data : []

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                        Service Pages Management
                    </h1>
                    <p className="text-gray-400 mt-1">Create and manage dynamic service pages for marketing</p>
                </div>
                <Link
                    href="/super-admin/services/new"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-medium hover:opacity-90 transition"
                >
                    <span>➕</span>
                    New Service
                </Link>
            </div>

            {/* Posts Table */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-teal-500/20 overflow-hidden">
                {pages && pages.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-teal-500/20">
                                <th className="text-left p-4 text-gray-400 font-medium">Name & Title</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Slug</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map((page: any) => (
                                <tr key={page.id} className="border-b border-teal-500/10 hover:bg-teal-500/5 transition">
                                    <td className="p-4">
                                        <div className="font-medium text-white">{page.name}</div>
                                        <div className="text-sm text-gray-500 mt-1 line-clamp-1">{page.title}</div>
                                    </td>
                                    <td className="p-4">
                                        <code className="text-sm text-teal-400 bg-teal-500/10 px-2 py-1 rounded">
                                            /services/{page.slug}
                                        </code>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${page.isActive
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                            }`}>
                                            {page.isActive ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <ServicePageActions page={page} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center">
                        <div className="text-6xl mb-4">🚀</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No service pages yet</h3>
                        <p className="text-gray-400 mb-6">Create your first marketing service page.</p>
                        <Link
                            href="/super-admin/services/new"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-medium hover:opacity-90 transition"
                        >
                            Create First Service
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
