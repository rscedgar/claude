"use client";

import { useRef, useState } from "react";
import { CalendarDays, Flag } from "lucide-react";
import AvatarGroup from "@/components/ui/AvatarGroup";
import Checkbox from "@/components/ui/Checkbox";
import DropdownMenu from "@/components/ui/DropdownMenu";
import TagChip from "@/components/ui/TagChip";
import { useToast } from "@/components/ui/Toast";
import DatePicker from "@/components/ui/DatePicker";
import { cn } from "@/lib/cn";
import type { PriorityLevel, Task, TaskStatus, User } from "@/types";
import { useTaskStore } from "@/stores/task-store";
import { useUserStore } from "@/stores/user-store";
import { useUiStore } from "@/stores/ui-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { formatShortDate, isOverdue, isToday } from "@/utils/date";
import { priorityLabels, priorityOrder, priorityColors } from "@/utils/task-grouping";
import { styles } from "./styles";

interface TaskRowProps {
  task: Task;
  statuses: TaskStatus[];
}

const TaskRow = ({ task, statuses }: TaskRowProps) => {
  const { showToast } = useToast();
  const updateTask = useTaskStore((state) => state.updateTask);
  const moveTask = useTaskStore((state) => state.moveTask);
  const openTask = useUiStore((state) => state.openTask);
  const users = useUserStore((state) => state.users);
  const tags = useWorkspaceStore((state) => state.tags);

  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(task.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentStatus = statuses.find((status) => status.id === task.statusId);
  const isDone = currentStatus?.category === "done";
  const doneStatus = statuses.find((status) => status.category === "done");
  const todoStatus = statuses.find((status) => status.category === "todo");

  const startEditing = () => {
    setNameDraft(task.name);
    setEditingName(true);
    requestAnimationFrame(() => inputRef.current?.select());
  };

  const commitName = () => {
    const trimmed = nameDraft.trim();
    if (trimmed && trimmed !== task.name) {
      updateTask(task.id, { name: trimmed });
      showToast({ title: "Tarea renombrada", variant: "success" });
    }
    setEditingName(false);
  };

  const toggleComplete = () => {
    if (!doneStatus || !todoStatus || !currentStatus) return;
    const targetId = isDone ? todoStatus.id : doneStatus.id;
    moveTask(task.id, targetId);
    showToast({
      title: isDone ? "Tarea reabierta" : "Tarea completada",
      description: task.name,
      variant: isDone ? "info" : "success",
    });
  };

  const changePriority = (priority: PriorityLevel) =>
    updateTask(task.id, { priority });

  const toggleAssignee = (userId: string) => {
    const nextIds = task.assigneeIds.includes(userId)
      ? task.assigneeIds.filter((id) => id !== userId)
      : [...task.assigneeIds, userId];
    updateTask(task.id, { assigneeIds: nextIds });
  };

  const assignedUsers = users.filter((user) => task.assigneeIds.includes(user.id));
  const taskTags = tags.filter((tag) => task.tagIds.includes(tag.id));
  const dueLabel = task.dueDate ? formatShortDate(task.dueDate) : "Sin fecha";
  const dueClassName = isOverdue(task.dueDate)
    ? styles.dueOverdue
    : isToday(task.dueDate)
      ? styles.dueToday
      : undefined;

  return (
    <div
      className={styles.root}
      role="button"
      tabIndex={0}
      aria-label={`Abrir detalle de ${task.name}`}
      onClick={() => openTask(task.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter") openTask(task.id);
      }}
    >
      <span
        className={styles.checkboxCell}
        onClick={(event) => event.stopPropagation()}
      >
        <Checkbox checked={isDone} onChange={toggleComplete} aria-label="Completar tarea" />
      </span>

      <div
        className={styles.nameCell}
        onClick={(event) => event.stopPropagation()}
      >
        {editingName ? (
          <input
            ref={inputRef}
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            onBlur={commitName}
            onKeyDown={(event) => {
              if (event.key === "Enter") commitName();
              if (event.key === "Escape") setEditingName(false);
            }}
            autoFocus
            className={styles.nameInput}
            aria-label="Nombre de la tarea"
          />
        ) : (
          <>
            <span
              role="button"
              tabIndex={0}
              onClick={startEditing}
              onKeyDown={(event) => {
                if (event.key === "Enter") startEditing();
              }}
              className={cn(styles.name, isDone && styles.nameDone)}
              title="Click para renombrar"
            >
              {task.name}
            </span>
            {taskTags.length > 0 && (
              <span className={styles.tagsRow}>
                {taskTags.map((tag) => (
                  <TagChip key={tag.id} name={tag.name} color={tag.color} />
                ))}
              </span>
            )}
          </>
        )}
      </div>

      <span onClick={(event) => event.stopPropagation()}>
        <DropdownMenu
          align="left"
          panelClassName="min-w-40"
          trigger={
            <button type="button" className={cn(styles.cellButton)}>
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: currentStatus?.color ?? "#8b93a7" }}
              />
              <span className="truncate">{currentStatus?.name ?? "Sin estado"}</span>
            </button>
          }
          items={statuses.map((status) => ({
            label: status.name,
            icon: (
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: status.color }}
              />
            ),
            onSelect: () => moveTask(task.id, status.id),
          }))}
        />
      </span>

      <span onClick={(event) => event.stopPropagation()}>
        <DropdownMenu
          align="left"
          panelClassName="min-w-36"
          trigger={
            <button type="button" className={cn(styles.cellButton)}>
              {task.priority !== "none" && (
                <Flag
                  className="size-3.5 shrink-0 fill-current"
                  style={{ color: priorityColors[task.priority] }}
                />
              )}
              <span className="truncate">{priorityLabels[task.priority]}</span>
            </button>
          }
          items={priorityOrder.map((priority) => ({
            label: priorityLabels[priority],
            icon:
              priority !== "none" ? (
                <Flag
                  className="size-3.5 shrink-0 fill-current"
                  style={{ color: priorityColors[priority] }}
                />
              ) : undefined,
            onSelect: () => changePriority(priority),
          }))}
        />
      </span>

      <span onClick={(event) => event.stopPropagation()}>
        <DropdownMenu
          align="left"
          panelClassName="w-60 p-2"
          trigger={
            <button type="button" className={cn(styles.cellButton, dueClassName)}>
              <CalendarDays className="size-3.5 shrink-0" />
              <span className="truncate">{dueLabel}</span>
            </button>
          }
        >
          <DatePicker
            value={task.dueDate}
            onChange={(event) => {
              const value = event.target.value;
              updateTask(task.id, {
                dueDate: value ? new Date(value).toISOString() : null,
              });
            }}
            className="border-none bg-transparent px-0 focus:ring-0"
          />
        </DropdownMenu>
      </span>

      <span
        className={styles.assigneesCell}
        onClick={(event) => event.stopPropagation()}
      >
        <DropdownMenu
          align="right"
          panelClassName="min-w-52 p-1"
          trigger={
            assignedUsers.length > 0 ? (
              <AvatarGroup users={assignedUsers} />
            ) : (
              <button type="button" className={styles.cellButton}>
                —
              </button>
            )
          }
        >
          {users.map((user: User) => (
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
                style={{ backgroundColor: `${user.avatarColor}33`, color: user.avatarColor }}
              >
                {user.initials}
              </span>
              {user.name}
            </label>
          ))}
        </DropdownMenu>
      </span>

      <span className={styles.menuCell} />
    </div>
  );
};

export default TaskRow;
