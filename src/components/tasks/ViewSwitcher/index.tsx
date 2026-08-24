"use client";

import { KanbanSquare, List } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ViewType } from "@/types";
import { useUiStore } from "@/stores/ui-store";
import { styles } from "./styles";

const tabs: Array<{ value: ViewType; label: string; icon: React.ReactNode }> = [
  { value: "list", label: "Lista", icon: <List className="size-3.5" /> },
  { value: "board", label: "Tablero", icon: <KanbanSquare className="size-3.5" /> },
];

const ViewSwitcher = () => {
  const activeView = useUiStore((state) => state.activeView);
  const setActiveView = useUiStore((state) => state.setActiveView);

  return (
    <div role="tablist" aria-label="Tipo de vista" className={styles.root}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={activeView === tab.value}
          onClick={() => setActiveView(tab.value)}
          className={cn(styles.tab, activeView === tab.value && styles.active)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ViewSwitcher;
