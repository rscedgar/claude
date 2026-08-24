import type { Task } from "@/types";

export interface TaskCardProps {
  task: Task;
  dragging?: boolean;
  overlay?: boolean;
}

export interface TaskCardStyles {
  root: string;
  dragging: string;
  overlay: string;
  topRow: string;
  dueBadge: string;
  name: string;
  bottomRow: string;
  tagsRow: string;
}
