import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/lib/api';
import { setCookie, deleteCookie } from 'cookies-next';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
}

// Token expiration time (24 hours in seconds)
const TOKEN_EXPIRATION = 24 * 60 * 60;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true, // Set to true initially to prevent redirect flashes
      error: null,
      token: null,
      
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setError: (error) => set({ error }),
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login({ email, password, clientType: 'w' });
          
          // Extract token from response
          const token = response.token || response.data?.token;
          
          if (!token) {
            throw new Error('No token received from server');
          }
          
          // Set token in cookie with expiration
          setCookie('auth_token', token, { maxAge: TOKEN_EXPIRATION });
          
          // Set token and user in store
          set({ 
            token,
            user: response.user || response.data?.user,
            isLoading: false,
            error: null
          });
          
          return response;
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || error?.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          // Call logout API if token exists
          const currentToken = get().token;
          if (currentToken) {
            await authApi.logout();
          }
          
          // Clear token from cookie
          deleteCookie('auth_token');
          
          // Reset state
          set({ 
            user: null, 
            token: null,
            isLoading: false,
            error: null
          });
        } catch (error) {
          console.error('Logout error:', error);
          // Still clear user data even if API call fails
          deleteCookie('auth_token');
          set({ 
            user: null, 
            token: null,
            isLoading: false,
            error: null
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
);