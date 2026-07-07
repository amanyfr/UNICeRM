import React from 'react';

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  // Explicitly list these to help the linter if extension is failing
  placeholder?: string;
  type?: string;
  value?: any;
  defaultValue?: string | number | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  required?: boolean;
}

export function GlassInput({
  label,
  error,
  icon,
  suffix,
  className = '',
  ...props
}: GlassInputProps) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-[11px] font-bold text-text-soft uppercase tracking-widest px-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-soft transition-colors group-focus-within:text-accent-dark">
            {icon}
          </div>
        )}
        
        <input
          {...props}
          className={`
            w-full bg-white/50 backdrop-blur-[8px] -webkit-backdrop-blur-[8px]
            border border-white/60 rounded-[12px]
            py-2.5 transition-all duration-200
            ${icon ? 'pl-11' : 'pl-4'}
            ${suffix ? 'pr-11' : 'pr-4'}
            ${error ? 'border-danger/60 focus:border-danger focus:ring-1 focus:ring-danger/15' : 'focus:border-accent focus:ring-1 focus:ring-accent/15'}
            placeholder:text-text-soft/60 outline-none
            font-medium text-text
          `}
        />
        
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-soft">
            {suffix}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-[10px] font-bold text-danger px-1">
          {error}
        </p>
      )}
    </div>
  );
}
