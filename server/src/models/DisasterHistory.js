import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    disasterType: {
      type: String,
      required: true,
      enum: ['Flood', 'Cyclone', 'Lightning', 'Fire', 'Heat Wave', 'Heavy Rainfall', 'Landslide', 'Other'],
    },
    year: { type: Number, required: true },
    district: { type: String, required: true, trim: true },
    severity: { type: String, enum: ['Low', 'Moderate', 'High', 'Severe'], default: 'Moderate' },
    affected: { type: Number, default: 0 },
    status: { type: String, default: 'Recovered' },
  },
  { timestamps: true }
);

export default mongoose.model('DisasterHistory', historySchema);
