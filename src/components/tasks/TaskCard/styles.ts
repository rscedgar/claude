import type { TaskCardStyles } from "./types";

const styles: TaskCardStyles = {
  root: `
    cursor-grab rounded-lg border border-border-subtle bg-surface-raised
    p-2.5 shadow-sm transition-colors hover:border-ebony-700 active:cursor-grabbing
  `,
  dragging: `
    rotate-2 border-congress-500/60 shadow-xl shadow-black/50 ring-1
    ring-congress-500/40
  `,
  overlay: "w-64 cursor-grabbing",
  topRow: "mb-1 flex items-center justify-between gap-2",
  dueBadge: "flex items-center gap-1 text-[11px] font-medium",
  name: `
    line-clamp-3 text-sm font-medium leading-snug text-ebony-100
    selection:bg-congress-500/40
  `,
  bottomRow: "mt-2 flex items-center justify-between gap-2",
  tagsRow: "flex min-w-0 flex-wrap gap-1",
};

export { styles };
