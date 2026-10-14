
import type { Metadata } from "next";
import AppShell from "@/app/components/layout/appShell";
import "./global.css"

export const metadata: Metadata = {
  title: "Network Management",
  description: "Manage network infrastructure and devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
