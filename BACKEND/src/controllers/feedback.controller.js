const prisma = require('../lib/prisma');

// ==================== CREATE FEEDBACK ====================
const createFeedback = async (req, res) => {
  try {
    const { id: customerId } = req.user;
    const { ticketId, rating, comment } = req.body;

    // Validasi field wajib
    if (!ticketId || rating === undefined || rating === null) {
      return res.status(400).json({ status: 'error', message: 'ticketId dan rating wajib diisi' });
    }

    // 1. Cek tiket ada
    const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(ticketId) } });
    if (!ticket) {
      return res.status(404).json({ status: 'error', message: 'Tiket tidak ditemukan' });
    }

    // 2. Cek tiket milik customer yang login
    if (ticket.customerId !== customerId) {
      return res.status(403).json({ status: 'error', message: 'Kamu hanya bisa memberi feedback untuk tiket milikmu sendiri' });
    }

    // 3. Cek status tiket RESOLVED
    if (ticket.status !== 'RESOLVED') {
      return res.status(400).json({
        status:  'error',
        message: 'Feedback hanya bisa diberikan untuk tiket yang sudah berstatus RESOLVED',
      });
    }

    // 4. Cek belum ada feedback untuk tiket ini
    const existing = await prisma.feedback.findUnique({ where: { ticketId: parseInt(ticketId) } });
    if (existing) {
      return res.status(409).json({ status: 'error', message: 'Feedback untuk tiket ini sudah pernah diberikan' });
    }

    // 5. Validasi rating 1–5
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ status: 'error', message: 'Rating harus berupa angka antara 1 dan 5' });
    }

    const feedback = await prisma.feedback.create({
      data: {
        ticketId:   parseInt(ticketId),
        customerId,
        rating:     ratingNum,
        comment:    comment?.trim() || null,
      },
      include: {
        ticket: {
          select: { id: true, ticketNumber: true, title: true, status: true },
        },
      },
    });

    return res.status(201).json({ status: 'success', data: feedback });
  } catch (err) {
    console.error('createFeedback error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== GET ALL FEEDBACKS ====================
const getAllFeedbacks = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const { period } = req.query;

    // Filter periode
    let dateFilter = {};
    if (period) {
      const days = period === '7D' ? 7 : period === '30D' ? 30 : period === '90D' ? 90 : 180;
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      dateFilter = { createdAt: { gte: fromDate } };
    }

    // Kondisi where berdasarkan role + periode
    // ADMIN & AGENT: semua feedback tanpa filter
    // CUSTOMER: dibatasi hanya feedback milik sendiri (gunakan endpoint getMyFeedbacks)
    const where = {
      ...(role === 'CUSTOMER' ? { customerId: userId } : {}),
      ...dateFilter,
    };

    // Catatan schema:
    // - Feedback.customer → relasi ke User (bukan tabel customers)
    // - Feedback.ticket   → relasi ke Ticket
    // - Tidak ada relasi 'agent' langsung di Feedback; agent diambil via ticket.agent
    const feedbacks = await prisma.feedback.findMany({
      where,
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
        ticket: {
          select: {
            ticketNumber: true,
            title:        true,
            agent: {
              select: { id: true, name: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Hitung rata-rata rating
    const averageRating = feedbacks.length > 0
      ? parseFloat((feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(2))
      : 0;

    return res.json({
      status: 'success',
      data:   feedbacks,
      meta:   {
        total:         feedbacks.length,
        averageRating,
      },
    });
  } catch (err) {
    console.error('getAllFeedbacks error:', err.message);
    console.error(err);
    return res.status(500).json({ status: 'error', message: `Internal server error: ${err.message}` });
  }
};

// ==================== GET MY FEEDBACKS (CUSTOMER) ====================
const getMyFeedbacks = async (req, res) => {
  try {
    const { id: customerId } = req.user;

    const feedbacks = await prisma.feedback.findMany({
      where:   { customerId },
      include: {
        ticket: {
          select: { ticketNumber: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      status: 'success',
      data: feedbacks.map((fb) => ({
        id:           fb.id,
        ticketId:     fb.ticketId,
        ticketNumber: fb.ticket.ticketNumber,
        title:        fb.ticket.title,
        rating:       fb.rating,
        comment:      fb.comment,
        createdAt:    fb.createdAt,
      })),
    });
  } catch (err) {
    console.error('getMyFeedbacks error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== GET FEEDBACK STATS ====================
const getFeedbackStats = async (req, res) => {
  try {
    const { period } = req.query;

    // Filter periode
    let dateFilter = {};
    if (period) {
      const days = period === '7D' ? 7 : period === '30D' ? 30 : period === '90D' ? 90 : 180;
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      dateFilter = { createdAt: { gte: fromDate } };
    }

    const allFeedbacks = await prisma.feedback.findMany({
      where:  dateFilter,
      select: { rating: true, createdAt: true },
    });

    const totalFeedbacks  = allFeedbacks.length;
    const averageRating   = totalFeedbacks > 0
      ? parseFloat((allFeedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks).toFixed(2))
      : 0;

    // Distribusi rating 1–5
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allFeedbacks.forEach((f) => { distribution[f.rating]++; });

    // Feedback bulan ini
    const now       = new Date();
    const thisMonth = allFeedbacks.filter((f) => {
      const d = new Date(f.createdAt);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;

    return res.json({
      status: 'success',
      data: {
        averageRating,
        totalFeedbacks,
        distribution,
        thisMonth,
      },
    });
  } catch (err) {
    console.error('getFeedbackStats error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = { createFeedback, getAllFeedbacks, getFeedbackStats, getMyFeedbacks };
