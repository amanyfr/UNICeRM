import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Inbox, 
  CheckCircle2, 
  Star, 
  RefreshCw, 
  UserPlus, 
  Bell, 
  Bot, 
  Download,
  Tag,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ticketAPI, customerAPI, feedbackAPI } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function Dashboard() {
  const navigate = useNavigate();

  // Ambil user dari auth context
  const { user: authUser } = useAuth();
  const user = authUser || { name: 'Admin UNICeRM', role: 'admin' };
  const role = user.role;

  // Indisponsible interactive actions and messages (toast)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (role === 'admin') {
    return (
      <DashboardLayout>
        <AdminDashboard user={user} showToast={showToast} />
        <ToastNotification toast={toast} />
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout>
        <CSDashboard user={user} showToast={showToast} />
        <ToastNotification toast={toast} />
      </DashboardLayout>
    );
  }
}

// ==========================================
// TOAST COMPONENT
// ==========================================
function ToastNotification({ toast }: { toast: { message: string; type: 'success' | 'info' } | null }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 text-white px-5 py-3 rounded-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center gap-3"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" />
          <span className="text-[13px] font-medium tracking-wide">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// ADMIN DASHBOARD
// ==========================================
function AdminDashboard({ user, showToast }: { user: any; showToast: (msg: string) => void }) {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'7D' | '30D' | '90D' | '6M'>('30D');

  // ─── Real stats dari backend ──────────────────────────────────────────────
  const [realStats, setRealStats] = useState({
    totalTickets:    0,
    openTickets:     0,
    resolvedTickets: 0,
    totalCustomers:  0,
    avgRating:       0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentTickets, setRecentTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ticketRes, customerRes, feedbackRes] = await Promise.all([
          ticketAPI.getAll(),
          customerAPI.getAll(),
          feedbackAPI.getStats(),
        ]);
        const tickets   = ticketRes.data?.data   ?? ticketRes.data   ?? [];
        const customers = customerRes.data?.data  ?? customerRes.data  ?? [];
        const stats     = feedbackRes.data?.data  ?? feedbackRes.data  ?? {};
        const ticketArr = Array.isArray(tickets) ? tickets : [];
        setRealStats({
          totalTickets:    ticketArr.length,
          openTickets:     ticketArr.filter((t: any) => t.status === 'open').length,
          resolvedTickets: ticketArr.filter((t: any) => t.status === 'resolved').length,
          totalCustomers:  Array.isArray(customers) ? customers.length : 0,
          avgRating:       stats.averageRating ?? 0,
        });

        // 5 tiket terbaru untuk tabel
        const latest5 = [...ticketArr]
          .sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5)
          .map((t: any) => ({
            id:       t.ticketNumber ?? `TKT-${String(t.id).padStart(3, '0')}`,
            customer: t.customerName ?? t.customer?.name ?? 'Customer',
            status:   t.status,
            priority: t.priority,
            date:     t.createdAt
              ? new Date(t.createdAt)
                  .toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
                  .replace(/\//g, '-')
              : '-',
          }));
        setRecentTickets(latest5);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  // Compute Indonesian date based on target format e.g. "Selasa, 26 Mei 2026"
  const getFormattedDate = () => {
    try {
      const today = new Date();
      return today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return "Jumat, 29 Mei 2026";
    }
  };
  const todayString = getFormattedDate();

  // Growth Data Chart mapped by period
  const growthData = {
    '7D': [
      { name: 'Sen', value: 12 },
      { name: 'Sel', value: 15 },
      { name: 'Rab', value: 14 },
      { name: 'Kam', value: 17 },
      { name: 'Jum', value: 16 },
      { name: 'Sab', value: 19 },
      { name: 'Min', value: 20 }
    ],
    '30D': [
      { name: 'Mgg 1', value: 8 },
      { name: 'Mgg 2', value: 12 },
      { name: 'Mgg 3', value: 15 },
      { name: 'Mgg 4', value: 20 }
    ],
    '90D': [
      { name: 'Maret', value: 10 },
      { name: 'April', value: 16 },
      { name: 'Mei', value: 20 }
    ],
    '6M': [
      { name: 'Jan', value: 5 },
      { name: 'Feb', value: 10 },
      { name: 'Mar', value: 12 },
      { name: 'Apr', value: 15 },
      { name: 'Mei', value: 18 },
      { name: 'Jun', value: 20 }
    ]
  };

  const segmentData = [
    { name: 'Prospek', value: 40, color: '#F59E0B' },
    { name: 'Aktif', value: 35, color: '#1A1A1A' },
    { name: 'VIP', value: 15, color: '#D1D5DB' },
    { name: 'Tidak Aktif', value: 10, color: '#FDE68A' }
  ];

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Laporan Dashboard UNICeRM', 14, 22);
    doc.setFontSize(11);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 14, 32);
    doc.setFontSize(13);
    doc.text('Ringkasan', 14, 45);
    autoTable(doc, {
      startY: 50,
      head: [['Metrik', 'Nilai']],
      body: [
        ['Total Pelanggan',  String(realStats.totalCustomers)],
        ['Total Tiket',      String(realStats.totalTickets)],
        ['Tiket Open',       String(realStats.openTickets)],
        ['Tiket Resolved',   String(realStats.resolvedTickets)],
        ['Skor CSAT',        realStats.avgRating.toFixed(1) + '/5'],
      ],
    });
    const afterSummary = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.text('Tiket Terbaru', 14, afterSummary);
    autoTable(doc, {
      startY: afterSummary + 5,
      head: [['ID Tiket', 'Customer', 'Status', 'Prioritas', 'Tanggal']],
      body: recentTickets.map((t: any) => [t.id, t.customer, t.status, t.priority, t.date]),
    });
    doc.save('laporan-dashboard-unicerm.pdf');
    showToast('Laporan PDF berhasil diunduh!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A1A] leading-tight">
            Selamat pagi, {user.name}!
          </h1>
          <p className="text-[14px] text-gray-500 mt-1">
            {todayString}
          </p>
        </div>

        {/* PERIOD FILTER & DOWNLOAD */}
        <div className="flex items-center gap-3">
          <div className="flex bg-white/60 backdrop-blur-md border border-white/70 p-1 rounded-xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]">
            {(['7D', '30D', '90D', '6M'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all duration-200 ${
                  period === p 
                    ? 'bg-[#F59E0B]/90 backdrop-blur-sm text-[#1A1A1A] shadow-[0_4px_14px_rgba(245,158,11,0.30),inset_0_1px_0_rgba(255,255,255,0.25)]' 
                    : 'text-gray-500 hover:text-[#1A1A1A]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/70 text-gray-600 hover:bg-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all duration-200 rounded-xl px-4 py-2 cursor-pointer"
          >
            <Download className="w-[16px] h-[16px] text-gray-500" />
            <span className="text-[13px] font-medium">Laporan</span>
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {/* Card 1 — TOTAL PELANGGAN (AMBER) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-amber-50/90 to-amber-100/60 border-amber-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-[#F59E0B]">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              +4%
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">{loadingStats ? '…' : realStats.totalCustomers}</div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">TOTAL PELANGGAN</span>
          </div>
        </div>

        {/* Card 2 — TIKET AKTIF (AMBER) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-amber-50/90 to-amber-100/60 border-amber-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-[#F59E0B]">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              -2
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">{loadingStats ? '…' : realStats.openTickets}</div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">TIKET AKTIF</span>
          </div>
        </div>

        {/* Card 3 — TINGKAT RESOLUSI (GREEN) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-green-50/90 to-emerald-100/60 border-green-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              +2.1%
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">
              {loadingStats ? '…' : realStats.totalTickets > 0
                ? `${Math.round((realStats.resolvedTickets / realStats.totalTickets) * 100)}%`
                : '0%'}
            </div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">TINGKAT RESOLUSI</span>
          </div>
        </div>

        {/* Card 4 — SKOR CSAT (BLUE) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-blue-50/90 to-sky-100/60 border-blue-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-blue-500">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              +0.3
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">{loadingStats ? '…' : realStats.avgRating.toFixed(1)}<span className="text-[16px] text-gray-500 font-bold ml-1">/5</span></div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">SKOR CSAT</span>
          </div>
        </div>

        {/* Card 5 — PELANGGAN BARU (GRAY) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-gray-50/90 to-gray-100/70 border-gray-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-gray-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              +periode ini
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">0</div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">PELANGGAN BARU</span>
          </div>
        </div>

        {/* Card 6 — NOTIFIKASI (AMBER) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-amber-50/90 to-amber-100/60 border-amber-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-[#F59E0B]">
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              belum dibaca
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">5</div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">NOTIFIKASI</span>
          </div>
        </div>
      </div>

      {/* SECTION GRAPHICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Kolom 1+2 (col-span-2) — Grafik Pertumbuhan Pelanggan */}
        <div className="lg:col-span-2 rounded-[20px] p-6 bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-[#1A1A1A] tracking-tight">Pertumbuhan Pelanggan</h2>
            <span className="text-[11px] font-bold text-gray-400 bg-white/50 backdrop-blur-sm border border-white/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Periode {period}
            </span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData[period]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(0,0,0,0.04)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#9CA3AF' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#9CA3AF' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255,255,255,0.85)', 
                    backdropFilter:'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.6)', 
                    borderRadius: '14px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    fontSize: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#F59E0B" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#FFFFFF', stroke: '#F59E0B', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#F59E0B', stroke: '#FFFFFF', strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kolom 3 — Segmentasi Pelanggan */}
        <div className="rounded-[20px] p-6 bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[#1A1A1A] tracking-tight mb-4">Segmentasi</h2>
          </div>
          
          <div className="h-[200px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {segmentData.map((s, index) => (
                    <Cell key={`cell-${index}`} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255,255,255,0.85)', 
                    backdropFilter:'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.6)', 
                    borderRadius: '14px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    fontSize: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
              <span className="text-[26px] font-bold text-[#1A1A1A] leading-none">20</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Total</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100/60">
            {segmentData.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[12px] text-gray-500 truncate">{s.name}</span>
                <span className="text-[12px] font-bold text-[#1A1A1A] ml-auto">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION TABEL TIKET TERBARU */}
      <div className="rounded-[20px] overflow-hidden bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mt-6">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100/60 bg-white/40 backdrop-blur-sm">
          <h2 className="text-[16px] font-bold text-[#1A1A1A] tracking-tight">Tiket Terbaru</h2>
          <Link 
            to="/tickets" 
            className="text-[13px] font-semibold text-[#F59E0B] hover:underline flex items-center gap-1"
          >
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/50 backdrop-blur-sm border-b border-gray-100/80">
              <tr>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-400/70 uppercase tracking-[0.08em]">ID Tiket</th>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-400/70 uppercase tracking-[0.08em]">Customer</th>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-400/70 uppercase tracking-[0.08em]">Status</th>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-400/70 uppercase tracking-[0.08em]">Prioritas</th>
                <th className="py-3 px-6 text-[11px] font-bold text-gray-400/70 uppercase tracking-[0.08em] text-right">Tanggal Pembuatan</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((t) => (
                <tr key={t.id} className="border-b border-gray-100/60 hover:bg-white/50 transition-colors duration-150">
                  <td className="py-4 px-6 text-[13px] text-[#1A1A1A] font-bold">{t.id}</td>
                  <td className="py-4 px-6 text-[13px] text-[#1A1A1A] font-medium">{t.customer}</td>
                  <td className="py-4 px-6">{getStatusBadge(t.status)}</td>
                  <td className="py-4 px-6">{getPriorityBadge(t.priority)}</td>
                  <td className="py-4 px-6 text-[13px] text-[#1A1A1A] text-right font-mono">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CS / AGENT DASHBOARD
// ==========================================
interface CSTicket {
  id: string;
  title: string;
  customer: string;
  status: string;
}

interface HandoffItem {
  id: string;
  customer: string;
  message: string;
  time: string;
}

function CSDashboard({ user, showToast }: { user: any; showToast: (msg: string) => void }) {
  const navigate = useNavigate();

  // ─── Real stats untuk CS ──────────────────────────────────────────────────
  const [csStats, setCsStats] = useState({
    openTickets:       0,
    inProgressTickets: 0,
    resolvedTickets:   0,
    avgRating:         0,
  });
  const [loadingCsStats, setLoadingCsStats] = useState(true);

  useEffect(() => {
    const fetchCsStats = async () => {
      try {
        const ticketRes = await ticketAPI.getAll();
        const tickets   = ticketRes.data?.data ?? ticketRes.data ?? [];
        const arr       = Array.isArray(tickets) ? tickets : [];
        setCsStats({
          openTickets:       arr.filter((t: any) => t.status === 'open').length,
          inProgressTickets: arr.filter((t: any) => t.status === 'in-progress' || t.status === 'in_progress').length,
          resolvedTickets:   arr.filter((t: any) => t.status === 'resolved').length,
          avgRating:         0, // belum ada endpoint CS-specific rating
        });

        // Tiket yang perlu ditangani CS (open + in-progress, maks 5)
        const needsHandling = arr
          .filter((t: any) => t.status === 'open' || t.status === 'in-progress')
          .slice(0, 5)
          .map((t: any) => ({
            id:        t.ticketNumber ?? `TKT-${String(t.id).padStart(3, '0')}`,
            customer:  t.customerName ?? t.customer?.name ?? 'Customer',
            title:     t.title ?? '',
            status:    t.status,
            backendId: t.id,
          }));
        setCsTickets(needsHandling);
      } catch (err) {
        console.error('Failed to fetch CS stats:', err);
      } finally {
        setLoadingCsStats(false);
      }
    };
    fetchCsStats();
  }, []);

  // Initial tickets for CS/Agent View — diisi dari backend
  const [csTickets, setCsTickets] = useState<any[]>([]);

  // Handoff dari chatbot — belum ada endpoint, kosong untuk sekarang
  const [handoffs, setHandoffs] = useState<any[]>([]);

  const handleTanganiTicket = (ticketId: string, title: string) => {
    setCsTickets(prev => prev.filter(t => t.id !== ticketId));
    showToast(`Tiket ${ticketId} ("${title}") mulai Anda tangani!`);
  };

  const handleTanganiHandoff = (handoffId: string, customer: string) => {
    setHandoffs(prev => prev.filter(h => h.id !== handoffId));
    showToast(`Handoff dikoordinasikan. Anda terhubung dengan ${customer}!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div>
        <h1 className="text-[28px] font-bold text-[#1A1A1A]">
          Halo, {user.name}!
        </h1>
        <p className="text-[14px] text-gray-500 mt-1">
          Pantau tiket dan pelanggan yang perlu ditangani.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Card 1 — TIKET OPEN (AMBER) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-amber-50/90 to-amber-100/60 border-amber-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-[#F59E0B]">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              hari ini
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">{loadingCsStats ? '…' : csStats.openTickets}</div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">TIKET OPEN</span>
          </div>
        </div>

        {/* Card 2 — IN PROGRESS (BLUE) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-blue-50/90 to-sky-100/60 border-blue-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-blue-500">
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              aktif
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">{loadingCsStats ? '…' : csStats.inProgressTickets}</div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">IN PROGRESS</span>
          </div>
        </div>

        {/* Card 3 — DISELESAIKAN (GREEN) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-green-50/90 to-emerald-100/60 border-green-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              +hari ini
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">{loadingCsStats ? '…' : csStats.resolvedTickets}</div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">DISELESAIKAN</span>
          </div>
        </div>

        {/* Card 4 — CSAT RATA-RATA (BLUE) */}
        <div className="rounded-[20px] p-5 backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 bg-gradient-to-br from-blue-50/90 to-sky-100/60 border-blue-200/50 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3 w-full">
            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-blue-500">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center select-none">
              30 hari
            </span>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">{loadingCsStats ? '…' : csStats.avgRating > 0 ? csStats.avgRating.toFixed(1) : '–'}<span className="text-[16px] text-gray-500 font-bold ml-1">/5</span></div>
            <span className="text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.08em] mt-1 block">CSAT RATA-RATA</span>
          </div>
        </div>
      </div>

      {/* SECTION LOWER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Kiri — Tiket Perlu Ditangani */}
        <div className="rounded-[20px] p-6 bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col">
          <h2 className="text-[16px] font-bold text-[#1A1A1A] tracking-tight mb-4">Tiket Perlu Ditangani</h2>
          
          <div className="flex-1 divide-y divide-gray-100/60 max-h-[360px] overflow-y-auto pr-1">
            {csTickets.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400 text-center">
                <CheckCircle2 className="w-10 h-10 text-green-500 mb-2" />
                <p className="text-[13px] font-medium">Semua tiket teralokasi dengan lancar!</p>
              </div>
            ) : (
              csTickets.map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold text-gray-400 bg-white/60 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">{t.id}</span>
                      <span className="text-[11px] text-gray-500 font-semibold truncate max-w-[120px]">{t.customer}</span>
                    </div>
                    <p className="text-[13px] font-bold text-[#1A1A1A] truncate">{t.title}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(t.status)}
                    <button
                      onClick={() => navigate('/tickets')}
                      className="bg-[#1A1A1A]/90 backdrop-blur-sm hover:bg-[#1A1A1A] text-white shadow-[0_4px_14px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] active:scale-[0.98] transition-all duration-200 text-[12px] font-bold px-3 py-1.5 rounded-lg cursor-pointer flex-shrink-0"
                    >
                      Tangani
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kanan — Chatbot Handoff Terbaru */}
        <div className="rounded-[20px] p-6 bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[16px] font-bold text-[#1A1A1A] tracking-tight">Handoff dari Chatbot</h2>
            {handoffs.length > 0 && (
              <span className="bg-red-50/80 backdrop-blur-sm border border-red-200/60 text-red-600 shadow-[0_1px_4px_rgba(0,0,0,0.06)] font-bold rounded-full px-2 py-0.5 text-[11px] animate-pulse">
                {handoffs.length}
              </span>
            )}
          </div>

          <div className="flex-1 divide-y divide-gray-100/60 max-h-[360px] overflow-y-auto pr-1">
            {handoffs.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400 text-center">
                <span className="w-10 h-10 bg-white/60 backdrop-blur-sm border border-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.06)] rounded-[14px] flex items-center justify-center mb-2">
                  <Bot className="w-5 h-5 text-gray-400" />
                </span>
                <p className="text-[13px] font-medium">Belum ada permintaan handoff baru.</p>
              </div>
            ) : (
              handoffs.map((h) => (
                <div key={h.id} className="py-3 flex gap-3 items-center justify-between">
                  <div className="flex gap-3 items-center min-w-0 flex-1">
                    <div className="w-[32px] h-[32px] rounded-full bg-white/70 backdrop-blur-sm border border-white/80 shadow-[0_2px_6px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#F59E0B] flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px] text-[#1A1A1A] truncate">{h.customer}</span>
                        <span className="text-[10px] text-gray-400 flex-shrink-0">{h.time}</span>
                      </div>
                      <p className="text-[12px] text-gray-500 truncate mt-0.5">{h.message}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleTanganiHandoff(h.id, h.customer)}
                      className="bg-[#F59E0B]/90 backdrop-blur-sm hover:bg-[#D97706]/95 text-[#1A1A1A] shadow-[0_4px_14px_rgba(245,158,11,0.30),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.35)] active:scale-[0.98] transition-all duration-200 text-[12px] font-bold px-3 py-1.5 rounded-lg cursor-pointer flex-shrink-0"
                    >
                      Tangani
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// STATUS BADGES HELPERS
// ==========================================
function getStatusBadge(status: string) {
  const currentStatus = status.toLowerCase();
  
  if (currentStatus === 'open') {
    return (
      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEF3C7]/80 backdrop-blur-sm border border-[#F59E0B]/40 text-[#D97706] flex items-center gap-1.5 w-fit shadow-[0_1px_6px_rgba(245,158,11,0.15)] uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Open
      </span>
    );
  }
  
  if (currentStatus === 'in-progress' || currentStatus === 'in_progress' || currentStatus === 'in progress') {
    return (
      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50/80 backdrop-blur-sm border border-blue-200/60 text-blue-600 flex items-center gap-1.5 w-fit shadow-[0_1px_4px_rgba(0,0,0,0.06)] uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" style={{ animationDuration: '3s' }} />
        In Progress
      </span>
    );
  }
  
  if (currentStatus === 'resolved') {
    return (
      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50/80 backdrop-blur-sm border border-green-200/60 text-green-700 flex items-center gap-1.5 w-fit shadow-[0_1px_4px_rgba(0,0,0,0.06)] uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Resolved
      </span>
    );
  }
  
  return (
    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/70 backdrop-blur-sm border border-gray-200/80 text-gray-600 flex items-center gap-1.5 w-fit shadow-[0_1px_4px_rgba(0,0,0,0.06)] uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      Closed
    </span>
  );
}

function getPriorityBadge(priority: string) {
  const p = priority.toLowerCase();
  if (p === 'urgent' || p === 'high') {
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/70 backdrop-blur-sm border border-red-200/80 text-red-600 shadow-[0_1px_4px_rgba(0,0,0,0.06)] uppercase tracking-wider">
        Tinggi
      </span>
    );
  }
  if (p === 'medium') {
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FEF3C7]/80 backdrop-blur-sm border border-[#F59E0B]/40 text-[#D97706] shadow-[0_1px_6px_rgba(245,158,11,0.15)] uppercase tracking-wider">
        Sedang
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/70 backdrop-blur-sm border border-gray-200/80 text-gray-500 shadow-[0_1px_4px_rgba(0,0,0,0.06)] uppercase tracking-wider">
      Rendah
    </span>
  );
}
