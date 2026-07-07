import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GlassButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  onClick?: (e?: any) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
}

export function GlassButton({
  children,
  variant = 'secondary',
  size = 'md',
  loading = false,
  isLoading = false,
  icon,
  onClick,
  className = '',
  type = 'button',
  fullWidth = false,
  disabled = false
}: GlassButtonProps) {
  
  const actualLoading = loading || isLoading || disabled;
  
  const variantStyles = {
    primary: 'bg-gradient-to-br from-[#F5C518] to-[#E8A800] text-[#1A1A1A] shadow-[0_4px_14px_rgba(245,197,24,0.4)] border-none',
    secondary: 'bg-white/40 backdrop-blur-[12px] -webkit-backdrop-blur-[12px] border-white/50 text-[#3D3D3D] hover:bg-white/60',
    ghost: 'bg-white/10 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] border-white/20 text-[#3D3D3D] hover:bg-white/20',
    danger: 'bg-danger/15 backdrop-blur-[12px] -webkit-backdrop-blur-[12px] border-danger/30 text-danger hover:bg-danger/25',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={actualLoading}
      className={`
        ${variantStyles[variant]}
        ${sizes[size]}
        ${className}
        ${fullWidth ? 'w-full' : ''}
        relative flex items-center justify-center gap-2
        border rounded-[12px] font-bold
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {actualLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
}
