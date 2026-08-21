"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { styles } from "./styles";

interface TagChipProps {
  name: string;
  color: string;
  onRemove?: () => void;
  className?: string;
}

const TagChip: React.FC<TagChipProps> = ({ name, color, onRemove, className }) => (
  <span
    className={cn(styles.root, className)}
    style={{ backgroundColor: `${color}1f`, color, borderColor: `${color}55` }}
  >
    {name}
    {onRemove && (
      <button
        type="button"
        aria-label={`Quitar tag ${name}`}
        onClick={onRemove}
        className={styles.remove}
      >
        <X className="size-3" />
      </button>
    )}
  </span>
);

export default TagChip;
