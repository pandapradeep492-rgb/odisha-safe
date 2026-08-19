import DisasterHistory from '../models/DisasterHistory.js';
import EmergencyResource from '../models/EmergencyResource.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/** GET /api/history */
export const listHistory = asyncHandler(async (req, res) => {
  const { district, disasterType } = req.query;
  const filter = {};
  if (district) filter.district = district;
  if (disasterType) filter.disasterType = disasterType;
  const rows = await DisasterHistory.find(filter).sort({ year: -1 });
  res.json(rows);
});

/** GET /api/resources */
export const listResources = asyncHandler(async (req, res) => {
  const rows = await EmergencyResource.find({}).sort({ name: 1 });
  res.json(rows);
});
