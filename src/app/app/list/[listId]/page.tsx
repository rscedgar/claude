"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import EntityPagePlaceholder from "@/components/layout/EntityPagePlaceholder";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useTaskStore } from "@/stores/task-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { countOpenTasksByList } from "@/utils/task-counts";

const ListPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const hydrated = useStoresHydrated();
  const taskList = useWorkspaceStore((state) => state.taskLists.find((l) => l.id === listId));
  const statuses = useWorkspaceStore((state) => state.statuses);
  const tasks = useTaskStore((state) => state.tasks);

  const openCount = useMemo(() => {
    const doneIds = new Set(statuses.filter((s) => s.category === "done").map((s) => s.id));
    return countOpenTasksByList(tasks, doneIds)[listId] ?? 0;
  }, [statuses, tasks, listId]);

  if (!hydrated) {
    return <div className="p-6 text-sm text-ebony-400">Cargando…</div>;
  }

  return (
    <EntityPagePlaceholder
      title={taskList?.name ?? "Lista no encontrada"}
      description={taskList ? `${openCount} tareas abiertas` : "La lista solicitada no existe."}
    />
  );
};

export default ListPage;
