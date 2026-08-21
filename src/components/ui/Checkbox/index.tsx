"use client";

import { useId } from "react";
import type { ComponentProps } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { styles } from "./styles";

interface CheckboxProps extends Omit<ComponentProps<"button">, "onChange" | "checked"> {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  className,
  ...props
}) => {
  const id = useId();
  const active = checked || indeterminate;

  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={indeterminate ? "mixed" : checked}
      onClick={() => onChange?.(!checked)}
      className={cn(styles.root, active && styles.active, className)}
      {...props}
    >
      {indeterminate ? (
        <Minus className={styles.icon} />
      ) : checked ? (
        <Check className={styles.icon} strokeWidth={3} />
      ) : null}
    </button>
  );
};

export default Checkbox;
