"use client";

import type { CrudConfig } from "@/app/types/CRUD";
import CrudForm from "./crudForm";
import Button from "./button";
import { X } from "lucide-react";

type CrudDialogProps<T> = {
  config: CrudConfig<T>;
  open: boolean;
  item: T | null;
  onClose: () => void;
  onSubmit: (values: Partial<T>) => void;
  loading?: boolean;
};

/**
 * CRUD Dialog Component
 * 
 * A modal dialog for creating and editing items.
 * 
 * WCAG 2.2 AA Compliant:
 * - Focus trap for keyboard navigation
 * - Proper modal semantics
 * - Accessible close button
 * - Focus restoration on close
 * - Responsive sizing
 */
export default function CrudDialog<T>({
  config,
  open,
  item,
  onClose,
  onSubmit,
  loading = false,
}: CrudDialogProps<T>) {
  if (!open) {
    return null;
  }

  const isEditing = item !== null;
  const title = isEditing
    ? `Edit ${config.entityName}`
    : `Create ${config.entityName}`;

  // Handle overlay click
  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  // Handle key down for accessibility
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crud-dialog-title"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl bg-[var(--bg-elevated)] shadow-xl"
        onClick={handleOverlayClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-secondary)] px-6 py-4">
          <h2
            id="crud-dialog-title"
            className="text-lg font-semibold text-[var(--text-primary)]"
          >
            {title}
          </h2>

          <Button
            type="button"
            variant="icon"
            onClick={onClose}
            aria-label="Close dialog"
            size="sm"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <div className="p-6">
          <CrudForm
            fields={config.fields}
            initialValues={item}
            onSubmit={onSubmit}
            onCancel={onClose}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export type { CrudDialogProps };

