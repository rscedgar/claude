import type { AppShellStyles } from "./types";

const styles: AppShellStyles = {
  root: "flex h-screen overflow-hidden bg-ebony-950",
  mobileBackdrop: "fixed inset-0 z-30 bg-black/50 backdrop-blur-xxs md:hidden",
  sidebarSlot: `
    fixed inset-y-0 left-0 z-40 -translate-x-full transition-transform
    duration-200 data-[open=true]:translate-x-0 md:static md:z-auto
    md:translate-x-0
  `,
  mainColumn: "flex min-w-0 flex-1 flex-col",
  content: "flex-1 overflow-y-auto",
  collapseToggle: `
    absolute left-1 top-1/2 z-10 hidden h-6 w-4 -translate-y-1/2 cursor-pointer
    items-center justify-center rounded-md border border-border-subtle
    bg-surface-raised text-xs text-ebony-400 opacity-0 transition-opacity
    hover:text-white focus-visible:opacity-100 focus-visible:outline-hidden
    group-hover/shell:opacity-100 lg:flex
  `,
};

export { styles };
