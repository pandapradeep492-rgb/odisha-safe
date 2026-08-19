import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, getToken, setToken as persistToken } from '../services/api.js';

/**
 * Authentication context for the admin area.
 *
 * - Talks to POST /api/auth/login and GET /api/auth/me.
 * - Persists the JWT in localStorage (via services/api).
 * - Provides a DEMO fallback login so the admin dashboard can be showcased
 *   without a running backend. Demo sessions are clearly flagged.
 *
 * SECURITY: No passwords or secrets are hardcoded here. The demo fallback only
 * activates when the backend is unreachable (network error).
 */
const AuthContext = createContext(null);
const USER_KEY = 'odisha_safe_user';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [initializing, setInitializing] = useState(true);

  // On mount, validate any existing token with the backend.
  useEffect(() => {
    let cancelled = false;
    async function validate() {
      const token = getToken();
      if (!token) {
        setInitializing(false);
        return;
      }
      // Demo sessions can't be validated against a server; trust local copy.
      if (token.startsWith('demo.')) {
        setInitializing(false);
        return;
      }
      try {
        const me = await api.get('/auth/me');
        if (!cancelled && me?.user) {
          setUser(me.user);
          localStorage.setItem(USER_KEY, JSON.stringify(me.user));
        }
      } catch {
        // Token invalid/expired — clear it silently.
        if (!cancelled) {
          persistToken(null);
          localStorage.removeItem(USER_KEY);
          setUser(null);
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    }
    validate();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      persistToken(res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      setUser(res.user);
      return { ok: true, source: 'api', user: res.user };
    } catch (err) {
      // Network error => backend down. Offer a clearly-labeled demo session so
      // the dashboard remains demoable. Real credential errors are surfaced.
      const isNetworkError = err.name !== 'ApiError';
      if (isNetworkError) {
        const demoUser = {
          id: 'demo-admin',
          name: 'Demo Administrator',
          email: email || 'admin@odishasafe.demo',
          role: 'admin',
          demo: true,
        };
        persistToken(`demo.${Date.now()}`);
        localStorage.setItem(USER_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
        return { ok: true, source: 'demo', user: demoUser };
      }
      return { ok: false, error: err.message || 'Invalid credentials' };
    }
  }, []);

  const logout = useCallback(() => {
    persistToken(null);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isDemoSession: !!user?.demo,
      initializing,
      login,
      logout,
    }),
    [user, initializing, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
