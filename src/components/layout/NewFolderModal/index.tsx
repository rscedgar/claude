"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { styles } from "./styles";

interface NewFolderModalProps {
  open: boolean;
  onClose: () => void;
  spaceId: string;
}

const NewFolderModal = ({ open, onClose, spaceId }: NewFolderModalProps) => {
  const { showToast } = useToast();
  const createFolder = useWorkspaceStore((state) => state.createFolder);

  const [name, setName] = useState("");

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    createFolder(trimmed, spaceId);
    showToast({ title: "Carpeta creada", description: trimmed, variant: "success" });
    onClose();
    setName("");
  };

  return (
    <Modal open={open} onClose={onClose} title="Nueva carpeta" size="sm">
      <div className={styles.form}>
        <Input
          autoFocus
          label="Nombre de la carpeta"
          placeholder="Ej. Backlog"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleCreate();
          }}
        />
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={!name.trim()} onClick={handleCreate}>
            Crear carpeta
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewFolderModal;
