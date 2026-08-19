import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    disasterType: {
      type: String,
      required: true,
      enum: ['Flood', 'Cyclone', 'Lightning', 'Fire', 'Heat Wave', 'Heavy Rainfall', 'Landslide', 'Other'],
    },
    district: { type: String, required: true, trim: true },
    riskLevel: { type: String, required: true, enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] },
    status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
    description: { type: String, required: true, trim: true },
    action: { type: String, trim: true },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('DisasterAlert', alertSchema);
