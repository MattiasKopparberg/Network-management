"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Monitor,
  Network,
} from "lucide-react";

import SummaryCard from "@/app/components/dashboard/summaryCard";
import NetworkOverview from "@/app/components/dashboard/networkOverview";
import Button from "@/app/components/ui/button";
import Alert from "@/app/components/ui/alert";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.kopparberg.dev");

type Account = {
  id: number;
  name: string;
  role: "owner" | "admin" | "viewer";
};

type Location = {
  id: number;
  address: string;
  coordinates: string;
  floor: number;
};

type Device = {
  device_id: number;
  location_id: number | null;
};

const quickLinks = [
  { label: "Devices", href: "/devices", icon: Monitor },
  { label: "Locations", href: "/locations", icon: MapPin },
  { label: "VLANs", href: "/vlan", icon: Network },
  { label: "Maintenance", href: "/maintenance", icon: CalendarClock },
];

// Import CalendarClock from lucide-react
import { CalendarClock } from "lucide-react";

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountId, setAccountId] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAccounts() {
      try {
        const response = await fetch(`${API_URL}/accounts`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Could not load your accounts.");
        }

        const result = await response.json();
        const availableAccounts: Account[] = result.accounts;

        if (!cancelled) {
          setAccounts(availableAccounts);

          if (availableAccounts.length > 0) {
            setAccountId(String(availableAccounts[0].id));
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load your accounts.",
          );
        }
      } finally {
        if (!cancelled) setLoadingAccounts(false);
      }
    }

    void loadAccounts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!accountId) {
      setDevices([]);
      setLocations([]);
      return;
    }

    let cancelled = false;

    async function loadDashboard() {
      setLoadingData(true);
      setError(null);

      try {
        const headers = { "x-account-id": accountId };

        const [deviceResponse, locationResponse] = await Promise.all([
          fetch(`${API_URL}/devices`, {
            credentials: "include",
            headers,
          }),
          fetch(`${API_URL}/locations`, {
            credentials: "include",
            headers,
          }),
        ]);

        if (!deviceResponse.ok || !locationResponse.ok) {
          throw new Error(
            "Could not load dashboard data for this account.",
          );
        }

        const [deviceData, locationData] = await Promise.all([
          deviceResponse.json(),
          locationResponse.json(),
        ]);

        if (!cancelled) {
          setDevices(deviceData);
          setLocations(locationData);
        }
      } catch (err) {
        if (!cancelled) {
          setDevices([]);
          setLocations([]);
          setError(
            err instanceof Error
              ? err.message
              : "Could not load dashboard data.",
          );
        }
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    }

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [accountId]);

  const locationSummaries = locations.map((location) => ({
    name: location.address,
    deviceCount: devices.filter(
      (device) => device.location_id === location.id,
    ).length,
  }));

  const selectedAccount = accounts.find(
    (account) => String(account.id) === accountId,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8" id="main-content">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--brand-primary)]">
            Network Management
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Overview of your network infrastructure.
          </p>
        </div>

        <div className="w-full sm:w-64">
          <label
            htmlFor="account"
            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
          >
            Customer account
          </label>

          <select
            id="account"
            value={accountId}
            onChange={(event) => setAccountId(event.target.value)}
            disabled={loadingAccounts || accounts.length === 0}
            className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed"
          >
            {loadingAccounts && <option>Loading accounts...</option>}

            {!loadingAccounts && accounts.length === 0 && (
              <option value="">No accounts available</option>
            )}

            {accounts.map((account) => (
              <option key={account.id} value={String(account.id)}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Error message */}
      {error && (
        <Alert variant="error" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {/* Empty state for no accounts */}
      {!loadingAccounts && accounts.length === 0 && !error && (
        <section className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-6">
          <h2 className="font-semibold text-[var(--text-primary)]">
            No customer accounts yet
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Your account needs to be created or you need an invitation
            before you can access network resources.
          </p>
        </section>
      )}

      {/* Dashboard content */}
      {selectedAccount && (
        <>
          {/* Statistics cards */}
          <section
            aria-label="Network statistics"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2"
          >
            <SummaryCard
              title="Total devices"
              value={loadingData ? "..." : devices.length}
              description="Devices in this account"
              icon={Monitor}
            />
            <SummaryCard
              title="Locations"
              value={loadingData ? "..." : locations.length}
              description="Registered locations in this account"
              icon={MapPin}
            />
          </section>

          {/* Loading state */}
          {loadingData && (
            <p className="text-sm text-[var(--text-secondary)]" role="status">
              Loading {selectedAccount.name} data...
            </p>
          )}

          {/* Network overview */}
          {!loadingData && !error && (
            <NetworkOverview locations={locationSummaries} />
          )}

          {/* Quick access */}
          <section>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                Quick access
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Jump to any section
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-tertiary)] group-hover:text-[var(--brand-primary)]" />
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
