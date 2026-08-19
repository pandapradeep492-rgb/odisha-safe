import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar.jsx';
import { DemoBadge } from '../../components/ui/Badges.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import AdminOverview from './AdminOverview.jsx';
import AdminReports from './AdminReports.jsx';
import AdminAlerts from './AdminAlerts.jsx';
import AdminShelters from './AdminShelters.jsx';

/**
 * Admin layout shell: sidebar + top bar + nested routes.
 */
export default function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-[400] flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-slate-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            {user?.demo && <DemoBadge label="Demo session" />}
            <span className="hidden text-sm text-slate-600 sm:block">{user?.name}</span>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="alerts" element={<AdminAlerts />} />
            <Route path="shelters" element={<AdminShelters />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
