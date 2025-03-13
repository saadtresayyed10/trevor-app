import { router } from 'expo-router';
import { create } from 'zustand';

import api from '~/services/api';

// Interface for generic of auth store hook
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token);
      set({ token, isAuthenticated: true });

      router.replace('/');
    } catch (error) {
      console.error('Login failed: ', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false });

    router.replace('/login');
  },
}));
