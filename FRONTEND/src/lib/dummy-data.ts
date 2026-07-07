export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  segment: 'VIP' | 'aktif' | 'prospek' | 'tidak-aktif';
  source: string;
  tags: string[];
  satisfactionScore?: number;
  lastInteraction: string;
  totalTickets: number;
  createdAt: string;
  avatar?: string;
}

export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderName: string;
  senderRole: 'customer' | 'agent' | 'bot' | 'system';
  content: string;
  isRead: boolean;
  createdAt: string;
  // Compatibility with older views
  sender?: 'customer' | 'agent' | 'bot' | 'system';
  name?: string;
  time?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: 'whatsapp' | 'email' | 'form' | 'chat';
  customerId: string;
  customerName: string;
  assignedTo: string;
  assigneeName: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  messages: TicketMessage[];
}

export const dummyCustomers: Customer[] = [
  { id: 'c1', name: 'Budi Santoso', email: 'budi@gmail.com', phone: '081234567890', company: 'PT Maju Bersama', segment: 'VIP', source: 'Referral', tags: ['premium', 'loyal'], satisfactionScore: 4.8, lastInteraction: '2025-05-07T10:00:00Z', totalTickets: 12, createdAt: '2024-01-15T00:00:00Z' },
  { id: 'c2', name: 'Sari Dewi', email: 'sari@gmail.com', phone: '082345678901', company: 'CV Sejahtera', segment: 'aktif', source: 'Website', tags: ['regular'], satisfactionScore: 4.2, lastInteraction: '2025-05-06T14:00:00Z', totalTickets: 5, createdAt: '2024-02-20T00:00:00Z' },
  { id: 'c3', name: 'Rudi Hartono', email: 'rudi@gmail.com', phone: '083456789012', company: 'UD Mandiri', segment: 'prospek', source: 'WhatsApp', tags: ['new'], satisfactionScore: undefined, lastInteraction: '2025-04-20T09:00:00Z', totalTickets: 1, createdAt: '2024-03-10T00:00:00Z' },
  { id: 'c4', name: 'Maya Putri', email: 'maya@gmail.com', phone: '084567890123', company: '', segment: 'tidak-aktif', source: 'Social Media', tags: [], satisfactionScore: 2.5, lastInteraction: '2025-03-01T00:00:00Z', totalTickets: 3, createdAt: '2024-01-05T00:00:00Z' },
  { id: 'c5', name: 'Andi Wijaya', email: 'andi@yahoo.com', phone: '085678901234', company: 'PT Teknologi Bangsa', segment: 'VIP', source: 'Referral', tags: ['premium'], satisfactionScore: 4.9, lastInteraction: '2025-05-08T11:00:00Z', totalTickets: 8, createdAt: '2024-01-20T00:00:00Z' },
  { id: 'c6', name: 'Dewi Lestari', email: 'dewi.l@gmail.com', phone: '086789012345', company: 'Toko Kelontong Dewi', segment: 'aktif', source: 'WhatsApp', tags: ['regular'], satisfactionScore: 4.0, lastInteraction: '2025-05-05T16:00:00Z', totalTickets: 4, createdAt: '2024-04-12T00:00:00Z' },
  { id: 'c7', name: 'Eko Prasetyo', email: 'eko.p@perusahaan.id', phone: '087890123456', company: 'Logistik Aman', segment: 'aktif', source: 'Website', tags: ['logistics'], satisfactionScore: 4.5, lastInteraction: '2025-05-04T10:00:00Z', totalTickets: 6, createdAt: '2024-02-15T00:00:00Z' },
  { id: 'c8', name: 'Fitriani', email: 'fitri@gmail.com', phone: '088901234567', company: '', segment: 'prospek', source: 'Social Media', tags: ['new'], satisfactionScore: undefined, lastInteraction: '2025-04-28T09:00:00Z', totalTickets: 1, createdAt: '2025-04-25T00:00:00Z' },
  { id: 'c9', name: 'Guruh Soekarno', email: 'guruh@seni.com', phone: '089012345678', company: 'Yayasan Seni Budaya', segment: 'VIP', source: 'Direct', tags: ['premium', 'cultural'], satisfactionScore: 5.0, lastInteraction: '2025-05-08T08:00:00Z', totalTickets: 2, createdAt: '2024-03-20T00:00:00Z' },
  { id: 'c10', name: 'Hana Maria', email: 'hana.m@gmail.com', phone: '081112223334', company: 'Maria Florist', segment: 'aktif', source: 'Instagram', tags: ['regular'], satisfactionScore: 4.7, lastInteraction: '2025-05-02T13:00:00Z', totalTickets: 3, createdAt: '2024-05-10T00:00:00Z' },
  { id: 'c11', name: 'Iwan Fals', email: 'iwan@musik.id', phone: '082223334445', company: 'Oi Management', segment: 'VIP', source: 'Referral', tags: ['premium'], satisfactionScore: 4.6, lastInteraction: '2025-05-01T15:00:00Z', totalTickets: 15, createdAt: '2023-11-20T00:00:00Z' },
  { id: 'c12', name: 'Joko Widodo', email: 'jokowi@istana.id', phone: '083334445556', company: 'Sekretariat Negara', segment: 'aktif', source: 'Direct', tags: ['government'], satisfactionScore: 4.9, lastInteraction: '2025-04-30T10:00:00Z', totalTickets: 20, createdAt: '2023-10-15T00:00:00Z' },
  { id: 'c13', name: 'Kartini', email: 'kartini@emansipasi.org', phone: '084445556667', company: 'Yayasan Jepara', segment: 'prospek', source: 'Website', tags: ['education'], satisfactionScore: undefined, lastInteraction: '2025-04-15T11:00:00Z', totalTickets: 1, createdAt: '2025-04-10T00:00:00Z' },
  { id: 'c14', name: 'Lilik', email: 'lilik@gmail.com', phone: '085556667778', company: '', segment: 'tidak-aktif', source: 'WhatsApp', tags: [], satisfactionScore: 3.2, lastInteraction: '2024-12-20T00:00:00Z', totalTickets: 5, createdAt: '2024-01-02T00:00:00Z' },
  { id: 'c15', name: 'Mahrus', email: 'mahrus@pesantren.id', phone: '086667778889', company: 'Ponpes Lirboyo', segment: 'aktif', source: 'Website', tags: ['education', 'regular'], satisfactionScore: 4.4, lastInteraction: '2025-05-03T09:00:00Z', totalTickets: 2, createdAt: '2024-06-15T00:00:00Z' },
  { id: 'c16', name: 'Nurul Hafizah', email: 'nurul@gmail.com', phone: '087778889990', company: 'Hafizah Hijab', segment: 'aktif', source: 'Instagram', tags: ['fashion'], satisfactionScore: 4.3, lastInteraction: '2025-04-25T14:00:00Z', totalTickets: 7, createdAt: '2024-07-20T00:00:00Z' },
  { id: 'c17', name: 'Oscar Lawalata', email: 'oscar@fashion.com', phone: '088889990001', company: 'Oscar Studio', segment: 'VIP', source: 'Direct', tags: ['premium', 'fashion'], satisfactionScore: 5.0, lastInteraction: '2025-05-08T12:00:00Z', totalTickets: 3, createdAt: '2024-05-05T00:00:00Z' },
  { id: 'c18', name: 'Prabowo Subianto', email: 'prabowo@kemhan.go.id', phone: '089990001112', company: 'Kementerian Pertahanan', segment: 'aktif', source: 'Direct', tags: ['government'], satisfactionScore: 4.8, lastInteraction: '2025-04-20T08:00:00Z', totalTickets: 10, createdAt: '2023-12-10T00:00:00Z' },
  { id: 'c19', name: 'Quinta', email: 'quinta@coffee.id', phone: '081212121212', company: 'Quinta Coffee Roaster', segment: 'prospek', source: 'WhatsApp', tags: ['f&b'], satisfactionScore: undefined, lastInteraction: '2025-04-10T16:00:00Z', totalTickets: 1, createdAt: '2025-04-05T00:00:00Z' },
  { id: 'c20', name: 'Riana', email: 'riana@magic.com', phone: '082121212121', company: 'The Sacred Management', segment: 'tidak-aktif', source: 'Social Media', tags: ['artist'], satisfactionScore: 2.0, lastInteraction: '2024-11-15T00:00:00Z', totalTickets: 2, createdAt: '2024-02-01T00:00:00Z' },
];

