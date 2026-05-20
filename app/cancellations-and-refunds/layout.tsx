import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"

const fallbackMetadata: Metadata = {
    title: "Cancellation and Refund Policy | Aerobill",
    description: "Read the Aerobill Cancellation and Refund Policy to learn about cancellations, subscription terms, and refund eligibility.",
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/cancellations-and-refunds", fallbackMetadata)
}

export default function CancellationsRefundsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
