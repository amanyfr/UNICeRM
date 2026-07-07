'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Inbox, 
  Star, 
  Tag, 
  ArrowRight,
  BookOpen,
  Ticket,
  HelpCircle,
  Plus,
  FileText,
  CheckCircle2,
  MessageCircle,
  MessageSquare,
  Slash,
  TicketCheck,
  Lightbulb,
  StarHalf,
  PenLine,
  Send,
  Clock,
  UserCircle,
  Info,
  ChevronDown,
  X
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { useAuth } from '../../hooks/useAuth';
import { ticketAPI, voucherAPI } from '../../lib/api';

const CHAPTERS = [
  { id:0, icon: Ticket,        label:'Tiket' },
  { id:1, icon: Bot,           label:'Chatbot' },
  { id:2, icon: Star,          label:'Feedback' },
  { id:3, icon: HelpCircle,    label:'Umum' },
];

const TIKET_STEPS = [
  {
    step: 1,
    title: 'Buka halaman Tiket',
    desc: 'Klik menu "TIKET" di navbar atas atau tombol "Buat Tiket" di beranda.',
    icon: Ticket,
    color: { bg:'rgba(59,130,246,0.10)', 
             border:'rgba(59,130,246,0.22)', 
             icon:'#3B82F6' },
  },
  {
    step: 2,
    title: 'Klik "Buat Tiket Baru"',
    desc: 'Tekan tombol "+ Buat Tiket Baru" di pojok kanan atas halaman tiket.',
    icon: Plus,
    color: { bg:'rgba(245,159,11,0.10)',
             border:'rgba(245,159,11,0.25)',
             icon:'#F59E0B' },
  },
  {
    step: 3,
    title: 'Isi detail masalah',
    desc: 'Masukkan judul masalah dan deskripsi lengkap. Semakin detail, semakin cepat ditangani.',
    icon: FileText,
    color: { bg:'rgba(139,92,246,0.10)',
             border:'rgba(139,92,246,0.22)',
             icon:'#8B5CF6' },
  },
  {
    step: 4,
    title: 'Pantau status tiket',
    desc: 'Tiket yang sudah dibuat bisa dipantau statusnya: OPEN → IN PROGRESS → RESOLVED.',
    icon: CheckCircle2,
    color: { bg:'rgba(34,197,94,0.10)',
             border:'rgba(34,197,94,0.22)',
             icon:'#22C55E' },
  },
];

const CHATBOT_STEPS = [
  {
    step: 1,
    title: 'Buka halaman Chat',
    desc: 'Klik menu "CHAT" di navbar atau tombol "Chat AI" di beranda.',
    icon: MessageCircle,
    color: { bg:'rgba(245,159,11,0.10)',
             border:'rgba(245,159,11,0.25)',
             icon:'#F59E0B' },
  },
  {
    step: 2,
    title: 'Ketik pertanyaan Anda',
    desc: 'Tulis pertanyaan di kotak chat. Gunakan bahasa natural, UNI Assistant akan memahami.',
    icon: MessageSquare,
    color: { bg:'rgba(59,130,246,0.10)',
             border:'rgba(59,130,246,0.22)',
             icon:'#3B82F6' },
  },
  {
    step: 3,
    title: 'Gunakan perintah /help',
    desc: 'Ketik atau klik tombol "/help" di bawah chat untuk langsung terhubung ke CS kami.',
    icon: Slash,
    color: { bg:'rgba(139,92,246,0.10)',
             border:'rgba(139,92,246,0.22)',
             icon:'#8B5CF6' },
  },
  {
    step: 4,
    title: 'Buat tiket konsultasi',
    desc: 'Jika pertanyaan tidak terjawab, bot akan bantu buatkan tiket untuk ditangani CS.',
    icon: TicketCheck,
    color: { bg:'rgba(34,197,94,0.10)',
             border:'rgba(34,197,94,0.22)',
             icon:'#22C55E' },
  },
];