export const dummyTickets: Ticket[] = [
  {
    id: 't1',
    title: 'Tidak bisa login ke platform',
    description: 'Sudah coba reset password tapi tetap tidak bisa masuk.',
    status: 'open',
    priority: 'high',
    channel: 'whatsapp',
    customerId: 'c1',
    customerName: 'Budi Santoso',
    assignedTo: 'u2',
    assigneeName: 'Sari Dewi',
    createdAt: '2025-05-08T09:00:00Z',
    updatedAt: '2025-05-08T09:00:00Z',
    messages: [
      { id: 'm1', ticketId: 't1', senderName: 'Budi Santoso', senderRole: 'customer', content: 'Saya tidak bisa login sejak tadi malam. Sudah coba reset password tapi tetap error.', isRead: true, createdAt: '2025-05-08T09:00:00Z', sender: 'customer', name: 'Budi Santoso', time: '09:00' },
      { id: 'm2', ticketId: 't1', senderName: 'Sari Dewi', senderRole: 'agent', content: 'Halo Budi, terima kasih sudah menghubungi kami. Bisa tolong ceritakan error apa yang muncul?', isRead: true, createdAt: '2025-05-08T09:15:00Z', sender: 'agent', name: 'Sari Dewi', time: '09:15' },
    ]
  },
  {
    id: 't2',
    title: 'Integrasi API WhatsApp Marketing',
    description: 'Permintaan bantuan untuk setup API Gateway.',
    status: 'in-progress',
    priority: 'medium',
    channel: 'chat',
    customerId: 'c2',
    customerName: 'Sari Dewi',
    assignedTo: 'u3',
    assigneeName: 'Rudi Hartono',
    createdAt: '2025-05-08T10:00:00Z',
    updatedAt: '2025-05-08T10:30:00Z',
    messages: []
  },
  {
    id: 't3',
    title: 'Refund Dana Double Payment',
    description: 'Customer melakukan transaksi 2 kali.',
    status: 'resolved',
    priority: 'high',
    channel: 'email',
    customerId: 'c5',
    customerName: 'Andi Wijaya',
    assignedTo: 'u2',
    assigneeName: 'Sari Dewi',
    createdAt: '2025-05-07T08:00:00Z',
    updatedAt: '2025-05-07T14:00:00Z',
    resolvedAt: '2025-05-07T14:00:00Z',
    messages: []
  },
  {
    id: 't4',
    title: 'Tanya promo bulan Mei',
    description: 'Menanyakan detail diskon untuk upgrade paket.',
    status: 'closed',
    priority: 'low',
    channel: 'form',
    customerId: 'c6',
    customerName: 'Dewi Lestari',
    assignedTo: 'u3',
    assigneeName: 'Rudi Hartono',
    createdAt: '2025-05-06T11:00:00Z',
    updatedAt: '2025-05-06T16:00:00Z',
    messages: []
  },
  {
    id: 't5',
    title: 'Error saat export data ke PDF',
    description: 'Tombol export tidak merespon di browser Chrome.',
    status: 'open',
    priority: 'high',
    channel: 'whatsapp',
    customerId: 'c7',
    customerName: 'Eko Prasetyo',
    assignedTo: 'u2',
    assigneeName: 'Sari Dewi',
    createdAt: '2025-05-08T15:00:00Z',
    updatedAt: '2025-05-08T15:00:00Z',
    messages: []
  },
  {
    id: 't6',
    title: 'Request demo fitur Analytics Pro',
    description: 'Ingin trial fitur selama 7 hari.',
    status: 'in-progress',
    priority: 'medium',
    channel: 'email',
    customerId: 'c9',
    customerName: 'Guruh Soekarno',
    assignedTo: 'u1',
    assigneeName: 'Budi Santoso',
    createdAt: '2025-05-08T14:00:00Z',
    updatedAt: '2025-05-08T15:30:00Z',
    messages: []
  },
  {
    id: 't7',
    title: 'Update data profil perusahaan',
    description: 'Ganti nama perusahaan dan alamat di tagihan.',
    status: 'resolved',
    priority: 'low',
    channel: 'chat',
    customerId: 'c10',
    customerName: 'Hana Maria',
    assignedTo: 'u3',
    assigneeName: 'Rudi Hartono',
    createdAt: '2025-05-05T10:00:00Z',
    updatedAt: '2025-05-05T14:00:00Z',
    messages: []
  },
];

