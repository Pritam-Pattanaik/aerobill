const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const posts = await prisma.blogPost.findMany({ select: { id: true, coverImage: true, title: true } })
  
  for (const post of posts) {
      if (post.coverImage) {
          // Remove all newlines, carriage returns, and spaces from the URL string
          const cleanedUrl = post.coverImage.replace(/[\n\r\s]+/g, '')
          
          if (cleanedUrl !== post.coverImage) {
              console.log(`Fixing Post ID ${post.id}:`)
              console.log(`  Before: ${JSON.stringify(post.coverImage)}`)
              console.log(`  After:  ${JSON.stringify(cleanedUrl)}`)
              
              await prisma.blogPost.update({
                  where: { id: post.id },
                  data: { coverImage: cleanedUrl }
              })
          } else {
              console.log(`Post ID ${post.id} URL is already clean: ${post.coverImage}`)
          }
      }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
