"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authProvider";

type ProtectedRouteProps = {
  children: ReactNode;
};

/**
 * Protected Route Component
 * 
 * Wraps content that requires authentication.
 * Redirects to login if user is not authenticated.
 * 
 * WCAG 2.2 AA Compliant:
 * - Clear loading state
 * - Accessible text contrast
 */
export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Checking your session...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
