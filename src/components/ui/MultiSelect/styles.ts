import type { Styles } from "./types";

const styles: Styles = {
  root: "flex w-full flex-col gap-1.5",
  label: "text-xs font-medium text-ebony-300",
  trigger: `
    flex min-h-9 w-full cursor-pointer items-center justify-between gap-2
    rounded-lg border border-border-subtle bg-surface-overlay px-3 py-1.5
    text-sm text-ebony-100 transition-colors hover:border-ebony-700
    focus-visible:outline-hidden focus-visible:ring-1
    focus-visible:ring-congress-500
  `,
  triggerOpen: "border-congress-500",
  placeholder: "text-ebony-500",
  summary: "flex flex-wrap items-center gap-1",
  chip: `
    inline-flex max-w-40 items-center gap-1 rounded-md bg-congress-500/15
    px-1.5 py-0.5 text-xs font-medium text-congress-300 ring-1 ring-congress-500/30
  `,
  chipRemove: `
    cursor-pointer rounded-sm p-px transition-colors
    hover:bg-congress-500/30 focus-visible:outline-hidden
  `,
  chevron: "size-4 shrink-0 text-ebony-400 transition-transform duration-200",
  chevronOpen: "rotate-180",
  panel: `
    absolute z-40 mt-1.5 w-full overflow-hidden rounded-lg border
    border-border-subtle bg-surface-overlay shadow-xl shadow-black/40
  `,
  searchWrap: "border-b border-border-subtle p-2",
  search: `
    w-full rounded-md bg-surface-raised px-2.5 py-1.5 text-sm text-ebony-100
    placeholder:text-ebony-500 focus:outline-hidden
  `,
  clearAll: `
    cursor-pointer rounded px-1 py-0.5 text-xs font-medium text-congress-400
    transition-colors hover:text-congress-300 focus-visible:outline-hidden
  `,
  list: "max-h-60 overflow-y-auto p-1",
  option: `
    flex w-full cursor-pointer items-center justify-between gap-2 rounded-md
    px-2 py-1.5 text-left text-sm text-ebony-100 transition-colors
    hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-hidden
  `,
  optionSelected: "bg-congress-500/10",
  optionLabel: "flex min-w-0 items-center gap-2 truncate",
  dot: "size-2.5 shrink-0 rounded-full",
  checkIcon: "size-4 shrink-0 text-congress-400",
  countBadge: `
    rounded-full bg-white/8 px-1.5 text-[11px] font-semibold tabular-nums
    text-ebony-300
  `,
  empty: "px-3 py-6 text-center text-sm text-ebony-400",
};

export { styles };
