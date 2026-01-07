import { NextResponse } from 'next/server'

export async function GET() {
    const envStatus = {
        DATABASE_URL: !!process.env.DATABASE_URL ? 'Set' : 'Missing',
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing',
        NEXTAUTH_URL: !!process.env.NEXTAUTH_URL ? 'Set' : 'Missing',
        NODE_ENV: process.env.NODE_ENV || 'Not set'
    }

    const allSet = envStatus.DATABASE_URL === 'Set' &&
        envStatus.NEXTAUTH_SECRET === 'Set'

    return NextResponse.json({
        status: allSet ? 'healthy' : 'missing_env_vars',
        message: allSet
            ? 'All required environment variables are set'
            : 'Some required environment variables are missing. Check Vercel project settings.',
        env: envStatus,
        timestamp: new Date().toISOString()
    }, { status: allSet ? 200 : 503 })
}
