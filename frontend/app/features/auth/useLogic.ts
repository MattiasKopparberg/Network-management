
"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.kopparberg.dev");

type User = {
  id: number;
  email: string;
};

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data.user as User;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong",
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
