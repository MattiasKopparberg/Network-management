"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import AppSidebar from "./appSidebar";
import AppHeader from "./appHeader";

type AppShellProps = {
  children: ReactNode;
};

/**
 * App Shell Component
 * 
 * The main layout shell for authenticated pages.
 * Includes sidebar navigation and header.
 * 
 * WCAG 2.2 AA Compliant:
 * - Skip link support
 * - Keyboard navigation
 * - Responsive design
 * - Proper semantic structure
 * - Focus management
 */
export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeSidebar() {
    setMobileOpen(false);
  }

  // Handle escape key to close sidebar
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape" && mobileOpen) {
      closeSidebar();
    }
  }

  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AppSidebar
        mobileOpen={mobileOpen}
        onClose={closeSidebar}
      />

      <div className="min-h-screen md:pl-64">
        <AppHeader
          onMenuClick={() => setMobileOpen(true)}
          mobileOpen={mobileOpen}
        />

        <main
          id="main-content"
          className="min-w-0 p-4 sm:p-6 lg:p-8"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--bg-overlay)] backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
