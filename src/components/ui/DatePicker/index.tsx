"use client";

import { useId } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { styles } from "../FieldStyles";

interface DatePickerProps extends ComponentProps<"input"> {
  label?: string;
}

const toInputDateTime = (value: ComponentProps<"input">["value"]): string => {
  if (typeof value !== "string" || !value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const DatePicker: React.FC<DatePickerProps> = ({ label, className, id, value, ...props }) => {
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
        type="datetime-local"
        value={toInputDateTime(value)}
        className={cn(styles.control, "[color-scheme:dark]", className)}
        {...props}
      />
    </div>
  );
};

export default DatePicker;
