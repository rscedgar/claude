"use client";

import BoardSection from "@/sections/BoardSection";
import ListViewSection from "@/sections/ListViewSection";
import { useUiStore } from "@/stores/ui-store";

export type ScopeType = "list" | "folder" | "space";

interface TaskAreaProps {
  scopeType: ScopeType;
  scopeId: string;
}

/**
 * Conmuta entre vista de lista y tablero según la preferencia persistida.
 */
const TaskArea = ({ scopeType, scopeId }: TaskAreaProps) => {
  const activeView = useUiStore((state) => state.activeView);

  return activeView === "board" ? (
    <BoardSection scopeType={scopeType} scopeId={scopeId} />
  ) : (
    <ListViewSection scopeType={scopeType} scopeId={scopeId} />
  );
};

export default TaskArea;
