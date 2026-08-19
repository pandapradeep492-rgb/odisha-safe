import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { RiskBadge, StatusBadge } from '../ui/Badges.jsx';
import { disasterIcon, formatDateTime, riskStyle } from '../../utils/helpers.js';

/**
 * AlertCard — displays a single disaster alert with type, district, risk,
 * time, description and recommended action.
 */
export default function AlertCard({ alert }) {
  const Icon = disasterIcon(alert.disasterType);
  const s = riskStyle(alert.riskLevel);

  return (
    <article
      className={`card flex flex-col overflow-hidden transition hover:shadow-card-lg`}
    >
      <div className={`flex items-center justify-between gap-2 border-l-4 ${s.border} ${s.bg} px-4 py-3`}
        style={{ borderLeftColor: s.hex }}
      >
        <div className="flex items-center gap-2.5">
          <span className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/70 ${s.text}`}>
            <Icon size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{alert.disasterType}</p>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} /> {alert.district}
            </p>
          </div>
        </div>
        <RiskBadge level={alert.riskLevel} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-sm leading-relaxed text-slate-600">{alert.description}</p>

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Recommended action
          </p>
          <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-700">
            <ArrowRight size={14} className="mt-0.5 shrink-0 text-brand-600" />
            {alert.action}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} /> {formatDateTime(alert.issuedAt)}
          </span>
          <StatusBadge status={alert.status} />
        </div>
      </div>
    </article>
  );
}
