"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ActivityAction,
  ActivityLog,
  Checklist,
  ChecklistItem,
  Comment,
  PriorityLevel,
  Task,
} from "@/types";
import { seedData } from "@/db/seed-data";

const genId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export interface CreateTaskInput {
  listId: string;
  name: string;
  parentTaskId?: string | null;
  statusId?: string;
  priority?: PriorityLevel;
  assigneeIds?: string[];
  tagIds?: string[];
  startDate?: string | null;
  dueDate?: string | null;
}

interface TaskStore {
  tasks: Task[];
  checklists: Checklist[];
  checklistItems: ChecklistItem[];
  comments: Comment[];
  activities: ActivityLog[];

  createTask: (input: CreateTaskInput) => string;
  updateTask: (taskId: string, patch: Partial<Omit<Task, "id">>) => void;
  moveTask: (taskId: string, statusId: string) => void;
  deleteTask: (taskId: string) => void;
  deleteTasksByListIds: (listIds: string[]) => void;
  moveTasksFromStatus: (fromStatusId: string, toStatusId: string) => void;

  createChecklist: (taskId: string, title: string) => string;
  deleteChecklist: (checklistId: string) => void;
  createChecklistItem: (checklistId: string, text: string) => string;
  updateChecklistItem: (
    itemId: string,
    patch: Partial<Pick<ChecklistItem, "text" | "resolved">>,
  ) => void;
  deleteChecklistItem: (itemId: string) => void;

  addComment: (taskId: string, authorId: string, content: string) => void;
  deleteComment: (commentId: string) => void;
}

