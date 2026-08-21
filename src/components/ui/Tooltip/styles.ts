export interface TooltipStyles {
  root: string;
  tooltip: string;
  sideTop: string;
  sideBottom: string;
  sideLeft: string;
  sideRight: string;
}

const styles: TooltipStyles = {
  root: "relative inline-flex group/tooltip",
  tooltip: `
    pointer-events-none absolute z-50 hidden whitespace-nowrap rounded-md
    bg-surface-overlay px-2 py-1 text-xs font-medium text-ebony-100 shadow-lg
    ring-1 ring-white/10 group-hover/tooltip:block
    group-focus-within/tooltip:block
  `,
  sideTop: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
  sideBottom: "top-full left-1/2 mt-1.5 -translate-x-1/2",
  sideLeft: "right-full top-1/2 mr-1.5 -translate-y-1/2",
  sideRight: "left-full top-1/2 ml-1.5 -translate-y-1/2",
};

export { styles };
