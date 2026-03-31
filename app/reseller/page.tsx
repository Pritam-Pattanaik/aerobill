import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"
import Link from "next/link"
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"
import { ResellerAuthForm } from "@/app/reseller/ResellerAuthForm"

const fallbackMetadata: Metadata = {
    title: "Become a Reseller - Aerobill",
    description: "Join the Aerobill Partner Program and earn 20% recurring commission on every paid subscription you refer.",
}

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("/reseller", fallbackMetadata)
}

export default function ResellerPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
            <PublicHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-6">
                            🤝 Partner Program
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]">20% Recurring Commission</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">
                            Help restaurants digitize their operations with Aerobill and build a passive income stream. You earn an industry-leading 20% commission on every paid subscription—forever.
                        </p>
                        
                        <div className="space-y-4 mb-8">
                            {[
                                { title: "High Recurring Payouts", desc: "Get paid 20% every time your referred restaurant renews their plan." },
                                { title: "Simple Tracking", desc: "Share your unique referral link and we handle the rest automatically." },
                                { title: "Zero Limits", desc: "There's no cap on how many restaurants you can refer or how much you can earn." }
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-[#ff6b35]/20 text-[#ff6b35] flex items-center justify-center shrink-0">
                                        ✓
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{feature.title}</h3>
                                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Authentication Form Card */}
                    <div className="bg-[#1a1a2e] p-8 rounded-3xl border border-white/10 shadow-xl shadow-black/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl" />
                        <ResellerAuthForm />
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20 px-4 bg-[#111827]/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                        <p className="text-gray-400">Three simple steps to start earning</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Sign Up", desc: "Create your free reseller account and instantly get your unique referral link." },
                            { step: "2", title: "Share", desc: "Send your link to restaurant owners via email, WhatsApp, or your social channels." },
                            { step: "3", title: "Earn", desc: "Watch your balance grow as your referred restaurants upgrade to paid plans." }
                        ].map((s, i) => (
                            <div key={i} className="glass-card p-8 text-center relative border border-white/10 hover:border-[#ff6b35]/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-[#ff6b35] text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">
                                    {s.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                                <p className="text-gray-400">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
