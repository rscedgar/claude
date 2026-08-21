import type { TaskRowStyles } from "./types";

const styles: TaskRowStyles = {
  root: `
    group grid h-11 cursor-pointer items-center gap-2 border-b
    border-white/5 px-3 text-sm transition-colors hover:bg-white/[0.03]
    grid-cols-[28px_minmax(180px,1fr)_130px_96px_96px_84px_32px]
  `,
  checkboxCell: "flex items-center",
  nameCell: "flex min-w-0 flex-col justify-center",
  name: "truncate font-medium text-ebony-100",
  nameDone: "text-ebony-400 line-through",
  nameInput: `
    w-full rounded border border-congress-500 bg-surface-overlay px-1.5 py-0.5
    text-sm font-medium text-ebony-100 focus:outline-hidden
  `,
  tagsRow: "mt-0.5 flex items-center gap-1 overflow-hidden",
  cellButton: `
    flex h-full w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-md
    px-1.5 text-xs font-medium text-ebony-300 transition-colors
    hover:bg-white/5 hover:text-white focus-visible:outline-hidden truncate
    opacity-60 transition-opacity group-hover:opacity-100
  `,
  dueOverdue: "text-priority-urgent",
  dueToday: "text-priority-high",
  assigneesCell: "flex justify-end pr-1",
  menuCell: "relative flex justify-end",
};

export { styles };
