"use client";

import { useSyncExternalStore } from "react";
import { useUiStore } from "@/stores/ui-store";
import { useUserStore } from "@/stores/user-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { useTaskStore } from "@/stores/task-store";

const persistedStores = [
  useUiStore.persist,
  useUserStore.persist,
  useWorkspaceStore.persist,
  useTaskStore.persist,
];

const subscribe = (onStoreChange: () => void) => {
  const unsubscribers = persistedStores.map((store) =>
    store.onFinishHydration(() => {
      if (persistedStores.every((s) => s.hasHydrated())) {
        onStoreChange();
      }
    }),
  );
  return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
};

const getSnapshot = () => persistedStores.every((store) => store.hasHydrated());

/**
 * Devuelve true cuando todos los stores persistidos terminaron de
 * rehidratarse desde localStorage. Úsalo para evitar mismatches de
 * renderizado entre servidor y cliente.
 */
export const useStoresHydrated = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, () => false);
