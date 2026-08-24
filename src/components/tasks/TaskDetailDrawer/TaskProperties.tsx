"use client";

import { CalendarDays, Flag, Hash, ListOrdered, Tag, Trash2, Users } from "lucide-react";
import AvatarGroup from "@/components/ui/AvatarGroup";
import Checkbox from "@/components/ui/Checkbox";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DatePicker from "@/components/ui/DatePicker";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { PriorityLevel, Task, TaskList, TaskStatus, User } from "@/types";
import { useTaskStore } from "@/stores/task-store";
import { useToast } from "@/components/ui/Toast";
import { useWorkspaceStore } from "@/stores/workspace-store";
import {
  priorityColors,
  priorityLabels,
  priorityOrder,
} from "@/utils/task-grouping";
import { formatShortDate, isOverdue, isToday } from "@/utils/date";
import { styles } from "./styles";

interface TaskPropertiesProps {
  task: Task;
  statuses: TaskStatus[];
  lists: TaskList[];
  users: User[];
}

const TaskProperties = ({ task, statuses, lists, users }: TaskPropertiesProps) => {
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const currentStatus = statuses.find((status) => status.id === task.statusId);
  const assignedUsers = users.filter((user) => task.assigneeIds.includes(user.id));

  const toggleAssignee = (userId: string) => {
    updateTask(task.id, {
      assigneeIds: task.assigneeIds.includes(userId)
        ? task.assigneeIds.filter((id) => id !== userId)
        : [...task.assigneeIds, userId],
    });
  };

  const toggleTag = (tagId: string) => {
    updateTask(task.id, {
      tagIds: task.tagIds.includes(tagId)
        ? task.tagIds.filter((id) => id !== tagId)
        : [...task.tagIds, tagId],
    });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    showToast({ title: "Tarea eliminada", description: task.name, variant: "info" });
  };

  return (
    <div className={styles.root}>
      <PropertyRow icon={<Hash className={styles.icon} />} label="Estado">
        <DropdownMenu
          align="left"
          panelClassName="min-w-44"
          trigger={
            <button type="button" className={styles.control}>
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: currentStatus?.color ?? "#8b93a7" }}
              />
              {currentStatus?.name ?? "Sin estado"}
            </button>
          }
          items={statuses.map((status) => ({
            label: status.name,
            icon: (
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: status.color }}
              />
            ),
            onSelect: () => updateTask(task.id, { statusId: status.id }),
          }))}
        />
      </PropertyRow>

      <PropertyRow icon={<Flag className={styles.icon} />} label="Prioridad">
        <DropdownMenu
          align="left"
          panelClassName="min-w-40"
          trigger={
            <button type="button" className={styles.control}>
              {task.priority !== "none" && (
                <Flag
                  className="size-3.5 fill-current"
                  style={{ color: priorityColors[task.priority] }}
                />
              )}
              {priorityLabels[task.priority]}
            </button>
          }
          items={priorityOrder.map((priority: PriorityLevel) => ({
            label: priorityLabels[priority],
            icon:
              priority !== "none" ? (
                <Flag
                  className="size-3.5 fill-current"
                  style={{ color: priorityColors[priority] }}
                />
              ) : undefined,
            onSelect: () => updateTask(task.id, { priority }),
          }))}
        />
      </PropertyRow>

      <PropertyRow icon={<Users className={styles.icon} />} label="Asignados">
        <DropdownMenu
          align="left"
          panelClassName="min-w-56 p-1"
          trigger={
            <button type="button" className={styles.control}>
              {assignedUsers.length > 0 ? (
                <AvatarGroup users={assignedUsers} />
              ) : (
                <span className="text-ebony-500">Sin asignar</span>
              )}
            </button>
          }
        >
          {users.map((user) => (
            <label
              key={user.id}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ebony-100 transition-colors hover:bg-white/5"
            >
              <Checkbox
                checked={task.assigneeIds.includes(user.id)}
                onChange={() => toggleAssignee(user.id)}
              />
              <span
                className="flex size-6 items-center justify-center rounded-full text-[10px] font-semibold uppercase ring-1 ring-white/10"
                style={{
                  backgroundColor: `${user.avatarColor}33`,
                  color: user.avatarColor,
                }}
              >
                {user.initials}
              </span>
              {user.name}
            </label>
          ))}
        </DropdownMenu>
      </PropertyRow>

      <PropertyRow icon={<Tag className={styles.icon} />} label="Etiquetas">
        <DropdownMenu
          align="left"
          panelClassName="min-w-48 p-1"
          trigger={
            <button type="button" className={cn(styles.control)}>
              {task.tagIds.length === 0 ? (
                <span className="text-ebony-500">Ninguna</span>
              ) : (
                <span>{task.tagIds.length} etiquetas</span>
              )}
            </button>
          }
        >
          <TagOptions task={task} toggleTag={toggleTag} />
        </DropdownMenu>
      </PropertyRow>

      <PropertyRow icon={<CalendarDays className={styles.icon} />} label="Vencimiento">
        <DropdownMenu
          align="left"
          panelClassName="w-64 p-2"
          trigger={
            <button
              type="button"
              className={cn(
                styles.control,
                isOverdue(task.dueDate) && "text-priority-urgent",
                isToday(task.dueDate) && !isOverdue(task.dueDate) && "text-priority-high",
              )}
            >
              {task.dueDate ? formatShortDate(task.dueDate) : "Sin fecha"}
            </button>
          }
        >
          <DatePicker
            value={task.dueDate}
            onChange={(event) =>
              updateTask(task.id, {
                dueDate: event.target.value ? new Date(event.target.value).toISOString() : null,
              })
            }
            className="border-none bg-transparent px-0 focus:ring-0"
          />
        </DropdownMenu>
      </PropertyRow>

      <PropertyRow icon={<ListOrdered className={styles.icon} />} label="Lista">
        <DropdownMenu
          align="left"
          panelClassName="min-w-48"
          trigger={
            <button type="button" className={styles.control}>
              {lists.find((list) => list.id === task.listId)?.name ?? "—"}
            </button>
          }
          items={lists.map((list) => ({
            label: list.name,
            onSelect: () => updateTask(task.id, { listId: list.id }),
          }))}
        />
      </PropertyRow>

      <div className="pt-2">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className={styles.deleteButton}
        >
          <Trash2 className="size-4" />
          Eliminar tarea
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title={`¿Eliminar "${task.name}"?`}
        description="Se eliminarán también sus subtareas, checklists y comentarios. Esta acción no se puede deshacer."
        confirmLabel="Eliminar tarea"
      />
    </div>
  );
};

const PropertyRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className={styles.row}>
    <span className={styles.label}>
      {icon}
      {label}
    </span>
    <div className={styles.value}>{children}</div>
  </div>
);

const TagOptions = ({
  task,
  toggleTag,
}: {
  task: Task;
  toggleTag: (tagId: string) => void;
}) => {
  const tags = useWorkspaceStore((state) => state.tags);
  if (tags.length === 0) {
    return <p className="px-2 py-3 text-sm text-ebony-400">No hay etiquetas</p>;
  }
  return (
    <>
      {tags.map((tag) => (
        <label
          key={tag.id}
          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-white/5"
        >
          <Checkbox checked={task.tagIds.includes(tag.id)} onChange={() => toggleTag(tag.id)} />
          <span
            className="rounded px-1.5 py-0.5 text-[11px] font-medium"
            style={{ backgroundColor: `${tag.color}22`, color: tag.color }}
          >
            {tag.name}
          </span>
        </label>
      ))}
    </>
  );
};

export default TaskProperties;
