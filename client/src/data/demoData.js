/**
 * Clearly-labeled DEMO DATA for ODISHA SAFE.
 *
 * ⚠️ This is simulated data for a college project prototype.
 * It is NOT real-time and NOT an official emergency warning.
 * Always follow official government instructions in a real emergency.
 */

import { DISTRICT_COORDS } from './constants.js';

export const DEMO_FLAG = 'Demo Data — Not an Official Emergency Warning';

// --- Current headline disaster status shown on the Home page ------------------
export const currentStatus = [
  { type: 'Cyclone', level: 'LOW' },
  { type: 'Flood', level: 'MODERATE' },
  { type: 'Lightning', level: 'HIGH' },
  { type: 'Heat Wave', level: 'LOW' },
];

// --- Live alerts --------------------------------------------------------------
export const alerts = [
  {
    id: 'AL-2026-0001',
    disasterType: 'Cyclone',
    district: 'Puri',
    riskLevel: 'HIGH',
    status: 'Active',
    issuedAt: '2026-08-19T08:30:00+05:30',
    description:
      'A deep depression over the Bay of Bengal may intensify. Coastal Puri could experience strong winds and heavy rain over the next 24–48 hours.',
    action: 'Secure loose objects, keep emergency kits ready, and identify the nearest cyclone shelter.',
  },
  {
    id: 'AL-2026-0002',
    disasterType: 'Flood',
    district: 'Kendrapara',
    riskLevel: 'MODERATE',
    status: 'Active',
    issuedAt: '2026-08-19T07:10:00+05:30',
    description:
      'Rising water levels in local rivers due to sustained rainfall. Low-lying areas may see waterlogging.',
    action: 'Avoid low-lying roads. Move valuables to higher ground and monitor official updates.',
  },
  {
    id: 'AL-2026-0003',
    disasterType: 'Lightning',
    district: 'Mayurbhanj',
    riskLevel: 'HIGH',
    status: 'Active',
    issuedAt: '2026-08-19T09:05:00+05:30',
    description:
      'Thunderstorm activity with frequent lightning expected during afternoon hours across interior districts.',
    action: 'Stay indoors during storms. Avoid open fields, tall trees and water bodies.',
  },
  {
    id: 'AL-2026-0004',
    disasterType: 'Heavy Rainfall',
    district: 'Balasore',
    riskLevel: 'MODERATE',
    status: 'Active',
    issuedAt: '2026-08-19T06:45:00+05:30',
    description: 'Intermittent heavy showers likely; localised waterlogging possible in urban pockets.',
    action: 'Plan travel carefully and avoid flooded underpasses.',
  },
  {
    id: 'AL-2026-0005',
    disasterType: 'Heat Wave',
    district: 'Sambalpur',
    riskLevel: 'LOW',
    status: 'Active',
    issuedAt: '2026-08-18T12:00:00+05:30',
    description: 'Daytime temperatures slightly above normal. General discomfort during peak afternoon.',
    action: 'Stay hydrated and avoid prolonged sun exposure between 12 PM and 3 PM.',
  },
  {
    id: 'AL-2026-0006',
    disasterType: 'Cyclone',
    district: 'Ganjam',
    riskLevel: 'CRITICAL',
    status: 'Active',
    issuedAt: '2026-08-19T10:15:00+05:30',
    description:
      'Simulated scenario: rapid intensification near the coast with potential for very strong winds and storm surge.',
    action: 'Follow evacuation guidance from local authorities and move to designated shelters early.',
  },
  {
    id: 'AL-2026-0007',
    disasterType: 'Flood',
    district: 'Jajpur',
    riskLevel: 'HIGH',
    status: 'Resolved',
    issuedAt: '2026-08-16T18:20:00+05:30',
    description: 'Earlier flood advisory for riverine areas. Water levels have since receded.',
    action: 'Resume normal activity with caution; report any damaged infrastructure.',
  },
  {
    id: 'AL-2026-0008',
    disasterType: 'Lightning',
    district: 'Kendujhar',
    riskLevel: 'MODERATE',
    status: 'Resolved',
    issuedAt: '2026-08-15T15:40:00+05:30',
    description: 'Thunderstorm activity earlier in the week. Conditions have stabilised.',
    action: 'No further action required. Stay alert for fresh advisories.',
  },
];

