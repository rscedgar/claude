"use client";

import { Flag } from "lucide-react";
import { cn } from "@/lib/cn";
import { priorityMeta } from "./consts";
import { styles } from "./styles";
import type { PriorityBadgeProps, PriorityBadgeStyles } from "./types";

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  if (priority === "none") return null;
  const meta = priorityMeta[priority];

  return (
    <span className={cn(styles.root, meta.className, className)}>
      <Flag className={styles.icon} />
      {meta.label}
    </span>
  );
};

export default PriorityBadge;
export type { PriorityBadgeStyles };
