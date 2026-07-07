import React from 'react';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-[#1A1A1A]">
      <div className="w-full px-8 pt-10 pb-8">
        <div className="grid grid-cols-4 gap-8">
          
          <div className="flex flex-col gap-4 col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <span className="font-bold text-[13px] text-[#1A1A1A]">U</span>
              </div>
              <span className="text-[15px] font-bold text-white tracking-tight">UNICeRM</span>
            </div>
            
            <p className="text-[13px] text-gray-400 leading-relaxed">
              Platform CRM khusus untuk Uni Inside Media yang dirancang untuk efisiensi maksimal dalam mengelola relasi media.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="#" className="w-[30px] h-[30px] rounded-full bg-[#2A2A2A] hover:bg-[#F59E0B] flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-[30px] h-[30px] rounded-full bg-[#2A2A2A] hover:bg-[#F59E0B] flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-[30px] h-[30px] rounded-full bg-[#2A2A2A] hover:bg-[#F59E0B] flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-[30px] h-[30px] rounded-full bg-[#2A2A2A] hover:bg-[#F59E0B] flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] transition-colors"><Github className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-wider mb-1">Produk</h4>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Fitur</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Harga</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Integrasi</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Pembaruan</a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-wider mb-1">Sumber Daya</h4>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Dokumentasi</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Tutorial</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Blog</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Dukungan</a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-wider mb-1">Perusahaan</h4>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Tentang</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Karir</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Kontak</a>
            <a href="#" className="text-[13px] text-gray-400 hover:text-[#F59E0B] cursor-pointer transition-colors">Mitra</a>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[#2A2A2A] px-8 py-4 flex justify-between items-center">
        <span className="text-[12px] text-gray-500">
          © 2026 UNICeRM. Hak cipta dilindungi undang-undang.
        </span>
        <div className="flex gap-5">
          <a href="#" className="text-[12px] text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Kebijakan Privasi</a>
          <a href="#" className="text-[12px] text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Ketentuan Layanan</a>
          <a href="#" className="text-[12px] text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Pengaturan Cookie</a>
        </div>
      </div>
    </footer>
  );
}
