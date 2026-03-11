const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const posts = await prisma.blogPost.findMany({ select: { id: true, title: true, coverImage: true } })
  
  posts.forEach(post => {
      console.log(`\n--- POST: ${post.title} ---`)
      if (!post.coverImage) {
          console.log("No cover image.")
          return
      }

      console.log(`RAW LENGTH: ${post.coverImage.length}`)
      
      const containsWhitespace = /\s/.test(post.coverImage)
      console.log(`Contains whitespace/newlines? ${containsWhitespace}`)
      
      // Let's print out the exact character codes of the first and last 10 characters to see if there is corruption
      const first10 = post.coverImage.substring(0, 10)
      const last10 = post.coverImage.substring(post.coverImage.length - 10)
      
      console.log("Start chars:", first10.split('').map(c => `[${c}:${c.charCodeAt(0)}]`).join(' '))
      console.log("End chars:  ", last10.split('').map(c => `[${c}:${c.charCodeAt(0)}]`).join(' '))
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
