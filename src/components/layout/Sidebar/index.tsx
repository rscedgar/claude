"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";import {
  ChevronDown,
  Folder as FolderIcon,
  Hash,
  Home,
  ListTodo,
  Plus,
  Star,
} from "lucide-react";
import NavItem from "@/components/layout/NavItem";
import NewListModal from "@/components/layout/NewListModal";
import NewSpaceModal from "@/components/layout/NewSpaceModal";
import Skeleton from "@/components/ui/Skeleton";
import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/lib/cn";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useTaskStore } from "@/stores/task-store";
import { useUiStore } from "@/stores/ui-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { resolveEntityRef } from "@/utils/navigation";
import { countOpenTasksByList } from "@/utils/task-counts";
import { styles } from "./styles";

const FavoriteStar = ({ entityId }: { entityId: string }) => {
  const favorites = useUiStore((state) => state.favorites);
  const toggleFavorite = useUiStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(entityId);

  return (
    <Tooltip label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}>
      <span
        role="button"
        tabIndex={0}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleFavorite(entityId);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(entityId);
          }
        }}
        className={cn(styles.star, isFavorite && styles.starActive)}
      >
        <Star className="size-3.5" />
      </span>
    </Tooltip>
  );
};

const QuickAddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <Tooltip label={label}>
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          onClick();
        }
      }}
      className={styles.quickAdd}
    >
      <Plus className="size-3.5" />
    </span>
  </Tooltip>
);

interface TreeListProps {
  listId: string;
  name: string;
  count?: number;
}

const TreeListRow = ({ listId, name, count }: TreeListProps) => {
  const pathname = usePathname();

  return (
    <NavItem
      href={`/app/list/${listId}`}
      label={name}
      icon={<Hash className="size-4 shrink-0 text-ebony-400" />}
      active={pathname === `/app/list/${listId}`}
      count={count}
      trailing={<FavoriteStar entityId={listId} />}
    />
  );
};

interface SpaceTreeProps {
  spaceId: string;
  collapsedSidebar: boolean;
  openCounts: Record<string, number>;
}

