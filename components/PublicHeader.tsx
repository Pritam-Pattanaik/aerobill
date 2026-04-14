"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

type NavLink = {
    href?: string
    label: string
    dropdown?: { href: string; label: string }[]
}

const navLinks: NavLink[] = [
    { href: "/about", label: "About" },
    {
        label: "Restaurant POS",
        dropdown: [
            { href: "/restaurant-pos-software-india", label: "Overview" },
            { href: "/restaurant-billing-software", label: "Restaurant Billing Software" },
            { href: "/inventory-management-software", label: "Inventory Management" },
            { href: "/qr-code-ordering-system", label: "QR Code Ordering" },
            { href: "/kot-system", label: "KOT System" },
            { href: "/table-management-system", label: "Table Management" },
            { href: "/kitchen-display-system", label: "Kitchen Display System" },
            { href: "/restaurant-analytics-reporting", label: "Analytics & Reporting" },
            { href: "/cloud-kitchen-management-software", label: "Cloud Kitchen Software" },
        ]
    },
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
                    {navLinks.map((link, i) => (
                        link.dropdown ? (
                            <div key={i} className="relative group">
                                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition py-2">
                                    {link.label}
                                    <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                <div className="absolute top-full left-0 mt-0 w-60 rounded-xl shadow-xl bg-[#0a0a0a] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden transform origin-top group-hover:translate-y-0 translate-y-2">
                                    <div className="p-2 flex flex-col gap-1 backdrop-blur-xl">
                                        {link.dropdown.map((subItem) => (
                                            <Link key={subItem.href} href={subItem.href} className="block px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link key={link.href} href={link.href!} className="text-gray-300 hover:text-white transition">
                                {link.label}
                            </Link>
                        )
                    ))}
                </div>

                {/* Right side: Actions (desktop), Hamburger (mobile) */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/reseller" className="hidden md:block text-gray-300 hover:text-[#ff6b35] transition text-sm md:text-base font-medium">
                        Become Reseller
                    </Link>
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
                <div className="px-4 py-4 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-lg space-y-3 max-h-[75vh] overflow-y-auto">
                    {navLinks.map((link, i) => (
                        link.dropdown ? (
                            <div key={i} className="space-y-1">
                                <div className="block py-2 px-4 rounded-lg text-gray-400 font-medium">
                                    {link.label}
                                </div>
                                <div className="pl-4 space-y-1 border-l border-white/10 ml-4">
                                    {link.dropdown.map(subItem => (
                                        <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block py-2 px-4 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href!}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition"
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                    <Link
                        href="/reseller"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-4 rounded-lg text-[#ff6b35] hover:text-[#ff8c5a] hover:bg-white/5 transition md:hidden"
                    >
                        Become Reseller
                    </Link>
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
