"use client";

import { useState } from "react";
import Input from "@/app/components/ui/Input";
import  Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import { useLogin } from "./useLogic";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await login(email, password);

    console.log("LOGIN RESULT:", data);
  };

  return (
    <Card>
      <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>

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
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Card>
  );
}