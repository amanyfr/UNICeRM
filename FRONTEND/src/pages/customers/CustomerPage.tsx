'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Eye, 
  Pencil, 
  Trash2, 
  Plus, 
  Download, 
  Search, 
  Filter, 
  X, 
  Loader2, 
  Inbox, 
  Star, 
  Users,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { customerAPI } from '../../lib/api';

export interface Customer {
  id: number;
  name: string;
  email: string;
  segment: 'prospek' | 'aktif' | 'tidak aktif' | 'VIP';
  csat: number | null;
  lastContact: string;
  totalTickets: number;
  status: 'aktif' | 'nonaktif';
  phone?: string;
  company?: string;
  notes?: string;
}

// ─── Helper: map segment backend → UI ────────────────────────────────────────
function mapSegment(raw: string): Customer['segment'] {
  switch (raw?.toUpperCase()) {
    case 'VIP':          return 'VIP';
    case 'AKTIF':        return 'aktif';
    case 'PROSPEK':      return 'prospek';
    case 'TIDAK_AKTIF':
    case 'TIDAK-AKTIF':  return 'tidak aktif';
    default:             return 'prospek';
  }
}

// Helper: map satu customer dari backend ke format UI
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCustomer(c: any): Customer {
  return {
    id: c.user?.id ?? c.id,
    name: c.user?.name ?? c.name ?? 'Unknown',
    email: c.user?.email ?? c.email ?? '-',
    segment: mapSegment(c.segment),
    csat: c.satisfactionScore ?? null,
    lastContact: c.updatedAt ?? c.createdAt ?? new Date().toISOString(),
    totalTickets: c._count?.tickets ?? c.totalTickets ?? 0,
    status: 'aktif',
    phone: c.phone,
    company: c.company,
    notes: c.notes,
  };
}

