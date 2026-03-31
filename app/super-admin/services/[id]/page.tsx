import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getServicePageById } from "@/app/actions/service-pages"
import ServiceForm from "../ServiceForm"

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isSuperAdmin) {
        redirect("/super-admin/login")
    }
    
    const { id } = await params
    const result = await getServicePageById(id)

    if (!result.success || !result.data) {
        return <div className="p-8 text-red-500">Service Page not found</div>
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                    Edit Service Page
                </h1>
                <p className="text-gray-400 mt-1">Update SEO structure and copy for '/services/{result.data.slug}'</p>
            </div>
            
            <ServiceForm initialData={result.data} />
        </div>
    )
}
