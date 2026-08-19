import {
  Siren,
  Phone,
  Shield,
  Flame,
  Ambulance,
  PhoneCall,
  LifeBuoy,
  Radio,
  CheckSquare,
  Wind,
  Waves,
  Zap,
  ThermometerSun,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import DemoBanner from '../components/ui/DemoBanner.jsx';
import { emergencyContacts, emergencyChecklist } from '../data/emergencyContacts.js';

const ICONS = { Shield, Flame, Ambulance, PhoneCall, LifeBuoy, Radio };

const QUICK_GUIDES = [
  {
    icon: Wind,
    title: 'During a Cyclone',
    points: ['Stay indoors, away from windows', 'Switch off gas/electricity if advised', 'Do not venture out during the calm "eye"'],
  },
  {
    icon: Waves,
    title: 'During a Flood',
    points: ['Move to higher ground early', 'Never cross moving flood water', 'Follow official evacuation orders'],
  },
  {
    icon: Zap,
    title: 'During Lightning',
    points: ['Go indoors immediately', 'Avoid open fields and tall trees', 'Unplug wired electronics'],
  },
  {
    icon: ThermometerSun,
    title: 'During a Heat Wave',
    points: ['Drink water frequently', 'Avoid the sun 12–3 PM', 'Never leave anyone in a parked car'],
  },
];

export default function EmergencyHelp() {
  return (
    <div>
      <PageHeader
        eyebrow="Emergency Help"
        icon={Siren}
        title="Emergency Assistance"
        description="Quick access to emergency services and practical guidance. Numbers below are demo/educational placeholders."
      />

      <div className="container-page space-y-8 py-8">
        <DemoBanner message="⚠️ Demo numbers for a college project. These are NOT verified official emergency numbers. In a real emergency, dial your official local emergency number (112 in India) and follow authorities." />

        {/* Emergency contacts */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Emergency Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {emergencyContacts.map((c) => {
              const Icon = ICONS[c.icon] || Phone;
              return (
                <div key={c.id} className="card flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon size={22} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{c.label}</p>
                      <p className="text-xs text-slate-500">{c.demoNote}</p>
                    </div>
                  </div>
                  <a href={`tel:${c.number}`} className="btn-danger shrink-0" aria-label={`Call ${c.label} (demo ${c.number})`}>
                    <Phone size={16} /> {c.number}
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick guides */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">What to do</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_GUIDES.map((g) => (
              <div key={g.title} className="card p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <g.icon size={22} />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{g.title}</h3>
                <ul className="mt-2 space-y-1.5">
                  {g.points.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <CheckSquare size={20} className="text-brand-600" /> Emergency Preparedness Checklist
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {emergencyChecklist.map((item) => (
              <label key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                {item}
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
