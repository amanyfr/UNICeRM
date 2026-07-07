import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, UserCircle, CheckCircle2, XCircle, Loader2, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const registerSchema = z.object({
  name: z.string().min(1, 'Nama tidak boleh kosong').min(2, 'Nama lengkap minimal 2 karakter'),
  email: z.string().min(1, 'Email tidak boleh kosong').email('Format email tidak valid'),
  password: z.string()
    .min(6, 'Password minimal 6 karakter')
    .regex(/[A-Z]/, 'Harus ada huruf kapital')
    .regex(/[0-9]/, 'Harus ada angka'),
  confirmPassword: z.string().min(1, 'Konfirmasi password tidak boleh kosong'),
  terms: z.boolean().refine(v => v === true, { message: 'Wajib disetujui' }),
}).refine(
  data => data.password === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword']
  }
);

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });

  const passwordVal = watch('password', '');
  const confirmPasswordVal = watch('confirmPassword', '');

  // Password strength logic
  let strengthWidth = 'w-0';
  let strengthColor = '';
  let strengthText = '';
  let strengthTextColor = '';

  if (passwordVal.length > 0) {
    if (passwordVal.length < 6) {
      strengthWidth = 'w-1/4';
      strengthColor = 'bg-red-400';
      strengthText = 'Terlalu lemah';
      strengthTextColor = 'text-red-400';
    } else if (passwordVal.length < 9 && !(/[A-Z]/.test(passwordVal) && /[0-9]/.test(passwordVal))) {
      strengthWidth = 'w-2/4';
      strengthColor = 'bg-[#F5C518]';
      strengthText = 'Cukup kuat';
      strengthTextColor = 'text-[#E8A800]';
    } else if (passwordVal.length >= 8 && /[A-Z]/.test(passwordVal) && /[0-9]/.test(passwordVal)) {
      strengthWidth = 'w-full';
      strengthColor = 'bg-green-500';
      strengthText = 'Password kuat ✓';
      strengthTextColor = 'text-green-500';
    }
  }

  const onSubmit = async (data: RegisterFormValues) => {
    // Clear previous field errors
    setFieldErrors({ name: '', email: '', password: '', confirmPassword: '' });

    // CLIENT-SIDE VALIDATION
    let hasError = false;

    // Validasi nama
    if (!data.name || data.name.trim().length === 0) {
      setFieldErrors(prev => ({ ...prev, name: 'Nama tidak boleh kosong' }));
      hasError = true;
    }

    // Validasi email
    if (!data.email || data.email.trim().length === 0) {
      setFieldErrors(prev => ({ ...prev, email: 'Email tidak boleh kosong' }));
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setFieldErrors(prev => ({ ...prev, email: 'Format email tidak valid' }));
      hasError = true;
    }

    // Validasi password minimal 6 karakter
    if (!data.password || data.password.length < 6) {
      setFieldErrors(prev => ({ ...prev, password: 'Password minimal 6 karakter' }));
      hasError = true;
    }

    // Validasi konfirmasi password
    if (!data.confirmPassword || data.confirmPassword.trim().length === 0) {
      setFieldErrors(prev => ({ ...prev, confirmPassword: 'Konfirmasi password tidak boleh kosong' }));
      hasError = true;
    } else if (data.password !== data.confirmPassword) {
      setFieldErrors(prev => ({ ...prev, confirmPassword: 'Password tidak sama' }));
      hasError = true;
    }

    // STOP jika ada error client-side
    if (hasError) {
      return;
    }

    // Kirim ke backend
    setIsLoading(true);
    try {
      console.log('[Register] submitting:', { name: data.name, email: data.email });
      const result = await registerUser(data.name, data.email, data.password);
      console.log('[Register] result:', result);

      if (result.success) {
        toast.success('Akun berhasil dibuat! Silakan login.');
        navigate('/login');
      } else {
        // SERVER-SIDE ERROR HANDLING
        const errMsg = result.error || '';
        if (errMsg.toLowerCase().includes('sudah') || errMsg.toLowerCase().includes('exist') || errMsg.toLowerCase().includes('already')) {
          setFieldErrors(prev => ({ ...prev, email: 'Email sudah digunakan, silakan gunakan email lain' }));
          setError('email', { message: 'Email sudah digunakan, silakan gunakan email lain' });
        } else {
          toast.error(errMsg || 'Registrasi gagal, coba lagi.');
        }
      }
    } catch (err: any) {
      // SERVER-SIDE ERROR HANDLING
      const status = err?.response?.status;
      const backendMsg = err?.response?.data?.message || '';
      
      console.error('[Register] error:', err);
      
      // Cek apakah error 409 (Conflict) atau pesan "email already"
      if (status === 409 || backendMsg.toLowerCase().includes('email already') || backendMsg.toLowerCase().includes('sudah digunakan')) {
        setFieldErrors(prev => ({ ...prev, email: 'Email sudah digunakan, silakan gunakan email lain' }));
        setError('email', { message: 'Email sudah digunakan, silakan gunakan email lain' });
      } else {
        toast.error(backendMsg || 'Terjadi kesalahan. Coba lagi.');
      }
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
              Daftar dan nikmati layanan customer support Uni Inside Media.
            </p>

            {/* STEP CARDS */}
            <div className="flex flex-col gap-3 max-w-[280px]">
              {[
                'Buat akun Anda',
                'Mulai chat dengan AI',
                'Dapatkan bantuan CS'
              ].map((item, i) => {
                const isActive = i === 0;
                return isActive ? (
                  <div key={i} className="flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-[14px] px-4 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/40">
                    <div className="bg-[#1A1A1A] text-[#F5C518] font-black rounded-full flex items-center justify-center w-[24px] h-[24px] text-[11px]">
                      {i + 1}
                    </div>
                    <span className="text-[#1A1A1A] font-bold text-[13px]">{item}</span>
                  </div>
                ) : (
                  <div key={i} className="flex items-center gap-3 bg-black/5 border border-black/5 rounded-[14px] px-4 py-3">
                    <div className="bg-[#1A1A1A]/10 text-[#1A1A1A]/40 flex items-center justify-center rounded-full w-[24px] h-[24px] text-[11px] font-bold">
                      {i + 1}
                    </div>
                    <span className="text-[#1A1A1A]/40 text-[13px] font-semibold">{item}</span>
                  </div>
                );
              })}
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
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: '20px', position: 'relative', overflow: 'hidden',
        background: `
          radial-gradient(ellipse 70% 55% at 75% 15%, rgba(245,197,24,0.14) 0%, transparent 60%),
          radial-gradient(ellipse 55% 50% at 25% 85%, rgba(245,159,11,0.09) 0%, transparent 55%),
          linear-gradient(150deg, #FDFCF8 0%, #FAF7EF 45%, #FDFAF3 100%)
        `,
      }}>
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:320, height:320, borderRadius:'50%', background:'rgba(245,197,24,0.12)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:240, height:240, borderRadius:'50%', background:'rgba(245,159,11,0.08)', filter:'blur(60px)', pointerEvents:'none' }} />

        <div style={{
          width: '100%', maxWidth: 420, position: 'relative', zIndex: 1,
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(40px) saturate(200%)', WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '0.5px solid rgba(255,255,255,0.85)', borderRadius: 28, padding: '24px',
          boxShadow: `0 24px 64px rgba(0,0,0,0.08), 0 8px 24px rgba(245,159,11,0.06), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(255,255,255,0.50)`
        }}>
          {/* HEADER */}
          <p style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', marginBottom: 6, lineHeight: 1.2 }}>Buat Akun Baru</p>
          <p style={{ fontSize: 13, textAlign: 'center', color: 'rgba(26,26,26,0.50)', marginBottom: 28, lineHeight: 1.5 }}>Daftar sebagai pelanggan Uni Inside Media.</p>

          <div style={{ height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(245,159,11,0.25), transparent)', marginBottom: 24, marginTop: -4 }} />

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
            {/* ROW 1: Nama */}
            <div style={{ position:'relative', marginBottom:16 }}>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(26,26,26,0.45)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 7 }}>NAMA LENGKAP</label>
              <input
                {...register('name', {
                  onChange: () => {
                    setFieldErrors(prev => ({ ...prev, name: '' }));
                    clearErrors('name');
                  }
                })}
                placeholder="Masukkan nama lengkap"
                style={{
                  width: '100%', height: 48, background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: (errors.name || fieldErrors.name) ? '0.5px solid rgba(239,68,68,0.6)' : '0.5px solid rgba(255,255,255,0.85)',
                  borderRadius: 14, padding: '0 16px', fontSize: 14, color: '#1A1A1A', outline: 'none', transition: 'all 0.2s ease',
                  boxShadow: `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`,
                }}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.88)'; e.target.style.border = '0.5px solid rgba(245,159,11,0.45)'; e.target.style.boxShadow = `0 0 0 3px rgba(245,159,11,0.10), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)`; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.60)'; e.target.style.border = (errors.name || fieldErrors.name) ? '0.5px solid rgba(239,68,68,0.6)' : '0.5px solid rgba(255,255,255,0.85)'; e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`; }}
              />
              {(errors.name || fieldErrors.name) && (
                <p style={{ fontSize:11, color:'#EF4444', marginTop:5, marginBottom:0, display:'flex', alignItems:'center', gap:4 }}>
                  <span>⚠</span>
                  <span>{fieldErrors.name || errors.name?.message}</span>
                </p>
              )}
            </div>

            {/* EMAIL */}
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(26,26,26,0.45)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 7 }}>EMAIL ADDRESS</label>
            <div style={{ position:'relative', marginBottom:16 }}>
              <input
                {...register('email', {
                  onChange: () => {
                    setFieldErrors(prev => ({ ...prev, email: '' }));
                    clearErrors('email');
                  }
                })}
                type="email"
                placeholder="name@company.com"
                style={{
                  width: '100%', height: 48, background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: (errors.email || fieldErrors.email) ? '0.5px solid rgba(239,68,68,0.6)' : '0.5px solid rgba(255,255,255,0.85)',
                  borderRadius: 14, padding: '0 16px 0 42px', fontSize: 14, color: '#1A1A1A', outline: 'none', transition: 'all 0.2s ease',
                  boxShadow: `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`,
                }}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.88)'; e.target.style.border = '0.5px solid rgba(245,159,11,0.45)'; e.target.style.boxShadow = `0 0 0 3px rgba(245,159,11,0.10), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)`; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.60)'; e.target.style.border = (errors.email || fieldErrors.email) ? '0.5px solid rgba(239,68,68,0.6)' : '0.5px solid rgba(255,255,255,0.85)'; e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`; }}
              />
              <Mail style={{ position:'absolute', left:14, top:'24px', transform:'translateY(-50%)', width:16, height:16, color:'rgba(26,26,26,0.30)', pointerEvents:'none' }} />
              {(errors.email || fieldErrors.email) && (
                <p style={{ fontSize:11, color:'#EF4444', marginTop:5, marginBottom:0, display:'flex', alignItems:'center', gap:4 }}>
                  <span>⚠</span>
                  <span>{fieldErrors.email || errors.email?.message}</span>
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(26,26,26,0.45)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 7 }}>PASSWORD</label>
            <div style={{ position:'relative', marginBottom:8 }}>
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                style={{
                  width: '100%', height: 48, background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: errors.password ? '0.5px solid rgba(239,68,68,0.6)' : '0.5px solid rgba(255,255,255,0.85)',
                  borderRadius: 14, padding: '0 42px 0 42px', fontSize: 14, color: '#1A1A1A', outline: 'none', transition: 'all 0.2s ease',
                  boxShadow: `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`,
                }}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.88)'; e.target.style.border = '0.5px solid rgba(245,159,11,0.45)'; e.target.style.boxShadow = `0 0 0 3px rgba(245,159,11,0.10), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)`; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.60)'; e.target.style.border = errors.password ? '0.5px solid rgba(239,68,68,0.6)' : '0.5px solid rgba(255,255,255,0.85)'; e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`; }}
              />
              <Lock style={{ position:'absolute', left:14, top:'24px', transform:'translateY(-50%)', width:16, height:16, color:'rgba(26,26,26,0.30)', pointerEvents:'none' }} />
              <button 
                type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position:'absolute', right:14, top:'24px', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', padding:4, color:'rgba(26,26,26,0.35)', transition:'color 0.15s ease', display:'flex', alignItems:'center' }}
                onMouseOver={(e) => e.currentTarget.style.color = 'rgba(26,26,26,0.65)'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(26,26,26,0.35)'}
              >
                {showPassword ? <EyeOff style={{ width:16, height:16 }} /> : <Eye style={{ width:16, height:16 }} />}
              </button>
            </div>
            {/* PASSWORD STRENGTH BAR */}
            <div style={{ height:3, borderRadius:99, background:'rgba(0,0,0,0.06)', marginTop:8, overflow:'hidden' }}>
              <div style={{
                height:'100%', borderRadius:99, transition:'all 0.3s ease',
                background: passwordVal.length === 0 ? 'transparent' : (passwordVal.length < 6 ? '#EF4444' : (passwordVal.length < 9 && !(/[A-Z]/.test(passwordVal) && /[0-9]/.test(passwordVal)) ? 'linear-gradient(90deg,#F59E0B,#F5C518)' : 'linear-gradient(90deg,#22C55E,#4ADE80)')),
                width: passwordVal.length === 0 ? '0%' : (passwordVal.length < 6 ? '25%' : (passwordVal.length < 9 && !(/[A-Z]/.test(passwordVal) && /[0-9]/.test(passwordVal)) ? '60%' : '100%')),
              }} />
            </div>
            <div style={{ marginBottom:16 }}>
              {passwordVal.length > 0 && <p style={{ fontSize:10, marginTop:4, marginBottom:0, color: passwordVal.length < 6 ? '#EF4444' : (passwordVal.length < 9 && !(/[A-Z]/.test(passwordVal) && /[0-9]/.test(passwordVal)) ? '#F59E0B' : '#22C55E') }}>{strengthText}</p>}
              {errors.password && <p style={{ fontSize:11, color:'#EF4444', marginTop:4, marginBottom:0, display:'flex', alignItems:'center', gap:4 }}><AlertCircle style={{ width:12, height:12 }} />{errors.password.message}</p>}
            </div>

            {/* CONFIRM PASSWORD */}
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(26,26,26,0.45)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 7 }}>KONFIRMASI PASSWORD</label>
            <div style={{ position:'relative', marginBottom:20 }}>
              <input
                {...register('confirmPassword', {
                  onChange: () => {
                    setFieldErrors(prev => ({ ...prev, confirmPassword: '' }));
                    clearErrors('confirmPassword');
                  }
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                style={{
                  width: '100%', height: 48, background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: (errors.confirmPassword || fieldErrors.confirmPassword) ? '0.5px solid rgba(239,68,68,0.6)' : '0.5px solid rgba(255,255,255,0.85)',
                  borderRadius: 14, padding: '0 42px 0 42px', fontSize: 14, color: '#1A1A1A', outline: 'none', transition: 'all 0.2s ease',
                  boxShadow: `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`,
                }}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.88)'; e.target.style.border = '0.5px solid rgba(245,159,11,0.45)'; e.target.style.boxShadow = `0 0 0 3px rgba(245,159,11,0.10), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)`; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.60)'; e.target.style.border = (errors.confirmPassword || fieldErrors.confirmPassword) ? '0.5px solid rgba(239,68,68,0.6)' : '0.5px solid rgba(255,255,255,0.85)'; e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)`; }}
              />
              <Lock style={{ position:'absolute', left:14, top:'24px', transform:'translateY(-50%)', width:16, height:16, color:'rgba(26,26,26,0.30)', pointerEvents:'none' }} />
              {confirmPasswordVal ? (
                confirmPasswordVal === passwordVal ? <CheckCircle2 style={{ width:16, height:16, color:'#22C55E' }} className="absolute right-[14px] top-[24px] -translate-y-1/2" /> : <XCircle style={{ width:16, height:16, color:'#EF4444' }} className="absolute right-[14px] top-[24px] -translate-y-1/2" />
              ) : (
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position:'absolute', right:14, top:'24px', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', padding:4, color:'rgba(26,26,26,0.35)', transition:'color 0.15s ease', display:'flex', alignItems:'center' }} onMouseOver={(e) => e.currentTarget.style.color = 'rgba(26,26,26,0.65)'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(26,26,26,0.35)'}>
                  {showConfirmPassword ? <EyeOff style={{ width:16, height:16 }} /> : <Eye style={{ width:16, height:16 }} />}
                </button>
              )}
              {(errors.confirmPassword || fieldErrors.confirmPassword) && (
                <p style={{ fontSize:11, color:'#EF4444', marginTop:5, marginBottom:0, display:'flex', alignItems:'center', gap:4 }}>
                  <span>⚠</span>
                  <span>{fieldErrors.confirmPassword || errors.confirmPassword?.message}</span>
                </p>
              )}
            </div>

            {/* CHECKBOX TERMS */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:24, marginTop:4 }}>
              <div style={{ position: 'relative' }}>
                <input {...register('terms')} type="checkbox" className="peer absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
                <div style={{ width:18, height:18, borderRadius:5, background: 'rgba(255,255,255,0.70)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', border: '0.5px solid rgba(0,0,0,0.20)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }} className="peer-checked:!border-none peer-checked:!bg-gradient-to-br peer-checked:from-[#F59E0B] peer-checked:to-[#F5C518] peer-checked:!shadow-[0_2px_8px_rgba(245,159,11,0.35)]">
                  <Check style={{ width:10, height:10, color:'#1A1A1A' }} className="opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize:12, color:'rgba(26,26,26,0.55)', lineHeight:1.5 }}>Saya setuju dengan <span style={{ color:'#F59E0B', fontWeight:600, cursor:'pointer' }}>Syarat & Ketentuan</span></label>
                {errors.terms && <p style={{ fontSize:11, color:'#EF4444', marginTop:5, marginBottom:0, display:'flex', alignItems:'center', gap:4 }}><AlertCircle style={{ width:12, height:12 }} />{errors.terms.message}</p>}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit" disabled={isLoading}
              style={{
                width:'100%', height:52, background:'linear-gradient(135deg,#F59E0B 0%,#F5C518 100%)', color:'#1A1A1A', border:'none', borderRadius:16,
                fontSize:14, fontWeight:800, letterSpacing:'0.05em', textTransform:'uppercase', cursor: isLoading ? 'not-allowed' : 'pointer', transition:'all 0.2s ease',
                boxShadow:`0 6px 20px rgba(245,159,11,0.38), 0 2px 6px rgba(245,159,11,0.20), inset 0 1px 0 rgba(255,255,255,0.30)`,
                display:'flex', alignItems:'center', justifyContent:'center', gap:8, position:'relative', overflow:'hidden', opacity: isLoading ? 0.85 : 1
              }}
              onMouseOver={(e) => { if(!isLoading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 10px 30px rgba(245,159,11,0.45), 0 4px 12px rgba(245,159,11,0.25), inset 0 1px 0 rgba(255,255,255,0.35)`; } }}
              onMouseOut={(e) => { if(!isLoading) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 6px 20px rgba(245,159,11,0.38), 0 2px 6px rgba(245,159,11,0.20), inset 0 1px 0 rgba(255,255,255,0.30)`; } }}
              onMouseDown={(e) => { if(!isLoading) e.currentTarget.style.transform = 'translateY(0) scale(0.99)'; }}
              onMouseUp={(e) => { if(!isLoading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            >
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.20) 50%, transparent 100%)', transform:'translateX(-100%)', animation:'shimmer 2.5s infinite' }} />
              {isLoading ? <><Loader2 className="animate-spin" style={{ width:16, height:16, color:'#1A1A1A' }} />MEMBUAT AKUN...</> : 'DAFTAR SEKARANG'}
            </button>
          </form>

          <div style={{ textAlign:'center', marginTop:18, fontSize:13, color:'rgba(26,26,26,0.50)' }}>
            Sudah punya akun? <span onClick={() => navigate('/login')} style={{ color:'#F59E0B', fontWeight:700, cursor:'pointer', transition:'color 0.15s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#D97706'} onMouseOut={(e) => e.currentTarget.style.color = '#F59E0B'}>Masuk di sini</span>
          </div>
        </div>
      </div>
    </div>
  );
}
