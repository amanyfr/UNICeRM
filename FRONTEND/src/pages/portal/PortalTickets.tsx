import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Search, Clock, RefreshCw, CheckCircle2, 
  CalendarDays, Inbox, X, Send, Loader2, Ticket as TicketIcon
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { GlassCard, GlassBadge, GlassButton, GlassInput, GlassModal } from '../../components/ui/glass';
import { toast } from 'sonner';
import { ticketAPI } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

// ─── Helper: konversi status backend → key statusConfig ──────────────────────
function mapStatus(raw: string): string {
  switch (raw?.toLowerCase()) {
    case 'in-progress':
    case 'in_progress': return 'in_progress';
    case 'resolved':    return 'resolved';
    case 'closed':      return 'closed';
    default:            return 'open';
  }
}

function statusToProgress(status: string): number {
  switch (status) {
    case 'in_progress': return 55;
    case 'resolved':
    case 'closed':      return 100;
    default:            return 15;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTicket(t: any) {
  const padded = String(t.id).padStart(3, '0');
  const status = mapStatus(t.status);
  return {
    id:            String(t.id),
    ticketNumber:  t.ticketNumber ?? `TKT-${padded}`,
    title:         t.title        ?? '',
    description:   t.description  ?? '',
    status,
    priority:      (t.priority    ?? 'medium').toLowerCase(),
    category:      t.category     ?? 'GENERAL',
    agentName:     t.assignee?.name ?? t.assigneeName ?? 'Customer Service UNICeRM',
    agentInitials: 'CS',
    createdAt:     t.createdAt ? t.createdAt.split('T')[0] : '-',
    updatedAt:     t.updatedAt ? t.updatedAt.split('T')[0] : '-',
    progress:      statusToProgress(status),
  };
}

const statusConfig = {
  'open': {
    label: 'OPEN',
    bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]', border: 'border-[#FDE68A]',
    dot: 'bg-[#F59E0B]', icon: Clock,
  },
  'in_progress': {
    label: 'IN PROGRESS',
    bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200',
    dot: 'bg-blue-500', icon: RefreshCw,
  },
  'resolved': {
    label: 'RESOLVED',
    bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200',
    dot: 'bg-green-500', icon: CheckCircle2,
  },
  'closed': {
    label: 'CLOSED',
    bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200',
    dot: 'bg-gray-500', icon: X,
  },
};

const priorityConfig = {
  'high':   { color: 'text-red-500',       bg: 'bg-red-50',      border: 'border-red-200' },
  'medium': { color: 'text-[#F59E0B]',     bg: 'bg-[#FEF3C7]',  border: 'border-[#FDE68A]' },
  'low':    { color: 'text-gray-400',       bg: 'bg-gray-50',     border: 'border-gray-200' },
};

// ─── TicketCard ───────────────────────────────────────────────────────────────
function TicketCard({ ticket, onViewDetail }: { ticket: any; onViewDetail: (id: string) => void }) {
  const initials = ticket.agentInitials ||
    ticket.agentName?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'CS';

  const statusKey = ticket.status.toLowerCase() as keyof typeof statusConfig;
  const statusDef = statusConfig[statusKey] || statusConfig['open'];
  const pKey      = ticket.priority.toLowerCase() as keyof typeof priorityConfig;
  const pDef      = priorityConfig[pKey] || priorityConfig['medium'];

  return (
    <div
      onClick={() => onViewDetail(ticket.id)}
      className={`rounded-[16px] p-4 sm:p-6 bg-white/70 backdrop-blur-md border shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white/85 hover:shadow-md transition-all cursor-pointer ${
      ticket.status === 'open'        ? 'border-l-[6px] border-l-[#F59E0B] border-r-white/60 border-t-white/60 border-b-white/60' :
      ticket.status === 'in_progress' ? 'border-l-[6px] border-l-blue-500  border-r-white/60 border-t-white/60 border-b-white/60' :
                                        'border-l-[6px] border-l-green-500  border-r-white/60 border-t-white/60 border-b-white/60'
    }`}>

      {/* ROW ATAS */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[12px] font-mono font-bold text-gray-400">{ticket.ticketNumber}</span>
            <span className="text-gray-300">·</span>
            <span className="text-[12px] font-semibold text-[#F59E0B] uppercase tracking-wide">{ticket.category}</span>
            <span className="text-gray-300">·</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${pDef.bg} ${pDef.color} ${pDef.border}`}>
              {ticket.priority.toUpperCase()}
            </span>
          </div>
          <h3 className="text-base sm:text-[18px] font-bold text-[#1A1A1A] leading-snug">{ticket.title}</h3>
        </div>
        <div className={`flex items-center self-start gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-bold ${statusDef.bg} ${statusDef.text} ${statusDef.border}`}>
          <div className={`w-[6px] h-[6px] rounded-full ${statusDef.dot}`} />
          <span>{statusDef.label}</span>
        </div>
      </div>

      {/* DESKRIPSI */}
      <p className="text-xs sm:text-[14px] text-gray-500 leading-relaxed mb-5 line-clamp-2">
        {ticket.description}
      </p>

      {/* ROW BAWAH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[12px] text-gray-400">{ticket.createdAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[12px] text-gray-400">Diperbarui {ticket.updatedAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-[#1A1A1A] text-[9px] font-bold shadow-sm">
              {initials}
            </div>
            <span className="text-[12px] text-gray-500">{ticket.agentName || 'Customer Service'}</span>
          </div>
        </div>

        {ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
          <div className="flex items-center gap-3">
            <div className="w-[120px] h-[4px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${ticket.progress}%`, background: ticket.status === 'open' ? '#F59E0B' : '#3B82F6' }}
              />
            </div>
            <span className="text-[11px] text-gray-400">{ticket.progress}%</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-[12px] font-semibold text-green-600">Selesai</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PortalTickets() {
  const { user } = useAuth();

  // List state
  const [activeTab, setActiveTab]     = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets]         = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);

  // Create ticket modal state
  const [showModal, setShowModal]       = useState(false);
  const [priority, setPriority]         = useState<'High'|'Medium'|'Low'>('Medium');
  const [formTitle, setFormTitle]       = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDesc, setFormDesc]         = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detail modal state
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [ticketDetail, setTicketDetail]       = useState<any>(null);
  const [loadingDetail, setLoadingDetail]     = useState(false);

  // Reply state
  const [replyMessage, setReplyMessage]     = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  const TABS = ['Semua', 'Aktif', 'Resolved'];

  // ─── Fetch list tiket ───────────────────────────────────────────────────────
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ticketAPI.getAll();
      const raw = response.data?.data ?? response.data ?? [];
      setTickets(Array.isArray(raw) ? raw.map(mapTicket) : []);
    } catch (err) {
      console.error('Gagal memuat tiket portal:', err);
      toast.error('Gagal memuat data tiket. Coba refresh halaman.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshTickets = useCallback(() => { fetchTickets(); }, [fetchTickets]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  // ─── Fetch detail tiket (dengan messages) ──────────────────────────────────
  const handleViewTicket = useCallback(async (ticketId: string) => {
    setLoadingDetail(true);
    setTicketDetail(null);
    setShowDetailModal(true);
    try {
      const response = await ticketAPI.getById(ticketId);
      const data = response.data?.data ?? response.data;
      setTicketDetail(data);
    } catch (err) {
      console.error('Gagal memuat detail tiket:', err);
      toast.error('Gagal memuat detail tiket.');
      setShowDetailModal(false);
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  // ─── Kirim balasan dari customer ───────────────────────────────────────────
  const handleSendReply = async () => {
    if (!replyMessage.trim() || !ticketDetail) return;
    setIsSendingReply(true);
    try {
      await ticketAPI.sendMessage(String(ticketDetail.id), replyMessage, false);
      setReplyMessage('');
      // Refresh detail agar percakapan terupdate
      const response = await ticketAPI.getById(String(ticketDetail.id));
      setTicketDetail(response.data?.data ?? response.data);
      toast.success('Pesan berhasil dikirim!');
    } catch (err) {
      console.error('Gagal mengirim pesan:', err);
      toast.error('Gagal mengirim pesan. Coba lagi.');
    } finally {
      setIsSendingReply(false);
    }
  };

  // ─── Filter ─────────────────────────────────────────────────────────────────
  const filteredTickets = tickets
    .filter(t => {
      if (activeTab === 'Aktif')    return t.status === 'open' || t.status === 'in_progress';
      if (activeTab === 'Resolved') return t.status === 'resolved' || t.status === 'closed';
      return true;
    })
    .filter(t =>
      searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalTickets    = tickets.length;
  const activeTickets   = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length;

  // ─── Submit tiket baru ──────────────────────────────────────────────────────
  const handleSubmitTicket = async () => {
    if (!formTitle || !formCategory || !formDesc) return;
    setIsSubmitting(true);
    try {
      await ticketAPI.create({
        title:       formTitle,
        description: formDesc,
        priority:    priority.toLowerCase(),
        channel:     'form',
        category:    formCategory,
      });
      setFormTitle(''); setFormCategory(''); setFormDesc(''); setPriority('Medium');
      setShowModal(false);
      toast.success('Tiket berhasil dikirim! Tim kami akan segera membantu.');
      refreshTickets();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Gagal mengirim tiket. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center py-24">
          <RefreshCw className="w-6 h-6 animate-spin text-[#F59E0B]" />
          <span className="ml-3 text-gray-400 font-medium text-[14px]">Memuat tiket...</span>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="w-full min-h-[calc(100vh-56px)] bg-transparent">

        {/* HEADER SECTION */}
        <div className="w-full px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-[32px] font-bold text-[#1A1A1A] leading-tight">Riwayat Tiket</h1>
              <p className="text-xs sm:text-[14px] text-gray-500 mt-1">Pantau dan kelola semua tiket layanan Anda.</p>
            </div>
            <GlassButton onClick={() => setShowModal(true)} className="flex items-center justify-center gap-2.5 h-[44px]">
              <Plus className="w-4 h-4" />
              Buat Tiket Baru
            </GlassButton>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="w-full px-4 sm:px-6 md:px-8 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard className="px-5 py-4 flex items-center gap-4">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-gray-100/50 backdrop-blur-sm border border-white/60">
                <TicketIcon className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <span className="text-[22px] font-bold text-[#1A1A1A] block">{totalTickets}</span>
                <p className="text-[12px] text-gray-500 block">Total Tiket</p>
              </div>
            </GlassCard>

            <GlassCard className="px-4 py-4 flex items-center gap-4">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-[#FEF3C7]/50 backdrop-blur-sm border border-[#FEF3C7]/60">
                <Clock className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <span className="text-[22px] font-bold text-[#1A1A1A] block">{activeTickets}</span>
                <p className="text-[12px] text-gray-500 block">Tiket Aktif</p>
              </div>
            </GlassCard>

            <GlassCard className="px-4 py-4 flex items-center gap-4">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-green-50/50 backdrop-blur-sm border border-green-100/60">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <span className="text-[22px] font-bold text-[#1A1A1A] block">{resolvedTickets}</span>
                <p className="text-[12px] text-gray-500 block">Diselesaikan</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* FILTER + SEARCH */}
        <div className="w-full px-4 sm:px-6 md:px-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl p-1 overflow-x-auto self-start sm:self-auto max-w-full">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-black/5' : 'text-text-soft hover:text-primary hover:bg-white/40'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative flex-1 w-full max-w-full sm:max-w-[360px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Cari ID tiket atau masalah..."
                className="w-full h-[40px] sm:h-[44px] bg-white/40 backdrop-blur-md border border-white/60 rounded-xl pl-10 pr-4 text-xs sm:text-[13px] text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder-gray-400 transition-all font-bold"
              />
            </div>
          </div>
        </div>

        {/* LIST TIKET */}
        <div className="w-full px-4 sm:px-6 md:px-8 pb-10">
          <div className="flex flex-col gap-3">
            {filteredTickets.length > 0 ? (
              filteredTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} onViewDetail={handleViewTicket} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-[72px] h-[72px] rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-[16px] font-semibold text-gray-400">Tidak ada tiket ditemukan.</p>
                <p className="text-[13px] text-gray-300 mt-1 text-center">Coba ubah filter atau kata kunci pencarian.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── MODAL BUAT TIKET BARU ─────────────────────────────────────────── */}
        <GlassModal isOpen={showModal} onClose={() => setShowModal(false)} title="Buat Tiket Baru">
          <div className="space-y-3.5 md:space-y-5">
            <div>
              <label className="text-[11px] md:text-xs font-extrabold text-neutral-500 uppercase tracking-widest block mb-1.5">JUDUL MASALAH <span className="text-red-500">*</span></label>
              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Contoh: Tidak bisa login ke akun"
                className="w-full h-10 md:h-11 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl px-4 text-[13px] text-gray-800 outline-none focus:bg-white/70 focus:border-[#F59E0B]/50 focus:ring-4 focus:ring-[#F59E0B]/20 placeholder-gray-400 font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] md:text-xs font-extrabold text-neutral-500 uppercase tracking-widest block mb-1.5">KATEGORI <span className="text-red-500">*</span></label>
              <select
                value={formCategory}
                onChange={e => setFormCategory(e.target.value)}
                className="w-full h-10 md:h-11 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl px-4 text-[13px] text-gray-800 outline-none focus:bg-white/70 focus:border-[#F59E0B]/50 focus:ring-4 focus:ring-[#F59E0B]/20 placeholder-gray-400 font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all appearance-none cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.25em 1.25em" }}
              >
                <option value="" disabled className="text-neutral-400">Pilih kategori permasalahan...</option>
                <option value="General">General</option>
                <option value="Teknis">Teknis</option>
                <option value="Pembayaran">Pembayaran</option>
                <option value="Promo & Voucher">Promo &amp; Voucher</option>
                <option value="Akun & Keamanan">Akun &amp; Keamanan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] md:text-xs font-extrabold text-neutral-500 uppercase tracking-widest block mb-1.5">PRIORITAS <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['Low', 'Medium', 'High'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`h-10 md:h-11 rounded-xl border text-[12px] md:text-[13px] font-bold transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] backdrop-blur-md ${
                      priority === p
                        ? p === 'High'   ? 'bg-red-500   border-red-400   text-white shadow-[0_8px_16px_rgba(239,68,68,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]'
                        : p === 'Medium' ? 'bg-amber-500  border-amber-400  text-white shadow-[0_8px_16px_rgba(245,159,11,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]'
                                         : 'bg-emerald-500 border-emerald-400 text-white shadow-[0_8px_16px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]'
                        : 'bg-white/40 border-white/60 text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] md:text-xs font-extrabold text-neutral-500 uppercase tracking-widest block mb-1.5">DESKRIPSI <span className="text-red-500">*</span></label>
              <textarea
                rows={3}
                value={formDesc}
                onChange={e => setFormDesc(e.target.value)}
                placeholder="Jelaskan masalah Anda secara detail..."
                className="w-full bg-white/40 backdrop-blur-md border border-white/60 rounded-xl px-4 py-2.5 text-[13px] text-gray-800 outline-none resize-none leading-relaxed focus:bg-white/70 focus:border-[#F59E0B]/50 focus:ring-4 focus:ring-[#F59E0B]/20 placeholder-gray-400 font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all h-[80px] md:h-auto"
              />
            </div>

            <div className="flex gap-3 pt-3 md:pt-5 mt-1 border-t border-white/40">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 h-11 md:h-12 bg-white/50 backdrop-blur-md border border-white/70 text-gray-700 font-bold rounded-xl hover:bg-white/80 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)]"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitTicket}
                disabled={!formTitle || !formCategory || !formDesc || isSubmitting}
                className={`flex-1 h-11 md:h-12 font-bold rounded-xl flex items-center justify-center gap-2 transition-all backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.4)] ${
                  !formTitle || !formCategory || !formDesc || isSubmitting
                    ? 'bg-neutral-200/40 border border-white/30 text-neutral-400 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-amber-500 to-amber-400 border border-amber-400 text-white hover:brightness-110 active:scale-[0.98] shadow-[0_8px_16px_rgba(245,159,11,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]'
                }`}
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin inline-block" /><span>MENGIRIM...</span></>
                ) : 'KIRIM TIKET'}
              </button>
            </div>
          </div>
        </GlassModal>

        {/* ── MODAL DETAIL TIKET & PERCAKAPAN ──────────────────────────────── */}
        <GlassModal
          isOpen={showDetailModal}
          onClose={() => { setShowDetailModal(false); setTicketDetail(null); setReplyMessage(''); }}
          title={ticketDetail?.title || 'Detail Tiket'}
        >
          {loadingDetail ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">

              {/* INFO TIKET */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</p>
                  <p className="text-[13px] font-semibold text-[#1A1A1A]">
                    {ticketDetail?.status?.toUpperCase().replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Prioritas</p>
                  <p className="text-[13px] font-semibold text-[#1A1A1A]">
                    {ticketDetail?.priority?.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Nomor Tiket</p>
                  <p className="text-[13px] font-mono text-gray-600">
                    {ticketDetail?.ticketNumber ?? `TKT-${String(ticketDetail?.id ?? '').padStart(3, '0')}`}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tanggal</p>
                  <p className="text-[13px] text-gray-600">
                    {ticketDetail?.createdAt
                      ? new Date(ticketDetail.createdAt).toLocaleDateString('id-ID')
                      : '-'}
                  </p>
                </div>
              </div>

              {/* DESKRIPSI */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Deskripsi</p>
                <p className="text-[13px] text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">
                  {ticketDetail?.description || '-'}
                </p>
              </div>

              {/* RIWAYAT PERCAKAPAN */}
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase mb-3">
                  Riwayat Percakapan ({ticketDetail?.messages?.filter((m: any) => !m.isInternal).length || 0} pesan)
                </p>

                {(ticketDetail?.messages?.filter((m: any) => !m.isInternal).length ?? 0) > 0 ? (
                  <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                    {ticketDetail.messages
                      .filter((msg: any) => !msg.isInternal)
                      .map((msg: any) => {
                        const isCustomer = msg.senderRole === 'customer';
                        return (
                          <div key={msg.id} className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                              isCustomer
                                ? 'bg-[#F59E0B] text-white rounded-br-sm'
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                            }`}>
                              <p className={`text-[10px] font-bold mb-1 ${isCustomer ? 'text-white/70' : 'text-gray-400'}`}>
                                {isCustomer ? 'Kamu' : 'Customer Service UNICeRM'}
                              </p>
                              <p className="text-[13px] leading-relaxed">
                                {msg.message ?? msg.content}
                              </p>
                              <p className={`text-[10px] mt-1 ${isCustomer ? 'text-white/60' : 'text-gray-400'}`}>
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleString('id-ID') : ''}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400 text-[13px] bg-gray-50 rounded-xl">
                    Belum ada percakapan
                  </div>
                )}
              </div>

              {/* FORM BALAS PESAN */}
              {ticketDetail?.status !== 'resolved' && ticketDetail?.status !== 'closed' && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Tulis Balasan</p>
                  <div className="flex gap-2">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Tulis pesan kamu di sini..."
                      rows={2}
                      className="flex-1 bg-white/60 border border-white/85 rounded-xl px-3 py-2 text-[13px] text-gray-800 outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 resize-none font-medium placeholder-gray-400 transition-all"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim() || isSendingReply}
                      className="px-4 py-2 bg-[#F59E0B] text-white font-bold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 self-end"
                    >
                      {isSendingReply ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      Kirim
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </GlassModal>

      </div>
    </PortalLayout>
  );
}
