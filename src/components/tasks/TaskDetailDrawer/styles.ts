export interface TaskDetailStyles {
  root: string;
  headerBlock: string;
  name: string;
  nameDone: string;
  nameInput: string;
  section: string;
  sectionTitle: string;
  descriptionBox: string;
  descriptionPreview: string;
  subtaskRow: string;
  addInput: string;
  commentRow: string;
  commentContent: string;
  activityText: string;
  row: string;
  label: string;
  value: string;
  control: string;
  icon: string;
  deleteButton: string;
}

const styles: TaskDetailStyles = {
  root: "flex flex-col gap-5",
  headerBlock: "flex flex-col gap-2",
  name: `
    w-full rounded-lg border border-transparent px-2 py-1 text-lg font-semibold
    leading-snug text-white transition-colors hover:border-border-subtle
    hover:bg-white/5 focus-visible:outline-hidden cursor-pointer
  `,
  nameDone: "text-ebony-400 line-through",
  nameInput: `
    w-full rounded-lg border border-congress-500 bg-surface-overlay px-2 py-1
    text-lg font-semibold text-white focus:outline-hidden
  `,
  section: "flex flex-col gap-2",
  sectionTitle: "text-xs font-semibold uppercase tracking-wider text-ebony-400",
  descriptionBox: `
    min-h-24 w-full rounded-lg border border-border-subtle bg-surface-overlay
    p-3 text-sm leading-relaxed text-ebony-200 placeholder:text-ebony-500
    focus:border-congress-500 focus:outline-hidden
  `,
  descriptionPreview:
    "rounded-lg border border-transparent bg-surface-overlay/50 p-3 text-sm text-ebony-200 [&_p]:mb-2",
  subtaskRow: "group flex items-center gap-2.5 rounded-md px-1 py-1 hover:bg-white/[0.03]",
  addInput: `
    w-full rounded-lg border border-dashed border-border-subtle bg-transparent
    px-3 py-2 text-sm text-ebony-100 placeholder:text-ebony-500
    focus:border-congress-500 focus:outline-hidden focus:border-solid
  `,
  commentRow: "flex items-start gap-2.5",
  commentContent: "min-w-0 flex-1 text-sm leading-relaxed text-ebony-100",
  activityText: "text-sm leading-relaxed text-ebony-300",
  row: "flex items-center justify-between gap-3",
  label: `
    flex w-24 shrink-0 items-center gap-1.5 text-xs font-medium text-ebony-400
  `,
  value: "flex min-w-0 flex-1 justify-end",
  control: `
    flex max-w-full cursor-pointer items-center gap-1.5 rounded-md px-2 py-1
    text-sm font-medium text-ebony-200 transition-colors hover:bg-white/5
    hover:text-white focus-visible:outline-hidden truncate
  `,
  icon: "size-3.5 shrink-0",
  deleteButton: `
    flex w-full cursor-pointer items-center gap-2 rounded-md border
    border-priority-urgent/30 px-3 py-2 text-sm font-medium text-priority-urgent
    transition-colors hover:bg-priority-urgent/10 focus-visible:outline-hidden
  `,
};

export { styles };
