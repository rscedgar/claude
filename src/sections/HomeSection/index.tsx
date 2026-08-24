"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  DatabaseBackup,
  Hash,
  ListTodo,
} from "lucide-react";
import AvatarGroup from "@/components/ui/AvatarGroup";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useCurrentUser, useUserStore } from "@/stores/user-store";
import { useTaskStore } from "@/stores/task-store";
import { useUiStore } from "@/stores/ui-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { formatShortDate, isOverdue, isToday } from "@/utils/date";
import { countOpenTasksByList } from "@/utils/task-counts";
import { styles } from "./styles";

const weekStartIso = (): string => {
  const now = new Date();
  const day = (now.getDay() + 6) % 7; // lunes = 0
  const monday = new Date(now);
  monday.setDate(now.getDate() - day);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
};

const inNextDays = (iso: string | null, days: number): boolean => {
  if (!iso) return false;
  const due = new Date(iso).getTime();
  const limit = Date.now() + days * 24 * 60 * 60 * 1000;
  return due >= Date.now() && due <= limit;
};

const HomeSection = () => {
  const hydrated = useStoresHydrated();
  const currentUser = useCurrentUser();
  const users = useUserStore((state) => state.users);
  const tasks = useTaskStore((state) => state.tasks);
  const statuses = useWorkspaceStore((state) => state.statuses);
  const spaces = useWorkspaceStore((state) => state.spaces);
  const taskLists = useWorkspaceStore((state) => state.taskLists);
  const openTask = useUiStore((state) => state.openTask);
  const { showToast } = useToast();

  const statusById = useMemo(
    () => new Map(statuses.map((status) => [status.id, status])),
    [statuses],
  );

  const data = useMemo(() => {
    const topTasks = tasks.filter((task) => !task.parentTaskId);
    const openTasks = topTasks.filter(
      (task) => statusById.get(task.statusId)?.category !== "done",
    );
    const myOpen = openTasks.filter((task) =>
      task.assigneeIds.includes(currentUser?.id ?? ""),
    );
    const myOverdue = myOpen.filter((task) => isOverdue(task.dueDate));
    const completedThisWeek = topTasks.filter((task) => {
      if (statusById.get(task.statusId)?.category !== "done") return false;
      return task.updatedAt >= weekStartIso();
    });
    const upcoming = openTasks
      .filter((task) => inNextDays(task.dueDate, 7))
      .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""))
      .slice(0, 6);

    const doneIds = new Set(
      statuses
        .filter((status) => status.category === "done")
        .map((status) => status.id),
    );
    const openByList = countOpenTasksByList(topTasks, doneIds);

    return { myOpen, myOverdue, completedThisWeek, upcoming, openByList };
  }, [tasks, statuses, statusById, currentUser?.id]);

  const resetDemoData = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("taskflow-"),
    );
    keys.forEach((key) => localStorage.removeItem(key));
    showToast({
      title: "Datos demo restaurados",
      description: "Recargando la aplicación…",
      variant: "info",
    });
    setTimeout(() => window.location.reload(), 600);
  };

  if (!hydrated) {
    return (
      <div className={styles.skeletonWrap}>
        <Skeleton className="h-8 w-72" />
        <div className={styles.statGrid}>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-56 w-full" />
      </div>
    );
  }

  const firstName = currentUser?.name.split(" ")[0] ?? "";
  const todayLabel = new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className={styles.root}>
      <header className={styles.greetingBlock}>
        <h1 className={styles.greeting}>Hola, {firstName}</h1>
        <p className={styles.today}>{todayLabel}</p>
      </header>

      <section aria-label="Resumen" className={styles.statGrid}>
        <StatCard
          icon={<ListTodo className={styles.statIcon} />}
          label="Mis tareas abiertas"
          value={data.myOpen.length}
          tone="info"
        />
        <StatCard
          icon={<AlertTriangle className={styles.statIcon} />}
          label="Vencidas"
          value={data.myOverdue.length}
          tone="danger"
        />
        <StatCard
          icon={<CheckCircle2 className={styles.statIcon} />}
          label="Completadas esta semana"
          value={data.completedThisWeek.length}
          tone="success"
        />
      </section>

      <section aria-label="Mis tareas" className={styles.section}>
        <h2 className={styles.sectionTitle}>Mis tareas abiertas</h2>
        {data.myOpen.length === 0 ? (
          <EmptyState
            icon={<CheckCircle2 className="size-6" />}
            title="Todo al día"
            description="No tienes tareas abiertas asignadas. Buen trabajo."
          />
        ) : (
          <ul className={styles.taskList}>
            {data.myOpen.slice(0, 6).map((task) => {
              const status = statusById.get(task.statusId);
              const dueClassName = isOverdue(task.dueDate)
                ? styles.dueOverdue
                : isToday(task.dueDate)
                  ? styles.dueSoon
                  : undefined;
              return (
                <li key={task.id}>
                  <button
                    type="button"
                    onClick={() => openTask(task.id)}
                    className={styles.taskRow}
                  >
                    <span
                      className={styles.statusDot}
                      style={{ backgroundColor: status?.color ?? "#8b93a7" }}
                    />
                    <span className={styles.taskName}>{task.name}</span>
                    {task.dueDate && (
                      <span className={cn(styles.due, dueClassName)}>
                        <CalendarClock className="size-3.5" />
                        {formatShortDate(task.dueDate)}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-label="Próximos vencimientos" className={styles.section}>
        <h2 className={styles.sectionTitle}>Vencen en los próximos 7 días</h2>
        {data.upcoming.length === 0 ? (
          <EmptyState
            icon={<CalendarClock className="size-6" />}
            title="Sin vencimientos cercanos"
            description="Ninguna tarea abierta vence en los próximos 7 días."
          />
        ) : (
          <ul className={styles.taskList}>
            {data.upcoming.map((task) => {
              const status = statusById.get(task.statusId);
              const assignees = users.filter((user) =>
                task.assigneeIds.includes(user.id),
              );
              return (
                <li key={task.id}>
                  <button
                    type="button"
                    onClick={() => openTask(task.id)}
                    className={styles.taskRow}
                  >
                    <span
                      className={styles.statusDot}
                      style={{ backgroundColor: status?.color ?? "#8b93a7" }}
                    />
                    <span className={styles.taskName}>{task.name}</span>
                    <span
                      className={cn(styles.due, isToday(task.dueDate) && styles.dueSoon)}
                    >
                      {formatShortDate(task.dueDate ?? "")}
                    </span>
                    <AvatarGroup users={assignees} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-label="Acceso rápido a listas" className={styles.section}>
        <h2 className={styles.sectionTitle}>Tus listas</h2>
        <div className={styles.listGrid}>
          {taskLists.map((list) => {
            const space = spaces.find((candidate) => candidate.id === list.spaceId);
            return (
              <Link key={list.id} href={`/app/list/${list.id}`} className={styles.listCard}>
                <Hash className={styles.listIcon} style={{ color: space?.color }} />
                <span className={styles.listName}>{list.name}</span>
                <span className={styles.listCount}>{data.openByList[list.id] ?? 0}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer}>
        <Button size="sm" variant="ghost" onClick={resetDemoData}>
          <DatabaseBackup className="size-4" />
          Restaurar datos demo
        </Button>
      </footer>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone?: "info" | "danger" | "success";
}

const statToneClass = {
  info: styles.statInfo,
  danger: styles.statDanger,
  success: styles.statSuccess,
} as const;

const StatCard = ({ icon, label, value, tone = "info" }: StatCardProps) => (
  <div className={cn(styles.statCard, statToneClass[tone])}>
    {icon}
    <span className={styles.statValue}>{value}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);

export default HomeSection;
