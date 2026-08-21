"use client";

import { useId } from "react";
import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { styles } from "../FieldStyles";

interface SelectProps extends Omit<ComponentProps<"select">, "children"> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, placeholder, className, id, ...props }) => {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className={cn(styles.wrapper, "relative")}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            styles.control,
            "cursor-pointer appearance-none pr-9 [&>option]:bg-surface-overlay",
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ebony-400" />
      </div>
    </div>
  );
};

export default Select;
