export interface FieldStyles {
  wrapper: string;
  label: string;
  control: string;
  error: string;
}

const styles: FieldStyles = {
  wrapper: "flex w-full flex-col gap-1.5",
  label: "text-xs font-medium text-ebony-300",
  control: `
    w-full rounded-lg border border-border-subtle bg-surface-overlay px-3 py-2
    text-sm text-ebony-100 placeholder:text-ebony-500 transition-colors
    focus:border-congress-500 focus:outline-hidden focus:ring-1
    focus:ring-congress-500 disabled:opacity-50 read-only:focus:border-border-subtle
    read-only:focus:ring-0
  `,
  error: "text-xs text-priority-urgent",
};

export { styles };
