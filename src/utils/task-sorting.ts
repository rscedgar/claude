import type { SortByField, SortDirection, Task } from "@/types";
import { priorityOrder } from "./task-grouping";

const priorityRank = (priority: Task["priority"]): number =>
  priorityOrder.indexOf(priority);

const compareByField = (a: Task, b: Task, sortBy: SortByField): number => {
  switch (sortBy) {
    case "name":
      return a.name.localeCompare(b.name, "es");
    case "created":
      return a.createdAt.localeCompare(b.createdAt);
    case "due_date": {
      // Sin fecha siempre al final independientemente de dirección
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    case "priority":
      return priorityRank(a.priority) - priorityRank(b.priority);
  }
};

export const sortTasks = (
  tasks: Task[],
  sortBy: SortByField,
  direction: SortDirection,
): Task[] =>
  [...tasks].sort((a, b) => {
    const result =
      sortBy === "due_date"
        ? compareByField(a, b, sortBy)
        : compareByField(a, b, sortBy) * (direction === "asc" ? 1 : -1);
    return result !== 0 ? result : a.order - b.order;
  });
