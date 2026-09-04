import LoginForm from "@/app/features/auth/useLogin";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="grid w-full gap-12 lg:grid-cols-2">
          
          {/* Landing section */}
          <section className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold tracking-wider text-blue-600">
              NETWORK MANAGEMENT
            </p>

            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl">
              Manage your network infrastructure.
            </h1>

            <p className="mb-8 max-w-xl text-lg text-slate-600">
              Manage devices, VLANs, locations, and maintenance from one
              centralized system.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Feature
                title="Devices"
                description="Manage your network devices."
              />

              <Feature
                title="VLANs"
                description="Organize your network infrastructure."
              />

              <Feature
                title="Locations"
                description="Keep your infrastructure organized."
              />

              <Feature
                title="Maintenance"
                description="Track maintenance activities."
              />
            </div>
          </section>

          {/* Login */}
          <section className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}