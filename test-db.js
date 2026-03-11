const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing connection...');
        await prisma.$connect();
        console.log('Database connection successful!');

        const tableCount = await prisma.table.count();
        const orderCount = await prisma.order.count();
        const userCount = await prisma.user.count();
        const restaurantCount = await prisma.restaurant.count();
        const contactInfo = await prisma.contactInfo.findFirst();

        console.log(`Summary: Users: ${userCount}, Restaurants: ${restaurantCount}, Tables: ${tableCount}, Orders: ${orderCount}`);
        console.log(`Contact info in DB:`, contactInfo);

        const restaurants = await prisma.restaurant.findMany({ take: 1 });
        if (restaurants.length > 0) {
            console.log('Found restaurant:', restaurants[0].name, '- Slug:', restaurants[0].slug);
        } else {
            console.log('No restaurants found in the database. You might need to seed the data.');
        }
    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
