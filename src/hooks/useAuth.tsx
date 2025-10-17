import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { mockUsers } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { upsertProfile } from '../services/api';

// Export vazio para tornar o arquivo um módulo
export {};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Simular verificação de token/sessão
      const savedUser = localStorage.getItem('artistpro_user') || localStorage.getItem('danz_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuthState({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          localStorage.removeItem('danz_user');
          localStorage.removeItem('artistpro_user');
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } else {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
      return;
    }

    // Supabase session check
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (session?.user) {
        const user = await fetchProfileAsUser(session.user.id);
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      } else {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        const user = await fetchProfileAsUser(session.user.id);
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      } else {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      const user = mockUsers.find(u => u.email === email);
      if (user && password === '123456') {
        setAuthState({ user, isAuthenticated: true, isLoading: false });
        localStorage.setItem('artistpro_user', JSON.stringify(user));
        return true;
      }
      return false;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session?.user) return false;
    const profile = await fetchProfileAsUser(data.session.user.id);
    setAuthState({ user: profile, isAuthenticated: true, isLoading: false });
    return true;
  };

  const logout = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    }
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    localStorage.removeItem('danz_user');
    localStorage.removeItem('artistpro_user');
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email || '',
        name: userData.name || '',
        type: userData.type || 'dancer',
        level: userData.level || 'basic',
        createdAt: new Date().toISOString(),
        ...userData
      };
      setAuthState({ user: newUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem('artistpro_user', JSON.stringify(newUser));
      return true;
    }

    const password = (userData as any).password || 'ChangeMe#12345';
    const role = userData.type === 'contractor' ? 'contractor' : 'artist';
    const { data, error } = await supabase.auth.signUp({
      email: userData.email!,
      password,
      options: { data: { name: userData.name, role } }
    });
    if (error || !data.user) return false;
    await upsertProfile(data.user.id, {
      email: userData.email,
      name: userData.name,
      type: userData.type || 'dancer',
      level: userData.level || 'basic'
    });
    const profile = await fetchProfileAsUser(data.user.id);
    setAuthState({ user: profile, isAuthenticated: true, isLoading: false });
    return true;
  };

  const updateProfile = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState({
        ...authState,
        user: updatedUser
      });
      localStorage.setItem('artistpro_user', JSON.stringify(updatedUser));
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
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

async function fetchProfileAsUser(id: string): Promise<User> {
  // fetch profile from Supabase and map to local User type
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error || !data) {
    // Fallback minimal user from auth
    const { data: auth } = await supabase.auth.getUser();
    const email = auth.user?.email || '';
    return {
      id,
      email,
      name: auth.user?.user_metadata?.name || email,
      type: (auth.user?.user_metadata?.role === 'contractor' ? 'contractor' : auth.user?.user_metadata?.role === 'admin' ? 'admin' : 'dancer'),
      level: 'basic',
      createdAt: new Date().toISOString()
    } as User;
  }

  const role = data.role;
  const mapped: User = {
    id: data.id,
    email: data.email || '',
    name: data.name || '',
    type: role === 'contractor' ? 'contractor' : role === 'admin' ? 'admin' : 'dancer',
    level: (data.level as any) || 'basic',
    avatar: data.avatar_url || undefined,
    bio: data.bio || undefined,
    location: data.location || undefined,
    phone: data.phone || undefined,
    website: data.website || undefined,
    socialMedia: data.social_media || undefined,
    isVerified: !!data.is_verified,
    createdAt: data.created_at
  } as User;
  return mapped;
}
