import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { create } from 'zustand';

import api from '~/services/api';

// Interface for auth store state
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  // Login function
  login: async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      const { token } = response.data;

      if (token) {
        await AsyncStorage.setItem('token', token);
        set({ token, isAuthenticated: true });
        router.replace('/'); // Navigate to home after login
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Logout function
  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
      set({ token: null, isAuthenticated: false });
      router.replace('/login'); // Navigate to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  // Check auth on app load
  checkAuth: async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      set({ token, isAuthenticated: true });
    } else {
      set({ token: null, isAuthenticated: false });
      router.replace('/login'); // Redirect to login if no token
    }
  },
}));
