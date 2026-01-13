'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import useSWR from "swr"
import Link from "next/link"

// Plan configuration
const PLANS = [
    {
        id: "FREE",
        name: "Free",
        price: "₹0",
        period: "/month",
        features: [
            "Up to 5 tables",
            "Basic menu management",
            "Order tracking",
            "Kitchen display",
        ],
        paymentLink: null,
        color: "from-gray-500 to-slate-600",
    },
    {
        id: "STARTER",
        name: "Standard",
        price: "₹299",
        period: "/month",
        features: [
            "Up to 15 tables",
            "Full menu management",
            "Inventory tracking",
            "Staff management",
            "QR code ordering",
            "Email support",
        ],
        paymentLink: "https://rzp.io/rzp/K9dlQCU",
        color: "from-blue-500 to-indigo-600",
    },
    {
        id: "BUSINESS",
        name: "Premium",
        price: "₹999",
        period: "/month",
        popular: true,
        features: [
            "Up to 30 tables",
            "Everything in Standard",
            "Advanced analytics",
            "Multiple user roles",
            "Priority support",
            "Custom branding",
        ],
        paymentLink: "https://rzp.io/rzp/GmrQt8g",
        color: "from-purple-500 to-pink-600",
    },
    {
        id: "ENTERPRISE",
        name: "Elite",
        price: "₹1,999",
        period: "/month",
        features: [
            "Unlimited tables",
            "Everything in Premium",
            "API access",
            "Dedicated support",
            "White-label option",
            "Custom integrations",
        ],
        paymentLink: "https://rzp.io/rzp/u0AJIYPZ",
        color: "from-yellow-500 to-orange-500",
    },
]

type SubscriptionData = {
    plan: string
    status: string
    expiresAt: string | null
}

export default function SubscriptionPage() {
    const { data: session, status } = useSession()

    const { data: subData } = useSWR<SubscriptionData>(
        status === "authenticated" ? "/api/subscription" : null
    )

    if (status === "loading") {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading...</div>
            </div>
        )
    }

    if (status === "unauthenticated" || !session?.user?.restaurantId) {
        redirect("/login")
    }

    const currentPlan = subData?.plan || "FREE"

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Subscription</h1>
                <p className="text-gray-400">
                    Manage your subscription plan and billing
                </p>
            </div>

            {/* Current Plan */}
            <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400">Current Plan</p>
                        <p className="text-2xl font-bold text-white mt-1">
                            {PLANS.find(p => p.id === currentPlan)?.name || "Free"}
                        </p>
                        {subData?.expiresAt && (
                            <p className="text-sm text-gray-500 mt-1">
                                Renews on {new Date(subData.expiresAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${subData?.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                        }`}>
                        {subData?.status || "Active"}
                    </div>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        className={`glass-card p-6 relative ${plan.popular ? "border-purple-500/50" : ""
                            } ${currentPlan === plan.id ? "ring-2 ring-[var(--primary)]" : ""}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <span className="px-3 py-1 bg-purple-500 text-white text-xs font-medium rounded-full">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-xl mb-4`}>
                            {plan.id === "FREE" && "🆓"}
                            {plan.id === "STANDARD" && "⭐"}
                            {plan.id === "PREMIUM" && "💎"}
                            {plan.id === "ELITE" && "👑"}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-bold text-white">{plan.price}</span>
                            <span className="text-gray-400">{plan.period}</span>
                        </div>

                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                    <span className="text-green-400">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {currentPlan === plan.id ? (
                            <button
                                disabled
                                className="w-full py-3 rounded-xl bg-gray-700 text-gray-400 font-medium cursor-not-allowed"
                            >
                                Current Plan
                            </button>
                        ) : plan.paymentLink ? (
                            <Link
                                href={plan.paymentLink}
                                target="_blank"
                                className={`block w-full py-3 rounded-xl bg-gradient-to-r ${plan.color} text-white font-medium text-center hover:opacity-90 transition-opacity`}
                            >
                                {PLANS.findIndex(p => p.id === currentPlan) < PLANS.findIndex(p => p.id === plan.id)
                                    ? "Upgrade"
                                    : "Switch Plan"}
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="w-full py-3 rounded-xl bg-gray-700 text-gray-400 font-medium cursor-not-allowed"
                            >
                                Default Plan
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Help */}
            <div className="mt-8 glass-card p-6">
                <h3 className="font-semibold text-white mb-2">Need Help?</h3>
                <p className="text-gray-400 text-sm">
                    If you have any questions about billing or subscriptions, please contact us at{" "}
                    <a href="mailto:support@aerobill.in" className="text-[var(--primary)] hover:underline">
                        support@aerobill.in
                    </a>
                </p>
            </div>
        </div>
    )
}
