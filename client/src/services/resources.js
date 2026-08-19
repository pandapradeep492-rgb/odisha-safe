/**
 * Domain service functions. Each returns a promise from the API layer.
 * Components pair these with demo-data fallbacks via useResource / withDemoFallback.
 */
import { api } from './api.js';

export const AlertsService = {
  list: () => api.get('/alerts'),
  create: (payload) => api.post('/alerts', payload),
  update: (id, payload) => api.put(`/alerts/${id}`, payload),
  remove: (id) => api.del(`/alerts/${id}`),
};

export const SheltersService = {
  list: (params = '') => api.get(`/shelters${params}`),
  create: (payload) => api.post('/shelters', payload),
  update: (id, payload) => api.put(`/shelters/${id}`, payload),
  remove: (id) => api.del(`/shelters/${id}`),
};

export const ReportsService = {
  list: () => api.get('/reports'),
  get: (id) => api.get(`/reports/${id}`),
  create: (payload) => api.post('/reports', payload),
  updateStatus: (id, status) => api.put(`/reports/${id}/status`, { status }),
};

export const HistoryService = {
  list: () => api.get('/history'),
};

export const DashboardService = {
  stats: () => api.get('/dashboard/stats'),
};

export const RiskService = {
  predict: (payload) => api.post('/risk/predict', payload),
};

export const ResourcesService = {
  list: () => api.get('/resources'),
};
