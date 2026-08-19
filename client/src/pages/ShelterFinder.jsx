import { useMemo, useState } from 'react';
import { LifeBuoy, LocateFixed, Search } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import DemoBanner from '../components/ui/DemoBanner.jsx';
import ShelterCard from '../components/cards/ShelterCard.jsx';
import MapComponent from '../components/map/MapComponent.jsx';
import { DemoBadge } from '../components/ui/Badges.jsx';
import { LoadingState, ErrorMessage, EmptyState } from '../components/ui/StateViews.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { useResource } from '../services/hooks.js';
import { SheltersService } from '../services/resources.js';
import { shelters as demoShelters } from '../data/demoData.js';
import { DISTRICTS, DISTRICT_COORDS } from '../data/constants.js';
import { distanceKm } from '../utils/helpers.js';

/**
 * Shelter Finder — search + sort shelters by distance, with a synced map.
 * Supports browser geolocation, with a manual district fallback.
 */
export default function ShelterFinder() {
  const { notify } = useNotification();
  const { data, source, loading, error, reload } = useResource(
    () => SheltersService.list(),
    demoShelters,
    []
  );

  const [district, setDistrict] = useState('');
  const [query, setQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [focus, setFocus] = useState(null);

  const shelters = useMemo(() => {
    let list = (data || []).map((s) => ({
      ...s,
      _distance: userLocation ? distanceKm(userLocation, [s.lat, s.lng]) : null,
    }));
    if (district) list = list.filter((s) => s.district === district);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (s) => s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
      );
    }
    if (userLocation) list.sort((a, b) => (a._distance ?? 1e9) - (b._distance ?? 1e9));
    return list;
  }, [data, district, query, userLocation]);

  const locate = () => {
    if (!navigator.geolocation) {
      notify.warning('Geolocation unavailable. Select your district to continue.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc);
        setFocus({ center: loc, zoom: 10 });
        notify.success('Location found. Sorting shelters by distance.');
      },
      () => notify.error('Could not get location. Select your district instead.'),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleDistrict = (value) => {
    setDistrict(value);
    if (value && DISTRICT_COORDS[value]) setFocus({ center: DISTRICT_COORDS[value], zoom: 10 });
  };

  const viewOnMap = (shelter) => {
    setFocus({ center: [shelter.lat, shelter.lng], zoom: 13 });
    if (typeof window !== 'undefined') {
      document.getElementById('shelter-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Shelter Finder"
        icon={LifeBuoy}
        title="Find the Nearest Shelter"
        description="Search demo cyclone/relief shelters, view capacity and facilities, and get directions."
        actions={
          <button type="button" onClick={locate} className="btn-primary">
            <LocateFixed size={16} /> Use my location
          </button>
        }
      />

      <div className="container-page space-y-6 py-8">
        <DemoBanner message="Demo shelter data — locations, capacity and contacts are simulated for demonstration only." />

        {/* Controls */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or address…"
              className="form-input pl-9"
              aria-label="Search shelters"
            />
          </div>
          <select
            className="form-select"
            value={district}
            onChange={(e) => handleDistrict(e.target.value)}
            aria-label="Select district"
          >
            <option value="">All districts</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600">
            <span>{shelters.length} shelter{shelters.length === 1 ? '' : 's'}</span>
            {userLocation ? (
              <span className="text-xs font-medium text-emerald-600">Sorted by distance</span>
            ) : (
              source === 'demo' && <DemoBadge label="Demo" />
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* List */}
          <div>
            {loading && <LoadingState message="Loading shelters…" />}
            {!loading && error && (
              <ErrorMessage message="Unable to load shelters. Please try again." onRetry={reload} />
            )}
            {!loading && !error && shelters.length === 0 && (
              <EmptyState
                icon={LifeBuoy}
                title="No shelters found"
                message="Try a different district or clear your search."
              />
            )}
            {!loading && !error && shelters.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {shelters.map((s) => (
                  <ShelterCard
                    key={s.id}
                    shelter={s}
                    distanceKm={s._distance ?? undefined}
                    onViewMap={viewOnMap}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          <div id="shelter-map" className="lg:sticky lg:top-20 lg:h-fit">
            <MapComponent
              height={520}
              shelters={shelters}
              userLocation={userLocation}
              focus={focus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
