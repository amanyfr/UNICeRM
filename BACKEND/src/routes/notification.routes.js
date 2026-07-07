const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const {
  getAllNotifications,
  markAllAsRead,
  markAsRead,
  deleteNotification,
} = require('../controllers/notification.controller');

// Urutan route PENTING — read-all harus sebelum /:id/read

// GET    /api/notifications            — semua role
router.get('/', auth, getAllNotifications);

// PATCH  /api/notifications/read-all  — semua role (HARUS sebelum /:id)
router.patch('/read-all', auth, markAllAsRead);

// PATCH  /api/notifications/:id/read  — semua role
router.patch('/:id/read', auth, markAsRead);

// DELETE /api/notifications/:id       — semua role
router.delete('/:id', auth, deleteNotification);

module.exports = router;
