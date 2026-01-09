import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Optimized Prisma client for serverless with connection pooling
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
})

// Always cache in globalThis to prevent connection exhaustion
globalForPrisma.prisma = prisma
