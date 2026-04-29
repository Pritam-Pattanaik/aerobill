import { prisma } from './lib/prisma';

async function main() {
    console.log("Checking recent orders...");
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            ingredients: true
                        }
                    }
                }
            }
        }
    });

    for (const order of orders) {
        console.log(`Order ${order.id} - Status: ${order.status}`);
        for (const item of order.items) {
            console.log(`  Item: ${item.product.name} x${item.quantity}`);
            console.log(`    Recipe Ingredients: ${item.product.ingredients.length}`);
            for (const ing of item.product.ingredients) {
                console.log(`      Ing: InvID ${ing.inventoryId}, Qty: ${ing.quantity}`);
            }
        }
    }

    console.log("\nChecking Chicken Biryani Product...");
    const biryani = await prisma.product.findFirst({
        where: { name: { contains: 'Biryani', mode: 'insensitive' } },
        include: { ingredients: { include: { inventory: true } } }
    });

    if (biryani) {
        console.log(`Found Biryani: ID ${biryani.id}, Name: ${biryani.name}`);
        console.log(`Ingredients: ${biryani.ingredients.length}`);
        for (const ing of biryani.ingredients) {
            console.log(`  - Inv: ${ing.inventory?.name} (${ing.inventoryId}), Qty: ${ing.quantity}`);
        }
    } else {
        console.log("No Biryani product found.");
    }

    console.log("\nChecking Settings...");
    const settings = await prisma.settings.findFirst();
    if (settings) {
        console.log(`Settings: inventoryDeduction = ${settings.inventoryDeduction}`);
    } else {
        console.log("No settings found.");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
