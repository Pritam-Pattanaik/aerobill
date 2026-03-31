import { PrismaClient } from '@prisma/client'
import { servicesData } from '../lib/services-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Service Pages...')
  
  for (const service of servicesData) {
    const existing = await prisma.servicePage.findUnique({
      where: { slug: service.slug }
    })
    
    if (!existing) {
      await prisma.servicePage.create({
        data: {
          slug: service.slug,
          name: service.name,
          title: service.title,
          description: service.description,
          heroHeading: service.heroHeading,
          heroSubheading: service.heroSubheading,
          features: service.features as any,
          benefits: service.benefits as any,
          faqs: service.faqs as any,
          isActive: true
        }
      })
      console.log(`Created service page: ${service.slug}`)
    } else {
      console.log(`Service page already exists: ${service.slug}`)
      // Update just to be safe it's in sync
      await prisma.servicePage.update({
        where: { slug: service.slug },
        data: {
          name: service.name,
          title: service.title,
          description: service.description,
          heroHeading: service.heroHeading,
          heroSubheading: service.heroSubheading,
          features: service.features as any,
          benefits: service.benefits as any,
          faqs: service.faqs as any,
        }
      })
      console.log(`Updated service page: ${service.slug}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
