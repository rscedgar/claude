"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import ProgressBar from "@/components/ui/ProgressBar";
import { useTaskStore } from "@/stores/task-store";
import { styles } from "./styles";

interface ChecklistsSectionProps {
  taskId: string;
}

const ChecklistsSection = ({ taskId }: ChecklistsSectionProps) => {
  const checklists = useTaskStore((state) => state.checklists);
  const checklistItems = useTaskStore((state) => state.checklistItems);
  const createChecklist = useTaskStore((state) => state.createChecklist);
  const deleteChecklist = useTaskStore((state) => state.deleteChecklist);
  const createChecklistItem = useTaskStore((state) => state.createChecklistItem);
  const updateChecklistItem = useTaskStore((state) => state.updateChecklistItem);
  const deleteChecklistItem = useTaskStore((state) => state.deleteChecklistItem);

  const [itemDrafts, setItemDrafts] = useState<Record<string, string>>({});

  const taskChecklists = checklists.filter((checklist) => checklist.taskId === taskId);

  const addItem = (checklistId: string) => {
    const text = (itemDrafts[checklistId] ?? "").trim();
    if (!text) return;
    createChecklistItem(checklistId, text);
    setItemDrafts((prev) => ({ ...prev, [checklistId]: "" }));
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Checklists</h3>

      <div className="flex flex-col gap-4">
        {taskChecklists.map((checklist) => {
          const items = checklistItems.filter(
            (item) => item.checklistId === checklist.id,
          );
          const resolvedCount = items.filter((item) => item.resolved).length;

          return (
            <div
              key={checklist.id}
              className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-surface-overlay/50 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-ebony-100">
                  {checklist.title}
                </span>
                <div className="flex items-center gap-2">
                  {items.length > 0 && (
                    <>
                      <span className="text-[11px] tabular-nums text-ebony-400">
                        {resolvedCount}/{items.length}
                      </span>
                      <div className="w-20">
                        <ProgressBar value={resolvedCount} total={items.length} />
                      </div>
                    </>
                  )}
                  <button
                    type="button"
                    aria-label={`Eliminar checklist ${checklist.title}`}
                    onClick={() => deleteChecklist(checklist.id)}
                    className="cursor-pointer rounded p-1 text-ebony-500 transition-colors hover:text-priority-urgent focus-visible:outline-hidden"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <div key={item.id} className="group flex items-center gap-2.5 px-1 py-0.5">
                    <Checkbox
                      checked={item.resolved}
                      onChange={(checked) =>
                        updateChecklistItem(item.id, { resolved: checked })
                      }
                    />
                    <input
                      value={item.text}
                      onChange={(event) =>
                        updateChecklistItem(item.id, { text: event.target.value })
                      }
                      className={
                        item.resolved
                          ? "min-w-0 flex-1 border-none bg-transparent text-sm text-ebony-400 line-through focus:outline-hidden"
                          : "min-w-0 flex-1 border-none bg-transparent text-sm text-ebony-100 focus:outline-hidden"
                      }
                      aria-label="Ítem de checklist"
                    />
                    <button
                      type="button"
                      aria-label={`Eliminar ítem ${item.text}`}
                      onClick={() => deleteChecklistItem(item.id)}
                      className="cursor-pointer rounded p-1 text-ebony-500 opacity-0 transition-opacity hover:text-priority-urgent group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <input
                value={itemDrafts[checklist.id] ?? ""}
                onChange={(event) =>
                  setItemDrafts((prev) => ({
                    ...prev,
                    [checklist.id]: event.target.value,
                  }))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") addItem(checklist.id);
                }}
                placeholder="Añadir ítem…"
                className={styles.addInput}
                aria-label={`Nuevo ítem para ${checklist.title}`}
              />
            </div>
          );
        })}

        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            createChecklist(taskId, `Checklist ${taskChecklists.length + 1}`)
          }
        >
          <Plus className="size-4" />
          Añadir checklist
        </Button>
      </div>
    </section>
  );
};

export default ChecklistsSection;
