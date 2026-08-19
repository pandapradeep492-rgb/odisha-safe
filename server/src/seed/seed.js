import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import DisasterAlert from '../models/DisasterAlert.js';
import Shelter from '../models/Shelter.js';
import DisasterReport from '../models/DisasterReport.js';
import DisasterHistory from '../models/DisasterHistory.js';
import EmergencyResource from '../models/EmergencyResource.js';

/**
 * Seeds the database with a demo admin + clearly-labeled demo data.
 * Run with: npm run seed  (from the server/ directory)
 *
 * ⚠️ All seeded content is simulated demo data for a college project.
 */

const alerts = [
  { disasterType: 'Cyclone', district: 'Puri', riskLevel: 'HIGH', status: 'Active', description: 'Deep depression over the Bay of Bengal may intensify near coastal Puri.', action: 'Secure loose objects and identify the nearest shelter.' },
  { disasterType: 'Flood', district: 'Kendrapara', riskLevel: 'MODERATE', status: 'Active', description: 'Rising river levels due to sustained rainfall.', action: 'Avoid low-lying roads and monitor official updates.' },
  { disasterType: 'Lightning', district: 'Mayurbhanj', riskLevel: 'HIGH', status: 'Active', description: 'Thunderstorm activity with frequent lightning expected.', action: 'Stay indoors; avoid open fields and tall trees.' },
  { disasterType: 'Cyclone', district: 'Ganjam', riskLevel: 'CRITICAL', status: 'Active', description: 'Simulated rapid intensification near the coast.', action: 'Follow evacuation guidance and move to shelters early.' },
  { disasterType: 'Heavy Rainfall', district: 'Balasore', riskLevel: 'MODERATE', status: 'Active', description: 'Intermittent heavy showers; localised waterlogging possible.', action: 'Plan travel carefully; avoid flooded underpasses.' },
  { disasterType: 'Flood', district: 'Jajpur', riskLevel: 'HIGH', status: 'Resolved', description: 'Earlier flood advisory; water levels have receded.', action: 'Resume activity with caution; report damage.' },
];

