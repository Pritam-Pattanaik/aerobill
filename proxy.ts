import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function proxy(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // Allow kitchen staff and admins to access kitchen
        if (path.startsWith("/kitchen")) {
            if (token?.role !== "ADMIN" && token?.role !== "KITCHEN") {
                return NextResponse.redirect(new URL("/login", req.url))
            }
        }

        // Only admins can access admin routes
        if (path.startsWith("/admin")) {
            if (token?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/login", req.url))
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)

export const config = {
    matcher: ["/admin/:path*", "/kitchen/:path*"]
}
