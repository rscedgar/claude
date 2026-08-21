"use client";

import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import IconButton from "../IconButton";
import { styles } from "./styles";

interface ModalProps extends Pick<ComponentProps<"div">, "className"> {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, size = "md", className, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (!containerRef.current?.contains(event.target as Node)) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(styles.container, styles[size], "flex", className)}
      >
        {title && (
          <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <IconButton label="Cerrar" onClick={onClose}>
              <X className="size-4" />
            </IconButton>
          </header>
        )}
        <div className={cn(styles.body, !title && "p-0")}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
