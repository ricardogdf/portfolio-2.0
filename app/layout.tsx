import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ricardo Gonçalves",
  description: "Portfólio pessoal com minhas experiências e projetos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
