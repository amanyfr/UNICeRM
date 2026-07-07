require('dotenv').config();
const { PrismaClient } = require('../generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Mulai seeding database UNICeRM...\n');

  // ==================== 1. USERS ====================
  console.log('👤 Membuat users...');

  const hashedAdmin   = await bcrypt.hash('admin123', 10);
  const hashedAgent   = await bcrypt.hash('cs123', 10);
  const hashedCustomer = await bcrypt.hash('cust123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@uniinside.id' },
    update: {},
    create: {
      email:    'admin@uniinside.id',
      password: hashedAdmin,
      name:     'Admin UNICeRM',
      role:     'ADMIN',
      isActive: true,
    },
  });

  const agent = await prisma.user.upsert({
    where: { email: 'cs@uniinside.id' },
    update: {},
    create: {
      email:    'cs@uniinside.id',
      password: hashedAgent,
      name:     'Customer Service UNICeRM',
      role:     'AGENT',
      isActive: true,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@gmail.com' },
    update: {},
    create: {
      email:    'customer@gmail.com',
      password: hashedCustomer,
      name:     'Rafi Ahmad',
      role:     'CUSTOMER',
      isActive: true,
    },
  });

  console.log(`  ✅ Admin   : ${admin.email} (id: ${admin.id})`);
  console.log(`  ✅ Agent   : ${agent.email} (id: ${agent.id})`);
  console.log(`  ✅ Customer: ${customer.email} (id: ${customer.id})`);

  // ==================== 2. CUSTOMER PROFILE ====================
  console.log('\n🏷️  Membuat customer profile...');

  const customerProfile = await prisma.customer.upsert({
    where: { userId: customer.id },
    update: {},
    create: {
      userId:  customer.id,
      phone:   '081234567890',
      company: 'Demo Company',
      segment: 'AKTIF',
      source:  'Website',
    },
  });

  console.log(`  ✅ Customer profile untuk userId: ${customerProfile.userId}`);

  // ==================== 3. VOUCHERS ====================
  console.log('\n🎟️  Membuat vouchers...');

  const now = new Date();

  const voucher1 = await prisma.voucher.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code:        'WELCOME10',
      title:       'Selamat Datang',
      description: 'Diskon 10% untuk pelanggan baru UNICeRM',
      discount:    10,
      validUntil:  new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()),
      isActive:    true,
    },
  });

  const voucher2 = await prisma.voucher.upsert({
    where: { code: 'UNICERM20' },
    update: {},
    create: {
      code:        'UNICERM20',
      title:       'Member Spesial',
      description: 'Diskon 20% untuk member spesial UNICeRM',
      discount:    20,
      validUntil:  new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
      isActive:    true,
    },
  });

  const voucher3 = await prisma.voucher.upsert({
    where: { code: 'SPECIAL50' },
    update: {},
    create: {
      code:        'SPECIAL50',
      title:       'Promo Terbatas',
      description: 'Diskon 50% promo terbatas waktu',
      discount:    50,
      validUntil:  new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // +2 minggu
      isActive:    true,
    },
  });

  console.log(`  ✅ Voucher: ${voucher1.code} - ${voucher1.discount}% (valid 3 bulan)`);
  console.log(`  ✅ Voucher: ${voucher2.code} - ${voucher2.discount}% (valid 1 bulan)`);
  console.log(`  ✅ Voucher: ${voucher3.code} - ${voucher3.discount}% (valid 2 minggu)`);

  // ==================== 4. TICKETS ====================
  console.log('\n🎫 Membuat tickets...');

  const ticket1 = await prisma.ticket.upsert({
    where: { ticketNumber: 'TKT-20240101-0001' },
    update: {},
    create: {
      ticketNumber: 'TKT-20240101-0001',
      title:        'Tidak bisa login',
      description:  'Customer tidak dapat melakukan login ke sistem. Sudah mencoba reset password tapi masih gagal.',
      status:       'OPEN',
      priority:     'HIGH',
      channel:      'CHAT',
      customerId:   customer.id,
      assignedTo:   agent.id,
    },
  });

  const ticket2 = await prisma.ticket.upsert({
    where: { ticketNumber: 'TKT-20240101-0002' },
    update: {},
    create: {
      ticketNumber: 'TKT-20240101-0002',
      title:        'Pertanyaan layanan',
      description:  'Customer memiliki pertanyaan mengenai layanan dan fitur yang tersedia di platform.',
      status:       'IN_PROGRESS',
      priority:     'MEDIUM',
      channel:      'EMAIL',
      customerId:   customer.id,
      assignedTo:   agent.id,
    },
  });

  console.log(`  ✅ Ticket: ${ticket1.ticketNumber} - "${ticket1.title}" [${ticket1.status}]`);
  console.log(`  ✅ Ticket: ${ticket2.ticketNumber} - "${ticket2.title}" [${ticket2.status}]`);

  // ==================== SUMMARY ====================
  console.log('\n✨ Seeding selesai! Ringkasan:');
  console.log('   - 3 Users (Admin, Agent, Customer)');
  console.log('   - 1 Customer Profile');
  console.log('   - 3 Vouchers');
  console.log('   - 2 Tickets');
  console.log('\n📋 Akun Login:');
  console.log('   Admin    : admin@uniinside.id    / admin123');
  console.log('   Agent    : cs@uniinside.id       / cs123');
  console.log('   Customer : customer@gmail.com    / cust123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding gagal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
