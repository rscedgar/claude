export interface TaskFiltersBarStyles {
  root: string;
  active: string;
  selects: string;
  clear: string;
}

const styles: TaskFiltersBarStyles = {
  root: `
    flex flex-wrap items-center gap-2 rounded-xl border border-transparent
    bg-surface-overlay/40 p-2 transition-colors
  `,
  active: "border-congress-500/25",
  selects: "",
  clear: `
    inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-3
    text-xs font-medium text-priority-urgent transition-colors
    hover:bg-priority-urgent/10 focus-visible:outline-hidden
  `,
};

export { styles };
