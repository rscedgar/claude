export interface SpaceActionsHeaderStyles {
  root: string;
  titleBlock: string;
  dot: string;
  title: string;
  actions: string;
  skeleton: string;
}

const styles: SpaceActionsHeaderStyles = {
  root: `
    flex flex-wrap items-center justify-between gap-3 border-b
    border-border-subtle px-4 py-3
  `,
  titleBlock: "flex min-w-0 items-center gap-2.5",
  dot: "size-3.5 shrink-0 rounded-full",
  title: "truncate text-lg font-bold tracking-tight text-white",
  actions: "flex shrink-0 items-center gap-2",
  skeleton: "h-14 border-b border-border-subtle",
};

export { styles };
