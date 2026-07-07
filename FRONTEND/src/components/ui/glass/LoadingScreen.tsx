import React from 'react';
import { motion } from 'motion/react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F3F4F6]">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[10000]">
        <motion.div 
          className="h-full bg-accent shadow-[0_0_10px_#F5C518]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative flex flex-col items-center gap-8"
      >
        {/* Animated Spinner */}
        <div className="relative">
          <motion.div 
            className="w-24 h-24 rounded-full border-4 border-accent/20 border-t-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full shadow-xl" 
            />
          </div>
        </div>

        <motion.h1 
          className="text-4xl font-black text-primary tracking-tighter"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          UNICeRM
        </motion.h1>
      </motion.div>
    </div>
  );
}

export function SkeletonTile({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl ${className}`}>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <SkeletonTile className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <SkeletonTile className="h-5 w-full rounded-lg" />
            <SkeletonTile className="h-4 w-3/4 rounded-lg opacity-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonStatWidget() {
  return (
    <div className="relative overflow-hidden p-6 rounded-[24px] bg-white/20 border border-white/40 backdrop-blur-md h-[180px] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <SkeletonTile className="h-10 w-10 rounded-full" />
        <SkeletonTile className="h-5 w-12 rounded-lg" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <SkeletonTile className="h-12 w-24 rounded-lg" />
        <SkeletonTile className="h-4 w-32 rounded-md" />
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`p-6 rounded-[28px] bg-white/30 border border-white/50 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <SkeletonTile className="h-6 w-32 rounded-md" />
        <SkeletonTile className="h-8 w-8 rounded-full" />
      </div>
      <div className="space-y-3">
        <SkeletonTile className="h-4 w-full rounded-md" />
        <SkeletonTile className="h-4 w-[90%] rounded-md" />
        <SkeletonTile className="h-4 w-[75%] rounded-md" />
      </div>
    </div>
  );
}
