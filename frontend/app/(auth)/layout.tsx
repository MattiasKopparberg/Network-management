import AppShell from "@/app/components/layout/appShell";
import ProtectedRoute from "@/app/features/auth/protectedRoute";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell>
      <ProtectedRoute>{children}</ProtectedRoute>
    </AppShell>
  );
}