export const dummyFAQs = [
  { id: 'f1', question: 'Apa jam operasional Uni Inside Media?', answer: 'Kami beroperasi Senin–Jumat pukul 09.00–18.00 WIB. Di luar jam kerja, silakan tinggalkan pesan.', category: 'Umum', isActive: true },
  { id: 'f2', question: 'Bagaimana cara memesan layanan?', answer: 'Kamu bisa memesan melalui website kami di uniinside.id atau menghubungi tim sales kami.', category: 'Pemesanan', isActive: true },
  { id: 'f3', question: 'Berapa lama proses pengerjaan?', answer: 'Tergantung jenis layanan: desain 3-5 hari kerja, konten 1-2 hari kerja, website 7-14 hari kerja.', category: 'Layanan', isActive: true },
  { id: 'f4', question: 'Apakah ada garansi revisi?', answer: 'Ya, semua paket termasuk 2x revisi gratis. Revisi tambahan dikenakan biaya sesuai kesepakatan.', category: 'Layanan', isActive: true },
  { id: 'f5', question: 'Metode pembayaran apa yang diterima?', answer: 'Kami menerima transfer bank (BCA, Mandiri, BNI), GoPay, OVO, dan QRIS.', category: 'Pembayaran', isActive: true },
  { id: 'f6', question: 'Apakah UNICeRM memiliki aplikasi mobile?', answer: 'Saat ini paket Enterprise menyertakan akses aplikasi mobile untuk agen. Versi customer akan segera rilis.', category: 'Umum', isActive: true },
  { id: 'f7', question: 'Bagaimana cara mendaftar akun?', answer: 'Anda dapat mendaftar langsung di halaman registrasi dengan menyertakan email valid.', category: 'Akun', isActive: true },
  { id: 'f8', question: 'Bisakah saya upgrade paket di tengah periode?', answer: 'Ya, biaya akan dihitung secara prorata sesuai sisa hari langganan Anda.', category: 'Pembayaran', isActive: true },
  { id: 'f9', question: 'Apakah data saya aman?', answer: 'Kami menggunakan enkripsi end-to-end dan server lokal untuk proteksi data maksimal.', category: 'Keamanan', isActive: true },
  { id: 'f10', question: 'Bagaimana jika saya lupa password?', answer: 'Gunakan fitur "Lupa Password" di halaman login untuk menerima tautan pemulihan.', category: 'Akun', isActive: true },
];

