import * as dotenv from 'dotenv'
import * as path from 'path'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Create demo restaurant
    const demoRestaurant = await prisma.restaurant.upsert({
        where: { slug: 'demo-restaurant' },
        update: {},
        create: {
            name: 'Demo Restaurant',
            slug: 'demo-restaurant',
            email: 'demo@aerobill.com',
            phone: '+91 98765 43210',
            address: '123 Main Street, City',
        },
    })
    console.log('✅ Created demo restaurant:', demoRestaurant.name)

    // Create FREE subscription
    await prisma.subscription.upsert({
        where: { restaurantId: demoRestaurant.id },
        update: {},
        create: {
            restaurantId: demoRestaurant.id,
            plan: 'FREE',
            status: 'ACTIVE',
        },
    })
    console.log('✅ Created FREE subscription')

    // Create owner user
    const ownerPassword = await hash('admin123', 12)
    await prisma.user.upsert({
        where: { email: 'admin@aerobill.com' },
        update: {},
        create: {
            email: 'admin@aerobill.com',
            name: 'Admin Owner',
            passwordHash: ownerPassword,
            role: 'OWNER',
            restaurantId: demoRestaurant.id,
        },
    })
    console.log('✅ Created owner: admin@aerobill.com / admin123')

    // Create kitchen user
    const kitchenPassword = await hash('kitchen123', 12)
    await prisma.user.upsert({
        where: { email: 'kitchen@aerobill.com' },
        update: {},
        create: {
            email: 'kitchen@aerobill.com',
            name: 'Kitchen Staff',
            passwordHash: kitchenPassword,
            role: 'KITCHEN',
            restaurantId: demoRestaurant.id,
        },
    })
    console.log('✅ Created kitchen: kitchen@aerobill.com / kitchen123')

    // Create settings
    await prisma.settings.upsert({
        where: { restaurantId: demoRestaurant.id },
        update: {},
        create: {
            cafeName: 'Demo Restaurant',
            taxRate: 5,
            restaurantId: demoRestaurant.id,
        },
    })
    console.log('✅ Created settings')

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { restaurantId_name: { restaurantId: demoRestaurant.id, name: 'Indian' } },
            update: {},
            create: { name: 'Indian', sortOrder: 1, restaurantId: demoRestaurant.id },
        }),
        prisma.category.upsert({
            where: { restaurantId_name: { restaurantId: demoRestaurant.id, name: 'Chinese' } },
            update: {},
            create: { name: 'Chinese', sortOrder: 2, restaurantId: demoRestaurant.id },
        }),
        prisma.category.upsert({
            where: { restaurantId_name: { restaurantId: demoRestaurant.id, name: 'Beverages' } },
            update: {},
            create: { name: 'Beverages', sortOrder: 3, restaurantId: demoRestaurant.id },
        }),
        prisma.category.upsert({
            where: { restaurantId_name: { restaurantId: demoRestaurant.id, name: 'Desserts' } },
            update: {},
            create: { name: 'Desserts', sortOrder: 4, restaurantId: demoRestaurant.id },
        }),
    ])
    console.log('✅ Created categories:', categories.map(c => c.name).join(', '))

    // Create products
    const products = [
        { name: 'Paneer Butter Masala', price: 250, isVeg: true, categoryName: 'Indian' },
        { name: 'Dal Makhani', price: 180, isVeg: true, categoryName: 'Indian' },
        { name: 'Chicken Biryani', price: 280, isVeg: false, categoryName: 'Indian' },
        { name: 'Butter Naan', price: 45, isVeg: true, categoryName: 'Indian' },
        { name: 'Veg Manchurian', price: 180, isVeg: true, categoryName: 'Chinese' },
        { name: 'Hakka Noodles', price: 160, isVeg: true, categoryName: 'Chinese' },
        { name: 'Masala Chai', price: 30, isVeg: true, categoryName: 'Beverages' },
        { name: 'Cold Coffee', price: 80, isVeg: true, categoryName: 'Beverages' },
        { name: 'Gulab Jamun', price: 60, isVeg: true, categoryName: 'Desserts' },
        { name: 'Ice Cream', price: 80, isVeg: true, categoryName: 'Desserts' },
    ]

    for (const p of products) {
        const cat = categories.find(c => c.name === p.categoryName)
        if (cat) {
            await prisma.product.create({
                data: {
                    name: p.name,
                    price: p.price,
                    isVeg: p.isVeg,
                    isAvailable: true,
                    categoryId: cat.id,
                    restaurantId: demoRestaurant.id,
                },
            })
        }
    }
    console.log('✅ Created', products.length, 'products')

    // Create tables
    for (let i = 1; i <= 5; i++) {
        await prisma.table.upsert({
            where: { restaurantId_number: { restaurantId: demoRestaurant.id, number: i } },
            update: {},
            create: { number: i, isActive: true, restaurantId: demoRestaurant.id },
        })
    }
    console.log('✅ Created 5 tables')

    console.log('')
    console.log('🎉 Seed completed!')
    console.log('')
    console.log('📋 Demo credentials:')
    console.log('   Owner: admin@aerobill.com / admin123')
    console.log('   Kitchen: kitchen@aerobill.com / kitchen123')
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
