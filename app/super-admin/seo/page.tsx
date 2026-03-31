import { getAllPageSEO } from "@/app/actions/seo"
// Trigger TS refresh
import SEOManager from "./SEOManager"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function SEOMangementPage() {
    const session = await getServerSession(authOptions)
    if (!session || (!session.user?.isSuperAdmin && session.user?.role !== "SUPER_ADMIN")) {
        redirect("/super-admin/login")
    }

    const seoResult = await getAllPageSEO()
    const seoList = seoResult.success ? seoResult.data : []

    return (
        <div className="p-4 md:p-8 space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Global SEO Management</h1>
                        <p className="text-gray-400">Manage Meta Titles, Descriptions, and Keywords for all public pages</p>
                    </div>
                </div>

                <SEOManager initialData={seoList || []} />
            </div>
        </div>
    )
}
