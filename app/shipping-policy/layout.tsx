import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"

const fallbackMetadata: Metadata = {
    title: "Shipping and Delivery Policy | Aerobill",
    description: "Read the Aerobill Shipping and Delivery Policy to understand the digital delivery and provisioning of our software services.",
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/shipping-policy", fallbackMetadata)
}

export default function ShippingPolicyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
