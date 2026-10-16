"use client";

import { useState } from "react";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import Card from "@/app/components/ui/card";
import { useLogin } from "./useLogic";
import { useRouter } from "next/navigation";
import { useAuth } from "./authProvider";

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
    <Card>
      <h2 className="mb-2 text-2xl font-semibold">
        Welcome back
      </h2>

      <p className="mb-6 text-sm text-slate-500">
        Sign in to access your dashboard.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Card>
  );
}