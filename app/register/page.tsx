"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerRestaurant } from "@/app/actions/auth"

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        restaurantName: "",
        ownerName: "",
        email: "",
        password: "",
        phone: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const result = await registerRestaurant(form)
            if (result.success) {
                router.push("/login?registered=true")
            } else {
                setError(result.error || "Registration failed")
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold text-[#ff6b35]">Aerobill</Link>
                    <h1 className="text-2xl font-bold mt-4">Create Your Restaurant</h1>
                    <p className="text-gray-400 mt-2">Start your 14-day free trial</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Restaurant Name</label>
                        <input
                            type="text"
                            required
                            value={form.restaurantName}
                            onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
                            className="input"
                            placeholder="e.g., The Urban Kitchen"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                        <input
                            type="text"
                            required
                            value={form.ownerName}
                            onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                            className="input"
                            placeholder="e.g., John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="input"
                            placeholder="you@restaurant.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="input"
                            placeholder="Min 6 characters"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Phone (optional)</label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="input"
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 text-lg disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Restaurant →"}
                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#ff6b35] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>

                <p className="text-center text-xs text-gray-500 mt-4">
                    By signing up, you agree to our Terms and Privacy Policy
                </p>
            </div>
        </div>
    )
}
