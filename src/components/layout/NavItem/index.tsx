"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { styles } from "./styles";

interface NavItemProps {
  href: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  collapsed?: boolean;
  count?: number;
  trailing?: ReactNode;
  title?: string;
}

const NavItem = ({ href, label, icon, active, collapsed, count, trailing, title }: NavItemProps) => (
  <Link
    href={href}
    title={title ?? (collapsed ? label : undefined)}
    aria-current={active ? "page" : undefined}
    className={cn(styles.root, active && styles.active, collapsed && styles.collapsed)}
  >
    {icon}
    {!collapsed && (
      <>
        <span className={styles.label}>{label}</span>
        {typeof count === "number" && count > 0 && (
          <span className={styles.count}>{count}</span>
        )}
        {trailing && <span className={styles.trailing}>{trailing}</span>}
      </>
    )}
  </Link>
);

export default NavItem;
