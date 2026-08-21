"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import { useToast } from "@/components/ui/Toast";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { spaceColorPresets } from "./consts";
import { styles } from "./styles";

interface NewSpaceModalProps {
  open: boolean;
  onClose: () => void;
}

const NewSpaceModal = ({ open, onClose }: NewSpaceModalProps) => {
  const router = useRouter();
  const { showToast } = useToast();
  const createSpace = useWorkspaceStore((state) => state.createSpace);

  const [name, setName] = useState("");
  const [color, setColor] = useState<string>(spaceColorPresets[0]);

  const handleCreate = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const spaceId = createSpace(trimmedName, color);
    showToast({ title: "Espacio creado", description: trimmedName, variant: "success" });
    onClose();
    setName("");
    setColor(spaceColorPresets[0]);
    router.push(`/app/space/${spaceId}`);
  };

  return (
    <Modal open={open} onClose={onClose} title="Nuevo espacio" size="sm">
      <div className={styles.form}>
        <Input
          autoFocus
          label="Nombre del espacio"
          placeholder="Ej. Diseño de Producto"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleCreate();
          }}
        />
        <fieldset className={styles.colorsFieldset}>
          <legend className={styles.legend}>Color</legend>
          <div className={styles.colors}>
            {spaceColorPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                aria-label={`Color ${preset}`}
                aria-pressed={color === preset}
                onClick={() => setColor(preset)}
                className={cn(styles.colorSwatch, color === preset && styles.colorSelected)}
                style={{ backgroundColor: preset }}
              />
            ))}
          </div>
        </fieldset>
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={!name.trim()} onClick={handleCreate}>
            Crear espacio
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewSpaceModal;
