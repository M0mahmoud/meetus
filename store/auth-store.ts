import { create } from "zustand";
import { User } from "@/types";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setToken: (token: string) => {
    set({ token, isAuthenticated: true });
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  logout: () => {
    Cookies.remove("MSAR-TOKEN");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: () => {
    const token = Cookies.get("MSAR-TOKEN");
    const authenticated = !!token;
    set({
      token,
      isAuthenticated: authenticated,
    });
  },
}));
