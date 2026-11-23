"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronRight, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/app/config/navigation";
import { useAuth } from "@/app/features/auth/authProvider";
import ThemeToggle from "@/app/components/ui/theme-toggle";

type AppHeaderProps = {
  onMenuClick: () => void;
  mobileOpen: boolean;
};

/**
 * App Header Component
 * 
 * The header bar for authenticated pages.
 * Includes navigation toggle, page title, and user actions.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper heading hierarchy
 * - Keyboard navigation
 * - Focus indicators
 * - Semantic HTML
 * - Responsive design
 */
export default function AppHeader({
  onMenuClick,
  mobileOpen,
}: AppHeaderProps) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Get current page title from navigation
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
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border-primary)] bg-[var(--bg-elevated)]/95 px-4 backdrop-blur sm:px-6"
      aria-label="Page header"
    >
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="sidebar-navigation"
          className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors
            hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2
            md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb */}
        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden text-sm text-[var(--text-tertiary)] sm:inline">
            Network Manager
          </span>

          <ChevronRight className="hidden h-4 w-4 text-[var(--text-tertiary)] sm:inline" />

          <h1 className="truncate text-sm font-semibold text-[var(--text-primary)] sm:text-base">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <ThemeToggle size="sm" />

        {/* User status */}
        {loading ? (
          <span
            className="text-sm text-[var(--text-tertiary)]"
            aria-label="Checking authentication"
          >
            Loading...
          </span>
        ) : user ? (
          <>
            <span
              className="hidden max-w-48 truncate text-sm text-[var(--text-secondary)] sm:inline"
              title={user.email}
            >
              {user.email}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label={loggingOut ? "Logging out" : "Logout"}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-primary)]
                px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors
                hover:bg-[var(--bg-secondary)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors
                hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-[var(--brand-primary)] px-3 py-2 text-sm font-medium text-white
                transition-colors hover:bg-[var(--brand-dark)]"
            >
              Sign up
            </Link>
          </>
        )}
      </div>

      {/* Logout error message */}
      {logoutError && (
        <p
          role="alert"
          className="absolute right-4 top-full mt-2 rounded-lg border border-[var(--error-light)]
            bg-[var(--error-light)]/20 px-3 py-2 text-sm text-[var(--error-dark)] shadow-sm"
        >
          {logoutError}
        </p>
      )}
    </header>
  );
}
