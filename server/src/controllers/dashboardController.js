import DisasterReport from '../models/DisasterReport.js';
import DisasterAlert from '../models/DisasterAlert.js';
import Shelter from '../models/Shelter.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * GET /api/dashboard/stats (admin)
 * Aggregates cards + chart datasets from the database.
 */
export const getStats = asyncHandler(async (req, res) => {
  const [reports, activeAlertsCount, sheltersCount, allAlerts] = await Promise.all([
    DisasterReport.find({}),
    DisasterAlert.countDocuments({ status: 'Active' }),
    Shelter.countDocuments({}),
    DisasterAlert.find({}, 'riskLevel'),
  ]);

  const cards = {
    totalReports: reports.length,
    activeAlerts: activeAlertsCount,
    verifiedReports: reports.filter((r) => r.status === 'Verified').length,
    activeShelters: sheltersCount,
    affectedAreas: new Set(reports.map((r) => r.district)).size,
    resolvedReports: reports.filter((r) => r.status === 'Resolved').length,
  };

  const groupCount = (items, key) => {
    const m = {};
    items.forEach((it) => {
      const k = it[key];
      m[k] = (m[k] || 0) + 1;
    });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  };

  const riskMap = { LOW: 0, MODERATE: 0, HIGH: 0, CRITICAL: 0 };
  allAlerts.forEach((a) => {
    riskMap[a.riskLevel] = (riskMap[a.riskLevel] || 0) + 1;
  });

  // Reports over the last 7 days.
  const days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    const count = reports.filter((r) => r.createdAt >= d && r.createdAt < next).length;
    days.push({ date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }), reports: count });
  }

  res.json({
    cards,
    byType: groupCount(reports, 'disasterType'),
    byDistrict: groupCount(reports, 'district'),
    riskDistribution: Object.entries(riskMap).map(([name, value]) => ({ name, value })),
    overTime: days,
  });
});
