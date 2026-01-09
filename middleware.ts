import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req })
        const isAuth = !!token
        const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL("/admin", req.url))
            }
            return null
        }

        if (!isAuth) {
            let from = req.nextUrl.pathname
            if (req.nextUrl.search) {
                from += req.nextUrl.search
            }
            return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
        }

        // Role-based access control
        const role = token?.role as string
        const path = req.nextUrl.pathname

        // Admin/Owner only routes
        if (path.startsWith("/admin")) {
            if (role !== "OWNER" && role !== "ADMIN") {
                return NextResponse.redirect(new URL("/kitchen", req.url))
            }
        }

        // Waiter restrictions (can access kitchen, but maybe we want to restrict them from verifying settings etc if they had access)
        // Currently Waiter has no specific route other than /kitchen or public table view

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: ["/admin/:path*", "/kitchen/:path*", "/login", "/register"],
}
