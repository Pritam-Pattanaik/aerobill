"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const registered = searchParams.get("registered") === "true"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const result = await signIn("credentials", { email, password, redirect: false })
            if (result?.error) setError("Invalid email or password")
            else router.push("/admin")
        } catch {
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="glass-card p-8 w-full max-w-md">
            <div className="text-center mb-8">
                <Link href="/"><h1 className="text-3xl font-bold text-[#ff6b35] mb-2">Aerobill</h1></Link>
                <p className="text-gray-400">Sign in to your dashboard</p>
            </div>

            {registered && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 text-green-400 text-sm mb-4">
                    Account created! Please sign in.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@restaurant.com" required />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" required />
                </div>
                {error && <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">{error}</div>}
                <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? "Signing in..." : "Sign In"}</button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
                Don't have an account? <Link href="/register" className="text-[#ff6b35] hover:underline">Create one</Link>
            </p>
        </div>
    )
}

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
            <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </main>
    )
}
