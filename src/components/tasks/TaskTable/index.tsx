"use client";

import { useState } from "react";
import TaskGroupHeader from "@/components/tasks/TaskGroupHeader";
import TaskRow from "@/components/tasks/TaskRow";
import QuickAddTaskRow from "@/components/tasks/QuickAddTaskRow";
import type { SortByField, SortDirection, Task, TaskStatus, User } from "@/types";
import { sortTasks } from "@/utils/task-sorting";
import type { TaskGroup } from "@/utils/task-grouping";
import { styles } from "./styles";

interface TaskTableProps {
  groups: TaskGroup[];
  statuses: TaskStatus[];
  users: User[];
  sortBy: SortByField;
  sortDirection: SortDirection;
  quickAddListId?: string;
}

const TaskTable = ({
  groups,
  statuses,
  users,
  sortBy,
  sortDirection,
  quickAddListId,
}: TaskTableProps) => {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (key: string) =>
    setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={styles.root}>
      {groups.map((group) => {
        const collapsed = collapsedGroups[group.key] ?? false;
        const sorted = sortTasks(group.tasks, sortBy, sortDirection);
        const assignee =
          group.assigneeId !== undefined && group.assigneeId !== null
            ? (users.find((user) => user.id === group.assigneeId) ?? null)
            : null;

        let quickAdd: React.ReactNode = null;
        if (!collapsed && quickAddListId) {
          if (group.statusId) {
            quickAdd = (
              <QuickAddTaskRow
                listId={quickAddListId}
                defaults={{
                  statusId: group.statusId,
                  assigneeIds:
                    group.assigneeId !== undefined && group.assigneeId !== null
                      ? [group.assigneeId]
                      : undefined,
                }}
              />
            );
          } else if (group.priority) {
            quickAdd = (
              <QuickAddTaskRow
                listId={quickAddListId}
                defaults={{ priority: group.priority }}
              />
            );
          } else if (assignee && group.assigneeId) {
            quickAdd = (
              <QuickAddTaskRow
                listId={quickAddListId}
                defaults={{ assigneeIds: [group.assigneeId] }}
              />
            );
          } else {
            quickAdd = <QuickAddTaskRow listId={quickAddListId} />;
          }
        }

        return (
          <section key={group.key} aria-label={`Grupo ${group.label}`}>
            <TaskGroupHeader
              label={group.label}
              count={group.tasks.length}
              color={group.color}
              assignee={assignee}
              collapsed={collapsed}
              onToggle={() => toggleGroup(group.key)}
            />
            {!collapsed &&
              sorted.map((task: Task) => (
                <TaskRow key={task.id} task={task} statuses={statuses} />
              ))}
            {quickAdd}
          </section>
        );
      })}
      {groups.every((group) => group.tasks.length === 0) && (
        <p className={styles.empty}>No hay tareas que coincidan con los filtros.</p>
      )}
    </div>
  );
};

export default TaskTable;
