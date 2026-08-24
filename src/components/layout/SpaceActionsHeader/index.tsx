"use client";

import { useState } from "react";
import { FolderPlus, ListPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import NewFolderModal from "@/components/layout/NewFolderModal";
import NewListModal from "@/components/layout/NewListModal";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { styles } from "./styles";

interface SpaceActionsHeaderProps {
  spaceId: string;
}

const SpaceActionsHeader = ({ spaceId }: SpaceActionsHeaderProps) => {
  const hydrated = useStoresHydrated();
  const space = useWorkspaceStore((state) => state.spaces.find((s) => s.id === spaceId));

  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);

  if (!hydrated) return <div className={styles.skeleton} />;

  return (
    <header className={styles.root}>
      <div className={styles.titleBlock}>
        <span className={styles.dot} style={{ backgroundColor: space?.color ?? "#648bcd" }} />
        <h1 className={styles.title}>{space?.name ?? "Espacio"}</h1>
      </div>

      <div className={styles.actions}>
        <Button size="sm" variant="secondary" onClick={() => setFolderModalOpen(true)}>
          <FolderPlus className="size-4" />
          Nueva carpeta
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setListModalOpen(true)}>
          <ListPlus className="size-4" />
          Nueva lista
        </Button>
      </div>

      <NewFolderModal open={folderModalOpen} onClose={() => setFolderModalOpen(false)} spaceId={spaceId} />
      <NewListModal open={listModalOpen} onClose={() => setListModalOpen(false)} spaceId={spaceId} />
    </header>
  );
};

export default SpaceActionsHeader;
