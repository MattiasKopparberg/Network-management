"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useLogin } from "./useLogic";
import { useAuth } from "./authProvider";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import Card from "@/app/components/ui/card";

/**
 * Login Form Component
 * 
 * A form for user authentication.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper form structure
 * - Accessible form controls with labels
 * - Clear error messages
 * - Focus management
 * - Keyboard navigation
 */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useLogin();

  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await login(email, password);

    if (user) {
      await refreshUser();
      router.push("/dashboard");
    }
  };

  return (
    <Card padding="lg" fullWidth>
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold text-[var(--text-primary)]">
          Welcome back
        </h2>

        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          Sign in to access your dashboard.
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
          error={error?.includes("password") ? error : undefined}
          autoComplete="current-password"
        />

        {error && !error.includes("email") && !error.includes("password") && (
          <p
            role="alert"
            className="text-sm text-[var(--error)]"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          fullWidth
          size="lg"
        >
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-[var(--brand-primary)] underline underline-offset-2
            hover:text-[var(--brand-secondary)]"
        >
          Sign up
        </Link>
      </p>
    </Card>
  );
}
