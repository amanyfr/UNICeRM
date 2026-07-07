const router      = require('express').Router();
const auth        = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const {
  getAllTickets,
  createTicket,
  getTicketById,
  updateTicket,
  sendMessage,
} = require('../controllers/ticket.controller');

// GET  /api/tickets         — semua role (ADMIN, AGENT, CUSTOMER)
router.get('/', auth, getAllTickets);

// POST /api/tickets         — hanya CUSTOMER
router.post('/', auth, requireRole('CUSTOMER'), createTicket);

// GET  /api/tickets/:id     — semua role
router.get('/:id', auth, getTicketById);

// PATCH /api/tickets/:id    — hanya ADMIN & AGENT
router.patch('/:id', auth, requireRole('ADMIN', 'AGENT'), updateTicket);

// POST /api/tickets/:id/messages — semua role
router.post('/:id/messages', auth, sendMessage);

module.exports = router;
