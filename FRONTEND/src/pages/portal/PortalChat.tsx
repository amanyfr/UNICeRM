import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, HelpCircle, TicketCheck, CheckCircle2, Clock, Loader2, Info, Tag, DollarSign, MessageCircle, User } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { toast } from 'sonner';
import { chatbotAPI, ticketAPI } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string | number;
  type: 'bot' | 'user' | 'system' | 'typing' | 'ticket-form' | 'ticket-success';
  content?: string;
  time?: string;
  ticketNum?: number;
  title?: string;
  submitted?: boolean;
  quickActions?: boolean;
}

const SLASH_COMMANDS = [
  { 
    cmd: '/help', 
    label: 'Konsultasi dengan CS',
    desc: 'Buat tiket dan hubungi customer service',
    icon: HelpCircle,
    color: 'text-blue-500'
  },
  { 
    cmd: '/tiket', 
    label: 'Buat Tiket Baru',
    desc: 'Laporkan masalah atau pertanyaan',
    icon: TicketCheck,
    color: 'text-[#F59E0B]'
  },
  { 
    cmd: '/harga', 
    label: 'Info Harga',
    desc: 'Lihat informasi harga layanan',
    icon: DollarSign,
    color: 'text-green-500'
  },
  { 
    cmd: '/voucher', 
    label: 'Cek Voucher',
    desc: 'Lihat voucher dan promo aktif',
    icon: Tag,
    color: 'text-purple-500'
  },
  { 
    cmd: '/layanan', 
    label: 'Info Layanan',
    desc: 'Informasi produk Uni Inside Media',
    icon: Info,
    color: 'text-gray-500'
  },
];

const formatTime = (date: Date) => 
  date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', minute: '2-digit' 
  });

