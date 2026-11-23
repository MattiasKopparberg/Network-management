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

/**
 * Maintenance Overview Component
 * 
 * Displays upcoming maintenance events in a table format.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper semantic table structure
 * - Accessible text contrast
 * - Clear visual hierarchy
 * - Keyboard navigation support
 */
export default function MaintenanceOverview({
  events,
}: MaintenanceOverviewProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--border-secondary)] px-6 py-5">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            Maintenance
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Upcoming maintenance events
          </p>
        </div>

        <CalendarClock className="h-5 w-5 text-[var(--text-tertiary)]" />
      </div>

      {events.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            No maintenance events to display.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--bg-secondary)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
              <tr>
                <th className="px-6 py-3 font-medium">Device</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border-secondary)]">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="transition hover:bg-[var(--bg-secondary)]"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-[var(--text-primary)]">
                    {event.device}
                  </td>

                  <td className="min-w-48 px-6 py-4 text-[var(--text-secondary)]">
                    {event.description}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-[var(--text-secondary)]">
                    {event.date}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        event.scheduled
                          ? "bg-[var(--brand-light)] text-[var(--brand-dark)]"
                          : "bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
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