const shelters = [
  { name: 'Multipurpose Cyclone Shelter — Balasore', district: 'Balasore', address: 'Near Sahadevkhunta, Balasore', lat: 21.5001, lng: 86.9401, capacity: 500, available: 320, facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets'], contact: '+91-90000-00001' },
  { name: 'Cyclone Shelter — Bhadrak', district: 'Bhadrak', address: 'Town Hall Road, Bhadrak', lat: 21.061, lng: 86.5, capacity: 500, available: 210, facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets'], contact: '+91-90000-00002' },
  { name: 'Coastal Relief Center — Puri', district: 'Puri', address: 'Grand Road area, Puri', lat: 19.815, lng: 85.835, capacity: 750, available: 415, facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets', 'Kitchen'], contact: '+91-90000-00003' },
  { name: 'Community Shelter — Kendrapara', district: 'Kendrapara', address: 'Kendrapara Sadar', lat: 20.503, lng: 86.425, capacity: 400, available: 180, facilities: ['Drinking Water', 'First Aid', 'Toilets'], contact: '+91-90000-00004' },
  { name: 'Relief Shelter — Ganjam', district: 'Ganjam', address: 'Chatrapur, Ganjam', lat: 19.39, lng: 84.985, capacity: 600, available: 90, facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets', 'Medical Room'], contact: '+91-90000-00005' },
  { name: 'Urban Relief Center — Cuttack', district: 'Cuttack', address: 'CDA Sector, Cuttack', lat: 20.465, lng: 85.885, capacity: 800, available: 540, facilities: ['Drinking Water', 'First Aid', 'Electricity', 'Toilets', 'Kitchen'], contact: '+91-90000-00007' },
];

const reports = [
  { reportId: 'OD-REPORT-2026-0001', name: 'Demo Reporter A', mobile: '90000-11111', disasterType: 'Flood', district: 'Kendrapara', location: 'Aul block, near river embankment', description: 'Water entering low-lying homes after continuous rainfall.', severity: 'High', status: 'Verified' },
  { reportId: 'OD-REPORT-2026-0002', name: 'Demo Reporter B', mobile: '90000-22222', disasterType: 'Cyclone', district: 'Puri', location: 'Coastal village near Grand Road', description: 'Strong winds damaging temporary roofs and shelters.', severity: 'Severe', status: 'Assigned' },
  { reportId: 'OD-REPORT-2026-0003', name: 'Demo Reporter C', mobile: '90000-33333', disasterType: 'Lightning', district: 'Mayurbhanj', location: 'Open farmland outside town', description: 'Frequent lightning strikes reported near fields.', severity: 'Moderate', status: 'Pending' },
  { reportId: 'OD-REPORT-2026-0004', name: 'Demo Reporter D', mobile: '90000-44444', disasterType: 'Heavy Rainfall', district: 'Balasore', location: 'Urban market area', description: 'Waterlogging up to knee height on the main road.', severity: 'Moderate', status: 'In Progress' },
  { reportId: 'OD-REPORT-2026-0005', name: 'Demo Reporter E', mobile: '90000-55555', disasterType: 'Fire', district: 'Cuttack', location: 'Warehouse district', description: 'Small fire reported; contained by locals before help arrived.', severity: 'Low', status: 'Resolved' },
];

const history = [
  { disasterType: 'Cyclone', year: 2019, district: 'Puri', severity: 'Severe', affected: 12000 },
  { disasterType: 'Cyclone', year: 2020, district: 'Ganjam', severity: 'High', affected: 8000 },
  { disasterType: 'Flood', year: 2020, district: 'Kendrapara', severity: 'High', affected: 5400 },
  { disasterType: 'Lightning', year: 2021, district: 'Mayurbhanj', severity: 'Moderate', affected: 150 },
  { disasterType: 'Cyclone', year: 2023, district: 'Balasore', severity: 'High', affected: 7600 },
  { disasterType: 'Flood', year: 2025, district: 'Jagatsinghpur', severity: 'High', affected: 6100 },
];

const resources = [
  { name: 'District Emergency Operations Center — Bhubaneswar', type: 'Control Room', district: 'Khordha', lat: 20.2961, lng: 85.8245, contact: 'Demo: 1077' },
  { name: 'Fire & Rescue Station — Cuttack', type: 'Fire & Rescue', district: 'Cuttack', lat: 20.47, lng: 85.879, contact: 'Demo: 101' },
  { name: 'Medical Response Hub — Puri', type: 'Ambulance', district: 'Puri', lat: 19.808, lng: 85.828, contact: 'Demo: 108' },
];

async function seed() {
  await connectDB(process.env.MONGODB_URI);
  // eslint-disable-next-line no-console
  console.log('Connected. Seeding demo data…');

  // Admin (create only if missing so we don't overwrite a changed password).
  const email = (process.env.SEED_ADMIN_EMAIL || 'admin@odishasafe.demo').toLowerCase();
  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({
      name: process.env.SEED_ADMIN_NAME || 'Administrator',
      email,
      password: process.env.SEED_ADMIN_PASSWORD || 'Admin@12345',
      role: 'admin',
    });
    // eslint-disable-next-line no-console
    console.log(`👤 Admin created: ${email}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`👤 Admin already exists: ${email}`);
  }

  // Replace demo collections.
  await Promise.all([
    DisasterAlert.deleteMany({}),
    Shelter.deleteMany({}),
    DisasterReport.deleteMany({}),
    DisasterHistory.deleteMany({}),
    EmergencyResource.deleteMany({}),
  ]);

  await Promise.all([
    DisasterAlert.insertMany(alerts),
    Shelter.insertMany(shelters),
    DisasterReport.insertMany(reports),
    DisasterHistory.insertMany(history),
    EmergencyResource.insertMany(resources),
  ]);

  // eslint-disable-next-line no-console
  console.log('✅ Demo data seeded successfully.');
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed:', err.message);
  await mongoose.connection.close().catch(() => {});
  process.exit(1);
});
