"use client";

import ToastProvider from "@/components/ui/Toast";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <ToastProvider>{children}</ToastProvider>
);

export default AppProviders;