export const customersData = dummyCustomers;
export const ticketsData = dummyTickets;
export const faqData = dummyFAQs;

export const interactionHistory = [
  { id: '1', title: 'Kendala login aplikasi mobile', status: 'Process', time: '2 jam lalu', type: 'ticket', variant: 'info' as const },
  { id: '2', title: 'Upgrade paket langganan Enterprise', status: 'Closed', time: '3 hari lalu', type: 'billing', variant: 'success' as const },
  { id: '3', title: 'Permintaan demo fitur chatbot', status: 'Closed', time: '1 minggu lalu', type: 'demo', variant: 'success' as const },
  { id: '4', title: 'Salah input alamat pengiriman', status: 'Closed', time: '2 minggu lalu', type: 'ticket', variant: 'success' as const },
];

export const chatSessions = [
  { id: 'S-782', query: 'Bagaimana cara reset password?', answer: 'Anda dapat menekan tombol lupa password...', time: '10:15 AM', status: 'Selesai' },
  { id: 'S-783', query: 'Apakah ada promo untuk upgrade?', answer: 'Tentu, untuk segment Aktif sedang ada diskon...', time: '14:20 PM', status: 'Handoff' },
];

export const feedbackData = {
  average: 4.7,
  distribution: [
    { stars: 5, count: 12 },
    { stars: 4, count: 3 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  comments: [
    { id: 1, stars: 5, category: 'Service', comment: 'Sangat puas dengan respon tim support yang cepat.', date: '12 Mei 2025' },
    { id: 2, stars: 4, category: 'Product', comment: 'Fitur integrasi WhatsApp sangat membantu bisnis saya.', date: '20 Apr 2025' },
  ]
};

export const aiServiceRecommendations = [
  { id: 1, name: 'Modul WhatsApp Bulk', reason: 'Cocok untuk campaign PT Mahakam', icon: 'MessageSquare' },
  { id: 2, name: 'Analytics Pro Upgrade', reason: 'Segment VIP butuh insight lebih dalam', icon: 'TrendingUp' },
];

export const customerGrowthData = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 154 },
  { month: 'Mar', value: 182 },
  { month: 'Apr', value: 210 },
  { month: 'May', value: 247 },
];

export const segmentationData = [
  { name: 'Aktif', value: 150, color: '#22C55E' },
  { name: 'Prospek', value: 60, color: '#3B82F6' },
  { name: 'VIP', value: 25, color: '#F5C518' },
  { name: 'Tidak Aktif', value: 12, color: '#EF4444' },
];

export const recentTickets = [
  { id: 'TKT-023', title: 'Kendala login aplikasi mobile', customer: 'Budi Santoso', status: 'Process', time: '2 menit lalu', variant: 'info' as const },
  { id: 'TKT-022', title: 'Integrasi API WhatsApp', customer: 'Suka Maju PT', status: 'Open', time: '15 menit lalu', variant: 'warning' as const },
  { id: 'TKT-021', title: 'Refund dana double payment', customer: 'Ani Wijaya', status: 'Closed', time: '1 jam lalu', variant: 'success' as const },
  { id: 'TKT-020', title: 'Salah input alamat pengiriman', customer: 'Reza Rahadian', status: 'Process', time: '3 jam lalu', variant: 'info' as const },
  { id: 'TKT-019', title: 'Tanya promo bulan Mei', customer: 'Citra Kirana', status: 'Open', time: '5 jam lalu', variant: 'warning' as const },
];

