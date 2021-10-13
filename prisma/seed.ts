import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function seed() {
  // Prisma create query to seed models in database
  const approve = await prisma.category.upsert({
    where: { name: 'Approve' },
    create: { id: 1, name: 'Approve' },
    update: {}
  })

  const request_changes = await prisma.category.upsert({
    where: { name: 'Request Changes' },
    create: { id: 2, name: 'Request Changes' },
    update: {}
  })

  const comment = await prisma.category.upsert({
    where: { name: 'Comment' },
    create: { id: 3, name: 'Comment' },
    update: {}
  })

  console.log({
    approve,
    request_changes,
    comment,
  })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })