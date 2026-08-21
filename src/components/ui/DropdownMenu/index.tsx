"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useClickOutside } from "@/hooks/useClickOutside";
import { styles } from "./styles";

interface DropdownMenuItem {
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  onSelect: () => void;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  /** Items de menú; al hacer click se cierra automáticamente. */
  items?: DropdownMenuItem[];
  /** Contenido libre del panel; permanece abierto hasta click fuera. */
  children?: ReactNode;
  align?: "left" | "right";
  panelClassName?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  children,
  align = "right",
  panelClassName,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useClickOutside(rootRef, () => setOpen(false), open);

  return (
    <div ref={rootRef} className={styles.root}>
      <span
        role="button"
        tabIndex={0}
        className="cursor-pointer rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-congress-500"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        {trigger}
      </span>
      {open && (
        <div
          role="menu"
          className={cn(
            styles.menu,
            align === "right" ? styles.alignRight : styles.alignLeft,
            panelClassName,
          )}
        >
          {children ??
            items?.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={cn(styles.item, item.danger && styles.itemDanger)}
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
