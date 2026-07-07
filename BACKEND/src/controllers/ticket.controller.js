const prisma = require('../lib/prisma');
const { createNotification, createNotificationBulk } = require('../lib/notification');

// ==================== HELPERS ====================

/** Konversi enum DB → lowercase untuk response frontend */
const normalizeTicket = (ticket) => ({
  ...ticket,
  status:   ticket.status?.toLowerCase().replace('_', '-'),   // IN_PROGRESS → in-progress
  priority: ticket.priority?.toLowerCase(),
  channel:  ticket.channel?.toLowerCase(),
});

/** Generate ticketNumber: TKT-YYYYMMDD-XXXX */
const generateTicketNumber = () => {
  const now  = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const rand = String(Math.floor(1000 + Math.random() * 9000)); // 4 digit
  return `TKT-${date}-${rand}`;
};

/** Konversi status string dari frontend/query → enum DB */
const toStatusEnum = (s) => {
  if (!s) return undefined;
  const map = { 'in-progress': 'IN_PROGRESS', 'in_progress': 'IN_PROGRESS' };
  return map[s.toLowerCase()] ?? s.toUpperCase();
};

// ==================== GET ALL TICKETS ====================
const getAllTickets = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const isStaff = role === 'admin' || role === 'agent';

    // --- CUSTOMER: hanya tiket milik sendiri ---
    if (!isStaff) {
      const tickets = await prisma.ticket.findMany({
        where: { customerId: userId },
        include: {
          customer:  { select: { id: true, name: true, email: true } },
          agent:     { select: { id: true, name: true, email: true } },
          _count:    { select: { messages: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
      return res.json({ status: 'success', data: tickets.map(normalizeTicket) });
    }

    // --- ADMIN & AGENT: semua tiket + filter + pagination ---
    const { period, status, priority, assignedTo, page = 1, limit = 10 } = req.query;

    // Filter periode
    let dateFilter = {};
    if (period) {
      const days = period === '7D' ? 7 : period === '30D' ? 30 : period === '90D' ? 90 : 180;
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      dateFilter = { createdAt: { gte: fromDate } };
    }

    const where = {};
    if (status)     where.status     = toStatusEnum(status);
    if (priority)   where.priority   = priority.toUpperCase();
    if (assignedTo) where.assignedTo = parseInt(assignedTo);

    const whereWithDate = { ...where, ...dateFilter };

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const take  = parseInt(limit);

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where:   whereWithDate,
        skip,
        take,
        include: {
          customer: { select: { id: true, name: true, email: true } },
          agent:    { select: { id: true, name: true, email: true } },
          _count:   { select: { messages: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.ticket.count({ where: whereWithDate }),
    ]);

    return res.json({
      status: 'success',
      data:   tickets.map(normalizeTicket),
      meta:   {
        total,
        page:       parseInt(page),
        limit:      take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (err) {
    console.error('getAllTickets error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== CREATE TICKET ====================
const createTicket = async (req, res) => {
  try {
    const { id: customerId } = req.user;
    const { title, description, priority = 'MEDIUM', channel = 'FORM' } = req.body;

    if (!title || !description) {
      return res.status(400).json({ status: 'error', message: 'Title dan description wajib diisi' });
    }

    // Generate unique ticketNumber (retry jika collision)
    let ticketNumber;
    let attempts = 0;
    do {
      ticketNumber = generateTicketNumber();
      const existing = await prisma.ticket.findUnique({ where: { ticketNumber } });
      if (!existing) break;
      attempts++;
    } while (attempts < 5);

    const ticket = await prisma.ticket.create({
      data: {
        ticketNumber,
        title,
        description,
        status:     'OPEN',
        priority:   priority.toUpperCase(),
        channel:    channel.toUpperCase(),
        customerId,
      },
      include: {
        customer: { select: { id: true, name: true, email: true } },
      },
    });

    // Notifikasi ke semua ADMIN dan AGENT
    const staff = await prisma.user.findMany({
      where: { role: { in: ['ADMIN', 'AGENT'] }, isActive: true },
      select: { id: true },
    });
    const staffIds = staff.map((u) => u.id);
    await createNotificationBulk(
      staffIds,
      'Tiket Baru Masuk',
      `Tiket baru masuk: ${title}`,
      'TICKET'
    );

    return res.status(201).json({ status: 'success', data: normalizeTicket(ticket) });
  } catch (err) {
    console.error('createTicket error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== GET TICKET BY ID ====================
const getTicketById = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const ticketId = parseInt(req.params.id);

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        customer: { select: { id: true, name: true, email: true } },
        agent:    { select: { id: true, name: true, email: true } },
        messages: {
          include: {
            sender: { select: { id: true, name: true, role: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
        feedback: true,
      },
    });

    if (!ticket) {
      return res.status(404).json({ status: 'error', message: 'Tiket tidak ditemukan' });
    }

    // CUSTOMER hanya bisa lihat tiket miliknya
    if (role === 'customer' && ticket.customerId !== userId) {
      return res.status(403).json({ status: 'error', message: 'Akses ditolak' });
    }

    // Filter pesan internal dari customer
    const messages = ticket.messages
      .filter((m) => role !== 'customer' || !m.isInternal)
      .map((m) => ({
        ...m,
        sender: m.sender
          ? { ...m.sender, role: m.sender.role.toLowerCase() }
          : null,
      }));

    return res.json({
      status: 'success',
      data:   normalizeTicket({ ...ticket, messages }),
    });
  } catch (err) {
    console.error('getTicketById error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== UPDATE TICKET ====================
const updateTicket = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const { status, priority, assignedTo } = req.body;

    const existing = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Tiket tidak ditemukan' });
    }

    const updateData = {};
    if (status)     updateData.status     = toStatusEnum(status);
    if (priority)   updateData.priority   = priority.toUpperCase();
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo ? parseInt(assignedTo) : null;

    // Isi resolvedAt saat status → RESOLVED
    if (updateData.status === 'RESOLVED' && existing.status !== 'RESOLVED') {
      updateData.resolvedAt = new Date();
    }
    // Bersihkan resolvedAt jika status kembali ke non-RESOLVED
    if (updateData.status && updateData.status !== 'RESOLVED') {
      updateData.resolvedAt = null;
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data:  updateData,
      include: {
        customer: { select: { id: true, name: true, email: true } },
        agent:    { select: { id: true, name: true, email: true } },
      },
    });

    // Notifikasi ke customer pemilik tiket
    if (status) {
      const displayStatus = normalizeTicket({ status: updateData.status }).status;
      await createNotification(
        existing.customerId,
        'Status Tiket Diperbarui',
        `Status tiket ${existing.ticketNumber} kamu diperbarui menjadi ${displayStatus}`,
        'TICKET'
      );
    }

    return res.json({ status: 'success', data: normalizeTicket(updated) });
  } catch (err) {
    console.error('updateTicket error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== SEND MESSAGE ====================
const sendMessage = async (req, res) => {
  try {
    const { id: senderId, role } = req.user;
    const ticketId = parseInt(req.params.id);
    let { message, isInternal = false } = req.body;

    if (!message) {
      return res.status(400).json({ status: 'error', message: 'Message wajib diisi' });
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      return res.status(404).json({ status: 'error', message: 'Tiket tidak ditemukan' });
    }

    // CUSTOMER hanya bisa kirim ke tiket miliknya
    if (role === 'customer' && ticket.customerId !== senderId) {
      return res.status(403).json({ status: 'error', message: 'Akses ditolak' });
    }

    // CUSTOMER tidak bisa kirim pesan internal
    if (role === 'customer') isInternal = false;

    // Tentukan senderRole untuk kolom senderRole
    const senderRole = role; // 'customer' | 'agent' | 'admin'

    const newMessage = await prisma.ticketMessage.create({
      data: {
        ticketId,
        senderId,
        senderRole,
        message,
        isInternal: Boolean(isInternal),
      },
      include: {
        sender: { select: { id: true, name: true, role: true } },
      },
    });

    // Notifikasi ke pihak lawan
    if (role === 'customer') {
      // Customer kirim → notif ke agent yang assigned (atau semua staff jika belum assigned)
      const recipientIds = ticket.assignedTo
        ? [ticket.assignedTo]
        : await prisma.user
            .findMany({ where: { role: { in: ['ADMIN', 'AGENT'] }, isActive: true }, select: { id: true } })
            .then((users) => users.map((u) => u.id));

      await createNotificationBulk(
        recipientIds,
        'Pesan Baru dari Customer',
        `Customer mengirim pesan di tiket ${ticket.ticketNumber}`,
        'TICKET'
      );
    } else {
      // Staff kirim → notif ke customer (kecuali pesan internal)
      if (!isInternal) {
        await createNotification(
          ticket.customerId,
          'Balasan Tiket',
          `Agent membalas tiket ${ticket.ticketNumber} kamu`,
          'TICKET'
        );
      }
    }

    return res.status(201).json({
      status: 'success',
      data: {
        ...newMessage,
        sender: newMessage.sender
          ? { ...newMessage.sender, role: newMessage.sender.role.toLowerCase() }
          : null,
      },
    });
  } catch (err) {
    console.error('sendMessage error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = { getAllTickets, createTicket, getTicketById, updateTicket, sendMessage };
