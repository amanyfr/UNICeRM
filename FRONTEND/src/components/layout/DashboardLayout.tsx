import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChatWidget } from '../chatbot/ChatWidget';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let userObj: any = {};
    try {
      const raw = localStorage.getItem('currentUser') || localStorage.getItem('unicerm_user');
      if (raw && raw !== 'undefined') {
        userObj = JSON.parse(raw);
      }
    } catch (e) {
      console.error('Failed to check role protection:', e);
    }

    const role = userObj.role || 'admin';
    const isCs = role === 'cs' || role === 'agent';
    const pathname = location.pathname;

    // Route Protection berdasarkan role
    if (role === 'admin' && pathname.includes('/chatbot')) {
      navigate('/');
    }
    if (isCs && pathname.includes('/analytics')) {
      navigate('/');
    }
    if (isCs && pathname.includes('/vouchers')) {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex h-screen overflow-hidden font-sans relative" style={{
      background: `
        radial-gradient(ellipse 80% 60% at 20% -10%,
          rgba(245,158,11,0.15) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 80% 100%,
          rgba(245,158,11,0.10) 0%, transparent 60%),
        radial-gradient(ellipse 100% 80% at 50% 50%,
          rgba(249,250,251,1) 0%, rgba(243,244,246,1) 100%)
      `
    }}>
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-0" style={{ backgroundImage: 'url(/noise.png)' }} />

      {/* SIDEBAR — sticky, tidak collapse */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Floating Chat Widget */}
        <ChatWidget />
      </div>
    </div>
  );
}
