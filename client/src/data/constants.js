/**
 * Shared constants for ODISHA SAFE (districts, disaster types, risk levels).
 * These power filters, forms and demo data generation across the app.
 */

// Coastal + inland Odisha districts used throughout the demo.
export const DISTRICTS = [
  'Balasore',
  'Bhadrak',
  'Kendrapara',
  'Jagatsinghpur',
  'Puri',
  'Khordha',
  'Cuttack',
  'Ganjam',
  'Mayurbhanj',
  'Jajpur',
  'Kendujhar',
  'Gajapati',
  'Nayagarh',
  'Sambalpur',
  'Sundargarh',
];

// Approximate district centroids (lat, lng) for map markers.
// NOTE: Approximate demo coordinates — not survey-grade.
export const DISTRICT_COORDS = {
  Balasore: [21.4934, 86.9335],
  Bhadrak: [21.0574, 86.4963],
  Kendrapara: [20.5006, 86.4225],
  Jagatsinghpur: [20.2667, 86.1706],
  Puri: [19.8134, 85.831],
  Khordha: [20.1734, 85.6116],
  Cuttack: [20.4625, 85.8828],
  Ganjam: [19.3872, 84.8802],
  Mayurbhanj: [21.9287, 86.7359],
  Jajpur: [20.841, 86.3373],
  Kendujhar: [21.6297, 85.5817],
  Gajapati: [18.7846, 84.1339],
  Nayagarh: [20.1288, 85.0965],
  Sambalpur: [21.4669, 83.9812],
  Sundargarh: [22.1167, 84.0333],
};

// Center + bounds for the Odisha map view.
export const ODISHA_CENTER = [20.35, 85.2];
export const ODISHA_BOUNDS = [
  [17.8, 81.3], // south-west
  [22.6, 87.6], // north-east
];

export const DISASTER_TYPES = [
  'Flood',
  'Cyclone',
  'Lightning',
  'Fire',
  'Heat Wave',
  'Heavy Rainfall',
  'Landslide',
  'Other',
];

export const RISK_LEVELS = ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'];

export const REPORT_STATUSES = [
  'Pending',
  'Verified',
  'Assigned',
  'In Progress',
  'Resolved',
  'Rejected',
];

export const SEVERITIES = ['Low', 'Moderate', 'High', 'Severe'];

// Icon key per disaster type (maps to lucide-react icon in a helper).
export const DISASTER_ICON = {
  Flood: 'Waves',
  Cyclone: 'Wind',
  Lightning: 'Zap',
  Fire: 'Flame',
  'Heat Wave': 'ThermometerSun',
  'Heavy Rainfall': 'CloudRain',
  Landslide: 'Mountain',
  Other: 'AlertTriangle',
};
