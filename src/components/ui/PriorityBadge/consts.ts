import type { PriorityLevel } from "@/types";

export interface PriorityMeta {
  label: string;
  className: string;
}

export const priorityMeta: Record<Exclude<PriorityLevel, "none">, PriorityMeta> = {
  urgent: { label: "Urgente", className: "text-priority-urgent" },
  high: { label: "Alta", className: "text-priority-high" },
  normal: { label: "Normal", className: "text-congress-400" },
  low: { label: "Baja", className: "text-ebony-300" },
};
