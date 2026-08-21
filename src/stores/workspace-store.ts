"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Folder,
  Space,
  Tag,
  TaskList,
  TaskStatus,
} from "@/types";
import { seedData } from "@/db/seed-data";
import { useTaskStore } from "@/stores/task-store";

const genId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

interface WorkspaceStore {
  spaces: Space[];
  statuses: TaskStatus[];
  folders: Folder[];
  taskLists: TaskList[];
  tags: Tag[];

  createSpace: (name: string, color: string) => string;
  updateSpace: (spaceId: string, patch: Partial<Omit<Space, "id">>) => void;
  deleteSpace: (spaceId: string) => void;

  createFolder: (name: string, spaceId: string) => string;
  updateFolder: (folderId: string, patch: Partial<Omit<Folder, "id">>) => void;
  deleteFolder: (folderId: string) => void;

  createTaskList: (name: string, spaceId: string, folderId?: string | null) => string;
  updateTaskList: (listId: string, patch: Partial<Omit<TaskList, "id">>) => void;
  deleteTaskList: (listId: string) => void;

  createStatus: (spaceId: string, name: string, color: string, category: TaskStatus["category"]) => string;
  updateStatus: (statusId: string, patch: Partial<Omit<TaskStatus, "id" | "spaceId">>) => void;
  deleteStatus: (statusId: string) => void;

  createTag: (name: string, color: string) => string;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      spaces: seedData.spaces,
      statuses: seedData.statuses,
      folders: seedData.folders,
      taskLists: seedData.taskLists,
      tags: seedData.tags,

      createSpace: (name, color) => {
        const spaceId = genId();
        const statusIds = [
          ["Pendiente", "#8b93a7", "todo"],
          ["En Progreso", "#469aea", "active"],
          ["Completado", "#4ade80", "done"],
        ].map(([statusName, statusColor, category], index) => {
          const id = genId();
          set((state) => ({
            statuses: [
              ...state.statuses,
              {
                id,
                spaceId,
                name: statusName,
                color: statusColor,
                category: category as TaskStatus["category"],
                order: index,
              },
            ],
          }));
          return id;
        });
        set((state) => ({
          spaces: [...state.spaces, { id: spaceId, name, color, statusIds }],
        }));
        return spaceId;
      },

      updateSpace: (spaceId, patch) =>
        set((state) => ({
          spaces: state.spaces.map((space) =>
            space.id === spaceId ? { ...space, ...patch } : space,
          ),
        })),

      deleteSpace: (spaceId) => {
        const state = get();
        const listIds = state.taskLists
          .filter((list) => list.spaceId === spaceId)
          .map((list) => list.id);
        useTaskStore.getState().deleteTasksByListIds(listIds);
        set((prev) => ({
          spaces: prev.spaces.filter((space) => space.id !== spaceId),
          statuses: prev.statuses.filter((status) => status.spaceId !== spaceId),
          folders: prev.folders.filter((folder) => folder.spaceId !== spaceId),
          taskLists: prev.taskLists.filter((list) => list.spaceId !== spaceId),
        }));
      },

      createFolder: (name, spaceId) => {
        const folderId = genId();
        set((state) => ({
          folders: [...state.folders, { id: folderId, spaceId, name, hidden: false }],
        }));
        return folderId;
      },

      updateFolder: (folderId, patch) =>
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === folderId ? { ...folder, ...patch } : folder,
          ),
        })),

      deleteFolder: (folderId) => {
        const state = get();
        const orphanListIds = state.taskLists
          .filter((list) => list.folderId === folderId)
          .map((list) => list.id);
        useTaskStore.getState().deleteTasksByListIds(orphanListIds);
        set((prev) => ({
          folders: prev.folders.filter((folder) => folder.id !== folderId),
          taskLists: prev.taskLists.filter((list) => list.folderId !== folderId),
        }));
      },

      createTaskList: (name, spaceId, folderId = null) => {
        const listId = genId();
        set((state) => ({
          taskLists: [...state.taskLists, { id: listId, spaceId, folderId, name }],
        }));
        return listId;
      },

      updateTaskList: (listId, patch) =>
        set((state) => ({
          taskLists: state.taskLists.map((list) =>
            list.id === listId ? { ...list, ...patch } : list,
          ),
        })),

      deleteTaskList: (listId) => {
        useTaskStore.getState().deleteTasksByListIds([listId]);
        set((state) => ({
          taskLists: state.taskLists.filter((list) => list.id !== listId),
        }));
      },

      createStatus: (spaceId, name, color, category) => {
        const statusId = genId();
        set((state) => {
          const maxOrder = Math.max(
            -1,
            ...state.statuses.filter((s) => s.spaceId === spaceId).map((s) => s.order),
          );
          return {
            statuses: [
              ...state.statuses,
              { id: statusId, spaceId, name, color, category, order: maxOrder + 1 },
            ],
            spaces: state.spaces.map((space) =>
              space.id === spaceId
                ? { ...space, statusIds: [...space.statusIds, statusId] }
                : space,
            ),
          };
        });
        return statusId;
      },

      updateStatus: (statusId, patch) =>
        set((state) => ({
          statuses: state.statuses.map((status) =>
            status.id === statusId ? { ...status, ...patch } : status,
          ),
        })),

      deleteStatus: (statusId) => {
        const state = get();
        const status = state.statuses.find((s) => s.id === statusId);
        if (!status || !("randomUUID" in crypto)) return;
        const fallback =
          state.statuses.find(
            (s) => s.spaceId === status.spaceId && s.category === "todo" && s.id !== statusId,
          ) ?? null;
        if (fallback) {
          useTaskStore
            .getState()
            .moveTasksFromStatus(statusId, fallback.id);
        }
        set((prev) => ({
          statuses: prev.statuses.filter((s) => s.id !== statusId),
          spaces: prev.spaces.map((space) =>
            space.id === status.spaceId
              ? { ...space, statusIds: space.statusIds.filter((id) => id !== statusId) }
              : space,
          ),
        }));
      },

      createTag: (name, color) => {
        const tagId = genId();
        set((state) => ({ tags: [...state.tags, { id: tagId, name, color }] }));
        return tagId;
      },
    }),
    {
      name: "taskflow-workspace",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
