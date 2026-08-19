import DisasterReport from '../models/DisasterReport.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Generate a unique human-friendly report ID like OD-REPORT-2026-0001.
 * Uses the count of reports created in the current year + 1.
 */
async function generateReportId() {
  const year = new Date().getFullYear();
  const start = new Date(`${year}-01-01T00:00:00Z`);
  const end = new Date(`${year + 1}-01-01T00:00:00Z`);
  const countThisYear = await DisasterReport.countDocuments({
    createdAt: { $gte: start, $lt: end },
  });
  const seq = String(countThisYear + 1).padStart(4, '0');
  return `OD-REPORT-${year}-${seq}`;
}

/** POST /api/reports (public) */
export const createReport = asyncHandler(async (req, res) => {
  const { name, mobile, disasterType, district, location, description, severity, image } = req.body;

  // Basic server-side validation (schema enforces the rest).
  if (!name || !mobile || !disasterType || !district || !location || !description) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  // Retry a couple of times in the unlikely event of an ID collision.
  let lastErr;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const reportId = await generateReportId();
      const report = await DisasterReport.create({
        reportId,
        name,
        mobile,
        disasterType,
        district,
        location,
        description,
        severity,
        image,
      });
      return res.status(201).json(report);
    } catch (err) {
      if (err.code === 11000) {
        lastErr = err;
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
});

/** GET /api/reports (admin) */
export const listReports = asyncHandler(async (req, res) => {
  const { status, disasterType, district } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (disasterType) filter.disasterType = disasterType;
  if (district) filter.district = district;
  const reports = await DisasterReport.find(filter).sort({ createdAt: -1 });
  res.json(reports);
});

/** GET /api/reports/:id (by reportId or _id) */
export const getReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const report =
    (await DisasterReport.findOne({ reportId: id })) ||
    (await DisasterReport.findById(id).catch(() => null));
  if (!report) return res.status(404).json({ message: 'Report not found.' });
  res.json(report);
});

/** PUT /api/reports/:id/status (admin) */
export const updateReportStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ['Pending', 'Verified', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }
  const report = await DisasterReport.findOneAndUpdate(
    { reportId: req.params.id },
    { status },
    { new: true }
  );
  if (!report) return res.status(404).json({ message: 'Report not found.' });
  res.json(report);
});
