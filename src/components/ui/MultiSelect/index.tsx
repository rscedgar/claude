"use client";

import { useMemo, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useClickOutside } from "@/hooks/useClickOutside";
import { styles } from "./styles";
import type { MultiSelectProps } from "./types";

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  values,
  onChange,
  placeholder = "Seleccionar…",
  searchPlaceholder = "Buscar…",
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useClickOutside(rootRef, () => setOpen(false), open);

  const selectedOptions = useMemo(
    () => options.filter((option) => values.includes(option.value)),
    [options, values],
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedQuery),
    );
  }, [options, query]);

  const toggleValue = (value: string) => {
    onChange(
      values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value],
    );
  };

  return (
    <div ref={rootRef} className={styles.root}>
      {label && <span className={styles.label}>{label}</span>}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(styles.trigger, open && styles.triggerOpen)}
      >
        {selectedOptions.length === 0 ? (
          <span className={styles.placeholder}>{placeholder}</span>
        ) : (
          <span className={styles.summary}>
            {selectedOptions.map((option) => (
              <span key={option.value} className={styles.chip}>
                {option.color && (
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: option.color }}
                  />
                )}
                <span className="truncate">{option.label}</span>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Quitar ${option.label}`}
                  className={styles.chipRemove}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleValue(option.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleValue(option.value);
                    }
                  }}
                >
                  <X className="size-3" />
                </span>
              </span>
            ))}
          </span>
        )}
        <ChevronDown className={cn(styles.chevron, open && styles.chevronOpen)} />
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={cn(styles.searchWrap, "flex items-center gap-2")}>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className={styles.search}
            />
            {values.length > 0 && (
              <button
                type="button"
                className={cn(styles.clearAll, "shrink-0")}
                onClick={() => onChange([])}
              >
                Limpiar
              </button>
            )}
          </div>
          <div className={styles.list} role="listbox">
            {filteredOptions.length === 0 ? (
              <p className={styles.empty}>Sin resultados</p>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = values.includes(option.value);
                return (
                  <button
                    type="button"
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(styles.option, isSelected && styles.optionSelected)}
                    onClick={() => toggleValue(option.value)}
                  >
                    <span className={styles.optionLabel}>
                      {isSelected ? (
                        <Check className={styles.checkIcon} />
                      ) : option.color ? (
                        <span
                          className={styles.dot}
                          style={{ backgroundColor: option.color }}
                        />
                      ) : null}
                      <span className="truncate">{option.label}</span>
                    </span>
                    {typeof option.count === "number" && (
                      <span className={styles.countBadge}>{option.count}</span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
