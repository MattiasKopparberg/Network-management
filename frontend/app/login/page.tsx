"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "@/app/features/auth/useLogin";
import Alert from "@/app/components/ui/alert";

/**
 * Login Page
 * 
 * The login page for user authentication.
 * 
 * WCAG 2.2 AA Compliant:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Focus management
 * - Accessible form
 */
export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-secondary px-4 py-12">
      <div className="w-full max-w-md">
        {/* Success message for registered users */}
        {registered === "true" && (
          <Alert variant="success" className="mb-6">
            Account created successfully! Please sign in.
          </Alert>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
