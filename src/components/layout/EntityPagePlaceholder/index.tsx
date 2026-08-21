"use client";

import type { ReactNode } from "react";
import { Construction } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { styles } from "./styles";

interface EntityPagePlaceholderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const EntityPagePlaceholder = ({ title, description, children }: EntityPagePlaceholderProps) => (
  <div className={styles.root}>
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </header>
    {children}
    <EmptyState
      icon={<Construction className="size-6" />}
      title="Vistas en construcción"
      description="Las vistas de lista y tablero para esta entidad se implementan en los issues #5 y #6."
    />
  </div>
);

export default EntityPagePlaceholder;
