"use client";

import { useParams } from "next/navigation";
import EntityPagePlaceholder from "@/components/layout/EntityPagePlaceholder";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useWorkspaceStore } from "@/stores/workspace-store";

const SpacePage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const hydrated = useStoresHydrated();
  const space = useWorkspaceStore((state) => state.spaces.find((s) => s.id === spaceId));
  const listCount = useWorkspaceStore((state) =>
    state.taskLists.filter((l) => l.spaceId === spaceId).length,
  );

  if (!hydrated) {
    return <div className="p-6 text-sm text-ebony-400">Cargando…</div>;
  }

  return (
    <EntityPagePlaceholder
      title={space?.name ?? "Espacio no encontrado"}
      description={space ? `${listCount} listas` : "El espacio solicitado no existe."}
    />
  );
};

export default SpacePage;
