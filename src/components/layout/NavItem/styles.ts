import type { NavItemStyles } from "./types";

const styles: NavItemStyles = {
  root: `
    group flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm
    font-medium text-ebony-300 transition-colors hover:bg-white/5
    hover:text-white focus-visible:outline-hidden focus-visible:ring-1
    focus-visible:ring-congress-500 cursor-pointer
  `,
  active: "bg-congress-500/12 text-white hover:bg-congress-500/20",
  collapsed: "justify-center px-0",
  label: "min-w-0 flex-1 truncate text-left",
  count: `
    shrink-0 rounded-full bg-white/8 px-1.5 text-[11px] font-semibold
    tabular-nums text-ebony-300 group-hover:text-ebony-200
  `,
  trailing: "shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
};

export { styles };
