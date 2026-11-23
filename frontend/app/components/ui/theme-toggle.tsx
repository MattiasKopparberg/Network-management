"use client";

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

type ThemeToggleProps = {
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Theme Toggle Component
 * 
 * Allows users to switch between light, dark, and system themes.
 * 
 * WCAG 2.2 AA Compliant:
 * - Keyboard accessible
 * - Clear visual feedback
 * - Appropriate contrast ratios
 * - Accessible labels
 */
export default function ThemeToggle({ size = 'md' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent flash of wrong theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-9 w-9 text-base',
  };

  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18;

  if (!mounted) {
    // Return a placeholder to prevent layout shift
    const minWidth = size === 'sm' ? '72px' : size === 'md' ? '84px' : '96px';
    return (
      <div
        className={`flex items-center gap-1 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-1`}
        style={{ minWidth }}
      >
        <div className={`flex h-[${sizeClasses[size].split(' ')[0]}] w-[${sizeClasses[size].split(' ')[1]}] items-center justify-center rounded-md`} />
        <div className={`flex h-[${sizeClasses[size].split(' ')[0]}] w-[${sizeClasses[size].split(' ')[1]}] items-center justify-center rounded-md`} />
        <div className={`flex h-[${sizeClasses[size].split(' ')[0]}] w-[${sizeClasses[size].split(' ')[1]}] items-center justify-center rounded-md`} />
      </div>
    );
  }

  const isActive = (t: string) => theme === t;

  return (
    <div
      role="group"
      aria-label="Theme selector"
      className="flex items-center gap-1 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-1"
    >
      {/* Light mode button */}
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Switch to light mode"
        aria-pressed={isActive('light')}
        className={`flex items-center justify-center rounded-md transition-colors ${
          isActive('light')
            ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        } ${sizeClasses[size]}`}
      >
        <Sun size={iconSize} />
      </button>

      {/* System mode button */}
      <button
        type="button"
        onClick={() => setTheme('system')}
        aria-label="Switch to system preference"
        aria-pressed={isActive('system')}
        className={`flex items-center justify-center rounded-md transition-colors ${
          isActive('system')
            ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        } ${sizeClasses[size]}`}
      >
        <Monitor size={iconSize} />
      </button>

      {/* Dark mode button */}
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-label="Switch to dark mode"
        aria-pressed={isActive('dark')}
        className={`flex items-center justify-center rounded-md transition-colors ${
          isActive('dark')
            ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        } ${sizeClasses[size]}`}
      >
        <Moon size={iconSize} />
      </button>
    </div>
  );
}

export type { ThemeToggleProps };
