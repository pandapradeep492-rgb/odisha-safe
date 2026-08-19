import { useMemo, useState } from 'react';
import { FileText, Eye, Check, X, UserCheck, RefreshCw } from 'lucide-react';
import FilterBar from '../../components/Filters.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { StatusBadge, DemoBadge } from '../../components/ui/Badges.jsx';
import { LoadingState, ErrorMessage, EmptyState } from '../../components/ui/StateViews.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import { useResource } from '../../services/hooks.js';
import { ReportsService } from '../../services/resources.js';
import { ApiError } from '../../services/api.js';
import { reports as demoReports } from '../../data/demoData.js';
import { DISTRICTS, DISASTER_TYPES, REPORT_STATUSES } from '../../data/constants.js';
import { formatDateTime } from '../../utils/helpers.js';

/**
 * Reports management: view details + change status (verify, reject, assign,
 * update, resolve). Falls back to updating local demo data offline.
 */
export default function AdminReports() {
  const { notify } = useNotification();
  const { data, source, loading, error, reload, setData } = useResource(
    () => ReportsService.list(),
    () => [...demoReports],
    []
  );

  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [district, setDistrict] = useState('');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => {
    const list = data || [];
    return list.filter(
      (r) =>
        (!status || r.status === status) &&
        (!type || r.disasterType === type) &&
        (!district || r.district === district)
    );
  }, [data, status, type, district]);

  const applyStatus = async (report, newStatus) => {
    try {
      await ReportsService.updateStatus(report.reportId, newStatus);
      notify.success(`Report ${report.reportId} → ${newStatus}.`);
    } catch (err) {
      if (err instanceof ApiError) {
        notify.error(err.message || 'Could not update status.');
        return;
      }
      // Offline: update locally so the demo still works.
      notify.info(`Updated locally (demo): ${newStatus}.`);
    }
    setData((prev) =>
      (prev || []).map((r) => (r.reportId === report.reportId ? { ...r, status: newStatus } : r))
    );
    setSelected((s) => (s && s.reportId === report.reportId ? { ...s, status: newStatus } : s));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Reports</h2>
          <p className="text-sm text-slate-600">Review and manage citizen disaster reports.</p>
        </div>
        <div className="flex items-center gap-2">
          {source === 'demo' && <DemoBadge label="Demo data" />}
          <button onClick={reload} className="btn-secondary">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      <FilterBar
        filters={[
          { key: 'status', label: 'Status', value: status, options: REPORT_STATUSES, onChange: setStatus },
          { key: 'type', label: 'Type', value: type, options: DISASTER_TYPES, onChange: setType },
          { key: 'district', label: 'District', value: district, options: DISTRICTS, onChange: setDistrict },
        ]}
      />

      {loading && <LoadingState message="Loading reports…" />}
      {!loading && error && <ErrorMessage message="Unable to load reports." onRetry={reload} />}
      {!loading && !error && rows.length === 0 && (
        <EmptyState icon={FileText} title="No reports found" message="Try adjusting the filters." />
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Report ID</th>
                  <th className="px-4 py-3">Disaster</th>
                  <th className="px-4 py-3">District</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.reportId} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{r.reportId}</td>
                    <td className="px-4 py-3 text-slate-700">{r.disasterType}</td>
                    <td className="px-4 py-3 text-slate-600">{r.district}</td>
                    <td className="px-4 py-3 text-slate-600">{r.severity}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDateTime(r.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelected(r)}
                          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-brand-700"
                          aria-label="View report"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => applyStatus(r, 'Verified')}
                          className="rounded-md p-1.5 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                          aria-label="Verify report"
                          title="Verify"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => applyStatus(r, 'Assigned')}
                          className="rounded-md p-1.5 text-slate-500 hover:bg-indigo-50 hover:text-indigo-700"
                          aria-label="Assign report"
                          title="Assign"
                        >
                          <UserCheck size={16} />
                        </button>
                        <button
                          onClick={() => applyStatus(r, 'Rejected')}
                          className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-700"
                          aria-label="Reject report"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Report ${selected.reportId}` : ''}
        footer={
          selected && (
            <>
              <button className="btn-secondary" onClick={() => applyStatus(selected, 'In Progress')}>
                Mark In Progress
              </button>
              <button className="btn-primary" onClick={() => applyStatus(selected, 'Resolved')}>
                Resolve
              </button>
            </>
          )
        }
      >
        {selected && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <StatusBadge status={selected.status} />
              <span className="text-xs text-slate-400">{formatDateTime(selected.createdAt)}</span>
            </div>
            <Detail label="Reporter" value={selected.name} />
            <Detail label="Mobile" value={selected.mobile} />
            <Detail label="Disaster" value={selected.disasterType} />
            <Detail label="District" value={selected.district} />
            <Detail label="Location" value={selected.location} />
            <Detail label="Severity" value={selected.severity} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</p>
              <p className="mt-1 text-slate-700">{selected.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-right text-slate-700">{value}</span>
    </div>
  );
}
