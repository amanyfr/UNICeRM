import axios from 'axios';

// ─── Axios Instance ───────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
// Lampirkan token ke setiap request jika tersedia

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('unicerm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────────────────
// Jika 401, bersihkan sesi dan redirect ke login

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Jangan redirect jika sudah di halaman login atau register
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/register';
      
      // Hanya bersihkan localStorage, jangan redirect jika sudah di halaman auth
      localStorage.removeItem('unicerm_token');
      localStorage.removeItem('unicerm_user');
      
      // Hanya redirect jika TIDAK di halaman login/register
      if (!isAuthPage) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ────────────────────────────────────────────────────────────────

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),

  getMe: () =>
    api.get('/auth/me'),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changePassword: (data: any) =>
    api.patch('/auth/change-password', data),
};

// ─── Ticket API ───────────────────────────────────────────────────────────────

export const ticketAPI = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/tickets', { params }),

  getById: (id: string) =>
    api.get(`/tickets/${id}`),

  create: (data: Record<string, unknown>) =>
    api.post('/tickets', data),

  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/tickets/${id}`, data),

  sendMessage: (id: string, message: string, isInternal?: boolean) =>
    api.post(`/tickets/${id}/messages`, { message, isInternal }),
};

// ─── Customer API ─────────────────────────────────────────────────────────────

export const customerAPI = {
  getAll: () =>
    api.get('/customers'),

  getById: (id: string) =>
    api.get(`/customers/${id}`),

  // Ambil profil customer yang sedang login
  getMe: () =>
    api.get('/customers/me'),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (data: any) =>
    api.post('/customers', data),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateMe: (data: any) =>
    api.patch('/customers/me', data),

  update: (id: number, data: any) => 
    api.patch(`/customers/${id}`, data),

  deleteCustomer: (id: number) => 
    api.delete(`/customers/${id}`),
};

// ─── Chatbot API ──────────────────────────────────────────────────────────────

export const chatbotAPI = {
  sendMessage: (message: string, chatHistory: unknown[]) =>
    api.post('/chatbot/message', { message, chatHistory }),

  getHistory: () =>
    api.get('/chatbot/history'),
};

// ─── Voucher API ──────────────────────────────────────────────────────────────

export const voucherAPI = {
  getAll: () =>
    api.get('/vouchers'),

  create: (data: Record<string, unknown>) =>
    api.post('/vouchers', data),

  claim: (id: string) =>
    api.post(`/vouchers/${id}/claim`),

  toggle: (id: string | number) =>
    api.patch(`/vouchers/${id}/toggle`),

  deactivate: (id: string) =>
    api.delete(`/vouchers/${id}`),

  delete: (id: string | number) =>
    api.delete(`/vouchers/${id}`),
};

// ─── Feedback API ─────────────────────────────────────────────────────────────

export const feedbackAPI = {
  create: (data: Record<string, unknown>) =>
    api.post('/feedbacks', data),

  getAll: () =>
    api.get('/feedbacks'),

  getStats: () =>
    api.get('/feedbacks/stats'),

  getMyFeedbacks: () =>
    api.get('/feedbacks/my'),
};

// ─── Notification API ────────────────────────────────────────────────────────

export const notificationAPI = {
  getAll: () =>
    api.get('/notifications'),

  markRead: (id: string) =>
    api.patch(`/notifications/${id}/read`),

  markAllRead: () =>
    api.patch('/notifications/read-all'),

  delete: (id: string) =>
    api.delete(`/notifications/${id}`),
};

// ─── Agent API ────────────────────────────────────────────────────────────

export const agentAPI = {
  getAll: () =>
    api.get('/auth/agents'),

  create: (data: any) =>
    api.post('/auth/agents', data),

  delete: (id: number) =>
    api.delete(`/auth/agents/${id}`),
};

export default api;
