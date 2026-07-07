const prisma = require('../lib/prisma');

// ==================== GET ALL NOTIFICATIONS ====================
const getAllNotifications = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const notifications = await prisma.notification.findMany({
      where:   { userId },
      orderBy: { createdAt: 'desc' },
    });

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return res.json({
      status: 'success',
      data:   notifications,
      meta:   { total: notifications.length, unreadCount },
    });
  } catch (err) {
    console.error('getAllNotifications error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== MARK ALL AS READ ====================
const markAllAsRead = async (req, res) => {
  try {
    const { id: userId } = req.user;

    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data:  { isRead: true },
    });

    return res.json({
      status:  'success',
      message: 'Semua notifikasi ditandai sudah dibaca',
    });
  } catch (err) {
    console.error('markAllAsRead error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== MARK ONE AS READ ====================
const markAsRead = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const notifId = parseInt(req.params.id);

    if (isNaN(notifId)) {
      return res.status(400).json({ status: 'error', message: 'ID notifikasi tidak valid' });
    }

    // Cek notifikasi ada dan milik user ini
    const notif = await prisma.notification.findUnique({ where: { id: notifId } });
    if (!notif) {
      return res.status(404).json({ status: 'error', message: 'Notifikasi tidak ditemukan' });
    }
    if (notif.userId !== userId) {
      return res.status(403).json({ status: 'error', message: 'Akses ditolak' });
    }

    const updated = await prisma.notification.update({
      where: { id: notifId },
      data:  { isRead: true },
    });

    return res.json({ status: 'success', data: updated });
  } catch (err) {
    console.error('markAsRead error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== DELETE NOTIFICATION ====================
const deleteNotification = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const notifId = parseInt(req.params.id);

    if (isNaN(notifId)) {
      return res.status(400).json({ status: 'error', message: 'ID notifikasi tidak valid' });
    }

    // Cek notifikasi ada dan milik user ini
    const notif = await prisma.notification.findUnique({ where: { id: notifId } });
    if (!notif) {
      return res.status(404).json({ status: 'error', message: 'Notifikasi tidak ditemukan' });
    }
    if (notif.userId !== userId) {
      return res.status(403).json({ status: 'error', message: 'Akses ditolak' });
    }

    await prisma.notification.delete({ where: { id: notifId } });

    return res.json({ status: 'success', message: 'Notifikasi dihapus' });
  } catch (err) {
    console.error('deleteNotification error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = { getAllNotifications, markAllAsRead, markAsRead, deleteNotification };
