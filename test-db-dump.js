const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function main() {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching contact info...");
        const data = await prisma.contactInfo.findMany();
        fs.writeFileSync('db-contact-info.json', JSON.stringify(data, null, 2));
        console.log("Wrote to db-contact-info.json");
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
