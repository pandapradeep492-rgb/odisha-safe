import { useState } from 'react';
import { Siren, RefreshCw } from 'lucide-react';
import { RiskBadge, StatusBadge, DemoBadge } from '../../components/ui/Badges.jsx';
import { LoadingState, ErrorMessage, EmptyState } from '../../components/ui/StateViews.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import { useResource } from '../../services/hooks.js';
import { AlertsService } from '../../services/resources.js';
import { ApiError } from '../../services/api.js';
import { alerts as demoAlerts } from '../../data/demoData.js';
import { formatDateTime } from '../../utils/helpers.js';

/**
 * Alerts management: toggle Active/Resolved. Offline-safe via local demo data.
 */
export default function AdminAlerts() {
  const { notify } = useNotification();
  const { data, source, loading, error, reload, setData } = useResource(
    () => AlertsService.list(),
    () => [...demoAlerts],
    []
  );
  const [busy, setBusy] = useState(null);

  const toggle = async (alert) => {
    const next = alert.status === 'Active' ? 'Resolved' : 'Active';
    setBusy(alert.id);
    try {
      await AlertsService.update(alert.id, { status: next });
      notify.success(`Alert ${alert.id} → ${next}.`);
    } catch (err) {
      if (err instanceof ApiError) {
        notify.error(err.message || 'Could not update alert.');
        setBusy(null);
        return;
      }
      notify.info(`Updated locally (demo): ${next}.`);
    }
    setData((prev) => (prev || []).map((a) => (a.id === alert.id ? { ...a, status: next } : a)));
    setBusy(null);
  };

  const rows = data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Alerts</h2>
          <p className="text-sm text-slate-600">Manage active and resolved disaster alerts (demo).</p>
        </div>
        <div className="flex items-center gap-2">
          {source === 'demo' && <DemoBadge label="Demo data" />}
          <button onClick={reload} className="btn-secondary">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {loading && <LoadingState message="Loading alerts…" />}
      {!loading && error && <ErrorMessage message="Unable to load alerts." onRetry={reload} />}
      {!loading && !error && rows.length === 0 && (
        <EmptyState icon={Siren} title="No alerts" message="There are no alerts to manage." />
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Disaster</th>
                  <th className="px-4 py-3">District</th>
                  <th className="px-4 py-3">Risk</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Issued</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{a.disasterType}</td>
                    <td className="px-4 py-3 text-slate-600">{a.district}</td>
                    <td className="px-4 py-3">
                      <RiskBadge level={a.riskLevel} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDateTime(a.issuedAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        disabled={busy === a.id}
                        onClick={() => toggle(a)}
                        className={a.status === 'Active' ? 'btn-secondary' : 'btn-primary'}
                      >
                        {a.status === 'Active' ? 'Resolve' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
