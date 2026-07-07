import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Customers from './pages/customers/CustomerPage';
import CustomerDetail from './pages/customers/CustomerDetail';
import Tickets from './pages/tickets/TicketPage';
import Chatbot from './pages/chatbot/ChatbotPage';
import Analytics from './pages/analytics/AnalyticsPage';
import Feedback from './pages/feedback/FeedbackPage';
import Vouchers from './pages/vouchers/VoucherPage';
import Settings from './pages/settings/SettingsPage';
import PortalHome from './pages/portal/PortalHome';
import PortalTickets from './pages/portal/PortalTickets';
import PortalFeedback from './pages/portal/PortalFeedback';
import PortalChat from './pages/portal/PortalChat';
import PortalProfile from './pages/portal/PortalProfile';
import PortalVouchers from './pages/portal/PortalVouchers';
import { AuthProvider, useAuth } from './hooks/useAuth';
import NotFound from './pages/NotFound';
import { LoadingScreen } from './components/ui/glass/LoadingScreen';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: ('admin' | 'agent' | 'customer')[] }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    if (user.role === 'customer') return <Navigate to="/portal" replace />;
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) {
    if (user?.role === 'customer') return <Navigate to="/portal" replace />;
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster 
          position="top-center"
          expand={false}
          toastOptions={{
            style: {
              background: 'rgba(26, 26, 26, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              color: '#fff',
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              animation: 'spring 0.5s ease-out'
            },
            className: 'font-sans'
          }}
        />
        <Routes>
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
          
          {/* Dashboard route redirects for seamless compatibility */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/dashboard/customers" element={<Navigate to="/customers" replace />} />
          <Route path="/dashboard/customers/:id" element={<Navigate to="/customers/:id" replace />} />
          <Route path="/dashboard/tickets" element={<Navigate to="/tickets" replace />} />
          <Route path="/dashboard/chatbot" element={<Navigate to="/chatbot" replace />} />
          <Route path="/dashboard/analytics" element={<Navigate to="/analytics" replace />} />
          <Route path="/dashboard/feedback" element={<Navigate to="/feedback" replace />} />
          <Route path="/dashboard/vouchers" element={<Navigate to="/vouchers" replace />} />
          <Route path="/dashboard/settings" element={<Navigate to="/settings" replace />} />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'agent']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        <Route 
          path="/customers" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'agent']}>
              <Customers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/customers/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'agent']}>
              <CustomerDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tickets" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'agent']}>
              <Tickets />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chatbot" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'agent']}>
              <Chatbot />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Analytics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/feedback" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'agent']}>
              <Feedback />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/vouchers" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Vouchers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'agent']}>
              <Settings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/portal" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <PortalHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/portal/chat" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <PortalChat />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/portal/my-tickets" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <PortalTickets />
            </ProtectedRoute>
          } 
        />
        {/* Alias untuk backward compatibility */}
        <Route 
          path="/portal/tickets" 
          element={<Navigate to="/portal/my-tickets" replace />}
        />
        <Route 
          path="/portal/feedback" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <PortalFeedback />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/portal/profile" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <PortalProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/portal/vouchers" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <PortalVouchers />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}
