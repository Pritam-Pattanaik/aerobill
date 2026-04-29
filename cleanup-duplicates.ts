import { prisma } from './lib/prisma';

async function main() {
    console.log("Looking up demo restaurant...");
    const restaurant = await prisma.restaurant.findUnique({
        where: { slug: 'demo-restaurant' },
        include: {
            products: true
        }
    });

    if (!restaurant) {
        console.log("Demo restaurant not found!");
        return;
    }

    console.log(`Found restaurant: ${restaurant.id}. Products count: ${restaurant.products.length}`);
    
    // Group by lowercase name
    const grouped: Record<string, typeof restaurant.products> = {};
    for (const product of restaurant.products) {
        const key = product.name.trim().toLowerCase();
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(product);
    }

    for (const [name, items] of Object.entries(grouped)) {
        if (items.length > 1) {
            console.log(`\nDuplicate found: "${name}" (${items.length} copies)`);
            // Sort by createdAt so we keep the oldest (or newest), or keep the one with ingredients
            
            // Fetch ingredients to see which one has the recipe
            const productsWithDetails = await Promise.all(items.map(async (i: any) => {
                const withDetails = await prisma.product.findUnique({
                    where: { id: i.id },
                    include: { ingredients: true, orderItems: true }
                });
                return withDetails;
            }));

            // Let's sort to decide which to keep:
            // 1. One with ingredients gets priority
            // 2. One with more orders gets priority
            // 3. Oldest gets priority
            productsWithDetails.sort((a: any, b: any) => {
                if (a.ingredients.length !== b.ingredients.length) return b.ingredients.length - a.ingredients.length;
                if (a.orderItems.length !== b.orderItems.length) return b.orderItems.length - a.orderItems.length;
                return a.createdAt.getTime() - b.createdAt.getTime();
            });

            const keep = productsWithDetails[0]!;
            const toDelete = productsWithDetails.slice(1);

            console.log(`Keeping ID ${keep.id} (Orders: ${keep.orderItems.length}, Ingredients: ${keep.ingredients.length})`);

            for (const itemToDelete of toDelete) {
                if (!itemToDelete) continue;
                console.log(`  Targeting ID ${itemToDelete.id} (Orders: ${itemToDelete.orderItems.length}, Ingredients: ${itemToDelete.ingredients.length})`);
                if (itemToDelete.orderItems.length === 0) {
                    await prisma.product.delete({ where: { id: itemToDelete.id } });
                    console.log(`  -> Deleted successfully!`);
                } else {
                    await prisma.product.update({
                        where: { id: itemToDelete.id },
                        data: { isAvailable: false, name: `${itemToDelete.name} (Archived)` }
                    });
                    console.log(`  -> Has orders. Marked as Unavailable and renamed to Archived.`);
                }
            }
        }
    }
    console.log("\nCleanup complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
