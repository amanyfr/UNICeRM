'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tag, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Copy, 
  RefreshCw, 
  Calendar,
  Zap,
  Smartphone,
  Globe,
  MoreVertical,
  Check,
  Search,
  Trash2,
  CalendarDays,
  AlertCircle
} from 'lucide-react';
import { voucherAPI } from '../../lib/api';
import { 
  GlassCard, 
  GlassBadge, 
  GlassButton, 
  GlassInput, 
  GlassModal
} from '../../components/ui/glass';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { toast } from 'sonner';
import { z } from 'zod';

interface Voucher {
  id: string;
  code: string;
  discount: string;
  type: 'PERSENTASE' | 'FIXED' | string;
  platform: string;
  used: number;
  max: number;
  expiry: string;
  expiredAt?: string | null;
  isActive: boolean;
  description?: string;
  usedCount?: number;
}

// ─── Helper: map voucher dari backend → format UI ────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapVoucher(v: any): any {
  const discountNum = typeof v.discount === 'number' ? v.discount : parseFloat(v.discount) || 0;
  const validUntil  = v.validUntil ?? v.expiredAt ?? null;
  const expiryLabel = validUntil
    ? new Date(validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    : '–';
  const claimed = v._count?.claims ?? v.totalClaimed ?? v.usedCount ?? v.used ?? 0;

  return {
    id:            String(v.id),
    code:          v.code ?? '',
    discount:      `${discountNum}%`,
    discountValue: discountNum,
    discountType:  'percentage',
    type:          'PERSENTASE',
    platform:      'Web',
    used:          claimed,
    usedCount:     claimed,
    max:           100,
    expiry:        expiryLabel,
    expiredAt:     validUntil,
    isActive:      v.isActive ?? true,
    description:   v.description ?? '',
  };
}

// Cek apakah voucher sudah expired
const isVoucherExpired = (voucher: any): boolean => {
  if (voucher.expiredAt) {
    return new Date(voucher.expiredAt) < new Date();
  }
  if (!voucher.expiry) return false;
  
  // Ubah nama bulan Bahasa Indonesia ke Bahasa Inggris untuk parsing yang handal
  const monthsMap: Record<string, string> = {
    'Jan': 'Jan', 'Feb': 'Feb', 'Mar': 'Mar', 'Apr': 'Apr',
    'Mei': 'May', 'Jun': 'Jun', 'Jul': 'Jul', 'Agu': 'Aug', 'Ags': 'Aug',
    'Sep': 'Sep', 'Okt': 'Oct', 'Nov': 'Nov', 'Des': 'Dec',
    'Januari': 'January', 'Februari': 'February', 'Maret': 'March',
    'April': 'April', 'Juni': 'June', 'Juli': 'July',
    'Agustus': 'August', 'September': 'September', 'Oktober': 'October',
    'November': 'November', 'Desember': 'December'
  };
  
  let temp = voucher.expiry;
  Object.keys(monthsMap).forEach(key => {
    temp = temp.replace(new RegExp(`\\b${key}\\b`, 'i'), monthsMap[key]);
  });
  
  const parsed = new Date(temp);
  if (!isNaN(parsed.getTime())) {
    parsed.setHours(23, 59, 59, 999);
    return parsed < new Date();
  }
  return false;
};

// Tentukan status efektif voucher
const getVoucherStatus = (voucher: any): 'aktif' | 'kedaluwarsa' | 'nonaktif' => {
  if (isVoucherExpired(voucher)) return 'kedaluwarsa';
  if (!voucher.isActive) return 'nonaktif';
  return 'aktif';
};

