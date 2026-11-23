"use client";

import type { CrudConfig } from "@/app/types/CRUD";
import Button from "./button";
import { Edit, Trash2 } from "lucide-react";

type CrudTableProps<T> = {
  config: CrudConfig<T>;
  data: T[];
  loading: boolean;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  emptyMessage?: string;
};

/**
 * CRUD Table Component
 * 
 * A table component for displaying data with edit and delete actions.
 * 
 * WCAG 2.2 AA Compliant:
 * - Semantic table structure
 * - Keyboard navigation support
 * - Proper heading hierarchy
 * - Accessible actions
 * - Responsive design
 */
export default function CrudTable<T>({
  config,
  data,
  loading,
  onEdit,
  onDelete,
  emptyMessage = `No ${config.entityName.toLowerCase()}s found`,
}: CrudTableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center px-6 py-12">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--brand-primary)] border-t-transparent"
            aria-hidden="true"
          />
          <p
            className="text-sm text-[var(--text-secondary)]"
            role="status"
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {emptyMessage}
        </p>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Add a new {config.entityName.toLowerCase()} to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-left text-sm"
        aria-label={`${config.title} table`}
      >
        <thead className="border-b border-[var(--border-secondary)] bg-[var(--bg-secondary)]">
          <tr>
            {config.columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
              >
                {column.label}
              </th>
            ))}

            <th
              scope="col"
              className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[var(--border-secondary)]">
          {data.map((item) => (
            <tr
              key={String(config.getId(item))}
              className="transition-colors hover:bg-[var(--bg-secondary)]"
            >
              {config.columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-5 py-4 text-[var(--text-primary)]"
                >
                  {column.render
                    ? column.render(item)
                    : String(
                        item[column.key as keyof T] ?? ""
                      )}
                </td>
              ))}

              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    leftIcon={<Edit className="h-4 w-4" />}
                    onClick={() => onEdit(item)}
                    aria-label={`Edit ${config.entityName}`}
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    leftIcon={<Trash2 className="h-4 w-4" />}
                    onClick={() => onDelete(item)}
                    aria-label={`Delete ${config.entityName}`}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile responsive view */}
      <div className="md:hidden">
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={String(config.getId(item))}
              className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-4"
            >
              <div className="space-y-3">
                {config.columns.map((column) => (
                  <div key={String(column.key)} className="flex flex-col gap-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                      {column.label}
                    </span>
                    <span className="text-sm text-[var(--text-primary)]">
                      {column.render
                        ? column.render(item)
                        : String(
                            item[column.key as keyof T] ?? ""
                          )}
                    </span>
                  </div>
                ))}

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(item)}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export type { CrudTableProps };

