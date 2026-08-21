"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useStoresHydrated } from "@/hooks/useStoresHydrated";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { styles } from "./styles";

interface Crumb {
  label: string;
  href?: string;
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const { spaces, folders, taskLists } = useWorkspaceStore((state) => state);
  const hydrated = useStoresHydrated();

  const crumbs = useMemo<Crumb[]>(() => {
    if (!hydrated || pathname === "/app" || !pathname.startsWith("/app/")) {
      return [{ label: "Inicio", href: "/app" }];
    }

    const [, , entityType, entityId] = pathname.split("/");
    const chain: Crumb[] = [];

    const resolveListChain = () => {
      const list = taskLists.find((l) => l.id === entityId);
      if (!list) return;
      const space = spaces.find((s) => s.id === list.spaceId);
      if (!space) return;
      chain.push({ label: space.name, href: `/app/space/${space.id}` });
      if (list.folderId) {
        const folder = folders.find((f) => f.id === list.folderId);
        if (folder) chain.push({ label: folder.name, href: `/app/folder/${folder.id}` });
      }
      chain.push({ label: list.name });
    };

    const resolveFolderChain = () => {
      const folder = folders.find((f) => f.id === entityId);
      if (!folder) return;
      const space = spaces.find((s) => s.id === folder.spaceId);
      if (space) chain.push({ label: space.name, href: `/app/space/${space.id}` });
      chain.push({ label: folder.name });
    };

    const resolveSpaceChain = () => {
      const space = spaces.find((s) => s.id === entityId);
      if (space) chain.push({ label: space.name });
    };

    if (entityType === "space") resolveSpaceChain();
    else if (entityType === "folder") resolveFolderChain();
    else if (entityType === "list") resolveListChain();

    return chain.length > 0 ? chain : [{ label: "Inicio", href: "/app" }];
  }, [pathname, spaces, folders, taskLists, hydrated]);

  return (
    <nav aria-label="Ruta de navegación" className={styles.root}>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={`${crumb.label}-${index}`} className={styles.crumbItem}>
            {index > 0 && <ChevronRight className={styles.separator} aria-hidden />}
            {crumb.href && !isLast ? (
              <Link href={crumb.href} className={cn(styles.link)}>
                {crumb.label}
              </Link>
            ) : (
              <span className={cn(styles.current, !isLast && styles.link)} aria-current={isLast ? "page" : undefined}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
