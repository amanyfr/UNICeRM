'use client';

import React, { useState, useEffect } from 'react';
import {
  Bot,
  MessageSquare,
  TicketCheck,
  CheckCircle2,
  Info,
  Hash,
  Tag,
  Clock,
  Headphones,
  ShoppingBag,
  HelpCircle,
  DollarSign,
  Gift,
  Instagram,
  Heart,
  Zap
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { chatbotAPI } from '../../lib/api';

// ─── Keyword categories tampilan ─────────────────────────────────────────────
const KEYWORDS = [
  { label: 'Halo / Salam',         icon: Heart,        desc: 'halo, hi, selamat, pagi, siang, malam' },
  { label: 'Layanan & Produk',      icon: ShoppingBag,  desc: 'layanan, produk, platform, fitur' },
  { label: 'Harga & Biaya',         icon: DollarSign,   desc: 'harga, biaya, tarif, cost, price' },
  { label: 'Voucher & Promo',       icon: Tag,          desc: 'voucher, promo, diskon, kode, coupon' },
  { label: 'Masalah & Kendala',     icon: HelpCircle,   desc: 'masalah, error, gagal, tidak bisa, kendala' },
  { label: 'Customer Service',      icon: Headphones,   desc: 'cs, agen, manusia, bantuan, hubungi' },
  { label: 'Uni Gift Studio',       icon: Gift,         desc: 'gift, souvenir, 3d, cetak, merchandise' },
  { label: 'Jam Operasional',       icon: Clock,        desc: 'jam, buka, tutup, operasional, hari' },
  { label: 'Instagram',             icon: Instagram,    desc: 'instagram, ig, sosmed, follow, post' },
  { label: 'Terima Kasih',          icon: Zap,          desc: 'terima kasih, makasih, thanks, thx' },
];

export default function ChatbotPage() {
  const [totalChats, setTotalChats]     = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res     = await chatbotAPI.getHistory();
        const history = res.data?.data ?? res.data ?? [];
        const arr     = Array.isArray(history) ? history : [];
        setTotalChats(arr.length);
        setTotalTickets(arr.filter((h: any) => h.ticketCreated || h.handoff).length);
      } catch (err) {
        console.error('Failed to fetch chatbot history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
                AI Chatbot Monitor
              </h1>
              <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Rule-Based Active
              </span>
            </div>
            <p className="text-[14px] text-gray-500 mt-0.5">
              Pantau aktivitas chatbot dan keyword yang tersedia untuk customer.
            </p>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Card 1 — Total Percakapan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-[46px] h-[46px] rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <span className="text-[30px] font-black text-[#1A1A1A] leading-none block">
                {loading ? '…' : totalChats}
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                Total Percakapan
              </span>
            </div>
          </div>

          {/* Card 2 — Tiket dari Chatbot */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-[46px] h-[46px] rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
              <TicketCheck className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <span className="text-[30px] font-black text-[#1A1A1A] leading-none block">
                {loading ? '…' : totalTickets}
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                Tiket dari Chatbot
              </span>
            </div>
          </div>

          {/* Card 3 — Status */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-[46px] h-[46px] rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <span className="text-[30px] font-black text-green-600 leading-none block">
                Aktif
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                Status Chatbot
              </span>
            </div>
          </div>

        </div>

        {/* INFO BOX */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <Info className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-amber-800 font-medium leading-relaxed">
            Chatbot ini menggunakan sistem <strong>rule-based keyword matching</strong>.
            Customer akan otomatis dibuatkan tiket jika pertanyaan tidak dapat dijawab oleh bot,
            sehingga tim CS dapat menangani langsung.
          </p>
        </div>

        {/* KEYWORD CATEGORIES */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Hash className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-[16px] font-bold text-[#1A1A1A]">
              Keyword yang Tersedia
            </h2>
            <span className="ml-auto text-[11px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {KEYWORDS.length} kategori
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {KEYWORDS.map((kw, i) => {
              const Icon = kw.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-amber-200 hover:bg-amber-50/40 transition-all duration-200"
                >
                  <div className="w-[36px] h-[36px] rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-[#1A1A1A] leading-snug">
                      {kw.label}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed truncate" title={kw.desc}>
                      {kw.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOT INFO */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[42px] h-[42px] rounded-xl bg-[#1A1A1A] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-[#1A1A1A]">UNI Assistant</h2>
              <p className="text-[12px] text-gray-400 font-medium">Powered by Groq AI + Rule-Based Fallback</p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tipe</span>
              <span className="font-semibold text-[#1A1A1A]">Hybrid (AI + Rule-Based)</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Fallback</span>
              <span className="font-semibold text-[#1A1A1A]">Auto-create Tiket</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Platform</span>
              <span className="font-semibold text-[#1A1A1A]">Portal Customer</span>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
