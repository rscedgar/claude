import type { TaskGroupHeaderStyles } from "./types";

const styles: TaskGroupHeaderStyles = {
  root: `
    sticky top-0 z-10 flex h-9 w-full cursor-pointer items-center gap-2
    border-b border-white/8 bg-ebony-950/95 px-3 text-left backdrop-blur-sm
    transition-colors hover:bg-surface-raised/60 focus-visible:outline-hidden
  `,
  chevron: "size-4 shrink-0 text-ebony-400 transition-transform duration-150",
  dot: "size-2.5 shrink-0 rounded-full",
  label: "text-sm font-semibold text-ebony-100",
  count: "rounded-full bg-white/8 px-1.5 text-[11px] font-semibold tabular-nums text-ebony-300",
};

export { styles };