function TicketFormCard({ onSubmit, isSubmitted }: { onSubmit: (title: string) => void, isSubmitted: boolean, key?: any }) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  if (isSubmitted) return null;
  
  const handleSubmit = async () => {
    if (!title.trim()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    onSubmit(title);
    setIsLoading(false);
  };

  return (
    <div className="flex items-start gap-2 sm:gap-2.5 relative">
      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-[#2A2A2A]">
        <Bot className="w-4 h-4 text-[#F59E0B]" />
      </div>
      
      <div className="bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[20px] rounded-tl-none p-4 sm:p-5 w-full max-w-[92%] sm:max-w-[75%] relative">
        <div className="absolute top-0 -left-2 w-2 h-3 bg-white/95 border-l border-t border-neutral-200/80 rounded-tl-[12px] hidden md:block" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/25 flex items-center justify-center flex-shrink-0">
              <TicketCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D97706]" />
            </div>
            <span className="font-extrabold text-[13.5px] sm:text-[15px] text-[#1A1A1A] tracking-tight">
              Buat Tiket Konsultasi
            </span>
          </div>
          
          <p className="text-[11.5px] sm:text-[13px] font-bold text-gray-500 mb-3.5 sm:mb-4 leading-relaxed">
            CS kami siap membantu! Laporkan masalah atau pertanyaan Anda di bawah ini.
          </p>
          
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ketik judul konsultasi..."
            className="w-full h-11 bg-white border border-neutral-200 rounded-xl px-3 text-[12px] sm:text-[13px] text-[#1A1A1A] outline-none focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/8 mb-3 placeholder:text-gray-400 placeholder:font-bold transition-all shadow-inner"
            onKeyDown={e => {
              if (e.key === 'Enter' && title.trim()) {
                handleSubmit();
              }
            }}
          />
          
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || isLoading}
            className="w-full h-11 bg-[#1A1A1A] hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-[#F59E0B] font-extrabold text-[11px] sm:text-[12px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.12)] active:scale-[0.98] border border-[#2A2A2A]">
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                MEMBUAT TIKET...
              </>
            ) : (
              <>
                <TicketCheck className="w-3.5 h-3.5" />
                BUAT TIKET KONSULTASI
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function TicketSuccessCard({ ticketNum, title }: { ticketNum?: number, title?: string, key?: any }) {
  return (
    <div className="flex items-start gap-2 sm:gap-2.5 relative">
      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-[#2A2A2A]">
        <Bot className="w-4 h-4 text-[#F59E0B]" />
      </div>
      
      <div className="bg-green-50/90 border border-green-200 overflow-hidden shadow-[0_6px_20px_rgba(34,197,94,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[20px] rounded-tl-none w-full max-w-[92%] sm:max-w-[75%] relative">
        <div className="absolute top-0 -left-2 w-2 h-3 bg-green-50/90 border-l border-t border-green-200 rounded-tl-[12px] hidden md:block" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
        <div className="relative z-10">
          <div className="p-3 sm:p-4 border-b border-green-100 bg-white/50 flex items-center gap-2">
            <div className="w-5.5 h-5.5 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            </div>
            <span className="font-extrabold text-[11px] sm:text-[12px] text-green-700 uppercase tracking-wider">
              Tiket Berhasil Dibuat
            </span>
          </div>
          
          <div className="p-4 sm:p-5">
            <div className="bg-white/80 border border-neutral-100 rounded-xl p-3 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-[13.5px] sm:text-[15px] text-[#1A1A1A] tracking-tight">
                  #TKT-{ticketNum}
                </span>
                <span className="bg-green-100/60 border border-green-200/50 text-green-700 text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wider rounded-lg">
                  OPEN
                </span>
              </div>
              <p className="text-[12px] sm:text-[13px] font-bold text-[#1A1A1A] mt-1.5 leading-relaxed">
                "{title}"
              </p>
              <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-neutral-100">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 italic">
                  CS akan segera merespons tiketmu
                </span>
              </div>
            </div>
            
            <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 bg-white/40 px-3 py-2 rounded-lg inline-block border border-neutral-200 mt-3 shadow-xs">
              Cek status di menu 
              <span className="text-[#F59E0B] font-extrabold cursor-pointer hover:underline ml-1">
                TIKET →
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortalChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: 'Halo! Saya UNI Assistant 👋\nSaya siap membantu Anda tentang layanan Uni Inside Media.\n\nKetik pertanyaan Anda atau gunakan tombol /help untuk konsultasi langsung dengan CS kami.',
      time: formatTime(new Date()),
      quickActions: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isTicketMode, setIsTicketMode] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState('');
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // ─── Fetch riwayat chat dari backend saat mount ───────────────────────────
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res     = await chatbotAPI.getHistory();
        const history = res.data?.data ?? res.data ?? [];
        if (Array.isArray(history) && history.length > 0) {
          const mapped = history
            .map((h: any) => ([
              {
                id:      `${h.id}_user`,
                type:    'user' as const,
                content: h.message,
                time:    new Date(h.createdAt).toLocaleTimeString('id-ID', {
                  hour: '2-digit', minute: '2-digit',
                }),
              },
              {
                id:      `${h.id}_bot`,
                type:    'bot' as const,
                content: h.response,
                time:    new Date(h.createdAt).toLocaleTimeString('id-ID', {
                  hour: '2-digit', minute: '2-digit',
                }),
              },
            ]))
            .flat();
          setMessages(prev => [...prev, ...mapped]);
        }
      } catch (err) {
        console.error('Failed to fetch chat history:', err);
      }
    };
    fetchHistory();
  }, []);


  const triggerTicketFlow = async () => {
    setIsTicketMode(true);
    setShowSlashMenu(false);
    
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 800));
    setIsTyping(false);

    const botMsg: Message = {
      id: Date.now() + 1,
      type: 'bot',
      content: 'Maaf, saya belum bisa menjawab pertanyaan ini. Saya akan buatkan tiket konsultasi agar CS kami bisa membantu lebih lanjut.',
      time: formatTime(new Date())
    };
    setMessages(prev => [...prev, botMsg]);
    
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 800));
    setIsTyping(false);
    
    setMessages(prev => [...prev, {
      id: Date.now() + 2,
      type: 'ticket-form',
      time: formatTime(new Date()),
      submitted: false
    }]);
  };

  const handleCreateTicket = async (title: string) => {
    try {
      // Panggil backend API untuk buat tiket
      const response = await ticketAPI.create({
        title: title,
        description: title, // Gunakan title sebagai description juga
        priority: 'medium',
        channel: 'chat'
        // customerId tidak perlu dikirim, backend akan assign dari JWT token
      });
      
      const ticket = response.data?.data || response.data;
      const ticketNum = ticket?.ticketNumber || ticket?.id || 'NEW';
      
      // Update UI untuk tampilkan sukses
      setMessages(prev => prev.map(m =>
        m.type === 'ticket-form'
          ? { ...m, type: 'ticket-success', ticketNum, title, submitted: true }
          : m
      ));
      
      setIsTicketMode(false);
      toast.success(`Tiket #${ticketNum} berhasil dibuat!`);
    } catch (error: any) {
      console.error('Failed to create ticket:', error);
      toast.error('Gagal membuat tiket. Silakan coba lagi.');
      
      // Reset form state agar bisa coba lagi
      setMessages(prev => prev.map(m =>
        m.type === 'ticket-form'
          ? { ...m, submitted: false }
          : m
      ));
    }
  };

  const handleSend = async (text?: string) => {
    const content = (text || inputValue).trim();
    if (!content) return;

    setInputValue('');
    setShowSlashMenu(false);

    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      content,
      time: formatTime(new Date()),
    };
    setMessages(prev => [...prev, userMsg]);

    // Typing indicator
    const typingId = Date.now() + 1;
    setMessages(prev => [...prev, { id: typingId, type: 'typing' }]);

    try {
      // Build chat history dari messages yang ada
      const chatHistory = messages
        .filter(m => m.type === 'user' || m.type === 'bot')
        .map(m => ({
          role: m.type === 'user' ? 'user' : 'model',
          parts: [{ text: m.content || '' }],
        }));

      const res  = await chatbotAPI.sendMessage(content, chatHistory);
      const data = res.data?.data ?? res.data;

      // Hapus typing indicator
      setMessages(prev => prev.filter(m => m.id !== typingId));

      // Tambah response bot
      setMessages(prev => [...prev, {
        id:      Date.now(),
        type:    'bot',
        content: data.response ?? data.message ?? 'Maaf, tidak ada respons dari server.',
        time:    formatTime(new Date()),
      }]);

      // Jika backend auto-buat tiket
      if (data.ticketCreated && data.ticket) {
        setMessages(prev => [...prev, {
          id:      Date.now() + 2,
          type:    'system',
          content: `✅ Tiket ${data.ticket.ticketNumber} berhasil dibuat! Tim CS kami akan segera menangani. Kamu bisa cek status tiket di menu Tiket.`,
          time:    formatTime(new Date()),
        }]);
      }
    } catch {
      setMessages(prev => prev.filter(m => m.id !== typingId));
      setMessages(prev => [...prev, {
        id:      Date.now(),
        type:    'bot',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        time:    formatTime(new Date()),
      }]);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.startsWith('/')) {
      setShowSlashMenu(true);
      setSlashFilter(value.slice(1).toLowerCase());
    } else {
      setShowSlashMenu(false);
    }
  };
  
  const handleSlashCommand = (cmd: typeof SLASH_COMMANDS[0]) => {
    setShowSlashMenu(false);
    setInputValue('');

    if (cmd.cmd === '/tiket') {
      // Navigasi langsung ke halaman tiket portal
      navigate('/portal/my-tickets');
    } else if (cmd.cmd === '/voucher') {
      // Navigasi langsung ke halaman voucher portal
      navigate('/portal/vouchers');
    } else if (cmd.cmd === '/help') {
      // Tampilkan chat user lalu trigger tiket flow
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'user',
        content: cmd.cmd,
        time: formatTime(new Date()),
      }]);
      triggerTicketFlow();
    } else {
      // /harga, /layanan, dll → kirim sebagai pesan ke chatbot API
      handleSend(cmd.label);
    }
  };

  const filteredCommands = SLASH_COMMANDS.filter(c =>
    c.cmd.includes(slashFilter) || 
    c.label.toLowerCase().includes(slashFilter)
  );

  return (
    <PortalLayout>
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0) }
          30% { transform: translateY(-4px) }
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5 w-full flex flex-col h-[calc(100vh-56px)] overflow-hidden">
        
        {/* Responsive Header */}
        <div className="flex-shrink-0 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 border-b border-gray-100 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between sm:justify-start gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A1A1A] flex items-center gap-2 leading-none">
                <Bot className="w-5 h-5 text-[#F59E0B]" />
                Uni Bot
              </h1>
              {/* Online badge for Mobile */}
              <div className="sm:hidden flex items-center gap-1.5 border border-amber-500/20 rounded-full px-2.5 py-1 bg-amber-50/50 backdrop-blur-sm shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[9px] font-black text-amber-700 tracking-wider uppercase">ONLINE</span>
              </div>
            </div>
            <p className="text-[11.5px] sm:text-xs font-bold text-gray-500 leading-normal max-w-prose">
              Hubungi asisten virtual cerdas kami untuk bantuan instan
            </p>
          </div>
          
          {/* Online badge for Desktop */}
          <div className="hidden sm:flex items-center gap-1.5 border border-amber-500/20 rounded-full px-2.5 py-1 bg-amber-50/50 backdrop-blur-sm shadow-xs flex-shrink-0 self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[9px] font-black text-amber-700 tracking-wider uppercase">ONLINE</span>
          </div>
        </div>
        
        {/* CHAT CONTAINER */}
        <div className="flex-1 min-h-0 flex flex-col bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] border border-neutral-200/60 shadow-md">
            
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-5 space-y-3 sm:space-y-4">
              {messages.map(msg => {
                if (msg.type === 'bot') {
                  return (
                    <div key={msg.id} className="flex flex-col gap-1.5 relative">
                       <div className="flex items-start gap-2 max-w-[94%] sm:max-w-[75%]">
                         <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-[#2A2A2A]">
                           <Bot className="w-4 h-4 text-[#F59E0B]" />
                         </div>
                         <div className="flex flex-col items-start gap-1 flex-1">
                           <div className="bg-white border border-neutral-200/80 text-[#1A1A1A] rounded-2xl rounded-tl-none px-3.5 py-2.5 sm:px-4 sm:py-3 text-[12.5px] sm:text-[13px] leading-relaxed shadow-sm relative">
                             {/* Optional Tail */}
                             <div className="absolute top-0 -left-1.5 w-1.5 h-3 bg-white border-l border-t border-neutral-200/80 rounded-tl-[10px] hidden md:block" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                             <div dangerouslySetInnerHTML={{ __html: (msg.content || '').replace(/\n/g, '<br/>') }} className="relative z-10" />
                           </div>
                           <span className="text-[8px] font-extrabold text-gray-400 px-1 uppercase tracking-wider">{msg.time}</span>
                         </div>
                       </div>
                       
                       {msg.quickActions && (
                         <div className="flex flex-wrap gap-1.5 mt-0.5 pl-10">
                           {['/help', '/tiket', '/harga', '/voucher'].map(cmd => {
                             const cmdObj = SLASH_COMMANDS.find(c => c.cmd === cmd);
                             if (!cmdObj) return null;
                             return (
                               <button 
                                 key={cmd} 
                                 onClick={() => handleSlashCommand(cmdObj)}
                                 className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 hover:border-amber-500/40 hover:bg-amber-50/50 shadow-xs rounded-full text-[11px] sm:text-xs text-gray-600 hover:text-amber-700 transition-all font-bold"
                               >
                                 <span className="font-extrabold text-[#D97706]">{cmd}</span>
                               </button>
                             );
                           })}
                         </div>
                       )}
                    </div>
                  );
                }
                
                if (msg.type === 'user') {
                  return (
                    <div key={msg.id} className="flex items-start gap-2 max-w-[94%] sm:max-w-[75%] ml-auto flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                         <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2B2B2B] text-white shadow-sm border border-[#2A2A2A] rounded-2xl rounded-tr-none px-3.5 py-2.5 sm:px-4 sm:py-3 text-[12.5px] sm:text-[13px] font-medium leading-relaxed relative">
                           <div className="absolute top-0 -right-1.5 w-1.5 h-3 bg-[#1A1A1A] border-r border-t border-[#3A3A3A] rounded-tr-[10px] hidden md:block" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                           <span className="relative z-10">{msg.content}</span>
                         </div>
                         <span className="text-[8px] font-extrabold text-gray-400 px-1 uppercase tracking-wider">{msg.time}</span>
                      </div>
                    </div>
                  );
                }
                
                if (msg.type === 'ticket-form') {
                  return <TicketFormCard key={msg.id} onSubmit={handleCreateTicket} isSubmitted={msg.submitted || false} />;
                }
                
                if (msg.type === 'ticket-success') {
                  return <TicketSuccessCard key={msg.id} ticketNum={msg.ticketNum} title={msg.title} />;
                }

                if (msg.type === 'system') {
                  return (
                    <div key={msg.id} className="flex justify-center px-2">
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-2.5 shadow-sm max-w-[90%]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        <p className="text-[11.5px] font-semibold text-green-700 leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  );
                }
                
                return null;
              })}
              
              {isTyping && (
                <div key="typing" className="flex items-start gap-2 relative">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-[#2A2A2A]">
                    <Bot className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-none px-3 py-2 flex items-center h-[34px] shadow-sm relative">
                    <div className="absolute top-0 -left-1.5 w-1.5 h-3 bg-white border-l border-t border-neutral-200 rounded-tl-[10px] hidden md:block" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                    <div className="flex gap-1.5 items-center relative z-10">
                      {[0, 150, 300].map(delay => (
                        <span key={delay} className="w-1.5 h-1.5 rounded-full bg-neutral-400" style={{ animation: `bounce 1s ${delay}ms infinite` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex-shrink-0 border-t border-neutral-200/60 p-3.5 sm:p-4 bg-white/95 relative rounded-b-2xl sm:rounded-b-[2rem] shadow-sm">
              {showSlashMenu && filteredCommands.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-neutral-200/80 rounded-2xl shadow-lg overflow-hidden z-20 mx-2 sm:mx-3 backdrop-blur-xl">
                  <div className="px-3 py-1.5 border-b border-neutral-100 bg-neutral-50">
                    <span className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest">Perintah Chat</span>
                  </div>
                  <div className="max-h-[180px] overflow-y-auto">
                    {filteredCommands.map(cmd => (
                      <div 
                        key={cmd.cmd}
                        onClick={() => handleSlashCommand(cmd)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-neutral-50 cursor-pointer transition-colors border-b border-neutral-100 last:border-0"
                      >
                        <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 border border-neutral-200 shadow-xs">
                          <cmd.icon className={`w-3.5 h-3.5 ${cmd.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-mono font-bold text-[#1A1A1A]">{cmd.cmd}</span>
                            <span className="text-[11px] font-bold text-gray-600 truncate">{cmd.label}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 truncate hidden xs:block">{cmd.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <MessageCircle className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    value={inputValue}
                    onChange={e => handleInputChange(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (inputValue.trim()) handleSend(inputValue);
                      }
                      if (e.key === 'Escape') setShowSlashMenu(false);
                    }}
                    placeholder={isTicketMode ? 'Selesaikan pembuatan tiket...' : 'Ketik pertanyaan /help...'}
                    disabled={isTicketMode}
                    className={`w-full h-[44px] rounded-xl pl-10 pr-3 text-[12.5px] outline-none transition-all border ${isTicketMode ? 'bg-neutral-100 text-gray-400 border-neutral-200 cursor-not-allowed shadow-none opacity-60' : 'bg-white border-neutral-200 text-[#1A1A1A] focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/8 placeholder:text-gray-400 font-medium'}`}
                  />
                </div>
                <button 
                  onClick={() => inputValue.trim() && handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTicketMode}
                  className={`w-[44px] h-[44px] rounded-xl flex items-center justify-center flex-shrink-0 transition-all shadow-sm group ${
                    !inputValue.trim() || isTicketMode
                      ? 'bg-neutral-100 cursor-not-allowed border border-neutral-200'
                      : 'bg-[#F59E0B] hover:bg-[#D97706] active:scale-95 border border-[#F59E0B]'
                  }`}
                >
                  <Send className={`w-[16px] h-[16px] transition-colors ${
                    !inputValue.trim() || isTicketMode
                      ? 'text-neutral-400'
                      : 'text-white'
                  }`} />
                </button>
              </div>
              
              {!isTicketMode && (
                <div className="mt-2 text-center">
                  <button 
                    onClick={() => handleSlashCommand(SLASH_COMMANDS.find(c => c.cmd === '/help')!)}
                    className="w-full h-11 bg-[#1A1A1A] hover:bg-neutral-800 rounded-xl flex items-center justify-center gap-2 text-xs text-white font-bold transition-all shadow-xs active:scale-[0.99] group border border-white/10 px-3 overflow-hidden"
                  >
                    <HelpCircle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                    <span className="truncate text-[11px] sm:text-xs">
                      Butuh bantuan CS?
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
      </div>
    </PortalLayout>
  );
}
