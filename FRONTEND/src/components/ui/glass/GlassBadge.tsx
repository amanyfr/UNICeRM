import { ReactNode } from 'react';

interface GlassBadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

export function GlassBadge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = ''
}: GlassBadgeProps) {
  
  const variantStyles = {
    default: 'bg-white/35 border-white/50 text-text',
    success: 'bg-success/15 border-success/30 text-success',
    warning: 'bg-warning/15 border-warning/30 text-warning',
    danger:  'bg-danger/15 border-danger/30 text-danger',
    info:    'bg-info/15 border-info/30 text-info',
    accent:  'bg-accent/20 border-accent/35 text-accent-dark',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[12px] px-3 py-1',
  };

  return (
    <span className={`
      ${variantStyles[variant]}
      ${sizes[size]}
      inline-flex items-center justify-center
      backdrop-blur-[8px] -webkit-backdrop-blur-[8px]
      border rounded-full font-bold leading-none
      transition-colors duration-200
      ${className}
    `}>
      {children}
    </span>
  );
}
