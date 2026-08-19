import { useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  LayersControl,
  LayerGroup,
  useMap,
} from 'react-leaflet';
import L from './leafletSetup.js';
import { ODISHA_CENTER } from '../../data/constants.js';
import { riskStyle } from '../../utils/helpers.js';

const { BaseLayer, Overlay } = LayersControl;

/**
 * Build a small coloured divIcon so markers are meaningful without images.
 * Category legend:
 *   RED = High/Critical risk, ORANGE = Moderate, GREEN = Shelter, BLUE = Resource
 */
function pinIcon(color) {
  return L.divIcon({
    className: 'osafe-pin',
    html: `<span style="
      display:inline-block;width:16px;height:16px;border-radius:9999px;
      background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,.25)"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

const SHELTER_COLOR = '#16a34a';
const RESOURCE_COLOR = '#2563eb';

function riskColor(level) {
  return riskStyle(level).hex;
}

/** Recenters the map when the `focus` prop changes. */
function FlyTo({ focus }) {
  const map = useMap();
  if (focus && Array.isArray(focus.center)) {
    map.flyTo(focus.center, focus.zoom || 11, { duration: 0.8 });
  }
  return null;
}

/**
 * Reusable Leaflet map.
 *
 * Props:
 *  - height: CSS height (default 480px)
 *  - riskZones, shelters, resources, alerts: arrays of markers
 *  - userLocation: [lat, lng] to show a user marker
 *  - focus: { center:[lat,lng], zoom } to fly to
 *  - showLayersControl: toggle layer control (default true)
 */
export default function MapComponent({
  height = 480,
  center = ODISHA_CENTER,
  zoom = 7,
  riskZones = [],
  shelters = [],
  resources = [],
  alerts = [],
  userLocation = null,
  focus = null,
  showLayersControl = true,
}) {
  const icons = useMemo(
    () => ({
      shelter: pinIcon(SHELTER_COLOR),
      resource: pinIcon(RESOURCE_COLOR),
    }),
    []
  );

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <FlyTo focus={focus} />

        <LayersControl position="topright" collapsed>
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Carto Light">
            <TileLayer
              attribution='&copy; OpenStreetMap &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>

          {/* Risk zones / alerts */}
          <Overlay checked name="🔴 Risk Zones">
            <LayerGroup>
              {riskZones.map((z) => {
                const color = riskColor(z.riskLevel);
                return (
                  <CircleMarker
                    key={z.id}
                    center={[z.lat, z.lng]}
                    radius={12}
                    pathOptions={{ color, fillColor: color, fillOpacity: 0.35, weight: 2 }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900">{z.district}</p>
                        <p className="text-slate-600">{z.disasterType}</p>
                        <p className="mt-1 font-medium" style={{ color }}>
                          {riskStyle(z.riskLevel).emoji} {z.riskLevel} RISK
                        </p>
                        <p className="mt-1 text-xs text-slate-400">Simulated demo zone</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </LayerGroup>
          </Overlay>

          {/* Alert markers (optional, uses same risk colours) */}
          {alerts.length > 0 && (
            <Overlay checked name="⚠️ Active Alerts">
              <LayerGroup>
                {alerts.map((a) =>
                  a.lat && a.lng ? (
                    <CircleMarker
                      key={a.id}
                      center={[a.lat, a.lng]}
                      radius={9}
                      pathOptions={{
                        color: riskColor(a.riskLevel),
                        fillColor: riskColor(a.riskLevel),
                        fillOpacity: 0.6,
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-semibold">{a.disasterType}</p>
                          <p className="text-slate-600">{a.district}</p>
                          <p style={{ color: riskColor(a.riskLevel) }}>
                            {riskStyle(a.riskLevel).emoji} {a.riskLevel}
                          </p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ) : null
                )}
              </LayerGroup>
            </Overlay>
          )}

          {/* Shelters */}
          <Overlay checked name="🟢 Shelters">
            <LayerGroup>
              {shelters.map((s) => (
                <Marker key={s.id} position={[s.lat, s.lng]} icon={icons.shelter}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold text-slate-900">{s.name}</p>
                      <p className="text-slate-600">{s.address}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Available: {s.available}/{s.capacity}
                      </p>
                      <a
                        className="mt-1 inline-block text-xs font-medium text-brand-600"
                        href={`https://www.openstreetmap.org/directions?to=${s.lat},${s.lng}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Get directions →
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </Overlay>

          {/* Emergency resources */}
          {resources.length > 0 && (
            <Overlay checked name="🔵 Emergency Resources">
              <LayerGroup>
                {resources.map((r) => (
                  <Marker key={r.id} position={[r.lat, r.lng]} icon={icons.resource}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900">{r.name}</p>
                        <p className="text-slate-600">{r.type}</p>
                        <p className="mt-1 text-xs text-slate-500">{r.contact}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </LayerGroup>
            </Overlay>
          )}
        </LayersControl>

        {/* User location */}
        {userLocation && (
          <CircleMarker
            center={userLocation}
            radius={8}
            pathOptions={{ color: '#1f5ce6', fillColor: '#1f5ce6', fillOpacity: 0.9 }}
          >
            <Popup>You are here (approx.)</Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </div>
  );
}