interface LogEntryInput {
  taskId: string;
  userId?: string;
  action: ActivityAction;
  field?: string;
  fromValue?: string;
  toValue?: string;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => {
      const logActivity = (entry: LogEntryInput): ActivityLog => ({
        id: genId(),
        userId: entry.userId ?? "user-1",
        createdAt: new Date().toISOString(),
        ...entry,
      });

      return {
        tasks: seedData.tasks,
        checklists: seedData.checklists,
        checklistItems: seedData.checklistItems,
        comments: seedData.comments,
        activities: seedData.activities,

        createTask: (input) => {
          const taskId = genId();
          const nowIso = new Date().toISOString();
          const state = get();
          const listOrderMax = Math.max(
            -1,
            ...state.tasks
              .filter((t) => t.listId === input.listId && t.parentTaskId === null)
              .map((t) => t.order),
          );
          const task: Task = {
            id: taskId,
            listId: input.listId,
            parentTaskId: input.parentTaskId ?? null,
            name: input.name,
            description: "",
            statusId:
              input.statusId ?? state.tasks.find((t) => t.id === input.parentTaskId)?.statusId ?? "",
            priority: input.priority ?? "normal",
            assigneeIds: input.assigneeIds ?? [],
            tagIds: input.tagIds ?? [],
            startDate: input.startDate ?? null,
            dueDate: input.dueDate ?? null,
            order: input.parentTaskId
              ? state.tasks.filter((t) => t.parentTaskId === input.parentTaskId).length
              : listOrderMax + 1,
            createdAt: nowIso,
            updatedAt: nowIso,
          };
          const activity = logActivity({ taskId, action: "created", field: "task", toValue: task.name });
          set((prev) => ({
            tasks: [...prev.tasks, task],
            activities: [activity, ...prev.activities],
          }));
          return taskId;
        },

        updateTask: (taskId, patch) => {
          const fields = Object.keys(patch);
          if (!get().tasks.some((t) => t.id === taskId)) return;
          const activity = logActivity({
            taskId,
            action: "updated",
            field: fields.length === 1 ? fields[0] : undefined,
            toValue: fields.join(", "),
          });
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? { ...task, ...patch, updatedAt: new Date().toISOString() }
                : task,
            ),
            activities: [activity, ...state.activities],
          }));
        },

        moveTask: (taskId, statusId) => {
          const task = get().tasks.find((t) => t.id === taskId);
          if (!task || task.statusId === statusId) return;
          const activity = logActivity({
            taskId,
            action: "moved",
            field: "status",
            fromValue: task.statusId,
            toValue: statusId,
          });
          set((state) => ({
            tasks: state.tasks.map((t) =>
              t.id === taskId
                ? { ...t, statusId, updatedAt: new Date().toISOString() }
                : t,
            ),
            activities: [activity, ...state.activities],
          }));
        },

        deleteTask: (taskId) => {
          const state = get();
          const subtaskIds = state.tasks
            .filter((t) => t.parentTaskId === taskId)
            .map((t) => t.id);
          const affectedIds = new Set([taskId, ...subtaskIds]);
          const removedChecklistIds = new Set(
            state.checklists.filter((c) => affectedIds.has(c.taskId)).map((c) => c.id),
          );
          const activities = [...affectedIds].map((id) =>
            logActivity({ taskId: id, action: "deleted" }),
          );
          set((prev) => ({
            tasks: prev.tasks.filter((t) => !affectedIds.has(t.id)),
            checklists: prev.checklists.filter((c) => !removedChecklistIds.has(c.id)),
            checklistItems: prev.checklistItems.filter(
              (item) => !removedChecklistIds.has(item.checklistId),
            ),
            comments: prev.comments.filter((comment) => !affectedIds.has(comment.taskId)),
            activities: [
              ...activities,
              ...prev.activities.filter((a) => !affectedIds.has(a.taskId)),
            ],
          }));
        },

        deleteTasksByListIds: (listIds) => {
          if (listIds.length === 0) return;
          set((state) => {
            const removedIds = state.tasks
              .filter((t) => listIds.includes(t.listId))
              .map((t) => t.id);
            const keptChecklists = state.checklists.filter(
              (c) => !removedIds.includes(c.taskId),
            );
            const keptChecklistIds = new Set(keptChecklists.map((c) => c.id));
            return {
              tasks: state.tasks.filter((t) => !removedIds.includes(t.id)),
              checklists: keptChecklists,
              checklistItems: state.checklistItems.filter((item) =>
                keptChecklistIds.has(item.checklistId),
              ),
              comments: state.comments.filter((c) => !removedIds.includes(c.taskId)),
              activities: state.activities.filter((a) => !removedIds.includes(a.taskId)),
            };
          });
        },

        moveTasksFromStatus: (fromStatusId, toStatusId) =>
          set((state) => ({
            tasks: state.tasks.map((t) =>
              t.statusId === fromStatusId ? { ...t, statusId: toStatusId } : t,
            ),
          })),

        createChecklist: (taskId, title) => {
          const checklistId = genId();
          set((state) => ({
            checklists: [...state.checklists, { id: checklistId, taskId, title }],
          }));
          return checklistId;
        },

        deleteChecklist: (checklistId) =>
          set((state) => ({
            checklists: state.checklists.filter((c) => c.id !== checklistId),
            checklistItems: state.checklistItems.filter(
              (item) => item.checklistId !== checklistId,
            ),
          })),

        createChecklistItem: (checklistId, text) => {
          const itemId = genId();
          set((state) => ({
            checklistItems: [
              ...state.checklistItems,
              { id: itemId, checklistId, text, resolved: false },
            ],
          }));
          return itemId;
        },

        updateChecklistItem: (itemId, patch) =>
          set((state) => ({
            checklistItems: state.checklistItems.map((item) =>
              item.id === itemId ? { ...item, ...patch } : item,
            ),
          })),

        deleteChecklistItem: (itemId) =>
          set((state) => ({
            checklistItems: state.checklistItems.filter((item) => item.id !== itemId),
          })),

        addComment: (taskId, authorId, content) => {
          const comment: Comment = {
            id: genId(),
            taskId,
            authorId,
            content,
            createdAt: new Date().toISOString(),
          };
          const activity = logActivity({ taskId, userId: authorId, action: "commented" });
          set((state) => ({
            comments: [...state.comments, comment],
            activities: [activity, ...state.activities],
          }));
        },

        deleteComment: (commentId) =>
          set((state) => ({
            comments: state.comments.filter((comment) => comment.id !== commentId),
          })),
      };
    },
    {
      name: "taskflow-tasks",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
