import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Standard Prisma client with singleton pattern for serverless
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
})

// Cache in globalThis for both dev and production to prevent connection exhaustion
// Critical for serverless environments like Vercel
globalForPrisma.prisma = prisma

