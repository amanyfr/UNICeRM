  const prisma = require('./prisma');

/**
 * Buat satu notifikasi untuk satu user.
 * @param {number} userId
 * @param {string} title
 * @param {string} message
 * @param {'TICKET'|'VOUCHER'|'SYSTEM'} type
 */
const createNotification = async (userId, title, message, type = 'SYSTEM') => {
  try {
    return await prisma.notification.create({
      data: { userId, title, message, type },
    });
  } catch (err) {
    // Jangan crash request utama jika notifikasi gagal
    console.error('createNotification error:', err.message);
  }
};

/**
 * Buat notifikasi untuk banyak user sekaligus.
 * @param {number[]} userIds
 * @param {string} title
 * @param {string} message
 * @param {'TICKET'|'VOUCHER'|'SYSTEM'} type
 */
const createNotificationBulk = async (userIds, title, message, type = 'SYSTEM') => {
  try {
    return await prisma.notification.createMany({
      data: userIds.map((userId) => ({ userId, title, message, type })),
      skipDuplicates: true,
    });
  } catch (err) {
    console.error('createNotificationBulk error:', err.message);
  }
};

module.exports = { createNotification, createNotificationBulk };
