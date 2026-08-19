import { riskStyle, statusStyle } from '../../utils/helpers.js';

/**
 * RiskBadge — communicates risk with emoji + text + color (never color alone),
 * satisfying the accessibility requirement.
 */
export function RiskBadge({ level, size = 'sm' }) {
  const s = riskStyle(level);
  const pad = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${s.badge} ${pad}`}
      title={s.label}
    >
      <span aria-hidden="true">{s.emoji}</span>
      <span className="uppercase tracking-wide">{(level || 'low').toUpperCase()}</span>
      <span className="sr-only">{s.label}</span>
    </span>
  );
}

/** Generic status pill for reports/alerts. */
export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
}

/** Small "Demo Data" ribbon used to clearly flag simulated content. */
export function DemoBadge({ className = '', label = 'Demo Data' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 ${className}`}
    >
      <span aria-hidden="true">⚠️</span>
      {label}
    </span>
  );
}
