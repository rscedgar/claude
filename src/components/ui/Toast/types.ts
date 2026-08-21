export type ToastVariant = "success" | "error" | "info";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

export interface ToastContextValue {
  toasts: ToastData[];
  showToast: (toast: Omit<ToastData, "id">) => void;
  dismissToast: (id: string) => void;
}

export const toastDurationMs = 4000;

export interface ToastStyles {
  viewport: string;
  toast: string;
  content: string;
  title: string;
  description: string;
  close: string;
  successIcon: string;
  errorIcon: string;
  infoIcon: string;
}

export const styles: ToastStyles = {
  viewport: `
    pointer-events-none fixed bottom-4 right-4 z-[60] flex w-80 flex-col gap-2
  `,
  toast: `
    pointer-events-auto flex items-start gap-2.5 rounded-lg border
    border-border-subtle bg-surface-raised p-3 shadow-xl shadow-black/40
    animate-in fade-in slide-in-from-bottom-2 duration-200
  `,
  content: "min-w-0 flex-1",
  title: "text-sm font-medium text-white",
  description: "mt-0.5 text-xs text-ebony-300",
  close: `
    cursor-pointer rounded-md p-1 text-ebony-400 transition-colors
    hover:bg-white/5 hover:text-white focus-visible:outline-hidden
  `,
  successIcon: "size-4.5 shrink-0 text-status-done",
  errorIcon: "size-4.5 shrink-0 text-priority-urgent",
  infoIcon: "size-4.5 shrink-0 text-congress-400",
};
