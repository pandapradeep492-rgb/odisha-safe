import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

// Fix default Leaflet marker icon paths when bundled by Vite.
import 'leaflet/dist/leaflet.css';

// Remove the static "how to run" boot hint from index.html once React is ready
// to mount. If the app is opened incorrectly (e.g. VS Code Live Server), React
// never runs and the hint stays visible instead of a blank white screen.
const bootHint = document.getElementById('osafe-boot-hint');
if (bootHint) bootHint.remove();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

