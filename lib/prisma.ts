import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Use the 'ws' package for WebSocket in Node.js environments
neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        throw new Error("DATABASE_URL is not set. Cannot create Prisma client.")
    }

    // In Prisma 6.x, PrismaNeon expects a configuration object, NOT a pool instance.
    const adapter = new PrismaNeon({ connectionString })

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })
}

// Lazy singleton — only creates the client on first access,
// ensuring env vars are loaded by then
export const prisma = new Proxy({} as PrismaClient, {
    get(_target, prop) {
        if (!globalForPrisma.prisma) {
            globalForPrisma.prisma = createPrismaClient()
        }
        return (globalForPrisma.prisma as any)[prop]
    }
})
