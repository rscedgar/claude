"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { KanbanSquare, ListPlus } from "lucide-react";
import BoardColumn from "@/components/tasks/BoardColumn";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import TaskCard from "@/components/tasks/TaskCard";
import ViewSwitcher from "@/components/tasks/ViewSwitcher";
import NewTaskModal from "@/components/tasks/NewTaskModal";
import { useScopedTasks, type ScopeType } from "@/hooks/useScopedTasks";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useTaskStore } from "@/stores/task-store";
import { useUserStore } from "@/stores/user-store";
import { styles } from "./styles";

interface BoardSectionProps {
  scopeType: ScopeType;
  scopeId: string;
}

const BoardSection = ({ scopeType, scopeId }: BoardSectionProps) => {
  const scoped = useScopedTasks(scopeType, scopeId);
  const users = useUserStore((state) => state.users);
  const moveTask = useTaskStore((state) => state.moveTask);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const tasksByStatus = useMemo(() => {
    const map = new Map<string, typeof scoped.tasks>();
    for (const status of scoped.statuses) map.set(status.id, []);
    for (const task of scoped.tasks) {
      map.get(task.statusId)?.push(task);
    }
    return map;
  }, [scoped]);

  if (!useStoresHydrated()) {
    return (
      <div className={styles.skeletonWrap}>
        <Skeleton className="h-9 w-64" />
        <div className={styles.skeletonColumns}>
          <Skeleton className="h-96 w-72" />
          <Skeleton className="h-80 w-72" />
          <Skeleton className="h-88 w-72" />
        </div>
      </div>
    );
  }

  if (!scoped.exists) {
    return (
      <div className={styles.wrap}>
        <EmptyState
          title="No encontrado"
          description="El elemento solicitado no existe o fue eliminado."
        />
      </div>
    );
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const activeTask = scoped.tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    // Resolver columna destino según el elemento sobre el que se soltó.
    const overData = over.data.current as
      | { type: "column"; statusId: string }
      | { type: "task" }
      | undefined;

    let targetStatusId: string | null = null;
    let overIndexInTarget = -1;

    if (overData?.type === "column") {
      targetStatusId = overData.statusId;
    } else if (overData?.type === "task") {
      const overTask = scoped.tasks.find((task) => task.id === String(over.id));
      targetStatusId = overTask?.statusId ?? null;
    }
    if (!targetStatusId) return;

    const targetTasks = [...(tasksByStatus.get(targetStatusId) ?? [])];

    if (activeTask.statusId === targetStatusId) {
      // Reordenar dentro de la misma columna
      const oldIndex = targetTasks.findIndex((task) => task.id === activeId);
      const newIndex =
        overData?.type === "task"
          ? targetTasks.findIndex((task) => task.id === String(over.id))
          : targetTasks.length - 1;
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      const reordered = arrayMove(targetTasks, oldIndex, newIndex);
      reorderTasks(reordered.map((task) => task.id));
    } else {
      // Mover a otra columna respetando la posición soltada
      if (overData?.type === "task") {
        overIndexInTarget = targetTasks.findIndex(
          (task) => task.id === String(over.id),
        );
      }
      const insertAt =
        overIndexInTarget >= 0 ? overIndexInTarget : targetTasks.length;

      moveTask(activeId, targetStatusId);
      const nextIds = [
        ...targetTasks.slice(0, insertAt).map((task) => task.id),
        activeId,
        ...targetTasks.slice(insertAt).map((task) => task.id),
      ];
      // El rank debe considerar también las tareas ya presentes en el destino
      reorderTasks(nextIds);
    }
  };

  const quickAddListId = scoped.canCreateTask ? scoped.listIds[0] : undefined;
  const totalTasks = scoped.tasks.length;

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.totalBadge}>
            {totalTasks} {totalTasks === 1 ? "tarea" : "tareas"}
          </span>
          {scoped.canCreateTask && (
            <Button size="sm" onClick={() => setModalOpen(true)}>
              <ListPlus className="size-4" />
              Nueva tarea
            </Button>
          )}
        </div>
        <ViewSwitcher />
      </div>

      {totalTasks === 0 && scoped.listIds.length > 0 && !quickAddListId ? (
        <EmptyState
          icon={<KanbanSquare className="size-6" />}
          title="Sin tareas todavía"
          description="Las listas de este alcance aún no tienen tareas para mostrar en el tablero."
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.columns}>
            {scoped.statuses.map((status) => (
              <BoardColumn
                key={status.id}
                status={status}
                tasks={tasksByStatus.get(status.id) ?? []}
                quickAddListId={quickAddListId}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
            {activeTaskId ? <TaskCard taskId={activeTaskId} overlay dragging /> : null}
          </DragOverlay>
        </DndContext>
      )}

      {scoped.canCreateTask && scoped.listIds[0] && (
        <NewTaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          listId={scoped.listIds[0]}
          statuses={scoped.statuses}
          users={users}
        />
      )}
    </div>
  );
};

export default BoardSection;
