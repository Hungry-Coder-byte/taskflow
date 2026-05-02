import { create } from 'zustand';
import axios from './api/client';
import { Auth } from './types/auth';

interface AuthSlice {
  user: Auth | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: Auth) => void;
  setToken: (token: string) => void;
  clearState: () => void;
}

const useAuthStore = create<AuthSlice>()((set, get) => ({
  user: get().user || null,
  token: get().token || null,
  loading: false,
  error: null,

  async setUser(user: Auth) {
    set({ user, token: user.token, loading: true, error: null });
  },
  async setToken(token: string) {
    try {
      // You might want to fetch user data based on the token here
      const user = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user, token, loading: false, error: null });
    } catch (error) {
      console.error('Error setting token:', error);
      set({ loading: false, error: 'Failed to set token' });
    }
  },
  clearState: () => {
    set({ user: null, token: null, loading: false, error: null });
  },
}));

export default useAuthStore;