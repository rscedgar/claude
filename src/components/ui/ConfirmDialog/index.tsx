"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
}: ConfirmDialogProps) => (
  <Modal open={open} onClose={onClose} size="sm">
    <div className="flex flex-col gap-4 p-1">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {description && <p className="text-sm leading-5 text-ebony-300">{description}</p>}
      <div className="flex justify-end gap-2 pt-1">
        <Button variant="ghost" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
