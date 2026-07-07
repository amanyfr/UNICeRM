import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader2, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    setFieldErrors({ email: '', password: '' });

    // Validasi email
    if (!email.trim()) {
      setFieldErrors(prev => ({ ...prev, email: 'Email tidak boleh kosong' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFieldErrors(prev => ({ ...prev, email: 'Format email tidak valid (contoh: name@gmail.com)' }));
      return;
    }

    // Validasi password
    if (!password.trim()) {
      setFieldErrors(prev => ({ ...prev, password: 'Password tidak boleh kosong' }));
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        const role = result.role || user?.role;
        if (role === 'admin' || role === 'ADMIN') navigate('/dashboard');
        else if (role === 'agent' || role === 'AGENT') navigate('/dashboard');
        else navigate('/portal');
      } else {
        // Login gagal - tampilkan error di password field
        setFieldErrors(prev => ({ ...prev, password: 'Email atau password salah, silakan coba lagi' }));
        setPassword(''); // Kosongkan password agar user bisa input ulang
      }
    } catch (err: any) {
      // Error dari server - tampilkan error di password field
      console.error('Login error:', err);
      setFieldErrors(prev => ({ ...prev, password: 'Email atau password salah, silakan coba lagi' }));
      setPassword(''); // Kosongkan password agar user bisa input ulang
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Panel Kiri */}
      <div className="hidden lg:flex w-[42%] bg-[#F5C518] flex-col relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full border-[40px] border-[#E8A800]/20 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] rounded-full border-[20px] border-[#E8A800]/20 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-8 lg:p-12">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] bg-[#1A1A1A] rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-[18px] text-[#F5C518]">U</span>
            </div>
            <span className="text-[22px] font-black text-[#1A1A1A] tracking-tight">UNICeRM</span>
          </div>

          {/* TENGAH */}
          <div className="flex-1 flex flex-col justify-center py-8">
            <h1 className="text-[#1A1A1A] font-black text-[38px] leading-[1.1] mb-6">
              Kelola relasi<br />media<br />dengan lebih<br />cerdas.
            </h1>
            <p className="text-[#1A1A1A]/80 text-[15px] leading-relaxed mb-10 max-w-[280px] font-medium">
              Platform CRM khusus untuk Uni Inside Media yang dirancang untuk efisiensi maksimal.
            </p>

            {/* CHECKLIST */}
            <div className="flex flex-col gap-4">
              {[
                'Manajemen Kontak Terpadu',
                'Tracking Penjualan Real-time',
                'Analitik Performa Tim',
                'Otomasi Workflow Pintar'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#F5C518] stroke-[3]" />
                  </div>
                  <span className="text-[#1A1A1A] font-bold text-[14px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* FOOTER */}
          <div className="mt-auto">
            <p className="text-[#1A1A1A]/60 text-[12px] font-medium">© 2024 Uni Inside Media Group</p>
          </div>
        </div>
      </div>

      {/* Panel Kanan */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(
            ellipse 70% 55% at 75% 15%,
            rgba(245,197,24,0.14) 0%,
            transparent 60%
          ),
          radial-gradient(
            ellipse 55% 50% at 25% 85%,
            rgba(245,159,11,0.09) 0%,
            transparent 55%
          ),
          linear-gradient(
            150deg,
            #FDFCF8 0%,
            #FAF7EF 45%,
            #FDFAF3 100%
          )
        `,
      }}>
        <div style={{
          position:'absolute', top:'-80px', right:'-80px',
          width:320, height:320, borderRadius:'50%',
          background:'rgba(245,197,24,0.12)',
          filter:'blur(80px)',
          pointerEvents:'none',
        }} />
        <div style={{
          position:'absolute', bottom:'-60px', left:'-60px',
          width:240, height:240, borderRadius:'50%',
          background:'rgba(245,159,11,0.08)',
          filter:'blur(60px)',
          pointerEvents:'none',
        }} />

        <div style={{
          width: '100%',
          maxWidth: 420,
          position: 'relative',
          zIndex: 1,
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '0.5px solid rgba(255,255,255,0.85)',
          borderRadius: 28,
          padding: '24px',
          boxShadow: `
            0 24px 64px rgba(0,0,0,0.08),
            0 8px 24px rgba(245,159,11,0.06),
            inset 0 1px 0 rgba(255,255,255,0.95),
            inset 0 -1px 0 rgba(255,255,255,0.50)
          `,
        }}>
          {/* HEADER */}
          <p style={{
            fontSize: 22, fontWeight: 700,
            color: '#1A1A1A', textAlign: 'center',
            marginBottom: 6, lineHeight: 1.2,
          }}>Masuk ke Akun</p>
          <p style={{
            fontSize: 13, textAlign: 'center',
            color: 'rgba(26,26,26,0.50)',
            marginBottom: 28, lineHeight: 1.5,
          }}>Masukkan email dan password untuk melanjutkan.</p>

          <div style={{
            height: '0.5px',
            background: 'linear-gradient(90deg, transparent, rgba(245,159,11,0.25), transparent)',
            marginBottom: 24, marginTop: -4,
          }} />


          {/* FORM */}
          <div className="space-y-0">
            {/* EMAIL */}
            <label style={{
              display: 'block',
              fontSize: 10, fontWeight: 700,
              color: 'rgba(26,26,26,0.45)',
              textTransform: 'uppercase',
              letterSpacing: '0.09em',
              marginBottom: 7,
            }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position:'relative', marginBottom:16 }}>
              <input
                type="text"
                placeholder="name@gmail.com"
                className="peer group"
                value={email}
                style={{
                  width: '100%',
                  height: 48,
                  background: 'rgba(255,255,255,0.60)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '0.5px solid rgba(255,255,255,0.85)',
                  borderRadius: 14,
                  padding: '0 16px 0 42px',
                  fontSize: 14,
                  color: '#1A1A1A',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: `
                    0 2px 8px rgba(0,0,0,0.04),
                    inset 0 1px 0 rgba(255,255,255,0.80)
                  `,
                }}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: '' })); }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.88)';
                  e.target.style.border = '0.5px solid rgba(245,159,11,0.45)';
                  e.target.style.boxShadow = `0 0 0 3px rgba(245,159,11,0.10), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)`;
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.60)';
                  e.target.style.border = '0.5px solid rgba(255,255,255,0.85)';
                  e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`;
                }}
              />
              <Mail style={{
                position:'absolute', left:14, top:'24px',
                transform:'translateY(-50%)',
                width:16, height:16,
                color:'rgba(26,26,26,0.30)',
                pointerEvents:'none',
              }} />

            </div>
            {fieldErrors.email && (
              <p className="text-red-500 text-[12px] mt-1 mb-2 flex items-center gap-1">
                <span>⚠</span>
                <span>{fieldErrors.email}</span>
              </p>
            )}

            {/* PASSWORD */}
            <label style={{
              display: 'block',
              fontSize: 10, fontWeight: 700,
              color: 'rgba(26,26,26,0.45)',
              textTransform: 'uppercase',
              letterSpacing: '0.09em',
              marginBottom: 7,
            }}>
              PASSWORD
            </label>
            <div style={{ position:'relative', marginBottom:16 }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                style={{
                  width: '100%',
                  height: 48,
                  background: 'rgba(255,255,255,0.60)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '0.5px solid rgba(255,255,255,0.85)',
                  borderRadius: 14,
                  padding: '0 42px 0 42px',
                  fontSize: 14,
                  color: '#1A1A1A',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: `
                    0 2px 8px rgba(0,0,0,0.04),
                    inset 0 1px 0 rgba(255,255,255,0.80)
                  `,
                }}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: '' })); }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.88)';
                  e.target.style.border = '0.5px solid rgba(245,159,11,0.45)';
                  e.target.style.boxShadow = `0 0 0 3px rgba(245,159,11,0.10), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)`;
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.60)';
                  e.target.style.border = '0.5px solid rgba(255,255,255,0.85)';
                  e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`;
                }}
              />
              <Lock style={{
                position:'absolute', left:14, top:'24px',
                transform:'translateY(-50%)',
                width:16, height:16,
                color:'rgba(26,26,26,0.30)',
                pointerEvents:'none',
              }} />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position:'absolute', right:14, top:'24px',
                  transform:'translateY(-50%)',
                  background:'none', border:'none',
                  cursor:'pointer', padding:4,
                  color:'rgba(26,26,26,0.35)',
                  transition:'color 0.15s ease',
                  display:'flex', alignItems:'center',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'rgba(26,26,26,0.65)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(26,26,26,0.35)'}
              >
                {showPassword ? (
                  <EyeOff style={{ width: 16, height: 16 }} />
                ) : (
                  <Eye style={{ width: 16, height: 16 }} />
                )}
              </button>

            </div>
            {fieldErrors.password && (
              <p className="text-red-500 text-[12px] mt-1 mb-2 flex items-center gap-1">
                <span>⚠</span>
                <span>{fieldErrors.password}</span>
              </p>
            )}

            {/* INGAT SAYA + LUPA PASSWORD */}
            <div style={{
              display:'flex', justifyContent:'space-between',
              alignItems:'center', marginBottom:22, marginTop:4,
            }}>
              <div 
                style={{ display:'flex', alignItems:'center', gap:8 }}
                onClick={() => setRememberMe(!rememberMe)}
              >
                <div style={{
                  width:18, height:18,
                  background: rememberMe 
                    ? 'linear-gradient(135deg,#F59E0B,#F5C518)' 
                    : 'rgba(255,255,255,0.70)',
                  backdropFilter:'blur(8px)',
                  WebkitBackdropFilter:'blur(8px)',
                  border: rememberMe 
                    ? 'none' 
                    : '0.5px solid rgba(0,0,0,0.20)',
                  borderRadius:5, cursor:'pointer',
                  display:'flex', alignItems:'center',
                  justifyContent:'center',
                  transition:'all 0.15s ease',
                  boxShadow: rememberMe 
                    ? '0 2px 8px rgba(245,159,11,0.35)' 
                    : '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                  {rememberMe && <Check style={{ width:10, height:10, color:'#1A1A1A' }} />}
                </div>
                <label style={{
                  fontSize:12, color:'rgba(26,26,26,0.50)', 
                  cursor:'pointer'
                }}>INGAT SAYA</label>
              </div>
              
              <span 
                style={{
                  fontSize:12, fontWeight:700,
                  color:'#F59E0B', cursor:'pointer',
                  letterSpacing:'0.04em',
                  textTransform:'uppercase',
                  transition:'color 0.15s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#D97706'}
                onMouseOut={(e) => e.currentTarget.style.color = '#F59E0B'}
              >
                LUPA PASSWORD?
              </span>
            </div>

            {/* SUBMIT */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              style={{
                width:'100%', height:52,
                background:'linear-gradient(135deg,#F59E0B 0%,#F5C518 100%)',
                color:'#1A1A1A',
                border:'none',
                borderRadius:16,
                fontSize:14, fontWeight:800,
                letterSpacing:'0.05em',
                textTransform:'uppercase',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition:'all 0.2s ease',
                boxShadow:`
                  0 6px 20px rgba(245,159,11,0.38),
                  0 2px 6px rgba(245,159,11,0.20),
                  inset 0 1px 0 rgba(255,255,255,0.30)
                `,
                display:'flex', alignItems:'center',
                justifyContent:'center', gap:8,
                position:'relative', overflow:'hidden',
                opacity: isLoading ? 0.85 : 1
              }}
              onMouseOver={(e) => {
                if(!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = `0 10px 30px rgba(245,159,11,0.45), 0 4px 12px rgba(245,159,11,0.25), inset 0 1px 0 rgba(255,255,255,0.35)`;
                }
              }}
              onMouseOut={(e) => {
                if(!isLoading) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = `0 6px 20px rgba(245,159,11,0.38), 0 2px 6px rgba(245,159,11,0.20), inset 0 1px 0 rgba(255,255,255,0.30)`;
                }
              }}
              onMouseDown={(e) => {
                if(!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0) scale(0.99)';
                }
              }}
              onMouseUp={(e) => {
                if(!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
            >
              <style>{`
                @keyframes shimmer { 
                  to { transform: translateX(100%) } 
                }
              `}</style>
              <div style={{
                position:'absolute', inset:0,
                background:'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.20) 50%, transparent 100%)',
                transform:'translateX(-100%)',
                animation:'shimmer 2.5s infinite',
              }} />
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" style={{ width:16, height:16, color:'#1A1A1A' }} />
                  MEMVERIFIKASI...
                </>
              ) : 'MASUK SEKARANG'}
            </button>
          </div>

          {/* REGISTER LINK */}
          <div style={{
            textAlign:'center', marginTop:18,
            fontSize:13, color:'rgba(26,26,26,0.50)',
          }}>
            Belum punya akun? <span 
              onClick={() => navigate('/register')}
              style={{
                color:'#F59E0B', fontWeight:700,
                cursor:'pointer',
                transition:'color 0.15s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#D97706'}
              onMouseOut={(e) => e.currentTarget.style.color = '#F59E0B'}
            >
              Daftar sekarang
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
