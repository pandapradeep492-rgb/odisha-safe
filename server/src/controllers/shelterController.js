import Shelter from '../models/Shelter.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/** GET /api/shelters?district= */
export const listShelters = asyncHandler(async (req, res) => {
  const { district } = req.query;
  const filter = district ? { district } : {};
  const shelters = await Shelter.find(filter).sort({ name: 1 });
  res.json(shelters);
});

/** POST /api/shelters (admin) */
export const createShelter = asyncHandler(async (req, res) => {
  const shelter = await Shelter.create(req.body);
  res.status(201).json(shelter);
});

/** PUT /api/shelters/:id (admin) */
export const updateShelter = asyncHandler(async (req, res) => {
  const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!shelter) return res.status(404).json({ message: 'Shelter not found.' });
  res.json(shelter);
});

/** DELETE /api/shelters/:id (admin) */
export const deleteShelter = asyncHandler(async (req, res) => {
  const shelter = await Shelter.findByIdAndDelete(req.params.id);
  if (!shelter) return res.status(404).json({ message: 'Shelter not found.' });
  res.json({ message: 'Shelter deleted.' });
});