export const recentActivities = [
  { id: 1, type: 'ticket', action: 'Budi membuat tiket #TKT-023', time: '2 menit lalu', iconColor: 'text-info' },
  { id: 2, type: 'payment', action: 'Pembayaran VIP Ani Wijaya diterima', time: '1 jam lalu', iconColor: 'text-success' },
  { id: 3, type: 'user', action: 'Daftar pelanggan baru: PT Suka Maju', time: '2 jam lalu', iconColor: 'text-primary' },
  { id: 4, type: 'campaign', action: 'Campaign Promo Lebaran diluncurkan', time: '4 jam lalu', iconColor: 'text-accent' },
  { id: 5, type: 'ticket', action: 'Tiket #TKT-018 diselesaikan oleh Admin', time: '6 jam lalu', iconColor: 'text-success' },
  { id: 6, type: 'system', action: 'Update otomatis sistem v1.0.2', time: '10 jam lalu', iconColor: 'text-warning' },
];

export const agentResolutionData = [
  { name: 'Andi', value: 85 },
  { name: 'Budi', value: 92 },
  { name: 'Cici', value: 78 },
  { name: 'Dedi', value: 95 },
];

export const aiRecommendations = [
  { text: '5 pelanggan berisiko churn — Lihat', variant: 'danger' as const },
  { text: '12 tiket belum direspons > 24 jam — Tangani', variant: 'warning' as const },
  { text: 'Segment VIP bisa ditawari promo — Buat Campaign', variant: 'info' as const },
];

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

export interface ChatSession {
  id: string;
  customerName: string;
  lastMessage: string;
  time: string;
  status: 'bot' | 'handoff' | 'completed';
  messages: TicketMessage[];
}

export const chatSessionsData: ChatSession[] = [
  {
    id: 'CS-101',
    customerName: 'Budi Santoso',
    lastMessage: 'Bagaimana cara reset password?',
    time: '14:20',
    status: 'bot',
    messages: [
      { id: 'm1', ticketId: 'CS-101', senderName: 'Budi Santoso', senderRole: 'customer', content: 'Halo, saya mau tanya cara reset password.', isRead: true, createdAt: '2025-05-08T14:18:00Z', sender: 'customer', name: 'Budi Santoso', time: '14:18' },
      { id: 'm2', ticketId: 'CS-101', senderName: 'SmartBot', senderRole: 'bot', content: 'Halo Budi! Untuk reset password, silakan klik tombol "Lupa Password" di halaman login.', isRead: true, createdAt: '2025-05-08T14:19:00Z', sender: 'bot', name: 'SmartBot', time: '14:19' },
      { id: 'm3', ticketId: 'CS-101', senderName: 'Budi Santoso', senderRole: 'customer', content: 'Bagaimana jika saya tidak menerima email reset?', isRead: true, createdAt: '2025-05-08T14:20:00Z', sender: 'customer', name: 'Budi Santoso', time: '14:20' },
    ]
  },
  {
    id: 'CS-102',
    customerName: 'Ani Wijaya',
    lastMessage: 'Saya butuh bicara dengan manusia.',
    time: '15:10',
    status: 'handoff',
    messages: [
      { id: 'm1', ticketId: 'CS-102', senderName: 'Ani Wijaya', senderRole: 'customer', content: 'Halo.', isRead: true, createdAt: '2025-05-08T15:05:00Z', sender: 'customer', name: 'Ani Wijaya', time: '15:05' },
      { id: 'm2', ticketId: 'CS-102', senderName: 'SmartBot', senderRole: 'bot', content: 'Halo Ani! Ada yang bisa SmartBot bantu?', isRead: true, createdAt: '2025-05-08T15:06:00Z', sender: 'bot', name: 'SmartBot', time: '15:06' },
      { id: 'm3', ticketId: 'CS-102', senderName: 'Ani Wijaya', senderRole: 'customer', content: 'Saya ingin upgrade paket tapi pusing lihat pilihannya.', isRead: true, createdAt: '2025-05-08T15:08:00Z', sender: 'customer', name: 'Ani Wijaya', time: '15:08' },
      { id: 'm4', ticketId: 'CS-102', senderName: 'SmartBot', senderRole: 'bot', content: 'Tentu! Kami punya paket Lite, Pro, dan Enterprise. Mau saya jelaskan yang mana?', isRead: true, createdAt: '2025-05-08T15:09:00Z', sender: 'bot', name: 'SmartBot', time: '15:09' },
      { id: 'm5', ticketId: 'CS-102', senderName: 'Ani Wijaya', senderRole: 'customer', content: 'Saya butuh bicara dengan manusia.', isRead: true, createdAt: '2025-05-08T15:10:00Z', sender: 'customer', name: 'Ani Wijaya', time: '15:10' },
    ]
  },
   {
    id: 'CS-103',
    customerName: 'Dedi Kurniawan',
    lastMessage: 'Terima kasih bantuannya.',
    time: '09:00',
    status: 'completed',
    messages: [
       { id: 'm1', ticketId: 'CS-103', senderName: 'Dedi Kurniawan', senderRole: 'customer', content: 'Apakah aplikasi support dark mode?', isRead: true, createdAt: '2025-05-08T08:55:00Z', sender: 'customer', name: 'Dedi Kurniawan', time: '08:55' },
       { id: 'm2', ticketId: 'CS-103', senderName: 'SmartBot', senderRole: 'bot', content: 'Ya! Anda bisa mengaktifkannya di menu Settings > Appearance.', isRead: true, createdAt: '2025-05-08T08:57:00Z', sender: 'bot', name: 'SmartBot', time: '08:57' },
       { id: 'm3', ticketId: 'CS-103', senderName: 'Dedi Kurniawan', senderRole: 'customer', content: 'Terima kasih bantuannya.', isRead: true, createdAt: '2025-05-08T09:00:00Z', sender: 'customer', name: 'Dedi Kurniawan', time: '09:00' },
    ]
  }
];

