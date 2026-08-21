"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";
import { seedData } from "@/db/seed-data";

interface UserStore {
  users: User[];
  currentUserId: string;
  setCurrentUser: (userId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: seedData.users,
      currentUserId: seedData.currentUserId,
      setCurrentUser: (userId) => set({ currentUserId: userId }),
    }),
    {
      name: "taskflow-users",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useCurrentUser = (): User =>
  useUserStore((state) => state.users.find((u) => u.id === state.currentUserId) ?? state.users[0]);