// --- Shelters -----------------------------------------------------------------
export const shelters = [
  {
    id: 'SH-BLS-01',
    name: 'Multipurpose Cyclone Shelter — Balasore',
    district: 'Balasore',
    address: 'Near Sahadevkhunta, Balasore, Odisha',
    lat: 21.5001,
    lng: 86.9401,
    capacity: 500,
    available: 320,
    facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets'],
    contact: '+91-90000-00001',
  },
  {
    id: 'SH-BDK-01',
    name: 'Cyclone Shelter — Bhadrak',
    district: 'Bhadrak',
    address: 'Bhadrak Town Hall Road, Bhadrak, Odisha',
    lat: 21.061,
    lng: 86.5,
    capacity: 500,
    available: 210,
    facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets'],
    contact: '+91-90000-00002',
  },
  {
    id: 'SH-PUR-01',
    name: 'Coastal Relief Center — Puri',
    district: 'Puri',
    address: 'Grand Road area, Puri, Odisha',
    lat: 19.815,
    lng: 85.835,
    capacity: 750,
    available: 415,
    facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets', 'Kitchen'],
    contact: '+91-90000-00003',
  },
  {
    id: 'SH-KDP-01',
    name: 'Community Shelter — Kendrapara',
    district: 'Kendrapara',
    address: 'Kendrapara Sadar, Odisha',
    lat: 20.503,
    lng: 86.425,
    capacity: 400,
    available: 180,
    facilities: ['Drinking Water', 'First Aid', 'Toilets'],
    contact: '+91-90000-00004',
  },
  {
    id: 'SH-GJM-01',
    name: 'Relief Shelter — Ganjam',
    district: 'Ganjam',
    address: 'Chatrapur, Ganjam, Odisha',
    lat: 19.39,
    lng: 84.985,
    capacity: 600,
    available: 90,
    facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets', 'Medical Room'],
    contact: '+91-90000-00005',
  },
  {
    id: 'SH-JGP-01',
    name: 'Cyclone Shelter — Jagatsinghpur',
    district: 'Jagatsinghpur',
    address: 'Paradeep Road, Jagatsinghpur, Odisha',
    lat: 20.27,
    lng: 86.175,
    capacity: 450,
    available: 260,
    facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets'],
    contact: '+91-90000-00006',
  },
  {
    id: 'SH-CTC-01',
    name: 'Urban Relief Center — Cuttack',
    district: 'Cuttack',
    address: 'CDA Sector, Cuttack, Odisha',
    lat: 20.465,
    lng: 85.885,
    capacity: 800,
    available: 540,
    facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets', 'Kitchen'],
    contact: '+91-90000-00007',
  },
  {
    id: 'SH-KHD-01',
    name: 'Relief Shelter — Khordha',
    district: 'Khordha',
    address: 'Jatni, Khordha, Odisha',
    lat: 20.175,
    lng: 85.615,
    capacity: 350,
    available: 120,
    facilities: ['Drinking Water', 'Toilets'],
    contact: '+91-90000-00008',
  },
];

// --- Emergency resources (map layer) -----------------------------------------
export const emergencyResources = [
  {
    id: 'ER-01',
    name: 'District Emergency Operations Center — Bhubaneswar',
    type: 'Control Room',
    district: 'Khordha',
    lat: 20.2961,
    lng: 85.8245,
    contact: 'Demo: 1077 (district control room)',
  },
  {
    id: 'ER-02',
    name: 'Fire & Rescue Station — Cuttack',
    type: 'Fire & Rescue',
    district: 'Cuttack',
    lat: 20.47,
    lng: 85.879,
    contact: 'Demo: 101',
  },
  {
    id: 'ER-03',
    name: 'Medical Response Hub — Puri',
    type: 'Ambulance',
    district: 'Puri',
    lat: 19.808,
    lng: 85.828,
    contact: 'Demo: 108',
  },
];

