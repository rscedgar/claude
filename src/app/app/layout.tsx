import AppShell from "@/components/layout/AppShell";

const AppLayout = ({ children }: LayoutProps<"/app">) => {
  return <AppShell>{children}</AppShell>;
};

export default AppLayout;
