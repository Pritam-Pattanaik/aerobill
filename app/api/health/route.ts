import { NextResponse } from 'next/server'

export async function GET() {
    // Only check presence of required env vars — never expose values or names
    const allSet = !!process.env.DATABASE_URL &&
        !!process.env.NEXTAUTH_SECRET &&
        !!(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME) &&
        !!process.env.CLOUDINARY_API_KEY &&
        !!process.env.CLOUDINARY_API_SECRET

    return NextResponse.json({
        status: allSet ? 'healthy' : 'degraded',
        timestamp: new Date().toISOString()
    }, { status: allSet ? 200 : 503 })
}
