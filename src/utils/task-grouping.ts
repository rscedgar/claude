import type {
  GroupByField,
  PriorityLevel,
  Task,
  TaskStatus,
  User,
} from "@/types";

export const priorityOrder: PriorityLevel[] = [
  "urgent",
  "high",
  "normal",
  "low",
  "none",
];

export const priorityLabels: Record<PriorityLevel, string> = {
  urgent: "Urgente",
  high: "Alta",
  normal: "Normal",
  low: "Baja",
  none: "Sin prioridad",
};

export const priorityColors: Record<PriorityLevel, string> = {
  urgent: "#ef4444",
  high: "#f97316",
  normal: "#469aea",
  low: "#8b93a7",
  none: "#8b93a7",
};

export interface TaskGroup {
  key: string;
  label: string;
  color?: string;
  statusId?: string;
  priority?: PriorityLevel;
  assigneeId?: string | null;
  tasks: Task[];
}

interface GroupingContext {
  statuses: TaskStatus[];
  users: User[];
}

export const groupTasks = (
  tasks: Task[],
  groupBy: GroupByField,
  { statuses, users }: GroupingContext,
): TaskGroup[] => {
  if (groupBy === "none") {
    return [{ key: "all", label: "Tareas", tasks }];
  }

  if (groupBy === "status") {
    const groups = statuses.map<TaskGroup>((status) => ({
      key: `status-${status.id}`,
      label: status.name,
      color: status.color,
      statusId: status.id,
      tasks: tasks.filter((task) => task.statusId === status.id),
    }));
    const knownStatusIds = new Set(statuses.map((status) => status.id));
    const orphans = tasks.filter((task) => !knownStatusIds.has(task.statusId));
    if (orphans.length > 0) {
      groups.push({
        key: "status-unknown",
        label: "Sin estado",
        tasks: orphans,
      });
    }
    return groups;
  }

  if (groupBy === "priority") {
    return priorityOrder.map<TaskGroup>((priority) => ({
      key: `priority-${priority}`,
      label: priorityLabels[priority],
      color: priorityColors[priority],
      priority,
      tasks: tasks.filter((task) => task.priority === priority),
    }));
  }

  const assigneeGroups = users
    .filter((user) => tasks.some((task) => task.assigneeIds.includes(user.id)))
    .map<TaskGroup>((user) => ({
      key: `assignee-${user.id}`,
      label: user.name,
      assigneeId: user.id,
      tasks: tasks.filter((task) => task.assigneeIds.includes(user.id)),
    }));

  const unassigned = tasks.filter((task) => task.assigneeIds.length === 0);
  if (unassigned.length > 0) {
    assigneeGroups.push({
      key: "assignee-none",
      label: "Sin asignar",
      assigneeId: null,
      tasks: unassigned,
    });
  }

  return assigneeGroups;
};
