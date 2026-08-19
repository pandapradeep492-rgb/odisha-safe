import DisasterAlert from '../models/DisasterAlert.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/** GET /api/alerts */
export const listAlerts = asyncHandler(async (req, res) => {
  const { district, disasterType, riskLevel, status } = req.query;
  const filter = {};
  if (district) filter.district = district;
  if (disasterType) filter.disasterType = disasterType;
  if (riskLevel) filter.riskLevel = riskLevel;
  if (status) filter.status = status;
  const alerts = await DisasterAlert.find(filter).sort({ issuedAt: -1 });
  res.json(alerts);
});

/** POST /api/alerts (admin) */
export const createAlert = asyncHandler(async (req, res) => {
  const alert = await DisasterAlert.create(req.body);
  res.status(201).json(alert);
});

/** PUT /api/alerts/:id (admin) */
export const updateAlert = asyncHandler(async (req, res) => {
  const alert = await DisasterAlert.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!alert) return res.status(404).json({ message: 'Alert not found.' });
  res.json(alert);
});

/** DELETE /api/alerts/:id (admin) */
export const deleteAlert = asyncHandler(async (req, res) => {
  const alert = await DisasterAlert.findByIdAndDelete(req.params.id);
  if (!alert) return res.status(404).json({ message: 'Alert not found.' });
  res.json({ message: 'Alert deleted.' });
});
