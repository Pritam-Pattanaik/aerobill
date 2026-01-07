import * as dotenv from 'dotenv'
import * as path from 'path'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Create admin user
    const adminPassword = await hash('admin123', 12)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@aerobill.com' },
        update: {},
        create: {
            email: 'admin@aerobill.com',
            name: 'Admin',
            passwordHash: adminPassword,
            role: 'ADMIN',
        },
    })
    console.log('✅ Created admin user:', admin.email)

    // Create kitchen user
    const kitchenPassword = await hash('kitchen123', 12)
    const kitchen = await prisma.user.upsert({
        where: { email: 'kitchen@aerobill.com' },
        update: {},
        create: {
            email: 'kitchen@aerobill.com',
            name: 'Kitchen Staff',
            passwordHash: kitchenPassword,
            role: 'KITCHEN',
        },
    })
    console.log('✅ Created kitchen user:', kitchen.email)

    // Create settings
    const settings = await prisma.settings.upsert({
        where: { id: 'default-settings' },
        update: {},
        create: {
            id: 'default-settings',
            cafeName: 'Aerobill Cafe',
            taxRate: 5,
            feedbackLink: null,
        },
    })
    console.log('✅ Created settings:', settings.cafeName)

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { name: 'Indian' },
            update: {},
            create: { name: 'Indian', sortOrder: 1 },
        }),
        prisma.category.upsert({
            where: { name: 'Chinese' },
            update: {},
            create: { name: 'Chinese', sortOrder: 2 },
        }),
        prisma.category.upsert({
            where: { name: 'Beverages' },
            update: {},
            create: { name: 'Beverages', sortOrder: 3 },
        }),
        prisma.category.upsert({
            where: { name: 'Desserts' },
            update: {},
            create: { name: 'Desserts', sortOrder: 4 },
        }),
    ])
    console.log('✅ Created categories:', categories.map((c: { name: string }) => c.name).join(', '))

    // Create sample products
    const products = [
        { name: 'Paneer Butter Masala', price: 250, isVeg: true, categoryName: 'Indian' },
        { name: 'Dal Makhani', price: 180, isVeg: true, categoryName: 'Indian' },
        { name: 'Chicken Biryani', price: 280, isVeg: false, categoryName: 'Indian' },
        { name: 'Butter Naan', price: 45, isVeg: true, categoryName: 'Indian' },
        { name: 'Veg Manchurian', price: 180, isVeg: true, categoryName: 'Chinese' },
        { name: 'Hakka Noodles', price: 160, isVeg: true, categoryName: 'Chinese' },
        { name: 'Chicken Fried Rice', price: 200, isVeg: false, categoryName: 'Chinese' },
        { name: 'Masala Chai', price: 30, isVeg: true, categoryName: 'Beverages' },
        { name: 'Cold Coffee', price: 80, isVeg: true, categoryName: 'Beverages' },
        { name: 'Fresh Lime Soda', price: 50, isVeg: true, categoryName: 'Beverages' },
        { name: 'Gulab Jamun', price: 60, isVeg: true, categoryName: 'Desserts' },
        { name: 'Ice Cream', price: 80, isVeg: true, categoryName: 'Desserts' },
    ]

    for (const product of products) {
        const category = categories.find((c: { name: string }) => c.name === product.categoryName)
        if (category) {
            await prisma.product.upsert({
                where: {
                    id: `${product.name.toLowerCase().replace(/\s/g, '-')}-id`
                },
                update: {},
                create: {
                    id: `${product.name.toLowerCase().replace(/\s/g, '-')}-id`,
                    name: product.name,
                    price: product.price,
                    isVeg: product.isVeg,
                    isAvailable: true,
                    categoryId: category.id,
                },
            })
        }
    }
    console.log('✅ Created sample products')

    // Create tables
    const tableCount = 10
    for (let i = 1; i <= tableCount; i++) {
        await prisma.table.upsert({
            where: { number: i },
            update: {},
            create: {
                number: i,
                isActive: true,
            },
        })
    }
    console.log(`✅ Created ${tableCount} tables`)

    // Create sample inventory
    const inventoryItems = [
        { name: 'Rice', quantity: 50, unit: 'kg', pricePerUnit: 60 },
        { name: 'Cooking Oil', quantity: 20, unit: 'liters', pricePerUnit: 150 },
        { name: 'Paneer', quantity: 10, unit: 'kg', pricePerUnit: 350 },
        { name: 'Chicken', quantity: 15, unit: 'kg', pricePerUnit: 280 },
        { name: 'Tea Leaves', quantity: 5, unit: 'kg', pricePerUnit: 400 },
        { name: 'Sugar', quantity: 25, unit: 'kg', pricePerUnit: 45 },
    ]

    for (const item of inventoryItems) {
        await prisma.inventory.upsert({
            where: { id: `${item.name.toLowerCase().replace(/\s/g, '-')}-inv` },
            update: {},
            create: {
                id: `${item.name.toLowerCase().replace(/\s/g, '-')}-inv`,
                name: item.name,
                quantity: item.quantity,
                unit: item.unit,
                pricePerUnit: item.pricePerUnit,
            },
        })
    }
    console.log('✅ Created sample inventory items')

    console.log('')
    console.log('🎉 Seed completed successfully!')
    console.log('')
    console.log('📋 Login credentials:')
    console.log('   Admin: admin@aerobill.com / admin123')
    console.log('   Kitchen: kitchen@aerobill.com / kitchen123')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
