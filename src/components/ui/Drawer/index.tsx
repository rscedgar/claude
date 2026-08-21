"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import IconButton from "../IconButton";
import { styles } from "./styles";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, title, children }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.backdrop} onMouseDown={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        className={styles.panel}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          {title}
          <IconButton label="Cerrar panel" onClick={onClose}>
            <X className="size-4" />
          </IconButton>
        </header>
        <div className={styles.body}>{children}</div>
      </aside>
    </div>,
    document.body,
  );
};

export default Drawer;
