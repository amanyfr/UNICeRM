export type Role = 'admin' | 'agent' | 'customer';
export type Segment = 'prospek' | 'aktif' | 'tidak-aktif' | 'VIP';
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Channel = 'whatsapp' | 'email' | 'form' | 'chat';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  segment: Segment;
  source?: string;
  notes?: string;
  tags: string[];
  satisfactionScore?: number;
  lastInteraction?: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  channel: Channel;
  customerId: string;
  customerName: string;
  assignedTo?: string;
  assigneeName?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  ticketId: string;
  senderId?: string;
  senderName: string;
  senderRole: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatbotLog {
  id: string;
  customerId?: string;
  sessionId: string;
  question: string;
  answer: string;
  handoff: boolean;
  rating?: number;
  createdAt: string;
}

export interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  ticketId?: string;
  rating: number;
  comment?: string;
  category?: string;
  createdAt: string;
}

export interface Voucher {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  platform?: string;
  description?: string;
  maxUse: number;
  usedCount: number;
  expiredAt: string;
  isActive: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description?: string;
  type: string;
  targetSegment: Segment | 'All';
  status: 'draft' | 'running' | 'completed' | 'paused';
  content?: string;
  startDate?: string;
  endDate?: string;
  reach: number;
  conversion: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  isActive: boolean;
}

export interface Analytics {
  monthlyCustomers: Array<{ month: string; count: number; cumulative: number }>;
  ticketResolution: Array<{ month: string; resolved: number; open: number; inProgress: number }>;
  csatTrend: Array<{ month: string; score: number }>;
  segmentDist: Array<{ name: string; value: number }>;
  channelDist: Array<{ channel: string; count: number }>;
  agentPerformance: Array<{ name: string; resolved: number; avgTime: string }>;
  churnRisk: Array<{ id: string; name: string; riskLevel: 'HIGH' | 'MEDIUM' | 'LOW'; lastInteraction: string }>;
}
