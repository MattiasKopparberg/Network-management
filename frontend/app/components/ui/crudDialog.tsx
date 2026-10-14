"use client";

import type { CrudConfig } from "@/app/types/CRUD";
import CrudForm from "./crudForm";

type CrudDialogProps<T> = {
  config: CrudConfig<T>;
  open: boolean;
  item: T | null;
  onClose: () => void;
  onSubmit: (values: Partial<T>) => void;
};

export default function CrudDialog<T>({
  config,
  open,
  item,
  onClose,
  onSubmit,
}: CrudDialogProps<T>) {
  if (!open) {
    return null;
  }

  const isEditing = item !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing
              ? `Edit ${config.entityName}`
              : `Create ${config.entityName}`}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <CrudForm
            fields={config.fields}
            initialValues={item}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}