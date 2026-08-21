export type PriorityLevel = "urgent" | "high" | "normal" | "low" | "none";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  listId: string;
  parentTaskId: string | null;
  name: string;
  description: string;
  statusId: string;
  priority: PriorityLevel;
  assigneeIds: string[];
  tagIds: string[];
  startDate: string | null;
  dueDate: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}