// --- Disaster reports (admin dashboard) --------------------------------------
export const reports = [
  {
    reportId: 'OD-REPORT-2026-0001',
    name: 'Demo Reporter A',
    mobile: '90000-11111',
    disasterType: 'Flood',
    district: 'Kendrapara',
    location: 'Aul block, near river embankment',
    description: 'Water entering low-lying homes after continuous rainfall.',
    severity: 'High',
    status: 'Verified',
    createdAt: '2026-08-19T07:20:00+05:30',
  },
  {
    reportId: 'OD-REPORT-2026-0002',
    name: 'Demo Reporter B',
    mobile: '90000-22222',
    disasterType: 'Cyclone',
    district: 'Puri',
    location: 'Coastal village near Grand Road',
    description: 'Strong winds damaging temporary roofs.',
    severity: 'Severe',
    status: 'Assigned',
    createdAt: '2026-08-19T08:55:00+05:30',
  },
  {
    reportId: 'OD-REPORT-2026-0003',
    name: 'Demo Reporter C',
    mobile: '90000-33333',
    disasterType: 'Lightning',
    district: 'Mayurbhanj',
    location: 'Open farmland outside town',
    description: 'Frequent lightning strikes reported near fields.',
    severity: 'Moderate',
    status: 'Pending',
    createdAt: '2026-08-19T09:30:00+05:30',
  },
  {
    reportId: 'OD-REPORT-2026-0004',
    name: 'Demo Reporter D',
    mobile: '90000-44444',
    disasterType: 'Heavy Rainfall',
    district: 'Balasore',
    location: 'Urban market area',
    description: 'Waterlogging up to knee height on main road.',
    severity: 'Moderate',
    status: 'In Progress',
    createdAt: '2026-08-19T06:50:00+05:30',
  },
  {
    reportId: 'OD-REPORT-2026-0005',
    name: 'Demo Reporter E',
    mobile: '90000-55555',
    disasterType: 'Fire',
    district: 'Cuttack',
    location: 'Warehouse district',
    description: 'Small fire reported; contained by locals before help arrived.',
    severity: 'Low',
    status: 'Resolved',
    createdAt: '2026-08-18T21:15:00+05:30',
  },
  {
    reportId: 'OD-REPORT-2026-0006',
    name: 'Demo Reporter F',
    mobile: '90000-66666',
    disasterType: 'Flood',
    district: 'Jajpur',
    location: 'Riverside colony',
    description: 'Approach road submerged; residents requesting assistance.',
    severity: 'High',
    status: 'Pending',
    createdAt: '2026-08-19T05:40:00+05:30',
  },
  {
    reportId: 'OD-REPORT-2026-0007',
    name: 'Demo Reporter G',
    mobile: '90000-77777',
    disasterType: 'Heat Wave',
    district: 'Sambalpur',
    location: 'City center',
    description: 'Several cases of heat exhaustion reported near bus stand.',
    severity: 'Moderate',
    status: 'Rejected',
    createdAt: '2026-08-17T13:05:00+05:30',
  },
];

// --- Historical disasters -----------------------------------------------------
export const history = [
  { id: 'H1', disasterType: 'Cyclone', year: 2019, district: 'Puri', severity: 'Severe', affected: 12000, status: 'Recovered' },
  { id: 'H2', disasterType: 'Cyclone', year: 2020, district: 'Ganjam', severity: 'High', affected: 8000, status: 'Recovered' },
  { id: 'H3', disasterType: 'Flood', year: 2020, district: 'Kendrapara', severity: 'High', affected: 5400, status: 'Recovered' },
  { id: 'H4', disasterType: 'Flood', year: 2021, district: 'Jajpur', severity: 'Moderate', affected: 3200, status: 'Recovered' },
  { id: 'H5', disasterType: 'Lightning', year: 2021, district: 'Mayurbhanj', severity: 'Moderate', affected: 150, status: 'Recovered' },
  { id: 'H6', disasterType: 'Heat Wave', year: 2022, district: 'Sambalpur', severity: 'Moderate', affected: 900, status: 'Recovered' },
  { id: 'H7', disasterType: 'Cyclone', year: 2023, district: 'Balasore', severity: 'High', affected: 7600, status: 'Recovered' },
  { id: 'H8', disasterType: 'Flood', year: 2023, district: 'Cuttack', severity: 'Moderate', affected: 4100, status: 'Recovered' },
  { id: 'H9', disasterType: 'Heavy Rainfall', year: 2024, district: 'Khordha', severity: 'Moderate', affected: 2600, status: 'Recovered' },
  { id: 'H10', disasterType: 'Cyclone', year: 2024, district: 'Bhadrak', severity: 'High', affected: 5300, status: 'Recovered' },
  { id: 'H11', disasterType: 'Lightning', year: 2025, district: 'Kendujhar', severity: 'Low', affected: 60, status: 'Recovered' },
  { id: 'H12', disasterType: 'Flood', year: 2025, district: 'Jagatsinghpur', severity: 'High', affected: 6100, status: 'Recovered' },
];

