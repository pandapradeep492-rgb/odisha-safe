import { useMemo, useState } from 'react';
import { History as HistoryIcon, Users } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import DemoBanner from '../components/ui/DemoBanner.jsx';
import FilterBar from '../components/Filters.jsx';
import { DemoBadge } from '../components/ui/Badges.jsx';
import { LoadingState, ErrorMessage, EmptyState } from '../components/ui/StateViews.jsx';
import { ChartCard, BarChartView, PieChartView, LineChartView } from '../components/charts/Charts.jsx';
import { useResource } from '../services/hooks.js';
import { HistoryService } from '../services/resources.js';
import { history as demoHistory } from '../data/demoData.js';
import { DISTRICTS, DISASTER_TYPES } from '../data/constants.js';

export default function DisasterHistory() {
  const { data, source, loading, error, reload } = useResource(
    () => HistoryService.list(),
    demoHistory,
    []
  );

  const [district, setDistrict] = useState('');
  const [type, setType] = useState('');

  const rows = useMemo(() => {
    const list = data || [];
    return list.filter(
      (r) => (!district || r.district === district) && (!type || r.disasterType === type)
    );
  }, [data, district, type]);

  // Chart aggregations (derived from the filtered rows).
  const byType = useMemo(() => {
    const m = {};
    rows.forEach((r) => (m[r.disasterType] = (m[r.disasterType] || 0) + 1));
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, [rows]);

  const byDistrict = useMemo(() => {
    const m = {};
    rows.forEach((r) => (m[r.district] = (m[r.district] || 0) + 1));
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, [rows]);

  const byYear = useMemo(() => {
    const m = {};
    rows.forEach((r) => (m[r.year] = (m[r.year] || 0) + 1));
    return Object.entries(m)
      .map(([year, value]) => ({ date: year, reports: value }))
      .sort((a, b) => Number(a.date) - Number(b.date));
  }, [rows]);

  return (
    <div>
      <PageHeader
        eyebrow="Disaster History"
        icon={HistoryIcon}
        title="Historical Disaster Records"
        description="Explore simulated historical disaster data across Odisha districts with charts and a detailed table."
      />

      <div className="container-page space-y-6 py-8">
        <DemoBanner message="Sample/demo dataset — these historical records are illustrative and not an official verified dataset." />

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {rows.length} record{rows.length === 1 ? '' : 's'}
          </p>
          {source === 'demo' && <DemoBadge label="Demo dataset" />}
        </div>

        <FilterBar
          filters={[
            { key: 'district', label: 'District', value: district, options: DISTRICTS, onChange: setDistrict },
            { key: 'type', label: 'Type', value: type, options: DISASTER_TYPES, onChange: setType },
          ]}
        />

        {loading && <LoadingState message="Loading disaster history…" />}
        {!loading && error && <ErrorMessage message="Unable to load history." onRetry={reload} />}
        {!loading && !error && rows.length === 0 && (
          <EmptyState icon={HistoryIcon} title="No records found" message="Adjust the filters to see data." />
        )}

        {!loading && !error && rows.length > 0 && (
          <>
            {/* Charts */}
            <div className="grid gap-5 lg:grid-cols-3">
              <ChartCard title="Disaster-type distribution" subtitle="Share by type">
                <PieChartView data={byType} />
              </ChartCard>
              <ChartCard title="District-wise incidents" subtitle="Records per district">
                <BarChartView data={byDistrict} color="#1f5ce6" />
              </ChartCard>
              <ChartCard title="Disaster frequency" subtitle="Records per year">
                <LineChartView data={byYear} color="#7c3aed" />
              </ChartCard>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Year</th>
                      <th className="px-4 py-3">District</th>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">Affected</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{r.disasterType}</td>
                        <td className="px-4 py-3 text-slate-600">{r.year}</td>
                        <td className="px-4 py-3 text-slate-600">{r.district}</td>
                        <td className="px-4 py-3 text-slate-600">{r.severity}</td>
                        <td className="px-4 py-3 text-slate-600">
                          <span className="inline-flex items-center gap-1">
                            <Users size={13} className="text-slate-400" />
                            {r.affected.toLocaleString('en-IN')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