const SpaceTree = ({ spaceId, collapsedSidebar, openCounts }: SpaceTreeProps) => {
  const pathname = usePathname();
  const space = useWorkspaceStore((state) => state.spaces.find((s) => s.id === spaceId));
  const allFolders = useWorkspaceStore((state) => state.folders);
  const allTaskLists = useWorkspaceStore((state) => state.taskLists);

  const folders = useMemo(
    () => allFolders.filter((folder) => folder.spaceId === spaceId),
    [allFolders, spaceId],
  );
  const taskLists = useMemo(
    () => allTaskLists.filter((list) => list.spaceId === spaceId),
    [allTaskLists, spaceId],
  );

  const [expanded, setExpanded] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [listModalFolderId, setListModalFolderId] = useState<string | null>(null);
  const [listModalOpen, setListModalOpen] = useState(false);

  const openListModal = (folderId: string | null) => {
    setListModalFolderId(folderId);
    setListModalOpen(true);
  };

  if (!space) return null;

  const rootLists = taskLists.filter((list) => list.folderId === null);
  const totalOpen = taskLists.reduce((acc, list) => acc + (openCounts[list.id] ?? 0), 0);

  if (collapsedSidebar) {
    return (
      <Tooltip label={space.name}>
        <Link
          href={`/app/space/${space.id}`}
          className="flex size-9 items-center justify-center rounded-lg hover:bg-white/5"
        >
          <span className={styles.spaceDot} style={{ backgroundColor: space.color }} />
        </Link>
      </Tooltip>
    );
  }

  const isActiveSpace = pathname.startsWith(`/app/space/${space.id}`);

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(styles.spaceRow, isActiveSpace && styles.spaceRowActive)}
      >
        <ChevronDown
          className={cn(styles.chevron, !expanded && "-rotate-90")}
          aria-hidden
        />
        <span className={styles.spaceDotSmall} style={{ backgroundColor: space.color }} />
        <span className={styles.label}>{space.name}</span>
        <span className={styles.count}>{totalOpen}</span>
        <span onClick={(event) => event.stopPropagation()}>
          <QuickAddButton
            label={`Nueva lista en ${space.name}`}
            onClick={() => openListModal(null)}
          />
        </span>
        <span onClick={(event) => event.stopPropagation()}>
          <FavoriteStar entityId={space.id} />
        </span>
      </button>

      {expanded && (
        <div className={styles.treeIndent}>
          {folders.map((folder) => {
            const folderLists = taskLists.filter((list) => list.folderId === folder.id);
            const folderExpanded = expandedFolders[folder.id] ?? false;
            return (
              <div key={folder.id}>
                <button
                  type="button"
                  aria-expanded={folderExpanded}
                  onClick={() =>
                    setExpandedFolders((prev) => ({ ...prev, [folder.id]: !folderExpanded }))
                  }
                  className={styles.folderRow}
                >
                  <ChevronDown
                    className={cn(styles.chevron, !folderExpanded && "-rotate-90")}
                    aria-hidden
                  />
                  <FolderIcon className="size-3.5 shrink-0 text-ebony-400" aria-hidden />
                  <span className={styles.label}>{folder.name}</span>
                  <span onClick={(event) => event.stopPropagation()}>
                    <QuickAddButton
                      label={`Nueva lista en ${folder.name}`}
                      onClick={() => openListModal(folder.id)}
                    />
                  </span>
                </button>
                {folderExpanded && (
                  <div className={styles.treeIndent}>
                    {folderLists.map((list) => (
                      <TreeListRow
                        key={list.id}
                        listId={list.id}
                        name={list.name}
                        count={openCounts[list.id]}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {rootLists.map((list) => (
            <TreeListRow
              key={list.id}
              listId={list.id}
              name={list.name}
              count={openCounts[list.id]}
            />
          ))}

          {expanded && (
            <button
              type="button"
              onClick={() => openListModal(null)}
              className={styles.addListRow}
            >
              <Plus className="size-3.5" />
              Nueva lista
            </button>
          )}
        </div>
      )}

      <NewListModal
        open={listModalOpen}
        onClose={() => setListModalOpen(false)}
        spaceId={space.id}
        defaultFolderId={listModalFolderId}
      />
    </div>
  );
};

const SidebarContent = () => {
  const workspace = useWorkspaceStore((state) => state);
  const tasks = useTaskStore((state) => state.tasks);
  const favorites = useUiStore((state) => state.favorites);

  const doneStatusIds = useMemo(
    () =>
      new Set(
        workspace.statuses.filter((status) => status.category === "done").map((status) => status.id),
      ),
    [workspace.statuses],
  );

  const openCounts = useMemo(() => countOpenTasksByList(tasks, doneStatusIds), [tasks, doneStatusIds]);

  const favoriteRefs = useMemo(
    () =>
      favorites
        .map((id) => resolveEntityRef(id, workspace))
        .filter((ref): ref is NonNullable<typeof ref> => ref !== null),
    [favorites, workspace],
  );

  return (
    <>
      <nav className={styles.nav}>
        <NavItem href="/app" label="Inicio" icon={<Home className="size-4 shrink-0" />} />

        {favoriteRefs.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Favoritos</h2>
            {favoriteRefs.map((ref) => (
              <NavItem
                key={`fav-${ref.id}`}
                href={ref.href}
                label={ref.name}
                icon={
                  ref.type === "space" ? (
                    <span className={cn(styles.spaceDotSmall)} style={{ backgroundColor: "#648bcd" }} />
                  ) : ref.type === "folder" ? (
                    <FolderIcon className="size-3.5 shrink-0 text-ebony-400" />
                  ) : (
                    <ListTodo className="size-3.5 shrink-0 text-ebony-400" />
                  )
                }
              />
            ))}
          </section>
        )}

        <section className={styles.section}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Espacios</h2>
          </div>
          {workspace.spaces.map((space) => (
            <SpaceTree
              key={space.id}
              spaceId={space.id}
              openCounts={openCounts}
              collapsedSidebar={false}
            />
          ))}
          {workspace.spaces.length === 0 && (
            <p className={styles.emptySpaces}>Crea tu primer espacio abajo.</p>
          )}
        </section>
      </nav>
    </>
  );
};

const Sidebar = () => {
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const hydrated = useStoresHydrated();
  const [newSpaceOpen, setNewSpaceOpen] = useState(false);

  return (
    <aside data-collapsed={collapsed} className={styles.root}>
      <header className={styles.header}>
        <Link href="/app" className={styles.brand} title="TaskFlow — Inicio">
          <span className={styles.logoDot} />
          {!collapsed && <span className={styles.brandName}>TaskFlow</span>}
        </Link>
      </header>

      {collapsed ? (
        <div className={styles.collapsedBody}>
          <NavItem href="/app" label="Inicio" icon={<Home className="size-4" />} collapsed />
          <CollapsedSpaces />
        </div>
      ) : hydrated ? (
        <SidebarContent />
      ) : (
        <div className="flex flex-col gap-2 px-3 pt-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-5/6" />
          <Skeleton className="h-8 w-full" />
        </div>
      )}

      {collapsed ? (
        <footer className={cn(styles.footer, "flex justify-center")}>
          <Tooltip label="Nuevo espacio">
            <button
              type="button"
              aria-label="Nuevo espacio"
              onClick={() => setNewSpaceOpen(true)}
              className={styles.newSpaceCollapsed}
            >
              <Plus className="size-4" />
            </button>
          </Tooltip>
        </footer>
      ) : (
        <footer className={styles.footer}>
          <button type="button" className={styles.newSpace} onClick={() => setNewSpaceOpen(true)}>
            <Plus className="size-4" />
            Nuevo espacio
          </button>
        </footer>
      )}
      <NewSpaceModal open={newSpaceOpen} onClose={() => setNewSpaceOpen(false)} />
    </aside>
  );
};

const CollapsedSpaces = () => {
  const spaces = useWorkspaceStore((state) => state.spaces);
  const statuses = useWorkspaceStore((state) => state.statuses);
  const tasks = useTaskStore((state) => state.tasks);
  const hydrated = useStoresHydrated();

  const doneStatusIds = new Set(statuses.filter((s) => s.category === "done").map((s) => s.id));
  const openCounts = countOpenTasksByList(tasks, doneStatusIds);
  const listsBySpace = useWorkspaceStore((state) => state.taskLists);

  if (!hydrated) return null;

  return (
    <div className="flex flex-col items-center gap-1">
      {spaces.map((space) => {
        const count = listsBySpace
          .filter((l) => l.spaceId === space.id)
          .reduce((acc, list) => acc + (openCounts[list.id] ?? 0), 0);
        return (
          <Tooltip key={space.id} label={`${space.name}${count > 0 ? ` · ${count}` : ""}`}>
            <Link
              href={`/app/space/${space.id}`}
              className={cn("flex size-9 items-center justify-center rounded-lg hover:bg-white/5")}
            >
              <span className="size-4 rounded-full ring-1 ring-white/20" style={{ backgroundColor: space.color }} />
            </Link>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default Sidebar;
