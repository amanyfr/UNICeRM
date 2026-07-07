const router      = require('express').Router();
const auth        = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const { sendMessage, getHistory } = require('../controllers/chatbot.controller');

// POST /api/chatbot/message  — hanya CUSTOMER
router.post('/message', auth, requireRole('CUSTOMER'), sendMessage);

// GET  /api/chatbot/history  — hanya CUSTOMER
router.get('/history', auth, requireRole('CUSTOMER'), getHistory);

module.exports = router;
