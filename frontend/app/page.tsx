"use client";

import Link from "next/link";
import { useAuth } from "@/app/features/auth/authProvider";

import {
  ArrowRight,
  CalendarClock,
  GitBranch,
  MapPin,
  Monitor,
  Network,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Device management",
    description:
      "Keep track of network devices and their details from one place.",
    icon: Monitor,
  },
  {
    title: "VLAN organization",
    description:
      "Manage VLANs and keep network segmentation organized.",
    icon: Network,
  },
  {
    title: "Location tracking",
    description:
      "Connect infrastructure to physical locations for easier oversight.",
    icon: MapPin,
  },
  {
    title: "Maintenance tracking",
    description:
      "Keep maintenance activities organized and easy to review.",
    icon: CalendarClock,
  },
];

export default function HomePage() {

  const { user, loading } = useAuth();

const destination = user ? "/dashboard" : "/login";
const actionLabel = loading
  ? "Loading..."
  : user
    ? "Open dashboard"
    : "Log in";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Network className="h-5 w-5" />
            </div>

            <div>
              <p className="font-semibold tracking-tight">
                Network Manager
              </p>
              <p className="text-xs text-slate-500">
                Infrastructure management
              </p>
            </div>
          </Link>

          <Link href={destination} className="...">
  {loading ? "Loading..." : user ? "Access your dashboard" : "Log in to get started"}
  <ArrowRight className="h-4 w-4" />
</Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-50">
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                Network infrastructure, organized
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Your network.
                <span className="block text-blue-600">
                  One central place.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Manage devices, VLANs, locations, and maintenance
                through one clear interface. Keep your network
                infrastructure structured and easier to oversee.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Access your dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Explore features
                </a>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                A centralized interface for managing network resources.
              </p>
            </div>

            {/* Dashboard preview */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-blue-100/60 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Network overview
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Infrastructure dashboard preview
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-5">
                  <PreviewStat
                    label="Devices"
                    value="24"
                    icon={Monitor}
                  />
                  <PreviewStat
                    label="Locations"
                    value="3"
                    icon={MapPin}
                  />
                  <PreviewStat
                    label="VLANs"
                    value="6"
                    icon={Network}
                  />
                  <PreviewStat
                    label="Maintenance"
                    value="4"
                    icon={CalendarClock}
                  />
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                      Infrastructure overview
                    </p>
                    <span className="text-xs text-slate-400">
                      Example data
                    </span>
                  </div>

                  <div className="space-y-4">
                    <PreviewBar
                      label="Office network"
                      detail="12 devices"
                      percentage={75}
                    />
                    <PreviewBar
                      label="Server room"
                      detail="8 devices"
                      percentage={50}
                    />
                    <PreviewBar
                      label="Remote location"
                      detail="4 devices"
                      percentage={25}
                    />
                  </div>
                </div>

                <div className="border-t border-slate-200 bg-white px-5 py-3">
                  <p className="text-xs text-slate-500">
                    Illustrative preview · Not live system data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-6 py-20 md:py-24"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Core functionality
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything organized in one place
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A straightforward way to manage the key components
              of a network infrastructure.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-slate-900 px-8 py-10 sm:px-12 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Ready to manage your network?
              </h2>
              <p className="mt-2 max-w-xl leading-6 text-slate-300">
                Sign in to access your network management dashboard
                and infrastructure records.
              </p>
            </div>

            <Link
              href="/login"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Go to login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Network Manager</p>
          <p>Network infrastructure management project</p>
        </div>
      </footer>
    </div>
  );
}

function PreviewStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Monitor;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-slate-500">{label}</p>
        <Icon className="h-4 w-4 text-slate-400" />
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  );
}

function PreviewBar({
  label,
  detail,
  percentage,
}: {
  label: string;
  detail: string;
  percentage: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{detail}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
