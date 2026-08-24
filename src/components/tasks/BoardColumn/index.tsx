"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTaskCard } from "@/components/tasks/TaskCard";
import QuickAddTaskRow from "@/components/tasks/QuickAddTaskRow";
import { cn } from "@/lib/cn";
import type { Task, TaskStatus } from "@/types";
import { styles } from "./styles";

interface BoardColumnProps {
  status: TaskStatus;
  tasks: Task[];
  /** Lista destino para creación rápida; ausente en alcances agregados. */
  quickAddListId?: string;
}

const BoardColumn = ({ status, tasks, quickAddListId }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${status.id}`,
    data: { type: "column", statusId: status.id },
  });

  return (
    <section
      aria-label={`Columna ${status.name}`}
      className={cn(styles.root, isOver && styles.over)}
    >
      <header className={styles.header}>
        <span className={styles.dot} style={{ backgroundColor: status.color }} />
        <h2 className={styles.title}>{status.name}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </header>

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className={cn(styles.body, isOver && styles.bodyOver)}>
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} taskId={task.id} />
          ))}
          {tasks.length === 0 && <p className={styles.emptyHint}>Suelta tareas aquí</p>}
        </div>
      </SortableContext>

      {quickAddListId && (
        <footer className={styles.footer}>
          <QuickAddTaskRow listId={quickAddListId} defaults={{ statusId: status.id }} />
        </footer>
      )}
    </section>
  );
};

export default BoardColumn;
