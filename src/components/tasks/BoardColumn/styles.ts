export interface BoardColumnStyles {
  root: string;
  over: string;
  header: string;
  dot: string;
  title: string;
  count: string;
  body: string;
  bodyOver: string;
  emptyHint: string;
  footer: string;
}

const styles: BoardColumnStyles = {
  root: `
    flex h-full w-72 shrink-0 flex-col overflow-hidden rounded-xl border
    border-border-subtle bg-surface-overlay/50 transition-colors
  `,
  over: "border-congress-500/60 ring-1 ring-congress-500/30",
  header: "flex h-10 shrink-0 items-center gap-2 border-b border-white/8 px-3",
  dot: "size-2.5 shrink-0 rounded-full",
  title: "min-w-0 flex-1 truncate text-sm font-semibold text-ebony-100",
  count: "rounded-full bg-white/8 px-1.5 text-[11px] font-semibold tabular-nums text-ebony-300",
  body: `
    flex flex-1 flex-col gap-2 overflow-y-auto p-2 transition-colors
    [scrollbar-width:thin]
  `,
  bodyOver: "bg-congress-500/5",
  emptyHint: `
    rounded-lg border border-dashed border-white/12 px-3 py-6 text-center
    text-xs text-ebony-500
  `,
  footer: "shrink-0 px-1 pb-1 [&>div>button]:h-8",
};

export { styles };
