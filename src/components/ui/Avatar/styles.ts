import type { AvatarStyles } from "./types";

const styles: AvatarStyles = {
  root: `
    inline-flex shrink-0 select-none items-center justify-center rounded-full
    font-semibold uppercase ring-1 ring-white/10
  `,
  xs: "size-5 text-[9px]",
  sm: "size-6.5 text-[10px]",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
};

export { styles };
