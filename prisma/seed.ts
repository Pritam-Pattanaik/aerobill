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

    // Create super admin for platform management
    const superAdminPassword = await hash('superadmin123', 12)
    await prisma.superAdmin.upsert({
        where: { email: 'super@aerobill.com' },
        update: {},
        create: {
            email: 'super@aerobill.com',
            name: 'Super Admin',
            passwordHash: superAdminPassword,
            isActive: true,
        },
    })
    console.log('✅ Created super admin: super@aerobill.com / superadmin123')

    // Create marketplace products for super admin
    const marketplaceProducts = [
        // Vegetables
        { name: 'Fresh Tomatoes', description: 'Farm-fresh red tomatoes, perfect for curries and salads', price: 40, unit: 'kg', category: 'Vegetables', inStock: true, minOrder: 5 },
        { name: 'Onions', description: 'Premium quality onions for everyday cooking', price: 35, unit: 'kg', category: 'Vegetables', inStock: true, minOrder: 5 },
        { name: 'Potatoes', description: 'Fresh potatoes ideal for frying and curries', price: 30, unit: 'kg', category: 'Vegetables', inStock: true, minOrder: 10 },
        { name: 'Green Capsicum', description: 'Crunchy bell peppers for stir-fries and salads', price: 80, unit: 'kg', category: 'Vegetables', inStock: true, minOrder: 2 },
        { name: 'Carrots', description: 'Sweet and fresh carrots', price: 45, unit: 'kg', category: 'Vegetables', inStock: true, minOrder: 3 },

        // Spices
        { name: 'Turmeric Powder', description: 'Pure turmeric powder for authentic Indian cooking', price: 180, unit: 'kg', category: 'Spices', inStock: true, minOrder: 1 },
        { name: 'Red Chilli Powder', description: 'Spicy red chilli powder for that perfect heat', price: 220, unit: 'kg', category: 'Spices', inStock: true, minOrder: 1 },
        { name: 'Garam Masala', description: 'Aromatic blend of premium spices', price: 350, unit: 'kg', category: 'Spices', inStock: true, minOrder: 1 },
        { name: 'Cumin Seeds', description: 'Whole cumin seeds for tempering', price: 280, unit: 'kg', category: 'Spices', inStock: true, minOrder: 1 },
        { name: 'Coriander Powder', description: 'Freshly ground coriander powder', price: 160, unit: 'kg', category: 'Spices', inStock: true, minOrder: 1 },

        // Dairy
        { name: 'Fresh Paneer', description: 'Soft and fresh cottage cheese', price: 320, unit: 'kg', category: 'Dairy', inStock: true, minOrder: 2 },
        { name: 'Butter', description: 'Creamy butter for cooking and garnishing', price: 480, unit: 'kg', category: 'Dairy', inStock: true, minOrder: 1 },
        { name: 'Curd', description: 'Fresh homestyle curd', price: 60, unit: 'L', category: 'Dairy', inStock: true, minOrder: 5 },
        { name: 'Fresh Cream', description: 'Rich cream for gravies and desserts', price: 280, unit: 'L', category: 'Dairy', inStock: true, minOrder: 2 },

        // Grains & Pulses
        { name: 'Basmati Rice', description: 'Premium long-grain basmati rice', price: 120, unit: 'kg', category: 'Grains & Pulses', inStock: true, minOrder: 10 },
        { name: 'Wheat Flour (Atta)', description: 'Whole wheat flour for rotis and parathas', price: 45, unit: 'kg', category: 'Grains & Pulses', inStock: true, minOrder: 10 },
        { name: 'Toor Dal', description: 'Split pigeon peas for dal preparations', price: 140, unit: 'kg', category: 'Grains & Pulses', inStock: true, minOrder: 5 },
        { name: 'Chana Dal', description: 'Bengal gram for curries and snacks', price: 110, unit: 'kg', category: 'Grains & Pulses', inStock: true, minOrder: 5 },

        // Oils
        { name: 'Sunflower Oil', description: 'Refined sunflower oil for cooking', price: 150, unit: 'L', category: 'Oils', inStock: true, minOrder: 5 },
        { name: 'Mustard Oil', description: 'Pure mustard oil for authentic flavors', price: 180, unit: 'L', category: 'Oils', inStock: true, minOrder: 5 },
        { name: 'Ghee', description: 'Pure desi ghee for rich taste', price: 550, unit: 'kg', category: 'Oils', inStock: true, minOrder: 2 },

        // Beverages
        { name: 'Tea Leaves', description: 'Premium Assam tea leaves', price: 400, unit: 'kg', category: 'Beverages', inStock: true, minOrder: 1 },
        { name: 'Coffee Powder', description: 'Aromatic filter coffee powder', price: 450, unit: 'kg', category: 'Beverages', inStock: true, minOrder: 1 },

        // Packaging
        { name: 'Food Containers (500ml)', description: 'Disposable food containers with lids', price: 8, unit: 'pcs', category: 'Packaging', inStock: true, minOrder: 100 },
        { name: 'Paper Napkins', description: 'Soft paper napkins pack of 100', price: 45, unit: 'pack', category: 'Packaging', inStock: true, minOrder: 10 },
        { name: 'Takeaway Bags', description: 'Eco-friendly paper bags for takeaway', price: 5, unit: 'pcs', category: 'Packaging', inStock: true, minOrder: 100 },
    ]

    for (const product of marketplaceProducts) {
        await prisma.marketplaceProduct.upsert({
            where: { id: `marketplace-${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}` },
            update: {},
            create: {
                id: `marketplace-${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                name: product.name,
                description: product.description,
                price: product.price,
                unit: product.unit,
                category: product.category,
                inStock: product.inStock,
                minOrder: product.minOrder,
            },
        })
    }
    console.log('✅ Created', marketplaceProducts.length, 'marketplace products')

    console.log('')
    console.log('🎉 Seed completed!')
    console.log('')
    console.log('📋 Demo credentials:')
    console.log('   Owner: admin@aerobill.com / admin123')
    console.log('   Kitchen: kitchen@aerobill.com / kitchen123')
    console.log('   Super Admin: super@aerobill.com / superadmin123')
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })

