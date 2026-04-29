const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://neondb_owner:npg_N6FnTZy4ekCf@ep-weathered-breeze-a113zk4h.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
        }
    }
});

async function wakeUp() {
    console.log("Attempting to wake up Neon Database...");
    
    for (let i = 1; i <= 15; i++) {
        console.log(`\nAttempt ${i}/15...`);
        try {
            const start = Date.now();
            await prisma.$connect();
            const res = await prisma.$queryRaw`SELECT 1 as ok`;
            console.log(`✅ Success! Database is awake. Connected in ${Date.now() - start}ms.`);
            await prisma.$disconnect();
            return;
        } catch (err) {
            console.log(`❌ Attempt ${i} failed: ${err.message.split('\n')[0]}`);
            if (i < 15) {
                console.log("Waiting 5 seconds before next attempt...");
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } finally {
            try { await prisma.$disconnect(); } catch (e) {}
        }
    }
    console.log("\nFailed to wake up the database after 15 attempts.");
}

wakeUp();
