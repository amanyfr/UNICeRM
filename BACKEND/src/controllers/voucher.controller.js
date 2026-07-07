const prisma = require('../lib/prisma');
const { createNotification } = require('../lib/notification');

// ==================== GET ALL VOUCHERS ====================
const getAllVouchers = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    // Debug log
    console.log('📍 User role:', role);

    // Role detection yang handle uppercase dan lowercase
    const isAdmin = role === 'ADMIN' || role === 'admin';
    const isAgent = role === 'AGENT' || role === 'agent';

    // Build where clause berdasarkan role
    let whereClause = {};
    if (isAdmin) {
      whereClause = {}; // Semua voucher tanpa filter (termasuk isActive: false)
    } else if (isAgent) {
      whereClause = { isActive: true };
    } else {
      // CUSTOMER
      whereClause = { isActive: true };
    }

    console.log('📍 Where clause:', JSON.stringify(whereClause));

    // Untuk ADMIN dan AGENT: return semua field + _count claims
    if (isAdmin || isAgent) {
      const vouchers = await prisma.voucher.findMany({
        where: whereClause,
        include: {
          _count: { select: { claimedVouchers: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      console.log('📍 Vouchers found:', vouchers.length);
      vouchers.forEach(v => console.log('  -', v.code, 'isActive:', v.isActive));

      return res.json({
        status: 'success',
        data: vouchers.map((v) => ({
          ...v,
          totalClaimed: v._count.claimedVouchers,
          _count: undefined,
        })),
      });
    }

    // CUSTOMER: voucher aktif + field isClaimed
    const vouchers = await prisma.voucher.findMany({
      where: whereClause,
      include: {
        claimedVouchers: {
          where:  { userId },
          select: { id: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log('📍 Vouchers found (CUSTOMER):', vouchers.length);

    return res.json({
      status: 'success',
      data: vouchers.map((v) => ({
        id:          v.id,
        code:        v.code,
        title:       v.title,
        description: v.description,
        discount:    v.discount,
        validUntil:  v.validUntil,
        isActive:    v.isActive,
        createdAt:   v.createdAt,
        isClaimed:   v.claimedVouchers.length > 0,
      })),
    });
  } catch (err) {
    console.error('getAllVouchers error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== CREATE VOUCHER ====================
const createVoucher = async (req, res) => {
  try {
    const { code, title, description, discount, validUntil, type, discountType } = req.body;

    // Validasi field wajib
    if (!code || !title || !discount || !validUntil) {
      return res.status(400).json({
        status:  'error',
        message: 'code, title, discount, dan validUntil wajib diisi',
      });
    }

    // Validasi discount berdasarkan tipe
    const voucherType = type || discountType; // fallback jika ada 2 field berbeda
    const isPercentage = !voucherType || voucherType === 'PERSENTASE' || voucherType === 'percentage';

    if (isPercentage && (discount < 1 || discount > 100)) {
      return res.status(400).json({
        status:  'error',
        message: 'Diskon persen harus antara 1 dan 100',
      });
    }

    if (!isPercentage && discount < 1) {
      return res.status(400).json({
        status:  'error',
        message: 'Nilai diskon harus lebih dari 0',
      });
    }

    // Validasi validUntil harus di masa depan
    const expDate = new Date(validUntil);
    if (isNaN(expDate.getTime()) || expDate <= new Date()) {
      return res.status(400).json({
        status:  'error',
        message: 'validUntil harus berupa tanggal yang valid dan di masa depan',
      });
    }

    // Validasi code unik
    const existing = await prisma.voucher.findUnique({ where: { code } });
    if (existing) {
      return res.status(409).json({
        status:  'error',
        message: `Kode voucher '${code}' sudah digunakan`,
      });
    }

    const voucher = await prisma.voucher.create({
      data: {
        code:        code.toUpperCase(),
        title,
        description: description || null,
        discount:    parseInt(discount),
        validUntil:  expDate,
        isActive:    true,
      },
    });

    return res.status(201).json({ status: 'success', data: voucher });
  } catch (err) {
    console.error('createVoucher error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== CLAIM VOUCHER ====================
const claimVoucher = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const voucherId = parseInt(req.params.id);

    // 1. Cek voucher ada
    const voucher = await prisma.voucher.findUnique({ where: { id: voucherId } });
    if (!voucher) {
      return res.status(404).json({ status: 'error', message: 'Voucher tidak ditemukan' });
    }

    // 2. Cek voucher masih aktif
    if (!voucher.isActive) {
      return res.status(400).json({ status: 'error', message: 'Voucher sudah tidak aktif' });
    }

    // 3. Cek voucher belum expired
    if (new Date(voucher.validUntil) <= new Date()) {
      return res.status(400).json({ status: 'error', message: 'Voucher sudah kadaluarsa' });
    }

    // 4. Cek user belum pernah klaim
    const alreadyClaimed = await prisma.claimedVoucher.findUnique({
      where: { voucherId_userId: { voucherId, userId } },
    });
    if (alreadyClaimed) {
      return res.status(409).json({ status: 'error', message: 'Kamu sudah pernah mengklaim voucher ini' });
    }

    // Simpan klaim
    const claimedVoucher = await prisma.claimedVoucher.create({
      data: { voucherId, userId },
      include: {
        voucher: true,
      },
    });

    // Notifikasi ke customer
    await createNotification(
      userId,
      'Voucher Berhasil Diklaim',
      `Voucher ${voucher.code} berhasil diklaim! Diskon ${voucher.discount}% siap digunakan.`,
      'VOUCHER'
    );

    return res.status(201).json({
      status:  'success',
      message: 'Voucher berhasil diklaim',
      data:    { claimedVoucher },
    });
  } catch (err) {
    console.error('claimVoucher error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== DEACTIVATE VOUCHER ====================
const deactivateVoucher = async (req, res) => {
  try {
    const voucherId = parseInt(req.params.id);

    const voucher = await prisma.voucher.findUnique({ where: { id: voucherId } });
    if (!voucher) {
      return res.status(404).json({ status: 'error', message: 'Voucher tidak ditemukan' });
    }

    if (!voucher.isActive) {
      return res.status(400).json({ status: 'error', message: 'Voucher sudah tidak aktif' });
    }

    await prisma.voucher.update({
      where: { id: voucherId },
      data:  { isActive: false },
    });

    return res.json({ status: 'success', message: 'Voucher dinonaktifkan' });
  } catch (err) {
    console.error('deactivateVoucher error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== TOGGLE VOUCHER (ACTIVATE/DEACTIVATE) ====================
const toggleVoucher = async (req, res) => {
  try {
    const voucherId = parseInt(req.params.id);

    // Cari voucher berdasarkan id
    const voucher = await prisma.voucher.findUnique({ where: { id: voucherId } });
    if (!voucher) {
      return res.status(404).json({ status: 'error', message: 'Voucher tidak ditemukan' });
    }

    // Toggle isActive: true → false, false → true
    const updatedVoucher = await prisma.voucher.update({
      where: { id: voucherId },
      data:  { isActive: !voucher.isActive },
    });

    const statusText = updatedVoucher.isActive ? 'diaktifkan' : 'dinonaktifkan';
    return res.json({
      status:  'success',
      message: `Voucher berhasil ${statusText}`,
      data:    updatedVoucher,
    });
  } catch (err) {
    console.error('toggleVoucher error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== DELETE VOUCHER (PERMANENT) ====================
const deleteVoucher = async (req, res) => {
  try {
    const voucherId = parseInt(req.params.id);

    // Validasi voucher ada
    const voucher = await prisma.voucher.findUnique({ where: { id: voucherId } });
    if (!voucher) {
      return res.status(404).json({ status: 'error', message: 'Voucher tidak ditemukan' });
    }

    // Hapus voucher secara permanen
    await prisma.voucher.delete({
      where: { id: voucherId },
    });

    return res.json({ status: 'success', message: 'Voucher berhasil dihapus' });
  } catch (err) {
    console.error('deleteVoucher error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = { getAllVouchers, createVoucher, claimVoucher, deactivateVoucher, deleteVoucher, toggleVoucher };
