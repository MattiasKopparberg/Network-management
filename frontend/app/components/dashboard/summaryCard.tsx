"use client";

import type { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

export default function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}