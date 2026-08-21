import type { Task } from "@/types";

/**
 * Cuenta tareas abiertas (no completadas vía categoría de su status y sin
 * ser subtareas) agrupadas por lista.
 */
export const countOpenTasksByList = (tasks: Task[], doneStatusIds: Set<string>): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const task of tasks) {
    if (task.parentTaskId) continue;
    if (doneStatusIds.has(task.statusId)) continue;
    counts[task.listId] = (counts[task.listId] ?? 0) + 1;
  }
  return counts;
};
