import React from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Circle, 
  Clock, 
  CheckCircle2, 
  Archive, 
  MessageSquare, 
  Mail, 
  FileText, 
  MessageCircle,
  MoreVertical,
  User,
  Plus
} from 'lucide-react';
import { Ticket, TicketStatus, TicketPriority } from '../../lib/dummy-data';
import { GlassCard, GlassBadge, GlassButton } from '../ui/glass';
import { motion, AnimatePresence } from 'motion/react';

interface KanbanBoardProps {
  tickets: Ticket[];
  onStatusChange: (ticketId: string, newStatus: TicketStatus) => void;
  onTicketClick?: (ticket: Ticket) => void;
}

const COLUMNS: { id: TicketStatus; label: string; icon: any; colorClass: string; badgeVariant: any }[] = [
  { id: 'open', label: 'OPEN', icon: Circle, colorClass: 'bg-danger/5 border-danger/10 text-danger', badgeVariant: 'danger' },
  { id: 'in-progress', label: 'IN PROGRESS', icon: Clock, colorClass: 'bg-warning/5 border-warning/10 text-warning', badgeVariant: 'warning' },
  { id: 'resolved', label: 'RESOLVED', icon: CheckCircle2, colorClass: 'bg-success/5 border-success/10 text-success', badgeVariant: 'success' },
  { id: 'closed', label: 'CLOSED', icon: Archive, colorClass: 'bg-white/10 border-white/20 text-text-soft', badgeVariant: 'default' },
];

const ChannelIcon = ({ channel }: { channel: Ticket['channel'] }) => {
  switch (channel) {
    case 'whatsapp': return <MessageCircle size={14} className="text-success" />;
    case 'email': return <Mail size={14} className="text-info" />;
    case 'form': return <FileText size={14} className="text-accent" />;
    case 'chat': return <MessageSquare size={14} className="text-primary" />;
    default: return null;
  }
};

const PriorityBadge = ({ priority }: { priority: TicketPriority }) => {
  const variants: Record<TicketPriority, any> = {
    low: 'default',
    medium: 'info',
    high: 'warning',
    urgent: 'danger',
  };
  return <GlassBadge variant={variants[priority]} size="sm">{priority.toUpperCase()}</GlassBadge>;
};

