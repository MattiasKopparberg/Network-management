'use client'
import Link from "next/link";
import {
  Monitor,
  MapPin,
  Network,
  CalendarClock,
  ArrowUpRight,
} from "lucide-react";

import SummaryCard from "@/app/components/dashboard/summaryCard";
import MaintenanceOverview from "@/app/components/dashboard/maintenanceOverview";
import NetworkOverview from "@/app/components/dashboard/networkOverview";

const summaryCards = [
  {
    title: "Total devices",
    value: 24,
    description: "Registered network devices",
    icon: Monitor,
  },
  {
    title: "Locations",
    value: 3,
    description: "Registered locations",
    icon: MapPin,
  },
  {
    title: "VLANs",
    value: 6,
    description: "Configured network segments",
    icon: Network,
  },
  {
    title: "Scheduled maintenance",
    value: 4,
    description: "Upcoming maintenance events",
    icon: CalendarClock,
  },
];

const maintenanceEvents = [
  {
    id: 1,
    device: "Router-01",
    description: "Firmware update",
    date: "2026-10-14",
    scheduled: true,
  },
  {
    id: 2,
    device: "Switch-02",
    description: "Configuration review",
    date: "2026-10-17",
    scheduled: true,
  },
  {
    id: 3,
    device: "Server-01",
    description: "Hardware inspection",
    date: "2026-10-20",
    scheduled: false,
  },
];

const locationSummaries = [
  { name: "Serverrum A", deviceCount: 12 },
  { name: "Kontor 101", deviceCount: 7 },
  { name: "Kontor 202", deviceCount: 5 },
];

const quickLinks = [
  { label: "Devices", href: "/devices" },
  { label: "Locations", href: "/locations" },
  { label: "VLANs", href: "/vlan" },
  { label: "Maintenance", href: "/maintenance" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Network Management
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Overview of your network infrastructure.
            </p>
          </div>

          <Link
            href="/devices"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View devices
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>

        {/* Summary cards */}
        <section
          aria-label="Network statistics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {summaryCards.map((card) => (
            <SummaryCard
              key={card.title}
              title={card.title}
              value={card.value}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </section>

        {/* Main dashboard content */}
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="min-w-0 xl:col-span-2">
            <MaintenanceOverview events={maintenanceEvents} />
          </div>

          <div className="min-w-0">
            <NetworkOverview locations={locationSummaries} />
          </div>
        </div>

        {/* Quick actions */}
        <section className="mt-8">
          <h2 className="mb-4 text-base font-semibold text-slate-900">
            Quick access
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <span className="text-sm font-medium text-slate-700 transition group-hover:text-blue-700">
                  {link.label}
                </span>

                <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-blue-600" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}