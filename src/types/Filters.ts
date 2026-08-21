import type { PriorityLevel } from "./Task";

export type GroupByField = "status" | "priority" | "assignee" | "none";

export type SortByField = "created" | "due_date" | "priority" | "name";

export type SortDirection = "asc" | "desc";

export interface TaskFilters {
  statusIds: string[];
  priorities: PriorityLevel[];
  assigneeIds: string[];
  tagIds: string[];
}

export const emptyFilters: TaskFilters = {
  statusIds: [],
  priorities: [],
  assigneeIds: [],
  tagIds: [],
};

export const hasActiveFilters = (filters: TaskFilters): boolean =>
  filters.statusIds.length > 0 ||
  filters.priorities.length > 0 ||
  filters.assigneeIds.length > 0 ||
  filters.tagIds.length > 0;
