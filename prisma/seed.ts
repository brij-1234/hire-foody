import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })


async function main() {
  console.log("Start seeding...");

  await prisma.vendor.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Alice",
      phone: "9999999999",
      email: "alice@example.com",
      password: "password123",
      role: "user",
      vendor: {
        create: {
          shopName: "Alice Store",
          description: "Best food corner",
          category: "Food",
          lat: 28.61,
          lng: 77.23,
          address: "Delhi",
        },
      },
    },
  });

  console.log("Seed finished:", user.id);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
