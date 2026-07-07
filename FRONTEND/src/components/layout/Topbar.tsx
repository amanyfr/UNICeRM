import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  ChevronDown, 
  User, 
  Shield 
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfilePopup } from '../dashboard/UserProfilePopup';
import { getInitials } from '../../lib/utils/user';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/customers': 'Data Customer',
  '/dashboard/tickets': 'Tiket Layanan',
  '/dashboard/chatbot': 'AI Chatbot',
  '/dashboard/feedback': 'Feedback & CSAT',
  '/dashboard/analytics': 'Analitik & Laporan',
  '/dashboard/vouchers': 'Voucher & Promo',
  '/dashboard/settings': 'Pengaturan',
};

const NOTIFICATIONS = [
  { id: 1, title: 'Pembayaran pelanggan VIP masuk', time: '5m' },
  { id: 2, title: 'Tiket baru #102 ditugaskan ke Anda', time: '12m' },
  { id: 3, title: 'Sistem pembaharuan dijadwalkan pukul 23:00', time: '1h' }
];

export function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  // Determine screen title
  const getDisplayTitle = () => {
    const pathname = location.pathname;
    if (pathname === '/') return PAGE_TITLES['/dashboard'];
    // Map /customers to /dashboard/customers
    const dashPath = `/dashboard${pathname.replace(/\/$/, '')}`;
    if (PAGE_TITLES[dashPath]) return PAGE_TITLES[dashPath];
    if (pathname.startsWith('/customers/')) return 'Detail Customer';
    return 'Dashboard';
  };

  return (
    <header className="h-[56px] sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-white/60 shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] flex items-center px-6 justify-between flex-shrink-0 select-none">
      
      {/* LEFT: TITLE */}
      <h1 className="text-[18px] font-bold text-[#1A1A1A] tracking-tight">
        {getDisplayTitle()}
      </h1>

      {/* RIGHT: NOTIFICATION + AVATAR + NAME + CHEVRONDOWN */}
      <div className="flex items-center gap-4">
        
        {/* NOTIFICATION BELL */}
        <div className="relative" ref={notifRef}>
          <button 
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-[38px] h-[38px] rounded-[12px] bg-white/60 backdrop-blur-sm border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center hover:bg-white/80 transition-all duration-200 relative cursor-pointer"
          >
            <Bell className="w-[17px] h-[17px] text-gray-600" />
            <div className="absolute top-1.5 right-1.5 w-[8px] h-[8px] rounded-full bg-[#F59E0B] border-2 border-white shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-[320px] bg-white/85 backdrop-blur-2xl border border-white/60 rounded-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden z-50 text-left"
              >
                <div className="px-4 py-3 border-b border-gray-100/60 flex justify-between items-center bg-white/40">
                  <span className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-wider">Notifikasi Baru</span>
                  <span className="text-[10px] font-bold text-gray-400">Terbaru</span>
                </div>
                <div className="max-h-[240px] overflow-y-auto divide-y divide-gray-100/60">
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} className="px-4 py-3 hover:bg-white/60 transition-colors flex justify-between items-start">
                      <span className="text-[12px] text-gray-700 leading-relaxed max-w-[220px] font-medium">{n.title}</span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2 font-mono">{n.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PROFILE SELECTOR Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 hover:bg-gray-100 rounded-xl px-2.5 py-1.5 transition-colors cursor-pointer select-none border-none outline-none bg-transparent"
          >
            <div className="w-[34px] h-[34px] rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-[#1A1A1A] font-bold text-[13px] leading-none select-none">
                {getInitials(user.name)}
              </span>
            </div>
            <span className="text-[14px] font-semibold text-[#1A1A1A] hidden sm:block max-w-[120px] truncate">
              {user.name}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isProfileOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 z-50 text-left"
              >
                <UserProfilePopup onClose={() => setIsProfileOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}
