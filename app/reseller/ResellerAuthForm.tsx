"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerReseller, loginReseller } from "../actions/resellerAuth"

export function ResellerAuthForm() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            let result
            if (isLogin) {
                result = await loginReseller({ email: formData.email, password: formData.password })
            } else {
                if (!formData.name) {
                    setError("Name is required for registration.")
                    setLoading(false)
                    return
                }
                result = await registerReseller(formData)
            }

            if (result.success) {
                router.push("/reseller/dashboard")
                router.refresh()
            } else {
                setError(result.error || "An error occurred.")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">
                {isLogin ? "Welcome Back Partner" : "Start Earning Today"}
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
                {isLogin ? "Log in to your dashboard to view your commissions." : "Create your free account and get your referral link instantly."}
            </p>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                        <input
                            type="text"
                            required={!isLogin}
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35]"
                            placeholder="John Doe"
                        />
                    </div>
                )}
                
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email Address *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35]"
                        placeholder="you@example.com"
                    />
                </div>

                {!isLogin && (
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Phone Number (Optional)</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35]"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Password *</label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35]"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-[#ff6b35]/30 transition-all font-medium disabled:opacity-50 mt-4"
                >
                    {loading ? "Please wait..." : (isLogin ? "Log In" : "Become a Reseller")}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
                {isLogin ? "Don't have an account? " : "Already a partner? "}
                <button
                    onClick={() => {
                        setIsLogin(!isLogin)
                        setError("")
                    }}
                    className="text-[#ff6b35] hover:underline hover:text-[#ff8c5a] transition-colors"
                >
                    {isLogin ? "Sign up" : "Log in"}
                </button>
            </div>
        </div>
    )
}
