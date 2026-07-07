'use client';

import React from 'react';
import { 
  UserCircle, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getInitials } from '../../lib/utils/user';

interface UserProfilePopupProps {
  onClose: () => void;
}

export function UserProfilePopup({ onClose }: UserProfilePopupProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
    toast.success('Berhasil keluar sistem!');
  };

  const initials = getInitials(user.name);

  const MENU_ITEMS = [
    {
      icon: UserCircle,
      label: 'Edit Profil',
      description: 'Ubah data dan informasi akun',
      onClick: () => {
        navigate('/settings?tab=profile');
        onClose();
      }
    },
  ];

  return (
    <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-[240px] bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden">
      {/* HEADER (info user — tidak bisa diklik) */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-[44px] h-[44px] rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-[#1A1A1A] font-bold text-[16px] leading-none select-none">
              {initials}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[14px] font-semibold text-[#1A1A1A] leading-tight truncate">
              {user.name}
            </span>
            <span className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">
              {user.role === 'admin' ? 'Admin' : 'Agent'}
            </span>
          </div>
        </div>
      </div>

      {/* MENU ITEMS */}
      <div className="py-2 px-2">
        {MENU_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group select-none"
            >
              <div className="w-[34px] h-[34px] rounded-xl bg-gray-100 group-hover:bg-[#FEF3C7] flex items-center justify-center flex-shrink-0 transition-colors">
                <Icon className="w-4 h-4 text-gray-500 group-hover:text-[#F59E0B] transition-colors" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium text-[#1A1A1A] truncate">{item.label}</span>
                <span className="text-[11px] text-gray-400 truncate">{item.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ITEM KELUAR */}
      <div className="border-t border-gray-100 py-2 px-2">
        <div 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 cursor-pointer transition-colors group select-none"
        >
          <div className="w-[34px] h-[34px] rounded-xl bg-gray-100 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-medium text-gray-600 group-hover:text-red-600 transition-colors truncate">Keluar</span>
            <span className="text-[11px] text-gray-400 group-hover:text-red-400 transition-colors truncate">Logout dari akun ini</span>
          </div>
        </div>
      </div>
    </div>
  );
}

