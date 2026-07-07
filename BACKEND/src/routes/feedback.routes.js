const router      = require('express').Router();
const auth        = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const { createFeedback, getAllFeedbacks, getFeedbackStats, getMyFeedbacks } = require('../controllers/feedback.controller');

// Urutan PENTING — semua static route harus sebelum /:id

// GET  /api/feedbacks/stats  — ADMIN only
router.get('/stats', auth, requireRole('ADMIN'), getFeedbackStats);

// GET  /api/feedbacks/my     — CUSTOMER only (harus sebelum /:id)
router.get('/my', auth, requireRole('CUSTOMER'), getMyFeedbacks);

// GET  /api/feedbacks        — ADMIN & AGENT
router.get('/', auth, requireRole('ADMIN', 'AGENT'), getAllFeedbacks);

// POST /api/feedbacks        — CUSTOMER only
router.post('/', auth, requireRole('CUSTOMER'), createFeedback);

module.exports = router;
