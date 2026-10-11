
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

export default function AppSidebar({
  mobileOpen,
  onClose,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Network className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Network Manager
              </p>
              <p className="text-xs text-slate-500">
                Infrastructure
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-6 overflow-y-auto px-3 py-5"
        >
          {navigationGroups.map((group) => {
            const items = navigationItems.filter(
              (item) => item.group === group.id
            );

            if (items.length === 0) {
              return null;
            }

            return (
              <div key={group.id}>
                <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {group.label}
                </h2>

                <div className="space-y-1">
                  {items.map((item) => {
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
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 shrink-0 ${
                            isActive
                              ? "text-blue-600"
                              : "text-slate-400"
                          }`}
                        />

                        <span>{item.label}</span>

                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-700">
              Network Management
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Personal project
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
