"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TaskDetailDrawer from "@/components/tasks/TaskDetailDrawer";
import { cn } from "@/lib/cn";
import { useUiStore } from "@/stores/ui-store";
import { styles } from "./styles";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.root}>
      {/* Backdrop móvil */}
      {mobileOpen && (
        <div
          aria-hidden
          className={styles.mobileBackdrop}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar: estático en desktop, off-canvas en móvil */}
      <div data-open={mobileOpen} className={styles.sidebarSlot}>
        <Sidebar />
      </div>

      <div className={styles.mainColumn}>
        <Topbar
          onToggleMobileSidebar={() => {
            setMobileOpen((prev) => !prev);
          }}
        />
        {/* Botón colapsar en desktop (esquina del contenido) */}
        <main className={cn(styles.content, "group/shell relative")}>
          <button
            type="button"
            aria-label={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
            onClick={toggleSidebar}
            className={styles.collapseToggle}
          >
            {collapsed ? "»" : "«"}
          </button>
          {children}
        </main>
      </div>

      <TaskDetailDrawer />
    </div>
  );
};

export default AppShell;
