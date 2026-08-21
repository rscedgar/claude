"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { styles } from "./styles";

interface IconButtonProps extends ComponentProps<"button"> {
  label: string;
}

const IconButton: React.FC<IconButtonProps> = ({ label, className, children, ...props }) => (
  <button type="button" aria-label={label} title={label} className={cn(styles.root, className)} {...props}>
    {children}
  </button>
);

export default IconButton;
