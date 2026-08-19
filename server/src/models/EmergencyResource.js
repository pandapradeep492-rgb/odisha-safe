import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true }, // e.g. Control Room, Fire & Rescue
    district: { type: String, required: true, trim: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    contact: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('EmergencyResource', resourceSchema);
