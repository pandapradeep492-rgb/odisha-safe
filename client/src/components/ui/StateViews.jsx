import { Loader2, AlertTriangle, Inbox, RefreshCw } from 'lucide-react';

/** Spinner used inline or in centered blocks. */
export function LoadingSpinner({ size = 20, className = '' }) {
  return <Loader2 size={size} className={`animate-spin ${className}`} aria-hidden="true" />;
}

/** Full-block loading state with a message. */
export function LoadingState({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500" role="status">
      <LoadingSpinner size={28} className="text-brand-600" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

/** Error state with an optional retry action. */
export function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center" role="alert">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertTriangle size={24} />
      </span>
      <p className="max-w-sm text-sm font-medium text-slate-700">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-secondary mt-1">
          <RefreshCw size={16} /> Try again
        </button>
      )}
    </div>
  );
}

/** Empty state for lists with no data. */
export function EmptyState({ title = 'Nothing here yet', message, icon: Icon = Inbox, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon size={24} />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        {message && <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>}
      </div>
      {action}
    </div>
  );
}
