import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProviders from "@/providers/AppProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow — Gestión de tareas",
  description:
    "Aplicación de gestión de tareas estilo ClickUp: espacios, listas, tableros y vistas de tareas.",
};

export const viewport: Viewport = {
  themeColor: "#222942",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ebony-950 text-ebony-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
