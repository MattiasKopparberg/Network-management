"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import Card from "@/app/components/ui/card";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Signup Form Component
 * 
 * A form for user registration.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper form structure
 * - Accessible form controls with labels
 * - Clear error and success messages
 * - Password validation feedback
 * - Focus management
 * - Keyboard navigation
 */
export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || data?.error || "Registration failed.");
      }

      // Registration successful - redirect to login
      router.push("/login?registered=true");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card padding="lg" fullWidth>
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-semibold text-[var(--text-primary)]">
          Create an account
        </h1>
        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          Sign up to access your network dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={error?.includes("email") ? error : undefined}
          autoComplete="email"
          autoFocus
        />

        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          helperText="Minimum 8 characters"
          error={error?.includes("password") ? error : undefined}
          autoComplete="new-password"
        />

        <Input
          label="Confirm password"
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={error === "Passwords do not match." ? error : undefined}
          autoComplete="new-password"
        />

        {error && !error.includes("email") && !error.includes("password") && (
          <p
            role="alert"
            className="text-sm text-[var(--error)]"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="text-sm text-[var(--success)]"
          >
            Account created successfully. You can now sign in.
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          fullWidth
          size="lg"
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[var(--brand-primary)] underline underline-offset-2
            hover:text-[var(--brand-secondary)]"
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}
