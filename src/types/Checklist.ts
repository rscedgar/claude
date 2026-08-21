export interface Checklist {
  id: string;
  taskId: string;
  title: string;
}

export interface ChecklistItem {
  id: string;
  checklistId: string;
  text: string;
  resolved: boolean;
}
