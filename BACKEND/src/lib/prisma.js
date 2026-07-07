const { PrismaClient } = require('../../generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');

// Singleton PrismaClient dengan driver adapter (Prisma v7)
let prisma;

if (process.env.NODE_ENV === 'production') {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  prisma = new PrismaClient({ adapter });
} else {
  // Di development, reuse instance supaya tidak banyak koneksi saat hot-reload
  if (!global.__prisma) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    global.__prisma = new PrismaClient({ adapter });
  }
  prisma = global.__prisma;
}

module.exports = prisma;
