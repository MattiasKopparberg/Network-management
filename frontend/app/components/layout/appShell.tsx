
"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import AppSidebar from "./appSidebar";
import AppHeader from "./appHeader";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({
  children,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeSidebar() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppSidebar
        mobileOpen={mobileOpen}
        onClose={closeSidebar}
      />

      <div className="min-h-screen md:pl-64">
        <AppHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
