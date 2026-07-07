import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Minus, 
  Send, 
  Bot, 
  Ticket
} from 'lucide-react';
import { GlassButton } from '../ui/glass';
import { dummyFAQs } from '../../lib/dummy-data';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'bot' | 'customer';
  content: string;
  time: string;
  isTicketAction?: boolean;
}

export function ChatWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFAQs] = useState(dummyFAQs.filter(f => f.isActive));
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'bot', 
      content: 'Halo! Aku asisten UNICeRM. Ada yang bisa aku bantu? 😊', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // 1. Cek dari FAQ aktif dulu (keyword matching)
    for (const faq of activeFAQs) {
      const keywords = faq.question.toLowerCase()
        .split(' ')
        .filter(w => w.length > 3);
      if (keywords.some(kw => msg.includes(kw))) return faq.answer;
    }

    // 2. Built-in fallback responses
    if (msg.match(/halo|hai|hi|hei|selamat pagi|selamat siang/)) {
      return 'Halo! Selamat datang di UNICeRM. Ada yang bisa aku bantu hari ini? 😊';
    }
    if (msg.match(/harga|biaya|tarif|price|berapa/)) {
      return 'Untuk informasi harga terbaru, silakan hubungi tim sales kami di sales@uniinside.id atau WA +62-812-3456-7890.';
    }
    if (msg.match(/jam|buka|tutup|operasional|waktu layanan/)) {
      return 'Layanan kami tersedia Senin–Jumat, 09.00–18.00 WIB. Di luar jam tersebut, pesan kamu akan kami balas di hari kerja berikutnya.';
    }
    if (msg.match(/komplain|masalah|tidak bisa|error|gagal|rusak/)) {
      return 'Mohon maaf atas ketidaknyamanannya! Untuk masalah teknis, aku sarankan membuat tiket layanan agar tim kami bisa membantu lebih cepat. Mau aku buatkan tiket sekarang?';
    }
    if (msg.match(/produk|layanan|service|apa saja|fitur/)) {
      return 'Uni Inside Media menyediakan: Platform Konten, UniSmiles (Kiosk Selfie), UNI-LandFarm (Landing Page), dan Uni Gift Studio (Souvenir 3D). Mau tahu lebih lanjut tentang layanan tertentu?';
    }
    if (msg.match(/ya|iya|ok|oke|setuju|mau|buat tiket|hubungkan|agen/)) {
      return 'HANDOFF: Baik! Aku akan menghubungkan kamu ke agen customer service kami. Mohon tunggu sebentar...';
    }
    if (msg.match(/tidak|nggak|ga|cancel|batal|nope/)) {
      return 'Baik, tidak masalah! Ada pertanyaan lain yang bisa aku bantu?';
    }
    if (msg.match(/terima kasih|makasih|thanks|thx/)) {
      return 'Sama-sama! Senang bisa membantu. Jangan ragu untuk chat lagi jika ada pertanyaan. 😊';
    }

    return 'Maaf, pertanyaanmu di luar jangkauan pengetahuanku saat ini. Apakah kamu ingin dihubungkan ke agen customer service kami yang siap membantu?';
  };

  const handleAskQuestion = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'customer',
      content: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
    
    const response = getBotResponse(userMsg.content);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      content: response.replace('HANDOFF: ', ''),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTicketAction: response.startsWith('HANDOFF:')
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
    if (!isOpen) setHasNewMessage(true);

    // Jika handoff, tambahkan tombol buat tiket sebagai pesan virtual
    if (response.startsWith('HANDOFF:')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          sender: 'bot',
          content: '__SHOW_TICKET_BUTTON__',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 500);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    handleAskQuestion(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            style={{ transformOrigin: 'bottom right' }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-[350px] h-[520px] max-h-[calc(100vh-100px)] flex flex-col rounded-[24px] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.18)] bg-white/90 backdrop-blur-[24px] border border-white/60"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-neutral-900 to-neutral-800 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5C518] to-[#E8A800] flex items-center justify-center text-neutral-900 shadow-md">
                  <Bot size={20} className="font-bold" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-white leading-none tracking-tight">UNICeRM Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[8.5px] font-black text-green-300 uppercase tracking-widest">Online Agent</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors cursor-pointer">
                  <Minus size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors cursor-pointer">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-neutral-50/70"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}>
                  <div className={`
                    max-w-[85%] px-4 py-3 text-[13px] leading-relaxed shadow-sm
                    ${msg.sender === 'customer' 
                      ? 'bg-gradient-to-tr from-[#E8A800] to-[#F5C518] text-neutral-900 rounded-[18px] rounded-tr-none font-medium' 
                      : 'bg-white border border-neutral-100 text-neutral-800 rounded-[18px] rounded-tl-none font-medium'}
                  `}>
                    {msg.content === '__SHOW_TICKET_BUTTON__' ? (
                      <button 
                        onClick={() => navigate('/tickets')} 
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer"
                      >
                        <Ticket size={14} className="text-[#F5C518]" />
                        Buat Tiket Layanan →
                      </button>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                  <span className="text-[9px] font-semibold text-neutral-400 italic mt-1 px-1.5">{msg.time}</span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-white border border-neutral-100 rounded-[18px] rounded-tl-none px-4 py-3.5 flex items-center gap-1.5 shadow-sm">
                    <motion.div 
                      animate={{ y: [0, -4, 0] }} 
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#E8A800]" 
                    />
                    <motion.div 
                      animate={{ y: [0, -4, 0] }} 
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#E8A800]" 
                    />
                    <motion.div 
                      animate={{ y: [0, -4, 0] }} 
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#E8A800]" 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions FAQs */}
            {activeFAQs.length > 0 && (
              <div className="bg-white/80 border-t border-neutral-100 py-2.5 flex flex-col gap-1 flex-shrink-0 select-none">
                <div className="px-4 pb-1">
                  <span className="text-[9.5px] font-extrabold text-neutral-400 uppercase tracking-widest block">Saran Pertanyaan</span>
                </div>
                <div className="flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
                  {activeFAQs.slice(0, 5).map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleAskQuestion(faq.question)}
                      className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/85 text-neutral-700 text-[11px] font-bold border border-neutral-200 transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] flex-shrink-0"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Form */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ketik pesan..."
                  className="w-full pl-4 pr-12 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/10 outline-none text-[13px] font-medium transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`
                    absolute right-1.5 w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer
                    ${inputText.trim() ? 'bg-gradient-to-br from-[#F5C518] to-[#E8A800] text-neutral-900 shadow-[0_4px_12px_rgba(245,197,24,0.3)]' : 'bg-neutral-100 text-neutral-400'}
                  `}
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessage(false);
        }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F5C518] to-[#E8A800] flex items-center justify-center text-neutral-900 shadow-[0_8px_24px_rgba(245,197,24,0.45)] relative transition-shadow hover:shadow-[0_12px_32px_rgba(245,197,24,0.55)] cursor-pointer"
      >
        <MessageCircle size={28} />
        {hasNewMessage && (
          <span className="absolute top-0 right-0 w-4.5 h-4.5 bg-red-500 rounded-full border-2 border-white animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}