const FEEDBACK_STEPS = [
  {
    step: 1,
    title: 'Selesaikan tiket terlebih dahulu',
    desc: 'Feedback hanya bisa diberikan setelah tiket layanan berstatus RESOLVED.',
    icon: CheckCircle2,
    color: { bg:'rgba(34,197,94,0.10)',
             border:'rgba(34,197,94,0.22)',
             icon:'#22C55E' },
  },
  {
    step: 2,
    title: 'Buka halaman Feedback',
    desc: 'Klik menu "FEEDBACK" di navbar. Tiket yang sudah selesai akan muncul di sini.',
    icon: Star,
    color: { bg:'rgba(245,159,11,0.10)',
             border:'rgba(245,159,11,0.25)',
             icon:'#F59E0B' },
  },
  {
    step: 3,
    title: 'Pilih rating bintang',
    desc: 'Klik bintang 1–5 untuk memberikan penilaian. Bintang 5 = Sangat Puas.',
    icon: StarHalf,
    color: { bg:'rgba(245,159,11,0.10)',
             border:'rgba(245,159,11,0.25)',
             icon:'#F59E0B' },
  },
  {
    step: 4,
    title: 'Tulis komentar (opsional)',
    desc: 'Tambahkan komentar untuk membantu kami meningkatkan kualitas layanan.',
    icon: PenLine,
    color: { bg:'rgba(59,130,246,0.10)',
             border:'rgba(59,130,246,0.22)',
             icon:'#3B82F6' },
  },
  {
    step: 5,
    title: 'Kirim feedback',
    desc: 'Klik tombol "Kirim Feedback". Rating Anda sangat berarti bagi kami!',
    icon: Send,
    color: { bg:'rgba(139,92,246,0.10)',
             border:'rgba(139,92,246,0.22)',
             icon:'#8B5CF6' },
  },
];

const FAQ_ITEMS = [
  {
    q: 'Apa itu UNICeRM?',
    a: 'UNICeRM adalah platform Customer Relationship Management khusus untuk layanan Uni Inside Media. Anda bisa menghubungi CS, membuat tiket masalah, dan mendapat bantuan AI 24/7.',
    icon: HelpCircle,
  },
  {
    q: 'Bagaimana cara menggunakan voucher?',
    a: 'Buka menu Voucher di navbar, pilih voucher yang tersedia, dan klik tombol "Klaim Voucher". Voucher hanya bisa diklaim 1x dan langsung tersimpan ke akun Anda.',
    icon: Tag,
  },
  {
    q: 'Berapa lama tiket saya diproses?',
    a: 'Tim CS kami berusaha merespons setiap tiket dalam 1×24 jam. Tiket dengan prioritas High/Urgent akan ditangani lebih cepat.',
    icon: Clock,
  },
  {
    q: 'Bagaimana cara edit profil saya?',
    a: 'Klik nama atau avatar Anda di kanan atas navbar, lalu pilih menu Profil. Anda bisa mengubah nama dan nomor telepon.',
    icon: UserCircle,
  },
  {
    q: 'Apa yang dimaksud status tiket?',
    a: 'OPEN = tiket baru diterima. IN PROGRESS = sedang dikerjakan CS. RESOLVED = masalah telah selesai ditangani.',
    icon: Info,
  },
]

