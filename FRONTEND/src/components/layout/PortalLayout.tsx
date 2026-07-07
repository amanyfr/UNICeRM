import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  LogOut,
  ChevronDown,
  User as UserIcon,
  Home,
  MessageCircle,
  Ticket,
  Star,
  Tag,
  ChevronRight,
  UserCircle
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Footer } from './Footer';

interface PortalLayoutProps {
  children: React.ReactNode;
}

const LINKS = [
  { label:'BERANDA', href:'/portal' },
  { label:'CHAT', href:'/portal/chat' },
  { label:'TIKET', href:'/portal/my-tickets' },
  { label:'FEEDBACK', href:'/portal/feedback' },
  { label:'VOUCHER', href:'/portal/vouchers' },
];

const NAV_LINKS = [
  { label:'BERANDA',  href:'/portal', icon: Home },
  { label:'CHAT',     href:'/portal/chat', icon: MessageCircle },
  { label:'TIKET',    href:'/portal/my-tickets', icon: Ticket },
  { label:'FEEDBACK', href:'/portal/feedback', icon: Star },
  { label:'VOUCHER',  href:'/portal/vouchers', icon: Tag },
];

export function PortalLayout({ children }: PortalLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock scroll saat drawer buka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Auto tutup saat navigasi
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser');
    } catch { /* ignore */ }
    document.body.style.overflow = '';
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white" style={{
      background: `
        radial-gradient(ellipse 70% 50% at 10% 20%,
          rgba(245,158,11,0.12) 0%, transparent 55%),
        radial-gradient(ellipse 60% 40% at 90% 80%,
          rgba(245,158,11,0.08) 0%, transparent 55%),
        linear-gradient(160deg,
          #F9FAFB 0%, #F3F4F6 50%, #F0F1F3 100%)
      `
    }}>
      {/* Liquid Glass Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#F59E0B]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Desktop Header (>= 768px) */}
      <header className="hidden md:block w-full sticky top-0 z-50 bg-white/72 backdrop-blur-2xl border-b border-white/50 shadow-[0_1px_0_rgba(0,0,0,0.05),0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="w-full flex items-center justify-between h-[56px] px-4 sm:px-6 md:px-8">
          {/* Logo (kiri) */}
          <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer" onClick={() => navigate('/portal')}>
            <div className="w-[34px] h-[34px] rounded-[10px] bg-[#1A1A1A] shadow-[0_4px_12px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center justify-center">
              <span className="text-[#F59E0B] font-black text-[15px]">U</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-[#1A1A1A]">UNICeRM</span>
              <span className="text-[9px] font-bold text-[#F59E0B] tracking-[0.15em] uppercase">PORTAL</span>
            </div>
          </div>

          {/* Nav Links (tengah) - Desktop */}
          <nav className="hidden md:flex items-stretch h-full gap-1">
            {LINKS.map(link => {
              const isActive = location.pathname === link.href;
              return (
                <div 
                  key={link.href} 
                  onClick={() => navigate(link.href)} 
                  className="relative px-4 py-1.5 cursor-pointer flex items-center"
                >
                  <span className={`text-[13px] transition-colors ${isActive ? 'text-[#1A1A1A] font-semibold' : 'text-gray-400 hover:text-[#1A1A1A] font-medium'}`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-[-18px] left-2 right-2 h-[2.5px] rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Profile (kanan) */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0" ref={dropdownRef}>
            <div className="relative">
              <div 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2.5 bg-white/60 backdrop-blur-md border border-white/70 rounded-[12px] pl-1.5 pr-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-white/80 cursor-pointer transition-all"
              >
                <div className="w-[28px] h-[28px] rounded-full bg-[#F59E0B] flex items-center justify-center text-[11px] font-bold text-[#1A1A1A] overflow-hidden">
                   {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase() : 'U'
                  )}
                </div>
                <span className="text-[13px] font-semibold text-[#1A1A1A]">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white/85 backdrop-blur-2xl border border-white/60 shadow-[0_16px_48px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[20px] overflow-hidden z-50 p-2 text-left"
                  >
                    <div className="flex flex-col">
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          navigate('/portal/profile');
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100/80 rounded-xl text-[13px] font-bold text-gray-700 hover:text-[#1A1A1A] transition-colors text-left w-full cursor-pointer select-none"
                      >
                        <UserIcon className="w-4 h-4 text-gray-500" />
                        Edit Profile
                      </button>
                      <div className="h-px bg-gray-100 my-1 mx-2" />
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-xl text-[13px] font-bold text-gray-700 hover:text-red-500 transition-colors text-left w-full cursor-pointer select-none"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header (hanya < 768px) */}
      <div className="md:hidden sticky top-0 z-50">
        <header 
          style={{
            width:'100%', height:56,
            display:'flex', alignItems:'center',
            justifyContent:'space-between',
            padding:'0 20px',
            background:'rgba(255,255,255,0.85)',
            backdropFilter:'blur(28px) saturate(180%)',
            WebkitBackdropFilter:'blur(28px) saturate(180%)',
            borderBottom:'0.5px solid rgba(255,255,255,0.65)',
            boxShadow:'0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          {/* KIRI: Logo UNICeRM + PORTAL label */}
        <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer" onClick={() => navigate('/portal')}>
          <div className="w-[34px] h-[34px] rounded-[10px] bg-[#1A1A1A] shadow-[0_4px_12px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center justify-center">
            <span className="text-[#F59E0B] font-black text-[15px]">U</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold text-[#1A1A1A]">UNICeRM</span>
            <span className="text-[9px] font-bold text-[#F59E0B] tracking-[0.15em] uppercase">PORTAL</span>
          </div>
        </div>

        {/* KANAN: Tombol hamburger (3 garis) */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          style={{
            width:38, height:38, borderRadius:11,
            background:'rgba(255,255,255,0.70)',
            backdropFilter:'blur(12px)',
            WebkitBackdropFilter:'blur(12px)',
            border:'0.5px solid rgba(255,255,255,0.85)',
            display:'flex', alignItems:'center',
            justifyContent:'center', cursor:'pointer',
            boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
            transition:'all 0.2s ease',
          }}
        >
          <Menu className="w-5 h-5 text-[#1A1A1A]" />
        </button>
        </header>
      </div>

      {/* MOBILE DRAWER (hanya render di mobile) */}
      <div className="md:hidden">
        {/* OVERLAY */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position:'fixed', inset:0, zIndex:998,
            background:'rgba(0,0,0,0.35)',
            backdropFilter:'blur(3px)',
            WebkitBackdropFilter:'blur(3px)',
            opacity: isMobileMenuOpen ? 1 : 0,
            pointerEvents: isMobileMenuOpen 
              ? 'auto' : 'none',
            transition:'opacity 0.25s ease',
          }}
        />

        {/* DRAWER PANEL */}
        <div style={{
          position:'fixed',
          top:0, left:0,
          width:'75vw',
          maxWidth:280,
          height:'100dvh',
          zIndex:999,
          display:'flex',
          flexDirection:'column',
          background:'rgba(252,250,245,0.97)',
          backdropFilter:'blur(40px) saturate(180%)',
          WebkitBackdropFilter:'blur(40px) saturate(180%)',
          borderRight:'0.5px solid rgba(255,255,255,0.80)',
          boxShadow:'8px 0 40px rgba(0,0,0,0.14)',
          transform: isMobileMenuOpen
            ? 'translateX(0)'
            : 'translateX(-100%)',
          transition:
            'transform 0.32s cubic-bezier(0.32,0.72,0,1)',
          overflowY:'auto',
        }}>
          {/* BAGIAN 1 — DRAWER HEADER */}
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between',
            padding:'16px 16px 12px',
            borderBottom:'0.5px solid rgba(0,0,0,0.04)',
            flexShrink:0,
          }}>
            {/* Logo row */}
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {/* Logo box */}
              <div className="w-8 h-8 rounded-[9px] bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#F59E0B] font-black text-[13px]">U</span>
              </div>
              <div className="flex flex-col leading-none">
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#1A1A1A' }}>UNICeRM</p>
                <p style={{ margin: 0, fontSize: '9px', color: '#F59E0B', letterSpacing: '0.15em', fontWeight: 'bold' }}>PORTAL</p>
              </div>
            </div>

            {/* Tombol X tutup */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:!bg-black/5 active:scale-95 transition-all"
              style={{
                width:32, height:32, borderRadius:9,
                background:'rgba(0,0,0,0.03)',
                border:'none', cursor:'pointer',
                display:'flex', alignItems:'center',
                justifyContent:'center',
                transition:'all 0.2s ease',
              }}
            >
              <X className="w-3.5 h-3.5" style={{ color: '#444' }} />
            </button>
          </div>

          {/* BAGIAN 2 — NAV LINKS */}
          <div style={{
            flex:1, padding:'12px 12px 16px',
          }}>
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.href
                || (link.href !== '/portal' && location.pathname.startsWith(link.href));

              return (
                <div
                  key={link.href}
                  onClick={() => {
                    navigate(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="group list-none"
                  style={{
                    display:'flex', alignItems:'center',
                    justifyContent:'space-between',
                    padding:'12px 14px',
                    borderRadius:14,
                    marginBottom:6,
                    cursor:'pointer',
                    transition:'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: isActive
                      ? 'linear-gradient(135deg,#F59E0B,#D97706)'
                      : 'rgba(255,255,255,0.70)',
                    backdropFilter:'blur(12px)',
                    WebkitBackdropFilter:'blur(12px)',
                    border: isActive
                      ? 'none'
                      : '0.5px solid rgba(255,255,255,0.9)',
                    boxShadow: isActive
                      ? '0 4px 12px -4px rgba(245,159,11,0.45)'
                      : '0 2px 6px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Kiri (icon + label) */}
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    {/* Icon box */}
                    <div style={{
                      width:34, height:34, borderRadius:10,
                      display:'flex', alignItems:'center',
                      justifyContent:'center', flexShrink:0,
                      background: isActive
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(245,159,11,0.08)',
                      transition:'all 0.2s ease',
                    }}>
                      <link.icon className="w-4 h-4 animate-none" style={{ color: isActive ? 'white' : '#F59E0B' }} />
                    </div>

                    <span style={{
                      fontSize:13, fontWeight: isActive ? 700 : 600,
                      letterSpacing:'0.02em',
                      color: isActive 
                        ? 'white' 
                        : 'rgba(26,26,26,0.75)',
                    }}>
                      {link.label}
                    </span>
                  </div>

                  {/* Kanan */}
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: isActive ? 'white' : 'rgba(26,26,26,0.25)' }} />
                </div>
              );
            })}
          </div>

          {/* BAGIAN 3 — USER INFO + AKSI (drawer footer) */}
          <div style={{
            padding:'12px 12px 20px',
            borderTop:'0.5px solid rgba(0,0,0,0.04)',
            flexShrink:0,
          }}>
            {/* USER INFO CARD */}
            <div style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'12px 14px',
              borderRadius:16,
              background:'rgba(255,255,255,0.6)',
              backdropFilter:'blur(10px)',
              border:'0.5px solid rgba(255,255,255,0.8)',
              marginBottom:12,
              boxShadow:'0 2px 10px rgba(0,0,0,0.03)',
            }}>
              {/* Avatar 40px */}
              <div style={{
                width:40, height:40, borderRadius:12,
                background:'linear-gradient(135deg,#F59E0B,#F5C518)',
                display:'flex', alignItems:'center',
                justifyContent:'center', flexShrink:0,
                boxShadow:'0 2px 8px rgba(245,159,11,0.25)',
                fontSize:14, fontWeight:800, color:'#FFF',
                overflow: 'hidden'
              }}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase() : 'U'
                )}
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                <p style={{
                  margin:0, fontSize:13, fontWeight:700,
                  color:'#1A1A1A',
                }}>
                  {user?.name || 'User'}
                </p>
                <p style={{
                  margin:0, fontSize:11, 
                  color:'rgba(26,26,26,0.5)',
                  overflow:'hidden', textOverflow:'ellipsis',
                  whiteSpace:'nowrap',
                }}>
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>

            {/* TOMBOL AKSI — 2 kolom */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {/* TOMBOL PROFIL */}
              <button
                onClick={() => {
                  navigate('/portal/profile');
                  setIsMobileMenuOpen(false);
                }}
                className="hover:!bg-white hover:!shadow-[0_2px_8px_rgba(0,0,0,0.03)] active:scale-[0.97]"
                style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'center', gap:6,
                  height:40, borderRadius:12,
                  background:'rgba(255,255,255,0.7)',
                  backdropFilter:'blur(12px)',
                  border:'0.5px solid rgba(255,255,255,0.9)',
                  fontSize:12, fontWeight:600,
                  color:'#1A1A1A', cursor:'pointer',
                  boxShadow:'0 1px 4px rgba(0,0,0,0.02)',
                  transition:'all 0.2s ease',
                }}
              >
                <UserCircle className="w-3.5 h-3.5" style={{ color:'#666' }} />
                <span>Profil</span>
              </button>

              {/* TOMBOL KELUAR */}
              <button
                onClick={handleLogout}
                className="hover:!bg-[#FEF2F2] hover:!border-red-200 active:scale-[0.97]"
                style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'center', gap:6,
                  height:40, borderRadius:12,
                  background:'rgba(254,242,242,0.8)',
                  backdropFilter:'blur(12px)',
                  border:'0.5px solid rgba(239,68,68,0.15)',
                  fontSize:12, fontWeight:700,
                  color:'#DC2626', cursor:'pointer',
                  transition:'all 0.2s ease',
                }}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full relative flex flex-col">
        {children}
      </main>
      
      {/* Footer */}
      {location.pathname !== '/portal/chat' && (
        <footer className="w-full bg-[#1A1A1A]/92 backdrop-blur-2xl border-t border-white/8 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-[12px] font-medium text-gray-400 text-center md:text-left">
                © 2026 UNICeRM Portal. All rights reserved.
              </div>
              <div className="flex gap-4">
                <a href="#" className="w-[30px] h-[30px] rounded-full bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-[#F59E0B]/80 hover:border-[#F59E0B]/40 flex items-center justify-center transition-all duration-200 cursor-pointer group">
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#1A1A1A]">X</span>
                </a>
                <a href="#" className="w-[30px] h-[30px] rounded-full bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-[#F59E0B]/80 hover:border-[#F59E0B]/40 flex items-center justify-center transition-all duration-200 cursor-pointer group">
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#1A1A1A]">in</span>
                </a>
                <a href="#" className="w-[30px] h-[30px] rounded-full bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-[#F59E0B]/80 hover:border-[#F59E0B]/40 flex items-center justify-center transition-all duration-200 cursor-pointer group">
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#1A1A1A]" style={{ fontFamily: 'serif' }}>f</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
