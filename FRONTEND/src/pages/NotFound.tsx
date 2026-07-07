import React from 'react';
import { motion } from 'motion/react';
import { Home, MessageCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard, GlassButton } from '../components/ui/glass';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center z-10"
      >
        <GlassCard className="p-12 md:p-20 border-white/60 shadow-2xl">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-[100px] md:text-[140px] font-black leading-none bg-gradient-to-br from-primary via-accent to-accent-dark bg-clip-text text-transparent drop-shadow-2xl"
          >
            404
          </motion.h1>
          
          <div className="space-y-4 mt-8">
            <h2 className="text-2xl font-black text-primary tracking-tight uppercase">Oops! Halaman Tidak Ditemukan</h2>
            <p className="text-sm font-bold text-text-soft italic max-w-sm mx-auto leading-relaxed">
              "Sepertinya kamu tersesat di dimensi kaca. Halaman yang kamu cari telah dipindahkan atau tidak pernah ada."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link to="/" className="w-full sm:w-auto">
              <GlassButton variant="primary" fullWidth icon={<Home size={18} />} className="px-8 font-black uppercase tracking-widest">
                Ke Dashboard
              </GlassButton>
            </Link>
            <Link to="/portal/tickets" className="w-full sm:w-auto">
              <GlassButton variant="ghost" fullWidth icon={<MessageCircle size={18} />} className="px-8 font-black uppercase tracking-widest text-primary">
                Hubungi Support
              </GlassButton>
            </Link>
          </div>
        </GlassCard>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-text-soft uppercase tracking-[3px] opacity-40">
          <AlertCircle size={12} />
          Uni Inside Media - UNICeRM
        </div>
      </motion.div>
    </div>
  );
}
