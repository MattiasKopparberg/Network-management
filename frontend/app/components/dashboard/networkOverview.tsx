import { Network } from "lucide-react";

export type LocationSummary = {
  name: string;
  deviceCount: number;
};

type NetworkOverviewProps = {
  locations: LocationSummary[];
};

/**
 * Network Overview Component
 * 
 * A component for displaying device distribution across locations.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper semantic structure
 * - Accessible visual indicators
 * - Sufficient contrast
 * - Keyboard navigation
 */
export default function NetworkOverview({
  locations,
}: NetworkOverviewProps) {
  const maxDevices = Math.max(
    ...locations.map((location) => location.deviceCount),
    1
  );

  if (locations.length === 0) {
    return (
      <section className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              Network overview
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Devices by location
            </p>
          </div>

          <div className="rounded-lg bg-[var(--brand-light)] p-3">
            <Network className="h-5 w-5 text-[var(--brand-primary)]" />
          </div>
        </div>

        <p className="py-8 text-center text-sm text-[var(--text-tertiary)]">
          No location data available.
        </p>
      </section>
    );
  }

  return (
    <section
      className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-6"
      aria-label="Network overview by location"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            Network overview
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Devices by location
          </p>
        </div>

        <div className="rounded-lg bg-[var(--brand-light)] p-3">
          <Network className="h-5 w-5 text-[var(--brand-primary)]" />
        </div>
      </div>

      <div className="mt-6 space-y-5" role="list">
        {locations.map((location, index) => (
          <div
            key={location.name}
            role="listitem"
            aria-label={`${location.name}: ${location.deviceCount} devices`}
          >
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="truncate text-sm font-medium text-[var(--text-primary)]">
                {location.name}
              </span>

              <span className="text-sm tabular-nums text-[var(--text-secondary)]">
                {location.deviceCount}
              </span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-[var(--border-secondary)]"
              role="progressbar"
              aria-valuenow={location.deviceCount}
              aria-valuemin={0}
              aria-valuemax={maxDevices}
              aria-label={`Progress: ${location.deviceCount} of ${maxDevices}`}
            >
              <div
                className="h-full rounded-full bg-[var(--brand-primary)] transition-all duration-300"
                style={{
                  width: `${(location.deviceCount / maxDevices) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
