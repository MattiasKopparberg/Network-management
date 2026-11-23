/**
 * Theme Configuration for Dark Mode
 * 
 * This file contains the theme configuration for light, dark, and system preferences.
 * Uses next-themes for theme management.
 */

import type { ThemeProviderProps } from 'next-themes';

// Theme constants
export const THEME_KEY = 'theme';

// Available theme options
export type Theme = 'light' | 'dark' | 'system';

// Theme configuration for Tailwind CSS dark mode
export const themeConfig: ThemeProviderProps = {
  
  // Default theme - follows system preference
  defaultTheme: 'system',
  
  // Available themes
  themes: ['light', 'dark', 'system'],
  
  // Enable system theme detection
  enableSystem: true,
  
  // Disable attribute selector (uses class-based dark mode)
  // This is important for Tailwind CSS v4 compatibility
  attribute: 'data-theme',
  
  // Value to use when theme is system
  value: {
    light: 'light',
    dark: 'dark',
    system: 'system',
  },
};

// CSS variables for theme colors
// These will be applied to the <html> element via Tailwind
export const themeVariables = {
  // Background colors
  'bg-primary': 'var(--bg-primary)',
  'bg-secondary': 'var(--bg-secondary)',
  'bg-tertiary': 'var(--bg-tertiary)',
  'bg-elevated': 'var(--bg-elevated)',
  
  // Text colors
  'text-primary': 'var(--text-primary)',
  'text-secondary': 'var(--text-secondary)',
  'text-tertiary': 'var(--text-tertiary)',
  'text-inverse': 'var(--text-inverse)',
  
  // Border colors
  'border-primary': 'var(--border-primary)',
  'border-secondary': 'var(--border-secondary)',
  
  // Brand colors
  'brand-primary': 'var(--brand-primary)',
  'brand-secondary': 'var(--brand-secondary)',
  
  // Status colors
  'success': 'var(--success)',
  'warning': 'var(--warning)',
  'error': 'var(--error)',
  'info': 'var(--info)',
};

// Light theme CSS variables
export const lightThemeVars = {
  '--bg-primary': '#ffffff',
  '--bg-secondary': '#f8fafc',
  '--bg-tertiary': '#f1f5f9',
  '--bg-elevated': '#ffffff',
  
  '--text-primary': '#0f172a',
  '--text-secondary': '#475569',
  '--text-tertiary': '#94a3b8',
  '--text-inverse': '#ffffff',
  
  '--border-primary': '#e2e8f0',
  '--border-secondary': '#cbd5e1',
  
  '--brand-primary': '#2563eb',
  '--brand-secondary': '#3b82f6',
  
  '--success': '#22c55e',
  '--warning': '#f59e0b',
  '--error': '#ef4444',
  '--info': '#3b82f6',
};

// Dark theme CSS variables
export const darkThemeVars = {
  '--bg-primary': '#0f172a',
  '--bg-secondary': '#1e293b',
  '--bg-tertiary': '#334155',
  '--bg-elevated': '#1e293b',
  
  '--text-primary': '#f8fafc',
  '--text-secondary': '#cbd5e1',
  '--text-tertiary': '#64748b',
  '--text-inverse': '#0f172a',
  
  '--border-primary': '#334155',
  '--border-secondary': '#475569',
  
  '--brand-primary': '#3b82f6',
  '--brand-secondary': '#60a5fa',
  
  '--success': '#22c55e',
  '--warning': '#f59e0b',
  '--error': '#ef4444',
  '--info': '#3b82f6',
};

// Tailwind CSS classes for dark mode
// Using the .dark selector approach for Tailwind v4
export const darkModeClasses = {
  bg: {
    primary: 'dark:bg-slate-950',
    secondary: 'dark:bg-slate-900',
    tertiary: 'dark:bg-slate-800',
    elevated: 'dark:bg-slate-900',
  },
  
  text: {
    primary: 'dark:text-slate-50',
    secondary: 'dark:text-slate-400',
    tertiary: 'dark:text-slate-500',
    inverse: 'dark:text-slate-950',
  },
  
  border: {
    primary: 'dark:border-slate-700',
    secondary: 'dark:border-slate-800',
  },
};
