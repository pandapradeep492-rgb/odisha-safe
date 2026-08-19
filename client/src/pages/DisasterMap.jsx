import { useMemo, useState } from 'react';
import { Map as MapIcon, LocateFixed, RefreshCw } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import DemoBanner from '../components/ui/DemoBanner.jsx';
import MapComponent from '../components/map/MapComponent.jsx';
import MapLegend from '../components/map/MapLegend.jsx';
import FilterBar from '../components/Filters.jsx';
import { DemoBadge } from '../components/ui/Badges.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { useResource } from '../services/hooks.js';
import { SheltersService, AlertsService } from '../services/resources.js';
import {
  shelters as demoShelters,
  riskZones as demoRiskZones,
  emergencyResources as demoResources,
  alerts as demoAlerts,
} from '../data/demoData.js';
import { DISTRICTS, DISTRICT_COORDS, ODISHA_CENTER } from '../data/constants.js';

/**
 * Full-screen interactive Odisha disaster map with district focus and
 * user-location support. Marker data falls back to demo data offline.
 */
export default function DisasterMap() {
  const { notify } = useNotification();
  const { data: shelters, source: shelterSource } = useResource(
    () => SheltersService.list(),
    demoShelters,
    []
  );
  const { data: alerts } = useResource(() => AlertsService.list(), demoAlerts, []);

  const [district, setDistrict] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [focus, setFocus] = useState(null);

  // Map active alerts to coordinates for the alert layer.
  const alertMarkers = useMemo(
    () =>
      (alerts || demoAlerts)
        .filter((a) => a.status === 'Active')
        .map((a) => ({
          ...a,
          lat: DISTRICT_COORDS[a.district]?.[0],
          lng: DISTRICT_COORDS[a.district]?.[1],
        })),
    [alerts]
  );

  const shelterList = useMemo(() => {
    const list = shelters || demoShelters;
    return district ? list.filter((s) => s.district === district) : list;
  }, [shelters, district]);

  const handleDistrict = (value) => {
    setDistrict(value);
    if (value && DISTRICT_COORDS[value]) {
      setFocus({ center: DISTRICT_COORDS[value], zoom: 10 });
    } else {
      setFocus({ center: ODISHA_CENTER, zoom: 7 });
    }
  };

  const locate = () => {
    if (!navigator.geolocation) {
      notify.warning('Geolocation is not available. Please select a district instead.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc);
        setFocus({ center: loc, zoom: 11 });
        notify.success('Location found. Centering map.');
      },
      () => notify.error('Unable to access your location. Please select a district instead.'),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div>
      <PageHeader
        eyebrow="GIS Map"
        icon={MapIcon}
        title="Interactive Disaster Map"
        description="Simulated risk zones, shelters and emergency resources across Odisha. Toggle layers and click markers for details."
        actions={
          <button type="button" onClick={locate} className="btn-primary">
            <LocateFixed size={16} /> Use my location
          </button>
        }
      />

      <div className="container-page space-y-4 py-8">
        <DemoBanner message="Demo map data — approximate coordinates for demonstration only. Not survey-grade and not an official danger-zone map." />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <FilterBar
              filters={[
                {
                  key: 'district',
                  label: 'Focus District',
                  value: district,
                  options: DISTRICTS,
                  onChange: handleDistrict,
                },
              ]}
            />
          </div>
          <div className="flex items-center gap-2">
            {shelterSource === 'demo' && <DemoBadge label="Offline demo data" />}
            <button
              type="button"
              onClick={() => {
                setDistrict('');
                setFocus({ center: ODISHA_CENTER, zoom: 7 });
              }}
              className="btn-secondary"
            >
              <RefreshCw size={16} /> Reset view
            </button>
          </div>
        </div>

        <MapComponent
          height={560}
          riskZones={demoRiskZones}
          shelters={shelterList}
          resources={demoResources}
          alerts={alertMarkers}
          userLocation={userLocation}
          focus={focus}
        />
        <MapLegend />
      </div>
    </div>
  );
}
