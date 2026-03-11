"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MobileNavContextType {
    isOpen: boolean
    toggle: () => void
    close: () => void
}

const MobileNavContext = createContext<MobileNavContextType | null>(null)

function useMobileNav() {
    const context = useContext(MobileNavContext)
    if (!context) throw new Error("useMobileNav must be used within MobileNavProvider")
    return context
}

export function MobileNavProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = useCallback(() => setIsOpen(prev => !prev), [])
    const close = useCallback(() => setIsOpen(false), [])

    return (
        <MobileNavContext.Provider value={{ isOpen, toggle, close }}>
            {children}
        </MobileNavContext.Provider>
    )
}

interface NavItem {
    href: string
    label: string
    icon: string
}

interface MobileNavProps {
    navItems: NavItem[]
    variant?: "admin" | "super-admin"
    brandName?: string
    brandSubtitle?: string
    extraLinks?: ReactNode
    signOutAction?: () => void
}

export function HamburgerButton({ variant = "admin" }: { variant?: "admin" | "super-admin" }) {
    const { isOpen, toggle } = useMobileNav()
    const isSuperAdmin = variant === "super-admin"

    return (
        <button
            onClick={toggle}
            className={`md:hidden p-2 rounded-lg transition-all ${isSuperAdmin
                ? "hover:bg-purple-500/20 text-purple-400"
                : "hover:bg-[var(--card-hover)] text-[var(--primary)]"
                }`}
            aria-label="Toggle navigation"
        >
            <svg
                className="w-6 h-6 transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>
    )
}

export function MobileSidebar({
    navItems,
    variant = "admin",
    brandName = "Aerobill",
    brandSubtitle,
    extraLinks,
    signOutAction
}: MobileNavProps) {
    const { isOpen, close } = useMobileNav()
    const pathname = usePathname()
    const isSuperAdmin = variant === "super-admin"

    const handleNavClick = () => {
        close()
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={close}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-72 md:hidden flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } ${isSuperAdmin
                        ? "bg-slate-900/95 backdrop-blur-xl border-r border-purple-500/20"
                        : "glass-card rounded-none border-t-0 border-l-0 border-b-0"
                    }`}
            >
                {/* Logo */}
                <div className={`p-6 border-b ${isSuperAdmin ? "border-purple-500/20" : "border-[var(--border)]"} flex-shrink-0`}>
                    <Link href="/" onClick={handleNavClick}>
                        <h1 className={`text-2xl font-bold bg-gradient-to-r ${isSuperAdmin
                            ? "from-purple-400 to-indigo-400"
                            : "from-[#ff6b35] to-[#ff8c5a]"
                            } bg-clip-text text-transparent`}>
                            {brandName}
                        </h1>
                    </Link>
                    {brandSubtitle && (
                        <p className={`text-sm mt-1 ${isSuperAdmin ? "text-purple-400" : "text-gray-500"}`}>
                            {brandSubtitle}
                        </p>
                    )}
                    {isSuperAdmin && (
                        <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 text-xs font-medium">
                                SUPER ADMIN
                            </span>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={handleNavClick}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isSuperAdmin
                                        ? pathname === item.href
                                            ? "bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/30 text-white"
                                            : "text-gray-400 hover:bg-purple-500/10 hover:text-white"
                                        : pathname === item.href
                                            ? "bg-[var(--primary)] text-white"
                                            : "text-gray-400 hover:bg-[var(--card-hover)] hover:text-white"
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Extra links */}
                {extraLinks && (
                    <div className={`p-4 border-t ${isSuperAdmin ? "border-purple-500/20" : "border-[var(--border)]"} flex-shrink-0`}>
                        {extraLinks}
                    </div>
                )}

                {/* Sign out */}
                {signOutAction && (
                    <div className={`p-4 border-t ${isSuperAdmin ? "border-purple-500/20" : "border-[var(--border)]"} flex-shrink-0`}>
                        <button
                            onClick={() => {
                                close()
                                signOutAction()
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
                        >
                            <span className="text-lg">🚪</span>
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                )}
            </aside>
        </>
    )
}
