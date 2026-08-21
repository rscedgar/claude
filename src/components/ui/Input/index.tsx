"use client";

import { useId } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { styles } from "../FieldStyles";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={cn(styles.control, error && "border-priority-urgent", className)}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
