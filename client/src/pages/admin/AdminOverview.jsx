import {
  FileText,
  Siren,
  BadgeCheck,
  LifeBuoy,
  MapPinned,
  CheckCircle2,
} from 'lucide-react';
import StatsCard from '../../components/cards/StatsCard.jsx';
import DemoBanner from '../../components/ui/DemoBanner.jsx';
import { StatusBadge, DemoBadge } from '../../components/ui/Badges.jsx';
import { LoadingState, ErrorMessage } from '../../components/ui/StateViews.jsx';
import { ChartCard, BarChartView, PieChartView, LineChartView } from '../../components/charts/Charts.jsx';
import { useResource } from '../../services/hooks.js';
import { DashboardService } from '../../services/resources.js';
import { computeDashboardStats, reports as demoReports } from '../../data/demoData.js';
import { formatDateTime } from '../../utils/helpers.js';

export default function AdminOverview() {
  const { data, source, loading, error, reload } = useResource(
    () => DashboardService.stats(),
    () => computeDashboardStats(),
    []
  );

  if (loading) return <LoadingState message="Loading dashboard…" />;
  if (error) return <ErrorMessage message="Unable to load dashboard stats." onRetry={reload} />;

  const stats = data || computeDashboardStats();
  const c = stats.cards;
  const recent = demoReports.slice(0, 5);

  const CARDS = [
    { label: 'Total Reports', value: c.totalReports, icon: FileText, tone: 'brand' },
    { label: 'Active Alerts', value: c.activeAlerts, icon: Siren, tone: 'red' },
    { label: 'Verified Reports', value: c.verifiedReports, icon: BadgeCheck, tone: 'indigo' },
    { label: 'Active Shelters', value: c.activeShelters, icon: LifeBuoy, tone: 'green' },
    { label: 'Affected Areas', value: c.affectedAreas, icon: MapPinned, tone: 'amber' },
    { label: 'Resolved Reports', value: c.resolvedReports, icon: CheckCircle2, tone: 'green' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Overview</h2>
          <p className="text-sm text-slate-600">Monitoring summary across the ODISHA SAFE prototype.</p>
        </div>
        {source === 'demo' && <DemoBadge label="Demo data" />}
      </div>

      <DemoBanner message="Dashboard metrics are computed from simulated demo data for demonstration purposes." />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {CARDS.map((card) => (
          <StatsCard key={card.label} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Disasters by type" subtitle="Reports grouped by disaster type">
          <BarChartView data={stats.byType} color="#1f5ce6" />
        </ChartCard>
        <ChartCard title="Reports by district" subtitle="Where reports originate">
          <BarChartView data={stats.byDistrict} color="#16a34a" />
        </ChartCard>
        <ChartCard title="Reports over time" subtitle="Last 7 days (demo)">
          <LineChartView data={stats.overTime} color="#7c3aed" />
        </ChartCard>
        <ChartCard title="Risk-level distribution" subtitle="Active + resolved alerts">
          <PieChartView data={stats.riskDistribution} useRiskColors />
        </ChartCard>
      </div>

      {/* Recent reports */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">Recent Reports</h3>
        </div>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.map((r) => (
                <tr key={r.reportId} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">{r.reportId}</td>
                  <td className="px-4 py-3 text-slate-700">{r.disasterType}</td>
                  <td className="px-4 py-3 text-slate-600">{r.district}</td>
                  <td className="px-4 py-3 text-slate-600">{r.severity}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDateTime(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
