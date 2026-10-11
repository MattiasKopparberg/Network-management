import LoginForm from "@/app/features/auth/useLogin";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}