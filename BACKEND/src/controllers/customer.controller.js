const prisma  = require('../lib/prisma');
const bcrypt  = require('bcryptjs');

/** Flatten customer record: gabung data dari tabel customers + users */
const flattenCustomer = (c) => ({
  id:        c.id,
  userId:    c.userId,
  name:      c.user.name,
  email:     c.user.email,
  phone:     c.phone,
  company:   c.company,
  address:   c.address,
  segment:   c.segment,
  source:    c.source,
  isActive:  c.user.isActive,
  createdAt: c.createdAt,
});

// Include yang dipakai di semua query
const customerInclude = {
  user: {
    select: { id: true, name: true, email: true, isActive: true },
  },
};

// ==================== GET ALL CUSTOMERS ====================
// Protected: ADMIN & AGENT
const getAllCustomers = async (req, res) => {
  try {
    const { segment, search, period } = req.query;

    // Filter periode
    let dateFilter = {};
    if (period) {
      const days = period === '7D' ? 7 : period === '30D' ? 30 : period === '90D' ? 90 : 180;
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      dateFilter = { createdAt: { gte: fromDate } };
    }

    const where = { ...dateFilter };
    if (segment) where.segment = segment.toUpperCase();
    if (search) {
      where.user = {
        OR: [
          { name:  { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const customers = await prisma.customer.findMany({
      where,
      include:  customerInclude,
      orderBy:  { createdAt: 'desc' },
    });

    return res.json({
      status: 'success',
      data:   customers.map(flattenCustomer),
      meta:   { total: customers.length },
    });
  } catch (err) {
    console.error('getAllCustomers error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== GET CUSTOMER BY ID ====================
// Protected: ADMIN & AGENT, atau CUSTOMER melihat profil sendiri
const getCustomerById = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const targetId = parseInt(req.params.id);

    const customer = await prisma.customer.findUnique({
      where:   { id: targetId },
      include: customerInclude,
    });

    if (!customer) {
      return res.status(404).json({ status: 'error', message: 'Customer tidak ditemukan' });
    }

    // CUSTOMER hanya boleh lihat profil sendiri
    if (role === 'customer' && customer.userId !== userId) {
      return res.status(403).json({ status: 'error', message: 'Akses ditolak' });
    }

    return res.json({ status: 'success', data: flattenCustomer(customer) });
  } catch (err) {
    console.error('getCustomerById error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== GET MY PROFILE ====================
// Protected: CUSTOMER — ambil profil sendiri berdasarkan userId
const getMyProfile = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const customer = await prisma.customer.findUnique({
      where:   { userId },
      include: customerInclude,
    });

    if (!customer) {
      return res.status(404).json({ status: 'error', message: 'Profil customer tidak ditemukan' });
    }

    return res.json({ status: 'success', data: flattenCustomer(customer) });
  } catch (err) {
    console.error('getMyProfile error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== UPDATE CUSTOMER ====================
// Protected: ADMIN (update segment/source), CUSTOMER (update phone/address/company)
const updateCustomer = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const targetId = parseInt(req.params.id);

    const customer = await prisma.customer.findUnique({
      where:   { id: targetId },
      include: customerInclude,
    });

    if (!customer) {
      return res.status(404).json({ status: 'error', message: 'Customer tidak ditemukan' });
    }

    // CUSTOMER hanya bisa update profil sendiri
    if (role === 'customer' && customer.userId !== userId) {
      return res.status(403).json({ status: 'error', message: 'Akses ditolak' });
    }

    const { phone, address, company, segment, source } = req.body;
    const updateData = {};

    // Field yang bisa diupdate oleh customer maupun staff
    if (phone   !== undefined) updateData.phone   = phone;
    if (address !== undefined) updateData.address = address;
    if (company !== undefined) updateData.company = company;

    // Field khusus ADMIN/AGENT
    if (role !== 'customer') {
      if (segment !== undefined) updateData.segment = segment.toUpperCase();
      if (source  !== undefined) updateData.source  = source;
    }

    const updated = await prisma.customer.update({
      where:   { id: targetId },
      data:    updateData,
      include: customerInclude,
    });

    return res.json({ status: 'success', data: flattenCustomer(updated) });
  } catch (err) {
    console.error('updateCustomer error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== CREATE CUSTOMER ====================
// Protected: ADMIN & AGENT
const createCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      password = 'unicerm123',
      segment  = 'PROSPEK',
      phone,
      company,
      address,
      source,
    } = req.body;

    // Validasi field wajib
    if (!name || !email) {
      return res.status(400).json({ status: 'error', message: 'name dan email wajib diisi' });
    }

    // Validasi email belum terdaftar
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ status: 'error', message: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru dengan role CUSTOMER
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role:     'CUSTOMER',
        isActive: true,
      },
    });

    // Buat record di tabel customers
    const newCustomer = await prisma.customer.create({
      data: {
        userId:  newUser.id,
        phone:   phone   || null,
        company: company || null,
        address: address || null,
        segment: segment.toUpperCase(),
        source:  source  || null,
      },
      include: customerInclude,
    });

    return res.status(201).json({
      status: 'success',
      data:   flattenCustomer(newCustomer),
    });
  } catch (err) {
    console.error('createCustomer error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== UPDATE MY PROFILE (CUSTOMER) ====================
const updateMe = async (req, res) => {
  try {
    const { name, phone, address, company } = req.body;
    const userId = req.user.id;

    // Update name di tabel users
    if (name) {
      await prisma.user.update({
        where: { id: userId },
        data:  { name },
      });
    }

    // Update phone/address/company di tabel customers
    const customer = await prisma.customer.update({
      where:   { userId },
      data: {
        phone:   phone   !== undefined ? (phone   || null) : undefined,
        address: address !== undefined ? (address || null) : undefined,
        company: company !== undefined ? (company || null) : undefined,
      },
      include: customerInclude,
    });

    return res.json({ status: 'success', data: flattenCustomer(customer) });
  } catch (err) {
    console.error('updateMe error:', err);
    return res.status(500).json({ status: 'error', message: 'Gagal memperbarui profil' });
  }
};

// ==================== DELETE CUSTOMER ====================
// Protected: ADMIN & AGENT
const deleteCustomer = async (req, res) => {
  try {
    const targetId = parseInt(req.params.id);

    // Cari customer berdasarkan id
    const customer = await prisma.customer.findUnique({
      where:   { id: targetId },
      include: { user: { select: { id: true, role: true } } },
    });

    if (!customer) {
      return res.status(404).json({ status: 'error', message: 'Customer tidak ditemukan' });
    }

    // Validasi user yang terkait memiliki role CUSTOMER
    if (customer.user.role !== 'CUSTOMER') {
      return res.status(400).json({ status: 'error', message: 'User bukan CUSTOMER, tidak bisa dihapus melalui endpoint ini' });
    }

    const userId = customer.user.id;

    // Hapus record di tabel customers terlebih dahulu (foreign key ke users)
    await prisma.customer.delete({ where: { id: targetId } });

    // Lalu hapus user dari tabel users
    await prisma.user.delete({ where: { id: userId } });

    return res.json({ status: 'success', message: 'Customer berhasil dihapus' });
  } catch (err) {
    console.error('deleteCustomer error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = { getAllCustomers, getCustomerById, getMyProfile, updateCustomer, createCustomer, updateMe, deleteCustomer };
