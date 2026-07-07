'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  X, 
  Send, 
  Filter, 
  RefreshCw, 
  Inbox, 
  User, 
  ChevronRight, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ticketAPI } from '../../lib/api';

// Interface matching the defined spec
export interface Ticket {
  backendId?: number;   // id asli dari backend (integer)
  id: string;           // format TKT-xxx untuk tampilan UI
  title: string;
  customer: string;
  customerEmail: string;
  status: 'OPEN' | 'IN-PROGRESS' | 'RESOLVED';
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  date: string;
  lastUpdate: string;
  assignee: string;
  description: string;
  replies?: Array<{
    id: string;
    sender: 'customer' | 'cs';
    senderName: string;
    message: string;
    time: string;
  }>;
}

// ─── Helper: map backend status → UI status ──────────────────────────────────
function mapStatus(raw: string): Ticket['status'] {
  switch (raw?.toLowerCase()) {
    case 'in-progress':
    case 'in_progress':
      return 'IN-PROGRESS';
    case 'resolved':
      return 'RESOLVED';
    default:
      return 'OPEN';
  }
}

// Helper: map UI status → backend status
function toBackendStatus(uiStatus: Ticket['status']): string {
  switch (uiStatus) {
    case 'IN-PROGRESS': return 'in-progress';
    case 'RESOLVED':    return 'resolved';
    default:            return 'open';
  }
}

// Helper: map backend priority → UI priority
function mapPriority(raw: string): Ticket['priority'] {
  switch (raw?.toLowerCase()) {
    case 'high':   return 'High';
    case 'low':    return 'Low';
    default:       return 'Medium';
  }
}

// Helper: format tanggal singkat
function fmtDate(iso: string): string {
  if (!iso) return '-';
  return iso.split('T')[0];
}

// Helper: map satu tiket dari backend ke format UI
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTicket(t: any): Ticket & { backendId: number } {
  const padded = String(t.id).padStart(3, '0');
  return {
    backendId: t.id,
    id: `TKT-${padded}`,
    title: t.title ?? '',
    customer: t.customer?.name ?? t.customerName ?? 'Unknown',
    customerEmail: t.customer?.email ?? t.customerEmail ?? '-',
    status: mapStatus(t.status),
    priority: mapPriority(t.priority),
    category: t.category ?? 'General',
    date: fmtDate(t.createdAt),
    lastUpdate: fmtDate(t.updatedAt),
    assignee: t.assignee?.name ?? t.assigneeName ?? 'Menunggu',
    description: t.description ?? '',
    replies: (t.messages ?? []).map((m: any) => ({
      id: String(m.id),
      sender: m.senderRole === 'agent' ? 'cs' : 'customer',
      senderName: m.senderName ?? 'Unknown',
      message: m.content ?? '',
      time: fmtDate(m.createdAt),
    })),
  };
}

