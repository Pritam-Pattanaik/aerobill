const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
    try {
        console.log("Checking for Test Agent Reseller...");
        const reseller = await prisma.reseller.findUnique({
            where: { email: 'testagent@example.com' },
            include: { restaurants: true }
        });

        if (!reseller) {
            console.log("Reseller not found.");
            return;
        }

        console.log("Found Reseller:", reseller.name);
        console.log("Referral Code:", reseller.referralCode);
        console.log("Restaurants Referred:", reseller.restaurants.length);
        
        if (reseller.restaurants.length > 0) {
            console.log("Referred Restaurant Link Verified:");
            reseller.restaurants.forEach(rest => {
                console.log(`- ${rest.name} (${rest.email})`);
            });
        }
    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabase();
