require('dotenv').config({ path: '.env.local' });

const { neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
neonConfig.webSocketConstructor = ws;

const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
    const connectionString = process.env.DATABASE_URL;
    console.log('Using URL:', connectionString ? connectionString.substring(0, 30) + '...' : 'UNDEFINED');
    
    // In Prisma 6.x, PrismaNeon takes the config object, NOT a pool instance!
    const adapter = new PrismaNeon({ connectionString });
    const prisma = new PrismaClient({ adapter });

    try {
        const count = await prisma.user.count();
        console.log('✅ Connected via adapter! User count:', count);
        
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { email: 'admin@aerobill.com' },
            include: { restaurant: true }
        });

        if (!user) {
            console.log('❌ User admin@aerobill.com NOT FOUND in database');
        } else {
            console.log('✅ User found:', user.email, '| Role:', user.role);
            console.log('   Restaurant:', user.restaurant?.name || 'None', '| Active:', user.restaurant?.isActive || false);
            
            // Verify password
            const isValid = await bcrypt.compare('admin123', user.passwordHash);
            console.log('   Password "admin123" valid:', isValid);
        }
    } catch (error) {
        console.error('Error connecting to DB:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
