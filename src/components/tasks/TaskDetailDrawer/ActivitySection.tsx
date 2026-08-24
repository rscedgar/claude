"use client";

import { useMemo } from "react";
import Avatar from "@/components/ui/Avatar";
import type { ActivityLog, TaskStatus, User } from "@/types";
import { useTaskStore } from "@/stores/task-store";
import { useUserStore } from "@/stores/user-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { formatRelativeTime } from "@/utils/date";
import { styles } from "./styles";

interface ActivitySectionProps {
  taskId: string;
}

const fieldLabels: Record<string, string> = {
  name: "el nombre",
  priority: "la prioridad",
  dueDate: "el vencimiento",
  startDate: "la fecha de inicio",
  assigneeIds: "los asignados",
  tagIds: "las etiquetas",
  listId: "la lista",
  statusId: "el estado",
  task: "la tarea",
};

const describeActivity = (
  entry: ActivityLog,
  statuses: TaskStatus[],
): string => {
  const statusName = (statusId?: string) =>
    statuses.find((status) => status.id === statusId)?.name ?? statusId;

  switch (entry.action) {
    case "created":
      return `creó la tarea “${entry.toValue ?? ""}”`;
    case "moved":
      if (entry.field === "status") {
        return `movió el estado de ${statusName(entry.fromValue)} a ${statusName(entry.toValue)}`;
      }
      return `actualizó ${fieldLabels[entry.field ?? ""] ?? "un campo"}`;
    case "updated":
      return entry.field
        ? `actualizó ${fieldLabels[entry.field] ?? entry.field}`
        : "actualizó la tarea";
    case "completed":
      return "completó la tarea";
    case "reopened":
      return "reabrió la tarea";
    case "commented":
      return "comentó";
    case "deleted":
      return "eliminó una subtarea";
    default:
      return "interactuó con la tarea";
  }
};

const ActivitySection = ({ taskId }: ActivitySectionProps) => {
  const activities = useTaskStore((state) => state.activities);
  const users = useUserStore((state) => state.users);
  const statuses = useWorkspaceStore((state) => state.statuses);

  const entries = useMemo(
    () =>
      activities
        .filter((entry) => entry.taskId === taskId && entry.action !== "deleted")
        .slice(0, 12),
    [activities, taskId],
  );

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Actividad</h3>
      <div className="flex flex-col gap-2.5 border-l border-white/8 pl-4">
        {entries.map((entry) => {
          const user = users.find((candidate: User) => candidate.id === entry.userId);
          return (
            <div key={entry.id} className="flex items-start gap-2">
              {user && <Avatar user={user} size="xs" />}
              <p className={styles.activityText}>
                <span className="font-medium text-ebony-100">{user?.name ?? "Alguien"}</span>{" "}
                {describeActivity(entry, statuses)}{" "}
                <span className="text-xs text-ebony-500">
                  · {formatRelativeTime(entry.createdAt)}
                </span>
              </p>
            </div>
          );
        })}
        {entries.length === 0 && (
          <p className="text-xs text-ebony-500">Sin actividad registrada.</p>
        )}
      </div>
    </section>
  );
};

export default ActivitySection;
