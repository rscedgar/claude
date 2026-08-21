import type { Folder, Space, TaskList } from "@/types";

export type EntityType = "space" | "folder" | "list";

export interface EntityRef {
  id: string;
  href: string;
  name: string;
  type: EntityType;
}

interface EntityLookup {
  spaces: Space[];
  folders: Folder[];
  taskLists: TaskList[];
}

export const resolveEntityRef = (
  entityId: string,
  { spaces, folders, taskLists }: EntityLookup,
): EntityRef | null => {
  const space = spaces.find((s) => s.id === entityId);
  if (space) {
    return { id: space.id, href: `/app/space/${space.id}`, name: space.name, type: "space" };
  }
  const folder = folders.find((f) => f.id === entityId);
  if (folder) {
    return { id: folder.id, href: `/app/folder/${folder.id}`, name: folder.name, type: "folder" };
  }
  const list = taskLists.find((l) => l.id === entityId);
  if (list) {
    return { id: list.id, href: `/app/list/${list.id}`, name: list.name, type: "list" };
  }
  return null;
};
