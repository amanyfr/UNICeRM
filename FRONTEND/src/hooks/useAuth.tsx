import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api';

export type UserRole = 'admin' | 'agent' | 'customer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; status?: number; role?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('unicerm_token');
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Validasi format token JWT (harus 3 bagian)
      try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid token format');

        // Cek expired dari payload JWT
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }
      } catch {
        localStorage.removeItem('unicerm_token');
        localStorage.removeItem('unicerm_user');
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Coba verifikasi ke backend
      try {
        const res      = await authAPI.getMe();
        const verified = res.data?.data ?? res.data?.user ?? res.data;
        setUser({
          id:     verified.id,
          email:  verified.email,
          role:   verified.role as UserRole,
          name:   verified.name,
          avatar: verified.avatar,
        });
      } catch (err: any) {
        if (err?.response?.status === 401) {
          // Token tidak valid — hapus sesi
          localStorage.removeItem('unicerm_token');
          localStorage.removeItem('unicerm_user');
          setUser(null);
        } else {
          // Backend mati / network error — pakai data localStorage sementara
          const userRaw = localStorage.getItem('unicerm_user');
          if (userRaw) {
            try {
              const parsed = JSON.parse(userRaw);
              if (parsed?.id && parsed?.role) {
                setUser(parsed as User);
              } else {
                setUser(null);
              }
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user: userData } = response.data?.data ?? response.data;

      // Simpan token dan data user ke localStorage
      localStorage.setItem('unicerm_token', token);
      localStorage.setItem('unicerm_user', JSON.stringify({
        id: userData.id,
        email: userData.email,
        role: userData.role,
        name: userData.name,
        avatar: userData.avatar,
      }));

      const authUser: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role as UserRole,
        avatar: userData.avatar,
      };

      setUser(authUser);
      return { success: true, role: authUser.role };
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: { message?: string } } };
      const message =
        error?.response?.data?.message ?? 'Email atau password salah';
      const status = error?.response?.status;
      return { success: false, error: message, status };
    }
  };

  const register = async (name: string, email: string, password: string, _role?: UserRole) => {
    try {
      await authAPI.register(name, email, password);
      return { success: true };
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message =
        error?.response?.data?.message ?? 'Registrasi gagal, coba lagi';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('unicerm_token');
    localStorage.removeItem('unicerm_user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
