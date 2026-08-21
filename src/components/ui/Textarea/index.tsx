"use client";

import { useId } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { styles } from "../FieldStyles";

interface TextareaProps extends ComponentProps<"textarea"> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, className, id, rows = 4, ...props }) => {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={cn(styles.control, "resize-y", error && "border-priority-urgent", className)}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Textarea;
