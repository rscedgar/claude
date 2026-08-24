"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import Checkbox from "@/components/ui/Checkbox";
import ProgressBar from "@/components/ui/ProgressBar";
import { useTaskStore } from "@/stores/task-store";
import type { TaskStatus } from "@/types";
import { styles } from "./styles";

interface SubtasksSectionProps {
  parentTaskId: string;
  listId: string;
  statuses: TaskStatus[];
}

const SubtasksSection = ({ parentTaskId, listId, statuses }: SubtasksSectionProps) => {
  const tasks = useTaskStore((state) => state.tasks);
  const createTask = useTaskStore((state) => state.createTask);
  const moveTask = useTaskStore((state) => state.moveTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [draft, setDraft] = useState("");

  const subtasks = tasks.filter((task) => task.parentTaskId === parentTaskId);
  const doneStatus = statuses.find((status) => status.category === "done");
  const todoStatus = statuses.find((status) => status.category === "todo");
  const doneCount = doneStatus
    ? subtasks.filter((task) => task.statusId === doneStatus.id).length
    : 0;

  const addSubtask = () => {
    const trimmed = draft.trim();
    if (!trimmed || !todoStatus) return;
    createTask({
      listId,
      name: trimmed,
      parentTaskId,
      statusId: todoStatus.id,
      priority: "none",
    });
    setDraft("");
  };

  const toggleSubtask = (subtaskId: string, isDone: boolean) => {
    if (!doneStatus || !todoStatus) return;
    moveTask(subtaskId, isDone ? todoStatus.id : doneStatus.id);
  };

  return (
    <section className={styles.section}>
      <div className="flex items-center justify-between gap-2">
        <h3 className={styles.sectionTitle}>
          Subtareas ({doneCount}/{subtasks.length})
        </h3>
        {subtasks.length > 0 && (
          <div className="w-28">
            <ProgressBar value={doneCount} total={subtasks.length} />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className={styles.subtaskRow}>
            <Checkbox
              checked={Boolean(doneStatus && subtask.statusId === doneStatus.id)}
              onChange={(checked) => toggleSubtask(subtask.id, !checked)}
            />
            <span
              className={
                doneStatus && subtask.statusId === doneStatus.id
                  ? "min-w-0 flex-1 truncate text-sm text-ebony-400 line-through"
                  : "min-w-0 flex-1 truncate text-sm text-ebony-100"
              }
            >
              {subtask.name}
            </span>
            <button
              type="button"
              aria-label={`Eliminar subtarea ${subtask.name}`}
              onClick={() => deleteTask(subtask.id)}
              className="cursor-pointer rounded p-1 text-ebony-500 opacity-0 transition-opacity hover:text-priority-urgent group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Plus className="size-4 shrink-0 text-ebony-400" aria-hidden />
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addSubtask();
          }}
          onBlur={() => draft.trim() && addSubtask()}
          placeholder="Añadir subtarea…"
          className={styles.addInput}
          aria-label="Nueva subtarea"
        />
      </div>
    </section>
  );
};

export default SubtasksSection;
