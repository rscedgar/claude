"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTaskStore, type CreateTaskInput } from "@/stores/task-store";
import { useToast } from "@/components/ui/Toast";
import { styles } from "./styles";

interface QuickAddTaskRowProps {
  listId: string;
  defaults?: Partial<Pick<CreateTaskInput, "statusId" | "priority" | "assigneeIds">>;
}

const QuickAddTaskRow = ({ listId, defaults }: QuickAddTaskRowProps) => {
  const createTask = useTaskStore((state) => state.createTask);
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const commit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setOpen(false);
      return;
    }
    createTask({ listId, name: trimmed, ...defaults });
    showToast({ title: "Tarea creada", description: trimmed, variant: "success" });
    setName("");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(styles.trigger)}
      >
        <Plus className="size-4" />
        Agregar tarea
      </button>
    );
  }

  return (
    <div className={styles.editorRow}>
      <Plus className={cn(styles.plus)} aria-hidden />
      <input
        autoFocus
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit();
          if (event.key === "Escape") setOpen(false);
        }}
        placeholder="Nombre de la tarea… (Enter para crear)"
        className={styles.input}
        aria-label="Nueva tarea"
      />
      <span className={styles.hint}>Esc para cerrar</span>
    </div>
  );
};

export default QuickAddTaskRow;
