"use client";

import { useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalendarDays, Flag } from "lucide-react";
import AvatarGroup from "@/components/ui/AvatarGroup";
import TagChip from "@/components/ui/TagChip";
import { cn } from "@/lib/cn";
import { useTaskStore } from "@/stores/task-store";
import { useUiStore } from "@/stores/ui-store";
import { useUserStore } from "@/stores/user-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { formatShortDate, isOverdue, isToday } from "@/utils/date";
import { priorityColors, priorityLabels } from "@/utils/task-grouping";
import { styles } from "./styles";

interface TaskCardProps {
  taskId: string;
  dragging?: boolean;
  overlay?: boolean;
}

const TaskCard = ({ taskId, dragging, overlay }: TaskCardProps) => {
  const task = useTaskStore((state) => state.tasks.find((t) => t.id === taskId));
  const users = useUserStore((state) => state.users);
  const tags = useWorkspaceStore((state) => state.tags);

  if (!task) return null;

  const assignedUsers = users.filter((user) => task.assigneeIds.includes(user.id));
  const taskTags = tags.filter((tag) => task.tagIds.includes(tag.id));
  const dueClassName =
    isOverdue(task.dueDate)
      ? "text-priority-urgent"
      : isToday(task.dueDate)
        ? "text-priority-high"
        : undefined;

  return (
    <article
      className={cn(styles.root, dragging && styles.dragging, overlay && styles.overlay)}
      aria-label={`Tarea: ${task.name}`}
    >
      <div className={styles.topRow}>
        {task.priority !== "none" ? (
          <span
            className="flex items-center gap-1 text-[11px] font-medium"
            style={{ color: priorityColors[task.priority] }}
            title={priorityLabels[task.priority]}
          >
            <Flag className="size-3 fill-current" />
            {priorityLabels[task.priority]}
          </span>
        ) : (
          <span />
        )}
        {task.dueDate && (
          <span className={cn(styles.dueBadge, dueClassName)}>
            <CalendarDays className="size-3" />
            {formatShortDate(task.dueDate)}
          </span>
        )}
      </div>

      <p className={styles.name}>{task.name}</p>

      <div className={styles.bottomRow}>
        <div className={styles.tagsRow}>
          {taskTags.slice(0, 3).map((tag) => (
            <TagChip key={tag.id} name={tag.name} color={tag.color} />
          ))}
        </div>
        <AvatarGroup users={assignedUsers} />
      </div>
    </article>
  );
};

export const SortableTaskCard = ({ taskId }: { taskId: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: taskId, data: { type: "task" } });
  const openTask = useUiStore((state) => state.openTask);
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn(isDragging && "opacity-40")}
      role="button"
      tabIndex={0}
      aria-label="Abrir detalle de tarea"
      onPointerDown={(event) => {
        pointerDownRef.current = { x: event.clientX, y: event.clientY };
      }}
      onClick={(event) => {
        const origin = pointerDownRef.current;
        const moved = origin
          ? Math.hypot(event.clientX - origin.x, event.clientY - origin.y)
          : 0;
        if (moved < 6) openTask(taskId);
        pointerDownRef.current = null;
      }}
    >
      <TaskCard taskId={taskId} />
    </div>
  );
};

export default TaskCard;