export default function TicketPage() {
  // Load user info
  let user: any = { name: 'Demo User', role: 'admin' };
  try {
    const raw = localStorage.getItem('currentUser') || localStorage.getItem('unicerm_user');
    if (raw && raw !== 'undefined') {
      user = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse user in TicketPage:', e);
  }

  const isAdmin = user.role === 'admin';
  const isCS = user.role === 'cs' || user.role === 'agent';

  // State Management
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'Semua' | 'Open' | 'In Progress' | 'Resolved'>('Semua');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  // Modals CS Only
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [newTicketData, setNewTicketData] = useState({
    title: '',
    customer: '',
    customerEmail: '',
    priority: 'Medium' as Ticket['priority'],
    category: 'General',
    description: ''
  });

  // Reply state
  const [replyText, setReplyText] = useState('');

  // ─── Fetch tiket dari backend ────────────────────────────────────────────────
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ticketAPI.getAll();
      const raw = response.data?.data ?? response.data ?? [];
      setTickets(Array.isArray(raw) ? raw.map(mapTicket) : []);
    } catch (err) {
      console.error('Gagal memuat tiket:', err);
      toast.error('Gagal memuat data tiket dari server.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshTickets = useCallback(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Sync selected ticket updates
  const currentSelectedTicket = useMemo(() => {
    if (!selectedTicket) return null;
    return tickets.find(t => t.id === selectedTicket.id) || selectedTicket;
  }, [tickets, selectedTicket]);

  // Filtering Logic
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      // Status mapping
      const matchesTab = activeTab === 'Semua' ? true : (
        activeTab === 'Open' && t.status === 'OPEN' ||
        activeTab === 'In Progress' && t.status === 'IN-PROGRESS' ||
        activeTab === 'Resolved' && t.status === 'RESOLVED'
      );

      // Priority mapping
      const matchesPriority = !priorityFilter ? true : (
        t.priority.toLowerCase() === priorityFilter.toLowerCase()
      );

      return matchesTab && matchesPriority;
    });
  }, [tickets, activeTab, priorityFilter]);

  // Group columns for Kanban Board
  const openTickets = useMemo(() => filteredTickets.filter(t => t.status === 'OPEN'), [filteredTickets]);
  const inProgressTickets = useMemo(() => filteredTickets.filter(t => t.status === 'IN-PROGRESS'), [filteredTickets]);
  const resolvedTickets = useMemo(() => filteredTickets.filter(t => t.status === 'RESOLVED'), [filteredTickets]);

  // ─── Drag and Drop Handler ───────────────────────────────────────────────────
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a valid droppable area
    if (!destination) return;

    // Dropped in the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Same column, no status change needed
    if (source.droppableId === destination.droppableId) return;

    // Map droppableId to backend status
    const statusMap: Record<string, string> = {
      'open': 'open',
      'in-progress': 'in-progress',
      'resolved': 'resolved',
    };

    const destinationStatus = statusMap[destination.droppableId];
    if (!destinationStatus) return;

    const ticket = tickets.find(t => String(t.backendId) === draggableId);
    if (!ticket?.backendId) {
      toast.error('ID backend tidak ditemukan untuk tiket ini.');
      return;
    }

    try {
      await ticketAPI.update(String(ticket.backendId), { status: destinationStatus });
      toast.success('Status tiket diperbarui!');
      refreshTickets();
    } catch (err) {
      console.error('Gagal update status tiket:', err);
      toast.error('Gagal memperbarui status tiket.');
    }
  };

  // Handlers
  const handleUpdateStatus = async (ticketId: string, nextStatus: Ticket['status']) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket?.backendId) {
      toast.error('ID backend tidak ditemukan untuk tiket ini.');
      return;
    }
    try {
      await ticketAPI.update(String(ticket.backendId), { status: toBackendStatus(nextStatus) });
      toast.success(`Tiket ${ticketId} berhasil dipindah ke ${nextStatus}!`);
      refreshTickets();
    } catch (err) {
      console.error(err);
      toast.error('Gagal update status tiket.');
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketData.title.trim() || !newTicketData.customer.trim() || !newTicketData.customerEmail.trim()) {
      toast.error('Harap isi judul, customer, dan email!');
      return;
    }

    // Buat tiket hanya tersedia untuk customer melalui portal.
    // CS/Admin mencatat tiket secara lokal sementara.
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));

    const idNum = tickets.length + 1;
    const padding = idNum < 10 ? `00${idNum}` : idNum < 100 ? `0${idNum}` : String(idNum);
    const newId = `TKT-${padding}`;

    const newTicket: Ticket = {
      id: newId,
      title: newTicketData.title,
      customer: newTicketData.customer,
      customerEmail: newTicketData.customerEmail,
      status: 'OPEN',
      priority: newTicketData.priority,
      category: newTicketData.category,
      date: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      assignee: 'Menunggu',
      description: newTicketData.description || 'Tidak ada deskripsi rinci.',
      replies: []
    };

    setTickets(prev => [newTicket, ...prev]);
    setIsLoading(false);
    setIsCreateModalOpen(false);
    setNewTicketData({
      title: '',
      customer: '',
      customerEmail: '',
      priority: 'Medium',
      category: 'General',
      description: ''
    });
    toast.success(`Tiket ${newId} berhasil dibuat (lokal)!`);
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !currentSelectedTicket) return;

    if (!currentSelectedTicket.backendId) {
      // Tiket lokal (belum tersimpan di backend) — update state saja
      const newReply = {
        id: `reply-${Date.now()}`,
        sender: 'cs' as const,
        senderName: user.name || 'Tim CS',
        message: replyText,
        time: new Date().toISOString().split('T')[0],
      };
      setTickets(prev => prev.map(t =>
        t.id === currentSelectedTicket.id
          ? { ...t, lastUpdate: new Date().toISOString().split('T')[0], replies: [...(t.replies || []), newReply] }
          : t
      ));
      setReplyText('');
      toast.success('Balasan berhasil dikirim!');
      return;
    }

    try {
      await ticketAPI.sendMessage(String(currentSelectedTicket.backendId), replyText);
      setReplyText('');
      toast.success('Balasan berhasil dikirim!');
      refreshTickets();
    } catch (err) {
      console.error(err);
      toast.error('Gagal mengirim balasan.');
    }
  };

  const handleResolveAndReply = async () => {
    if (!currentSelectedTicket) return;

    if (!currentSelectedTicket.backendId) {
      // Tiket lokal — update state saja
      const currentReplies = [...(currentSelectedTicket.replies || [])];
      if (replyText.trim()) {
        currentReplies.push({
          id: `reply-${Date.now()}`,
          sender: 'cs' as const,
          senderName: user.name || 'Tim CS',
          message: replyText,
          time: new Date().toISOString().split('T')[0],
        });
        setReplyText('');
      }
      setTickets(prev => prev.map(t =>
        t.id === currentSelectedTicket.id
          ? { ...t, status: 'RESOLVED', lastUpdate: new Date().toISOString().split('T')[0], replies: currentReplies }
          : t
      ));
      toast.success('Tiket berhasil diselesaikan (RESOLVED)!');
      return;
    }

    try {
      if (replyText.trim()) {
        await ticketAPI.sendMessage(String(currentSelectedTicket.backendId), replyText);
        setReplyText('');
      }
      await ticketAPI.update(String(currentSelectedTicket.backendId), { status: 'resolved' });
      toast.success('Tiket berhasil diselesaikan (RESOLVED)!');
      refreshTickets();
    } catch (err) {
      console.error(err);
      toast.error('Gagal menyelesaikan tiket.');
    }
  };

  const handleCloseTicket = () => {
    if (!currentSelectedTicket) return;
    toast.info('Kelola tiket sudah ditutup.');
    setSelectedTicket(null);
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
    if (selectedTicket?.id === id) {
      setSelectedTicket(null);
    }
    toast.success(`Tiket ${id} berhasil dihapus.`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">

        {/* LOADING SPINNER */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-7 h-7 animate-spin text-[#F59E0B]" />
            <span className="ml-3 text-gray-500 font-medium text-[14px]">Memuat tiket...</span>
          </div>
        )}

        {!loading && (<>

        {/* HEADER HALAMAN */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div id="tickets-header-left">
            <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Tiket Layanan
            </h1>
            <p className="text-[14px] text-gray-500 mt-0.5">
              Kelola dan respon tiket layanan customer secara profesional.
            </p>
          </div>

          <div id="tickets-header-right">
            {isCS && (
              <button
                id="btn-create-ticket"
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-[#1A1A1A] hover:bg-neutral-800 text-white px-5 py-3 rounded-xl transition-all duration-200 shadow-md font-bold text-[14px] flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Buat Tiket
              </button>
            )}
          </div>
        </div>

        {/* FILTER BAR */}
        <div id="tickets-filter-bar" className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
          {/* Status Tab buttons */}
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 w-fit">
            {(['Semua', 'Open', 'In Progress', 'Resolved'] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-${tab.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-gray-400 hover:text-[#1A1A1A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md px-3 py-1 rounded-2xl border border-white/80 shadow-sm">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              id="filter-priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-[44px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[13px] text-gray-700 font-bold outline-none focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 transition-all cursor-pointer min-w-[160px] shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
            >
              <option value="">Semua Prioritas</option>
              <option value="High">Tinggi (High)</option>
              <option value="Medium">Sedang (Medium)</option>
              <option value="Low">Rendah (Low)</option>
            </select>
          </div>
        </div>

        {/* KANBAN BOARD VIEW */}
        <DragDropContext onDragEnd={onDragEnd}>
        <div id="tickets-kanban-board" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: OPEN */}
          <div className="bg-neutral-50/75 border border-neutral-200/50 rounded-[28px] p-5 flex flex-col min-h-[520px] shadow-sm">
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8A800] ring-4 ring-[#F5C518]/15" />
                <span className="text-[12px] font-extrabold text-neutral-800 uppercase tracking-widest">OPEN TICKET</span>
              </div>
              <span className="bg-[#1A1A1A] text-[#F5C518] text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                {openTickets.length}
              </span>
            </div>

            <Droppable droppableId="open" isDropDisabled={!isCS && !isAdmin}>
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  className="space-y-3.5 flex-1 overflow-y-auto max-h-[600px] pr-1 scrollbar-none"
                >
                  {openTickets.map((ticket, index) => (
                    <Draggable 
                      key={String(ticket.backendId)} 
                      draggableId={String(ticket.backendId)} 
                      index={index}
                      isDragDisabled={!isCS && !isAdmin}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TicketCard 
                            ticket={ticket} 
                            isCS={isCS}
                            onClick={() => setSelectedTicket(ticket)}
                            onUpdateStatus={handleUpdateStatus}
                            onDelete={handleDeleteTicket}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {openTickets.length === 0 && (
                    <div className="py-14 text-center text-neutral-450 text-[12px] border border-dashed border-neutral-200 rounded-[20px] bg-white/40 flex flex-col items-center justify-center gap-2">
                      <span className="text-xl">🌱</span>
                      <span className="font-bold text-neutral-400">Tidak ada tiket barusan</span>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>

          {/* Column 2: IN PROGRESS */}
          <div className="bg-neutral-50/75 border border-neutral-200/50 rounded-[28px] p-5 flex flex-col min-h-[520px] shadow-sm">
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse ring-4 ring-blue-500/15" />
                <span className="text-[12px] font-extrabold text-neutral-800 uppercase tracking-widest">IN PROGRESS</span>
              </div>
              <span className="bg-blue-600 text-white text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                {inProgressTickets.length}
              </span>
            </div>

            <Droppable droppableId="in-progress" isDropDisabled={!isCS && !isAdmin}>
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  className="space-y-3.5 flex-1 overflow-y-auto max-h-[600px] pr-1 scrollbar-none"
                >
                  {inProgressTickets.map((ticket, index) => (
                    <Draggable 
                      key={String(ticket.backendId)} 
                      draggableId={String(ticket.backendId)} 
                      index={index}
                      isDragDisabled={!isCS && !isAdmin}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TicketCard 
                            ticket={ticket} 
                            isCS={isCS}
                            onClick={() => setSelectedTicket(ticket)}
                            onUpdateStatus={handleUpdateStatus}
                            onDelete={handleDeleteTicket}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {inProgressTickets.length === 0 && (
                    <div className="py-14 text-center text-neutral-450 text-[12px] border border-dashed border-neutral-200 rounded-[20px] bg-white/40 flex flex-col items-center justify-center gap-2">
                      <span className="text-xl">⚡</span>
                      <span className="font-bold text-neutral-400">Semua tugas sedang santai</span>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>

          {/* Column 3: RESOLVED */}
          <div className="bg-neutral-50/75 border border-neutral-200/50 rounded-[28px] p-5 flex flex-col min-h-[520px] shadow-sm">
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-505 bg-green-500 ring-4 ring-green-500/15" />
                <span className="text-[12px] font-extrabold text-neutral-800 uppercase tracking-widest">RESOLVED</span>
              </div>
              <span className="bg-green-600 text-white text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                {resolvedTickets.length}
              </span>
            </div>

            <Droppable droppableId="resolved" isDropDisabled={!isCS && !isAdmin}>
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  className="space-y-3.5 flex-1 overflow-y-auto max-h-[600px] pr-1 scrollbar-none"
                >
                  {resolvedTickets.map((ticket, index) => (
                    <Draggable 
                      key={String(ticket.backendId)} 
                      draggableId={String(ticket.backendId)} 
                      index={index}
                      isDragDisabled={!isCS && !isAdmin}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TicketCard 
                            ticket={ticket} 
                            isCS={isCS}
                            onClick={() => setSelectedTicket(ticket)}
                            onUpdateStatus={handleUpdateStatus}
                            onDelete={handleDeleteTicket}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {resolvedTickets.length === 0 && (
                    <div className="py-14 text-center text-neutral-450 text-[12px] border border-dashed border-neutral-200 rounded-[20px] bg-white/40 flex flex-col items-center justify-center gap-2">
                      <span className="text-xl">✨</span>
                      <span className="font-bold text-neutral-400">Belum ada tiket tuntas</span>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>

        </div>
        </DragDropContext>

        {/* DETAIL TIKET SIDE PANEL (Slide from Right) */}
        <AnimatePresence>
          {currentSelectedTicket && (
            <>
              {/* Overlay background */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTicket(null)}
                className="fixed inset-0 bg-black/40 z-40 transition-opacity"
              />

              {/* Slider Drawer Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.28 }}
                id="tickets-detail-panel"
                className="fixed right-0 top-0 h-full w-full sm:w-[460px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200"
              >
                {/* HEADER PANEL */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                  <div className="min-w-0 pr-4">
                    <span className="font-mono text-[12px] text-gray-400 block font-bold">{currentSelectedTicket.id}</span>
                    <h2 className="text-[18px] font-bold text-[#1A1A1A] leading-snug mt-1 truncate" title={currentSelectedTicket.title}>
                      {currentSelectedTicket.title}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setSelectedTicket(null)}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-500 flex-shrink-0 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* META INFO */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Status</label>
                    {getStatusIndicator(currentSelectedTicket.status)}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Prioritas</label>
                    {getPriorityIndicator(currentSelectedTicket.priority)}
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Pelanggan</label>
                    <span className="text-[13px] font-bold text-[#1A1A1A] block">{currentSelectedTicket.customer}</span>
                    <span className="text-[11px] text-gray-500 font-mono">{currentSelectedTicket.customerEmail}</span>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Penanggung Jawab</label>
                    <span className="text-[13px] font-semibold text-gray-700">{currentSelectedTicket.assignee}</span>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kategori</label>
                    <span className="text-[13px] font-semibold text-gray-700">{currentSelectedTicket.category}</span>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tanggal Dibuat</label>
                    <span className="text-[12px] text-gray-500 font-medium font-mono">{currentSelectedTicket.date}</span>
                  </div>
                </div>

                {/* CONVERSATION HISTORY */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-zinc-50/30">
                  <h3 className="text-[14px] font-bold text-[#1A1A1A] tracking-tight">Riwayat Percakapan</h3>
                  
                  {/* Message 1: Customer initial complain description */}
                  <div className="flex gap-3 text-left items-start">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#1A1A1A] text-[13px] font-extrabold flex-shrink-0 select-none">
                      {currentSelectedTicket.customer ? currentSelectedTicket.customer.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-bold text-[13px] text-[#1A1A1A]">{currentSelectedTicket.customer}</span>
                        <span className="text-[10px] text-gray-400 font-medium font-mono">{currentSelectedTicket.date}</span>
                        <span className="bg-amber-100 text-[#D97706] text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">Pengirim</span>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm p-4 border border-gray-150 shadow-sm">
                        <p className="text-[13px] text-[#222] leading-relaxed whitespace-pre-wrap font-medium">
                          {currentSelectedTicket.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message Replies */}
                  {currentSelectedTicket.replies && currentSelectedTicket.replies.map((reply) => {
                    const isCsSender = reply.sender === 'cs';
                    return (
                      <div 
                        key={reply.id} 
                        className={`flex gap-3 items-start ${isCsSender ? 'flex-row-reverse text-right' : 'text-left'}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 select-none ${
                          isCsSender ? 'bg-[#1A1A1A] text-[#F59E0B]' : 'bg-[#F59E0B] text-[#1A1A1A]'
                        }`}>
                          {reply.senderName ? reply.senderName.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div className="flex-1 min-w-0 max-w-[85%]">
                          <div className={`flex items-center gap-2 mb-1.5 flex-wrap ${isCsSender ? 'justify-end' : ''}`}>
                            <span className="font-bold text-[13px] text-[#1A1A1A]">
                              {isCsSender ? `Tim CS (${reply.senderName})` : reply.senderName}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">{reply.time}</span>
                          </div>
                          <div className={`rounded-2xl p-4 border shadow-sm ${
                            isCsSender 
                              ? 'bg-[#FEF3C7] rounded-tr-sm border-[#FDE68A] text-left' 
                              : 'bg-white rounded-tl-sm border-gray-150 text-left'
                          }`}>
                            <p className="text-[13px] text-zinc-800 leading-relaxed font-medium">
                              {reply.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* REPLY INPUT AREA */}
                <div className="border-t border-gray-100 p-4 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
                  {isCS ? (
                    <div className="space-y-3">
                      <textarea 
                        rows={3}
                        placeholder="Tulis balasan untuk customer..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[13px] text-gray-800 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/20 outline-none transition-all resize-none leading-relaxed font-semibold"
                      />
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div className="flex gap-2">
                          {currentSelectedTicket.status !== 'RESOLVED' && (
                            <>
                              <button 
                                onClick={handleResolveAndReply}
                                className="bg-green-500 hover:bg-green-600 text-white text-[12px] font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 duration-100"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Resolve
                              </button>
                              <button 
                                onClick={handleCloseTicket}
                                className="border border-gray-200 hover:bg-gray-50 text-[12px] font-semibold text-gray-600 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                              >
                                Tutup Tiket
                              </button>
                            </>
                          )}
                        </div>
                        <button 
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          className="bg-[#1A1A1A] hover:bg-neutral-800 text-white text-[12px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                        >
                          <Send className="w-3.5 h-3.5 text-[#F59E0B]" />
                          Kirim
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <p className="text-[12px] text-gray-500 font-medium">
                        Akses Monitoring Saja (Admin tidak dapat membalas tiket)
                      </p>
                    </div>
                  )}
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CS BUAT TIKET MODAL */}
        {isCS && isCreateModalOpen && (
          <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-3xl border border-white/70 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-2xl w-full max-w-[480px] relative overflow-hidden transition-all transform scale-100 p-1 animate-glass">
              
              {/* Header Modal */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/60">
                <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                  Buat Tiket Baru
                </h2>
                <button 
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-xl bg-white/40 hover:bg-white/80 border border-white/60 transition-colors w-[32px] h-[32px] flex items-center justify-center text-gray-500 cursor-pointer animate-pulse"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleCreateTicket}>
                <div className="px-6 py-5 space-y-4">
                  
                  {/* Judul Tiket */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      JUDUL TIKET*
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan judul keluhan"
                      value={newTicketData.title}
                      onChange={(e) => setNewTicketData(p => ({ ...p, title: e.target.value }))}
                      className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-900 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    />
                  </div>

                  {/* Pelanggan */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                        CUSTOMER*
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="Nama pelanggan"
                        value={newTicketData.customer}
                        onChange={(e) => setNewTicketData(p => ({ ...p, customer: e.target.value }))}
                        className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-900 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                      />
                    </div>
                    <div>
                      <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                        EMAIL*
                      </label>
                      <input 
                        type="email"
                        required
                        placeholder="customer@email.com"
                        value={newTicketData.customerEmail}
                        onChange={(e) => setNewTicketData(p => ({ ...p, customerEmail: e.target.value }))}
                        className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-900 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                      />
                    </div>
                  </div>

                  {/* Kategori Tersedia */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      KATEGORI LAYANAN*
                    </label>
                    <select
                      value={newTicketData.category}
                      onChange={(e) => setNewTicketData(p => ({ ...p, category: e.target.value }))}
                      className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-950 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold cursor-pointer shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    >
                      <option value="General">General</option>
                      <option value="Teknis">Teknis</option>
                      <option value="Pembayaran">Pembayaran</option>
                      <option value="Promo">Promo</option>
                      <option value="Akun">Akun</option>
                    </select>
                  </div>

                  {/* Prioritas */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      TINGKAT PRIORITAS*
                    </label>
                    <select
                      value={newTicketData.priority}
                      onChange={(e) => setNewTicketData(p => ({ ...p, priority: e.target.value as Ticket['priority'] }))}
                      className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-950 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold cursor-pointer shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      DESKRIPSI KELUHAN
                    </label>
                    <textarea 
                      rows={3}
                      placeholder="Masukkan deskripsi atau keluhan pelanggan..."
                      value={newTicketData.description}
                      onChange={(e) => setNewTicketData(p => ({ ...p, description: e.target.value }))}
                      className="w-full bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl p-4 text-[14px] text-neutral-900 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-medium resize-none leading-relaxed shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    />
                  </div>

                </div>

                {/* Footer Modal */}
                <div className="flex gap-3 justify-end px-6 py-4 border-t border-white/60">
                  <button 
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="border border-white/60 rounded-xl px-5 py-2.5 bg-white/40 hover:bg-white/80 text-gray-600 font-semibold text-[13px] hover:text-gray-900 cursor-pointer transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#F59E0B] text-[#1A1A1A] font-bold rounded-xl px-6 py-2.5 hover:bg-amber-500 transition-colors text-[13px] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                    <span>{isLoading ? 'Membuat...' : 'Buat Tiket'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        </>)}

      </div>
    </DashboardLayout>
  );
}

// ==========================================
// TICKET CARD PLUGGABLE COMPONENT
// ==========================================
interface TicketCardProps {
  key?: React.Key;
  ticket: Ticket;
  isCS: boolean;
  onClick: () => void;
  onUpdateStatus: (id: string, nextStatus: Ticket['status']) => void;
  onDelete: (id: string) => void;
}

function TicketCard({ ticket, isCS, onClick, onUpdateStatus, onDelete }: TicketCardProps) {
  const initials = ticket.customer ? ticket.customer.charAt(0).toUpperCase() : '?';

  // Define styling based on category
  const categoryStyles: Record<string, string> = {
    'General': 'bg-neutral-100 text-neutral-600 border-neutral-200',
    'Teknis': 'bg-blue-50 text-blue-600 border-blue-200',
    'Pembayaran': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'Promo': 'bg-purple-50 text-purple-600 border-purple-200',
    'Akun': 'bg-amber-50 text-amber-600 border-amber-200',
  };

  const catStyle = categoryStyles[ticket.category] || 'bg-gray-100 text-gray-600 border-gray-200';

  return (
    <div 
      onClick={onClick}
      className="bg-white hover:bg-neutral-50/50 rounded-2xl border border-gray-150 p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer relative group flex flex-col gap-3 min-h-[160px]"
    >
      {/* ROW ATAS: ID + Category & Priority badges */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold font-mono text-neutral-400">{ticket.id}</span>
          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border ${catStyle} uppercase tracking-wider`}>
            {ticket.category}
          </span>
        </div>
        {getPriorityIndicator(ticket.priority)}
      </div>

      {/* JUDUL TIKET */}
      <p className="text-[13.5px] font-bold text-neutral-800 leading-snug line-clamp-2">
        {ticket.title}
      </p>

      {/* CUSTOMER INFO */}
      <div className="flex items-center gap-2">
        <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[#F5C518] to-[#E8A800] text-neutral-900 flex items-center justify-center text-[11px] font-bold flex-shrink-0 select-none shadow-sm">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-[12px] text-neutral-700 font-bold truncate leading-none">
            {ticket.customer}
          </p>
        </div>
      </div>

      {/* FOOTER CARD */}
      <div className="border-t border-neutral-100 pt-3 mt-auto flex justify-between items-center text-[11px] text-gray-400 font-medium">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px] font-semibold text-gray-400">{ticket.lastUpdate}</span>
        </div>

        {/* STATUS ACTIONS ON HOVER FOR CS */}
        {isCS && (
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" onClick={(e) => e.stopPropagation()}>
            {ticket.status === 'OPEN' && (
              <button 
                onClick={() => onUpdateStatus(ticket.id, 'IN-PROGRESS')}
                className="bg-neutral-900 border border-neutral-900 hover:bg-neutral-800 text-[#F5C518] text-[9.5px] font-black px-2.5 py-1.5 rounded-lg transition-all uppercase tracking-wider cursor-pointer active:scale-95 duration-100 flex items-center gap-1"
                title="Tindak lanjut ke In Progress"
              >
                <span>Kerjakan</span>
              </button>
            )}
            {ticket.status === 'IN-PROGRESS' && (
              <button 
                onClick={() => onUpdateStatus(ticket.id, 'RESOLVED')}
                className="bg-green-600 border border-green-600 hover:bg-green-700 text-white text-[9.5px] font-black px-2.5 py-1.5 rounded-lg transition-all uppercase tracking-wider cursor-pointer duration-100 flex items-center gap-1"
                title="Selesaikan"
              >
                <span>Resolve</span>
              </button>
            )}
            
            {/* Delete ticket button for CS only */}
            <button
              onClick={() => {
                if (confirm(`Hapus tiket ${ticket.id}?`)) {
                  onDelete(ticket.id);
                }
              }}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Hapus"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// HELPERS FOR BADGES / INDICATORS
// ==========================================
function getStatusIndicator(status: Ticket['status']) {
  if (status === 'OPEN') {
    return (
      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#F5C518]/10 text-[#E8A800] border border-[#F5C518]/20 flex items-center gap-1.5 w-fit select-none uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8A800]" />
        Open
      </span>
    );
  }
  if (status === 'IN-PROGRESS') {
    return (
      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-600 border border-blue-200/50 flex items-center gap-1.5 w-fit select-none uppercase tracking-wider animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        In Progress
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-green-50 text-green-700 border border-green-200/50 flex items-center gap-1.5 w-fit select-none uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
      Resolved
    </span>
  );
}

function getPriorityIndicator(priority: Ticket['priority']) {
  const p = priority.toLowerCase();
  if (p === 'high') {
    return (
      <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none tracking-wider">
        🔥 TINGGI
      </span>
    );
  }
  if (p === 'medium') {
    return (
      <span className="bg-amber-50 text-[#D97706] border border-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none tracking-wider">
        ⚡ SEDANG
      </span>
    );
  }
  return (
    <span className="bg-gray-50 text-gray-500 border border-gray-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none tracking-wider">
      🌱 RENDAH
    </span>
  );
}
