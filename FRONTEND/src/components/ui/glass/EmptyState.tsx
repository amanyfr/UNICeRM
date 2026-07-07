import React from 'react';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = "" 
}: EmptyStateProps) {
  return (
    <GlassCard className={`flex flex-col items-center justify-center p-12 text-center max-w-xl mx-auto ${className}`}>
      <div className="w-20 h-20 rounded-[30px] bg-primary/5 border border-primary/10 flex items-center justify-center text-text-soft/60 mb-6">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-2">{title}</h3>
      <p className="text-sm font-bold text-text-soft italic leading-relaxed mb-8 max-w-xs mx-auto">
        "{description}"
      </p>
      {actionLabel && (
        <GlassButton variant="primary" onClick={onAction} className="px-8 font-black uppercase tracking-widest">
          {actionLabel}
        </GlassButton>
      )}
    </GlassCard>
  );
}
