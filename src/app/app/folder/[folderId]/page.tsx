"use client";

import { useParams } from "next/navigation";
import EntityPagePlaceholder from "@/components/layout/EntityPagePlaceholder";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useWorkspaceStore } from "@/stores/workspace-store";

const FolderPage = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const hydrated = useStoresHydrated();
  const folder = useWorkspaceStore((state) => state.folders.find((f) => f.id === folderId));
  const listCount = useWorkspaceStore((state) =>
    state.taskLists.filter((l) => l.folderId === folderId).length,
  );

  if (!hydrated) {
    return <div className="p-6 text-sm text-ebony-400">Cargando…</div>;
  }

  return (
    <EntityPagePlaceholder
      title={folder?.name ?? "Carpeta no encontrada"}
      description={folder ? `${listCount} listas` : "La carpeta solicitada no existe."}
    />
  );
};

export default FolderPage;
