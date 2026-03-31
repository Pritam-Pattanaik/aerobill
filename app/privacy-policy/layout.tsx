import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"

const fallbackMetadata: Metadata = {
    title: "Privacy Policy | Aerobill",
    description: "Read the Aerobill Privacy Policy to learn how we protect your personal and business data.",
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/privacy-policy", fallbackMetadata)
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
