import {
  Info,
  Target,
  Layers,
  ShieldCheck,
  Bell,
  MapPin,
  LifeBuoy,
  FileWarning,
  Brain,
  BarChart3,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';

const OBJECTIVES = [
  { icon: Bell, text: 'Provide simulated disaster alerts by district and risk level.' },
  { icon: LifeBuoy, text: 'Help users find nearby shelters with capacity and facilities.' },
  { icon: FileWarning, text: 'Enable citizen disaster reporting with a tracked workflow.' },
  { icon: MapPin, text: 'Visualise disaster information using an interactive GIS map.' },
  { icon: ShieldCheck, text: 'Provide emergency information and safety guidance.' },
  { icon: Brain, text: 'Demonstrate a transparent disaster-risk analysis prototype.' },
  { icon: BarChart3, text: 'Offer an administrative monitoring dashboard with analytics.' },
];

const TECH = [
  { group: 'Frontend', items: ['React', 'React Router', 'Tailwind CSS', 'Leaflet + OpenStreetMap', 'Recharts', 'Lucide Icons'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'JWT Auth', 'bcrypt'] },
  { group: 'Database', items: ['MongoDB', 'Mongoose'] },
  { group: 'Optional ML', items: ['Python', 'FastAPI', 'scikit-learn'] },
];

const JOURNEY = [
  'Home',
  'Check Alert',
  'Select District',
  'View Disaster Map',
  'Find Nearest Shelter',
  'Get Safety Instructions',
  'Report Disaster',
  'Admin Verifies Report',
  'Dashboard Analytics',
];

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow="About Project"
        icon={Info}
        title="About ODISHA SAFE"
        description="An AI & GIS based smart disaster management and emergency response system — built as a college project prototype."
      />

      <div className="container-page space-y-10 py-8">
        {/* Prototype disclaimer */}
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">College Project Prototype — Important Notice</p>
          <p className="mt-1 leading-relaxed">
            ODISHA SAFE is an educational prototype. It is <strong>not</strong> an official Government
            of Odisha or OSDMA platform, and its alerts, maps and numbers are simulated demo data —
            not real-time official warnings. In a real emergency, always follow official government
            instructions and dial your official emergency number.
          </p>
        </div>

        {/* Problem statement */}
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Target size={20} className="text-brand-600" /> Problem Statement
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
            Disasters can cause significant damage to lives, infrastructure and communities. Timely
            information, emergency reporting, shelter discovery and risk awareness can help improve
            preparedness and response. ODISHA SAFE demonstrates how a modern web platform can bring
            these capabilities together for a disaster-prone region like Odisha.
          </p>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <ShieldCheck size={20} className="text-brand-600" /> Objectives
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECTIVES.map((o, i) => (
              <div key={i} className="card flex items-start gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <o.icon size={18} />
                </span>
                <p className="text-sm text-slate-700">{o.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Layers size={20} className="text-brand-600" /> Technologies Used
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TECH.map((t) => (
              <div key={t.group} className="card p-4">
                <h3 className="text-sm font-semibold text-slate-900">{t.group}</h3>
                <ul className="mt-2 space-y-1.5">
                  {t.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-400" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* User journey */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">User Journey</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {JOURNEY.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
                  {step}
                </span>
                {i < JOURNEY.length - 1 && <span className="text-slate-300">→</span>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
