import type { TopbarStyles } from "./types";

const styles: TopbarStyles = {
  root: `
    flex h-14 shrink-0 items-center justify-between gap-4 border-b
    border-border-subtle bg-surface-overlay/60 px-4 backdrop-blur-sm
  `,
  left: "flex min-w-0 flex-1 items-center gap-2",
  hamburger: `
    cursor-pointer rounded-lg p-1.5 text-ebony-300 transition-colors
    hover:bg-white/5 hover:text-white md:hidden focus-visible:outline-hidden
    focus-visible:ring-2 focus-visible:ring-congress-500
  `,
  right: "flex shrink-0 items-center gap-2",
  searchTrigger: `
    hidden h-9 w-64 cursor-pointer items-center gap-2 rounded-lg border
    border-border-subtle bg-surface-overlay px-3 text-sm text-ebony-500
    transition-colors hover:border-ebony-700 hover:text-ebony-300 sm:flex
    focus-visible:outline-hidden focus-visible:ring-1
    focus-visible:ring-congress-500
  `,
  searchPlaceholder: "flex-1 text-left",
  kbd: `
    flex items-center gap-0.5 rounded border border-border-subtle bg-white/5
    px-1 py-0.5 font-mono text-[10px] text-ebony-400 [&>kbd]:font-mono
  `,
  avatarButton: "rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-congress-500",
};

export { styles };
