'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Inbox, 
  CheckCircle2, 
  Star, 
  AlertTriangle, 
  Download, 
  FileSpreadsheet, 
  Clock, 
  Filter,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { toast } from 'sonner';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ticketAPI, customerAPI, feedbackAPI } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function AnalyticsPage() {
  // Ambil user dari auth context
  const { user: authUser } = useAuth();
  const isAdmin = authUser?.role === 'admin';

  // ─── Analytics state ────────────────────────────────────────────────────
  const [analyticsStats, setAnalyticsStats] = useState({
    totalCustomers:  0,
    totalTickets:    0,
    resolvedTickets: 0,
    resolutionRate:  '0%',
    avgRating:       '0.0',
    churnRisk:       0,
  });
  const [churnCustomers, setChurnCustomers] = useState<any[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [segmentData, setSegmentData] = useState([
    { name: 'Prospek',   value: 0, color: '#FDE68A' },
    { name: 'Aktif',     value: 0, color: '#F59E0B' },
    { name: 'VIP',       value: 0, color: '#1A1A1A' },
    { name: 'Tdk Aktif', value: 0, color: '#D1D5DB' },
  ]);

  const fetchAnalytics = useCallback(async (period: string = '30D') => {
    try {
      setLoadingAnalytics(true);
      const [ticketRes, customerRes, feedbackRes] = await Promise.all([
        ticketAPI.getAll({ period }),
        customerAPI.getAll(),
        feedbackAPI.getStats(),
      ]);

        const tickets   = ticketRes.data?.data   ?? ticketRes.data   ?? [];
        const customers = customerRes.data?.data  ?? customerRes.data  ?? [];
        const stats     = feedbackRes.data?.data  ?? feedbackRes.data  ?? {};

        const ticketArr   = Array.isArray(tickets)   ? tickets   : [];
        const customerArr = Array.isArray(customers) ? customers : [];

        const resolved = ticketArr.filter((t: any) => t.status === 'resolved').length;
        const rate     = ticketArr.length > 0
          ? `${Math.round((resolved / ticketArr.length) * 100)}%`
          : '0%';

        // Churn risk: customer segment tidak_aktif atau prospek
        const churnList = customerArr
          .filter((c: any) =>
            c.segment === 'tidak aktif' ||
            c.segment === 'TIDAK_AKTIF' ||
            c.segment === 'prospek' ||
            c.segment === 'PROSPEK'
          )
          .slice(0, 5)
          .map((c: any) => ({
            name:        c.name     ?? 'Customer',
            email:       c.email    ?? '',
            lastContact: c.createdAt
              ? new Date(c.createdAt).toLocaleDateString('id-ID')
              : 'Baru saja',
            segment:     c.segment?.toLowerCase() ?? '',
            tickets:     c.totalTickets ?? 0,
            riskLevel:
              c.segment === 'tidak aktif' || c.segment === 'TIDAK_AKTIF'
                ? 'Tinggi'
                : 'Sedang',
          }));

        setAnalyticsStats({
          totalCustomers:  customerArr.length,
          totalTickets:    ticketArr.length,
          resolvedTickets: resolved,
          resolutionRate:  rate,
          avgRating:       (stats.averageRating ?? 0).toFixed(1),
          churnRisk:       churnList.length,
        });
        setChurnCustomers(churnList);

        // Segmentasi pelanggan untuk pie chart
        const prospek   = customerArr.filter((c: any) => c.segment === 'PROSPEK'    || c.segment === 'prospek').length;
        const aktif     = customerArr.filter((c: any) => c.segment === 'AKTIF'      || c.segment === 'aktif').length;
        const vip       = customerArr.filter((c: any) => c.segment === 'VIP'        || c.segment === 'vip').length;
        const tidakAktif = customerArr.filter((c: any) => c.segment === 'TIDAK_AKTIF' || c.segment === 'tidak aktif').length;
        const totalSeg  = prospek + aktif + vip + tidakAktif || 1;
        setSegmentData([
          { name: 'Prospek',   value: Math.round(prospek    / totalSeg * 100), color: '#FDE68A' },
          { name: 'Aktif',     value: Math.round(aktif      / totalSeg * 100), color: '#F59E0B' },
          { name: 'VIP',       value: Math.round(vip        / totalSeg * 100), color: '#1A1A1A' },
          { name: 'Tdk Aktif', value: Math.round(tidakAktif / totalSeg * 100), color: '#D1D5DB' },
        ]);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoadingAnalytics(false);
      }
  }, []);

  // Active filter tab: '7D' | '30D' | '90D' | '6M'
  const [selectedPeriod, setSelectedPeriod] = useState<'7D' | '30D' | '90D' | '6M'>('30D');

  useEffect(() => {
    fetchAnalytics(selectedPeriod);
  }, [selectedPeriod, fetchAnalytics]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Laporan Analitik UNICeRM', 14, 22);
    doc.setFontSize(11);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 14, 32);
    doc.setFontSize(13);
    doc.text('Ringkasan', 14, 45);
    autoTable(doc, {
      startY: 50,
      head: [['Metrik', 'Nilai']],
      body: [
        ['Total Pelanggan',          String(analyticsStats.totalCustomers)],
        ['Total Tiket',              String(analyticsStats.totalTickets)],
        ['Tingkat Resolusi',         analyticsStats.resolutionRate],
        ['Skor CSAT',                analyticsStats.avgRating + '/5'],
        ['Customer Berisiko Churn',  String(analyticsStats.churnRisk)],
      ],
    });
    const afterSummary = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.text('Customer Berisiko Churn', 14, afterSummary);
    autoTable(doc, {
      startY: afterSummary + 5,
      head: [['Nama', 'Email', 'Segment', 'Risiko']],
      body: churnCustomers.map(c => [c.name, c.email, c.segment, c.riskLevel]),
    });
    doc.save('laporan-analitik-unicerm.pdf');
    toast.success('Laporan PDF berhasil diunduh!');
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const summaryData = [
      ['Metrik', 'Nilai'],
      ['Total Pelanggan',         analyticsStats.totalCustomers],
      ['Total Tiket',             analyticsStats.totalTickets],
      ['Tingkat Resolusi',        analyticsStats.resolutionRate],
      ['Skor CSAT',               analyticsStats.avgRating + '/5'],
      ['Customer Berisiko Churn', analyticsStats.churnRisk],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Ringkasan');

    const churnData = [
      ['Nama', 'Email', 'Segment', 'Terakhir Kontak', 'Tiket', 'Risiko'],
      ...churnCustomers.map(c => [c.name, c.email, c.segment, c.lastContact, c.tickets, c.riskLevel]),
    ];
    const wsChurn = XLSX.utils.aoa_to_sheet(churnData);
    XLSX.utils.book_append_sheet(wb, wsChurn, 'Churn Risk');

    XLSX.writeFile(wb, 'laporan-analitik-unicerm.xlsx');
    toast.success('Laporan Excel berhasil diunduh!');
  };

  const handleFollowUp = (customerName: string) => {
    toast.success(`Notifikasi follow-up dikirim ke ${customerName}!`);
  };

  // Guard Render for Non-Admin
  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-8 bg-white rounded-2xl border border-gray-200 mt-6 shadow-xs max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-5 border border-red-100 animate-bounce">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-[20px] font-bold text-[#1A1A1A] mb-2">Akses Terbatas</h2>
          <p className="text-gray-500 text-[14px] leading-relaxed max-w-md">
            Halaman Analitik & Laporan ini hanya dapat diakses oleh Administrator. Operator atau CS tidak diizinkan masuk ke halaman laporan interaktif ini.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 select-none">

        {/* HEADER + FILTER PERIODE */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Analitik & Laporan
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              Pantau performa layanan dan pertumbuhan pelanggan.
            </p>
          </div>

          {/* KANAN — Filter + Export */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Filter periode tabs */}
            <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-2xs">
              {(['7D', '30D', '90D', '6M'] as const).map(p => {
                const isActive = selectedPeriod === p;
                return (
                  <button
                    key={p}
                    onClick={() => setSelectedPeriod(p)}
                    className={`text-[13px] font-semibold px-4 py-2 rounded-lg transition-all duration-150 select-none cursor-pointer ${
                      isActive 
                        ? 'bg-[#F59E0B] text-[#1A1A1A] shadow-xs' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            {/* Export PDF Button */}
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-xl cursor-pointer hover:bg-[#2A2A2A] transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span className="text-[13px] font-semibold">Export PDF</span>
            </button>

            {/* Export Excel Button */}
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-gray-500" />
              <span className="text-[13px] font-semibold text-gray-600">Excel</span>
            </button>

          </div>
        </div>

        {/* STAT SUMMARY (grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          
          {/* Card 1 — TOTAL PELANGGAN */}
          <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <Users className="w-5 h-5 text-[#D97706]" />
              <span className="bg-[#1A1A1A] text-white text-[9px] font-black px-2 py-0.5 rounded-full select-none tracking-wide">
                +4% vs periode lalu
              </span>
            </div>
            <div>
              <span className="text-[32px] font-bold text-[#1A1A1A] block leading-none">{loadingAnalytics ? '…' : analyticsStats.totalCustomers}</span>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mt-1">
                TOTAL PELANGGAN
              </span>
            </div>
          </div>

          {/* Card 2 — TOTAL TIKET */}
          <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <Inbox className="w-5 h-5 text-blue-500" />
              <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide">
                periode ini
              </span>
            </div>
            <div>
              <span className="text-[32px] font-bold text-[#1A1A1A] block leading-none">{loadingAnalytics ? '…' : analyticsStats.totalTickets}</span>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mt-1">
                TOTAL TIKET
              </span>
            </div>
          </div>

          {/* Card 3 — TINGKAT RESOLUSI */}
          <div className="bg-[#F0FDF4] border border-green-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="bg-green-150 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide">
                +2.1%
              </span>
            </div>
            <div>
              <span className="text-[32px] font-bold text-[#1A1A1A] block leading-none">{loadingAnalytics ? '…' : analyticsStats.resolutionRate}</span>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mt-1">
                TINGKAT RESOLUSI
              </span>
            </div>
          </div>

          {/* Card 4 — SKOR CSAT */}
          <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <Star className="w-5 h-5 text-blue-500" />
              <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide">
                +0.3
              </span>
            </div>
            <div>
              <span className="text-[32px] font-bold text-[#1A1A1A] block leading-none">{loadingAnalytics ? '…' : `${analyticsStats.avgRating}/5`}</span>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mt-1">
                SKOR CSAT
              </span>
            </div>
          </div>

          {/* Card 5 — CHURN RISK */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide uppercase">
                perlu perhatian
              </span>
            </div>
            <div>
              <span className="text-[32px] font-bold text-[#1A1A1A] block leading-none">{loadingAnalytics ? '…' : analyticsStats.churnRisk}</span>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mt-1">
                CHURN RISK
              </span>
            </div>
          </div>

        </div>

        {/* BARIS CHART 1 (grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Kolom 1+2 (col-span-2) — GRAFIK PERTUMBUHAN PELANGGAN + TIKET */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">
              Pertumbuhan Pelanggan & Tiket
            </h2>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: 'Jan', pelanggan: 8, tiket: 12 },
                    { month: 'Feb', pelanggan: 11, tiket: 18 },
                    { month: 'Mar', pelanggan: 13, tiket: 15 },
                    { month: 'Apr', pelanggan: 16, tiket: 22 },
                    { month: 'Mei', pelanggan: 20, tiket: 19 },
                  ]}
                  margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorPelanggan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorTiket" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#F9F9F9" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pelanggan" 
                    stroke="#F59E0B" 
                    fill="url(#colorPelanggan)" 
                    strokeWidth={2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tiket" 
                    stroke="#1A1A1A" 
                    fill="url(#colorTiket)" 
                    strokeWidth={2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Legend custom manual di bawah chart */}
            <div className="flex gap-4 mt-3 justify-center">
              <div className="flex items-center gap-2 select-none">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="text-[12px] text-gray-500 font-semibold">Pelanggan</span>
              </div>
              <div className="flex items-center gap-2 select-none">
                <div className="w-3 h-3 rounded-full bg-[#1A1A1A]" />
                <span className="text-[12px] text-gray-500 font-semibold">Tiket</span>
              </div>
            </div>

          </div>

          {/* Kolom 3 — SEGMENTASI PELANGGAN */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-2">
                Segmentasi Pelanggan
              </h2>
            </div>

            {/* PieChart container wrapper with absolute centered text block */}
            <div className="relative w-[200px] h-[200px] mx-auto flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#FFF',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Angka tengah donut */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[24px] font-bold text-[#1A1A1A] leading-none">{loadingAnalytics ? '…' : analyticsStats.totalCustomers}</span>
                <p className="text-[11px] text-gray-400 font-bold uppercase mt-0.5 tracking-wider">Total</p>
              </div>
            </div>

            {/* Legend bawah (space-y-2 mt-4) */}
            <div className="space-y-2 mt-4">
              {segmentData.map((item, i) => (
                <div key={i} className="flex justify-between items-center select-none">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[12px] text-gray-600 font-semibold">{item.name}</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#1A1A1A]">{item.value}%</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* BARIS CHART 2 */}
        <div className="mb-6">
          
          {/* STATUS TIKET */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">
              Distribusi Status Tiket
            </h2>
            
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { status: 'Open', count: 8, fill: '#F59E0B' },
                    { status: 'In Progress', count: 12, fill: '#3B82F6' },
                    { status: 'Resolved', count: 27, fill: '#22C55E' },
                  ]}
                  margin={{ top: 5, right: 15, left: -10, bottom: 5 }}
                >
                  <CartesianGrid stroke="#F9F9F9" horizontal={false} />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    dataKey="status" 
                    type="category" 
                    tick={{ fontSize: 12, fill: '#1A1A1A', fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                    width={85}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#1A1A1A', 
                      border: 'none', 
                      borderRadius: '10px',
                      color: '#FFF',
                      fontSize: '11px',
                      fontWeight: 700 
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
                    {[
                      { status: 'Open', count: 8, fill: '#F59E0B' },
                      { status: 'In Progress', count: 12, fill: '#3B82F6' },
                      { status: 'Resolved', count: 27, fill: '#22C55E' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* TABEL CUSTOMER CHURN RISK */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          
          {/* HEADER */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-[16px] font-bold text-[#1A1A1A]">
                Customer Berisiko Churn
              </h2>
            </div>
            
            <span className="bg-red-50 text-red-600 border border-red-200 text-[12px] font-bold px-3 py-1 rounded-full select-none shadow-2xs">
              3 customer
            </span>
          </div>

          {/* TABEL LIST */}
          <div className="overflow-x-auto rounded-xl border border-gray-150 shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200 select-none">
                <tr>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    CUSTOMER
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    SEGMENT
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    TERAKHIR KONTAK
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    TIKET
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    RISIKO
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {churnCustomers.map((customer, idx) => {
                  const initial = customer.name.charAt(0).toUpperCase();
                  const isHigh = customer.riskLevel === 'Tinggi';
                  
                  return (
                    <tr 
                      key={idx} 
                      className="hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      
                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#1A1A1A] font-black text-[12px] flex-shrink-0 select-none shadow-xs">
                            {initial}
                          </div>
                          
                          <div className="min-w-0">
                            <span className="font-bold text-[13px] text-[#1A1A1A] block">
                              {customer.name}
                            </span>
                            <span className="text-[11px] text-gray-400 block font-mono truncate">
                              {customer.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SEGMENT */}
                      <td className="px-5 py-4">
                        <span className="bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none shadow-2xs">
                          {customer.segment}
                        </span>
                      </td>

                      {/* TERAKHIR KONTAK */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 select-none">
                          <Clock className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-[13px] text-red-500 font-bold">
                            {customer.lastContact}
                          </span>
                        </div>
                      </td>

                      {/* TIKET */}
                      <td className="px-5 py-4">
                        <span className="text-[13px] text-[#1A1A1A] font-extrabold">
                          {customer.tickets}
                        </span>
                      </td>

                      {/* RISIKO */}
                      <td className="px-5 py-4">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border tracking-wide uppercase select-none ${
                          isHigh 
                            ? 'bg-red-50 text-red-600 border-red-200 shadow-2xs' 
                            : 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A] shadow-2xs'
                        }`}>
                          {customer.riskLevel}
                        </span>
                      </td>

                      {/* AKSI */}
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleFollowUp(customer.name)}
                          className="bg-[#1A1A1A] hover:bg-neutral-800 text-white text-[12px] font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                        >
                          Follow Up
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
