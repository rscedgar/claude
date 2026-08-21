"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  GroupByField,
  SortByField,
  SortDirection,
  TaskFilters,
  ViewType,
} from "@/types";
import { emptyFilters } from "@/types";

interface UiStore {
  activeView: ViewType;
  groupBy: GroupByField;
  sortBy: SortByField;
  sortDirection: SortDirection;
  filters: TaskFilters;
  sidebarCollapsed: boolean;

  openTaskId: string | null;
  commandOpen: boolean;

  setActiveView: (view: ViewType) => void;
  setGroupBy: (groupBy: GroupByField) => void;
  setSortBy: (sortBy: SortByField) => void;
  toggleSortDirection: () => void;
  setFilter: <K extends keyof TaskFilters>(key: K, values: TaskFilters[K]) => void;
  clearFilters: () => void;
  toggleSidebar: () => void;

  openTask: (taskId: string) => void;
  closeTask: () => void;
  setCommandOpen: (open: boolean) => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      activeView: "list",
      groupBy: "status",
      sortBy: "created",
      sortDirection: "asc",
      filters: emptyFilters,
      sidebarCollapsed: false,

      openTaskId: null,
      commandOpen: false,

      setActiveView: (view) => set({ activeView: view }),
      setGroupBy: (groupBy) => set({ groupBy }),
      setSortBy: (sortBy) => set({ sortBy }),
      toggleSortDirection: () =>
        set((state) => ({
          sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
        })),
      setFilter: (key, values) =>
        set((state) => ({ filters: { ...state.filters, [key]: values } })),
      clearFilters: () => set({ filters: { ...emptyFilters } }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      openTask: (taskId) => set({ openTaskId: taskId }),
      closeTask: () => set({ openTaskId: null }),
      setCommandOpen: (open) => set({ commandOpen: open }),
    }),
    {
      name: "taskflow-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeView: state.activeView,
        groupBy: state.groupBy,
        sortBy: state.sortBy,
        sortDirection: state.sortDirection,
        filters: state.filters,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);
