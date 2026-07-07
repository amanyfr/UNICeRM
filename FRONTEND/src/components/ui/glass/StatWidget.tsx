import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

export interface StatWidgetProps {
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  trendUp?: boolean;
  icon: any;
  color?: 'success' | 'warning' | 'danger' | 'info' | 'accent' | 'primary' | 'default';
  colorVariant?: 'success' | 'warning' | 'danger' | 'info' | 'accent' | 'primary' | 'default';
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  label,
  value,
  unit,
  trend,
  trendUp = true,
  icon: Icon,
  color,
  colorVariant
}) => {
  
  const activeColor = color || colorVariant || 'primary';

  const variantStyles = {
    success: { bg: 'bg-[rgba(34,197,94,0.15)]', border: 'border-[rgba(34,197,94,0.3)]', text: 'text-[#22C55E]' },
    warning: { bg: 'bg-[rgba(245,158,11,0.15)]', border: 'border-[rgba(245,158,11,0.3)]', text: 'text-[#F59E0B]' },
    danger:  { bg: 'bg-[rgba(239,68,68,0.15)]', border: 'border-[rgba(239,68,68,0.3)]', text: 'text-[#EF4444]' },
    info:    { bg: 'bg-[rgba(59,130,246,0.15)]', border: 'border-[rgba(59,130,246,0.3)]', text: 'text-[#3B82F6]' },
    accent:  { bg: 'bg-[rgba(245,197,24,0.18)]', border: 'border-[rgba(245,197,24,0.35)]', text: 'text-[#E8A800]' },
    primary: { bg: 'bg-[rgba(26,26,26,0.08)]', border: 'border-[rgba(26,26,26,0.15)]', text: 'text-[#1A1A1A]' },
    default: { bg: 'bg-[rgba(26,26,26,0.08)]', border: 'border-[rgba(26,26,26,0.15)]', text: 'text-[#1A1A1A]' },
  };

  const style = variantStyles[activeColor as keyof typeof variantStyles] || variantStyles.primary;

  const renderIcon = () => {
    if (React.isValidElement(Icon)) {
      return React.cloneElement(Icon as React.ReactElement, { 
        className: `${(Icon as React.ReactElement).props.className || ''} ${style.text}`.trim() 
      } as any);
    }
    const IconComp = Icon as React.ElementType;
    return IconComp ? <IconComp className={`w-full h-full ${style.text}`} /> : null;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className={`
        relative overflow-hidden p-6 rounded-[24px] 
        ${style.bg} ${style.border} border
        backdrop-blur-[20px] -webkit-backdrop-blur-[20px] saturate-[180%]
        shadow-glass transition-all duration-300
      `}
    >
      {/* iOS-style decoration circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      
      <div className="relative flex flex-col h-full gap-2">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-white/40 border border-white/50 flex items-center justify-center p-2.5 overflow-hidden">
            {renderIcon()}
          </div>
          
          {trend && (
            <div className={`
              text-[11px] font-black px-2 py-0.5 rounded-lg border
              ${trendUp ? 'bg-success/20 text-success border-success/30' : 'bg-danger/20 text-danger border-danger/30'}
            `}>
              {trendUp ? '+' : ''}{trend}
            </div>
          )}
        </div>

        <div className="mt-2 text-center flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-[48px] font-black tracking-tight text-primary leading-none">
              {value}
            </span>
            {unit && <span className="text-lg font-bold text-text-soft">{unit}</span>}
          </div>
          <span className="text-[11px] font-bold text-text-soft uppercase tracking-widest mt-1">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
