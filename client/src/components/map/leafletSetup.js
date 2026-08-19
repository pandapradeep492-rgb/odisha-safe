/**
 * Fixes the default Leaflet marker icon URLs when bundling with Vite.
 * Import this once (e.g. in a map page) before rendering markers that use the
 * default icon. We primarily use custom divIcons, but this keeps the default
 * icon working too.
 */
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default L;
