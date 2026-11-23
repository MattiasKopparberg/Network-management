"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, X } from "lucide-react";

import {
  navigationGroups,
  navigationItems,
} from "@/app/config/navigation";

type AppSidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

/**
 * App Sidebar Component
 * 
 * The sidebar navigation for authenticated pages.
 * 
 * WCAG 2.2 AA Compliant:
 * - Keyboard navigation support
 * - Focus indicators
 * - Proper semantic structure
 * - Skip link support
 * - Responsive design
 */
export default function AppSidebar({
  mobileOpen,
  onClose,
}: AppSidebarProps) {
  const pathname = usePathname();

  // Get navigation structure
  const navGroups = navigationGroups.map((group) => {
    const items = navigationItems.filter(
      (item) => item.group === group.id
    );
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[var(--bg-overlay)] backdrop-blur-sm md:hidden"
          tabIndex={0}
        />
      )}

      <aside
        id="sidebar-navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border-primary)]
          bg-[var(--bg-elevated)] transition-transform duration-200 ease-in-out
          md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Main navigation"
        tabIndex={mobileOpen ? 0 : -1}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--border-secondary)] px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
            aria-label="Network Manager Dashboard"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-primary)] text-white">
              <Network className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                Network Manager
              </p>
              <p className="text-xs text-[var(--text-tertiary)]">
                Infrastructure
              </p>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors
              hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2
              md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-6 overflow-y-auto px-3 py-5"
        >
          {navGroups.map((group) => (
            <div key={group.id}>
              <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                {group.label}
              </h2>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                        transition-colors duration-200
                        ${isActive
                          ? "bg-[var(--brand-light)] text-[var(--brand-dark)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                        }
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive
                            ? "text-[var(--brand-dark)]"
                            : "text-[var(--text-tertiary)]"
                        }`}
                      />

                      <span>{item.label}</span>

                      {isActive && (
                        <span
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--brand-dark)]"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[var(--border-secondary)] p-4">
          <div className="rounded-lg bg-[var(--bg-secondary)] p-3">
            <p className="text-xs font-medium text-[var(--text-secondary)]">
              Network Management
            </p>
            <p className="mt-1 text-xs text-[var(--text-tertiary)]">
              Personal project
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