export const detailedFeedbackData = [
  { id: '1', name: 'Budi Santoso', rating: 5, comment: 'Pelayanan sangat memuaskan, respon cepat dan solusi yang diberikan sangat akurat.', category: 'Service', date: '08 Mei 2026', createdAt: '2025-05-08T10:00:00Z', avatar: 'B' },
  { id: '2', name: 'Ani Wijaya', rating: 4, comment: 'Fitur baru sangat membantu, tapi terkadang ada sedikit lag saat memuat laporan besar.', category: 'Product', date: '07 Mei 2026', createdAt: '2025-05-07T14:30:00Z', avatar: 'A' },
  { id: '3', name: 'PT Suka Maju', rating: 5, comment: 'Integrasi WhatsApp paling stabil yang pernah kami coba. Dashboard sangat intuitif.', category: 'Service', date: '06 Mei 2026', createdAt: '2025-05-06T09:15:00Z', avatar: 'P' },
  { id: '4', name: 'Global Tech', rating: 3, comment: 'Secara keseluruhan ok, tapi mohon tambahkan lebih banyak opsi pembayaran lokal.', category: 'Billing', date: '05 Mei 2026', createdAt: '2025-05-05T16:45:00Z', avatar: 'G' },
  { id: '5', name: 'Creative Lab', rating: 2, comment: 'Tiket saya sudah 3 hari tidak diupdate. Mohon perhatiannya untuk isu krusial.', category: 'Support', date: '04 Mei 2026', createdAt: '2025-05-04T11:20:00Z', avatar: 'C' },
];

export const dummyChatLogs = [
  { id: '1', sessionId: 'CS-101', customerName: 'Budi Santoso', question: 'Bagaimana cara reset password?', answer: 'Tentu! Untuk reset password...', createdAt: '2025-05-08T14:18:00Z', handoff: false },
  { id: '2', sessionId: 'CS-101', customerName: 'Budi Santoso', question: 'Kenapa email tidak masuk?', answer: 'Coba cek folder spam...', createdAt: '2025-05-08T14:20:00Z', handoff: false },
  { id: '3', sessionId: 'CS-102', customerName: 'Ani Wijaya', question: 'Saya ingin upgrade paket.', answer: 'Kami punya paket Lite, Pro...', createdAt: '2025-05-08T15:05:00Z', handoff: false },
  { id: '4', sessionId: 'CS-102', customerName: 'Ani Wijaya', question: 'Saya butuh bicara dengan manusia.', answer: 'Baik! Menghubungkan ke agen...', createdAt: '2025-05-08T15:10:00Z', handoff: true },
  { id: '5', sessionId: 'CS-103', customerName: 'Dedi Kurniawan', question: 'Support dark mode?', answer: 'Ya! Anda bisa mengaktifkan...', createdAt: '2025-05-08T08:55:00Z', handoff: false },
];

export const dummyFeedbacks = detailedFeedbackData;

export const dummyNotifications = recentActivities.map(a => ({
  ...a,
  isRead: Math.random() > 0.5
}));

export const analyticsGrowthData = [
  { name: 'Jan', baru: 400, interaksi: 2400 },
  { name: 'Feb', baru: 300, interaksi: 1398 },
  { name: 'Mar', baru: 200, interaksi: 9800 },
  { name: 'Apr', baru: 278, interaksi: 3908 },
  { name: 'Mei', baru: 189, interaksi: 4800 },
  { name: 'Jun', baru: 239, interaksi: 3800 },
];

export const ticketsByChannelAnalytics = [
  { channel: 'WhatsApp', count: 450 },
  { channel: 'Email', count: 300 },
  { channel: 'Form', count: 120 },
  { channel: 'Chat', count: 580 },
];

