import { useMemo, useState } from 'react';
import { Siren, RefreshCw } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import DemoBanner from '../components/ui/DemoBanner.jsx';
import FilterBar from '../components/Filters.jsx';
import AlertCard from '../components/cards/AlertCard.jsx';
import { DemoBadge } from '../components/ui/Badges.jsx';
import { LoadingState, ErrorMessage, EmptyState } from '../components/ui/StateViews.jsx';
import { useResource } from '../services/hooks.js';
import { AlertsService } from '../services/resources.js';
import { alerts as demoAlerts } from '../data/demoData.js';
import { DISTRICTS, DISASTER_TYPES, RISK_LEVELS } from '../data/constants.js';

/**
 * Live Alerts dashboard with filters (district, type, risk, status).
 */
export default function LiveAlerts() {
  const { data, source, loading, error, reload } = useResource(
    () => AlertsService.list(),
    demoAlerts,
    []
  );

  const [district, setDistrict] = useState('');
  const [type, setType] = useState('');
  const [risk, setRisk] = useState('');
  const [status, setStatus] = useState('');

  const filtered = useMemo(() => {
    const list = data || [];
    return list.filter(
      (a) =>
        (!district || a.district === district) &&
        (!type || a.disasterType === type) &&
        (!risk || a.riskLevel === risk) &&
        (!status || a.status === status)
    );
  }, [data, district, type, risk, status]);

  return (
    <div>
      <PageHeader
        eyebrow="Live Alerts"
        icon={Siren}
        title="Disaster Alerts Dashboard"
        description="Simulated district-wise disaster alerts with risk levels and recommended actions."
        actions={
          <button type="button" onClick={reload} className="btn-secondary">
            <RefreshCw size={16} /> Refresh
          </button>
        }
      />

      <div className="container-page space-y-6 py-8">
        <DemoBanner />

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> alert
            {filtered.length === 1 ? '' : 's'}
          </p>
          {source === 'demo' && <DemoBadge label="Offline demo data" />}
        </div>

        <FilterBar
          filters={[
            { key: 'district', label: 'District', value: district, options: DISTRICTS, onChange: setDistrict },
            { key: 'type', label: 'Type', value: type, options: DISASTER_TYPES, onChange: setType },
            { key: 'risk', label: 'Risk', value: risk, options: RISK_LEVELS, onChange: setRisk },
            { key: 'status', label: 'Status', value: status, options: ['Active', 'Resolved'], onChange: setStatus },
          ]}
        />

        {loading && <LoadingState message="Loading disaster alerts…" />}
        {!loading && error && (
          <ErrorMessage message="Unable to load alerts. Please try again." onRetry={reload} />
        )}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            icon={Siren}
            title="No active alerts found"
            message="Try adjusting the filters to see more results."
          />
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <AlertCard key={a.id} alert={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
