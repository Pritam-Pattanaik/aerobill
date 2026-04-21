import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function buildDatasourceUrl(): string | undefined {
    let url = process.env.DATABASE_URL
    if (!url) return undefined

    // Remove channel_binding=require — it conflicts with PgBouncer pooling on Neon
    // and causes PrismaClientInitializationError during cold starts
    url = url.replace(/&?channel_binding=require/g, '')

    // Ensure a generous connect_timeout for Neon cold-start wake-up (default 5s is too short)
    if (!url.includes('connect_timeout')) {
        url += (url.includes('?') ? '&' : '?') + 'connect_timeout=30'
    }

    return url
}

function createPrismaClient() {
    const datasourceUrl = buildDatasourceUrl()
    if (!datasourceUrl) {
        console.warn("DATABASE_URL is missing. Prisma queries will fail.")
        return new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
        })
    }

    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
        datasourceUrl,
    })
}

// Singleton pattern to prevent connection exhaustion
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Cache in globalThis for both dev and production
globalForPrisma.prisma = prisma

