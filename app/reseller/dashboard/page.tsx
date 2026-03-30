import { redirect } from "next/navigation"
import Link from "next/link"
import { getResellerData, logoutReseller } from "@/app/actions/resellerAuth"
import { CopyButton } from "@/app/reseller/dashboard/CopyButton"
import PublicHeader from "@/components/PublicHeader"
import { format } from "date-fns"

export const metadata = {
    title: "Reseller Dashboard - Aerobill",
    description: "Manage your referrals and view earnings.",
}

export default async function ResellerDashboard() {
    const reseller = await getResellerData()

    if (!reseller) {
        redirect("/reseller")
    }

    // Build the referral URL
    // In production, use the actual domain from env or headers, for now hardcoding the standard URL logic
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.aerobill.in"
    const referralUrl = `${baseUrl}/register?ref=${reseller.referralCode}`

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Simple Header */}
            <header className="fixed top-0 inset-x-0 h-16 bg-[#1a1a2e]/80 backdrop-blur-md z-50 border-b border-white/10 flex items-center px-4">
                <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-[#ff6b35] tracking-tight">
                        Aerobill <span className="text-white text-sm font-normal opacity-70">Partner</span>
                    </Link>
                    <div className="flex gap-4 items-center">
                        <span className="text-sm text-gray-400 hidden sm:inline-block">Hello, {reseller.name}</span>
                        <form action={async () => {
                            "use server"
                            await logoutReseller()
                            redirect("/reseller")
                        }}>
                            <button type="submit" className="text-sm border border-red-500/50 text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-12 px-4 max-w-6xl mx-auto space-y-8">
                {/* Top Metrics Row */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Total Earned */}
                    <div className="glass-card p-6 bg-gradient-to-br from-[#1a1a2e] to-[#ff6b35]/5 border-[#ff6b35]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b35]/10 rounded-full blur-2xl" />
                        <h3 className="text-gray-400 text-sm font-medium mb-2 relative z-10">Total Commission Earned</h3>
                        <div className="text-4xl font-bold text-white relative z-10">₹{reseller.totalBalance.toFixed(2)}</div>
                    </div>

                    {/* Restaurants Referred */}
                    <div className="glass-card p-6 bg-[#1a1a2e] border-white/5">
                        <h3 className="text-gray-400 text-sm font-medium mb-2">Restaurants Referred</h3>
                        <div className="text-4xl font-bold text-white mb-1">{reseller._count.restaurants}</div>
                        <p className="text-xs text-emerald-400">Paying 20% commission on upgrades</p>
                    </div>

                    {/* Your Referral Code */}
                    <div className="glass-card p-6 bg-[#1a1a2e] border-white/5 flex flex-col justify-center">
                        <h3 className="text-gray-400 text-sm font-medium mb-2">Your Active Referral Data</h3>
                        <div className="text-lg text-white font-mono bg-black/40 px-3 py-1.5 rounded-md inline-block w-fit mb-2 border border-white/10">
                            {reseller.referralCode}
                        </div>
                    </div>
                </div>

                {/* Referral Link Section */}
                <div className="glass-card p-6 md:p-8 bg-[#1a1a2e] border-white/10">
                    <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
                    <p className="text-gray-400 text-sm mb-4">Share this link directly with restaurant owners. When they sign up using this link, their account is permanently linked to you.</p>
                    
                    <div className="flex gap-2 w-full max-w-2xl">
                        <input 
                            readOnly 
                            value={referralUrl}
                            className="flex-1 bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 font-mono text-sm outline-none"
                        />
                        <CopyButton textToCopy={referralUrl} />
                    </div>
                </div>

                {/* Commission Logs */}
                <div className="glass-card bg-[#1a1a2e] border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold">Recent Commissions</h2>
                    </div>
                    
                    {reseller.commissions.length === 0 ? (
                        <div className="p-12 text-center text-gray-400 border-t border-white/5">
                            <div className="text-4xl mb-3 opacity-50">💸</div>
                            <p>You haven't earned any commissions yet.</p>
                            <p className="text-sm mt-1">Share your link to get started!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-300">
                                <thead className="text-xs text-gray-400 bg-black/20 border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Date</th>
                                        <th className="px-6 py-3 font-medium">Restaurant</th>
                                        <th className="px-6 py-3 font-medium">Description</th>
                                        <th className="px-6 py-3 font-medium text-right text-[#ff6b35]">Amount Earned</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {reseller.commissions.map((log: any) => (
                                        <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {format(new Date(log.createdAt), "MMM d, yyyy")}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-white">
                                                {log.restaurant.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400">
                                                {log.description || "Subscription Payment"}
                                            </td>
                                            <td className="px-6 py-4 text-emerald-400 font-medium text-right whitespace-nowrap">
                                                + ₹{log.amount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
