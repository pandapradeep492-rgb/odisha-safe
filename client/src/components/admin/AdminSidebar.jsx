import { NavLink, Link } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Siren,
  LifeBuoy,
  LogOut,
  X,
  Home,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const LINKS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/reports', label: 'Reports', icon: FileText },
  { to: '/admin/alerts', label: 'Alerts', icon: Siren },
  { to: '/admin/shelters', label: 'Shelters', icon: LifeBuoy },
];

/**
 * Admin sidebar. On mobile it becomes a slide-over controlled by `open`.
 */
export default function AdminSidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`;

  const content = (
    <div className="flex h-full flex-col bg-slate-900 text-white">
      <div className="flex items-center justify-between px-4 py-4">
        <Link to="/admin" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
            <ShieldCheck size={20} />
          </span>
          <div className="leading-none">
            <p className="text-sm font-extrabold">ODISHA SAFE</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Admin Console</p>
          </div>
        </Link>
        <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-white/10 lg:hidden" aria-label="Close menu">
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
            <l.icon size={18} /> {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        {user?.demo && (
          <span className="mb-3 inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300">
            Demo session
          </span>
        )}
        <div className="mb-3 px-1">
          <p className="truncate text-sm font-medium text-white">{user?.name || 'Administrator'}</p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
        <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
          <Home size={18} /> Public Site
        </Link>
        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>

      {/* Mobile slide-over */}
      {open && (
        <div className="fixed inset-0 z-[600] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60" onClick={onClose} />
          <div className="absolute left-0 top-0 h-full w-72 animate-fade-in">{content}</div>
        </div>
      )}
    </>
  );
}
