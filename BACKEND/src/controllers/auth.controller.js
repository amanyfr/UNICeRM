const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const prisma = require('../lib/prisma');

// Konversi role DB (uppercase) → lowercase untuk response frontend
const normalizeRole = (role) => role.toLowerCase();

// ==================== LOGIN ====================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email dan password wajib diisi' });
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Email atau password salah' });
    }

    if (!user.isActive) {
      return res.status(401).json({ status: 'error', message: 'Akun tidak aktif' });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Email atau password salah' });
    }

    // Generate JWT token
    const payload = {
      id:   user.id,
      email: user.email,
      role: normalizeRole(user.role),
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    return res.status(200).json({
      status: 'success',
      token,
      user: {
        id:    user.id,
        email: user.email,
        name:  user.name,
        role:  normalizeRole(user.role),
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== REGISTER ====================
const register = async (req, res) => {
  try {
    const { email, password, name, phone, company, address } = req.body;

    // Validasi input wajib
    if (!email || !password || !name) {
      return res.status(400).json({ status: 'error', message: 'Email, password, dan nama wajib diisi' });
    }

    // Cek email sudah terdaftar
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ status: 'error', message: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru (selalu CUSTOMER untuk register publik)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role:     'CUSTOMER',
        isActive: true,
      },
    });

    // Buat customer profile
    await prisma.customer.create({
      data: {
        userId:  newUser.id,
        phone:   phone   || null,
        company: company || null,
        address: address || null,
        segment: 'PROSPEK',
        source:  'Website',
      },
    });

    return res.status(201).json({
      status:  'success',
      message: 'Registrasi berhasil',
      user: {
        id:    newUser.id,
        email: newUser.email,
        name:  newUser.name,
        role:  normalizeRole(newUser.role),
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== GET ME ====================
const getMe = async (req, res) => {
  try {
    // req.user sudah di-attach oleh auth.middleware
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id:        true,
        email:     true,
        name:      true,
        role:      true,
        isActive:  true,
        createdAt: true,
        customer:  true,
      },
    });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User tidak ditemukan' });
    }

    return res.status(200).json({
      status: 'success',
      user: {
        ...user,
        role: normalizeRole(user.role),
      },
    });
  } catch (err) {
    console.error('GetMe error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== GET ALL AGENTS ====================
const getAgents = async (req, res) => {
  try {
    const agents = await prisma.user.findMany({
      where: { role: 'AGENT' },
      select: {
        id:        true,
        email:     true,
        name:      true,
        role:      true,
        isActive:  true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      status: 'success',
      data: agents.map(agent => ({
        ...agent,
        role: normalizeRole(agent.role),
      })),
    });
  } catch (err) {
    console.error('getAgents error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== CREATE AGENT ====================
const createAgent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validasi input wajib
    if (!name || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Name, email, dan password wajib diisi' });
    }

    // Validasi email unik
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ status: 'error', message: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru dengan role AGENT
    const newAgent = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role:     'AGENT',
        isActive: true,
      },
      select: {
        id:        true,
        email:     true,
        name:      true,
        role:      true,
        isActive:  true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      status: 'success',
      data: {
        ...newAgent,
        role: normalizeRole(newAgent.role),
      },
    });
  } catch (err) {
    console.error('createAgent error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== DELETE AGENT ====================
const deleteAgent = async (req, res) => {
  try {
    const agentId = parseInt(req.params.id);

    // Validasi user ada
    const user = await prisma.user.findUnique({ where: { id: agentId } });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User tidak ditemukan' });
    }

    // Validasi user adalah AGENT
    if (user.role !== 'AGENT') {
      return res.status(400).json({ status: 'error', message: 'User bukan agent' });
    }

    // Hapus agent
    await prisma.user.delete({ where: { id: agentId } });

    return res.status(200).json({
      status: 'success',
      message: 'Agent berhasil dihapus',
    });
  } catch (err) {
    console.error('deleteAgent error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== CHANGE PASSWORD ====================
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validasi field tidak boleh kosong
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ status: 'error', message: 'oldPassword, newPassword, dan confirmPassword wajib diisi' });
    }

    // Validasi newPassword dan confirmPassword harus sama
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ status: 'error', message: 'newPassword dan confirmPassword tidak sama' });
    }

    // Validasi panjang minimal
    if (newPassword.length < 8) {
      return res.status(400).json({ status: 'error', message: 'Password baru minimal 8 karakter' });
    }

    // Cari user berdasarkan id dari token
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User tidak ditemukan' });
    }

    // Verifikasi oldPassword
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'Password lama tidak sesuai' });
    }

    // Hash newPassword
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password di tabel users
    await prisma.user.update({
      where: { id: req.user.id },
      data:  { password: hashedPassword },
    });

    return res.status(200).json({ status: 'success', message: 'Password berhasil diubah' });
  } catch (err) {
    console.error('changePassword error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = { login, register, getMe, getAgents, createAgent, deleteAgent, changePassword };
