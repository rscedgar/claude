export interface ViewSwitcherStyles {
  root: string;
  tab: string;
  active: string;
}

const styles: ViewSwitcherStyles = {
  root: `
    inline-flex h-8 items-center gap-0.5 rounded-lg border
    border-border-subtle bg-surface-overlay p-0.5
  `,
  tab: `
    inline-flex h-full cursor-pointer items-center gap-1.5 rounded-md px-2.5
    text-xs font-medium text-ebony-300 transition-colors hover:text-white
    focus-visible:outline-hidden focus-visible:ring-1
    focus-visible:ring-congress-500
  `,
  active: "bg-congress-500/15 text-congress-300 hover:text-congress-200",
};

export { styles };
