"use client";

import SignupForm from "@/app/features/auth/signupForm";

/**
 * Signup Page
 * 
 * The registration page for new users.
 * 
 * WCAG 2.2 AA Compliant:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Focus management
 * - Accessible form
 */
export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-secondary px-4 py-12">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}
