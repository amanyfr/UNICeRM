'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Pencil, 
  X, 
  Save, 
  Loader2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { toast } from 'sonner';
import { customerAPI, authAPI } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export default function PortalProfile() {
  const { user: authUser } = useAuth();

  const [formData, setFormData] = useState({
    name:    authUser?.name    || '',
    email:   authUser?.email   || '',
    phone:   '',
    address: '',
    company: '',
  });

  const [isSaving, setIsSaving]   = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // ─── State ganti password ──────────────────────────────────────────────────
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword:     '',
    newPassword:     '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showOld, setShowOld]         = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initial = formData.name ? formData.name.charAt(0).toUpperCase() : 'C';

  // ─── Fetch profil dari backend ──────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res  = await customerAPI.getMe();
      const data = res.data?.data ?? res.data;
      if (data) {
        setFormData({
          name:    data.user?.name    ?? data.name    ?? authUser?.name    ?? '',
          email:   data.user?.email   ?? data.email   ?? authUser?.email   ?? '',
          phone:   data.phone         ?? '',
          address: data.address       ?? '',
          company: data.company       ?? '',
        });
      }
    } catch {
      // Fallback ke data auth jika endpoint belum tersedia
    }
  }, [authUser]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await customerAPI.updateMe({
        name:    formData.name,
        phone:   formData.phone,
        address: formData.address,
        company: formData.company || '',
      });
      setIsEditing(false);
      toast.success('Profil berhasil diperbarui!');
      fetchProfile(); // refresh dari backend
    } catch {
      toast.error('Gagal menyimpan perubahan');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password baru dan konfirmasi password tidak sama');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password baru minimal 8 karakter');
      return;
    }

    setPasswordLoading(true);
    try {
      await authAPI.changePassword(passwordData);
      toast.success('Password berhasil diubah!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      setShowOld(false);
      setShowNew(false);
      setShowConfirm(false);
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? '';
      if (err?.response?.status === 400 && msg.toLowerCase().includes('lama')) {
        toast.error('Password lama tidak sesuai');
      } else {
        toast.error('Gagal mengubah password');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <PortalLayout>
      <div className="min-h-[calc(100vh-56px)] p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* HEADER */}
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Profil Saya
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Kolom 1 — KARTU PROFIL */}
            <div className="bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[22px] p-6 text-center">
              {/* Avatar */}
              <div className="w-[80px] h-[80px] mx-auto rounded-[20px] bg-gradient-to-tr from-[#F59E0B] to-[#FDE68A] flex items-center justify-center text-[#1A1A1A] font-bold text-[32px] shadow-[0_8px_24px_rgba(245,158,11,0.35),inset_0_2px_0_rgba(255,255,255,0.25)] select-none">
                {initial}
              </div>
              
              <h2 className="text-[20px] font-bold text-[#1A1A1A] mt-5 leading-tight">
                {formData.name}
              </h2>
              <p className="text-[14px] text-gray-500 mt-1 truncate">
                {formData.email}
              </p>
              
              <div className="mt-3">
                <span className="bg-white/60 backdrop-blur-sm border border-white/70 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-gray-600 text-[12px] font-semibold px-3 py-1 rounded-full select-none">
                  Customer
                </span>
              </div>

              {/* STATS */}
              <div className="border-t border-white/60 mt-6 pt-4 grid grid-cols-2 gap-3 select-none relative before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-200/50 before:to-transparent">
                <div className="text-center">
                  <span className="text-[20px] font-bold text-[#1A1A1A] block">
                    5
                  </span>
                  <span className="text-[12px] text-gray-400 font-medium">
                    Tiket
                  </span>
                </div>
                <div className="text-center border-l border-white/60">
                  <span className="text-[20px] font-bold text-[#1A1A1A] block">
                    4.2
                  </span>
                  <span className="text-[12px] text-gray-400 font-medium">
                    Avg CSAT
                  </span>
                </div>
              </div>
            </div>

            {/* Kolom 2+3 — FORM EDIT PROFIL */}
            <div className="bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[22px] p-5 sm:p-6 md:p-8 lg:col-span-2 relative">
              
              {/* Form header & toggle */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-[20px] font-bold text-[#1A1A1A]">
                  Edit Profil
                </h2>

                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white/60 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all cursor-pointer select-none active:scale-[0.98]"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 text-red-500" />
                      <span className="text-red-600">Batal</span>
                    </>
                  ) : (
                    <>
                      <Pencil className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">Edit</span>
                    </>
                  )}
                </button>
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Field 1 "NAMA LENGKAP" */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-400/80 uppercase tracking-wider block mb-1.5 select-none">
                      NAMA LENGKAP
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full h-[48px] rounded-xl pl-10 pr-4 text-[14px] text-[#1A1A1A] outline-none transition-all border ${
                          isEditing
                            ? 'bg-white/60 backdrop-blur-md border-white/80 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 shadow-inner'
                            : 'bg-white/20 border-white/30 cursor-not-allowed text-gray-500 shadow-none opacity-80'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Field 2 "EMAIL" */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-400/80 uppercase tracking-wider block mb-1.5 select-none">
                      EMAIL
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full h-[48px] rounded-xl pl-10 pr-4 text-[14px] text-[#1A1A1A] outline-none transition-all border ${
                          isEditing
                            ? 'bg-white/60 backdrop-blur-md border-white/80 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 shadow-inner'
                            : 'bg-white/20 border-white/30 cursor-not-allowed text-gray-500 shadow-none opacity-80'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Field 3 "NOMOR TELEPON" */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-400/80 uppercase tracking-wider block mb-1.5 select-none">
                      NOMOR TELEPON
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full h-[48px] rounded-xl pl-10 pr-4 text-[14px] text-[#1A1A1A] outline-none transition-all border ${
                          isEditing
                            ? 'bg-white/60 backdrop-blur-md border-white/80 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 shadow-inner'
                            : 'bg-white/20 border-white/30 cursor-not-allowed text-gray-500 shadow-none opacity-80'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Field 4 "ALAMAT" (col-span-2) */}
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-gray-400/80 uppercase tracking-wider block mb-1.5 select-none">
                      ALAMAT
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full h-[48px] rounded-xl pl-10 pr-4 text-[14px] text-[#1A1A1A] outline-none transition-all border ${
                          isEditing
                            ? 'bg-white/60 backdrop-blur-md border-white/80 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 shadow-inner'
                            : 'bg-white/20 border-white/30 cursor-not-allowed text-gray-500 shadow-none opacity-80'
                        }`}
                      />
                    </div>
                  </div>

                </div>

                {/* Ssaving button */}
                {isEditing && (
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="mt-6 bg-[#F59E0B]/90 backdrop-blur-md border border-[#F59E0B]/50 hover:bg-[#F59E0B] shadow-[0_4px_16px_rgba(245,158,11,0.3),inset_0_2px_0_rgba(255,255,255,0.2)] disabled:opacity-50 text-[#1A1A1A] font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer select-none active:scale-[0.98]"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#1A1A1A]" />
                        <span className="text-[#1A1A1A]">Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-[#1A1A1A]" />
                        <span className="text-[#1A1A1A]">Simpan Perubahan</span>
                      </>
                    )}
                  </button>
                )}
              </form>

              {/* ─── SECTION GANTI PASSWORD ─────────────────────────────── */}
              <div className="mt-8 pt-6 border-t border-white/60">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-[20px] font-bold text-[#1A1A1A]">
                    Ganti Password
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(!showPasswordForm);
                      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                      setShowOld(false);
                      setShowNew(false);
                      setShowConfirm(false);
                    }}
                    className="flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white/60 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all cursor-pointer select-none active:scale-[0.98]"
                  >
                    {showPasswordForm ? (
                      <>
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-red-600">Batal</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Ganti Password</span>
                      </>
                    )}
                  </button>
                </div>

                {showPasswordForm && (
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Password Lama */}
                      <div className="md:col-span-2">
                        <label className="text-[11px] font-bold text-gray-400/80 uppercase tracking-wider block mb-1.5 select-none">
                          PASSWORD LAMA
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showOld ? 'text' : 'password'}
                            required
                            placeholder="Masukkan password lama"
                            value={passwordData.oldPassword}
                            onChange={e => setPasswordData(p => ({ ...p, oldPassword: e.target.value }))}
                            className="w-full h-[48px] rounded-xl pl-10 pr-10 text-[14px] text-[#1A1A1A] outline-none transition-all border bg-white/60 backdrop-blur-md border-white/80 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOld(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            tabIndex={-1}
                          >
                            {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Password Baru */}
                      <div>
                        <label className="text-[11px] font-bold text-gray-400/80 uppercase tracking-wider block mb-1.5 select-none">
                          PASSWORD BARU <span className="text-gray-300 normal-case font-normal">(min. 8 karakter)</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showNew ? 'text' : 'password'}
                            required
                            minLength={8}
                            placeholder="Password baru"
                            value={passwordData.newPassword}
                            onChange={e => setPasswordData(p => ({ ...p, newPassword: e.target.value }))}
                            className="w-full h-[48px] rounded-xl pl-10 pr-10 text-[14px] text-[#1A1A1A] outline-none transition-all border bg-white/60 backdrop-blur-md border-white/80 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            tabIndex={-1}
                          >
                            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Konfirmasi Password Baru */}
                      <div>
                        <label className="text-[11px] font-bold text-gray-400/80 uppercase tracking-wider block mb-1.5 select-none">
                          KONFIRMASI PASSWORD BARU
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showConfirm ? 'text' : 'password'}
                            required
                            placeholder="Ulangi password baru"
                            value={passwordData.confirmPassword}
                            onChange={e => setPasswordData(p => ({ ...p, confirmPassword: e.target.value }))}
                            className={`w-full h-[48px] rounded-xl pl-10 pr-10 text-[14px] text-[#1A1A1A] outline-none transition-all border bg-white/60 backdrop-blur-md shadow-inner ${
                              passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword
                                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200'
                                : 'border-white/80 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            tabIndex={-1}
                          >
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                          <p className="text-[11px] text-red-500 mt-1 font-medium">Password tidak sama</p>
                        )}
                      </div>

                    </div>

                    {/* Tombol aksi */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="submit"
                        disabled={passwordLoading}
                        className="bg-[#F59E0B]/90 backdrop-blur-md border border-[#F59E0B]/50 hover:bg-[#F59E0B] shadow-[0_4px_16px_rgba(245,158,11,0.3),inset_0_2px_0_rgba(255,255,255,0.2)] disabled:opacity-50 text-[#1A1A1A] font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer select-none active:scale-[0.98]"
                      >
                        {passwordLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Password</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false);
                          setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                        }}
                        className="flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl px-5 py-3 text-[13px] font-semibold text-gray-600 hover:bg-white/60 transition-all cursor-pointer select-none active:scale-[0.98]"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </PortalLayout>
  );
}
