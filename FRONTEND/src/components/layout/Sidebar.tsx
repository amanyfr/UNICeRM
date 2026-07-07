import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Inbox, 
  Bot, 
  Star, 
  BarChart2, 
  Tag, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../lib/utils/user';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Ambil user dan role dari localStorage
  let user: any = {};
  try {
    const raw = localStorage.getItem('currentUser') || localStorage.getItem('unicerm_user');
    if (raw && raw !== 'undefined') {
      user = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse user in sidebar:', e);
  }

  const role = user.role; // 'admin' | 'cs' | 'agent'

  const NAV_ADMIN = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Data Customer', href: '/dashboard/customers', icon: Users },
    { label: 'Tiket Layanan', href: '/dashboard/tickets', icon: Inbox },
    { label: 'Feedback & CSAT', href: '/dashboard/feedback', icon: Star },
    { label: 'Analitik', href: '/dashboard/analytics', icon: BarChart2 },
    { label: 'Voucher & Promo', href: '/dashboard/vouchers', icon: Tag },
    { label: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
  ];

  const NAV_CS = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Data Customer', href: '/dashboard/customers', icon: Users },
    { label: 'Tiket Layanan', href: '/dashboard/tickets', icon: Inbox },
    { label: 'AI Chatbot', href: '/dashboard/chatbot', icon: Bot },
    { label: 'Feedback & CSAT', href: '/dashboard/feedback', icon: Star },
    { label: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
  ];

  const navItems = role === 'admin' ? NAV_ADMIN : NAV_CS;

  // Map href to routing paths in our React Router setup
  const getRouterPath = (href: string) => {
    if (href === '/dashboard') return '/';
    return href.replace('/dashboard', '');
  };

  const isItemActive = (href: string) => {
    const targetPath = getRouterPath(href);
    if (targetPath === '/') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(targetPath);
  };

  const name = user.name || (role === 'admin' ? 'Admin UNICeRM' : 'CS Agent');
  const shortName = name.length > 14 ? name.slice(0, 14) + '...' : name;
  const initials = getInitials(name);

  return (
    <aside id="sidebar-container" className="w-[220px] flex-shrink-0 h-screen sticky top-0 flex flex-col bg-[#1A1A1A]/90 backdrop-blur-2xl border-r border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.15)] text-[#A3A3A3] justify-between">
      <div className="flex flex-col flex-1 min-h-0">
        
        {/* LOGO AREA */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center gap-2.5 select-none">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-[#F59E0B] flex items-center justify-center shadow-[0_4px_12px_rgba(245,158,11,0.4)]">
            <span className="text-[#1A1A1A] font-black text-[15px]">U</span>
          </div>
          <div>
            <span className="text-white font-bold text-[14px] block leading-none">UNICeRM</span>
            <span className="text-gray-500 text-[10px] block mt-1">v1.0</span>
          </div>
        </div>

        {/* NAVIGATION ITEMS */}
        <nav className="flex-1 py-6 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item, idx) => {
            const active = isItemActive(item.href);
            const path = getRouterPath(item.href);
            
            return (
              <Link
                key={idx}
                to={path}
                className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-[12px] cursor-pointer transition-all duration-200 select-none
                  ${active 
                    ? 'bg-[#F59E0B]/15 backdrop-blur-sm border border-[#F59E0B]/20 text-[#F59E0B] font-semibold shadow-[0_2px_8px_rgba(245,158,11,0.15)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/8'
                  }`}
              >
                <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? 'text-[#F59E0B]' : 'text-gray-500 group-hover:text-white'}`} />
                <span className="text-[13.5px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-[#2A2A2A] p-3 flex-shrink-0">
        <div className="flex items-center gap-2.5 bg-[#2A2A2A] rounded-xl px-3 py-2.5">
          <div className="w-[32px] h-[32px] rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0">
            <span className="text-[#1A1A1A] font-bold text-[12px] leading-none select-none">
              {initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-white font-medium text-[12px] truncate block leading-tight">
              {shortName}
            </span>
            <span className="text-gray-400 text-[10px] uppercase tracking-wide">
              {role === 'admin' ? 'Admin' : 'Agent'}
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}
