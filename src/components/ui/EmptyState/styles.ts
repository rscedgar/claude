export interface EmptyStateStyles {
  root: string;
  iconWrap: string;
  title: string;
  description: string;
}

const styles: EmptyStateStyles = {
  root: "flex flex-col items-center justify-center gap-1.5 px-6 py-14 text-center",
  iconWrap: `
    mb-2 flex size-12 items-center justify-center rounded-xl
    bg-surface-raised text-ebony-400 ring-1 ring-border-subtle
  `,
  title: "text-sm font-semibold text-ebony-100",
  description: "max-w-sm text-xs leading-5 text-ebony-400",
};

export { styles };
