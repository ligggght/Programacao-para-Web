import { create } from 'zustand';

type User = {
  userId: string;
  username: string;
  avatarSeed: string;
  avatarStyle: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => set({ user: null }),
}));