// Helper: dapatkan tanggal hari ini format YYYY-MM-DD
const getTodayString = (): string => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Zod Validation Schema
const voucherSchema = z.object({
  code: z.string().min(1, 'Kode voucher wajib diisi'),
  discount: z.string().min(1, 'Nilai diskon wajib diisi'),
  expiredAt: z.string()
    .optional()
    .refine(val => {
      if (!val) return true; // boleh kosong
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, {
      message: 'Tanggal kedaluwarsa tidak boleh di masa lalu'
    }),
});

export default function VoucherPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let u: any = {};
    try {
      const raw = localStorage.getItem('unicerm_user');
      if (raw && raw !== 'undefined') u = JSON.parse(raw);
    } catch(e) {}
    if (u.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'SEMUA' | 'AKTIF' | 'NON-AKTIF' | 'KEDALUWARSA'>('SEMUA');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, { message: string }>>({});

  const [voucherForm, setVoucherForm] = useState({
    code: '',
    discount: '',
    type: 'PERSENTASE',
    platform: 'Web',
    max: 100,
    expiry: '',
    description: '',
    isActive: true
  });

  // Kosongkan pesan error ketika modal dibuka/ditutup
  useEffect(() => {
    if (!isModalOpen) {
      setErrors({});
    }
  }, [isModalOpen]);

  // ─── Fetch vouchers dari backend ─────────────────────────────────────────────
  const fetchVouchers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await voucherAPI.getAll();
      const raw = response.data?.data ?? response.data ?? [];
      const mapped = Array.isArray(raw) ? raw.map(mapVoucher) : [];
      console.log('📦 Vouchers fetched:', mapped);
      console.log('📊 Active:', mapped.filter(v => v.isActive).length, '| Inactive:', mapped.filter(v => !v.isActive).length);
      setVouchers(mapped);
    } catch (err) {
      console.error('Gagal memuat vouchers:', err);
      toast.error('Gagal memuat data voucher dari server.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshVouchers = useCallback(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  // Filter (useMemo)
  const filtered = useMemo(() => {
    return vouchers.filter(v => {
      const searchMatch = v.code.toLowerCase().includes(search.toLowerCase()) ||
        (v.description || '').toLowerCase().includes(search.toLowerCase());
      
      if (!searchMatch) return false;

      // Cek apakah voucher expired
      const isExpired = v.expiredAt ? new Date(v.expiredAt) < new Date() : false;

      // Debug log untuk NON-AKTIF filter
      if (statusFilter === 'NON-AKTIF') {
        console.log('🔍 Voucher:', v.code, '| isActive:', v.isActive, '| type:', typeof v.isActive);
      }
      
      if (statusFilter === 'SEMUA') return true;
      if (statusFilter === 'AKTIF' || statusFilter === 'active') 
        return v.isActive === true && !isExpired;
      if (statusFilter === 'NON-AKTIF' || statusFilter === 'inactive' || statusFilter === 'nonaktif') 
        return v.isActive === false || v.isActive === 0;
      if (statusFilter === 'KEDALUWARSA' || statusFilter === 'expired') 
        return isExpired;
      
      return true; // fallback untuk filter lain
    });
  }, [vouchers, search, statusFilter]);

  // Real-time calculation of Stats for the 4 Mini Dash Cards (Revision 6 + Auto-expired update)
  const stats = useMemo(() => {
    const activeCount = vouchers.filter(v => getVoucherStatus(v) === 'aktif').length;
    const expiredCount = vouchers.filter(v => getVoucherStatus(v) === 'kedaluwarsa').length;
    const totalUsed = vouchers.reduce((sum, v) => sum + (v.usedCount !== undefined ? v.usedCount : (v.used || 0)), 0);

    const totalDiscount = vouchers.reduce((sum, v) => {
      if (v.discountType === 'fixed' || v.type === 'FIXED') {
        let discountVal = typeof v.discountValue === 'number' ? v.discountValue : 0;
        if (!discountVal && v.discount) {
          discountVal = parseFloat(v.discount.replace(/[^0-9.]/g, '')) || 0;
        }
        const count = v.usedCount !== undefined ? v.usedCount : (v.used || 0);
        return sum + (discountVal * count);
      }
      return sum;
    }, 0);

    return { activeCount, expiredCount, totalUsed, totalDiscount };
  }, [vouchers]);

  const generateRandomCode = () => {
    const prefixes = ['UNI', 'CRM', 'VIP', 'HOT', 'NEW', 'OFF', 'GET'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let suffix = '';
    for (let i = 0; i < 5; i++) {
      suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const code = prefix + suffix;
    
    if (vouchers.some(v => v.code === code)) {
      generateRandomCode();
      return;
    }
    setVoucherForm(prev => ({ ...prev, code }));
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
      toast.success(`Kode '${code}' berhasil disalin!`);
    } catch {
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
      toast.success(`Kode '${code}' disalin!`);
    }
  };

  const handleAddVoucher = async () => {
    // Validasi Zod dulu
    const result = voucherSchema.safeParse({
      code: voucherForm.code,
      discount: voucherForm.discount,
      expiredAt: voucherForm.expiry,
    });

    if (!result.success) {
      const fieldErrors: Record<string, { message: string }> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0] !== undefined) {
          fieldErrors[String(issue.path[0])] = { message: issue.message };
        }
      });
      setErrors(fieldErrors);
      const firstError = result.error.issues[0]?.message;
      if (firstError) toast.error(firstError);
      return;
    }

    // Validasi nilai diskon berdasarkan tipe
    const discount = parseInt(voucherForm.discount);
    const discountType = voucherForm.type;

    if (isNaN(discount)) {
      toast.error('Nilai diskon harus berupa angka');
      return;
    }

    if (discountType === 'PERSENTASE' || discountType === 'percentage') {
      if (discount < 1 || discount > 100) {
        toast.error('Diskon persen harus antara 1 dan 100');
        return;
      }
    } else {
      // FIXED / RUPIAH
      if (discount < 1) {
        toast.error('Nilai diskon harus lebih dari 0');
        return;
      }
    }

    if (vouchers.some(v => v.code === voucherForm.code)) {
      toast.error('Kode kupon sudah terdaftar');
      return;
    }

    try {
      await voucherAPI.create({
        code:        voucherForm.code,
        title:       voucherForm.code,
        description: voucherForm.description || 'Promosi khusus',
        discount:    discount,
        validUntil:  voucherForm.expiry ? new Date(voucherForm.expiry).toISOString() : undefined,
      });

      setIsModalOpen(false);
      setVoucherForm({
        code: '',
        discount: '',
        type: 'PERSENTASE',
        platform: 'Web',
        max: 100,
        expiry: '',
        description: '',
        isActive: true
      });
      setErrors({});
      toast.success('Voucher promosi berhasil dikonfirmasi dan dirilis!');
      refreshVouchers();
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Gagal membuat voucher. Coba lagi.';
      toast.error(message);
    }
  };

  const handleToggleActive = async (id: string) => {
    const target = vouchers.find(v => v.id === id);
    if (!target) return;

    if (getVoucherStatus(target) === 'kedaluwarsa') {
      toast.error('Voucher kedaluwarsa tidak bisa di-aktifkan kembali');
      return;
    }

    const wasActive = target.isActive;

    try {
      await voucherAPI.toggle(id);
      const newStatus = wasActive ? 'dinonaktifkan' : 'diaktifkan';
      toast.success(`Voucher ${target.code} berhasil ${newStatus}`);
      refreshVouchers();
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Gagal mengubah status voucher.';
      toast.error(message);
    }
  };

  const handleDeleteVoucher = async (id: string) => {
    const target = vouchers.find(v => v.id === id);
    try {
      await voucherAPI.delete(id);
      toast.success('Voucher berhasil dihapus!');
      refreshVouchers();
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Gagal menghapus voucher';
      toast.error(message);
    }
  };

  const minDate = getTodayString();

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

        {/* HEADER SECTION (Revision 6 Title Alignment) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div>
            <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Voucher & Promo</h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Buat, kelola, dan pantau efektivitas kupon promosi yang dirilis untuk pelanggan.</p>
          </div>
          <div>
            <GlassButton 
              variant="primary" 
              icon={<Plus size={18} />} 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1A1A1A] hover:bg-[#333333] text-white rounded-xl shadow-md py-3 px-6 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wider"
            >
              Buat Voucher Baru
            </GlassButton>
          </div>
        </div>

        {/* 4 MINI STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: AKTIF */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:scale-[1.01] transition-all duration-200">
            <div className="w-[42px] h-[42px] rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#F59E0B] flex-shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider leading-none">AKTIF</span>
              <span className="text-[20px] font-extrabold text-[#1A1A1A] block mt-1">{stats.activeCount} KUPON</span>
            </div>
          </div>

          {/* Card 2: TERPAKAI */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:scale-[1.01] transition-all duration-200">
            <div className="w-[42px] h-[42px] rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider leading-none">TERPAKAI</span>
              <span className="text-[20px] font-extrabold text-[#1A1A1A] block mt-1">{stats.totalUsed} KALI</span>
            </div>
          </div>

          {/* Card 3: TOTAL DISKON */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:scale-[1.01] transition-all duration-200">
            <div className="w-[42px] h-[42px] rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider leading-none">TOTAL DISKON</span>
              <span className="text-[20px] font-extrabold text-[#1A1A1A] block mt-1">
                Rp {stats.totalDiscount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Card 4: KEDALUWARSA */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:scale-[1.01] transition-all duration-200">
            <div className="w-[42px] h-[42px] rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider leading-none">KEDALUWARSA</span>
              <span className="text-[20px] font-extrabold text-[#1A1A1A] block mt-1">{stats.expiredCount} KUPON</span>
            </div>
          </div>
        </div>

        {/* SEARCH AND QUICK STATUS FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-1">
          <div className="w-full md:w-96 relative bg-white/40 backdrop-blur-md rounded-xl p-0.5 border border-white/80 shadow-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              placeholder="Cari kode kupon..." 
              className="w-full bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
            {['SEMUA', 'AKTIF', 'NON-AKTIF', 'KEDALUWARSA'].map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f as any)}
                className={`
                  px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border-none
                  ${statusFilter === f ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-gray-500 hover:bg-white/40'}
                `}
              >
                {f === 'SEMUA' ? 'Semua' : f === 'AKTIF' ? 'Aktif' : f === 'NON-AKTIF' ? 'Non-Aktif' : 'Kedaluwarsa'}
              </button>
            ))}
          </div>
        </div>

        {/* PROMOTION TABLE */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">KODE KUPON</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">NILAI DISKON</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">TIPE</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">PLATFORM</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider min-w-[200px]">USAGE PROGRESS</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center min-w-[120px]">EXPIRED</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center min-w-[140px]">STATUS</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right w-[100px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((v) => {
                    const status = getVoucherStatus(v);
                    return (
                      <tr 
                        key={v.id} 
                        className={`border-b border-gray-50 transition-colors ${
                          status === 'kedaluwarsa'
                            ? 'bg-red-50/30 hover:bg-red-50/50'
                            : 'hover:bg-gray-50/50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono font-bold text-[14px] tracking-wider uppercase whitespace-nowrap ${
                              status === 'kedaluwarsa' ? 'text-red-400' : 'text-[#F59E0B]'
                            }`}>
                              {v.code}
                            </span>
                            <button 
                              type="button"
                              onClick={() => handleCopy(v.code)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer border-none bg-transparent"
                              title="Salin Kode Kupon"
                            >
                              {copiedCode === v.code ? (
                                <Check size={13} className="text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                              )}
                            </button>

                            {status === 'kedaluwarsa' && (
                              <div className="flex items-center gap-1 bg-red-100 px-2 py-0.5 rounded-full">
                                <AlertCircle className="w-3 h-3 text-red-500" />
                                <span className="text-[10px] text-red-500 font-medium">Expired</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-sm text-[#1A1A1A]">{v.discount}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                            v.type === 'PERSENTASE' 
                              ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          }`}>
                            {v.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-[11px] font-semibold text-gray-400 italic">{v.platform}</td>
                        <td className="px-6 py-4">
                          <div className="space-y-1.5 min-w-[120px]">
                            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 gap-2 whitespace-nowrap">
                              <span>{v.usedCount !== undefined ? v.usedCount : (v.used || 0)} Terpakai</span>
                              <span>Limit {v.max || 100}</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-[#F59E0B] transition-all duration-1000" 
                                style={{ width: `${Math.min(100, ((((v.usedCount !== undefined ? v.usedCount : (v.used || 0))) / (v.max || 100)) * 100))}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-[12px] font-semibold text-gray-400">{v.expiry || v.expiryDate}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            {status === 'kedaluwarsa' ? (
                              <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                                Kedaluwarsa
                              </span>
                            ) : (
                              <>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                  {status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                                </span>
                                <button 
                                  type="button"
                                  onClick={() => handleToggleActive(v.id)}
                                  className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer outline-none border-none p-0 flex-shrink-0 flex items-center ${
                                    v.isActive ? 'bg-[#F59E0B]' : 'bg-gray-200'
                                  }`}
                                >
                                  <span className={`absolute left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                                    v.isActive ? 'translate-x-4' : 'translate-x-0'
                                  }`} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button 
                              type="button"
                              onClick={() => setDeleteId(v.id)}
                              className={`transition-colors cursor-pointer border-none bg-transparent ${
                                status === 'kedaluwarsa'
                                  ? 'text-red-400 hover:text-red-600'
                                  : 'text-gray-400 hover:text-gray-600'
                              }`}
                              title="Hapus Voucher"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-16">
                        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3 text-[#F59E0B]">
                          <Tag className="w-6 h-6" />
                        </div>
                        <h4 className="text-[15px] font-bold text-gray-800 tracking-tight">Tidak ada voucher ditemukan</h4>
                        <p className="text-gray-400 text-xs mt-1">Harap ganti filter status atau kata kunci.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LIST RIWAYAT PENGGUNAAN */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-black text-[#1A1A1A] tracking-widest uppercase">Riwayat Penggunaan Terbaru</h3>
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">KODE KUPON</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">NAMA PELANGGAN</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">PLATFORM</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">TANGGAL</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right w-[140px]">NILAI DISKON</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {([] as any[]).map((h) => (
                    <tr key={h.id} className="hover:bg-gray-50/20 transition-colors">
                      <td className="px-6 py-4 font-mono font-extrabold text-xs text-[#F59E0B] tracking-wide">{h.code}</td>
                      <td className="px-6 py-4 font-bold text-sm text-[#1A1A1A]">{h.customer}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          {h.platform.includes('Mobile') ? <Smartphone size={13} /> : <Globe size={13} />}
                          <span className="text-[12px] font-semibold italic">{h.platform}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[12px] font-semibold text-gray-400">{h.date}</td>
                      <td className="px-6 py-4 text-right font-black text-sm text-green-600">{h.discount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* GENERATE VOUCHER MODAL */}
      <GlassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Buat Voucher Baru"
        size="md"
      >
        <div className="space-y-5">
          {/* Code Generator Section */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">KODE VOUCHER</label>
            <div className="flex gap-2">
              <input 
                placeholder="Input / ketik atau generate kode" 
                className="flex-1 h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-sm text-[#1A1A1A] outline-none focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 transition-all font-mono tracking-widest uppercase font-extrabold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                value={voucherForm.code}
                onChange={(e) => setVoucherForm({ ...voucherForm, code: e.target.value.toUpperCase() })}
              />
              <button 
                type="button"
                onClick={generateRandomCode}
                className="w-[46px] h-[46px] bg-white/50 hover:bg-white border border-white/60 rounded-xl flex items-center justify-center text-gray-600 shadow-sm transition-colors cursor-pointer"
                title="Acak Kode Kupon"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {/* Preview Code */}
          {voucherForm.code && (
            <div className="p-6 bg-gradient-to-r from-amber-50/60 to-orange-50/60 backdrop-blur-md border border-amber-200/40 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm">
              <span className="text-[8px] font-extrabold text-[#D97706] uppercase tracking-widest pl-1">PREVIEW KODE PROMO</span>
              <span className="text-3xl font-mono font-black text-[#1A1A1A] tracking-[0.15em] uppercase">
                {voucherForm.code}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">TIPE DISKON</label>
              <div className="grid grid-cols-2 p-1 bg-white/60 backdrop-blur-[4px] border border-white/80 rounded-xl shadow-sm">
                <button 
                  type="button"
                  onClick={() => setVoucherForm({ ...voucherForm, type: 'PERSENTASE' })}
                  className={`py-2 rounded-lg text-[9px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none ${voucherForm.type === 'PERSENTASE' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:bg-white/40'}`}
                >
                  Persen %
                </button>
                <button 
                  type="button"
                  onClick={() => setVoucherForm({ ...voucherForm, type: 'FIXED' })}
                  className={`py-2 rounded-lg text-[9px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none ${voucherForm.type === 'FIXED' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:bg-white/40'}`}
                >
                  Rupiah Rp
                </button>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">NILAI DISKON</label>
              <input 
                placeholder={voucherForm.type === 'PERSENTASE' ? 'Misal: 10' : 'Misal: 50000'} 
                className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-sm text-[#1A1A1A] outline-none focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                value={voucherForm.discount}
                onChange={(e) => setVoucherForm({ ...voucherForm, discount: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">PLATFORM TERSEDIA</label>
            <div className="flex flex-wrap gap-2">
              {['Web', 'Mobile App', 'Desktop', 'All'].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setVoucherForm({ ...voucherForm, platform: p })}
                  className={`
                    px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border cursor-pointer
                    ${voucherForm.platform === p ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-white/60 text-gray-500 border-white/80 hover:bg-white/95'}
                  `}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">MAKSIMAL PAKAI</label>
              <input 
                type="number" 
                className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-sm text-[#1A1A1A] outline-none focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                value={voucherForm.max.toString()}
                onChange={(e) => setVoucherForm({ ...voucherForm, max: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">TANGGAL EXPIRED</label>
              <div className="relative">
                <CalendarDays size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input 
                  type="date"
                  value={voucherForm.expiry || ''}
                  min={minDate}
                  onChange={e => {
                    // Validasi tambahan: pastikan tidak bisa input manual tanggal lampau
                    const selected = new Date(e.target.value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (selected >= today) {
                      setVoucherForm({
                        ...voucherForm, 
                        expiry: e.target.value
                      });
                    }
                  }}
                  className="w-full h-[46px] pl-10 pr-4 rounded-xl bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none text-xs font-semibold uppercase tracking-widest transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                />
              </div>
              {errors.expiredAt && (
                <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3 h-3" />
                  {errors.expiredAt.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">DESKRIPSI PROMO</label>
            <textarea 
              className="w-full h-20 bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl p-4 text-sm text-[#1A1A1A] outline-none focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 transition-all font-medium resize-none leading-relaxed shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
              placeholder="Deskripsi penawaran / promo..."
              value={voucherForm.description}
              onChange={(e) => setVoucherForm({ ...voucherForm, description: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex gap-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 h-[46px] bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-xs rounded-xl uppercase tracking-widest transition-all cursor-pointer"
            >
              Batal
            </button>
            <button 
              type="button"
              onClick={handleAddVoucher}
              disabled={!voucherForm.code || !voucherForm.discount}
              className="flex-[1.5] h-[46px] bg-[#1A1A1A] hover:bg-[#333333] text-white font-bold text-xs rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              Simpan & Aktifkan
            </button>
          </div>
        </div>
      </GlassModal>

      {/* CONFIRM DELETE MODAL */}
      <GlassModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Konfirmasi Hapus"
        size="sm"
      >
        <div className="space-y-4">
          {deleteId && (() => {
            const voucherToDelete = vouchers.find(v => v.id === deleteId);
            const status = voucherToDelete ? getVoucherStatus(voucherToDelete) : 'aktif';
            return (
              <>
                {status === 'kedaluwarsa' ? (
                  <p className="text-[13px] text-gray-600 leading-relaxed bg-red-50/50 p-3 rounded-xl border border-red-100 font-medium">
                    Voucher ini sudah kedaluwarsa. Apakah Anda yakin ingin menghapusnya dari sistem?
                  </p>
                ) : (
                  <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                    Apakah Anda yakin ingin menghapus voucher <strong className="font-bold text-[#1A1A1A]">{voucherToDelete?.code}</strong> secara permanen?
                  </p>
                )}
                
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setDeleteId(null)}
                    className="flex-1 h-[40px] bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-xs rounded-xl uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (deleteId) {
                        handleDeleteVoucher(deleteId);
                        setDeleteId(null);
                      }
                    }}
                    className="flex-1 h-[40px] bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Ya, Hapus
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      </GlassModal>

    </DashboardLayout>
  );
}
