import mongoose from 'mongoose';

/**
 * Citizen disaster report. `reportId` is a human-friendly ID generated on
 * creation (e.g. OD-REPORT-2026-0001) using a per-year counter.
 */
const reportSchema = new mongoose.Schema(
  {
    reportId: { type: String, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    disasterType: {
      type: String,
      required: true,
      enum: ['Flood', 'Cyclone', 'Lightning', 'Fire', 'Heat Wave', 'Heavy Rainfall', 'Landslide', 'Other'],
    },
    district: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, minlength: 10 },
    severity: { type: String, enum: ['Low', 'Moderate', 'High', 'Severe'], default: 'Moderate' },
    image: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Verified', 'Assigned', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('DisasterReport', reportSchema);
