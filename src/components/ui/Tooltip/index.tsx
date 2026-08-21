import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { styles } from "./styles";

interface TooltipProps {
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

const sideMap = {
  top: styles.sideTop,
  bottom: styles.sideBottom,
  left: styles.sideLeft,
  right: styles.sideRight,
} as const;

const Tooltip: React.FC<TooltipProps> = ({ label, side = "bottom", children }) => (
  <span className={styles.root}>
    {children}
    <span role="tooltip" className={cn(styles.tooltip, sideMap[side])}>
      {label}
    </span>
  </span>
);

export default Tooltip;
