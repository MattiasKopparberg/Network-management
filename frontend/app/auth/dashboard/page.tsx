
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
  { label: "Devices", href: "/devices" },
  { label: "Locations", href: "/locations" },
  { label: "VLANs", href: "/vlan" },
  { label: "Maintenance", href: "/maintenance" },
];

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
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Network Management
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Overview of your network infrastructure.
          </p>
        </div>

        <div className="w-full sm:w-64">
          <label
            htmlFor="account"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Customer account
          </label>

          <select
            id="account"
            value={accountId}
            onChange={(event) => setAccountId(event.target.value)}
            disabled={loadingAccounts || accounts.length === 0}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
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

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {!loadingAccounts && accounts.length === 0 && !error && (
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">
            No customer accounts yet
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Your account needs to be created or you need an invitation
            before you can access network resources.
          </p>
        </section>
      )}

      {selectedAccount && (
        <>
          <section
            aria-label="Network statistics"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2"
          >
            <SummaryCard
              title="Total devices"
              value={loadingData ? 0 : devices.length}
              description="Devices in this account"
              icon={Monitor}
            />
            <SummaryCard
              title="Locations"
              value={loadingData ? 0 : locations.length}
              description="Registered locations in this account"
              icon={MapPin}
            />
          </section>

          {loadingData && (
            <p className="text-sm text-slate-500" role="status">
              Loading {selectedAccount.name} data...
            </p>
          )}

          {!loadingData && !error && (
            <NetworkOverview locations={locationSummaries} />
          )}

          <section>
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
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                    {link.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
