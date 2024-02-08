const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userData = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@prisma.io',
  },
  {
    firstName: 'Nilu',
    lastName: 'Yadav',
    email: 'nilu@prisma.io',
  },
  {
    firstName: 'Mahmoud',
    lastName: 'Abdul-Rahman',
    email: 'mahmoud@prisma.io',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
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