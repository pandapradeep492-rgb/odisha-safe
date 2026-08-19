import mongoose from 'mongoose';

/**
 * Optional audit log of risk predictions requested through the API.
 */
const riskPredictionSchema = new mongoose.Schema(
  {
    input: { type: Object, required: true },
    score: { type: Number, required: true },
    level: { type: String, enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'], required: true },
    action: { type: String },
    model: { type: String, default: 'rule-based' },
  },
  { timestamps: true }
);

export default mongoose.model('RiskPrediction', riskPredictionSchema);
