export interface CheckboxStyles {
  root: string;
  active: string;
  icon: string;
}

const styles: CheckboxStyles = {
  root: `
    flex size-4.5 shrink-0 items-center justify-center rounded border
    border-border-subtle bg-transparent transition-colors cursor-pointer
    hover:border-congress-400 focus-visible:outline-hidden
    focus-visible:ring-2 focus-visible:ring-congress-500
  `,
  active: "border-congress-500 bg-congress-500 hover:border-congress-600 hover:bg-congress-600",
  icon: "size-3 text-white",
};

export { styles };
