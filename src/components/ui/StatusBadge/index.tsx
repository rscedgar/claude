"use client";

import { cn } from "@/lib/cn";
import { styles } from "./styles";

interface StatusBadgeProps {
  name: string;
  color: string;
  category?: "todo" | "active" | "done";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ name, color, category, className }) => (
  <span className={cn(styles.root, className)}>
    <span
      aria-hidden
      className={cn(styles.dot, category === "done" && styles.dotPulse)}
      style={{ backgroundColor: color }}
    />
    {name}
  </span>
);

export default StatusBadge;