// --- Risk zones for the map (approximate demo polygons/points) ---------------
export const riskZones = [
  { id: 'RZ1', district: 'Ganjam', disasterType: 'Cyclone', riskLevel: 'CRITICAL', lat: DISTRICT_COORDS.Ganjam[0], lng: DISTRICT_COORDS.Ganjam[1] },
  { id: 'RZ2', district: 'Puri', disasterType: 'Cyclone', riskLevel: 'HIGH', lat: DISTRICT_COORDS.Puri[0], lng: DISTRICT_COORDS.Puri[1] },
  { id: 'RZ3', district: 'Kendrapara', disasterType: 'Flood', riskLevel: 'MODERATE', lat: DISTRICT_COORDS.Kendrapara[0], lng: DISTRICT_COORDS.Kendrapara[1] },
  { id: 'RZ4', district: 'Mayurbhanj', disasterType: 'Lightning', riskLevel: 'HIGH', lat: DISTRICT_COORDS.Mayurbhanj[0], lng: DISTRICT_COORDS.Mayurbhanj[1] },
  { id: 'RZ5', district: 'Balasore', disasterType: 'Heavy Rainfall', riskLevel: 'MODERATE', lat: DISTRICT_COORDS.Balasore[0], lng: DISTRICT_COORDS.Balasore[1] },
  { id: 'RZ6', district: 'Sambalpur', disasterType: 'Heat Wave', riskLevel: 'LOW', lat: DISTRICT_COORDS.Sambalpur[0], lng: DISTRICT_COORDS.Sambalpur[1] },
];

// --- Dashboard aggregate stats (derived, but provided for offline demo) ------
export function computeDashboardStats() {
  const totalReports = reports.length;
  const verifiedReports = reports.filter((r) => r.status === 'Verified').length;
  const resolvedReports = reports.filter((r) => r.status === 'Resolved').length;
  const activeAlerts = alerts.filter((a) => a.status === 'Active').length;
  const activeShelters = shelters.length;
  const affectedAreas = new Set(reports.map((r) => r.district)).size;

  const byType = {};
  reports.forEach((r) => {
    byType[r.disasterType] = (byType[r.disasterType] || 0) + 1;
  });

  const byDistrict = {};
  reports.forEach((r) => {
    byDistrict[r.district] = (byDistrict[r.district] || 0) + 1;
  });

  const riskDistribution = { LOW: 0, MODERATE: 0, HIGH: 0, CRITICAL: 0 };
  alerts.forEach((a) => {
    riskDistribution[a.riskLevel] = (riskDistribution[a.riskLevel] || 0) + 1;
  });

  // Reports over the last 7 demo days.
  const overTime = [
    { date: 'Aug 13', reports: 2 },
    { date: 'Aug 14', reports: 1 },
    { date: 'Aug 15', reports: 3 },
    { date: 'Aug 16', reports: 2 },
    { date: 'Aug 17', reports: 4 },
    { date: 'Aug 18', reports: 3 },
    { date: 'Aug 19', reports: 5 },
  ];

  return {
    cards: {
      totalReports,
      activeAlerts,
      verifiedReports,
      activeShelters,
      affectedAreas,
      resolvedReports,
    },
    byType: Object.entries(byType).map(([name, value]) => ({ name, value })),
    byDistrict: Object.entries(byDistrict).map(([name, value]) => ({ name, value })),
    riskDistribution: Object.entries(riskDistribution).map(([name, value]) => ({ name, value })),
    overTime,
  };
}
