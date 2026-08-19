import { MapPin, Users, Phone, Navigation, Map as MapIcon, Droplets } from 'lucide-react';

/** Colour of the availability bar based on remaining capacity ratio. */
function availabilityTone(ratio) {
  if (ratio > 0.5) return 'bg-emerald-500';
  if (ratio > 0.2) return 'bg-amber-500';
  return 'bg-red-500';
}

/**
 * ShelterCard — shelter details with capacity bar, facilities and actions.
 */
export default function ShelterCard({ shelter, distanceKm, onViewMap }) {
  const ratio = shelter.capacity ? shelter.available / shelter.capacity : 0;
  const directions = `https://www.openstreetmap.org/directions?to=${shelter.lat},${shelter.lng}`;

  return (
    <article className="card flex flex-col p-4 transition hover:shadow-card-lg sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{shelter.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={12} /> {shelter.address}
          </p>
        </div>
        {typeof distanceKm === 'number' && (
          <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {distanceKm.toFixed(1)} km
          </span>
        )}
      </div>

      {/* Capacity */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <Users size={13} /> Availability
          </span>
          <span className="text-slate-500">
            {shelter.available} / {shelter.capacity}
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${availabilityTone(ratio)}`}
            style={{ width: `${Math.max(4, Math.round(ratio * 100))}%` }}
          />
        </div>
      </div>

      {/* Facilities */}
      <div className="mt-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Facilities</p>
        <div className="flex flex-wrap gap-1.5">
          {shelter.facilities?.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              <Droplets size={11} /> {f}
            </span>
          ))}
        </div>
      </div>

      {/* Contact + actions */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <a
          href={`tel:${shelter.contact}`}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-brand-700"
        >
          <Phone size={13} /> {shelter.contact}
        </a>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => onViewMap?.(shelter)} className="btn-secondary text-xs">
          <MapIcon size={14} /> View on Map
        </button>
        <a href={directions} target="_blank" rel="noreferrer" className="btn-primary text-xs">
          <Navigation size={14} /> Directions
        </a>
      </div>
    </article>
  );
}
