import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public pages
import Home from './pages/Home.jsx';
import LiveAlerts from './pages/LiveAlerts.jsx';
import DisasterMap from './pages/DisasterMap.jsx';
import ShelterFinder from './pages/ShelterFinder.jsx';
import ReportDisaster from './pages/ReportDisaster.jsx';
import EmergencyHelp from './pages/EmergencyHelp.jsx';
import SafetyGuide from './pages/SafetyGuide.jsx';
import RiskPrediction from './pages/RiskPrediction.jsx';
import DisasterHistory from './pages/DisasterHistory.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

/**
 * App shell + route table.
 * The Admin layout supplies its own sidebar, so it renders without the public
 * chrome inside a protected route.
 */
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Routes>
        {/* Admin area (protected, own layout) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Public area with shared navbar + footer */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/alerts" element={<LiveAlerts />} />
                  <Route path="/map" element={<DisasterMap />} />
                  <Route path="/shelters" element={<ShelterFinder />} />
                  <Route path="/report" element={<ReportDisaster />} />
                  <Route path="/emergency" element={<EmergencyHelp />} />
                  <Route path="/safety" element={<SafetyGuide />} />
                  <Route path="/risk" element={<RiskPrediction />} />
                  <Route path="/history" element={<DisasterHistory />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
