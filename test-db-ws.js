const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const ws = require('ws');

require('dotenv').config({ path: '.env' });
neonConfig.webSocketConstructor = ws;

async function main() {
    console.log("Using DATABASE_URL:", process.env.DATABASE_URL);
    try {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaNeon(pool);
        const prisma = new PrismaClient({ adapter });

        const count = await prisma.contactInfo.count();
        console.log("ContactInfo count:", count);
    } catch (e) {
        console.error("Caught error:", e);
    }
    process.exit(0);
}
main();
