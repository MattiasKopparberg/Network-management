"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/app/components/ui/crudTable";
import CrudDialog from "@/app/components/ui/crudDialog";
import type { CrudConfig } from "@/app/types/CRUD";

type CrudManagerProps<T> = {
  config: CrudConfig<T>;
};

export default function CrudManager<T>({
  config,
}: CrudManagerProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  async function fetchData() {
    setLoading(true);

    try {
      const response = await fetch(config.endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
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

    if (!confirm("Are you sure you want to delete this item?")) {
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

      await fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(values: Partial<T>) {
    const isEditing = editingItem !== null;

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

      await fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {config.title}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your {config.entityName.toLowerCase()} records.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="mr-2 text-lg leading-none">+</span>
            Add {config.entityName}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
          onClose={() => setDialogOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}