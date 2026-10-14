"use client";

import { useState } from "react";
import type { CrudField } from "@/app/types/CRUD";

type CrudFormProps<T> = {
  fields: CrudField<T>[];
  initialValues?: T | null;
  onSubmit: (values: Partial<T>) => void;
  onCancel: () => void;
};

export default function CrudForm<T>({
  fields,
  initialValues,
  onSubmit,
  onCancel,
}: CrudFormProps<T>) {
  const [values, setValues] = useState<Record<string, unknown>>(
    initialValues ? { ...initialValues } : {}
  );

  function handleChange(name: string, value: unknown) {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit(values as Partial<T>);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => {
        const value = values[field.name];

        return (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              {field.label}
              {field.required && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </label>

            {field.type === "text" && (
              <input
                id={field.name}
                type="text"
                value={String(value ?? "")}
                required={field.required}
                onChange={(event) =>
                  handleChange(field.name, event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            )}

            {field.type === "number" && (
              <input
                id={field.name}
                type="number"
                value={String(value ?? "")}
                required={field.required}
                onChange={(event) =>
                  handleChange(
                    field.name,
                    event.target.value === ""
                      ? ""
                      : Number(event.target.value)
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            )}

            {field.type === "date" && (
              <input
                id={field.name}
                type="date"
                value={String(value ?? "")}
                required={field.required}
                onChange={(event) =>
                  handleChange(field.name, event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            )}

            {field.type === "select" && (
              <select
                id={field.name}
                value={String(value ?? "")}
                required={field.required}
                onChange={(event) =>
                  handleChange(field.name, event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Select...</option>

                {field.options?.map((option) => (
                  <option
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <div className="flex items-center">
                <input
                  id={field.name}
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={(event) =>
                    handleChange(field.name, event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}