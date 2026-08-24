"use client";

import { X } from "lucide-react";
import MultiSelect from "@/components/ui/MultiSelect";
import { cn } from "@/lib/cn";
import type { PriorityLevel, Task, TaskStatus } from "@/types";
import { hasActiveFilters } from "@/types";
import { useUiStore } from "@/stores/ui-store";
import { useUserStore } from "@/stores/user-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { priorityLabels } from "@/utils/task-grouping";
import { styles } from "./styles";

interface TaskFiltersBarProps {
  /** Tareas del alcance actual; alimentan los contadores por opción. */
  tasks: Task[];
  statuses: TaskStatus[];
}

const priorities: PriorityLevel[] = ["urgent", "high", "normal", "low", "none"];

const TaskFiltersBar = ({ tasks, statuses }: TaskFiltersBarProps) => {
  const filters = useUiStore((state) => state.filters);
  const setFilter = useUiStore((state) => state.setFilter);
  const clearFilters = useUiStore((state) => state.clearFilters);
  const users = useUserStore((state) => state.users);
  const tags = useWorkspaceStore((state) => state.tags);

  const statusOptions = statuses.map((status) => ({
    value: status.id,
    label: status.name,
    color: status.color,
    count: tasks.filter((task) => task.statusId === status.id).length,
  }));

  const priorityOptions = priorities.map((priority) => ({
    value: priority,
    label: priorityLabels[priority],
    count: tasks.filter((task) => task.priority === priority).length,
  }));

  const assigneeIds = new Set<string>();
  for (const task of tasks) {
    for (const id of task.assigneeIds) assigneeIds.add(id);
  }
  const assigneeOptions = users
    .filter((user) => assigneeIds.has(user.id))
    .map((user) => ({
      value: user.id,
      label: user.name,
      color: user.avatarColor,
      count: tasks.filter((task) => task.assigneeIds.includes(user.id)).length,
    }));

  const tagOptions = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    color: tag.color,
    count: tasks.filter((task) => task.tagIds.includes(tag.id)).length,
  }));

  return (
    <div className={cn(styles.root, hasActiveFilters(filters) && styles.active)}>
      <div className={styles.selects}>
        <MultiSelect
          options={statusOptions}
          values={filters.statusIds}
          onChange={(values) => setFilter("statusIds", values)}
          placeholder="Estado"
          searchPlaceholder="Buscar estado…"
        />
        <MultiSelect
          options={priorityOptions}
          values={filters.priorities}
          onChange={(values) => setFilter("priorities", values as PriorityLevel[])}
          placeholder="Prioridad"
          searchPlaceholder="Buscar prioridad…"
        />
        <MultiSelect
          options={assigneeOptions}
          values={filters.assigneeIds}
          onChange={(values) => setFilter("assigneeIds", values)}
          placeholder="Asignado"
          searchPlaceholder="Buscar persona…"
        />
        <MultiSelect
          options={tagOptions}
          values={filters.tagIds}
          onChange={(values) => setFilter("tagIds", values)}
          placeholder="Etiqueta"
          searchPlaceholder="Buscar etiqueta…"
        />
        {hasActiveFilters(filters) && (
          <button type="button" className={styles.clear} onClick={clearFilters}>
            <X className="size-3.5" />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskFiltersBar;
