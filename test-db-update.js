const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const prisma = new PrismaClient();
    try {
        console.log("Updating contact info to verify write access...");
        const updated = await prisma.contactInfo.upsert({
            where: { id: "contact-info" },
            update: {
                phone: "+91 9777295707",
                whatsapp: "+91 9777295707",
                address: "7th Floor, DLF Cybercity, Bhubaneswar, Odisha, 751024",
                mapUrl: "https://maps.app.goo.gl/SbAGjB9xVuBP3Wpo8",
                facebook: "https://fb.com/1771508891638",
                instagram: "https://www.instagram.com/assetmagnets/",
                linkedin: "https://www.linkedin.com/company/assetmagnets/",
            },
            create: {
                id: "contact-info",
                email: "support@aerobill.in",
                phone: "+91 9777295707",
                whatsapp: "+91 9777295707",
                address: "7th Floor, DLF Cybercity, Bhubaneswar, Odisha, 751024",
                mapUrl: "https://maps.app.goo.gl/SbAGjB9xVuBP3Wpo8",
                officeHours: "Mon-Sat : 9.00 AM - 6.30 PM",
                facebook: "https://fb.com/1771508891638",
                twitter: null,
                instagram: "https://www.instagram.com/assetmagnets/",
                linkedin: "https://www.linkedin.com/company/assetmagnets/",
            }
        });
        console.log("Updated record:", updated);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
