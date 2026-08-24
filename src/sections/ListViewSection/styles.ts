export interface ListViewSectionStyles {
  wrap: string;
  toolbar: string;
  toolbarLeft: string;
  toolbarRight: string;
  totalBadge: string;
  totalBadgeFiltered: string;
  filterButton: string;
  filterButtonActive: string;
  filterCount: string;
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
  totalBadgeFiltered: "bg-congress-500/15 text-congress-300",
  filterButton: `
    inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border
    border-border-subtle px-2.5 text-xs font-medium text-ebony-300
    transition-colors hover:border-ebony-700 hover:text-white
    focus-visible:outline-hidden
  `,
  filterButtonActive: "border-congress-500/50 bg-congress-500/10 text-congress-300",
  filterCount: "text-[9px] text-congress-400",
  skeletonWrap: "flex flex-col gap-2 p-4",
};

export { styles };
