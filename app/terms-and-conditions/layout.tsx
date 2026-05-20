import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"

const fallbackMetadata: Metadata = {
    title: "Terms and Conditions | Aerobill",
    description: "Read the Aerobill Terms and Conditions to understand the rules and guidelines for using our restaurant management software.",
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/terms-and-conditions", fallbackMetadata)
}

export default function TermsConditionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
