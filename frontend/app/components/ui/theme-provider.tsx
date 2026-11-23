"use client";

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

type AppThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * Custom Theme Provider for Network Management Application
 * 
 * This provider wraps next-themes to add custom functionality:
 * - Prevents flash of wrong theme on initial load
 * - Adds custom theme detection logic
 * - Provides additional context if needed
 */
export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent flash of wrong theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render children until mounted to prevent flash
  if (!mounted) {
    // Return a minimal loading state that matches both themes
    return (
      <div className="min-h-screen bg-[var(--bg-secondary)]">
        <div className="flex h-screen items-center justify-center">
          <div className="animate-pulse text-[var(--text-primary)]">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

// Re-export next-themes useTheme hook for convenience
export { useTheme } from 'next-themes';
