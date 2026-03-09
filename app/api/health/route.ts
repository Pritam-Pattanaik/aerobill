import { NextResponse } from 'next/server'

export async function GET() {
    const envStatus = {
        DATABASE_URL: !!process.env.DATABASE_URL ? 'Set' : 'Missing',
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'Not set',
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: !!(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME) ? 'Set' : 'Missing',
        CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
        CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing',
        NODE_ENV: process.env.NODE_ENV || 'Not set',
    }

    const allSet = envStatus.DATABASE_URL === 'Set' &&
        envStatus.NEXTAUTH_SECRET === 'Set' &&
        envStatus.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME === 'Set' &&
        envStatus.CLOUDINARY_API_KEY === 'Set' &&
        envStatus.CLOUDINARY_API_SECRET === 'Set'

    return NextResponse.json({
        status: allSet ? 'healthy' : 'missing_env_vars',
        message: allSet
            ? 'All required environment variables are set'
            : 'Some required environment variables are missing. Check Cloud Run env vars.',
        env: envStatus,
        timestamp: new Date().toISOString()
    }, { status: allSet ? 200 : 503 })
}
