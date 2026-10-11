
"use client";

import { Menu, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/app/config/navigation";

type AppHeaderProps = {
  onMenuClick: () => void;
};

export default function AppHeader({
  onMenuClick,
}: AppHeaderProps) {
  const pathname = usePathname();

  const currentPage = [...navigationItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/dashboard" &&
          pathname.startsWith(`${item.href}/`))
    );

  const title = currentPage?.label ?? "Network Management";

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
        <span className="hidden text-xs text-slate-500 sm:inline">
          Administration
        </span>

        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700"
          aria-label="Administrator"
          title="Administrator"
        >
          A
        </div>
      </div>
    </header>
  );
}
