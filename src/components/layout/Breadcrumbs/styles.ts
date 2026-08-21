import type { BreadcrumbsStyles } from "./types";

const styles: BreadcrumbsStyles = {
  root: "flex min-w-0 items-center gap-1 overflow-hidden",
  crumbItem: "flex min-w-0 items-center gap-1",
  separator: "size-3.5 shrink-0 text-ebony-500",
  link: "truncate rounded px-1.5 py-0.5 text-sm font-medium text-ebony-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-hidden cursor-pointer",
  current: "truncate px-1.5 py-0.5 text-sm font-semibold text-white",
};

export { styles };
