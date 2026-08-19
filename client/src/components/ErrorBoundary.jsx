import { Component } from 'react';

/**
 * Top-level error boundary so a runtime error in one page doesn't blank the app.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
          <p className="max-w-md text-sm text-slate-600">
            An unexpected error occurred while rendering this page. Try reloading the app.
          </p>
          <button className="btn-primary" onClick={() => window.location.assign('/')}>
            Reload ODISHA SAFE
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
