# TaskFlow

Aplicación frontend de gestión de tareas estilo ClickUp: espacios, carpetas, listas, tareas con vistas Lista y Tablero (Kanban), filtros y command palette.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** con tokens dark-first (Congress Blue / Ebony Clay)
- **Zustand** con persistencia en localStorage
- **@dnd-kit** para drag & drop · **lucide-react** iconos · **date-fns** fechas

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint directo (next lint fue eliminado en Next 16)
npm run build    # Build de producción con Turbopack
```

## Estructura

```text
src/
├── app/          # Rutas App Router
├── components/   # UI reutilizable (patrón index.tsx + styles.ts)
├── db/           # Datos semilla mock
├── hooks/        # Hooks compartidos
├── lib/          # Clientes y utilidades (cn, api helpers)
├── providers/    # Providers de contexto
├── sections/     # Composiciones por página
├── stores/       # Stores Zustand con persist
├── types/        # Contratos TypeScript del dominio
└── utils/        # Utilidades puras
```

## Flujo de trabajo

Ramas feature desde `dev` · Conventional Commits (Angular) · PRs hacia `dev`.
