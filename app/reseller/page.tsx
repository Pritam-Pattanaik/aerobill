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
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />

            {/* Hero Section */}
            <section className="pt-28 pb-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b35]/8 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10b981]/8 rounded-full blur-[100px] -z-10" />
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="reveal-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff8c5a] text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            Partner Program
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Earn <span className="gradient-text">20% Recurring Commission</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                            Help restaurants digitize their operations with Aerobill and build a passive income stream. You earn an industry-leading 20% commission on every paid subscription—forever.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "High Recurring Payouts", desc: "Get paid 20% every time your referred restaurant renews their plan.", color: "#10b981" },
                                { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Simple Tracking", desc: "Share your unique referral link and we handle the rest automatically.", color: "#818cf8" },
                                { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "Zero Limits", desc: "There's no cap on how many restaurants you can refer or how much you can earn.", color: "#ff6b35" },
                            ].map((feature, i) => (
                                <div key={i} className={`flex gap-4 items-start reveal-up delay-${i + 1}`}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}>
                                        <svg className="w-5 h-5" style={{ color: feature.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{feature.title}</h3>
                                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Authentication Form Card */}
                    <div className="reveal-right delay-2">
                        <div className="feature-card !p-8 !rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl -z-10" />
                            <ResellerAuthForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { num: "20%", label: "Recurring Commission" },
                        { num: "₹0", label: "Joining Cost" },
                        { num: "24/7", label: "Partner Support" },
                        { num: "∞", label: "Referral Limit" },
                    ].map((s, i) => (
                        <div key={i} className={`text-center reveal-up delay-${i + 1}`}>
                            <div className="stat-number text-2xl">{s.num}</div>
                            <span className="text-sm text-gray-500">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 reveal-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It <span className="gradient-text">Works</span></h2>
                        <p className="text-gray-400 text-lg">Three simple steps to start earning</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Sign Up", desc: "Create your free reseller account and instantly get your unique referral link.", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z", color: "green" },
                            { step: "02", title: "Share", desc: "Send your link to restaurant owners via email, WhatsApp, or your social channels.", icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", color: "blue" },
                            { step: "03", title: "Earn", desc: "Watch your balance grow as your referred restaurants upgrade to paid plans.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "orange" },
                        ].map((s, i) => (
                            <div key={i} className={`feature-card text-center relative reveal-up delay-${i + 1}`}>
                                <div className="text-5xl font-extrabold text-white/5 mb-2">{s.step}</div>
                                <div className={`icon-box icon-box-${s.color} mx-auto mb-4`}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-gray-400">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider max-w-6xl mx-auto" />

            {/* Why Partner */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12 reveal-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Partner with <span className="gradient-text">Aerobill?</span></h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Growing Market", desc: "Restaurants are rapidly digitizing. Massive demand.", color: "amber" },
                            { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "Easy Sell", desc: "Free plan makes it easy to onboard restaurants.", color: "rose" },
                            { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Real Metrics", desc: "Full dashboard with clicks, signups, and commission.", color: "purple" },
                            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Trusted Brand", desc: "Refer a product you can stand behind with confidence.", color: "green" },
                        ].map((f, i) => (
                            <div key={i} className={`feature-card reveal-up delay-${i + 1}`}>
                                <div className={`icon-box icon-box-${f.color} mb-4`}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-[#10b981]/5 -z-10" />
                <div className="max-w-3xl mx-auto text-center reveal-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start earning today</h2>
                    <p className="text-gray-400 mb-8 text-lg">Join our growing network of resellers and unlock recurring revenue.</p>
                    <Link href="#top" className="cta-btn inline-block text-lg">Sign Up as Reseller →</Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    )
}
