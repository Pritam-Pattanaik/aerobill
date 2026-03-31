import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import ServiceForm from "../ServiceForm"

export default async function NewServicePage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isSuperAdmin) {
        redirect("/super-admin/login")
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                    Create New Service Page
                </h1>
                <p className="text-gray-400 mt-1">Design a new SEO-optimized marketing page</p>
            </div>
            
            <ServiceForm />
        </div>
    )
}
