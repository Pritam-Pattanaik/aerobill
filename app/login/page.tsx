"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Invalid email or password")
            } else {
                router.push("/admin")
            }
        } catch (err) {
            setError("Something went wrong")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            {/* Background effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] -z-10" />
            <div className="fixed top-1/3 left-1/3 w-80 h-80 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 animate-pulse" />

            <div className="glass-card p-8 w-full max-w-md animate-fadeIn">
                <div className="text-center mb-8">
                    <Link href="/">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] bg-clip-text text-transparent mb-2">
                            Aerobill
                        </h1>
                    </Link>
                    <p className="text-gray-400">Staff Login</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            placeholder="admin@aerobill.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    For restaurant staff and administrators only
                </p>
            </div>
        </main>
    )
}
