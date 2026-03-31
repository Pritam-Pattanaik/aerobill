import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"

const fallbackMetadata: Metadata = {
    title: "Create Restaurant Account | Aerobill",
    description: "Sign up for Aerobill and transform your restaurant management. Start for free, upgrade when you need more features.",
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/register", fallbackMetadata)
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