export default function CustomerPage() {
  const navigate = useNavigate();

  // Role Detection securely
  let user: any = { name: "Demo User", role: "admin" };
  try {
    const raw = localStorage.getItem('currentUser') || localStorage.getItem('unicerm_user');
    if (raw && raw !== 'undefined') {
      user = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse user in CustomerPage:', e);
  }

  const isAdmin = user.role === 'ADMIN' || user.role === 'admin';
  const isCS = user.role === 'AGENT' || user.role === 'agent' || user.role === 'cs';
  const canEdit = isAdmin || isCS;

  // State Management
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    segment: 'prospek' as Customer['segment'],
    phone: '',
    company: '',
    notes: ''
  });

  // ─── Fetch customers dari backend ────────────────────────────────────────────
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await customerAPI.getAll();
      const raw = response.data?.data ?? response.data ?? [];
      setCustomers(Array.isArray(raw) ? raw.map(mapCustomer) : []);
    } catch (err) {
      console.error('Gagal memuat customers:', err);
      toast.error('Gagal memuat data customer dari server.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshCustomers = useCallback(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Filter Logic
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = !search.trim() ? true : (
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      );
      const matchesSegment = !segmentFilter ? true : (
        c.segment.toLowerCase() === segmentFilter.toLowerCase()
      );
      return matchesSearch && matchesSegment;
    });
  }, [customers, search, segmentFilter]);

  // Checkbox state callbacks (ONLY CS)
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredCustomers.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(x => x !== id));
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus customer ini?')) {
      try {
        await customerAPI.deleteCustomer(id);
        toast.success('Customer berhasil dihapus');
        refreshCustomers();
      } catch (err: any) {
        toast.error('Gagal menghapus customer');
      }
    }
  };

  const handleExportCSV = () => {
    try {
      const headers = ['ID', 'Nama', 'Email', 'Segmen', 'CSAT', 'Interaksi Terakhir', 'Total Tiket', 'Status'];
      const rows = customers.map(c => [
        c.id,
        `"${c.name.replace(/"/g, '""')}"`,
        c.email,
        c.segment,
        c.csat ?? 'N/A',
        c.lastContact,
        c.totalTickets,
        c.status
      ]);
      const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "unimedia_data_customers.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Laporan CSV berhasil diunduh!');
    } catch (e) {
      toast.error('Gagal mengunduh file CSV.');
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      segment: 'prospek',
      phone: '',
      company: '',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c: Customer) => {
    setEditingId(c.id);
    setFormData({
      name: c.name,
      email: c.email,
      segment: c.segment,
      phone: c.phone || '',
      company: c.company || '',
      notes: c.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Harap isi nama dan email pelanggan!');
      return;
    }
    setIsLoading(true);

    if (editingId) {
      try {
        await customerAPI.update(editingId, {
          name: formData.name,
          email: formData.email,
          segment: formData.segment?.toUpperCase() || 'PROSPEK',
          phone: formData.phone || '',
          company: formData.company || ''
        });
        toast.success('Customer berhasil diperbarui!');
        refreshCustomers();
      } catch (err: any) {
        toast.error('Gagal memperbarui customer');
        setIsLoading(false);
        return;
      }
    } else {
      // Tambah customer baru via backend
      try {
        await customerAPI.create({
          name:    formData.name,
          email:   formData.email,
          segment: formData.segment?.toUpperCase() || 'PROSPEK',
          phone:   formData.phone || '',
          company: formData.company || '',
          source:  'Manual',
        });
        toast.success('Customer berhasil ditambahkan! Password default: unicerm123');
        refreshCustomers();
      } catch (err: any) {
        if (err?.response?.status === 409) {
          toast.error('Email sudah terdaftar');
        } else {
          toast.error('Gagal menambahkan customer');
        }
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);
    setIsModalOpen(false);
  };

  const selectionChecked = filteredCustomers.length > 0 && filteredCustomers.every(c => selectedIds.includes(c.id));

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">

        {/* LOADING SPINNER */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-7 h-7 animate-spin text-[#F59E0B]" />
            <span className="ml-3 text-gray-500 font-medium text-[14px]">Memuat data customer...</span>
          </div>
        )}

        {!loading && (<>

        {/* HEADER HALAMAN */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Data Customer
            </h1>
            <p className="text-[14px] text-gray-500 mt-0.5">
              Kelola dan pantau data pelanggan Uni Inside Media.
            </p>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            {canEdit && (
              <button
                onClick={handleOpenAddModal}
                className="bg-[#1A1A1A] hover:bg-neutral-800 text-white px-5 py-3 rounded-xl transition-all duration-200 shadow-md font-bold text-[14px] flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Tambah Customer
              </button>
            )}

            {isAdmin && (
              <button
                onClick={handleExportCSV}
                className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2 text-[14px] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
        </div>

        {/* FILTER & SEARCH */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/80 shadow-sm">
          {/* Search input with focus effects */}
          <div className="relative w-full sm:max-w-[320px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-2xl pl-10 pr-4 text-[13px] outline-none focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 transition-all font-semibold text-[#1A1A1A] shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
            />
          </div>

          {/* Filter Segment Dropdown for exact matching */}
          <div className="w-full sm:w-auto">
            <select 
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="w-full sm:w-auto h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-2xl px-4 text-[13px] outline-none focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 transition-all font-bold text-gray-700 cursor-pointer shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
            >
              <option value="">Semua Segment Dropdown</option>
              <option value="prospek">Prospek</option>
              <option value="aktif">Aktif</option>
              <option value="tidak aktif">Tidak Aktif</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
        </div>

        {/* QUICK SEGMENT FILTERS CHIPS */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: '', label: 'Semua', count: customers.length },
            { id: 'VIP', label: '👑 VIP', count: customers.filter(c => c.segment.toLowerCase() === 'vip').length },
            { id: 'aktif', label: '🟢 Aktif', count: customers.filter(c => c.segment.toLowerCase() === 'aktif').length },
            { id: 'prospek', label: '🔵 Prospek', count: customers.filter(c => c.segment.toLowerCase() === 'prospek').length },
            { id: 'tidak aktif', label: '⚪ Tidak Aktif', count: customers.filter(c => c.segment.toLowerCase() === 'tidak aktif' || c.segment.toLowerCase() === 'tidak-aktif').length },
          ].map((chip) => {
            const isActive = segmentFilter.toLowerCase() === chip.id.toLowerCase();
            return (
              <button
                key={chip.id}
                onClick={() => setSegmentFilter(chip.id)}
                className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl text-[13px] font-bold border transition-all whitespace-nowrap cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
                  isActive 
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
                }`}
              >
                <span>{chip.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* DESKTOP VIEW - TABLE CUSTOMER */}
        <div className="hidden md:block bg-white rounded-3xl border border-gray-200/85 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#1A1A1A]/[0.02] border-b border-gray-200">
                <tr>
                  {canEdit && (
                    <th className="w-10 px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        className="w-4.5 h-4.5 rounded border-gray-300 text-[#F59E0B] focus:ring-0 accent-[#F59E0B] cursor-pointer"
                        checked={selectionChecked}
                        onChange={(e) => toggleSelectAll(e.target.checked)}
                      />
                    </th>
                  )}
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    PELANGGAN
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[150px]">
                    SEGMENT
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[100px] text-center">
                    TIKET
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[100px] text-center">
                    CSAT
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[160px]">
                    TERAKHIR
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[120px] text-right pr-6">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.map((item) => {
                  const initials = (item.name || '?').charAt(0).toUpperCase();
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      {canEdit && (
                        <td className="px-4 py-4 w-10">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-[#F59E0B] focus:ring-0 accent-[#F59E0B] cursor-pointer"
                            checked={isChecked}
                            onChange={(e) => toggleOne(item.id, e.target.checked)}
                          />
                        </td>
                      )}

                      {/* PELANGGAN */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-[38px] h-[38px] rounded-full bg-[#F59E0B] flex items-center justify-center text-[#1A1A1A] font-bold text-[14px] flex-shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[14px] font-semibold text-[#1A1A1A] block truncate">{item.name}</span>
                            <span className="text-[12px] text-gray-400 block truncate">{item.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* SEGMENT */}
                      <td className="px-4 py-4 w-[150px]">
                        {(() => {
                           const seg = item.segment.toLowerCase();
                           let styleClasses = "";
                           if (seg === 'prospek') {
                             styleClasses = "border border-blue-200 text-blue-700 bg-blue-50";
                           } else if (seg === 'aktif') {
                             styleClasses = "border border-green-300 text-green-700 bg-green-50";
                           } else if (seg === 'tidak aktif' || seg === 'tidak-aktif') {
                             styleClasses = "border border-gray-200 text-gray-400 bg-gray-50";
                           } else {
                             styleClasses = "border border-[#F59E0B] text-[#D97706] bg-[#FEF3C7]";
                           }
                           return (
                             <span className={`px-3 py-1 rounded-full text-[12px] font-semibold tracking-wide inline-block leading-none capitalize ${styleClasses}`}>
                               {item.segment}
                             </span>
                           );
                        })()}
                      </td>

                      {/* TIKET */}
                      <td className="px-4 py-4 w-[100px]">
                        <div className="flex items-center gap-1.5 justify-center">
                          <Inbox className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[13px] text-gray-600 font-medium">
                            {item.totalTickets}
                          </span>
                        </div>
                      </td>

                      {/* CSAT */}
                      <td className="px-4 py-4 text-center w-[100px]">
                        {item.csat !== null && item.csat !== undefined ? (
                          <div className="flex items-center gap-1 justify-center">
                            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                            <span className="text-[13px] font-bold text-[#1A1A1A]">
                              {item.csat}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-300">–</span>
                        )}
                      </td>

                      {/* TERAKHIR */}
                      <td className="px-4 py-4 w-[160px]">
                        <span className="text-[13px] text-gray-400 font-medium">
                          {new Date(item.lastContact).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>

                      {/* AKSI */}
                      <td className="px-4 py-4 text-right w-[120px] pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/customers/${item.id}`)}
                            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </button>

                          {canEdit && (
                            <>
                              <button
                                onClick={() => handleOpenEditModal(item)}
                                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                                title="Edit Customer"
                              >
                                <Pencil className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                                title="Hapus Customer"
                              >
                                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={canEdit ? 7 : 6} className="text-center py-20 bg-gray-50/20">
                      <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-[#F59E0B] border border-amber-100 animate-pulse">
                        <Users className="w-8 h-8" />
                      </div>
                      <h4 className="text-[16px] font-bold text-gray-800 tracking-tight">Tidak ada data customer</h4>
                      <p className="text-gray-400 text-xs mt-1.5 max-w-sm mx-auto">
                        Coba sesuaikan kata kunci pencarian atau segment filter Anda.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARD VIEW - FULLY RESPONSIVE CARD SYSTEM */}
        <div className="block md:hidden space-y-4">
          {filteredCustomers.map((item) => {
          const initials = (item.name || '?').charAt(0).toUpperCase();
            const isChecked = selectedIds.includes(item.id);
            
            // Segment styles
            const seg = item.segment.toLowerCase();
            let segmentBadge = null;
            if (seg === 'prospek') {
              segmentBadge = <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-blue-200 text-blue-700 bg-blue-50 capitalize">Prospek</span>;
            } else if (seg === 'aktif') {
              segmentBadge = <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-green-200 text-green-700 bg-green-50 capitalize">Aktif</span>;
            } else if (seg === 'tidak aktif' || seg === 'tidak-aktif') {
              segmentBadge = <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-gray-200 text-gray-400 bg-gray-50 capitalize">Tidak Aktif</span>;
            } else {
              segmentBadge = <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-[#F59E0B] text-[#D97706] bg-[#FEF3C7] capitalize">VIP</span>;
            }

            return (
              <div 
                key={item.id}
                className={`bg-white rounded-3xl border border-gray-150 p-5 shadow-sm space-y-4 transition-all duration-200 ${
                  isChecked ? 'ring-2 ring-[#F59E0B]/35 border-[#F59E0B]' : 'hover:border-gray-300'
                }`}
              >
                {/* Header item */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {canEdit && (
                      <input
                        type="checkbox"
                        className="w-4.5 h-4.5 rounded border-gray-300 text-[#F59E0B] focus:ring-0 accent-[#F59E0B] cursor-pointer flex-shrink-0"
                        checked={isChecked}
                        onChange={(e) => toggleOne(item.id, e.target.checked)}
                      />
                    )}
                    <div className="w-[38px] h-[38px] rounded-full bg-[#F59E0B] flex items-center justify-center text-[#1A1A1A] font-bold text-[14px] flex-shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[14px] font-bold text-[#1A1A1A] truncate leading-tight">{item.name}</h4>
                      <p className="text-[12px] text-gray-400 truncate mt-0.5">{item.email}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => navigate(`/customers/${item.id}`)}
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                      title="Detail"
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    {canEdit && (
                      <>
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="h-[1px] bg-gray-100" />

                {/* Details layout */}
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-[12px]">
                  <div>
                    <span className="text-gray-400 block text-[9.5px] uppercase font-black tracking-wider mb-1">Segment</span>
                    {segmentBadge}
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9.5px] uppercase font-black tracking-wider mb-1">Terakhir Kontak</span>
                    <span className="text-neutral-700 font-bold">
                      {new Date(item.lastContact).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9.5px] uppercase font-black tracking-wider mb-1">Total Tiket</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Inbox className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-neutral-700 font-bold">{item.totalTickets} Tiket</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9.5px] uppercase font-black tracking-wider mb-1">Kepuasan (CSAT)</span>
                    {item.csat !== null && item.csat !== undefined ? (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                        <span className="text-neutral-700 font-extrabold">{item.csat} / 5.0</span>
                      </div>
                    ) : (
                      <span className="text-gray-300 font-semibold">—</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredCustomers.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
              <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3 text-[#F59E0B] border border-amber-150 animate-pulse">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-[15px] font-bold text-gray-800">Tidak ada data customer</h4>
              <p className="text-gray-400 text-xs mt-1 px-4 max-w-xs mx-auto">
                Coba sesuaikan kata kunci pencarian Anda.
              </p>
            </div>
          )}
        </div>

        {/* BULK ACTIONS (ADMIN & AGENT) */}
        {canEdit && selectedIds.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-[24px] p-2 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-4 px-4 select-none">
                <span className="text-sm font-bold text-white">{selectedIds.length} customer terpilih</span>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  className="bg-zinc-800 text-white text-[12px] font-semibold border-none outline-none px-3 h-[38px] rounded-xl cursor-pointer hover:bg-zinc-700 transition-all text-center"
                  onChange={(e) => {
                    const nextSegment = e.target.value as Customer['segment'];
                    if (nextSegment) {
                      setCustomers(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, segment: nextSegment } : c));
                      setSelectedIds([]);
                      toast.success(`Segment terpilih berhasil diubah ke ${nextSegment}`);
                    }
                  }}
                  value=""
                >
                  <option value="" disabled>Pindah Segment</option>
                  <option value="prospek">Prospek</option>
                  <option value="aktif">Aktif</option>
                  <option value="tidak aktif">Tidak Aktif</option>
                  <option value="VIP">VIP</option>
                </select>
                
                <button 
                  onClick={async () => {
                    if (!window.confirm(`Hapus ${selectedIds.length} customer yang dipilih?`)) return;
                    try {
                      await Promise.all(selectedIds.map(id => customerAPI.deleteCustomer(id)));
                      toast.success(`${selectedIds.length} customer berhasil dihapus`);
                      setSelectedIds([]);
                      refreshCustomers();
                    } catch (err: any) {
                      toast.error('Gagal menghapus beberapa customer');
                    }
                  }}
                  className="px-4 h-[38px] text-[12px] font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus
                </button>
                
                <button 
                  onClick={() => setSelectedIds([])}
                  className="w-10 h-[38px] rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL - ADMIN & AGENT */}
        {canEdit && isModalOpen && (
          <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-3xl border border-white/70 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-2xl w-full max-w-[480px] relative overflow-hidden transition-all transform scale-100 p-1 animate-glass">
              
              {/* HEADER modal */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/60">
                <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                  {editingId ? "Edit Customer" : "Tambah Customer"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-white/40 hover:bg-white/80 border border-white/60 transition-colors w-[32px] h-[32px] flex items-center justify-center text-gray-500 cursor-pointer animate-pulse"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-5 space-y-4">
                  
                  {/* NAMA LENGKAP */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      NAMA LENGKAP*
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-900 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      EMAIL*
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="username@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-900 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    />
                  </div>

                  {/* SEGMEN */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      SEGMEN*
                    </label>
                    <select
                      value={formData.segment}
                      onChange={(e) => setFormData(p => ({ ...p, segment: e.target.value as Customer['segment'] }))}
                      className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-950 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold cursor-pointer shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    >
                      <option value="prospek">Prospek</option>
                      <option value="aktif">Aktif</option>
                      <option value="tidak aktif">Tidak Aktif</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>

                  {/* NOMOR HP */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      NOMOR HP
                    </label>
                    <input 
                      type="text"
                      placeholder="08123456789"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-900 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    />
                  </div>

                  {/* PERUSAHAAN */}
                  <div>
                    <label className="uppercase text-[11px] text-gray-400 tracking-wider font-bold block mb-1">
                      PERUSAHAAN
                    </label>
                    <input 
                      type="text"
                      placeholder="Nama perusahaan"
                      value={formData.company}
                      onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                      className="w-full h-[46px] bg-white/60 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border border-white/85 rounded-xl px-4 text-[14px] text-neutral-900 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all font-semibold shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.015)]"
                    />
                  </div>

                </div>

                {/* FOOTER modal */}
                <div className="flex gap-3 justify-end px-6 py-4 border-t border-white/60">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="border border-white/60 rounded-xl px-5 py-2.5 bg-white/40 hover:bg-white/80 text-gray-600 font-semibold text-[13px] hover:text-gray-900 cursor-pointer transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#F59E0B] text-[#1A1A1A] font-bold rounded-xl px-6 py-2.5 hover:bg-amber-500 transition-colors text-[13px] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{isLoading ? 'Menyimpan...' : 'Simpan'}</span>
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
