const router      = require('express').Router();
const auth        = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const {
  getAllCustomers,
  getCustomerById,
  getMyProfile,
  updateCustomer,
  createCustomer,
  updateMe,
  deleteCustomer,
} = require('../controllers/customer.controller');

// GET   /api/customers/me  — CUSTOMER: lihat profil sendiri (harus sebelum /:id)
router.get('/me', auth, requireRole('CUSTOMER'), getMyProfile);

// PATCH /api/customers/me  — CUSTOMER: update profil sendiri (harus sebelum /:id)
router.patch('/me', auth, requireRole('CUSTOMER'), updateMe);

// GET  /api/customers       — ADMIN & AGENT: semua customer + filter
router.get('/', auth, requireRole('ADMIN', 'AGENT'), getAllCustomers);

// POST /api/customers       — ADMIN & AGENT: buat customer baru
router.post('/', auth, requireRole('ADMIN', 'AGENT'), createCustomer);

// GET  /api/customers/:id   — ADMIN, AGENT, atau CUSTOMER (profil sendiri)
router.get('/:id', auth, getCustomerById);

// PATCH /api/customers/:id  — semua role (dengan batasan field per role)
router.patch('/:id', auth, updateCustomer);

// DELETE /api/customers/:id — ADMIN & AGENT: hapus customer
router.delete('/:id', auth, requireRole('ADMIN', 'AGENT'), deleteCustomer);

module.exports = router;
