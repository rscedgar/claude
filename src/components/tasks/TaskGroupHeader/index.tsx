"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import Avatar from "@/components/ui/Avatar";
import type { User } from "@/types";
import { styles } from "./styles";

interface TaskGroupHeaderProps {
  label: string;
  count: number;
  color?: string;
  assignee?: User | null;
  collapsed: boolean;
  onToggle: () => void;
}

const TaskGroupHeader = ({
  label,
  count,
  color,
  assignee,
  collapsed,
  onToggle,
}: TaskGroupHeaderProps) => (
  <button
    type="button"
    aria-expanded={!collapsed}
    onClick={onToggle}
    className={styles.root}
  >
    <ChevronDown
      aria-hidden
      className={cn(styles.chevron, collapsed && "-rotate-90")}
    />
    {color && <span className={styles.dot} style={{ backgroundColor: color }} />}
    {assignee && (
      <Avatar user={assignee} size="xs" />
    )}
    <span className={styles.label}>{label}</span>
    <span className={styles.count}>{count}</span>
  </button>
);

export default TaskGroupHeader;
