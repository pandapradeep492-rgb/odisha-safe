import { Link } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, Github } from 'lucide-react';

const COLS = [
  {
    title: 'Platform',
    links: [
      { to: '/alerts', label: 'Live Alerts' },
      { to: '/map', label: 'Disaster Map' },
      { to: '/shelters', label: 'Shelter Finder' },
      { to: '/risk', label: 'Risk Prediction' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/safety', label: 'Safety Guide' },
      { to: '/emergency', label: 'Emergency Help' },
      { to: '/history', label: 'Disaster History' },
      { to: '/report', label: 'Report Disaster' },
    ],
  },
  {
    title: 'Project',
    links: [
      { to: '/about', label: 'About Project' },
      { to: '/login', label: 'Admin Login' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="container-page py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + disclaimer */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                <ShieldCheck size={20} />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                ODISHA <span className="text-brand-400">SAFE</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              AI &amp; GIS based smart disaster management and emergency response system for Odisha.
              Built as a college project prototype to demonstrate alerts, mapping, shelter discovery
              and citizen reporting.
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <span>
                College Project Prototype. Not an official Government of Odisha or OSDMA platform.
                Demo data is not a real-time emergency warning.
              </span>
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-slate-400 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} ODISHA SAFE — College Project Prototype.</p>
          <div className="flex items-center gap-4">
            <span>Stay Alert. Stay Safe. Save Lives.</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <Github size={14} /> Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