export default function PortalHome() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [hasOpened, setHasOpened] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('uniGuideOpened') === 'true'
      : true
  );

  const [openFaq, setOpenFaq] = useState<number|null>(null);

  // State untuk data dari backend
  const [stats, setStats] = useState({
    totalTickets: 0,
    activeTickets: 0,
    resolvedTickets: 0,
    availableVouchers: 0
  });
  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data saat mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch tiket (independent)
        try {
          const ticketRes = await ticketAPI.getAll();
          const tickets = ticketRes.data?.data || ticketRes.data || [];
          const ticketArr = Array.isArray(tickets) ? tickets : [];
          
          const active = ticketArr.filter((t: any) => 
            t.status === 'open' || t.status === 'in-progress').length;
          const resolved = ticketArr.filter((t: any) => 
            t.status === 'resolved').length;
          const recent = ticketArr
            .sort((a: any, b: any) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3);
          
          setStats(prev => ({ 
            ...prev, 
            totalTickets: ticketArr.length,
            activeTickets: active,
            resolvedTickets: resolved
          }));
          setRecentTickets(recent);
        } catch (err) {
          console.error('Failed to fetch tickets:', err);
        }

        // Fetch voucher (independent)
        try {
          const voucherRes = await voucherAPI.getAll();
          const vouchers = voucherRes.data?.data || voucherRes.data || [];
          const voucherArr = Array.isArray(vouchers) ? vouchers : [];
          const available = voucherArr.filter((v: any) => 
            v.isActive && !v.isClaimed).length;
          setStats(prev => ({ ...prev, availableVouchers: available }));
        } catch (err) {
          console.error('Failed to fetch vouchers:', err);
        }

      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Ambil user dari auth context
  const { user: authUser } = useAuth();
  const name    = authUser?.name || 'Customer';
  const initial = name.charAt(0).toUpperCase();

  const handleOpenGuide = () => {
    setIsGuideOpen(true);
    setHasOpened(true);
    localStorage.setItem('uniGuideOpened', 'true');
  }

  // Loading spinner
  if (loading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
            <p className="text-sm font-bold text-neutral-600">Memuat portal...</p>
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div 
        className="w-full px-4 py-6 sm:px-6 md:px-8 md:py-8"
        style={{
          background: `
            radial-gradient(ellipse 70% 40% at 15% 5%,
              rgba(245,197,24,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 85% 90%,
              rgba(245,159,11,0.08) 0%, transparent 50%),
            linear-gradient(160deg,#FDFCF8 0%,
              #FAF7EF 50%,#FDFAF3 100%)
          `,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-5xl mx-auto space-y-8">

          {/* SECTION 1 — GREETING CARD */}
          <div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.6)',
              borderRadius: 28,
              boxShadow: `
                0 10px 40px -10px rgba(245,159,11,0.1),
                0 4px 12px -2px rgba(0,0,0,0.05),
                inset 0 1px 1px rgba(255,255,255,0.9)
              `,
            }}
          >
            <div className="flex flex-row items-center gap-5 w-full">
              {/* Avatar */}
              <div 
                style={{
                  width: 64, 
                  height: 64, 
                  borderRadius: 20,
                  background: 'linear-gradient(135deg,#F59E0B,#F5C518)',
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(245,159,11,0.5)',
                  flexShrink: 0,
                }}
              >
                <span className="text-2xl font-black text-[#1A1A1A]">
                  {initial}
                </span>
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] leading-tight mb-1.5 tracking-tight">
                  Halo, {name}!
                </h2>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-3">
                  Selamat datang di Portal Layanan Uni Inside Media.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <span 
                    style={{ 
                      fontSize: 11, 
                      fontWeight: 700,
                      padding: '4px 12px', 
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Customer
                  </span>
                  <span 
                    style={{ 
                      fontSize: 11, 
                      fontWeight: 700,
                      padding: '4px 12px', 
                      borderRadius: 10,
                      background: 'rgba(34,197,94,0.15)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      color: '#15803d',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Status: Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2 — QUICK ACTION CARDS */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          >
            
            {/* CARD 1 — CHAT AI (hitam — tetap dark) */}
            <div 
              onClick={() => navigate('/portal/chat')}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'linear-gradient(145deg,#1A1A1A,#2A2A2A)',
                borderRadius: 24, 
                padding: '24px 22px',
                cursor: 'pointer',
                border: '1px solid rgba(245,197,24,0.1)',
                boxShadow: hoveredCard === 0 
                  ? '0 20px 40px -10px rgba(0,0,0,0.3)' 
                  : `
                    0 10px 30px -10px rgba(0,0,0,0.2),
                    inset 0 1px 0 rgba(255,255,255,0.08)
                  `,
                transform: hoveredCard === 0 ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div>
                <div 
                  style={{
                    width: 48, 
                    height: 48, 
                    borderRadius: 16,
                    background: 'linear-gradient(135deg,#F59E0B,#F5C518)',
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px -4px rgba(245,159,11,0.3)',
                    marginBottom: 16,
                  }}
                >
                  <Bot style={{ width: 24, height: 24 }} color="#1A1A1A" />
                </div>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 2 }}>
                    Chat AI
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                    Tanya asisten kami
                  </p>
                </div>
              </div>
              <span 
                style={{
                  fontSize: 13, 
                  fontWeight: 700, 
                  color: '#F59E0B',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                }}
              >
                Mulai Chat <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* CARD 2 — BUAT TIKET (glass) */}
            <div 
              onClick={() => navigate('/portal/my-tickets')}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
                backdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: 24, 
                padding: '24px 22px',
                cursor: 'pointer',
                boxShadow: hoveredCard === 1 
                  ? '0 20px 40px -10px rgba(245,159,11,0.15)' 
                  : `
                    0 10px 30px -10px rgba(0,0,0,0.05),
                    inset 0 1px 0 rgba(255,255,255,0.9)
                  `,
                transform: hoveredCard === 1 ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div>
                <div 
                  style={{
                    width: 48, 
                    height: 48, 
                    borderRadius: 16,
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Inbox style={{ width: 24, height: 24 }} color="#3B82F6" />
                </div>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', marginBottom: 2 }}>
                    Buat Tiket
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(26,26,26,0.5)' }}>
                    Laporkan masalah
                  </p>
                </div>
              </div>
              <span 
                style={{
                  fontSize: 13, 
                  fontWeight: 700,
                  color: hoveredCard === 1 ? '#F59E0B' : '#999',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                  transition: 'all 0.2s ease',
                }}
              >
                Ke Tiket <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* CARD 3 — FEEDBACK (glass) */}
            <div 
              onClick={() => navigate('/portal/feedback')}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
                backdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: 24, 
                padding: '24px 22px',
                cursor: 'pointer',
                boxShadow: hoveredCard === 2 
                  ? '0 20px 40px -10px rgba(245,159,11,0.15)' 
                  : `
                    0 10px 30px -10px rgba(0,0,0,0.05),
                    inset 0 1px 0 rgba(255,255,255,0.9)
                  `,
                transform: hoveredCard === 2 ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div>
                <div 
                  style={{
                    width: 48, 
                    height: 48, 
                    borderRadius: 16,
                    background: 'rgba(245,159,11,0.1)',
                    border: '1px solid rgba(245,159,11,0.2)',
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Star style={{ width: 24, height: 24 }} color="#F59E0B" />
                </div>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', marginBottom: 2 }}>
                    Feedback
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(26,26,26,0.5)' }}>
                    Beri rating layanan
                  </p>
                </div>
              </div>
              <span 
                style={{
                  fontSize: 13, 
                  fontWeight: 700,
                  color: hoveredCard === 2 ? '#F59E0B' : '#999',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                  transition: 'all 0.2s ease',
                }}
              >
                Nilai Layanan <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* CARD 4 — VOUCHER (glass) */}
            <div 
              onClick={() => navigate('/portal/vouchers')}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
                backdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: 24, 
                padding: '24px 22px',
                cursor: 'pointer',
                boxShadow: hoveredCard === 3 
                  ? '0 20px 40px -10px rgba(245,159,11,0.15)' 
                  : `
                    0 10px 30px -10px rgba(0,0,0,0.05),
                    inset 0 1px 0 rgba(255,255,255,0.9)
                  `,
                transform: hoveredCard === 3 ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div>
                <div 
                  style={{
                    width: 48, 
                    height: 48, 
                    borderRadius: 16,
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Tag style={{ width: 24, height: 24 }} color="#22C55E" />
                </div>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', marginBottom: 2 }}>
                    Voucher
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(26,26,26,0.5)' }}>
                    Cek promo aktif
                  </p>
                </div>
              </div>
              <span 
                style={{
                  fontSize: 13, 
                  fontWeight: 700,
                  color: hoveredCard === 3 ? '#F59E0B' : '#999',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                  transition: 'all 0.2s ease',
                }}
              >
                Lihat Promo <ArrowRight className="w-4 h-4" />
              </span>
            </div>

          </div>

        </div>

        {/* --- UNI GUIDE WIDGET --- */}
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999 }}>
          {/* Desktop Button (>= 768px) */}
          <button 
            onClick={handleOpenGuide}
            className="hidden md:flex items-center gap-3 p-[12px_18px_12px_12px] bg-[#1A1A1A] border-none rounded-[18px] cursor-pointer transition-all duration-200 shadow-[0_8px_28px_rgba(0,0,0,0.22),0_3px_10px_rgba(0,0,0,0.14)] hover:translate-y-[-2px] hover:shadow-[0_14px_36px_rgba(0,0,0,0.26),0_4px_14px_rgba(245,159,11,0.18)] active:scale-[0.97]"
          >
            <div style={{ width: 42, height: 42, borderRadius: 13, background: 'linear-gradient(135deg, #F59E0B, #F5C518)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 10px rgba(245,159,11,0.40)' }}>
              <BookOpen style={{ width: 22, height: 22, color: '#1A1A1A' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: 'white', lineHeight: 1, margin: 0 }}>Uni Guide</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.50)', lineHeight: 1, margin: 0 }}>Buku Bantuan</p>
            </div>
            {!hasOpened && (
              <div style={{ position: 'absolute', top: -5, right: -5, width: 13, height: 13, borderRadius: '50%', background: '#EF4444', border: '2.5px solid white', boxShadow: '0 2px 6px rgba(239,68,68,0.45)' }} />
            )}
          </button>

          {/* Mobile Button (< 768px) */}
          <button 
            onClick={handleOpenGuide}
            className="flex md:hidden items-center justify-center w-[52px] h-[52px] bg-[#1A1A1A] border-none rounded-[16px] cursor-pointer transition-all duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.20)]"
          >
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'linear-gradient(135deg,#F59E0B,#F5C518)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen className="w-5 h-5" style={{ color: '#1A1A1A' }} />
            </div>
            {!hasOpened && (
              <div style={{ position: 'absolute', top: -5, right: -5, width: 13, height: 13, borderRadius: '50%', background: '#EF4444', border: '2.5px solid white', boxShadow: '0 2px 6px rgba(239,68,68,0.45)' }} />
            )}
          </button>
        </div>
        
        {/* --- POPUP UNI GUIDE --- */}
        <div onClick={() => setIsGuideOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', opacity: isGuideOpen ? 1 : 0, pointerEvents: isGuideOpen ? 'auto' : 'none', transition: 'opacity 0.25s ease' }} />

        <div style={{ position: 'fixed', bottom: 80, right: 10, left: 10, zIndex: 101, maxHeight: '80vh', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(48px) saturate(200%)', WebkitBackdropFilter: 'blur(48px) saturate(200%)', border: '0.5px solid rgba(255,255,255,0.85)', borderRadius: 24, boxShadow: `0 32px 80px rgba(0,0,0,0.16),0 8px 24px rgba(245,159,11,0.08),inset 0 1px 0 rgba(255,255,255,0.95)`, overflow: 'hidden', transform: isGuideOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)', opacity: isGuideOpen ? 1 : 0, pointerEvents: isGuideOpen ? 'auto' : 'none', transition: 'all 0.30s cubic-bezier(0.32,0.72,0,1)', transformOrigin: 'bottom' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 16px', background: 'linear-gradient(135deg,#1A1A1A,#2A2A2A)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,#F59E0B,#F5C518)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen className="w-5 h-5" style={{ color:'#1A1A1A' }} />
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>Uni Guide</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>Panduan lengkap menggunakan UNICeRM</p>
              </div>
            </div>
            <button onClick={() => setIsGuideOpen(false)} style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,0.10)', border: '0.5px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s ease' }}>
              <X className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.70)' }} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 4, padding: '12px 16px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', overflowX: 'auto', flexShrink: 0 }}>
            {CHAPTERS.map(ch => (
              <button key={ch.id} onClick={() => setActiveChapter(ch.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px 10px', borderRadius: '12px 12px 0 0', border: 'none', cursor: 'pointer', transition: 'all 0.15s ease', flexShrink: 0, fontSize: 13, fontWeight: 600, background: activeChapter === ch.id ? 'white' : 'transparent', color: activeChapter === ch.id ? '#1A1A1A' : 'rgba(26,26,26,0.45)', borderBottom: activeChapter === ch.id ? '2.5px solid #F59E0B' : '2.5px solid transparent', marginBottom: -1 }}>
                <ch.icon className="w-4 h-4" /> {ch.label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {activeChapter === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Cara Membuat & Mengelola Tiket</p>
                {TIKET_STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', background: 'rgba(255,255,255,0.80)', backdropFilter: 'blur(8px)', border: `0.5px solid ${s.color.border}`, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: s.color.bg, border: `0.5px solid ${s.color.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color.icon }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(26,26,26,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Langkah {s.step}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{s.title}</p>
                      <p style={{ fontSize: 12, color: 'rgba(26,26,26,0.55)', lineHeight: 1.5 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeChapter === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Panduan Chatbot</p>
                {CHATBOT_STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', background: 'rgba(255,255,255,0.80)', backdropFilter: 'blur(8px)', border: `0.5px solid ${s.color.border}`, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: s.color.bg, border: `0.5px solid ${s.color.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color.icon }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(26,26,26,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Langkah {s.step}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{s.title}</p>
                      <p style={{ fontSize: 12, color: 'rgba(26,26,26,0.55)', lineHeight: 1.5 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeChapter === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Cara Memberi Feedback</p>
                {FEEDBACK_STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', background: 'rgba(255,255,255,0.80)', backdropFilter: 'blur(8px)', border: `0.5px solid ${s.color.border}`, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: s.color.bg, border: `0.5px solid ${s.color.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color.icon }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(26,26,26,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Langkah {s.step}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{s.title}</p>
                      <p style={{ fontSize: 12, color: 'rgba(26,26,26,0.55)', lineHeight: 1.5 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeChapter === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>FAQ Umum</p>
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.80)', backdropFilter: 'blur(8px)', border: '0.5px solid rgba(0,0,0,0.05)', borderRadius: 16 }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>
                        <item.icon className="w-4 h-4 text-amber-500" /> {item.q}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && <p style={{ fontSize: 12, color: 'rgba(26,26,26,0.6)', marginTop: 8, lineHeight: 1.5 }}>{item.a}</p>}
                  </div>
                ))}
            </div>
            )}
          </div>

          <div style={{ padding: '12px 20px', borderTop: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: 'rgba(248,247,244,0.90)' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {CHAPTERS.map(ch => (
                <div key={ch.id} onClick={() => setActiveChapter(ch.id)} style={{ width: activeChapter === ch.id ? 20 : 6, height: 6, borderRadius: 99, cursor: 'pointer', background: activeChapter === ch.id ? '#F59E0B' : 'rgba(0,0,0,0.15)', transition: 'all 0.2s ease' }} />
              ))}
            </div>
            <button onClick={() => setIsGuideOpen(false)} style={{ padding: '8px 16px', borderRadius: 8, background: '#1A1A1A', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}