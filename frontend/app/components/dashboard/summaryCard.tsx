"use client";

import type { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
};

/**
 * Summary Card Component
 * 
 * A card for displaying summary statistics.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper semantic structure
 * - Accessible text and icons
 * - Sufficient contrast
 * - Responsive design
 */
export default function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {title}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-[var(--brand-light)] p-3">
          <Icon className="h-5 w-5 text-[var(--brand-primary)]" />
        </div>
      </div>

      {description && (
        <p className="mt-4 text-sm text-[var(--text-tertiary)]">
          {description}
        </p>
      )}
    </div>
  );
}
