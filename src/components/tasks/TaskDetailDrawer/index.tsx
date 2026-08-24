"use client";

import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import Checkbox from "@/components/ui/Checkbox";
import Drawer from "@/components/ui/Drawer";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { useUserStore } from "@/stores/user-store";
import ActivitySection from "./ActivitySection";
import ChecklistsSection from "./ChecklistsSection";
import CommentsSection from "./CommentsSection";
import SubtasksSection from "./SubtasksSection";
import TaskProperties from "./TaskProperties";
import { renderSimpleMarkdown } from "@/utils/markdown";
import { useTaskStore } from "@/stores/task-store";
import { useUiStore } from "@/stores/ui-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { styles } from "./styles";

const TaskDetailDrawer = () => {
  const openTaskId = useUiStore((state) => state.openTaskId);
  const closeTask = useUiStore((state) => state.closeTask);
  const task = useTaskStore((state) =>
    state.tasks.find((candidate) => candidate.id === openTaskId),
  );

  // key remonta el contenido al cambiar de tarea: resetea edición sin efectos
  return task ? (
    <TaskDetailContent key={task.id} taskId={task.id} onClose={closeTask} />
  ) : (
    <Drawer open={false} onClose={closeTask} title="" />
  );
};

const TaskDetailContent = ({
  taskId,
  onClose,
}: {
  taskId: string;
  onClose: () => void;
}) => {
  const task = useTaskStore((state) =>
    state.tasks.find((candidate) => candidate.id === taskId),
  );
  const updateTask = useTaskStore((state) => state.updateTask);
  const moveTask = useTaskStore((state) => state.moveTask);
  const taskLists = useWorkspaceStore((state) => state.taskLists);
  const statuses = useWorkspaceStore((state) => state.statuses);
  const users = useUserStore((state) => state.users);
  const { showToast } = useToast();

  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionDraft, setDescriptionDraft] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  if (!task) return null;

  const taskList = taskLists.find((list) => list.id === task.listId);
  const spaceStatuses = taskList
    ? statuses
        .filter((status) => status.spaceId === taskList.spaceId)
        .sort((a, b) => a.order - b.order)
    : [];
  const spaceLists = taskList
    ? taskLists.filter((list) => list.spaceId === taskList.spaceId)
    : [];

  const currentStatus = spaceStatuses.find(
    (status) => status.id === task.statusId,
  );
  const isDone = currentStatus?.category === "done";
  const doneStatus = spaceStatuses.find((status) => status.category === "done");
  const todoStatus = spaceStatuses.find((status) => status.category === "todo");

  const startNameEdit = () => {
    setNameDraft(task.name);
    setEditingName(true);
    requestAnimationFrame(() => nameInputRef.current?.select());
  };

  const commitName = () => {
    const trimmed = nameDraft.trim();
    if (trimmed && trimmed !== task.name) {
      updateTask(task.id, { name: trimmed });
    }
    setEditingName(false);
  };

  const toggleComplete = () => {
    if (!doneStatus || !todoStatus || !currentStatus) return;
    moveTask(task.id, isDone ? todoStatus.id : doneStatus.id);
    showToast({
      title: isDone ? "Tarea reabierta" : "Tarea completada",
      description: task.name,
      variant: isDone ? "info" : "success",
    });
  };

  return (
    <Drawer open onClose={onClose} title={taskList?.name ?? "Detalle de tarea"}>
      <div className={styles.root}>
        <div className={styles.headerBlock}>
          <div className="flex items-start gap-2.5">
            <span className="pt-2">
              <Checkbox checked={isDone} onChange={toggleComplete} aria-label="Completar tarea" />
            </span>
            {editingName ? (
              <input
                ref={nameInputRef}
                value={nameDraft}
                onChange={(event) => setNameDraft(event.target.value)}
                onBlur={commitName}
                onKeyDown={(event) => {
                  if (event.key === "Enter") commitName();
                  if (event.key === "Escape") setEditingName(false);
                }}
                autoFocus
                className={styles.nameInput}
                aria-label="Nombre de la tarea"
              />
            ) : (
              <button type="button" onClick={startNameEdit} className={cn(styles.name, isDone && styles.nameDone)}>
                {task.name}
              </button>
            )}
          </div>
        </div>

        <TaskProperties
          task={task}
          statuses={spaceStatuses}
          lists={spaceLists}
          users={users}
        />

        <section className={styles.section}>
          <div className="flex items-center justify-between gap-2">
            <h3 className={styles.sectionTitle}>Descripción</h3>
            {!editingDescription && (
              <button
                type="button"
                onClick={() => {
                  setDescriptionDraft(task.description);
                  setEditingDescription(true);
                }}
                className="flex cursor-pointer items-center gap-1 text-xs text-congress-400 hover:text-congress-300 focus-visible:outline-hidden"
              >
                <Pencil className="size-3" />
                Editar
              </button>
            )}
          </div>
          {editingDescription ? (
            <>
              <textarea
                autoFocus
                rows={5}
                value={descriptionDraft}
                onChange={(event) => setDescriptionDraft(event.target.value)}
                placeholder="Añade una descripción… (# encabezado, - viñeta, **negrita**, `código`)"
                className={styles.descriptionBox}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDescription(false)}
                  className="cursor-pointer rounded px-2 py-1 text-xs font-medium text-ebony-300 hover:bg-white/5 focus-visible:outline-hidden"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateTask(task.id, { description: descriptionDraft });
                    setEditingDescription(false);
                    showToast({ title: "Descripción actualizada", variant: "success" });
                  }}
                  className="cursor-pointer rounded bg-congress-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-congress-600 focus-visible:outline-hidden"
                >
                  Guardar
                </button>
              </div>
            </>
          ) : task.description.trim() ? (
            <button
              type="button"
              onClick={() => {
                setDescriptionDraft(task.description);
                setEditingDescription(true);
              }}
              className={cn(styles.descriptionPreview, "w-full text-left")}
            >
              {renderSimpleMarkdown(task.description)}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setDescriptionDraft("");
                setEditingDescription(true);
              }}
              className={styles.descriptionBox}
            >
              <span className="text-ebony-500">Añadir una descripción…</span>
            </button>
          )}
        </section>

        <SubtasksSection
          parentTaskId={task.id}
          listId={task.listId}
          statuses={spaceStatuses}
        />

        <ChecklistsSection taskId={task.id} />

        <CommentsSection taskId={task.id} />

        <ActivitySection taskId={task.id} />
      </div>
    </Drawer>
  );
};

export default TaskDetailDrawer;
