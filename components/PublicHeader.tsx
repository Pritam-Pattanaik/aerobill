"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
]

export default function PublicHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="Aerobill" width={120} height={40} className="h-10 md:h-12 w-auto" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right side: Login + Get Started (desktop), Hamburger (mobile) */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/login" className="hidden sm:block text-gray-300 hover:text-white transition text-sm md:text-base">
                        Login
                    </Link>
                    <Link href="/register" className="bg-[#ff6b35] text-white px-3 md:px-4 py-2 rounded-lg font-medium hover:bg-[#ff8c5a] transition text-sm md:text-base">
                        Get Started
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition text-gray-300"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 py-4 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-lg space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition sm:hidden"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}
