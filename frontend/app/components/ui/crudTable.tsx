import type { CrudConfig } from "@/app/types/CRUD";

type CrudTableProps<T> = {
  config: CrudConfig<T>;
  data: T[];
  loading: boolean;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
};

export default function CrudTable<T>({
  config,
  data,
  loading,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center px-6 py-12">
        <p className="text-sm text-slate-500">
          Loading...
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <p className="text-sm font-medium text-slate-700">
          No {config.entityName.toLowerCase()}s found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Add a new {config.entityName.toLowerCase()} to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            {config.columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {column.label}
              </th>
            ))}

            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr
              key={String(config.getId(item))}
              className="transition hover:bg-slate-50"
            >
              {config.columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 text-slate-700"
                >
                  {column.render
                    ? column.render(item)
                    : String(
                        item[column.key as keyof T] ?? ""
                      )}
                </td>
              ))}

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}