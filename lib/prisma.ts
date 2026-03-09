import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Enable WebSocket connections for the Neon serverless driver conditionally
// In Edge/Browser environments, we use the native WebSocket. In Node, we use the 'ws' package.
if (typeof WebSocket !== 'undefined') {
    neonConfig.webSocketConstructor = WebSocket
} else {
    neonConfig.webSocketConstructor = ws
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL!
    const pool = new Pool({ connectionString })
    // @ts-expect-error Prisma adapter-neon types mismatch with Neon pool instance
    const adapter = new PrismaNeon(pool)

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })
}

// Singleton pattern to prevent connection exhaustion
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Cache in globalThis for both dev and production
globalForPrisma.prisma = prisma
