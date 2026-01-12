"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerRestaurant } from "@/app/actions/auth"

type Step = 1 | 2 | 3
type Plan = "FREE" | "STARTER" | "BUSINESS" | "ENTERPRISE"

const plans = [
    { id: "FREE" as Plan, name: "Free", price: "₹0", period: "/forever", tables: "5", products: "Basic", desc: "Perfect for getting started", paymentLink: null },
    { id: "STARTER" as Plan, name: "Standard", price: "₹999", period: "/month", tables: "15", products: "Full", desc: "Great for small restaurants", paymentLink: "https://rzp.io/rzp/K9dlQCU" },
    { id: "BUSINESS" as Plan, name: "Premium", price: "₹1,999", period: "/month", tables: "30", products: "Unlimited", desc: "For growing businesses", popular: true, paymentLink: "https://rzp.io/rzp/GmrQt8g" },
    { id: "ENTERPRISE" as Plan, name: "Elite", price: "₹3,999", period: "/month", tables: "Unlimited", products: "Unlimited", desc: "Full power, no limits", paymentLink: "https://rzp.io/rzp/u0AJIYPZ" },
]

export default function RegisterPage() {
    const router = useRouter()
    const [step, setStep] = useState<Step>(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Step 1: Personal Details
    const [personal, setPersonal] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" })
    // Step 2: Restaurant Details
    const [restaurant, setRestaurant] = useState({ name: "", address: "", phone: "", gst: "", fssai: "" })
    // Step 3: Subscription
    const [selectedPlan, setSelectedPlan] = useState<Plan>("FREE")

    const validateStep1 = () => {
        if (!personal.name || !personal.email || !personal.password) {
            setError("Name, Email and Password are required")
            return false
        }
        if (personal.password.length < 6) {
            setError("Password must be at least 6 characters")
            return false
        }
        if (personal.password !== personal.confirmPassword) {
            setError("Passwords do not match")
            return false
        }
        setError("")
        return true
    }

    const validateStep2 = () => {
        if (!restaurant.name) {
            setError("Restaurant name is required")
            return false
        }
        setError("")
        return true
    }

    const handleNext = () => {
        if (step === 1 && validateStep1()) setStep(2)
        else if (step === 2 && validateStep2()) setStep(3)
    }

    const handleBack = () => {
        setError("")
        if (step > 1) setStep((step - 1) as Step)
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError("")
        try {
            // Always register with FREE plan first
            // For paid plans, webhook will upgrade after successful payment
            const result = await registerRestaurant({
                ownerName: personal.name,
                email: personal.email,
                ownerPhone: personal.phone,
                password: personal.password,
                restaurantName: restaurant.name,
                restaurantAddress: restaurant.address,
                restaurantPhone: restaurant.phone,
                gstNumber: restaurant.gst,
                fssaiLicense: restaurant.fssai,
                plan: "FREE", // Always start with FREE
            })

            if (result.success) {
                // If user selected a paid plan, redirect to payment
                const selectedPlanData = plans.find(p => p.id === selectedPlan)
                if (selectedPlan !== "FREE" && selectedPlanData?.paymentLink) {
                    // Razorpay short URLs don't support query params - redirect directly
                    window.location.href = selectedPlanData.paymentLink
                } else {
                    // Free plan - go directly to login
                    router.push("/login?registered=true")
                }
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
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold text-[#ff6b35]">Aerobill</Link>
                    <h1 className="text-2xl font-bold mt-4">Create Your Restaurant</h1>
                    <p className="text-gray-400 mt-2">Step {step} of 3</p>
                </div>

                {/* Progress Bar */}
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex-1 h-2 rounded-full ${s <= step ? "bg-[#ff6b35]" : "bg-[var(--card)]"}`} />
                    ))}
                </div>

                {/* Step Content */}
                <div className="glass-card p-8">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm mb-6">
                            {error}
                        </div>
                    )}

                    {/* Step 1: Personal Details */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4">👤 Personal Details</h2>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Your Name *</label>
                                <input type="text" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                                    className="input" placeholder="John Doe" required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email *</label>
                                <input type="email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                                    className="input" placeholder="you@email.com" required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Phone</label>
                                <input type="tel" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                                    className="input" placeholder="+91 98765 43210" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Password *</label>
                                    <input type="password" value={personal.password} onChange={(e) => setPersonal({ ...personal, password: e.target.value })}
                                        className="input" placeholder="Min 6 characters" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Confirm Password *</label>
                                    <input type="password" value={personal.confirmPassword} onChange={(e) => setPersonal({ ...personal, confirmPassword: e.target.value })}
                                        className="input" placeholder="Re-enter password" required />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Restaurant Details */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4">🍽️ Restaurant Details</h2>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Restaurant Name *</label>
                                <input type="text" value={restaurant.name} onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
                                    className="input" placeholder="The Urban Kitchen" required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Address</label>
                                <input type="text" value={restaurant.address} onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
                                    className="input" placeholder="123 Main Street, City" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Restaurant Phone</label>
                                <input type="tel" value={restaurant.phone} onChange={(e) => setRestaurant({ ...restaurant, phone: e.target.value })}
                                    className="input" placeholder="+91 98765 43210" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">GST Number</label>
                                    <input type="text" value={restaurant.gst} onChange={(e) => setRestaurant({ ...restaurant, gst: e.target.value })}
                                        className="input" placeholder="22AAAAA0000A1Z5" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">FSSAI License</label>
                                    <input type="text" value={restaurant.fssai} onChange={(e) => setRestaurant({ ...restaurant, fssai: e.target.value })}
                                        className="input" placeholder="12345678901234" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Choose Plan */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">💳 Choose Your Plan</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {plans.map((plan) => (
                                    <div key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan === plan.id ? "border-[#ff6b35] bg-[#ff6b35]/10" : "border-[var(--border)] hover:border-[var(--border)]/80"
                                            } ${plan.popular ? "ring-2 ring-[#ff6b35]/30" : ""}`}>
                                        {plan.popular && <div className="text-xs text-[#ff6b35] font-semibold mb-2">⭐ Most Popular</div>}
                                        <h3 className="font-bold text-lg">{plan.name}</h3>
                                        <div className="mt-1">
                                            <span className="text-2xl font-bold">{plan.price}</span>
                                            <span className="text-gray-400 text-sm">{plan.period}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-2">{plan.desc}</p>
                                        <div className="mt-3 text-xs text-gray-500">
                                            <div>📦 {plan.tables} Tables</div>
                                            <div>🍽️ {plan.products} Products</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-8">
                        {step > 1 && (
                            <button onClick={handleBack} className="btn-secondary flex-1 py-3">
                                ← Back
                            </button>
                        )}
                        {step < 3 ? (
                            <button onClick={handleNext} className="btn-primary flex-1 py-3">
                                Next →
                            </button>
                        ) : (
                            <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 py-3 disabled:opacity-50">
                                {loading ? "Creating..." : selectedPlan === "FREE" ? "Create Restaurant 🚀" : "Create & Subscribe 💳"}
                            </button>
                        )}
                    </div>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account? <Link href="/login" className="text-[#ff6b35] hover:underline">Sign in</Link>
                    </p>
                </div>

                <p className="text-center text-xs text-gray-500 mt-4">
                    By signing up, you agree to our Terms and Privacy Policy
                </p>
            </div>
        </div>
    )
}
