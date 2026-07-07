import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from './ErrorBoundary';

// Cleanup old keys
[
  'currentUser',
  'unicerm_local_tickets_v3',
  'unicerm_local_customers_v3',
  'unicerm_local_vouchers',
  'registeredUsers',
  'user',
  'token',
].forEach(k => localStorage.removeItem(k));

// Validasi unicerm_user
try {
  const u = localStorage.getItem('unicerm_user');
  if (u) {
    const p = JSON.parse(u);
    if (!p?.id || !p?.role) {
      localStorage.removeItem('unicerm_token');
      localStorage.removeItem('unicerm_user');
    }
  }
} catch {
  localStorage.removeItem('unicerm_token');
  localStorage.removeItem('unicerm_user');
}

console.log('Storage cleaned');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
