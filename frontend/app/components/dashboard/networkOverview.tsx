import { Network } from "lucide-react";

export type LocationSummary = {
  name: string;
  deviceCount: number;
};

type NetworkOverviewProps = {
  locations: LocationSummary[];
};

export default function NetworkOverview({
  locations,
}: NetworkOverviewProps) {
  const maxDevices = Math.max(
    ...locations.map((location) => location.deviceCount),
    1
  );

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Network overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Devices by location
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3">
          <Network className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {locations.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          No location data available.
        </p>
      ) : (
        <div className="mt-6 space-y-5">
          {locations.map((location) => (
            <div key={location.name}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="truncate text-sm font-medium text-slate-700">
                  {location.name}
                </span>

                <span className="text-sm tabular-nums text-slate-500">
                  {location.deviceCount}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${
                      (location.deviceCount / maxDevices) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}