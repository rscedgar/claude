export interface StatusBadgeStyles {
  root: string;
  dot: string;
  dotPulse: string;
}

const styles: StatusBadgeStyles = {
  root: `
    inline-flex max-w-full items-center gap-1.5 truncate rounded-md px-2 py-0.5
    text-xs font-medium text-ebony-200 ring-1 ring-white/8
  `,
  dot: "size-2 shrink-0 rounded-full",
  dotPulse: "shadow-[0_0_6px_currentColor]",
};

export { styles };
