export interface ListViewSectionStyles {
  wrap: string;
  toolbar: string;
  toolbarLeft: string;
  toolbarRight: string;
  totalBadge: string;
  skeletonWrap: string;
}

const styles: ListViewSectionStyles = {
  wrap: "flex flex-col gap-3 p-4",
  toolbar: "flex flex-wrap items-center justify-between gap-2",
  toolbarLeft: "flex items-center gap-2",
  toolbarRight: "flex items-center gap-2 [&>div]:w-36",
  totalBadge: `
    rounded-full bg-white/8 px-2.5 py-1 text-xs font-semibold tabular-nums
    text-ebony-300
  `,
  skeletonWrap: "flex flex-col gap-2 p-4",
};

export { styles };
