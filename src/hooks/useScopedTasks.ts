"use client";

import { useMemo } from "react";
import type { Task, TaskStatus } from "@/types";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useTaskStore } from "@/stores/task-store";
import { useWorkspaceStore } from "@/stores/workspace-store";

export type ScopeType = "list" | "folder" | "space";

export interface ScopedTasks {
  hydrated: boolean;
  exists: boolean;
  spaceId: string | null;
  statuses: TaskStatus[];
  tasks: Task[];
  listIds: string[];
  canCreateTask: boolean;
}

/**
 * Resuelve el contexto de tareas para un alcance (lista, carpeta o espacio)
 * y expone sus tareas agregadas junto a los estados del espacio.
 */
export const useScopedTasks = (
  scopeType: ScopeType,
  scopeId: string,
): ScopedTasks => {
  const hydrated = useStoresHydrated();

  const taskList = useWorkspaceStore((state) =>
    state.taskLists.find((l) => l.id === scopeId),
  );
  const folder = useWorkspaceStore((state) =>
    state.folders.find((f) => f.id === scopeId),
  );
  const space = useWorkspaceStore((state) => state.spaces.find((s) => s.id === scopeId));
  const allLists = useWorkspaceStore((state) => state.taskLists);
  const allStatuses = useWorkspaceStore((state) => state.statuses);
  const allTasks = useTaskStore((state) => state.tasks);

  return useMemo(() => {
    let spaceId: string | null = null;
    let listIds: string[] = [];
    let exists = false;
    let canCreateTask = false;

    if (scopeType === "list" && taskList) {
      spaceId = taskList.spaceId;
      listIds = [taskList.id];
      exists = true;
      canCreateTask = true;
    } else if (scopeType === "folder" && folder) {
      spaceId = folder.spaceId;
      listIds = allLists.filter((l) => l.folderId === folder.id).map((l) => l.id);
      exists = true;
    } else if (scopeType === "space" && space) {
      spaceId = space.id;
      listIds = allLists.filter((l) => l.spaceId === space.id).map((l) => l.id);
      exists = true;
    }

    const idSet = new Set(listIds);
    const tasks =
      spaceId !== null ? allTasks.filter((task) => idSet.has(task.listId)) : [];

    const statuses =
      spaceId !== null
        ? allStatuses
            .filter((status) => status.spaceId === spaceId)
            .sort((a, b) => a.order - b.order)
        : [];

    return { hydrated, exists, spaceId, statuses, tasks, listIds, canCreateTask };
  }, [
    scopeType,
    taskList,
    folder,
    space,
    allLists,
    allStatuses,
    allTasks,
    hydrated,
  ]);
};
