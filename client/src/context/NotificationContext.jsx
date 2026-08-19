import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

/**
 * Lightweight in-app toast/notification system.
 * Usage:
 *   const { notify } = useNotification();
 *   notify.success('Report submitted successfully.');
 *   notify.error('Unable to load data.');
 */
const NotificationContext = createContext(null);

const TONE = {
  success: {
    icon: CheckCircle2,
    ring: 'border-emerald-200',
    bar: 'bg-emerald-500',
    iconColor: 'text-emerald-600',
  },
  error: {
    icon: XCircle,
    ring: 'border-red-200',
    bar: 'bg-red-500',
    iconColor: 'text-red-600',
  },
  warning: {
    icon: AlertTriangle,
    ring: 'border-amber-200',
    bar: 'bg-amber-500',
    iconColor: 'text-amber-600',
  },
  info: {
    icon: Info,
    ring: 'border-brand-200',
    bar: 'bg-brand-500',
    iconColor: 'text-brand-600',
  },
};

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type, message, duration = 3800) => {
      const id = ++idCounter;
      setToasts((prev) => {
        // Avoid spamming duplicate messages back-to-back.
        if (prev.some((t) => t.message === message && t.type === type)) return prev;
        return [...prev, { id, type, message }];
      });
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  const notify = useMemo(
    () => ({
      success: (msg, d) => push('success', msg, d),
      error: (msg, d) => push('error', msg, d),
      warning: (msg, d) => push('warning', msg, d),
      info: (msg, d) => push('info', msg, d),
    }),
    [push]
  );

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Toast viewport */}
      <div
        className="pointer-events-none fixed inset-x-0 top-4 z-[1000] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => {
          const tone = TONE[t.type] || TONE.info;
          const Icon = tone.icon;
          return (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-lg border ${tone.ring} bg-white p-3.5 shadow-card-lg animate-fade-in`}
            >
              <span className={`mt-0.5 shrink-0 ${tone.iconColor}`}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <p className="flex-1 text-sm font-medium text-slate-700">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return ctx;
}
