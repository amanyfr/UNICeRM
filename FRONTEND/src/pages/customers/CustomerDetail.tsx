import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  Clock, 
  Star, 
  Edit3, 
  Plus, 
  MessageCircle, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Info,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { 
  GlassCard, 
  GlassBadge, 
  GlassButton, 
} from '../../components/ui/glass';
import { customerAPI, ticketAPI } from '../../lib/api';
import { toast } from 'sonner';
import { 
  interactionHistory, 
  chatSessions, 
  feedbackData,
  aiServiceRecommendations
} from '../../lib/dummy-data';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

type TabType = 'Riwayat' | 'Percakapan' | 'Feedback' | 'Rekomendasi';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('Riwayat');
  
  // State untuk data dari backend
  const [customer, setCustomer] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data saat mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch customer data
        const customerRes = await customerAPI.getById(id!);
        setCustomer(customerRes.data);
        
        // Fetch all tickets lalu filter by customerId
        const ticketsRes = await ticketAPI.getAll();
        const customerTickets = ticketsRes.data.filter(
          (t: any) => t.customerId === id
        );
        setTickets(customerTickets);
      } catch (error: any) {
        console.error('Error fetching customer data:', error);
        toast.error('Gagal memuat data pelanggan');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const tabs: TabType[] = ['Riwayat', 'Percakapan', 'Feedback', 'Rekomendasi'];

  const segmentVariants: Record<string, Parameters<typeof GlassBadge>[0]['variant']> = {
    'aktif': 'success',
    'prospek': 'info',
    'VIP': 'accent',
    'tidak-aktif': 'default',
  };

  // Hitung stats dari data
  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  // Loading spinner
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-accent" />
            <p className="text-sm font-bold text-text-soft">Memuat data pelanggan...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Jika customer tidak ditemukan
  if (!customer) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg font-bold text-primary mb-2">Pelanggan tidak ditemukan</p>
            <button 
              onClick={() => navigate('/customers')}
              className="text-accent hover:underline text-sm font-bold"
            >
              Kembali ke daftar pelanggan
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/customers')}
            className="w-10 h-10 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-primary group hover:bg-white/40 transition-all shadow-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-primary tracking-tight">Detail Pelanggan</h1>
            <p className="text-xs font-bold text-text-soft uppercase tracking-widest">ID: #{customer._id || customer.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* LEFT COL: Profile Card (35%) */}
          <div className="lg:col-span-4 h-full">
            <GlassCard className="p-8 h-full flex flex-col items-center text-center shadow-glass-sm sticky top-24">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-accent/20 border-4 border-white/60 shadow-xl flex items-center justify-center text-accent-dark text-3xl font-black">
                  {customer.name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                   <GlassBadge variant={segmentVariants[customer.segment || 'aktif']} size="md">
                    {customer.segment || 'Aktif'}
                  </GlassBadge>
                </div>
              </div>

              <h2 className="text-2xl font-black text-primary tracking-tight mb-2">{customer.name}</h2>
              <p className="text-sm font-bold text-text-soft mb-6">{customer.company || 'No Company'}</p>

              <div className="w-full space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/20 border border-white/40 hover:bg-white/30 transition-colors cursor-pointer group">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent-dark group-hover:scale-110 transition-transform">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black text-text-soft uppercase tracking-widest">Email</span>
                    <span className="text-sm font-black text-primary leading-tight">{customer.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/20 border border-white/40 hover:bg-white/30 transition-colors cursor-pointer group">
                  <div className="w-9 h-9 rounded-xl bg-info/10 flex items-center justify-center text-info group-hover:scale-110 transition-transform">
                    <Phone size={16} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black text-text-soft uppercase tracking-widest">Phone</span>
                    <span className="text-sm font-black text-primary leading-tight">{customer.phone}</span>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-4 pt-6 border-t border-white/20">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-black text-text-soft uppercase tracking-widest">CSAT Score</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <Star size={12} className="fill-[#F5C518] text-[#F5C518]" />
                      <span className="text-sm font-black text-primary">{customer.satisfactionScore || '5.0'}</span>
                    </div>
                    <span className="text-[11px] font-bold text-text-soft">/ 5.0</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {customer.tags && customer.tags.length > 0 ? customer.tags.map((tag: string) => (
                    <div key={tag} className="px-3 py-1 rounded-xl bg-white/40 border border-white/60 text-[9px] font-black text-primary uppercase tracking-widest">
                      {tag}
                    </div>
                  )) : (
                    <div className="px-3 py-1 rounded-xl bg-white/40 border border-white/60 text-[9px] font-black text-primary uppercase tracking-widest">
                      Customer
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full mt-8 pt-8 border-t border-white/20 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-text-soft px-1">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-accent-dark" />
                    <span>Bergabung: Jan 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-info" />
                    <span>3 hari lalu</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <GlassButton variant="primary" icon={<Edit3 size={16} />} fullWidth className="font-black uppercase tracking-widest text-[10px]">Edit Profil</GlassButton>
                  <GlassButton variant="secondary" icon={<Plus size={16} />} fullWidth className="font-black uppercase tracking-widest text-[10px]">Buat Tiket</GlassButton>
                  <GlassButton variant="ghost" icon={<MessageCircle size={16} />} fullWidth className="font-black uppercase tracking-widest text-[10px]">Kirim Pesan</GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* RIGHT COL: Tab Panel (65%) */}
          <div className="lg:col-span-8 flex flex-col h-full">
            <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden shadow-glass-sm animate-glass" style={{ animationDelay: '0.1s' }}>
              {/* Tab Header */}
              <div className="px-6 sm:px-8 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  <div className="flex gap-1.5 p-1 bg-white/20 border border-white/30 rounded-2xl backdrop-blur-md min-w-max">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                          px-4 sm:px-5 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer
                          ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-text-soft hover:bg-white/10'}
                        `}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                {activeTab === 'Riwayat' && (
                  <div className="flex-shrink-0">
                    <GlassButton variant="primary" size="sm" icon={<Plus size={14} />} className="font-black uppercase tracking-widest text-[10px] w-full sm:w-auto">
                      Tiket Baru
                    </GlassButton>
                  </div>
                )}
              </div>

              {/* Tab Content */}
              <div className="flex-1 p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'Riwayat' && (
                    <motion.div 
                      key="history"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-8"
                    >
                      <div className="relative pl-8 space-y-12">
                        {/* Vertical line */}
                        <div className="absolute left-[3.5px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent to-white/10" />
                        
                        {interactionHistory.map((item) => (
                          <div key={item.id} className="relative">
                            <div className={`absolute -left-[32px] w-[20px] h-[20px] rounded-full border-4 border-white shadow-sm z-10 
                              ${item.status === 'Process' ? 'bg-accent animate-pulse shadow-accent/50 shadow-lg' : 'bg-success'}`} 
                            />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                  <h4 className="text-lg font-black text-primary leading-tight">{item.title}</h4>
                                  <GlassBadge variant={item.variant} size="sm">{item.status}</GlassBadge>
                                </div>
                                <p className="text-xs font-bold text-text-soft uppercase tracking-widest">#{item.id} • {item.type}</p>
                              </div>
                              <span className="text-[11px] font-black text-text-soft italic">{item.time}</span>
                            </div>
                            <div className="mt-4 p-4 rounded-2xl bg-white/20 border border-white/30 text-sm italic text-primary/80 font-medium">
                              "Respon cepat dari tim teknis, masalah teridentifikasi..."
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Percakapan' && (
                    <motion.div 
                      key="chats"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      {chatSessions.map((session) => (
                        <div key={session.id} className="p-6 rounded-[28px] bg-white/20 border border-white/40 hover:bg-white/30 transition-all group">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark">
                                <MessageSquare size={18} />
                              </div>
                              <div>
                                <span className="text-[10px] font-black text-text-soft uppercase tracking-widest">Sesi ID</span>
                                <p className="text-sm font-black text-primary leading-tight">{session.id}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-text-soft italic">{session.time}</span>
                              <GlassBadge variant={session.status === 'Handoff' ? 'warning' : 'success'} size="sm">{session.status}</GlassBadge>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="p-3 rounded-2xl bg-primary/5 text-xs font-bold text-primary">
                              Q: {session.query}
                            </div>
                            <div className="p-3 rounded-2xl bg-white/40 text-xs font-medium text-text-soft border border-white/50">
                              A: {session.answer}
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'Feedback' && (
                    <motion.div 
                      key="feedback"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center justify-center p-8 rounded-[32px] bg-accent/5 border border-accent/20">
                          <span className="text-[64px] font-black text-primary leading-none tracking-tighter">{feedbackData.average}</span>
                          <div className="flex items-center gap-1 mt-2">
                             {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={20} className="fill-[#F5C518] text-[#F5C518]" />
                            ))}
                          </div>
                          <p className="text-xs font-black text-text-soft uppercase tracking-widest mt-6">Rata-rata Rating</p>
                        </div>

                        <div className="flex-1 h-[140px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={feedbackData.distribution} layout="vertical" margin={{ left: -30, right: 30 }}>
                              <XAxis type="number" hide />
                              <YAxis dataKey="stars" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 900 }} />
                              <Bar dataKey="count" fill="#F5C518" radius={[0, 4, 4, 0]} barSize={12} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-sm font-black text-primary uppercase tracking-widest px-1">Review Terbaru</h4>
                        {feedbackData.comments.map((comment) => (
                          <div key={comment.id} className="p-6 rounded-[28px] bg-white/20 border border-white/40 transition-all hover:bg-white/30">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map(s => (
                                  <Star key={s} size={12} className={s <= comment.stars ? "fill-[#F5C518] text-[#F5C518]" : "text-white/40"} />
                                ))}
                              </div>
                              <GlassBadge variant="info" size="sm">{comment.category}</GlassBadge>
                            </div>
                            <p className="text-sm font-medium text-primary mb-4">"{comment.comment}"</p>
                            <span className="text-[10px] font-black text-text-soft uppercase tracking-widest">{comment.date}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Rekomendasi' && (
                    <motion.div 
                      key="ai"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-8"
                    >
                      <div className="p-8 rounded-[40px] bg-gradient-to-br from-accent/20 to-white/10 border border-white/60 shadow-glass-sm flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-[24px] bg-white/60 flex items-center justify-center text-accent shadow-sm mb-6">
                          <TrendingUp size={32} />
                        </div>
                        <h4 className="text-xl font-black text-primary tracking-tight mb-2">Churn Risk: <span className="text-success">Rendah</span></h4>
                        <div className="w-full max-w-xs h-3 bg-white/20 rounded-full border border-white/40 overflow-hidden mt-4">
                          <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} transition={{ duration: 1.2 }} className="h-full bg-success shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
                        </div>
                        <p className="text-[11px] font-bold text-text-soft mt-6 leading-relaxed">
                          Pelanggan menunjukkan aktivitas positif dalam 30 hari terakhir. <br/>
                          Tingkat loyalitas diprediksi tetap stabil.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-black text-primary uppercase tracking-widest px-1">Layanan Rekomendasi</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {aiServiceRecommendations.map((item) => (
                            <div key={item.id} className="p-5 rounded-[28px] bg-white/40 border border-white/60 hover:bg-white/60 transition-all cursor-pointer group">
                              <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                  {item.icon === 'MessageSquare' ? <MessageSquare size={18} /> : <TrendingUp size={18} />}
                                </div>
                                <h5 className="font-black text-primary leading-tight">{item.name}</h5>
                              </div>
                              <p className="text-xs font-medium text-text-soft italic">"{item.reason}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-[28px] bg-info/10 border border-info/20 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-2xl bg-info/20 flex items-center justify-center text-info">
                          <Clock size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-info uppercase tracking-widest">Timing Insight</p>
                          <p className="text-sm font-black text-primary">Waktu terbaik follow-up: <span className="text-accent-dark">Senin pagi (09:00 - 10:30)</span></p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