export const segmentDistributionAnalytics = [
  { name: 'Aktif', value: 400, color: '#22C55E' },
  { name: 'Prospek', value: 300, color: '#3B82F6' },
  { name: 'VIP', value: 300, color: '#F5C518' },
  { name: 'Tidak Aktif', value: 200, color: '#EF4444' },
];

export const agentResolutionAnalytics = [
  { name: 'Andi', resolution: 92, count: 45 },
  { name: 'Budi', resolution: 85, count: 32 },
  { name: 'Santi', resolution: 88, count: 38 },
  { name: 'Dewi', resolution: 79, count: 28 },
];

export const heatmapAnalytics = Array.from({ length: 28 }, (_, i) => ({
  day: i % 7,
  week: Math.floor(i / 7),
  value: Math.floor(Math.random() * 100),
}));
export const ratingDistributionData = [
  { rating: '5', count: 85, color: '#22C55E' },
  { rating: '4', count: 42, color: '#3B82F6' },
  { rating: '3', count: 12, color: '#F5C518' },
  { rating: '2', count: 4, color: '#F97316' },
  { rating: '1', count: 2, color: '#EF4444' },
];

export const csatTrendData = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.4 },
  { month: 'Mar', score: 4.3 },
  { month: 'Apr', score: 4.6 },
  { month: 'Mei', score: 4.7 },
  { month: 'Jun', score: 4.8 },
];

export const dummyAnalytics = {
  monthlyCustomers: analyticsGrowthData.map(d => ({ name: d.name, value: d.baru })),
  ticketResolution: analyticsGrowthData.map(d => ({ name: d.name, resolved: Math.floor(d.interaksi / 10), opened: Math.floor(d.interaksi / 8) })),
  channels: ticketsByChannelAnalytics,
  segments: segmentDistributionAnalytics
};


export const churnRiskData = [
  { id: '1', name: 'Digital Venture', segment: 'Corporate', lastInteraction: '12 hari lalu', risk: 'HIGH' },
  { id: '2', name: 'SME Solution', segment: 'Prospek', lastInteraction: '5 hari lalu', risk: 'MEDIUM' },
  { id: '3', name: 'Retailindo', segment: 'VIP', lastInteraction: '20 hari lalu', risk: 'HIGH' },
  { id: '4', name: 'Alpha Tech', segment: 'Corporate', lastInteraction: '1 hari lalu', risk: 'LOW' },
  { id: '5', name: 'Betamart', segment: 'VIP', lastInteraction: '2 hari lalu', risk: 'LOW' },
];

export const serviceRecommendationsData = [
  { id: '1', title: 'Automated Chatbot Premium', reason: 'Trafik chat customer Anda naik 40% bulan ini. Chatbot bisa hemat 60% biaya agen.', icon: 'Bot' },
  { id: '2', title: 'API Gateway Scaling', reason: 'Usage API Anda mendekati limit 90%. Upgrade untuk cegah downtime.', icon: 'Zap' },
  { id: '3', title: 'Sentiment Analysis Pro', reason: 'Banyak feedback negatif di kategori Support. Analisis emosi user secara real-time.', icon: 'Heart' },
];

export const followUpSchedulerData = [
  { id: '1', customer: 'Andri Wijaya', ticket: '#TKT-782', inactive: '48 jam', agent: 'Andi' },
  { id: '2', customer: 'Sisca Khol', ticket: '#TKT-901', inactive: '72 jam', agent: 'Budi' },
  { id: '3', customer: 'Raffi Ahmad', ticket: '#TKT-442', inactive: '12 jam', agent: 'Santi' },
  { id: '4', customer: 'Baim Wong', ticket: '#TKT-221', inactive: '36 jam', agent: 'Andi' },
];

export const topCustomersAnalytics = [
  { id: '1', name: 'Budi Santoso', interactions: 156, ticketsClosed: 12, csat: 4.8, segment: 'Aktif' },
  { id: '2', name: 'Ani Wijaya', interactions: 142, ticketsClosed: 15, csat: 5.0, segment: 'VIP' },
  { id: '3', name: 'PT Suka Maju', interactions: 128, ticketsClosed: 8, csat: 4.5, segment: 'Aktif' },
  { id: '4', name: 'Global Tech', interactions: 110, ticketsClosed: 10, csat: 4.2, segment: 'VIP' },
  { id: '5', name: 'Creative Lab', interactions: 95, ticketsClosed: 5, csat: 4.0, segment: 'Prospek' },
];

export const promoSuggestionsData = [
  { segment: 'Tidak Aktif', voucher: 'RECONNECT25', reach: '120 users' },
  { segment: 'Prospek', voucher: 'WELCOMEPROMO', reach: '340 users' },
  { segment: 'VIP', voucher: 'ANNIVERSARY_GIFT', reach: '45 users' },
];

