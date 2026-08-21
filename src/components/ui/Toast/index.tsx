"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { styles, toastDurationMs } from "./types";
import type { ToastContextValue, ToastData, ToastVariant } from "./types";

const ToastContext = createContext<ToastContextValue | null>(null);

const iconMap: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className={styles.successIcon} />,
  error: <XCircle className={styles.errorIcon} />,
  info: <Info className={styles.infoIcon} />,
};

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-4), { ...toast, id }]);
      timersRef.current.set(
        id,
        setTimeout(() => dismissToast(id), toastDurationMs),
      );
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className={styles.viewport}>
        {toasts.map((toast) => (
          <div key={toast.id} role="status" className={styles.toast}>
            {iconMap[toast.variant]}
            <div className={styles.content}>
              <p className={styles.title}>{toast.title}</p>
              {toast.description && <p className={styles.description}>{toast.description}</p>}
            </div>
            <button
              type="button"
              aria-label="Descartar notificación"
              className={cn(styles.close)}
              onClick={() => dismissToast(toast.id)}
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider");
  }
  return context;
};

export default ToastProvider;
