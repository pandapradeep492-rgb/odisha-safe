import { LifeBuoy, RefreshCw, Users } from 'lucide-react';
import { DemoBadge } from '../../components/ui/Badges.jsx';
import { LoadingState, ErrorMessage, EmptyState } from '../../components/ui/StateViews.jsx';
import { useResource } from '../../services/hooks.js';
import { SheltersService } from '../../services/resources.js';
import { shelters as demoShelters } from '../../data/demoData.js';

/**
 * Shelters management (read-focused table for the prototype).
 */
export default function AdminShelters() {
  const { data, source, loading, error, reload } = useResource(
    () => SheltersService.list(),
    () => [...demoShelters],
    []
  );

  const rows = data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Shelters</h2>
          <p className="text-sm text-slate-600">Overview of registered shelters and capacity (demo).</p>
        </div>
        <div className="flex items-center gap-2">
          {source === 'demo' && <DemoBadge label="Demo data" />}
          <button onClick={reload} className="btn-secondary">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {loading && <LoadingState message="Loading shelters…" />}
      {!loading && error && <ErrorMessage message="Unable to load shelters." onRetry={reload} />}
      {!loading && !error && rows.length === 0 && (
        <EmptyState icon={LifeBuoy} title="No shelters" message="No shelters are registered." />
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((s) => {
            const ratio = s.capacity ? s.available / s.capacity : 0;
            const tone = ratio > 0.5 ? 'bg-emerald-500' : ratio > 0.2 ? 'bg-amber-500' : 'bg-red-500';
            return (
              <div key={s.id} className="card p-4">
                <h3 className="text-sm font-semibold text-slate-900">{s.name}</h3>
                <p className="text-xs text-slate-500">{s.district}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Users size={13} /> {s.available}/{s.capacity}
                  </span>
                  <span>{Math.round(ratio * 100)}% free</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.max(4, ratio * 100)}%` }} />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.facilities?.map((f) => (
                    <span key={f} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
