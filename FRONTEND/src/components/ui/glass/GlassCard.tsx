import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'accent' | 'dark';
  style?: React.CSSProperties;
  onClick?: () => void;
  key?: React.Key;
}

export function GlassCard({ 
  children, 
  className = '', 
  hover = true, 
  variant = 'default',
  style,
  onClick
}: GlassCardProps) {
  
  const variants = {
    default: 'bg-[rgba(255,255,255,0.25)] border-[rgba(255,255,255,0.45)] backdrop-blur-[20px] saturate-[180%] -webkit-backdrop-blur-[20px]',
    accent: 'bg-[rgba(245,197,24,0.15)] border-[rgba(245,197,24,0.35)] backdrop-blur-[20px] saturate-[180%] -webkit-backdrop-blur-[20px]',
    dark: 'bg-[rgba(26,26,26,0.12)] border-[rgba(255,255,255,0.15)] backdrop-blur-[24px] saturate-[200%] -webkit-backdrop-blur-[24px]',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      style={style}
      onClick={onClick}
      className={`
        ${variants[variant]}
        border rounded-[20px] shadow-glass
        transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${hover ? 'hover:shadow-glass-hover hover:border-[rgba(255,255,255,0.6)]' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
