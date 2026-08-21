export interface ButtonStyles {
  root: string;
  primary: string;
  secondary: string;
  ghost: string;
  danger: string;
  sizeSm: string;
  sizeMd: string;
  sizeLg: string;
  disabled: string;
}

const styles: ButtonStyles = {
  root: `
    inline-flex items-center justify-center gap-2 rounded-lg font-medium
    transition-colors duration-150 focus-visible:outline-hidden
    focus-visible:ring-2 focus-visible:ring-congress-500 select-none
    cursor-pointer whitespace-nowrap
  `,
  primary: "bg-congress-500 text-white hover:bg-congress-600",
  secondary: `
    bg-surface-raised text-ebony-100 border border-border-subtle
    hover:bg-[#333c5e] hover:border-ebony-700
  `,
  ghost: "text-ebony-200 hover:bg-white/5 hover:text-white",
  danger: "bg-priority-urgent text-white hover:bg-red-600",
  sizeSm: "h-8 px-3 text-xs",
  sizeMd: "h-9 px-4 text-sm",
  sizeLg: "h-11 px-5 text-sm",
  disabled: "opacity-50 pointer-events-none",
};

export { styles };
