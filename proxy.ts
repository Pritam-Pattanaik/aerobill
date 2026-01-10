import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isSuperAdmin = token?.isSuperAdmin === true
    const path = req.nextUrl.pathname

    // Super Admin login page - redirect to super-admin if already logged in as super admin
    if (path.startsWith("/super-admin/login")) {
        if (isAuth && isSuperAdmin) {
            return NextResponse.redirect(new URL("/super-admin", req.url))
        }
        return NextResponse.next()
    }

    // Super Admin routes - require super admin auth
    if (path.startsWith("/super-admin")) {
        if (!isAuth) {
            return NextResponse.redirect(new URL("/super-admin/login", req.url))
        }
        if (!isSuperAdmin) {
            // Regular users trying to access super admin - redirect to their dashboard
            return NextResponse.redirect(new URL("/admin", req.url))
        }
        return NextResponse.next()
    }

    // Regular auth pages - redirect based on user type
    if (path.startsWith("/login") || path.startsWith("/register")) {
        if (isAuth) {
            // Super admins go to super-admin, regular users go to admin
            const redirectUrl = isSuperAdmin ? "/super-admin" : "/admin"
            return NextResponse.redirect(new URL(redirectUrl, req.url))
        }
        return NextResponse.next()
    }

    // Protected routes - redirect to login if not authenticated
    if (path.startsWith("/admin") || path.startsWith("/kitchen")) {
        if (!isAuth) {
            const from = encodeURIComponent(path + req.nextUrl.search)
            return NextResponse.redirect(new URL(`/login?from=${from}`, req.url))
        }

        // Super admins shouldn't access regular admin (redirect them to super-admin)
        if (isSuperAdmin) {
            return NextResponse.redirect(new URL("/super-admin", req.url))
        }

        // Role-based access control for admin routes
        if (path.startsWith("/admin")) {
            const role = token?.role as string
            if (role !== "OWNER" && role !== "ADMIN") {
                return NextResponse.redirect(new URL("/kitchen", req.url))
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/kitchen/:path*", "/login", "/register", "/super-admin/:path*"],
}
