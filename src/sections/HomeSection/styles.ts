export interface HomeSectionStyles {
  root: string;
  greetingBlock: string;
  greeting: string;
  today: string;
  statGrid: string;
  statCard: string;
  statIcon: string;
  statValue: string;
  statLabel: string;
  statInfo: string;
  statDanger: string;
  statSuccess: string;
  section: string;
  sectionTitle: string;
  taskList: string;
  taskRow: string;
  statusDot: string;
  taskName: string;
  due: string;
  dueOverdue: string;
  dueSoon: string;
  listGrid: string;
  listCard: string;
  listIcon: string;
  listName: string;
  listCount: string;
  footer: string;
  skeletonWrap: string;
}

const styles: HomeSectionStyles = {
  root: "mx-auto flex w-full max-w-5xl flex-col gap-6 p-6",
  greetingBlock: "flex flex-col gap-1",
  greeting: "text-2xl font-bold tracking-tight text-white",
  today: "text-sm capitalize text-ebony-400",
  statGrid: "grid grid-cols-1 gap-3 sm:grid-cols-3",
  statCard: `
    flex flex-col gap-1 rounded-xl border border-border-subtle bg-surface-overlay
    p-4 [&>svg]:size-5
  `,
  statIcon: "",
  statValue: "text-2xl font-bold tabular-nums text-white",
  statLabel: "text-xs font-medium text-ebony-400",
  statInfo: "[&>svg]:text-congress-400",
  statDanger: "[&>svg]:text-priority-urgent",
  statSuccess: "[&>svg]:text-status-done",
  section: "flex flex-col gap-2",
  sectionTitle: "text-sm font-semibold uppercase tracking-wider text-ebony-400",
  taskList: `
    overflow-hidden rounded-xl border border-border-subtle bg-surface-overlay/40
    divide-y divide-white/5
  `,
  taskRow: `
    flex h-11 w-full cursor-pointer items-center gap-2.5 px-3 text-left text-sm
    transition-colors hover:bg-white/[0.03] focus-visible:outline-hidden
  `,
  statusDot: "size-2.5 shrink-0 rounded-full",
  taskName: "min-w-0 flex-1 truncate font-medium text-ebony-100",
  due: `
    flex shrink-0 items-center gap-1 text-xs font-medium tabular-nums text-ebony-400
  `,
  dueOverdue: "text-priority-urgent",
  dueSoon: "text-priority-high",
  listGrid: "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3",
  listCard: `
    flex h-11 items-center gap-2 rounded-lg border border-border-subtle
    bg-surface-overlay px-3 transition-colors hover:border-congress-500/40
    hover:bg-white/[0.04] focus-visible:outline-hidden
    focus-visible:ring-1 focus-visible:ring-congress-500
  `,
  listIcon: "size-4 shrink-0",
  listName: "min-w-0 flex-1 truncate text-sm font-medium text-ebony-100",
  listCount: `
    rounded-full bg-white/8 px-1.5 text-[11px] font-semibold tabular-nums
    text-ebony-300
  `,
  footer: "flex justify-center border-t border-white/5 pt-4 pb-2",
  skeletonWrap: "flex flex-col gap-4 p-6",
};

export { styles };
