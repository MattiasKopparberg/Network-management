
import SignupForm from "@/app/features/auth/signupForm"

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}