// --- Sortable Card Component ---
const SortableTicketCard: React.FC<{ ticket: Ticket; isOverlay?: boolean; onClick?: () => void }> = ({ ticket, isOverlay = false, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none group" onClick={onClick}>
      <GlassCard 
        className={`p-4 mb-4 cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow border-white/40
          ${isOverlay ? 'scale-105 rotate-1 shadow-2xl skew-x-1' : ''}
        `}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <PriorityBadge priority={ticket.priority} />
            <ChannelIcon channel={ticket.channel} />
          </div>

          <h4 className="text-sm font-black text-primary line-clamp-2 leading-tight min-h-[40px]">
            {ticket.title}
          </h4>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark text-[10px] font-black border border-white/40">
                {ticket.customerName.charAt(0)}
              </div>
              <span className="text-[10px] font-bold text-text-soft truncate max-w-[80px]">{ticket.customerName}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                 <div className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-primary text-[10px] font-black border border-white/60 shadow-sm">
                  <User size={12} />
                </div>
              </div>
              <span className="text-[9px] font-black text-text-soft italic">{new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="h-0 group-hover:h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
             <button className="text-[9px] font-black text-accent-dark uppercase tracking-widest hover:underline">Detail</button>
             <button className="text-[9px] font-black text-info uppercase tracking-widest hover:underline">Assign</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// --- Kanban Column Component ---
const KanbanColumn: React.FC<{ col: typeof COLUMNS[0]; tickets: Ticket[]; isOver?: boolean; onTicketClick?: (ticket: Ticket) => void }> = ({ col, tickets, isOver = false, onTicketClick }) => {
  return (
    <div className="flex flex-col min-w-[280px] w-full max-w-[320px] h-full">
      {/* Column Header */}
      <div className={`flex items-center justify-between p-4 mb-4 rounded-2xl border backdrop-blur-md ${col.colorClass}`}>
        <div className="flex items-center gap-3">
          <col.icon size={18} />
          <h3 className="text-xs font-black tracking-widest">{col.label}</h3>
        </div>
        <GlassBadge variant={col.badgeVariant} size="sm" className="font-black">{tickets.length}</GlassBadge>
      </div>

      {/* Drop Zone */}
      <div className={`
        flex-1 bg-white/10 backdrop-blur-sm border rounded-[20px] p-3 overflow-y-auto min-h-[500px] transition-all duration-200
        ${isOver ? 'bg-accent/10 border-accent border-dashed scale-[1.02] shadow-lg' : 'border-white/20'}
      `}>
        <SortableContext items={tickets.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tickets.map((ticket) => (
            <SortableTicketCard key={ticket.id} ticket={ticket} onClick={() => onTicketClick?.(ticket)} />
          ))}
          {tickets.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-text-soft/40 border-2 border-dashed border-white/10 rounded-2xl py-20 px-4 text-center">
              <Plus size={24} className="mb-2 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest">Tarik tiket ke sini</p>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}

// --- Main Kanban Board Component ---
export function KanbanBoard({ tickets: initialTickets, onStatusChange, onTicketClick }: KanbanBoardProps) {
  const [tickets, setTickets] = React.useState(initialTickets);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [overStatus, setOverStatus] = React.useState<TicketStatus | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeTicket = activeId ? tickets.find(t => t.id === activeId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      setOverStatus(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeIndex = tickets.findIndex(t => t.id === activeId);

    // Find the column we are hovering over (if it's a card id, find its status)
    let currentOverStatus: TicketStatus | null = null;
    const overTicket = tickets.find(t => t.id === overId);
    if (overTicket) {
      currentOverStatus = overTicket.status;
    } else {
      // It might be a column ID if we implement Droppable columns, but here we just check if it's one of the status strings
      if (COLUMNS.find(c => c.id === overId)) {
        currentOverStatus = overId as TicketStatus;
      }
    }

    setOverStatus(currentOverStatus);

    if (currentOverStatus && tickets[activeIndex].status !== currentOverStatus) {
      setTickets((prev: Ticket[]) => {
        const newTickets = [...prev];
        newTickets[activeIndex] = { ...newTickets[activeIndex], status: currentOverStatus! };
        return newTickets;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setOverStatus(null);
    
    if (over && active.id !== over.id) {
      const activeId = active.id as string;
      const overId = over.id as string;
      
      const activeIndex = tickets.findIndex(t => t.id === activeId);
      
      // If we dropped on another card, it might be in a different column
      const activeTicket = tickets[activeIndex];
      const overTicket = tickets.find(t => t.id === overId);
      
      const newStatus = overTicket ? overTicket.status : (COLUMNS.find(c => c.id === overId)?.id || activeTicket.status);

      if (activeTicket.status !== newStatus) {
        onStatusChange(activeId, newStatus);
      }

      setTickets((items: Ticket[]) => {
        const overIdx = items.findIndex(t => t.id === overId);
        const moved = arrayMove(items, activeIndex, overIdx);
        return moved.map(t => t.id === activeId ? { ...t, status: newStatus } : t);
      });
    }
    
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-10 min-h-[600px] -mx-8 px-8">
        {COLUMNS.map((col) => (
          <KanbanColumn 
            key={col.id} 
            col={col} 
            tickets={tickets.filter(t => t.status === col.id)} 
            isOver={overStatus === col.id}
            onTicketClick={onTicketClick}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.5',
            },
          },
        }),
      }}>
        {activeTicket ? (
          <SortableTicketCard ticket={activeTicket} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
