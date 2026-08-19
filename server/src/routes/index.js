import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { requireDb } from '../middleware/requireDb.js';
import { login, me } from '../controllers/authController.js';
import { listAlerts, createAlert, updateAlert, deleteAlert } from '../controllers/alertController.js';
import {
  listShelters,
  createShelter,
  updateShelter,
  deleteShelter,
} from '../controllers/shelterController.js';
import {
  createReport,
  listReports,
  getReport,
  updateReportStatus,
} from '../controllers/reportController.js';
import { getStats } from '../controllers/dashboardController.js';
import { predictRisk } from '../controllers/riskController.js';
import { listHistory, listResources } from '../controllers/historyController.js';

const router = Router();

// NOTE: `requireDb` is placed before every DB-backed handler so that, when
// MongoDB is unavailable, the API responds instantly with a 503 (demo mode)
// instead of hanging. The frontend then falls back to clearly-labeled demo
// data. Routes that don't need the DB (risk/predict) skip this guard.

// ---- Auth ----
router.post('/auth/login', requireDb, login);
router.get('/auth/me', requireDb, requireAuth, me);

// ---- Alerts ----
router.get('/alerts', requireDb, listAlerts);
router.post('/alerts', requireDb, requireAuth, requireAdmin, createAlert);
router.put('/alerts/:id', requireDb, requireAuth, requireAdmin, updateAlert);
router.delete('/alerts/:id', requireDb, requireAuth, requireAdmin, deleteAlert);

// ---- Shelters ----
router.get('/shelters', requireDb, listShelters);
router.post('/shelters', requireDb, requireAuth, requireAdmin, createShelter);
router.put('/shelters/:id', requireDb, requireAuth, requireAdmin, updateShelter);
router.delete('/shelters/:id', requireDb, requireAuth, requireAdmin, deleteShelter);

// ---- Reports ----
router.post('/reports', requireDb, createReport); // public submission
router.get('/reports', requireDb, requireAuth, requireAdmin, listReports);
router.get('/reports/:id', requireDb, getReport);
router.put('/reports/:id/status', requireDb, requireAuth, requireAdmin, updateReportStatus);

// ---- Dashboard ----
router.get('/dashboard/stats', requireDb, requireAuth, requireAdmin, getStats);

// ---- Risk prediction (no DB required; audit-log write is best-effort) ----
router.post('/risk/predict', predictRisk);

// ---- History + resources ----
router.get('/history', requireDb, listHistory);
router.get('/resources', requireDb, listResources);

export default router;
