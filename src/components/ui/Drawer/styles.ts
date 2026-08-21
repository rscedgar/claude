export interface DrawerStyles {
  backdrop: string;
  panel: string;
  header: string;
  body: string;
}

const styles: DrawerStyles = {
  backdrop: "fixed inset-0 z-40 bg-black/50 backdrop-blur-xxs",
  panel: `
    absolute right-0 top-0 flex h-full w-full max-w-xl flex-col
    border-l border-border-subtle bg-surface shadow-2xl shadow-black/60
    animate-in slide-in-from-right duration-200
  `,
  header: `
    flex items-center justify-between gap-3 border-b border-border-subtle
    px-5 py-3.5 text-base font-semibold text-white
  `,
  body: "flex-1 overflow-y-auto px-5 py-4",
};

export { styles };
