export interface QuickAddTaskRowStyles {
  trigger: string;
  editorRow: string;
  plus: string;
  input: string;
  hint: string;
}

const styles: QuickAddTaskRowStyles = {
  trigger: `
    flex h-9 w-full cursor-pointer items-center gap-2 border-b border-white/5
    px-3 text-sm text-ebony-400 transition-colors hover:bg-white/[0.03]
    hover:text-white focus-visible:outline-hidden
  `,
  editorRow: `
    grid h-11 grid-cols-[28px_minmax(180px,1fr)] items-center gap-2 border-b
    border-white/5 px-3
  `,
  plus: "size-4 shrink-0 text-congress-400",
  input: `
    w-full rounded border border-congress-500 bg-surface-overlay px-1.5 py-0.5
    text-sm font-medium text-ebony-100 placeholder:text-ebony-500
    focus:outline-hidden
  `,
  hint: "text-[10px] text-ebony-500",
};

export { styles };
