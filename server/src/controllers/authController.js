import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { signToken } from '../middleware/auth.js';

/**
 * POST /api/auth/login
 * Validates credentials and returns a JWT + safe user object.
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email: String(email).toLowerCase() }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid email or password.' });

  const token = signToken(user);
  res.json({ token, user: user.toSafeJSON() });
});

/**
 * GET /api/auth/me
 * Returns the currently authenticated user (validates the token).
 */
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});
