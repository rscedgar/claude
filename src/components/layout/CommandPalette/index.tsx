"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Folder,
  Hash,
  Home,
  KanbanSquare,
  LayoutList,
  Search,
  SquareCheckBig,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useUiStore } from "@/stores/ui-store";
import { useTaskStore } from "@/stores/task-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { styles } from "./styles";

interface CommandItem {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
}

const maxResultsPerGroup = 6;

const CommandPaletteContent = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const tasks = useTaskStore((state) => state.tasks);
  const workspace = useWorkspaceStore((state) => state);
  const setActiveView = useUiStore((state) => state.setActiveView);
  const openTask = useUiStore((state) => state.openTask);

  const items = useMemo<CommandItem[]>(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matches = (label: string) =>
      normalizedQuery === "" || label.toLowerCase().includes(normalizedQuery);
    const results: CommandItem[] = [];

    // Acciones
    if (matches("Cambiar a vista Tablero")) {
      results.push({
        id: "action-board",
        group: "Acciones",
        label: "Cambiar a vista Tablero",
        icon: <KanbanSquare className={styles.itemIcon} />,
        run: () => setActiveView("board"),
      });
    }
    if (matches("Cambiar a vista Lista")) {
      results.push({
        id: "action-list",
        group: "Acciones",
        label: "Cambiar a vista Lista",
        icon: <LayoutList className={styles.itemIcon} />,
        run: () => setActiveView("list"),
      });
    }
    if (matches("Ir al inicio")) {
      results.push({
        id: "action-home",
        group: "Acciones",
        label: "Ir al inicio",
        icon: <Home className={styles.itemIcon} />,
        run: () => router.push("/app"),
      });
    }

    // Navegación: espacios, carpetas, listas
    for (const space of workspace.spaces) {
      if (matches(space.name)) {
        results.push({
          id: `space-${space.id}`,
          group: "Navegación",
          label: space.name,
          hint: "Espacio",
          icon: <span className={styles.spaceDot} style={{ backgroundColor: space.color }} />,
          run: () => router.push(`/app/space/${space.id}`),
        });
      }
    }
    for (const folder of workspace.folders) {
      if (matches(folder.name)) {
        results.push({
          id: `folder-${folder.id}`,
          group: "Navegación",
          label: folder.name,
          hint: "Carpeta",
          icon: <Folder className={styles.itemIcon} />,
          run: () => router.push(`/app/folder/${folder.id}`),
        });
      }
    }
    for (const list of workspace.taskLists) {
      if (matches(list.name)) {
        results.push({
          id: `list-${list.id}`,
          group: "Navegación",
          label: list.name,
          hint: "Lista",
          icon: <Hash className={styles.itemIcon} />,
          run: () => router.push(`/app/list/${list.id}`),
        });
      }
    }

    // Tareas (sin subtareas para reducir ruido)
    for (const task of tasks) {
      if (task.parentTaskId) continue;
      if (matches(task.name)) {
        results.push({
          id: `task-${task.id}`,
          group: "Tareas",
          label: task.name,
          hint: "Abrir detalle",
          icon: <SquareCheckBig className={styles.itemIcon} />,
          run: () => openTask(task.id),
        });
      }
    }

    return results.slice(0, maxResultsPerGroup * 3 + 4);
  }, [query, tasks, workspace, router, setActiveView, openTask]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of items) {
      const bucket = map.get(item.group) ?? [];
      bucket.push(item);
      map.set(item.group, bucket.slice(0, maxResultsPerGroup));
    }
    return [...map.entries()];
  }, [items]);

  const flatResults = useMemo(() => grouped.flatMap(([, bucket]) => bucket), [grouped]);

  const execute = (item: CommandItem | undefined) => {
    if (!item) return;
    onClose();
    item.run();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        execute(flatResults[activeIndex]);
        break;
    }
  };

  let renderIndex = -1;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label="Buscador rápido" className={styles.panel}>
        <div className={styles.searchRow}>
          <Search className={styles.searchIcon} aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar tareas, listas, espacios o acciones…"
            className={styles.input}
            aria-label="Buscar"
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>

        <div className={styles.results} role="listbox">
          {flatResults.length === 0 ? (
            <p className={styles.empty}>
              Sin resultados para “{query.trim()}”. Prueba con otro término.
            </p>
          ) : (
            grouped.map(([group, bucket]) => (
              <div key={group}>
                <p className={styles.groupTitle}>{group}</p>
                {bucket.map((item) => {
                  renderIndex += 1;
                  const isActive = renderIndex === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(flatResults.indexOf(item))}
                      onClick={() => execute(item)}
                      className={cn(styles.item, isActive && styles.itemActive)}
                    >
                      {item.icon}
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.hint && <span className={styles.itemHint}>{item.hint}</span>}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <footer className={styles.footer}>
          <span>
            <kbd className={styles.kbd}>↑</kbd> <kbd className={styles.kbd}>↓</kbd> navegar
          </span>
          <span>
            <kbd className={styles.kbd}>↵</kbd> abrir
          </span>
        </footer>
      </div>
    </div>
  );
};

const CommandPalette = () => {
  const commandOpen = useUiStore((state) => state.commandOpen);
  const setCommandOpen = useUiStore((state) => state.setCommandOpen);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(!useUiStore.getState().commandOpen);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setCommandOpen]);

  // Montaje condicional: resetea query/índice en cada apertura
  return commandOpen ? <CommandPaletteContent onClose={() => setCommandOpen(false)} /> : null;
};

export default CommandPalette;
