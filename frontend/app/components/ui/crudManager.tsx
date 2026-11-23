"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/app/components/ui/crudTable";
import CrudDialog from "@/app/components/ui/crudDialog";
import Button from "@/app/components/ui/button";
import type { CrudConfig } from "@/app/types/CRUD";
import { Plus } from "lucide-react";

type CrudManagerProps<T> = {
  config: CrudConfig<T>;
};

/**
 * CRUD Manager Component
 * 
 * A complete CRUD (Create, Read, Update, Delete) interface for managing data.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper heading hierarchy
 * - Accessible table and form controls
 * - Keyboard navigation support
 * - Focus management
 * - Status messages
 * - Responsive design
 */
export default function CrudManager<T>({
  config,
}: CrudManagerProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(config.endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleCreate() {
    setEditingItem(null);
    setDialogOpen(true);
  }

  function handleEdit(item: T) {
    setEditingItem(item);
    setDialogOpen(true);
  }

  async function handleDelete(item: T) {
    const id = config.getId(item);

    // WCAG: Confirmation dialog for destructive actions
    if (
      !confirm(
        `Are you sure you want to delete this ${config.entityName.toLowerCase()}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${config.endpoint}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      // Refresh data after successful deletion
      await fetchData();
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete. Please try again."
      );
    }
  }

  async function handleSubmit(values: Partial<T>) {
    const isEditing = editingItem !== null;
    setSubmitting(true);

    const url = isEditing
      ? `${config.endpoint}/${config.getId(editingItem)}`
      : config.endpoint;

    const method = isEditing ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      setDialogOpen(false);
      setEditingItem(null);

      // Refresh data after successful submission
      await fetchData();
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            {config.title}
          </h1>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Manage your {config.entityName.toLowerCase()} records.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={handleCreate}
          leftIcon={<Plus className="h-5 w-5" />}
          aria-label={`Add new ${config.entityName}`}
        >
          Add {config.entityName}
        </Button>
      </header>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-[var(--error-light)] bg-[var(--error-light)]/20 px-4 py-3 text-sm text-[var(--error-dark)]"
        >
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-elevated)]">
        <CrudTable
          config={config}
          data={data}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Dialog */}
      <CrudDialog
        config={config}
        open={dialogOpen}
        item={editingItem}
        onClose={() => {
          setDialogOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
}

export type { CrudManagerProps };

