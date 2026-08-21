import type { PriorityLevel } from "@/types";

export interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
}

export interface PriorityBadgeStyles {
  root: string;
  icon: string;
}
