import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Siren,
  MapPin,
  FileWarning,
  ArrowRight,
  Bell,
  LifeBuoy,
  Activity,
  Waves,
  Wind,
  Zap,
  ThermometerSun,
  BookOpen,
  BarChart3,
} from 'lucide-react';
import MapComponent from '../components/map/MapComponent.jsx';
import MapLegend from '../components/map/MapLegend.jsx';
import AlertCard from '../components/cards/AlertCard.jsx';
import { RiskBadge, DemoBadge } from '../components/ui/Badges.jsx';
import { useResource } from '../services/hooks.js';
import { AlertsService } from '../services/resources.js';
import {
  alerts as demoAlerts,
  shelters as demoShelters,
  riskZones as demoRiskZones,
  currentStatus,
} from '../data/demoData.js';

const STATUS_ICON = { Cyclone: Wind, Flood: Waves, Lightning: Zap, 'Heat Wave': ThermometerSun };

const HOW_IT_WORKS = [
  { icon: Bell, title: 'Check Alerts', text: 'View simulated district-wise disaster alerts and risk levels.' },
  { icon: MapPin, title: 'Explore the Map', text: 'See risk zones, shelters and resources on an interactive GIS map.' },
  { icon: LifeBuoy, title: 'Find a Shelter', text: 'Locate the nearest shelter with capacity and facilities.' },
  { icon: FileWarning, title: 'Report & Respond', text: 'Report incidents; admins verify and coordinate response.' },
];

export default function Home() {
  const { data: alerts } = useResource(() => AlertsService.list(), demoAlerts, []);
  const featured = (alerts || demoAlerts).filter((a) => a.status === 'Active').slice(0, 3);

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60rem_40rem_at_70%_-10%,#59a2ff,transparent)]" />
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
                <ShieldCheck size={14} /> College Project Prototype
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                ODISHA <span className="text-brand-300">SAFE</span>
              </h1>
              <p className="mt-3 text-lg font-medium text-brand-100 sm:text-xl">
                Smart Disaster Management &amp; Emergency Response
              </p>
              <p className="mt-4 max-w-xl text-brand-100/80">
                “Stay Alert. Stay Safe. Save Lives.” An AI &amp; GIS based platform demonstrating
                alerts, mapping, shelter discovery, citizen reporting and risk awareness for Odisha.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/alerts" className="btn-primary bg-white text-brand-800 hover:bg-brand-50">
                  <Bell size={18} /> View Live Alerts
                </Link>
                <Link to="/shelters" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
                  <MapPin size={18} /> Find Nearest Shelter
                </Link>
                <Link to="/report" className="btn-ghost text-white hover:bg-white/10">
                  <FileWarning size={18} /> Report Disaster
                </Link>
              </div>
            </div>

            {/* Current status card */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                  <Activity size={18} /> Current Disaster Status
                </h2>
                <DemoBadge label="Demo Data" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {currentStatus.map((s) => {
                  const Icon = STATUS_ICON[s.type] || Activity;
                  return (
                    <div key={s.type} className="rounded-xl bg-white/95 p-4 text-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                          <Icon size={18} />
                        </span>
                        <RiskBadge level={s.level} />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-slate-900">{s.type}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-brand-100/70">
                Simulated status for demonstration — not an official warning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
          {[
            { label: 'Districts Covered', value: '15+' },
            { label: 'Demo Shelters', value: demoShelters.length },
            { label: 'Active Demo Alerts', value: demoAlerts.filter((a) => a.status === 'Active').length },
            { label: 'Disaster Types', value: '8' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-brand-700">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ALERTS ================= */}
      <section className="container-page py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="eyebrow">
              <Siren size={14} /> Live Alerts
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Featured Disaster Alerts</h2>
          </div>
          <Link to="/alerts" className="hidden items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 sm:inline-flex">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => (
            <AlertCard key={a.id} alert={a} />
          ))}
        </div>
      </section>

      {/* ================= PREVIEW MAP ================= */}
      <section className="bg-slate-100 py-14">
        <div className="container-page">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">
                <MapPin size={14} /> GIS Map
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Interactive Odisha Disaster Map</h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-600">
                Explore simulated risk zones, shelters and emergency resources. Toggle layers and
                click any marker for details.
              </p>
            </div>
            <Link to="/map" className="btn-primary w-fit">
              Open full map <ArrowRight size={16} />
            </Link>
          </div>
          <MapComponent
            height={420}
            riskZones={demoRiskZones}
            shelters={demoShelters}
          />
          <div className="mt-3">
            <MapLegend />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="container-page py-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <ShieldCheck size={14} /> How It Works
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">A simple journey from alert to action</h2>
          <p className="mt-2 text-sm text-slate-600">
            ODISHA SAFE brings together alerts, maps, shelters and reporting into one clear workflow.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} className="card relative p-5">
              <span className="absolute right-4 top-4 text-3xl font-black text-slate-100">{i + 1}</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <step.icon size={22} />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SAFETY + EMERGENCY CTA ================= */}
      <section className="container-page pb-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card flex flex-col justify-between gap-4 bg-brand-600 p-6 text-white sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <BookOpen size={20} /> Learn Disaster Safety
              </h3>
              <p className="mt-1 text-sm text-brand-100">
                Before, during and after guidance for cyclones, floods, lightning and heat waves.
              </p>
            </div>
            <Link to="/safety" className="btn-secondary shrink-0 border-white/30 bg-white/10 text-white hover:bg-white/20">
              Safety Guide <ArrowRight size={16} />
            </Link>
          </div>

          <div className="card flex flex-col justify-between gap-4 bg-red-600 p-6 text-white sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Siren size={20} /> Need Emergency Help?
              </h3>
              <p className="mt-1 text-sm text-red-100">
                Quick access to emergency services and checklists (demo numbers).
              </p>
            </div>
            <Link to="/emergency" className="btn-secondary shrink-0 border-white/30 bg-white/10 text-white hover:bg-white/20">
              Emergency Help <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Analytics teaser */}
        <div className="mt-5 card flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BarChart3 size={22} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Explore Disaster History &amp; Analytics</h3>
              <p className="text-sm text-slate-600">Visualise simulated historical disaster trends across districts.</p>
            </div>
          </div>
          <Link to="/history" className="btn-secondary shrink-0">
            View History <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
