'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  UserCircle, 
  Users2, 
  Mail, 
  Phone, 
  Briefcase, 
  Info, 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  Loader2,
  Plus,
  UserCheck
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { agentAPI } from '../../lib/api';
import { getInitials } from '../../lib/utils/user';

// Define Interface for Users tab
interface UserItem {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'cs' | 'agent';
  position: string;
  isActive: boolean;
  createdAt: string;
  avatar?: string;
}

const DUMMY_CS_USERS: UserItem[] = [
  {
    id: 'cs-001',
    name: 'Customer Service UNICeRM',
    email: 'cs@uniinside.id',
    role: 'cs',
    position: 'Customer Service Agent',
    isActive: true,
    createdAt: '2024-01-15',
    avatar: 'CU',
  },
];

// Validation schema helper
const getFormSchema = (isEdit: boolean) => {
  return z.object({
    nama: z.string().min(3, 'Nama Lengkap minimal 3 karakter'),
    email: z.string().email('Format email tidak valid'),
    password: isEdit 
      ? z.string().optional() 
      : z.string().min(8, 'Kata sandi minimal 8 karakter'),
    jabatan: z.string().optional().default('Customer Service Agent'),
    isActive: z.boolean().default(true),
  });
};

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const raw = localStorage.getItem('currentUser') || localStorage.getItem('unicerm_user');
      if (raw && raw !== 'undefined') {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error(e);
    }
    return { name: 'Demo User', role: 'admin' };
  });

  const isAdmin = currentUser.role === 'admin';

  const ALL_TABS = React.useMemo(() => [
    {
      id: 'profile',
      label: 'PROFIL SAYA',
      icon: UserCircle,
      adminOnly: false
    },
    {
      id: 'users',
      label: 'MANAJEMEN CS/AGENT',
      icon: Users2,
      adminOnly: true
    },
  ], []);

  const availableTabs = React.useMemo(() => {
    return ALL_TABS.filter(t => !t.adminOnly || isAdmin);
  }, [ALL_TABS, isAdmin]);

  const [activeTab, setActiveTab] = useState('profile');

  // Handle URL tabs / parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const validTabs = availableTabs.map(t => t.id);
    
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [availableTabs]);

  const [users, setUsers] = useState<UserItem[]>([]);

  // Handle active role synchronization with topbar changes
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const raw = localStorage.getItem('currentUser') || localStorage.getItem('unicerm_user');
        if (raw) {
          const u = JSON.parse(raw);
          setCurrentUser(u);
        }
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'profile':
        return <ProfileTab user={currentUser} />;
      case 'users':
        if (!isAdmin) return <ProfileTab user={currentUser} />;
        return <UsersTab users={users} setUsers={setUsers} />;
      default:
        return <ProfileTab user={currentUser} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        
        {/* TITLE HEADER */}
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Pengaturan Sistem
          </h1>
          <p className="text-[14px] text-gray-500 mt-0.5">
            Konfigurasi profil personal, template pesan terintegrasi, dan manajemen operasional internal CRM.
          </p>
        </div>

        {/* SETTINGS LAYOUT CONTAINER */}
        {availableTabs.length > 1 ? (
          <div className="flex flex-col lg:flex-row gap-6 min-h-[600px] items-start">
            {/* NAV KIRI */}
            <div className="w-full lg:w-[200px] flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-200 p-3 h-fit shadow-xs">
                {availableTabs.map(tab => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <div
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all mb-1 select-none font-bold text-[13px] ${
                        isActive
                          ? 'bg-[#F59E0B] text-[#1A1A1A] shadow-md'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#1A1A1A]' : 'text-gray-400'}`} />
                      <span>{tab.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KONTEN KANAN */}
            <div className="flex-1 w-full bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              {renderTabContent(activeTab)}
            </div>
          </div>
        ) : (
          <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            {renderTabContent('profile')}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

// ==========================================
// TAB: PROFIL SAYA
// ==========================================
interface ProfileTabProps {
  user: any;
}
function ProfileTab({ user }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Auto edit if passing ?tab=profile (or specifically trying to edit in this case, but tab=profile implies this tab, you could use ?edit=true, but prompt says "Jika datang dari URL ?tab=profile (dari popup): auto set isEditing = true")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'profile') {
      setIsEditing(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+62 812-3456-7890',
    jabatan: user?.jabatan || (user?.role === 'admin' ? 'Product Manager' : 'Customer Service Agent'),
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+62 812-3456-7890',
        jabatan: user.jabatan || (user.role === 'admin' ? 'Product Manager' : 'Customer Service Agent'),
      });
    }
  }, [user]);

  const isUserAdmin = user.role === 'admin';
  const initials = getInitials(user.name);

  const displayRole = user.role === 'admin' ? 'Admin' : 'CS/Agent';

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Nama dan Email wajib diisi!');
      return;
    }
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 900));

    const savedUserStr = localStorage.getItem('currentUser') || '{}';
    const currUser = JSON.parse(savedUserStr);
    const updated = { 
      ...currUser, 
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      jabatan: formData.jabatan
    };

    localStorage.setItem('currentUser', JSON.stringify(updated));
    localStorage.setItem('unicerm_user', JSON.stringify(updated));

    setIsSaving(false);
    setIsEditing(false);
    toast.success('Profil berhasil disimpan!');
    
    // Clear the edit flag from URL so refresh doesn't pop edit again
    const url = new URL(window.location.href);
    window.history.pushState({}, '', url.pathname); // clear params to stop auto-edit

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div 
      id="tab-content-profile"
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: '0.5px solid rgba(255,255,255,0.82)',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: `
          0 12px 40px rgba(245,159,11,0.07),
          0 4px 12px rgba(0,0,0,0.05),
          inset 0 1px 0 rgba(255,255,255,0.95)
        `,
      }}
    >
      
      {/* HEADER PROFIL */}
      <div 
        style={{
          background: `linear-gradient(135deg,
            rgba(245,197,24,0.12) 0%,
            rgba(255,248,220,0.20) 50%,
            rgba(245,159,11,0.08) 100%)`,
          borderBottom: '0.5px solid rgba(245,197,24,0.15)',
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className="flex-col sm:flex-row gap-4"
      >
        {/* KIRI header (flex items-center gap-5) */}
        <div className="flex items-center gap-5 text-left">
          {/* Avatar 72px rounded-[18px] */}
          <div 
            style={{
              width: 72, 
              height: 72, 
              borderRadius: 18,
              background: 'linear-gradient(135deg,#F59E0B,#F5C518)',
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center', 
              flexShrink: 0,
              boxShadow: `
                0 8px 24px rgba(245,159,11,0.38),
                inset 0 1px 0 rgba(255,255,255,0.30)
              `,
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
              {initials}
            </span>
          </div>

          {/* div teks info */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>
              {user.name || 'Petugas CRM'}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(26,26,26,0.50)', marginBottom: 10, fontStyle: 'italic' }}>
              Sistem Peran: {displayRole}
            </p>

            {/* BADGES (flex gap-2) */}
            <div className="flex gap-2">
              <span 
                style={{
                  fontSize: 11, 
                  fontWeight: 700,
                  padding: '4px 12px', 
                  borderRadius: 99,
                  background: 'rgba(255,255,255,0.70)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(34,197,94,0.45)',
                  color: '#16a34a',
                  letterSpacing: '0.05em',
                }}
              >
                VERIFIED
              </span>
              <span 
                style={{
                  fontSize: 11, 
                  fontWeight: 700,
                  padding: '4px 12px', 
                  borderRadius: 99,
                  letterSpacing: '0.05em',
                  border: isUserAdmin ? '1px solid rgba(245,159,11,0.50)' : '1px solid rgba(59,130,246,0.45)',
                  color: isUserAdmin ? '#D97706' : '#2563EB',
                  background: isUserAdmin ? 'rgba(245,197,24,0.10)' : 'rgba(59,130,246,0.08)'
                }}
              >
                {displayRole}
              </span>
            </div>
          </div>
        </div>

        {/* KANAN header — tombol Edit Profil */}
        <div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: 7,
                padding: '9px 18px',
                background: 'rgba(255,255,255,0.70)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '0.5px solid rgba(255,255,255,0.90)',
                borderRadius: 12,
                fontSize: 13, 
                fontWeight: 600, 
                color: '#1A1A1A',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
              }}
              className="hover:!bg-[rgba(255,255,255,0.90)] hover:!shadow-[0_4px_16px_rgba(245,159,11,0.14)] hover:!border-[rgba(245,159,11,0.35)] duration-200 transition-all font-semibold"
            >
              <Pencil className="w-4 h-4 text-gray-500" />
              <span>Edit Profil</span>
            </button>
          )}
        </div>
      </div>

      {/* BODY PROFIL */}
      <div style={{ padding: '28px 32px' }}>
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 18 }}>
              Edit Informasi Profil
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
              {/* Field 1: NAMA LENGKAP */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label 
                  style={{ 
                    fontSize: 10, 
                    fontWeight: 700,
                    color: 'rgba(26,26,26,0.40)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.09em' 
                  }}
                >
                  NAMA LENGKAP
                </label>
                <div style={{ position: 'relative' }}>
                  <UserCircle 
                    className="absolute w-4 h-4" 
                    style={{ 
                      left: 14, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: 'rgba(26,26,26,0.28)' 
                    }} 
                  />
                  <input 
                    type="text"
                    required
                    style={{
                      width: '100%', 
                      height: 48,
                      background: 'rgba(255,255,255,0.65)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '0.5px solid rgba(255,255,255,0.85)',
                      borderRadius: 14,
                      padding: '0 16px 0 40px',
                      fontSize: 14, 
                      color: '#1A1A1A',
                      outline: 'none',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                    }}
                    className="focus:!bg-[rgba(255,255,255,0.90)] focus:!border-[rgba(245,159,11,0.45)] focus:shadow-[0_0_0_3px_rgba(245,159,11,0.10)] focus:ring-4 focus:ring-transparent focus:outline-none font-semibold"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Field 2: ALAMAT EMAIL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label 
                  style={{ 
                    fontSize: 10, 
                    fontWeight: 700,
                    color: 'rgba(26,26,26,0.40)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.09em' 
                  }}
                >
                  ALAMAT EMAIL
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail 
                    className="absolute w-4 h-4" 
                    style={{ 
                      left: 14, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: 'rgba(26,26,26,0.28)' 
                    }} 
                  />
                  <input 
                    type="email"
                    disabled={true}
                    style={{
                      width: '100%', 
                      height: 48,
                      border: '0.5px solid rgba(255,255,255,0.85)',
                      borderRadius: 14,
                      padding: '0 16px 0 40px',
                      fontSize: 14, 
                      outline: 'none',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                      background: 'rgba(245,245,245,0.60)',
                      color: 'rgba(26,26,26,0.40)',
                      cursor: 'not-allowed',
                    }}
                    className="font-semibold"
                    value={formData.email}
                  />
                  <span 
                    style={{ 
                      position: 'absolute', 
                      right: 14, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      fontSize: 10, 
                      color: 'rgba(26,26,26,0.35)',
                      pointerEvents: 'none'
                    }}
                  >
                    Tidak dapat diubah
                  </span>
                </div>
              </div>

              {/* Field 3: NOMOR TELEPON */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label 
                  style={{ 
                    fontSize: 10, 
                    fontWeight: 700,
                    color: 'rgba(26,26,26,0.40)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.09em' 
                  }}
                >
                  NOMOR TELEPON
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone 
                    className="absolute w-4 h-4" 
                    style={{ 
                      left: 14, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: 'rgba(26,26,26,0.28)' 
                    }} 
                  />
                  <input 
                    type="text"
                    style={{
                      width: '100%', 
                      height: 48,
                      background: 'rgba(255,255,255,0.65)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '0.5px solid rgba(255,255,255,0.85)',
                      borderRadius: 14,
                      padding: '0 16px 0 40px',
                      fontSize: 14, 
                      color: '#1A1A1A',
                      outline: 'none',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                    }}
                    className="focus:!bg-[rgba(255,255,255,0.90)] focus:!border-[rgba(245,159,11,0.45)] focus:shadow-[0_0_0_3px_rgba(245,159,11,0.10)] focus:ring-4 focus:ring-transparent focus:outline-none font-semibold"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Field 4: JABATAN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label 
                  style={{ 
                    fontSize: 10, 
                    fontWeight: 700,
                    color: 'rgba(26,26,26,0.40)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.09em' 
                  }}
                >
                  JABATAN
                </label>
                <div style={{ position: 'relative' }}>
                  <Briefcase 
                    className="absolute w-4 h-4" 
                    style={{ 
                      left: 14, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: 'rgba(26,26,26,0.28)' 
                    }} 
                  />
                  <input 
                    type="text"
                    style={{
                      width: '100%', 
                      height: 48,
                      background: 'rgba(255,255,255,0.65)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '0.5px solid rgba(255,255,255,0.85)',
                      borderRadius: 14,
                      padding: '0 16px 0 40px',
                      fontSize: 14, 
                      color: '#1A1A1A',
                      outline: 'none',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                    }}
                    className="focus:!bg-[rgba(255,255,255,0.90)] focus:!border-[rgba(245,159,11,0.45)] focus:shadow-[0_0_0_3px_rgba(245,159,11,0.10)] focus:ring-4 focus:ring-transparent focus:outline-none font-semibold"
                    value={formData.jabatan}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* TOMBOL FOOTER */}
            <div 
              style={{ 
                display: 'flex', 
                gap: 10,
                justifyContent: 'flex-end', 
                marginTop: 24,
                paddingTop: 20,
                borderTop: '0.5px solid rgba(255,255,255,0.60)' 
              }}
            >
              <button 
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '+62 812-3456-7890',
                    jabatan: user?.jabatan || (user?.role === 'admin' ? 'Product Manager' : 'Customer Service Agent'),
                  });
                  const url = new URL(window.location.href);
                  window.history.pushState({}, '', url.pathname);
                }}
                style={{
                  padding: '10px 22px', 
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.60)',
                  backdropFilter: 'blur(8px)',
                  border: '0.5px solid rgba(255,255,255,0.80)',
                  fontSize: 13, 
                  fontWeight: 600, 
                  color: '#1A1A1A',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease',
                }}
                className="hover:bg-white/80 transition-all font-semibold"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                style={{
                  padding: '10px 24px', 
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#F59E0B,#F5C518)',
                  border: 'none',
                  fontSize: 13, 
                  fontWeight: 700, 
                  color: '#1A1A1A',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(245,159,11,0.35)',
                  transition: 'all 0.2s ease',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 7,
                  opacity: isSaving ? 0.8 : 1,
                }}
                className="hover:translate-y-[-1px] hover:shadow-[0_8px_22px_rgba(245,159,11,0.42)] transition-all font-extrabold select-none disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{isSaving ? 'Menyimpan...' : 'Simpan Profil'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
            {/* Field 1: NAMA LENGKAP */}
            <div 
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.75)',
                borderRadius: 16,
                padding: '16px 18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease',
              }}
              className="hover:!bg-[rgba(255,255,255,0.75)] hover:!border-[rgba(245,159,11,0.20)] transition-all"
            >
              <label 
                style={{ 
                  fontSize: 10, 
                  fontWeight: 700,
                  color: 'rgba(26,26,26,0.38)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.09em',
                  display: 'block', 
                  marginBottom: 10 
                }}
              >
                NAMA LENGKAP
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserCircle className="w-4.5 h-4.5" style={{ color: 'rgba(26,26,26,0.35)' }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
                  {user.name || 'Petugas CRM'}
                </span>
              </div>
            </div>

            {/* Field 2: ALAMAT EMAIL */}
            <div 
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.75)',
                borderRadius: 16,
                padding: '16px 18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease',
              }}
              className="hover:!bg-[rgba(255,255,255,0.75)] hover:!border-[rgba(245,159,11,0.20)] transition-all"
            >
              <label 
                style={{ 
                  fontSize: 10, 
                  fontWeight: 700,
                  color: 'rgba(26,26,26,0.38)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.09em',
                  display: 'block', 
                  marginBottom: 10 
                }}
              >
                ALAMAT EMAIL
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail className="w-4.5 h-4.5" style={{ color: 'rgba(26,26,26,0.35)' }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
                  {user.email || 'user@uniinside.id'}
                </span>
              </div>
            </div>

            {/* Field 3: NOMOR TELEPON */}
            <div 
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.75)',
                borderRadius: 16,
                padding: '16px 18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease',
              }}
              className="hover:!bg-[rgba(255,255,255,0.75)] hover:!border-[rgba(245,159,11,0.20)] transition-all"
            >
              <label 
                style={{ 
                  fontSize: 10, 
                  fontWeight: 700,
                  color: 'rgba(26,26,26,0.38)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.09em',
                  display: 'block', 
                  marginBottom: 10 
                }}
              >
                NOMOR TELEPON
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone className="w-4.5 h-4.5" style={{ color: 'rgba(26,26,26,0.35)' }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
                  {formData.phone}
                </span>
              </div>
            </div>

            {/* Field 4: JABATAN */}
            <div 
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.75)',
                borderRadius: 16,
                padding: '16px 18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease',
              }}
              className="hover:!bg-[rgba(255,255,255,0.75)] hover:!border-[rgba(245,159,11,0.20)] transition-all"
            >
              <label 
                style={{ 
                  fontSize: 10, 
                  fontWeight: 700,
                  color: 'rgba(26,26,26,0.38)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.09em',
                  display: 'block', 
                  marginBottom: 10 
                }}
              >
                JABATAN
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase className="w-4.5 h-4.5" style={{ color: 'rgba(26,26,26,0.35)' }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
                  {formData.jabatan}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ==========================================
// TAB: MANAJEMEN USER (ADMIN ONLY)
// ==========================================
interface UsersTabProps {
  users: UserItem[];
  setUsers: React.Dispatch<React.SetStateAction<UserItem[]>>;
}

const getAvatarInitials = (name: string) => {
  if (!name) return 'CS';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

function UsersTab({ users, setUsers }: UsersTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);

  // Fetch agents dari backend
  const fetchAgents = useCallback(async () => {
    try {
      const res = await agentAPI.getAll();
      const raw = res.data?.data ?? res.data ?? [];
      const mapped: UserItem[] = (Array.isArray(raw) ? raw : []).map((a: any) => ({
        id: String(a.id),
        name: a.name || '',
        email: a.email || '',
        role: 'cs' as const,
        position: 'Customer Service Agent',
        isActive: a.isActive ?? true,
        createdAt: a.createdAt ? new Date(a.createdAt).toISOString().split('T')[0] : '',
      }));
      setUsers(mapped);
    } catch (err) {
      console.error('Gagal memuat agents:', err);
    }
  }, [setUsers]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // Form setup using useForm + zod resolver
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(getFormSchema(!!editingUser)),
    defaultValues: {
      nama: '',
      email: '',
      password: '',
      jabatan: 'Customer Service Agent',
      isActive: true,
    }
  });

  const isActiveValue = watch('isActive');

  const handleOpenAdd = () => {
    setEditingUser(null);
    reset({
      nama: '',
      email: '',
      password: '',
      jabatan: 'Customer Service Agent',
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (user: UserItem) => {
    setEditingUser(user);
    reset({
      nama: user.name,
      email: user.email,
      password: '',
      jabatan: user.position || 'Customer Service Agent',
      isActive: user.isActive,
    });
    setModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = !u.isActive;
        toast.success(`Akses user ${u.name} diubah menjadi: ${nextStatus ? 'AKTIF' : 'NONAKTIF'}`);
        return { ...u, isActive: nextStatus };
      }
      return u;
    }));
  };

  const handleConfirmDelete = async () => {
    if (deletingUser) {
      try {
        await agentAPI.delete(Number(deletingUser.id));
        toast.success('Agent berhasil dihapus');
        fetchAgents();
      } catch (err: any) {
        const message = err?.response?.data?.message ?? 'Gagal menghapus agent';
        toast.error(message);
      }
      setDeletingUser(null);
    }
  };

  const onSubmit = async (data: any) => {
    if (editingUser) {
      // Edit User (lokal saja, belum ada endpoint update)
      setUsers(prev => prev.map(u => u.id === editingUser.id ? {
        ...u,
        name: data.nama,
        email: data.email,
        position: data.jabatan || 'Customer Service Agent',
        isActive: data.isActive,
      } : u));
      toast.success(`Berhasil memperbarui data CS/Agent "${data.nama}".`);
      setModalOpen(false);
    } else {
      // Create new agent via API
      try {
        await agentAPI.create({
          name: data.nama,
          email: data.email,
          password: data.password,
        });
        toast.success(`User baru "${data.nama}" berhasil ditambahkan.`);
        fetchAgents();
        setModalOpen(false);
      } catch (err: any) {
        if (err?.response?.status === 409) {
          toast.error('Email sudah terdaftar');
        } else {
          const message = err?.response?.data?.message ?? 'Gagal membuat agent';
          toast.error(message);
        }
      }
    }
  };

  const csAgentsOnly = users.filter(u => u.role === 'cs' || u.role === 'agent');

  return (
    <div id="tab-content-users" className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Manajemen CS/Agent
          </h2>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Kelola akun Customer Service dan Agent yang menangani layanan pelanggan.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#1A1A1A] hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md font-bold text-[13px] flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah CS/Agent</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  User
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[200px]">
                  Email
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[180px]">
                  Jabatan
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[140px] text-center">
                  Status
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[160px] text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {csAgentsOnly.map(u => {
                const initials = getAvatarInitials(u.name);
                const isStatusActive = u.isActive;
                return (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* AVATAR + NAMA */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#F5C518] flex items-center justify-center text-[#1A1A1A] font-black text-sm shadow-[0_2px_8px_rgba(245,159,11,0.25)] flex-shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[13px] font-semibold text-[#1A1A1A] block truncate">{u.name}</span>
                          <span className="text-[11px] text-gray-400 block font-mono truncate">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">
                      <span className="text-[12.5px] text-gray-600 font-mono font-medium block truncate max-w-[180px]">
                        {u.email}
                      </span>
                    </td>

                    {/* Jabatan */}
                    <td className="px-5 py-4">
                      <span style={{ fontSize: 12, color: 'rgba(26,26,26,0.55)' }} className="font-medium">
                        {u.position || 'Customer Service Agent'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(u.id)}
                          className="flex items-center gap-2 cursor-pointer group"
                          title={isStatusActive ? "Nonaktifkan pengguna" : "Aktifkan pengguna"}
                        >
                          <div className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isStatusActive ? 'bg-gradient-to-r from-[#F59E0B] to-[#F5C518]' : 'bg-gray-300'}`}>
                            <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isStatusActive ? 'translate-x-4' : 'translate-x-0'}`} />
                          </div>
                          <span className={`text-[12px] font-bold ${isStatusActive ? 'text-green-600' : 'text-gray-400'}`}>
                            {isStatusActive ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </button>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* BADGE ROLE */}
                        <span style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 99,
                          background: 'rgba(59,130,246,0.10)',
                          color: '#2563EB',
                          border: '0.5px solid rgba(59,130,246,0.25)',
                        }}>
                          CS/Agent
                        </span>

                        {/* Edit button */}
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                          title="Edit CS/Agent"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => setDeletingUser(u)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Hapus CS/Agent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL USER ADD / EDIT */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
              <h3 className="text-[16px] font-bold text-[#1A1A1A]">
                {editingUser ? 'Edit CS/Agent' : 'Tambah CS/Agent Baru'}
              </h3>
              <button 
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-4">
                
                {/* Nama */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">NAMA LENGKAP*</label>
                  <input
                    type="text"
                    placeholder="Contoh: Raymond"
                    {...register('nama')}
                    className={`w-full h-11 bg-gray-50 border ${errors.nama ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 text-[13px] text-gray-800 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none font-semibold`}
                  />
                  {errors.nama?.message && (
                    <span className="text-red-500 text-[11px]">{errors.nama.message as string}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ALAMAT EMAIL*</label>
                  <input
                    type="email"
                    placeholder="nama@uniinside.id"
                    {...register('email')}
                    className={`w-full h-11 bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 text-[13px] text-gray-800 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none font-semibold`}
                  />
                  {errors.email?.message && (
                    <span className="text-red-500 text-[11px]">{errors.email.message as string}</span>
                  )}
                </div>

                {/* Password (Only showing when adding a user) */}
                {!editingUser && (
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">PASSWORD*</label>
                    <input
                      type="password"
                      placeholder="Masukkan kata sandi minimal 8 karakter"
                      {...register('password')}
                      className={`w-full h-11 bg-gray-50 border ${errors.password ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 text-[13px] text-gray-800 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none font-semibold`}
                    />
                    {errors.password?.message && (
                      <span className="text-red-500 text-[11px]">{errors.password.message as string}</span>
                    )}
                  </div>
                )}

                {/* Jabatan */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">JABATAN</label>
                  <input
                    type="text"
                    placeholder="Contoh: Customer Service Agent"
                    {...register('jabatan')}
                    className="w-full h-11 bg-gray-50 border border-gray-200 rounded-xl px-4 text-[13px] text-gray-800 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none font-semibold"
                  />
                </div>

                {/* Status Aktif */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100 mt-2">
                  <div className="text-left">
                    <label className="text-[12px] font-bold text-gray-750 block">Status Aktif</label>
                    <span className="text-[11.5px] text-gray-400">Izinkan user masuk ke dalam sistem</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setValue('isActive', !isActiveValue)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActiveValue ? 'bg-[#F59E0B]' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActiveValue ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-[12px] text-gray-500 font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-neutral-800 text-white rounded-xl px-5 py-2 font-bold text-[12px] cursor-pointer"
                >
                  Simpan Akun
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* DIALOG HAPUS */}
      {deletingUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative overflow-hidden border border-gray-100 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
              <Trash2 className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2">
              Hapus {deletingUser.name}?
            </h3>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
              Akun CS/Agent ini akan dihapus dari sistem. Customer yang sedang ditangani akan perlu di-reassign.
            </p>
            <div className="flex gap-3 w-full justify-center">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="flex-1 max-w-[120px] py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-500 font-bold hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 max-w-[120px] py-2.5 bg-red-500 hover:bg-red-655 text-white font-bold text-[13px] rounded-xl cursor-pointer transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
