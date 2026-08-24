export interface BoardSectionStyles {
  wrap: string;
  toolbar: string;
  toolbarLeft: string;
  totalBadge: string;
  columns: string;
  skeletonWrap: string;
  skeletonColumns: string;
}

const styles: BoardSectionStyles = {
  wrap: "flex h-full flex-col gap-3 p-4",
  toolbar: "flex flex-wrap items-center justify-between gap-2",
  toolbarLeft: "flex items-center gap-2",
  totalBadge: `
    rounded-full bg-white/8 px-2.5 py-1 text-xs font-semibold tabular-nums
    text-ebony-300
  `,
  columns: "flex flex-1 items-stretch gap-3 overflow-x-auto pb-2",
  skeletonWrap: "flex flex-col gap-3 p-4",
  skeletonColumns: "flex gap-3 overflow-hidden",
};

export { styles };
