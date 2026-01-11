import { PrismaClient } from '@prisma/client'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

// Enable WebSocket for Neon serverless in Node.js
neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    // Use Neon serverless adapter with connection pooling
    const connectionString = process.env.DATABASE_URL!
    const pool = new Pool({ connectionString })
    // @ts-expect-error - adapter types are compatible at runtime
    const adapter = new PrismaNeon(pool)

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })
}

// Optimized Prisma client for serverless with connection pooling
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Cache in globalThis to prevent connection exhaustion in dev
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
