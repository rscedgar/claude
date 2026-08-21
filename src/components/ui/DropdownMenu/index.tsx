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
  items: DropdownMenuItem[];
  align?: "left" | "right";
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items, align = "right" }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useClickOutside(rootRef, () => setOpen(false), open);

  return (
    <div ref={rootRef} className={styles.root}>
      <span
        role="button"
        tabIndex={0}
        className="cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-congress-500 rounded-lg"
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
        <div role="menu" className={cn(styles.menu, align === "right" ? styles.alignRight : styles.alignLeft)}>
          {items.map((item) => (
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
