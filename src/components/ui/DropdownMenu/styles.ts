export interface DropdownMenuStyles {
  root: string;
  menu: string;
  alignLeft: string;
  alignRight: string;
  item: string;
  itemDanger: string;
}

const styles: DropdownMenuStyles = {
  root: "relative inline-flex",
  menu: `
    absolute z-40 mt-1 min-w-44 overflow-hidden rounded-lg border
    border-border-subtle bg-surface-raised py-1 shadow-xl shadow-black/40
    animate-in fade-in slide-in-from-top-1 duration-100
  `,
  alignLeft: "left-0",
  alignRight: "right-0",
  item: `
    flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm
    text-ebony-100 transition-colors hover:bg-white/5
    focus-visible:bg-white/5 focus-visible:outline-hidden
  `,
  itemDanger: "text-priority-urgent hover:bg-priority-urgent/10 focus-visible:bg-priority-urgent/10",
};

export { styles };
