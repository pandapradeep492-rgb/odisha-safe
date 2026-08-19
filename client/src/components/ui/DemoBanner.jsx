import { Info } from 'lucide-react';

/**
 * Prominent banner clarifying that displayed content is simulated demo data,
 * shown on data-driven pages. Reinforces "follow official instructions".
 */
export default function DemoBanner({
  message = 'Demo Data — Not an Official Emergency Warning. This is a college project prototype. In a real emergency, always follow official government instructions.',
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
      role="note"
    >
      <Info size={18} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
      <p className="leading-relaxed">{message}</p>
    </div>
  );
}
