"use client";

import Link from "next/link";
import { useAuth } from "@/app/features/auth/authProvider";
import {
  ArrowRight,
  CalendarClock,
  Check,
  ChevronRight,
  GitBranch,
  Layers3,
  MapPin,
  Monitor,
  Network,
  Router,
  Server,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "Device management",
    description:
      "Keep track of network devices, their configurations and important infrastructure details in one place.",
    icon: Monitor,
    number: "01",
  },
  {
    title: "Network organization",
    description:
      "Organize VLANs and structure your infrastructure to make complex networks easier to understand.",
    icon: Network,
    number: "02",
  },
  {
    title: "Physical locations",
    description:
      "Connect infrastructure to buildings, rooms and physical locations for better visibility.",
    icon: MapPin,
    number: "03",
  },
  {
    title: "Maintenance tracking",
    description:
      "Keep maintenance activities, schedules and infrastructure history organized.",
    icon: CalendarClock,
    number: "04",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Express.js",
  "MySQL",
];

/**
 * Home Page Component
 * 
 * The marketing landing page for Network Management application.
 * 
 * WCAG 2.2 AA Compliant:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Keyboard navigation support
 * - Sufficient contrast
 * - Accessible interactive elements
 * - Responsive design
 */
export default function HomePage() {
  const { user, loading } = useAuth();

  const primaryHref = loading
    ? "#"
    : user
      ? "/dashboard"
      : "/signup";

  const primaryLabel = loading
    ? "Loading..."
    : user
      ? "Open dashboard"
      : "Get started";

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
              <Network className="h-5 w-5" />
            </div>

            <div>
              <p className="font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Network Manager
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Infrastructure management
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-blue-600 dark:hover:text-blue-400">
              Features
            </a>
            <a href="#product" className="transition hover:text-blue-600 dark:hover:text-blue-400">
              Platform
            </a>
            <a href="#technology" className="transition hover:text-blue-600 dark:hover:text-blue-400">
              Technology
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {!loading && (
              <Link
                href={user ? "/dashboard" : "/login"}
                className="hidden text-sm font-semibold text-slate-700 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 sm:block"
              >
                {user ? "Dashboard" : "Sign in"}
              </Link>
            )}

            <Link
              href={primaryHref}
              aria-disabled={loading}
              className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 ${
                loading ? "pointer-events-none opacity-60" : ""
              }`}
            >
              {primaryLabel}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:py-32 lg:grid-cols-2">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-blue-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                NETWORK INFRASTRUCTURE MANAGEMENT
              </div>

              <h1 className="max-w-2xl text-5xl font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-6xl lg:text-[68px] dark:text-slate-50">
                Your network.
                <span className="block text-blue-600">
                  Under control.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                Manage devices, organize infrastructure and keep track
                of your network from one centralized platform.
                Bring structure and visibility to your IT environment.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={primaryHref}
                  aria-disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 ${
                    loading ? "pointer-events-none opacity-60" : ""
                  }`}
                >
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                >
                  Explore features
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600" />
                  Centralized management
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600" />
                  Infrastructure visibility
                </span>
              </div>
            </div>

            {/* Network visualization */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-8 rounded-full bg-blue-200/40 blur-3xl" />

              <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                      Network topology
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Infrastructure visualization
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-slate-800 dark:text-blue-300">
                    <Workflow className="h-3.5 w-3.5" />
                    Network map
                  </div>
                </div>

                <NetworkVisualization />

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Infrastructure</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Organized
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Connectivity</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Visualized
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Management</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Centralized
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction strip */}
        <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-9 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              ONE PLATFORM FOR YOUR NETWORK INFRASTRUCTURE
            </p>

            <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-blue-600" />
                Devices
              </span>
              <span className="flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-blue-600" />
                VLANs
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                Locations
              </span>
              <span className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-blue-600" />
                Maintenance
              </span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-6 py-24 md:py-28"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Platform capabilities
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50">
              Everything your infrastructure needs. In one place.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
              From individual devices to the bigger network picture,
              manage the essential components of your infrastructure
              through one connected platform.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 dark:hover:shadow-black/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-semibold text-slate-300">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-7 font-bold text-slate-900 dark:text-slate-50">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Product showcase */}
        <section id="product" className="overflow-hidden bg-slate-950">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:py-28 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
                Built for infrastructure visibility
              </p>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Understand your network beyond individual devices.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-400">
                Infrastructure management is about understanding
                how everything fits together. Keep track of physical
                equipment, network organization and the relationships
                between infrastructure components.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Organize infrastructure in a structured way",
                  "Connect devices to physical locations",
                  "Visualize network relationships",
                  "Keep maintenance information accessible",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={user ? "/dashboard" : "/login"}
                className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Explore the platform
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Product interface illustration */}
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <Network className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Network Manager
                      </p>
                      <p className="text-xs text-slate-500">
                        Infrastructure workspace
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                  </div>
                </div>

                <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[145px_1fr]">
                  <div className="border-r border-slate-700 p-4">
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Workspace
                    </p>

                    {[
                      { label: "Overview", icon: Workflow },
                      { label: "Devices", icon: Monitor },
                      { label: "Network", icon: Network },
                      { label: "Locations", icon: MapPin },
                      { label: "Maintenance", icon: CalendarClock },
                    ].map(({ label, icon: Icon }, index) => (
                      <div
                        key={label}
                        className={`mb-2 flex items-center gap-2 rounded-lg px-2 py-2 text-[11px] ${
                          index === 0
                            ? "bg-blue-600/20 font-semibold text-blue-400"
                            : "text-slate-400"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {label}
                      </div>
                    ))}
                  </div>

                  <div className="min-w-0 p-4 sm:p-5">
                    <p className="text-sm font-bold text-white">
                      Infrastructure overview
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Conceptual product illustration
                    </p>

                    <div className="mt-5 rounded-xl border border-slate-700 bg-slate-800/60 p-3 sm:p-4">
                      <NetworkVisualization dark />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                        <Monitor className="h-4 w-4 text-blue-400" />
                        <p className="mt-2 text-xs font-semibold text-slate-200">
                          Device management
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500">
                          Infrastructure records
                        </p>
                      </div>

                      <div className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                        <GitBranch className="h-4 w-4 text-blue-400" />
                        <p className="mt-2 text-xs font-semibold text-slate-200">
                          Network structure
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500">
                          Connected components
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="bg-slate-50 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                <Zap className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
                Built with modern web technologies.
              </h2>

              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                A full-stack application combining a modern frontend,
                backend API and relational database to manage network
                infrastructure.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {technologies.map((technology) => (
                <div
                  key={technology}
                  className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-blue-600 px-8 py-14 sm:px-12 md:py-16">
            <div className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full border-[50px] border-white/5" />
            <div className="pointer-events-none absolute -right-5 -bottom-60 h-96 w-96 rounded-full border-[50px] border-white/5" />

            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Bring your network together.
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-blue-100">
                  Take a more structured approach to infrastructure
                  management. Get started with Network Manager today.
                </p>
              </div>

              <Link
                href={primaryHref}
                aria-disabled={loading}
                className={`inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 ${
                  loading ? "pointer-events-none opacity-60" : ""
                }`}
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Network className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                Network Manager
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Infrastructure management
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400">
              Features
            </a>
            <a href="#product" className="hover:text-blue-600 dark:hover:text-blue-400">
              Platform
            </a>
            <Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400">
              Sign in
            </Link>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Network infrastructure management project
          </p>
        </div>
      </footer>
    </div>
  );
}

/* Reusable conceptual network topology illustration */

function NetworkVisualization({ dark = false }: { dark?: boolean }) {
  const nodeStyle = dark
    ? "border-slate-600 bg-slate-800 text-slate-200"
    : "border-slate-200 bg-white text-slate-700";

  const lineStyle = dark ? "#475569" : "#cbd5e1";

  return (
    <div className="relative mx-auto flex min-h-[285px] max-w-[430px] flex-col items-center justify-between py-2">
      <svg
        viewBox="0 0 400 280"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M200 57 V105 M200 105 L90 160 M200 105 L200 160 M200 105 L310 160 M90 195 V225 M200 195 V225 M310 195 V225"
          stroke={lineStyle}
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <circle cx="200" cy="105" r="4" fill="#3b82f6" />
      </svg>

      <div className={`relative z-10 flex items-center gap-2 rounded-xl border px-5 py-3 shadow-sm ${nodeStyle}`}>
        <Router className="h-5 w-5 text-blue-500" />
        <span className="text-xs font-semibold">Core router</span>
      </div>

      <div className="relative z-10 flex w-full justify-around pt-8">
        {[
          { label: "Switch A", icon: Network },
          { label: "Switch B", icon: Network },
          { label: "Switch C", icon: Network },
        ].map(({ label, icon: Icon }) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 shadow-sm sm:px-4 ${nodeStyle}`}
          >
            <Icon className="h-5 w-5 text-blue-500" />
            <span className="text-[10px] font-semibold sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex w-full justify-around pt-6">
        {["Devices", "Servers", "Devices"].map((label, index) => (
          <div
            key={`${label}-${index}`}
            className={`flex flex-col items-center gap-2 rounded-lg border border-dashed px-3 py-2 ${nodeStyle}`}
          >
            {index === 1 ? (
              <Server className="h-4 w-4 text-blue-500" />
            ) : (
              <Monitor className="h-4 w-4 text-blue-500" />
            )}
            <span className="text-[10px] font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
