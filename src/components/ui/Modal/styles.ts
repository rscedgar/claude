export interface ModalStyles {
  backdrop: string;
  container: string;
  sm: string;
  md: string;
  lg: string;
  header: string;
  title: string;
  body: string;
}

const styles: ModalStyles = {
  backdrop: `
    fixed inset-0 z-50 flex items-center justify-center bg-black/60
    p-4 backdrop-blur-xxs
  `,
  container: `
    relative max-h-[85vh] flex-col overflow-hidden rounded-xl border
    border-border-subtle bg-surface-raised shadow-2xl shadow-black/60
    animate-in zoom-in-95 duration-150
  `,
  sm: "w-full max-w-sm",
  md: "w-full max-w-lg",
  lg: "w-full max-w-2xl",
  header: "flex items-center justify-between gap-3 border-b border-border-subtle px-5 py-3.5",
  title: "text-base font-semibold text-white",
  body: "overflow-y-auto px-5 py-4",
};

export { styles };
