import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
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

// ---- Auth ----
router.post('/auth/login', login);
router.get('/auth/me', requireAuth, me);

// ---- Alerts ----
router.get('/alerts', listAlerts);
router.post('/alerts', requireAuth, requireAdmin, createAlert);
router.put('/alerts/:id', requireAuth, requireAdmin, updateAlert);
router.delete('/alerts/:id', requireAuth, requireAdmin, deleteAlert);

// ---- Shelters ----
router.get('/shelters', listShelters);
router.post('/shelters', requireAuth, requireAdmin, createShelter);
router.put('/shelters/:id', requireAuth, requireAdmin, updateShelter);
router.delete('/shelters/:id', requireAuth, requireAdmin, deleteShelter);

// ---- Reports ----
router.post('/reports', createReport); // public submission
router.get('/reports', requireAuth, requireAdmin, listReports);
router.get('/reports/:id', getReport);
router.put('/reports/:id/status', requireAuth, requireAdmin, updateReportStatus);

// ---- Dashboard ----
router.get('/dashboard/stats', requireAuth, requireAdmin, getStats);

// ---- Risk prediction ----
router.post('/risk/predict', predictRisk);

// ---- History + resources ----
router.get('/history', listHistory);
router.get('/resources', listResources);

export default router;
