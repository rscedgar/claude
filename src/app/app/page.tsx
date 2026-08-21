import Link from "next/link";
import { CalendarClock, ListTodo, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

const HomePage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold text-white">Inicio</h1>
      <p className="max-w-md text-center text-sm text-ebony-300">
        El dashboard con tus tareas asignadas, vencidas y recientes llegará en
        el issue #9. Por ahora navega a un espacio o lista desde la barra
        lateral.
      </p>
      <EmptyState
        icon={<ListTodo className="size-6" />}
        title="Dashboard en construcción"
        description="Mis tareas, vencimientos y estadísticas se mostrarán aquí."
        action={
          <Link href="/app">
            <Button size="sm" variant="secondary">
              <CalendarClock className="size-3.5" />
              Próximamente
            </Button>
          </Link>
        }
      />
      <p className="text-xs text-ebony-500">
        <Plus className="mr-1 inline size-3" />
        Usa “Nuevo espacio” en la barra lateral para empezar.
      </p>
    </div>
  );
};

export default HomePage;
