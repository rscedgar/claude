export interface CommandPaletteStyles {
  backdrop: string;
  panel: string;
  searchRow: string;
  searchIcon: string;
  input: string;
  kbd: string;
  results: string;
  empty: string;
  groupTitle: string;
  item: string;
  itemActive: string;
  itemIcon: string;
  itemLabel: string;
  itemHint: string;
  footer: string;
  spaceDot: string;
}

const styles: CommandPaletteStyles = {
  backdrop: `
    fixed inset-0 z-[70] flex items-start justify-center bg-black/60
    pt-[12vh] backdrop-blur-xxs
  `,
  panel: `
    w-full max-w-xl overflow-hidden rounded-xl border border-border-subtle
    bg-surface-raised shadow-2xl shadow-black/60 animate-in fade-in zoom-in-95
    duration-150
  `,
  searchRow: "flex items-center gap-2.5 border-b border-border-subtle px-4",
  searchIcon: "size-4.5 shrink-0 text-ebony-400",
  input: `
    h-13 w-full bg-transparent text-sm text-ebony-100 placeholder:text-ebony-500
    focus:outline-hidden
  `,
  kbd: `
    rounded border border-border-subtle bg-white/5 px-1.5 py-0.5 font-mono
    text-[10px] text-ebony-400
  `,
  results: "max-h-80 overflow-y-auto p-2 [scrollbar-width:thin]",
  empty: "px-3 py-10 text-center text-sm text-ebony-400",
  groupTitle: `
    px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider
    text-ebony-500 first:pt-1
  `,
  item: `
    flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2
    text-left text-sm text-ebony-100 transition-colors focus-visible:outline-hidden
  `,
  itemActive: "bg-congress-500/15 text-white",
  itemIcon: "size-4 shrink-0 text-ebony-400",
  itemLabel: "min-w-0 flex-1 truncate",
  itemHint: "shrink-0 text-[11px] text-ebony-500",
  footer: `
    flex items-center gap-4 border-t border-border-subtle px-4 py-2 text-[11px]
    text-ebony-500
  `,
  spaceDot: "size-3 shrink-0 rounded-full",
};

export { styles };
