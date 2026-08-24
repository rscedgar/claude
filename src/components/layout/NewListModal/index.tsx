"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { styles } from "./styles";

interface NewListModalProps {
  open: boolean;
  onClose: () => void;
  spaceId: string;
  /** Carpeta preseleccionada; undefined = nivel espacio. */
  defaultFolderId?: string | null;
}

const NewListModal = ({ open, onClose, spaceId, defaultFolderId = null }: NewListModalProps) => {
  const router = useRouter();
  const { showToast } = useToast();
  const createTaskList = useWorkspaceStore((state) => state.createTaskList);
  const allFolders = useWorkspaceStore((state) => state.folders);

  const folders = useMemo(
    () => allFolders.filter((folder) => folder.spaceId === spaceId),
    [allFolders, spaceId],
  );

  const [name, setName] = useState("");
  const [folderId, setFolderId] = useState<string>(defaultFolderId ?? "");

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const listId = createTaskList(trimmed, spaceId, folderId || null);
    showToast({ title: "Lista creada", description: trimmed, variant: "success" });
    onClose();
    setName("");
    router.push(`/app/list/${listId}`);
  };

  return (
    <Modal open={open} onClose={onClose} title="Nueva lista" size="sm">
      <div className={styles.form}>
        <Input
          autoFocus
          label="Nombre de la lista"
          placeholder="Ej. Sprint 24"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleCreate();
          }}
        />
        <div className={styles.folderGroup}>
          <label htmlFor="new-list-folder" className={styles.folderLabel}>
            Carpeta
          </label>
          <select
            id="new-list-folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className={styles.folderSelect}
          >
            <option value="">Sin carpeta (nivel espacio)</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={!name.trim()} onClick={handleCreate}>
            Crear lista
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewListModal;
