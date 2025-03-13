import { create } from 'zustand';

interface RegisterState {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  name: '',
  email: '',
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
}));
