/**
 * Simple map legend explaining marker colours.
 * Uses shape + text (not colour alone) for accessibility.
 */
const ITEMS = [
  { color: '#dc2626', label: 'High / Critical Risk' },
  { color: '#d97706', label: 'Moderate Risk' },
  { color: '#16a34a', label: 'Safe Shelter' },
  { color: '#2563eb', label: 'Emergency Resource' },
];

export default function MapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs">
      <span className="font-semibold text-slate-600">Legend:</span>
      {ITEMS.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5 text-slate-600">
          <span
            className="inline-block h-3 w-3 rounded-full border border-white shadow ring-1 ring-black/10"
            style={{ backgroundColor: i.color }}
          />
          {i.label}
        </span>
      ))}
    </div>
  );
}
