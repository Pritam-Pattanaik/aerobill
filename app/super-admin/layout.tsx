"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { SessionProvider } from "next-auth/react"

const navItems = [
    { href: "/super-admin", label: "Dashboard", icon: "🏠" },
    { href: "/super-admin/restaurants", label: "Restaurants", icon: "🍽️" },
    { href: "/super-admin/subscriptions", label: "Subscriptions", icon: "💳" },
    { href: "/super-admin/orders", label: "Orders", icon: "📦" },
]

function SuperAdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Don't show layout on login page
    if (pathname === "/super-admin/login") {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900/80 backdrop-blur-xl border-r border-purple-500/20 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-purple-500/20">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Aerobill
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 text-xs font-medium">
                            SUPER ADMIN
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === item.href
                                            ? "bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/30 text-white"
                                            : "text-gray-400 hover:bg-purple-500/10 hover:text-white"
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sign out */}
                <div className="p-4 border-t border-purple-500/20">
                    <button
                        onClick={() => signOut({ callbackUrl: "/super-admin/login" })}
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
    )
}

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <SuperAdminLayoutContent>{children}</SuperAdminLayoutContent>
        </SessionProvider>
    )
}
