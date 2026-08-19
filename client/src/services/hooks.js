import { useCallback, useEffect, useRef, useState } from 'react';
import { withDemoFallback } from './api.js';

/**
 * useResource — generic data-loading hook with loading/error/empty states and
 * a graceful demo-data fallback when the backend is unreachable.
 *
 * @param {Function} apiCall   () => Promise (uses services/api)
 * @param {*} demoData         fallback value (or function) used on network failure
 * @param {Array} deps         dependency list to re-fetch
 */
export function useResource(apiCall, demoData, deps = []) {
  const [data, setData] = useState(null);
  const [source, setSource] = useState('api'); // 'api' | 'demo'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiRef = useRef(apiCall);
  apiRef.current = apiCall;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await withDemoFallback(() => apiRef.current(), demoData);
      setData(res.data);
      setSource(res.source);
    } catch (err) {
      setError(err.message || 'Unable to load data.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, source, loading, error, reload: load, setData };
}
