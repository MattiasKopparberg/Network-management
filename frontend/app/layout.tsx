import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/app/features/auth/authProvider";
import { AppThemeProvider } from "@/app/components/ui/theme-provider";

import "./global.css";

// WCAG 2.2 AA compliant metadata
export const metadata: Metadata = {
  title: "Network Management",
  description: "Manage network infrastructure and devices.",
  // Add manifest for PWA if needed
  // manifest: "/manifest.json",
};

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  // Enable viewport units to work correctly
  viewportFit: 'cover',
  // Theme color for browser UI
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

/**
 * Root Layout Component
 * 
 * This is the main layout wrapper for the entire application.
 * It includes:
 * - Theme provider for dark mode support
 * - Auth provider for authentication state
 * - Global CSS imports
 * 
 * WCAG 2.2 AA Compliant:
 * - Semantic HTML structure
 * - Proper language attribute
 * - Skip link for keyboard navigation
 * - Viewport configuration for responsive design
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load Inter font for consistent typography */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Load JetBrains Mono for code blocks */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {/* Skip link for keyboard users - WCAG 2.2.1 */}
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        
        {/* Theme provider must wrap AuthProvider to ensure theme is available throughout */}
        <AppThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