export const campaignsData = [
  { id: '1', name: 'Summer Deal 2026', type: 'Email', target: 'Semua Pelanggan', status: 'ACTIVE', start: '01 Jun', end: '30 Jun', reach: '5,000', conversion: '12.5%' },
  { id: '2', name: 'WhatsApp Flash Sale', type: 'WhatsApp', target: 'Segment VIP', status: 'ACTIVE', start: '10 Mei', end: '11 Mei', reach: '450', conversion: '45.0%' },
  { id: '3', name: 'App Update Promo', type: 'In-App', target: 'Aktif', status: 'DRAFT', start: '15 Mei', end: '20 Mei', reach: '1,200', conversion: '-' },
  { id: '4', name: 'Ramadan Kareem', type: 'Promo', target: 'Semua Pelanggan', status: 'FINISHED', start: '01 Apr', end: '30 Apr', reach: '8,200', conversion: '22.1%' },
];

export const workflowsData = [
  { 
    id: '1', 
    name: 'Auto-Alert High Priority', 
    isActive: true, 
    trigger: 'Tiket Baru', 
    condition: 'Priority: High', 
    action: 'Alert Telegram', 
    runs: 45 
  },
  { 
    id: '2', 
    name: 'Re-engagement Inactive', 
    isActive: true, 
    trigger: '7 Hari Inaktif', 
    condition: 'Segment: Aktif', 
    action: 'Email Promo', 
    runs: 128 
  },
  { 
    id: '3', 
    name: 'VIP Welcome Message', 
    isActive: false, 
    trigger: 'Customer Baru', 
    condition: 'Segment: VIP', 
    action: 'WhatsApp Sapaan', 
    runs: 12 
  },
  { 
    id: '4', 
    name: 'Escalation Low CSAT', 
    isActive: true, 
    trigger: 'Rating < 3', 
    condition: '-', 
    action: 'Buat Tiket Manager', 
    runs: 8 
  },
  { 
    id: '5', 
    name: 'Review Campaign', 
    isActive: true, 
    trigger: 'Tiket Closed', 
    condition: 'CSAT: 5 Stars', 
    action: 'Minta Review', 
    runs: 56 
  },
];

export const teamMembersData = [
  { id: '1', name: 'Admin Utama', email: 'admin@unicerm.com', role: 'Super Admin', status: 'Active', avatar: 'AU' },
  { id: '2', name: 'Budi Agen 1', email: 'budi@unicerm.com', role: 'Agent', status: 'Active', avatar: 'BA' },
  { id: '3', name: 'Santi Manager', email: 'santi@unicerm.com', role: 'Manager', status: 'Active', avatar: 'SM' },
  { id: '4', name: 'Dewi Support', email: 'dewi@unicerm.com', role: 'Agent', status: 'Inactive', avatar: 'DS' },
];

export const messageTemplatesData = [
  { id: '1', name: 'Sapaan Ramah', type: 'WhatsApp', content: 'Halo [Nama], terima kasih telah menghubungi kami. Ada yang bisa kami bantu?' },
  { id: '2', name: 'Update Tiket', type: 'Email', content: 'Status tiket Anda [#ID] telah diperbarui menjadi: [Status].' },
  { id: '3', name: 'Follow-up Inaktif', type: 'Email', content: 'Kami rindu melihat Anda! Dapatkan diskon 10% untuk transaksi berikutnya.' },
];

export const vouchersData = [
  { id: '1', code: 'UNICERM10', discount: '10%', type: 'PERSENTASE', platform: 'Web, Mobile', used: 45, max: 100, expiry: '31 Des 2026', isActive: true },
  { id: '2', code: 'VIPONLY50', discount: 'Rp 50rb', type: 'FIXED', platform: 'Mobile', used: 12, max: 50, expiry: '30 Jun 2026', isActive: true },
  { id: '3', code: 'FLASHMAY', discount: '25%', type: 'PERSENTASE', platform: 'Web', used: 89, max: 100, expiry: '15 Mei 2026', isActive: false },
  { id: '4', code: 'REFUND50K', discount: 'Rp 50rb', type: 'FIXED', platform: 'All', used: 5, max: 10, expiry: '01 Jan 2027', isActive: true },
];

export const voucherHistoryData = [
  { id: 'h1', code: 'UNICERM10', customer: 'Budi Santoso', platform: 'Mobile App', date: '08 Mei 2026', discount: 'Rp 12.500' },
  { id: 'h2', code: 'VIPONLY50', customer: 'Ani Wijaya', platform: 'Web Browser', date: '07 Mei 2026', discount: 'Rp 50.000' },
  { id: 'h3', code: 'UNICERM10', customer: 'PT Suka Maju', platform: 'Mobile App', date: '06 Mei 2026', discount: 'Rp 25.000' },
];
