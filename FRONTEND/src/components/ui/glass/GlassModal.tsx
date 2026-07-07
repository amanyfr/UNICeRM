import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}: GlassModalProps) {
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[76px] md:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm -webkit-backdrop-blur-[12px]"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              transition: { 
                type: 'spring', 
                damping: 25, 
                stiffness: 300 
              } 
            }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`
              relative w-full ${sizes[size]}
              bg-white/75 md:bg-white/70 backdrop-blur-[60px] -webkit-backdrop-blur-[60px] saturate-[180%]
              border border-white/80
              rounded-[24px]
              shadow-[0_24px_64px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)]
              flex flex-col max-h-[calc(100vh-100px)] md:max-h-[85vh] overflow-hidden
            `}
          >
            {/* Header */}
            {title && (
              <div className="px-5 md:px-6 py-4 flex items-center justify-between border-b border-white/60">
                <h3 className="text-[17px] md:text-xl font-extrabold tracking-tight text-gray-900">
                  {title}
                </h3>
                <button 
                  onClick={onClose}
                  className="p-1.5 md:p-2 rounded-full hover:bg-neutral-100 transition-colors text-gray-500 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
