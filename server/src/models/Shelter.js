import mongoose from 'mongoose';

const shelterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    capacity: { type: Number, required: true, min: 0 },
    available: { type: Number, required: true, min: 0 },
    facilities: { type: [String], default: [] },
    contact: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Shelter', shelterSchema);
