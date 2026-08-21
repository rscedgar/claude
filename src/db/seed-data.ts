import type {
  ActivityLog,
  Checklist,
  ChecklistItem,
  Comment,
  Folder,
  Space,
  Tag,
  Task,
  TaskList,
  TaskStatus,
  User,
} from "@/types";

const now = new Date();

const iso = (dayOffset: number, hour = 12): string => {
  const date = new Date(now);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

const users: User[] = [
  { id: "user-1", name: "Edgar Ramírez", email: "edgar@taskflow.dev", initials: "ER", avatarColor: "#1e7dd9" },
  { id: "user-2", name: "María López", email: "maria@taskflow.dev", initials: "ML", avatarColor: "#b98af7" },
  { id: "user-3", name: "Carlos Ruiz", email: "carlos@taskflow.dev", initials: "CR", avatarColor: "#f97316" },
  { id: "user-4", name: "Ana Torres", email: "ana@taskflow.dev", initials: "AT", avatarColor: "#4ade80" },
];

const currentUserId = "user-1";

const spaces: Space[] = [
  { id: "space-1", name: "Desarrollo de Producto", color: "#1e7dd9", statusIds: ["status-1-1", "status-1-2", "status-1-3", "status-1-4"] },
  { id: "space-2", name: "Marketing y Contenido", color: "#b98af7", statusIds: ["status-2-1", "status-2-2", "status-2-3"] },
];

const statuses: TaskStatus[] = [
  { id: "status-1-1", spaceId: "space-1", name: "Pendiente", color: "#8b93a7", category: "todo", order: 0 },
  { id: "status-1-2", spaceId: "space-1", name: "En Progreso", color: "#469aea", category: "active", order: 1 },
  { id: "status-1-3", spaceId: "space-1", name: "En Revisión", color: "#b98af7", category: "active", order: 2 },
  { id: "status-1-4", spaceId: "space-1", name: "Completado", color: "#4ade80", category: "done", order: 3 },
  { id: "status-2-1", spaceId: "space-2", name: "Por Hacer", color: "#8b93a7", category: "todo", order: 0 },
  { id: "status-2-2", spaceId: "space-2", name: "Haciendo", color: "#469aea", category: "active", order: 1 },
  { id: "status-2-3", spaceId: "space-2", name: "Hecho", color: "#4ade80", category: "done", order: 2 },
];

const folders: Folder[] = [
  { id: "folder-1", spaceId: "space-1", name: "Sprint Actual", hidden: false },
  { id: "folder-2", spaceId: "space-1", name: "Backlog", hidden: false },
  { id: "folder-3", spaceId: "space-2", name: "Campaña de Lanzamiento", hidden: false },
];

const taskLists: TaskList[] = [
  { id: "list-1", spaceId: "space-1", folderId: "folder-1", name: "Módulo de Autenticación" },
  { id: "list-2", spaceId: "space-1", folderId: "folder-1", name: "Dashboard UI" },
  { id: "list-3", spaceId: "space-1", folderId: "folder-2", name: "Ideas Futuras" },
  { id: "list-4", spaceId: "space-1", folderId: null, name: "Bugs Críticos" },
  { id: "list-5", spaceId: "space-2", folderId: "folder-3", name: "Blog" },
  { id: "list-6", spaceId: "space-2", folderId: "folder-3", name: "Redes Sociales" },
];

const tags: Tag[] = [
  { id: "tag-1", name: "frontend", color: "#469aea" },
  { id: "tag-2", name: "backend", color: "#f97316" },
  { id: "tag-3", name: "diseño", color: "#b98af7" },
  { id: "tag-4", name: "urgente", color: "#ef4444" },
  { id: "tag-5", name: "documentación", color: "#4ade80" },
  { id: "tag-6", name: "qa", color: "#eab308" },
];

interface SeedTaskInput {
  id: string;
  listId: string;
  statusId: string;
  priority: Task["priority"];
  assigneeIds: string[];
  tagIds?: string[];
  name: string;
  description?: string;
  dueOffset?: number | null;
  startOffset?: number | null;
  createdOffset: number;
}

const taskInputs: SeedTaskInput[] = [
  { id: "task-001", listId: "list-1", statusId: "status-1-2", priority: "urgent", assigneeIds: ["user-1"], tagIds: ["tag-2", "tag-4"], name: "Implementar login con OAuth 2.0", description: "Soportar Google y GitHub como proveedores OAuth. Incluir refresh token y revocación de sesiones.", dueOffset: 2, startOffset: -3, createdOffset: -10 },
  { id: "task-002", listId: "list-1", statusId: "status-1-1", priority: "high", assigneeIds: ["user-2"], tagIds: ["tag-2"], name: "Modelo de datos de usuarios y sesiones", description: "Tabla users, sessions y refresh_tokens con índices adecuados.", dueOffset: 5, startOffset: 1, createdOffset: -8 },
  { id: "task-003", listId: "list-1", statusId: "status-1-3", priority: "normal", assigneeIds: ["user-3"], tagIds: ["tag-1"], name: "Pantalla de registro con validación", dueOffset: 1, startOffset: -5, createdOffset: -12 },
  { id: "task-004", listId: "list-1", statusId: "status-1-4", priority: "normal", assigneeIds: ["user-1"], tagIds: ["tag-5"], name: "Documentar flujo de autenticación", description: "Diagrama de secuencia y endpoints en el wiki.", dueOffset: -2, createdOffset: -15 },
  { id: "task-005", listId: "list-1", statusId: "status-1-1", priority: "low", assigneeIds: [], tagIds: ["tag-2"], name: "Rate limiting en endpoints de auth", dueOffset: 14, createdOffset: -4 },
  { id: "task-006", listId: "list-1", statusId: "status-1-2", priority: "high", assigneeIds: ["user-2", "user-4"], tagIds: ["tag-6"], name: "Tests E2E del flujo completo de login", dueOffset: 4, createdOffset: -6 },

  { id: "task-007", listId: "list-2", statusId: "status-1-1", priority: "high", assigneeIds: ["user-4"], tagIds: ["tag-1", "tag-3"], name: "Sidebar colapsable con jerarquía de espacios", description: "Espacios → carpetas → listas, estado persistido.", dueOffset: 3, startOffset: 0, createdOffset: -7 },
  { id: "task-008", listId: "list-2", statusId: "status-1-2", priority: "urgent", assigneeIds: ["user-1"], tagIds: ["tag-1", "tag-4"], name: "Vista de lista con agrupación dinámica", dueOffset: 0, startOffset: -2, createdOffset: -9 },
  { id: "task-009", listId: "list-2", statusId: "status-1-1", priority: "normal", assigneeIds: ["user-3"], tagIds: ["tag-1"], name: "Tablero Kanban con drag & drop", dueOffset: 7, createdOffset: -7 },
  { id: "task-010", listId: "list-2", statusId: "status-1-3", priority: "normal", assigneeIds: ["user-2"], tagIds: ["tag-3"], name: "Design system: componentes base dark", dueOffset: -1, createdOffset: -13 },
  { id: "task-011", listId: "list-2", statusId: "status-1-4", priority: "low", assigneeIds: ["user-4"], tagIds: ["tag-3"], name: "Paleta de colores y tokens CSS", dueOffset: -4, createdOffset: -16 },
  { id: "task-012", listId: "list-2", statusId: "status-1-1", priority: "none", assigneeIds: [], name: "Command palette con Ctrl+K", dueOffset: 10, createdOffset: -3 },

  { id: "task-013", listId: "list-3", statusId: "status-1-1", priority: "low", assigneeIds: [], name: "Integración con calendario externo", description: "Sincronizar fechas de vencimiento con Google Calendar.", createdOffset: -20 },
  { id: "task-014", listId: "list-3", statusId: "status-1-1", priority: "none", assigneeIds: [], tagIds: ["tag-1"], name: "Modo claro alternativo", createdOffset: -18 },
  { id: "task-015", listId: "list-3", statusId: "status-1-1", priority: "low", assigneeIds: ["user-3"], name: "Automatizaciones simples (si X entonces Y)", createdOffset: -11 },

  { id: "task-016", listId: "list-4", statusId: "status-1-2", priority: "urgent", assigneeIds: ["user-1", "user-2"], tagIds: ["tag-4", "tag-1"], name: "Fuga de memoria al cambiar de vista repetidamente", description: "Los event listeners de dnd-kit no se limpian al desmontar columnas.", dueOffset: 0, startOffset: -1, createdOffset: -2 },
  { id: "task-017", listId: "list-4", statusId: "status-1-1", priority: "high", assigneeIds: ["user-3"], tagIds: ["tag-2"], name: "Error 500 al guardar tarea sin descripción", dueOffset: 1, createdOffset: -1 },
  { id: "task-018", listId: "list-4", statusId: "status-1-4", priority: "normal", assigneeIds: ["user-4"], tagIds: ["tag-6"], name: "Toasts duplicados en acciones rápidas", dueOffset: -3, createdOffset: -8 },
  { id: "task-019", listId: "list-4", statusId: "status-1-1", priority: "high", assigneeIds: [], tagIds: ["tag-1"], name: "Filtros se pierden al recargar la página", dueOffset: 2, createdOffset: -1 },

  { id: "task-020", listId: "list-5", statusId: "status-2-1", priority: "normal", assigneeIds: ["user-2"], tagIds: ["tag-5"], name: "Artículo: 10 consejos de productividad con tableros", description: "Mínimo 1200 palabras, SEO optimizado, imágenes propias.", dueOffset: 6, createdOffset: -5 },
  { id: "task-021", listId: "list-5", statusId: "status-2-2", priority: "high", assigneeIds: ["user-2", "user-4"], name: "Guía de inicio rápido del producto", dueOffset: 1, createdOffset: -6 },
  { id: "task-022", listId: "list-5", statusId: "status-2-3", priority: "low", assigneeIds: ["user-3"], tagIds: ["tag-5"], name: "Actualizar changelog de versión 1.2", dueOffset: -5, createdOffset: -10 },
  { id: "task-023", listId: "list-5", statusId: "status-2-1", priority: "none", assigneeIds: [], name: "Traducir documentación al inglés", createdOffset: -4 },

  { id: "task-024", listId: "list-6", statusId: "status-2-2", priority: "high", assigneeIds: ["user-4"], tagIds: ["tag-3"], name: "Calendario editorial de septiembre", dueOffset: 2, createdOffset: -3 },
  { id: "task-025", listId: "list-6", statusId: "status-2-1", priority: "normal", assigneeIds: ["user-2"], name: "Diseñar plantillas de posts para LinkedIn", dueOffset: 5, createdOffset: -2 },
  { id: "task-026", listId: "list-6", statusId: "status-2-3", priority: "normal", assigneeIds: ["user-4"], name: "Hilo de Twitter sobre nuevas funciones", dueOffset: -1, createdOffset: -7 },
  { id: "task-027", listId: "list-6", statusId: "status-2-1", priority: "low", assigneeIds: [], name: "Reel demostrativo de la vista Kanban", dueOffset: 9, createdOffset: -2 },
  { id: "task-028", listId: "list-6", statusId: "status-2-2", priority: "urgent", assigneeIds: ["user-2", "user-3"], tagIds: ["tag-4"], name: "Respuesta a crisis en comentarios (bug viral)", description: "El video del lanzamiento muestra un bug de la versión anterior.", dueOffset: 0, createdOffset: -1 },

  { id: "task-029", listId: "list-2", statusId: "status-1-2", priority: "normal", assigneeIds: ["user-3"], tagIds: ["tag-1"], name: "Panel de detalle de tarea", description: "Drawer lateral con subtareas, checklist y comentarios.", dueOffset: 4, startOffset: 0, createdOffset: -5 },
  { id: "task-030", listId: "list-1", statusId: "status-1-1", priority: "normal", assigneeIds: ["user-1"], tagIds: ["tag-2"], name: "Migraciones iniciales de base de datos", dueOffset: 3, createdOffset: -5 },
];

interface SeedSubtaskInput {
  id: string;
  parentId: string;
  name: string;
  statusId: string;
  assigneeIds: string[];
  order: number;
}

const subtaskInputs: SeedSubtaskInput[] = [
  { id: "task-001-s1", parentId: "task-001", name: "Configurar app en Google Cloud Console", statusId: "status-1-4", assigneeIds: ["user-1"], order: 1 },
  { id: "task-001-s2", parentId: "task-001", name: "Endpoint /auth/google/callback", statusId: "status-1-2", assigneeIds: ["user-1"], order: 2 },
  { id: "task-001-s3", parentId: "task-001", name: "Manejo de refresh tokens", statusId: "status-1-1", assigneeIds: ["user-2"], order: 3 },
  { id: "task-008-s1", parentId: "task-008", name: "Componente TaskTable agrupable", statusId: "status-1-3", assigneeIds: ["user-1"], order: 1 },
  { id: "task-008-s2", parentId: "task-008", name: "Inline editing de filas", statusId: "status-1-1", assigneeIds: ["user-3"], order: 2 },
  { id: "task-021-s1", parentId: "task-021", name: "Capturas de pantalla actualizadas", statusId: "status-2-1", assigneeIds: ["user-4"], order: 1 },
];

const buildTask = (input: SeedTaskInput): Task => ({
  id: input.id,
  listId: input.listId,
  parentTaskId: null,
  name: input.name,
  description: input.description ?? "",
  statusId: input.statusId,
  priority: input.priority,
  assigneeIds: input.assigneeIds,
  tagIds: input.tagIds ?? [],
  startDate: input.startOffset == null ? null : iso(input.startOffset),
  dueDate: input.dueOffset == null ? null : iso(input.dueOffset, 17),
  order: Number(input.id.slice(-3)),
  createdAt: iso(input.createdOffset),
  updatedAt: iso(Math.min(input.createdOffset + 2, 0)),
});

const tasks: Task[] = [
  ...taskInputs.map(buildTask),
  ...subtaskInputs.map((input): Task => {
    const parent = taskInputs.find((t) => t.id === input.parentId);
    const built = buildTask({
      id: input.id,
      listId: parent?.listId ?? "list-1",
      statusId: input.statusId,
      priority: "none",
      assigneeIds: input.assigneeIds,
      name: input.name,
      createdOffset: -3,
    });
    built.parentTaskId = input.parentId;
    built.order = input.order;
    return built;
  }),
];

const checklists: Checklist[] = [
  { id: "checklist-1", taskId: "task-001", title: "Checklist de despliegue" },
  { id: "checklist-2", taskId: "task-007", title: "Criterios de aceptación" },
];

const checklistItems: ChecklistItem[] = [
  { id: "cli-1", checklistId: "checklist-1", text: "Variables de entorno configuradas", resolved: true },
  { id: "cli-2", checklistId: "checklist-1", text: "Secrets rotados en producción", resolved: false },
  { id: "cli-3", checklistId: "checklist-1", text: "Monitoreo de errores activo", resolved: false },
  { id: "cli-4", checklistId: "checklist-2", text: "Colapsable con animación suave", resolved: true },
  { id: "cli-5", checklistId: "checklist-2", text: "Contador de tareas por lista", resolved: true },
  { id: "cli-6", checklistId: "checklist-2", text: "Persistir estado entre sesiones", resolved: false },
];

const comments: Comment[] = [
  { id: "comment-1", taskId: "task-001", authorId: "user-2", content: "Ya registré la app en Google Cloud, te comparto las credenciales por correo.", createdAt: iso(-2, 10) },
  { id: "comment-2", taskId: "task-001", authorId: "user-1", content: "Recibidas. Mañana empiezo con el callback endpoint.", createdAt: iso(-2, 15) },
  { id: "comment-3", taskId: "task-016", authorId: "user-3", content: "Logré reproducirlo: ocurre tras 10 cambios de vista seguidos. Subí los pasos al issue.", createdAt: iso(-1, 9) },
  { id: "comment-4", taskId: "task-008", authorId: "user-4", content: "Recordar mantener el contador visible por grupo al colapsar.", createdAt: iso(-3, 11) },
  { id: "comment-5", taskId: "task-028", authorId: "user-2", content: "Preparé el borrador de disculpa pública, lo revisan antes de las 18h.", createdAt: iso(0, 8) },
];

const activities: ActivityLog[] = [
  { id: "act-1", taskId: "task-001", userId: "user-1", action: "created", field: "task", toValue: "Implementar login con OAuth 2.0", createdAt: iso(-10) },
  { id: "act-2", taskId: "task-001", userId: "user-1", action: "moved", field: "status", fromValue: "Pendiente", toValue: "En Progreso", createdAt: iso(-3) },
  { id: "act-3", taskId: "task-001", userId: "user-2", action: "commented", createdAt: iso(-2, 10) },
  { id: "act-4", taskId: "task-016", userId: "user-3", action: "created", field: "task", toValue: "Fuga de memoria al cambiar de vista", createdAt: iso(-2) },
  { id: "act-5", taskId: "task-018", userId: "user-4", action: "completed", createdAt: iso(-3) },
  { id: "act-6", taskId: "task-008", userId: "user-1", action: "moved", field: "priority", fromValue: "high", toValue: "urgent", createdAt: iso(-1) },
];

export interface SeedData {
  users: User[];
  currentUserId: string;
  spaces: Space[];
  statuses: TaskStatus[];
  folders: Folder[];
  taskLists: TaskList[];
  tags: Tag[];
  tasks: Task[];
  checklists: Checklist[];
  checklistItems: ChecklistItem[];
  comments: Comment[];
  activities: ActivityLog[];
}

export const seedData: SeedData = {
  users,
  currentUserId,
  spaces,
  statuses,
  folders,
  taskLists,
  tags,
  tasks,
  checklists,
  checklistItems,
  comments,
  activities,
};
