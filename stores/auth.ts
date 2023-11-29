import { type User } from "firebase/auth";
import { create } from "zustand";

export type AuthStore = {
  user?: User;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user: User) => set(() => ({ user })),
  logout: () => set({ user: undefined }),
}));
