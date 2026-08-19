import { Search } from 'lucide-react';

/**
 * FilterBar — reusable filter row with select dropdowns and optional search.
 * `filters` is an array of { key, label, value, options, onChange }.
 */
export default function FilterBar({ filters = [], search }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {search && (
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            className="form-input pl-9"
            placeholder={search.placeholder || 'Search…'}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            aria-label={search.placeholder || 'Search'}
          />
        </div>
      )}
      {filters.map((f) => (
        <div key={f.key}>
          <label htmlFor={`filter-${f.key}`} className="sr-only">
            {f.label}
          </label>
          <select
            id={`filter-${f.key}`}
            className="form-select"
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
          >
            <option value="">{f.label}: All</option>
            {f.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
