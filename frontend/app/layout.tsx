
import type { Metadata } from "next";
import { AuthProvider } from "@/app/features/auth/authProvider";
import "./global.css";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
