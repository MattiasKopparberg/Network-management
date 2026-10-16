
import type { Metadata } from "next";
import AppShell from "@/app/components/layout/appShell";
import "./global.css"
import { AuthProvider } from "@/app/features/auth/authProvider";
import ProtectedRoute from "@/app/features/auth/protectedRoute"
 
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
        <AuthProvider>
          <AppShell>
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </AppShell>
        </AuthProvider>
        
      </body>
    </html>
  );
}
