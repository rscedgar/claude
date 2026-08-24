"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, ListPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Select from "@/components/ui/Select";
import Skeleton from "@/components/ui/Skeleton";
import TaskTable from "@/components/tasks/TaskTable";
import NewTaskModal from "@/components/tasks/NewTaskModal";
import ViewSwitcher from "@/components/tasks/ViewSwitcher";
import { useScopedTasks, type ScopeType } from "@/hooks/useScopedTasks";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useUiStore } from "@/stores/ui-store";
import { useUserStore } from "@/stores/user-store";
import type { GroupByField, SortByField } from "@/types";
import { groupTasks } from "@/utils/task-grouping";
import { styles } from "./styles";

const groupByOptions: Array<{ value: GroupByField; label: string }> = [
  { value: "status", label: "Por estado" },
  { value: "priority", label: "Por prioridad" },
  { value: "assignee", label: "Por asignado" },
  { value: "none", label: "Sin agrupar" },
];

const sortByOptions: Array<{ value: SortByField; label: string }> = [
  { value: "created", label: "Creación" },
  { value: "due_date", label: "Vencimiento" },
  { value: "priority", label: "Prioridad" },
  { value: "name", label: "Nombre" },
];

interface ListViewSectionProps {
  scopeType: ScopeType;
  scopeId: string;
}

const ListViewSection = ({ scopeType, scopeId }: ListViewSectionProps) => {
  const scoped = useScopedTasks(scopeType, scopeId);
  const hydratedAll = useStoresHydrated();
  const users = useUserStore((state) => state.users);
  const groupBy = useUiStore((state) => state.groupBy);
  const sortBy = useUiStore((state) => state.sortBy);
  const sortDirection = useUiStore((state) => state.sortDirection);
  const setGroupBy = useUiStore((state) => state.setGroupBy);
  const setSortBy = useUiStore((state) => state.setSortBy);
  const toggleSortDirection = useUiStore((state) => state.toggleSortDirection);

  const [modalOpen, setModalOpen] = useState(false);

  const groups = useMemo(
    () =>
      scoped.hydrated
        ? groupTasks(scoped.tasks, groupBy, { statuses: scoped.statuses, users })
        : [],
    [scoped.hydrated, scoped.tasks, scoped.statuses, groupBy, users],
  );

  if (!hydratedAll) {
    return (
      <div className={styles.skeletonWrap}>
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
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

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.totalBadge}>
            {scoped.tasks.length} {scoped.tasks.length === 1 ? "tarea" : "tareas"}
          </span>
          {scoped.canCreateTask && (
            <Button size="sm" onClick={() => setModalOpen(true)}>
              <ListPlus className="size-4" />
              Nueva tarea
            </Button>
          )}
        </div>
        <div className={styles.toolbarRight}>
          <ViewSwitcher />
          <Select
            aria-label="Agrupar por"
            options={groupByOptions}
            value={groupBy}
            onChange={(event) => setGroupBy(event.target.value as GroupByField)}
            className="h-8 py-0 text-xs"
          />
          <Select
            aria-label="Ordenar por"
            options={sortByOptions}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortByField)}
            className="h-8 py-0 text-xs"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleSortDirection}
            title={`Dirección: ${sortDirection === "asc" ? "ascendente" : "descendente"}`}
          >
            <ArrowDownUp className="size-4" />
            {sortDirection === "asc" ? "Asc" : "Desc"}
          </Button>
        </div>
      </div>

      {scoped.tasks.length === 0 ? (
        <EmptyState
          icon={<ListPlus className="size-6" />}
          title="Sin tareas todavía"
          description={
            scoped.canCreateTask
              ? "Crea la primera tarea de esta lista para comenzar."
              : "Las listas de este alcance aún no tienen tareas."
          }
          action={
            scoped.canCreateTask ? (
              <Button size="sm" onClick={() => setModalOpen(true)}>
                Nueva tarea
              </Button>
            ) : undefined
          }
        />
      ) : (
        <TaskTable
          groups={groups}
          statuses={scoped.statuses}
          users={users}
          sortBy={sortBy}
          sortDirection={sortDirection}
          quickAddListId={
            scoped.canCreateTask && scoped.listIds[0]
              ? scoped.listIds[0]
              : undefined
          }
        />
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

export default ListViewSection;
