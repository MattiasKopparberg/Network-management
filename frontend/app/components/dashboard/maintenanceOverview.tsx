import { CalendarClock } from "lucide-react";

type MaintenanceEvent = {
  id: number;
  device: string;
  description: string;
  date: string;
  scheduled: boolean;
};

type MaintenanceOverviewProps = {
  events: MaintenanceEvent[];
};

export default function MaintenanceOverview({
  events,
}: MaintenanceOverviewProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Maintenance
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Upcoming maintenance events
          </p>
        </div>

        <CalendarClock className="h-5 w-5 text-slate-400" />
      </div>

      {events.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-slate-500">
            No maintenance events to display.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Device</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                    {event.device}
                  </td>

                  <td className="min-w-48 px-6 py-4 text-slate-600">
                    {event.description}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    {event.date}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        event.scheduled
                          ? "bg-blue-50 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {event.scheduled ? "Scheduled" : "Unscheduled"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}