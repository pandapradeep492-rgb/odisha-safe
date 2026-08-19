import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, Phone, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/alerts', label: 'Live Alerts' },
  { to: '/map', label: 'Disaster Map' },
  { to: '/shelters', label: 'Shelters' },
  { to: '/report', label: 'Report' },
  { to: '/safety', label: 'Safety Guide' },
  { to: '/risk', label: 'Risk Prediction' },
  { to: '/history', label: 'History' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-brand-50 text-brand-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-[500] border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <nav className="container-page flex h-16 items-center justify-between gap-3" aria-label="Primary">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="ODISHA SAFE home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
            <ShieldCheck size={20} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-extrabold tracking-tight text-slate-900">
              ODISHA <span className="text-brand-600">SAFE</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
              Disaster Management Prototype
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/emergency" className="btn-danger animate-pulse-ring">
            <Phone size={16} /> Emergency
          </Link>
          {isAuthenticated ? (
            <Link to="/admin" className="btn-secondary">
              <LayoutDashboard size={16} /> Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn-secondary">
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-page space-y-1 py-3">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/emergency" className="btn-danger">
                <Phone size={16} /> Emergency
              </Link>
              {isAuthenticated ? (
                <Link to="/admin" className="btn-secondary">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn-secondary">
                  <LogIn size={16} /> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
