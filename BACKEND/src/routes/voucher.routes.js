const router      = require('express').Router();
const auth        = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const {
  getAllVouchers,
  createVoucher,
  claimVoucher,
  deactivateVoucher,
  deleteVoucher,
  toggleVoucher,
} = require('../controllers/voucher.controller');

// GET    /api/vouchers        — semua role
router.get('/', auth, getAllVouchers);

// POST   /api/vouchers        — ADMIN only
router.post('/', auth, requireRole('ADMIN'), createVoucher);

// POST   /api/vouchers/:id/claim — CUSTOMER only
router.post('/:id/claim', auth, requireRole('CUSTOMER'), claimVoucher);

// PATCH  /api/vouchers/:id/toggle — ADMIN only (toggle isActive)
router.patch('/:id/toggle', auth, requireRole('ADMIN'), toggleVoucher);

// DELETE /api/vouchers/:id    — ADMIN only (permanent delete)
router.delete('/:id', auth, requireRole('ADMIN'), deleteVoucher);

module.exports = router;
