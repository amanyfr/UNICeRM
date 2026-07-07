const router     = require('express').Router();
const { login, register, getMe, getAgents, createAgent, deleteAgent, changePassword } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const requireRole    = require('../middleware/role.middleware');

// POST /api/auth/login    — publik
router.post('/login', login);

// POST /api/auth/register — publik
router.post('/register', register);

// GET  /api/auth/me       — protected
router.get('/me', authMiddleware, getMe);

// GET    /api/auth/agents     — ADMIN only
router.get('/agents', authMiddleware, requireRole('ADMIN'), getAgents);

// POST   /api/auth/agents     — ADMIN only
router.post('/agents', authMiddleware, requireRole('ADMIN'), createAgent);

// DELETE /api/auth/agents/:id — ADMIN only
router.delete('/agents/:id', authMiddleware, requireRole('ADMIN'), deleteAgent);

// PATCH /api/auth/change-password — semua role yang sudah login
router.patch('/change-password', authMiddleware, changePassword);

module.exports = router;
