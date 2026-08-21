"use client";

import { Menu, Search } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Avatar from "@/components/ui/Avatar";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { useCurrentUser } from "@/stores/user-store";
import { useUiStore } from "@/stores/ui-store";
import { styles } from "./styles";

interface TopbarProps {
  onToggleMobileSidebar: () => void;
}

const Topbar = ({ onToggleMobileSidebar }: TopbarProps) => {
  const currentUser = useCurrentUser();
  const setCommandOpen = useUiStore((state) => state.setCommandOpen);

  return (
    <header className={styles.root}>
      <div className={styles.left}>
        <button
          type="button"
          aria-label="Abrir menú de navegación"
          onClick={onToggleMobileSidebar}
          className={styles.hamburger}
        >
          <Menu className="size-5" />
        </button>
        <Breadcrumbs />
      </div>

      <div className={styles.right}>
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className={styles.searchTrigger}
        >
          <Search className="size-4 shrink-0 text-ebony-400" aria-hidden />
          <span className={styles.searchPlaceholder}>Buscar…</span>
          <kbd className={styles.kbd}>
            <kbd>Ctrl</kbd> <kbd>K</kbd>
          </kbd>
        </button>

        <DropdownMenu
          trigger={
            <span className={styles.avatarButton} role="button" tabIndex={0} aria-label="Menú de usuario">
              {currentUser && <Avatar user={currentUser} size="sm" />}
            </span>
          }
          items={[
            { label: "Perfil", onSelect: () => {} },
            { label: "Configuración", onSelect: () => {} },
            { label: "Cerrar sesión", danger: true, onSelect: () => {} },
          ]}
        />
      </div>
    </header>
  );
};

export default Topbar;
