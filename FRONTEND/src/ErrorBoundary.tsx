// @ts-nocheck
import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, background: '#1A1A1A', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ maxWidth: 600, padding: 32, background: '#222', borderRadius: 12, border: '1px solid #333' }}>
            <h1 style={{ color: '#F59E0B', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Sistem Mengalami Kendala</h1>
            <p style={{ color: '#aaa', fontSize: 14, marginBottom: 20 }}>Terjadi kesalahan saat merender halaman. Silakan coba muat ulang halaman.</p>
            <pre style={{ background: '#000', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 12, color: '#f87171' }}>{this.state.error?.toString()}</pre>
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              style={{ marginTop: 20, background: '#F59E0B', color: '#1A1A1A', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}
            >
              Reset ke Halaman Utama
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
