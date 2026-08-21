export interface TagChipStyles {
  root: string;
  remove: string;
}

const styles: TagChipStyles = {
  root: "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium",
  remove: "cursor-pointer rounded-sm p-px transition-opacity hover:opacity-70 focus-visible:outline-hidden",
};

export { styles };
