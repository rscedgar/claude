export type StatusCategory = "todo" | "active" | "done";

export interface TaskStatus {
  id: string;
  spaceId: string;
  name: string;
  color: string;
  category: StatusCategory;
  order: number;
}

export interface Space {
  id: string;
  name: string;
  color: string;
  statusIds: string[];
}
