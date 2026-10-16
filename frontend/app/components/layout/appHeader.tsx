
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronRight, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/app/config/navigation";
import { useAuth } from "@/app/features/auth/authProvider";

type AppHeaderProps = {
  onMenuClick: () => void;
};

export default function AppHeader({
  onMenuClick,
}: AppHeaderProps) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const currentPage = [...navigationItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/dashboard" &&
          pathname.startsWith(`${item.href}/`))
    );

  const title = currentPage?.label ?? "Network Management";

  const handleLogout = async () => {
    setLogoutError(null);
    setLoggingOut(true);

    try {
      await logout();
    } catch {
      setLogoutError("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden text-sm text-slate-400 sm:inline">
            Network Manager
          </span>

          <ChevronRight className="hidden h-4 w-4 text-slate-300 sm:inline" />

          <h1 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {loading ? (
          <span
            className="text-sm text-slate-400"
            aria-label="Checking authentication"
          >
            Loading...
          </span>
        ) : user ? (
          <>
            <span
              className="hidden max-w-48 truncate text-sm text-slate-600 sm:inline"
              title={user.email}
            >
              {user.email}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Sign up
            </Link>
          </>
        )}
      </div>

      {logoutError && (
        <p
          role="alert"
          className="absolute right-4 top-full mt-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 shadow-sm"
        >
          {logoutError}
        </p>
      )}
    </header>
  );
}
