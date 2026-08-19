/**
 * Centralized API/service layer for ODISHA SAFE.
 *
 * All network calls go through this module. It talks to the Express backend
 * defined by VITE_API_URL. If the backend is unreachable (e.g. during a
 * frontend-only demo), callers can gracefully fall back to clearly-labeled
 * demo data (see src/data/*).
 *
 * NOTE: This file never contains secrets. Auth tokens are stored in
 * localStorage and attached to requests as a Bearer token.
 */

const API_URL = import.meta.env.VITE_API_URL || '/api';
const TOKEN_KEY = 'odisha_safe_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

/**
 * Thrown when the API returns a non-2xx response.
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request(path, { method = 'GET', body, headers = {}, signal } = {}) {
  const token = getToken();
  const isFormData = body instanceof FormData;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    signal,
  });

  // Attempt to parse JSON; some endpoints may return empty bodies.
  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message = (data && data.message) || res.statusText || 'Request failed';
    throw new ApiError(message, res.status, data);
  }

  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

/**
 * Helper: run an API call, but fall back to demo data if the network fails
 * (backend not running). Rethrows real API errors (4xx/5xx) so callers can
 * show proper error states.
 *
 * @param {Function} apiCall  async function performing the request
 * @param {*} demoData        value (or function returning value) used on network failure
 * @returns {Promise<{ data: any, source: 'api' | 'demo' }>}
 */
export async function withDemoFallback(apiCall, demoData) {
  try {
    const data = await apiCall();
    return { data, source: 'api' };
  } catch (err) {
    // Only fall back for network-level failures (backend down / offline),
    // not for real HTTP errors where the server responded.
    const isNetworkError = !(err instanceof ApiError);
    if (isNetworkError) {
      const resolved = typeof demoData === 'function' ? demoData() : demoData;
      return { data: resolved, source: 'demo' };
    }
    throw err;
  }
}

export { API_URL };
