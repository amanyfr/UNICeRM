const prisma  = require('../lib/prisma');
const { generateResponse }          = require('../lib/gemini');
const { createNotificationBulk }    = require('../lib/notification');

// ==================== HELPERS ====================

/** Generate ticketNumber: TKT-YYYYMMDD-XXXX */
const generateTicketNumber = () => {
  const now  = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `TKT-${date}-${rand}`;
};

/** Cek apakah response menyebut 'tiket' — tidak dipakai lagi, diganti needsTicket flag */
// const mentionsTiket = (text) => /tiket/i.test(text);

// ==================== SEND MESSAGE ====================
const sendMessage = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { message, chatHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ status: 'error', message: 'Message wajib diisi' });
    }

    // Kirim ke chatbot
    let responseText;
    let needsTicket;
    try {
      const result = await generateResponse(message.trim(), chatHistory);
      responseText = result.response;
      needsTicket  = result.needsTicket;
    } catch (botErr) {
      console.error('Chatbot error:', botErr.message);
      return res.status(502).json({
        status:  'error',
        message: 'Layanan AI sedang tidak tersedia. Silakan coba lagi.',
      });
    }

    // Simpan ke chat_logs
    const chatLog = await prisma.chatLog.create({
      data: {
        userId,
        message:    message.trim(),
        response:   responseText,
        isResolved: false,
      },
    });

    // Auto-buat tiket berdasarkan flag needsTicket (bukan deteksi kata di response)
    if (needsTicket) {
      // Ambil judul dari pesan pertama user di chatHistory atau pesan saat ini
      const firstUserMsg = chatHistory.find((h) => h.role === 'user');
      const rawTitle     = firstUserMsg?.parts?.[0]?.text || message.trim();
      const title        = rawTitle.length > 100 ? rawTitle.substring(0, 97) + '...' : rawTitle;

      // Generate unique ticketNumber
      let ticketNumber;
      let attempts = 0;
      do {
        ticketNumber = generateTicketNumber();
        const existing = await prisma.ticket.findUnique({ where: { ticketNumber } });
        if (!existing) break;
        attempts++;
      } while (attempts < 5);

      // Cari customer berdasarkan userId
      const customer = await prisma.customer.findUnique({
        where: { userId },
      });

      if (!customer) {
        return res.status(404).json({
          status:  'error',
          message: 'Customer tidak ditemukan untuk user ini',
        });
      }

      // Buat tiket dengan customerId yang benar
      const ticket = await prisma.ticket.create({
        data: {
          ticketNumber,
          title,
          description: message.trim(),
          status:      'OPEN',
          priority:    'MEDIUM',
          channel:     'CHAT',
          customerId:  customer.id,  // Gunakan customer.id, bukan userId
          assignedTo:  null,          // Null agar tiket unassigned
        },
      });

      // Update chat_log dengan ticketId
      await prisma.chatLog.update({
        where: { id: chatLog.id },
        data:  { ticketId: ticket.id, isResolved: true },
      });

      // Notifikasi ke semua ADMIN dan AGENT
      const staff = await prisma.user.findMany({
        where:  { role: { in: ['ADMIN', 'AGENT'] }, isActive: true },
        select: { id: true },
      });
      await createNotificationBulk(
        staff.map((u) => u.id),
        'Tiket Baru dari Chatbot',
        `Tiket baru masuk dari chatbot: ${title}`,
        'TICKET'
      );

      return res.status(201).json({
        status: 'success',
        data: {
          response:      responseText,
          ticketCreated: true,
          ticket: {
            id:           ticket.id,
            ticketNumber: ticket.ticketNumber,
            title:        ticket.title,
            status:       ticket.status.toLowerCase(),
            priority:     ticket.priority.toLowerCase(),
            channel:      ticket.channel.toLowerCase(),
          },
        },
      });
    }

    // Tidak ada tiket dibuat
    return res.status(200).json({
      status: 'success',
      data: {
        response:      responseText,
        ticketCreated: false,
      },
    });
  } catch (err) {
    console.error('sendMessage chatbot error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// ==================== GET HISTORY ====================
const getHistory = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const logs = await prisma.chatLog.findMany({
      where:   { userId },
      orderBy: { createdAt: 'asc' },
      take:    50,
      select: {
        id:         true,
        message:    true,
        response:   true,
        isResolved: true,
        ticketId:   true,
        createdAt:  true,
      },
    });

    return res.json({ status: 'success', data: logs });
  } catch (err) {
    console.error('getHistory error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = { sendMessage, getHistory };
