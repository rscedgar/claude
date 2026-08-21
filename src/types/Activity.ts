export type ActivityAction =
  | "created"
  | "updated"
  | "moved"
  | "completed"
  | "reopened"
  | "commented"
  | "deleted";

export interface ActivityLog {
  id: string;
  taskId: string;
  userId: string;
  action: ActivityAction;
  field?: string;
  fromValue?: string;
  toValue?: string;
  createdAt: string;
}
