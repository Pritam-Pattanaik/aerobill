import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"

const fallbackMetadata: Metadata = {
    title: "Login | Aerobill",
    description: "Sign in to your Aerobill dashboard to manage your restaurant, view orders, and access analytics.",
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/login", fallbackMetadata)
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
