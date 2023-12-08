import { type User } from "firebase/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

export type AuthStore = {
  user?: User;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: undefined,
      setUser: (user: User) => set(() => ({ user })),
      logout: () => set({ user: undefined }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
