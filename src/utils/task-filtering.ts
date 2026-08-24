import type { Task, TaskFilters } from "@/types";

/**
 * Filtra tareas combinando criterios con AND: cada dimensión con
 * selección no vacía debe cumplirse.
 */
export const filterTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  const {
    statusIds,
    priorities,
    assigneeIds,
    tagIds,
  } = filters;

  const statusSet = statusIds.length > 0 ? new Set(statusIds) : null;
  const prioritySet = priorities.length > 0 ? new Set(priorities) : null;
  const assigneeSet = assigneeIds.length > 0 ? new Set(assigneeIds) : null;
  const tagSet = tagIds.length > 0 ? new Set(tagIds) : null;

  return tasks.filter((task) => {
    if (statusSet && !statusSet.has(task.statusId)) return false;
    if (prioritySet && !prioritySet.has(task.priority)) return false;
    if (assigneeSet && !task.assigneeIds.some((id) => assigneeSet.has(id)))
      return false;
    if (tagSet && !task.tagIds.some((id) => tagSet.has(id))) return false;
    return true;
  });
};
