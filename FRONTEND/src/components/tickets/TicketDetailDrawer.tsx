import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Paperclip, 
  Smile, 
  Type, 
  Italic as ItalicIcon, 
  Bold as BoldIcon,
  MessageCircle,
  Clock,
  User,
  ChevronDown,
  ExternalLink,
  Bot,
  Star,
  Info,
  Eye
} from 'lucide-react';
import { 
  Ticket, 
  TicketMessage, 
  TicketStatus, 
  TicketPriority, 
  dummyCustomers 
} from '../../lib/dummy-data';
import { GlassCard, GlassBadge, GlassButton } from '../ui/glass';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';

interface TicketDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  onStatusChange: (ticketId: string, status: TicketStatus) => void;
  onSendMessage: (ticketId: string, message: TicketMessage) => void;
}

export function TicketDetailDrawer({ isOpen, onClose, ticket, onStatusChange, onSendMessage }: TicketDetailDrawerProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [localStatus, setLocalStatus] = useState<TicketStatus>(ticket?.status || 'open');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.role === 'admin';
  const isCS = user?.role === 'cs' || user?.role === 'agent';

  // Auto-scroll ke bawah
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Reset saat ticket berubah
  useEffect(() => {
    if (ticket) {
      setMessages(ticket.messages || []);
      setLocalStatus(ticket.status);
    } else {
      setMessages([]);
    }
  }, [ticket?.id]);

  if (!ticket) return null;

  const handleSend = async () => {
    if (!replyText.trim() || !ticket || isAdmin) return;
    setIsSending(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 400));
    
    const newMsg: TicketMessage = {
      id: 'm' + Date.now(),
      ticketId: ticket.id,
      senderName: user?.name || 'Agen',
      senderRole: (user?.role as any) || 'agent',
      content: replyText.trim(),
      isRead: true,
      createdAt: new Date().toISOString(),
      sender: (user?.role as any) || 'agent',
      name: user?.name || 'Agen',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    onSendMessage(ticket.id, newMsg);
    setReplyText('');
    setIsSending(false);
  };

  const handleStatusUpdate = (newStatus: TicketStatus) => {
    if (!ticket || isAdmin) return;
    setLocalStatus(newStatus);
    onStatusChange(ticket.id, newStatus);
    
    const sysMsg: TicketMessage = {
      id: 'sys' + Date.now(),
      ticketId: ticket.id,
      senderName: 'Sistem',
      senderRole: 'system',
      content: `Status diubah ke "${newStatus.toUpperCase()}" oleh ${user?.name || 'Agen'}`,
      isRead: true,
      createdAt: new Date().toISOString(),
      sender: 'system',
      name: 'Sistem',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, sysMsg]);
    if (newStatus === 'resolved') toast.success('Tiket berhasil di-resolve!');
  };

  const statusColors: Record<TicketStatus, string> = {
    'open': 'text-danger bg-danger/5 border-danger/20',
    'in-progress': 'text-warning bg-warning/5 border-warning/20',
    'resolved': 'text-success bg-success/5 border-success/20',
    'closed': 'text-text-soft bg-white/10 border-white/20',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-[580px] z-[60] flex flex-col bg-[#F5F5F5BF] backdrop-blur-[40px] saturate-[180%] border-l border-white/60 shadow-[-8px_0_40px_rgba(0,0,0,0.1)]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/20">
              {isAdmin && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-blue-600 leading-relaxed">
                    Anda dalam mode monitoring. Hanya CS/Agent yang dapat mengubah status atau membalas tiket.
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-black text-text-soft tracking-widest uppercase">#{ticket.id.toUpperCase()}</span>
                  <h2 className="text-lg font-black text-primary tracking-tight">{ticket.title}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-text-soft hover:bg-white/60 transition-all hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {isAdmin ? (
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border ${statusColors[localStatus]}`}>
                    {localStatus.toUpperCase()}
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      const statuses: TicketStatus[] = ['open', 'in-progress', 'resolved', 'closed'];
                      const currentIndex = statuses.indexOf(localStatus);
                      const nextIndex = (currentIndex + 1) % statuses.length;
                      handleStatusUpdate(statuses[nextIndex]);
                    }}
                    className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border transition-all cursor-pointer hover:scale-105 active:scale-95
                    ${statusColors[localStatus]}
                  `}>
                    {localStatus.toUpperCase()}
                    <ChevronDown size={12} />
                  </div>
                )}
                
                <GlassBadge variant={ticket.priority === 'urgent' ? 'danger' : ticket.priority === 'high' ? 'warning' : 'info'} size="sm" className="font-black">
                  {ticket.priority.toUpperCase()}
                </GlassBadge>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/40 border border-white/60 text-[10px] font-black text-text-soft uppercase tracking-widest">
                  <Clock size={12} />
                  SLA: <span className="text-danger">02:24:15</span>
                </div>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Info Bar */}
                <div className="p-4 grid grid-cols-2 gap-4">
                  <GlassCard className="p-3 flex items-center gap-3 shadow-none border-white/30">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent ring-2 ring-white/40">
                      {ticket.customerName.charAt(0)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] font-black text-text-soft uppercase tracking-widest mb-0.5">Customer</p>
                      <button 
                        onClick={() => navigate(`/customers/${ticket.customerId}`)}
                        className="flex items-center gap-1 text-sm font-black text-primary hover:text-accent-dark transition-colors group"
                      >
                        {ticket.customerName}
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-3 flex items-center gap-3 shadow-none border-white/30">
                    <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center text-info ring-2 ring-white/40">
                      <User size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-text-soft uppercase tracking-widest mb-0.5">Assignee</p>
                      <p className="text-sm font-black text-primary flex items-center gap-1">
                        {ticket.assigneeName}
                        {!isAdmin && <ChevronDown size={14} className="text-text-soft cursor-pointer hover:text-primary transition-colors" />}
                      </p>
                    </div>
                  </GlassCard>
                </div>

                 {/* Messages Thread */}
                <div 
                  className="flex-1 overflow-y-auto p-6 space-y-6"
                >
                  {messages.map((msg) => {
                    const isCustomer = msg.senderRole === 'customer' || msg.sender === 'customer';
                    const isAgent = msg.senderRole === 'agent' || msg.sender === 'agent';
                    const isBot = msg.senderRole === 'bot' || msg.sender === 'bot';
                    const isSystem = msg.senderRole === 'system' || msg.sender === 'system';

                    if (isSystem) {
                      return (
                        <div key={msg.id} className="flex justify-center">
                          <span className="px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-text-soft italic text-center">
                            {msg.content} · {msg.time || new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div key={msg.id} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 mb-1 px-1">
                          {isBot && <Bot size={12} className="text-[#3B82F6]" />}
                          <span className="text-[10px] font-black text-text-soft uppercase tracking-widest">{msg.senderName || msg.name}</span>
                          <span className="text-[10px] font-bold text-text-soft/60 italic">{msg.time || new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className={`
                          max-w-[85%] p-4 text-sm font-medium leading-relaxed shadow-sm transition-all hover:shadow-md
                          ${isCustomer ? 'bg-white/50 backdrop-blur-md border border-white/60 rounded-r-[20px] rounded-bl-[20px]' : ''}
                          ${isAgent ? 'bg-[#F5C518]/15 backdrop-blur-md border border-[#F5C518]/25 rounded-l-[20px] rounded-br-[20px] text-primary' : ''}
                          ${isBot ? 'bg-[#3B82F6]/12 backdrop-blur-md border border-[#3B82F6]/25 rounded-r-[20px] rounded-bl-[20px]' : ''}
                        `}>
                          {msg.content}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Reply Box */}
                {isAdmin ? (
                  <div className="p-6 border-t border-white/20 bg-white/40">
                    <div className="flex items-center justify-center gap-2 text-text-soft">
                      <Eye className="w-5 h-5 opacity-60" />
                      <span className="text-sm font-bold italic tracking-wide">
                        Mode monitoring — tidak bisa membalas pesan
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 border-t border-white/20 bg-white/10">
                    <div className="flex flex-col gap-3">
                      <div className="relative">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                            }
                          }}
                          disabled={isSending}
                          placeholder="Tulis balasan Anda..."
                          className="w-full p-4 pb-12 rounded-3xl bg-white/40 border border-white/60 focus:border-accent focus:bg-white/60 transition-all text-sm font-medium outline-none min-h-[100px] max-h-[150px] resize-none disabled:opacity-50"
                        />
                        <div className="absolute bottom-4 left-4 flex items-center gap-4 text-text-soft">
                          <button className="hover:text-primary transition-colors"><BoldIcon size={16} /></button>
                          <button className="hover:text-primary transition-colors"><ItalicIcon size={16} /></button>
                          <button className="hover:text-primary transition-colors"><Type size={16} /></button>
                          <button className="hover:text-primary transition-colors"><Smile size={16} /></button>
                          <button className="hover:text-primary transition-colors"><Paperclip size={16} /></button>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <GlassButton 
                            variant="primary" 
                            size="sm" 
                            icon={<Send size={14} />} 
                            className="px-4 py-2 font-black uppercase tracking-widest text-[9px]"
                            onClick={handleSend}
                            disabled={isSending}
                          >
                            {isSending ? 'Mengirim...' : 'Kirim'}
                          </GlassButton>
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <button 
                          onClick={() => handleStatusUpdate('resolved')}
                          className="text-[10px] font-black text-success uppercase tracking-widest hover:underline flex items-center gap-1.5"
                        >
                          <Star size={12} className="fill-success" />
                          Tandai Resolved
                        </button>
                        <p className="text-[9px] font-bold text-text-soft italic">Tekan Enter untuk mengirim</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible Info Panel (Right) */}
              <div className="w-[180px] bg-white/5 border-l border-white/10 p-4 space-y-8 h-full overflow-y-auto hidden md:block">
                <div>
                   <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Timeline</h4>
                   <div className="space-y-6 relative pl-3">
                     <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-white/20" />
                     {[
                       { event: 'Tiket dibuka', time: '10:00' },
                       { event: 'Bot merespons', time: '10:03' },
                       { event: 'Diteruskan ke agen', time: '10:10' },
                       { event: 'Agen merespons', time: '10:12' },
                     ].map((item, idx) => (
                       <div key={idx} className="relative">
                         <div className="absolute -left-[15px] top-1 w-2 h-2 rounded-full bg-accent border border-white shadow-[0_0_8px_rgba(245,197,24,0.4)]" />
                         <p className="text-[11px] font-black text-primary leading-tight">{item.event}</p>
                         <p className="text-[9px] font-bold text-text-soft">{item.time}</p>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                   <div className="space-y-1">
                     <p className="text-[9px] font-black text-text-soft uppercase tracking-widest">Dibuat Oleh</p>
                     <p className="text-xs font-black text-primary">System Automator</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-[9px] font-black text-text-soft uppercase tracking-widest">Channel Source</p>
                     <p className="text-xs font-black text-primary flex items-center gap-1.5">
                       <MessageCircle size={12} className="text-success" />
                       WhatsApp Business
                     </p>
                   </div>
                </div>

                <div className="pt-8">
                  {!isAdmin && (
                    <GlassButton variant="secondary" fullWidth className="text-[9px] font-black uppercase tracking-widest border-accent/40 text-accent-dark">
                      Minta Feedback
                    </GlassButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
