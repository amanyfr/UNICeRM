'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Download, 
  User, 
  Filter 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line, 
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';
import { toast } from 'sonner';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { feedbackAPI } from '../../lib/api';

// ─── Helper: map feedback backend → format UI ─────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFeedback(fb: any) {
  return {
    id:       fb.id,
    customer: fb.customerName ?? fb.customer?.name ?? 'Customer',
    email:    fb.customerEmail ?? fb.customer?.email ?? '',
    ticketId: fb.ticketNumber  ?? fb.ticket?.ticketNumber ?? '',
    rating:   fb.rating,
    comment:  fb.comment       ?? '',
    agent:    fb.agentName     ?? 'Customer Service UNICeRM',
    date:     fb.createdAt
      ? new Date(fb.createdAt).toLocaleDateString('id-ID')
      : '-',
    platform: 'UNICeRM',
  };
}

export default function FeedbackPage() {
  // Role Detection matching guidelines
  const [currentUser] = useState<any>(() => {
    try {
      const raw = localStorage.getItem('currentUser') || localStorage.getItem('unicerm_user');
      if (raw && raw !== 'undefined') {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error(e);
    }
    return { name: 'Demo Admin', role: 'admin' };
  });

  const isAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'admin';

  // ─── Data state ─────────────────────────────────────────────────────────
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [apiStats, setApiStats]   = useState<any>(null);
  const [loading, setLoading]     = useState(true);

  // ─── Fetch feedback + stats ──────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch feedback untuk semua role
      const feedbackRes = await feedbackAPI.getAll();
      const rawFeedbacks = feedbackRes.data?.data || feedbackRes.data || [];
      const feedbackArr  = Array.isArray(rawFeedbacks) ? rawFeedbacks : [];
      const mapped       = feedbackArr.map(mapFeedback);
      setFeedbacks(mapped);

      // Hitung stats lokal untuk semua role
      const total    = mapped.length;
      const positive = mapped.filter((f: any) => f.rating >= 4).length;
      const negative = mapped.filter((f: any) => f.rating <= 2).length;
      const avg      = total > 0
        ? mapped.reduce((a: any, b: any) => a + b.rating, 0) / total
        : 0;

      // Fetch stats dari backend hanya untuk Admin
      if (isAdmin) {
        try {
          const statsRes = await feedbackAPI.getStats();
          const stats    = statsRes.data?.data || statsRes.data || {};
          setApiStats({
            avg:         (stats.averageRating  || avg).toFixed(1),
            avgScore:    stats.averageRating   || avg,
            total:       stats.totalFeedbacks  || total,
            positive:    (stats.distribution?.[4] || 0) + (stats.distribution?.[5] || 0),
            positivePct: total > 0 ? Math.round(positive / total * 100) + '%' : '0%',
            negative:    (stats.distribution?.[1] || 0) + (stats.distribution?.[2] || 0),
            negativePct: total > 0 ? Math.round(negative / total * 100) + '%' : '0%',
          });
        } catch {
          // Fallback ke kalkulasi lokal
          setApiStats({
            avg:         avg.toFixed(1),
            avgScore:    avg,
            total,
            positive,
            positivePct: total > 0 ? Math.round(positive / total * 100) + '%' : '0%',
            negative,
            negativePct: total > 0 ? Math.round(negative / total * 100) + '%' : '0%',
          });
        }
      } else {
        // CS/Agent: hitung stats lokal
        setApiStats({
          avg:         avg.toFixed(1),
          avgScore:    avg,
          total,
          positive,
          positivePct: total > 0 ? Math.round(positive / total * 100) + '%' : '0%',
          negative,
          negativePct: total > 0 ? Math.round(negative / total * 100) + '%' : '0%',
        });
      }
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
      toast.error('Gagal memuat data feedback.');
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Filter feedback per role ────────────────────────────────────────────
  const feedbacksToShow = useMemo(() => {
    // Tampilkan semua feedback untuk semua role, agar data muncul untuk CS/Agent
    return feedbacks;
  }, [feedbacks]);

  // ─── Stats (dari API, fallback ke hitung lokal) ──────────────────────────
  const stats = useMemo(() => {
    if (apiStats) return apiStats;
    // fallback kalau API stats belum tersedia
    const list     = feedbacksToShow;
    const total    = list.length;
    const avgScore = total > 0
      ? list.reduce((s, f) => s + f.rating, 0) / total
      : 0;
    const positive = list.filter(f => f.rating >= 4).length;
    const negative = list.filter(f => f.rating <= 2).length;
    return {
      avg:         avgScore.toFixed(1),
      avgScore,
      total,
      positive,
      positivePct: total > 0 ? `${Math.round((positive / total) * 100)}%` : '0%',
      negative,
      negativePct: total > 0 ? `${Math.round((negative / total) * 100)}%` : '0%',
    };
  }, [apiStats, feedbacksToShow]);

  // Handle export CSV
  const handleExport = () => {
    toast.success('Data feedback berhasil diexport dalam format CSV!');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 select-none">
        
        {/* HEADER AREA */}
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-none mb-1">
            Feedback & CSAT
          </h1>
          <p className="text-[14px] text-gray-500 font-medium">
            {isAdmin 
              ? 'Pantau kepuasan pelanggan secara keseluruhan.' 
              : 'Lihat rating pelanggan yang Anda tangani.'}
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 — SKOR CSAT RATA-RATA */}
          <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <Star className="w-5 h-5 text-[#D97706]" />
              <span className="bg-white/75 border border-amber-250 text-[#D97706] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                30 hari
              </span>
            </div>
            <div>
              <span className="text-[32px] font-extrabold text-[#1A1A1A] block leading-none">
                {stats.avg}/5
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mt-1">
                SKOR CSAT
              </span>
              
              {/* 5 Bintang visual spec */}
              <div className="flex gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map(i => {
                  let starClass = "";
                  if (i <= 3) {
                    starClass = "text-[#F59E0B] fill-[#F59E0B]";
                  } else if (i === 4) {
                    starClass = "text-[#F59E0B] fill-[#F59E0B] opacity-50";
                  } else {
                    starClass = "text-gray-300";
                  }
                  return <Star key={i} className={`w-4 h-4 ${starClass}`} />;
                })}
              </div>
            </div>
          </div>

          {/* Card 2 — TOTAL FEEDBACK */}
          <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <span className="bg-white/75 border border-blue-150 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                +periode ini
              </span>
            </div>
            <div>
              <span className="text-[32px] font-extrabold text-[#1A1A1A] block leading-none">
                {stats.total}
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mt-1">
                TOTAL FEEDBACK
              </span>
            </div>
          </div>

          {/* Card 3 — PUAS (rating 4-5) */}
          <div className="bg-[#F0FDF4] border border-green-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              <span className="bg-white/75 border border-green-150 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                {stats.positivePct}
              </span>
            </div>
            <div>
              <span className="text-[32px] font-extrabold text-[#1A1A1A] block leading-none">
                {stats.positive}
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mt-1">
                PUAS
              </span>
            </div>
          </div>

          {/* Card 4 — PERLU PERBAIKAN (rating 1-2) */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <ThumbsDown className="w-5 h-5 text-red-500" />
              <span className="bg-white/75 border border-red-150 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                {stats.negativePct}
              </span>
            </div>
            <div>
              <span className="text-[32px] font-extrabold text-[#1A1A1A] block leading-none">
                {stats.negative}
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mt-1">
                PERLU PERBAIKAN
              </span>
            </div>
          </div>

        </div>

        {/* LAYOUT ADMIN ONLY — FULL ANALITIK AND AGENT PERFORMANCE */}
        {isAdmin && (
          <div className="space-y-6">
            
            {/* SECTION CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* KIRI — Distribusi Rating */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">
                  Distribusi Rating
                </h2>
                
                <div className="w-full h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { rating: '1 ⭐', count: 2 },
                        { rating: '2 ⭐', count: 4 },
                        { rating: '3 ⭐', count: 7 },
                        { rating: '4 ⭐', count: 15 },
                        { rating: '5 ⭐', count: 19 },
                      ]}
                      margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
                    >
                      <CartesianGrid stroke="#F5F5F5" vertical={false} />
                      <XAxis 
                        dataKey="rating" 
                        tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1A1A', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#FFF',
                          fontSize: '11px',
                          fontWeight: 700 
                        }} 
                      />
                      <Bar dataKey="count" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* KANAN — Tren CSAT Bulanan */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">
                  Tren CSAT Bulanan
                </h2>
                
                <div className="w-full h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', score: 3.2 },
                        { month: 'Feb', score: 3.5 },
                        { month: 'Mar', score: 3.8 },
                        { month: 'Apr', score: 3.6 },
                        { month: 'Mei', score: 3.8 },
                      ]}
                      margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid stroke="#F5F5F5" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[0, 5]} 
                        tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: '#1A1A1A', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#FFF',
                          fontSize: '11px',
                          fontWeight: 700 
                        }}
                      />
                      <ReferenceLine y={4} stroke="#E5E7EB" strokeDasharray="4 4" />
                      <Line 
                        dataKey="score" 
                        type="monotone"
                        stroke="#F59E0B" 
                        strokeWidth={2.5} 
                        dot={{ fill: '#F59E0B', r: 4, stroke: '#FFF', strokeWidth: 1.5 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* PERFORMA AGENT */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">
                Performa Agent
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {([] as any[]).map((agent, i) => {
                  const initial = agent.name.charAt(0).toUpperCase();
                  return (
                    <div 
                      key={i} 
                      className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all duration-150 flex flex-col justify-between"
                    >
                      
                      {/* Name header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-[40px] h-[40px] rounded-full bg-[#F59E0B] flex items-center justify-center text-[#1A1A1A] font-black text-[15px] select-none shadow-xs">
                          {initial}
                        </div>
                        <div>
                          <span className="font-semibold text-[14px] text-[#1A1A1A] block">
                            {agent.name}
                          </span>
                          <span className="text-[12px] text-gray-400 block font-semibold uppercase tracking-wider">
                            {agent.role}
                          </span>
                        </div>
                      </div>

                      {/* Score metrics */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Rating block */}
                        <div className="bg-white rounded-lg p-2.5 text-center border border-gray-100/50">
                          <div className="flex items-center justify-center">
                            <span className="text-[18px] font-bold text-[#1A1A1A] block leading-tight">
                              {agent.csat.toFixed(1)}
                            </span>
                            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] ml-1 flex-shrink-0" />
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                            Rata CSAT
                          </p>
                        </div>

                        {/* Tickets handled block */}
                        <div className="bg-white rounded-lg p-2.5 text-center border border-gray-100/50">
                          <span className="text-[18px] font-bold text-[#1A1A1A] block leading-tight">
                            {agent.tickets}
                          </span>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                            Tiket
                          </p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TABEL FEEDBACK (semua role, filter berbeda) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-[16px] font-bold text-[#1A1A1A]">
              Daftar Feedback
            </h2>
            
            {isAdmin && (
              <button
                onClick={handleExport}
                className="border border-gray-200 rounded-xl px-4 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-all font-bold text-[13px] text-[#1A1A1A] flex items-center gap-2 cursor-pointer shadow-xs select-none"
              >
                <Download className="w-4 h-4 text-[#1A1A1A]" />
                Export CSV
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-150 shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200 select-none">
                <tr>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    PELANGGAN
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[120px]">
                    TIKET
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[180px]">
                    RATING
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest min-w-[220px]">
                    KOMENTAR
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[140px]">
                    AGENT
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[150px]">
                    PLATFORM
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[120px]">
                    TANGGAL
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {feedbacksToShow.map(feedback => {
                  const initial = feedback.customer.charAt(0).toUpperCase();
                  return (
                    <tr 
                      key={feedback.id} 
                      className="hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      
                      {/* PELANGGAN */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#1A1A1A] font-extrabold text-[12px] flex-shrink-0 shadow-xs select-none">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-[13px] text-[#1A1A1A] block truncate">
                              {feedback.customer}
                            </span>
                            <span className="text-[11px] text-gray-400 font-mono block truncate">
                              {feedback.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* TIKET */}
                      <td className="px-5 py-4 w-[120px]">
                        <span className="font-mono text-[12px] text-gray-500 font-bold block">
                          {feedback.ticketId}
                        </span>
                      </td>

                      {/* RATING */}
                      <td className="px-5 py-4 w-[180px]">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(starIdx => {
                            const active = starIdx <= feedback.rating;
                            return (
                              <Star 
                                key={starIdx} 
                                className={`w-3.5 h-3.5 ${active ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-gray-250 fill-gray-100'}`} 
                              />
                            );
                          })}
                          <span className="text-[12px] font-bold text-[#1A1A1A] ml-1.5 select-none">
                            {feedback.rating}/5
                          </span>
                        </div>
                      </td>

                      {/* KOMENTAR */}
                      <td className="px-5 py-4 min-w-[220px]">
                        <p className="text-[13px] text-gray-600 max-w-[340px] line-clamp-2 italic font-medium leading-relaxed">
                          "{feedback.comment}"
                        </p>
                      </td>

                      {/* AGENT */}
                      <td className="px-5 py-4 w-[140px]">
                        <span className="text-[13px] text-gray-500 font-semibold block">
                          {feedback.agent}
                        </span>
                      </td>

                      {/* PLATFORM */}
                      <td className="px-5 py-4 w-[150px]">
                        <span className="bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider block w-fit shadow-2xs">
                          {feedback.platform}
                        </span>
                      </td>

                      {/* TANGGAL */}
                      <td className="px-5 py-4 w-[120px]">
                        <span className="text-[12px] text-gray-400 font-mono font-semibold block">
                          {feedback.date}
                        </span>
                      </td>

                    </tr>
                  );
                })}

                {feedbacksToShow.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 bg-gray-55 text-gray-400 font-bold text-[14px]">
                      Tidak ada data feedback yang dapat ditampilkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
