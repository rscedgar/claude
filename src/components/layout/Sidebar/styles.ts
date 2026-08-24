import type { SidebarStyles } from "./types";

const styles: SidebarStyles = {
  root: `
    flex h-full w-64 shrink-0 flex-col border-r border-border-subtle
    bg-surface-overlay transition-[width] duration-200
    data-[collapsed=true]:w-14
  `,
  header: "flex h-14 shrink-0 items-center border-b border-border-subtle px-3",
  brand: "flex items-center gap-2 rounded-lg px-1 py-1 focus-visible:outline-hidden",
  logoDot: "size-6 shrink-0 rounded-lg bg-congress-500 shadow-md shadow-congress-500/40",
  brandName: "text-base font-bold tracking-tight text-white",
  nav: "flex-1 overflow-y-auto px-2 py-3 [scrollbar-width:thin]",
  section: "mt-4 first:mt-0",
  sectionHeaderRow: "flex items-center justify-between px-2 pb-1",
  sectionTitle: `
    text-[11px] font-semibold uppercase tracking-wider text-ebony-500
  `,
  emptySpaces: "px-3 py-2 text-xs text-ebony-400",
  spaceRow: `
    group flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-md
    px-1.5 text-sm font-semibold text-ebony-200 transition-colors
    hover:bg-white/5 hover:text-white focus-visible:outline-hidden
  `,
  spaceRowActive: "bg-congress-500/12 text-white",
  spaceDot: "size-4 rounded-full ring-1 ring-white/20",
  spaceDotSmall: "size-2.5 shrink-0 rounded-full",
  chevron: "size-3.5 shrink-0 text-ebony-400 transition-transform duration-150",
  label: "min-w-0 flex-1 truncate text-left",
  count: "shrink-0 rounded-full bg-white/8 px-1.5 text-[11px] font-semibold tabular-nums text-ebony-300",
  star: "cursor-pointer rounded p-0.5 text-ebony-500 opacity-0 transition-opacity hover:text-congress-300 focus-visible:opacity-100 focus-visible:outline-hidden group-hover:opacity-100",
  starActive: "text-congress-400 opacity-100 [&>svg]:fill-current",
  quickAdd: `
    flex cursor-pointer items-center rounded p-0.5 text-ebony-500 opacity-0
    transition-opacity hover:bg-white/8 hover:text-congress-300
    focus-visible:opacity-100 focus-visible:outline-hidden
    group-hover:opacity-100 group-focus-within:opacity-100
  `,
  addListRow: `
    flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-1.5 text-xs
    font-medium text-ebony-400 transition-colors hover:bg-white/5
    hover:text-white focus-visible:outline-hidden
  `,
  treeIndent: "ml-3 border-l border-white/8 pl-1.5",
  folderRow: `
    flex h-7 w-full cursor-pointer items-center gap-1 rounded-md px-1.5
    text-xs font-medium text-ebony-300 transition-colors hover:bg-white/5
    hover:text-white focus-visible:outline-hidden
  `,
  collapsedBody: "flex flex-col items-center gap-1 px-2 py-3",
  footer: "shrink-0 border-t border-border-subtle p-2",
  newSpace: `
    flex h-9 w-full cursor-pointer items-center gap-2 rounded-md px-2
    text-sm font-medium text-ebony-300 transition-colors hover:bg-white/5
    hover:text-white focus-visible:outline-hidden
  `,
  newSpaceCollapsed: `
    flex size-9 cursor-pointer items-center justify-center rounded-lg
    text-ebony-300 transition-colors hover:bg-white/5 hover:text-white
    focus-visible:outline-hidden
  `,
};

export { styles };
