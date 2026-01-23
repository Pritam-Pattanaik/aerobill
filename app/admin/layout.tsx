"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
import { Suspense } from "react"
import NavigationProgress from "@/components/NavigationProgress"
import { MobileNavProvider, HamburgerButton, MobileSidebar } from "@/components/MobileNav"

const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/menu", label: "Menu", icon: "🍽️" },
    { href: "/admin/inventory", label: "Inventory", icon: "📦" },
    { href: "/admin/purchase-orders", label: "Marketplace", icon: "🛒" },
    { href: "/admin/tables", label: "Tables", icon: "🪑" },
    { href: "/admin/billing", label: "Billing", icon: "🧾" },
    { href: "/admin/users", label: "Staff", icon: "👥" },
    { href: "/admin/subscription", label: "Subscription", icon: "💳" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
]

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const kitchenLink = (
        <Link
            href="/kitchen"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 transition-all"
        >
            <span className="text-lg">🍳</span>
            <span className="font-medium">Kitchen Display</span>
        </Link>
    )

    return (
        <MobileNavProvider>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Mobile Header */}
                <header className="md:hidden sticky top-0 z-30 glass-card rounded-none border-t-0 border-x-0 py-3 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <HamburgerButton variant="admin" />
                            <Link href="/">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] bg-clip-text text-transparent">
                                    Aerobill
                                </h1>
                            </Link>
                        </div>
                        <span className="text-xs text-gray-500 bg-[var(--card)] px-2 py-1 rounded-lg">Admin</span>
                    </div>
                </header>

                {/* Mobile Sidebar */}
                <MobileSidebar
                    navItems={navItems}
                    variant="admin"
                    brandSubtitle="Admin Panel"
                    extraLinks={kitchenLink}
                    signOutAction={() => signOut({ callbackUrl: "/" })}
                />

                {/* Desktop Sidebar */}
                <aside className="hidden md:flex w-64 h-screen sticky top-0 glass-card rounded-none border-t-0 border-l-0 border-b-0 flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b border-[var(--border)] flex-shrink-0">
                        <Link href="/">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] bg-clip-text text-transparent">
                                Aerobill
                            </h1>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === item.href
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

                    {/* Kitchen shortcut */}
                    <div className="p-4 border-t border-[var(--border)] flex-shrink-0">
                        {kitchenLink}
                    </div>

                    {/* Sign out */}
                    <div className="p-4 border-t border-[var(--border)] flex-shrink-0">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
                        >
                            <span className="text-lg">🚪</span>
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </MobileNavProvider>
    )
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <Suspense fallback={null}>
                <NavigationProgress />
            </Suspense>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    )
}
