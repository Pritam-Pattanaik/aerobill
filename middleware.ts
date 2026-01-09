import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    const isAuth = !!token
    const path = req.nextUrl.pathname

    // Auth pages - redirect to admin if already logged in
    if (path.startsWith("/login") || path.startsWith("/register")) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/admin", req.url))
        }
        return NextResponse.next()
    }

    // Protected routes - redirect to login if not authenticated
    if (path.startsWith("/admin") || path.startsWith("/kitchen")) {
        if (!isAuth) {
            const from = encodeURIComponent(path + req.nextUrl.search)
            return NextResponse.redirect(new URL(`/login?from=${from}`, req.url))
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
    matcher: ["/admin/:path*", "/kitchen/:path*", "/login", "/register"],
}
