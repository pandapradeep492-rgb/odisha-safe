import { useState } from 'react';
import { BookOpen, ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import { safetyGuide } from '../data/safetyGuide.js';
import { iconByName } from '../utils/helpers.js';

const PHASES = [
  { key: 'before', label: 'Before', icon: ShieldAlert, tone: 'bg-brand-50 text-brand-700 border-brand-200' },
  { key: 'during', label: 'During', icon: Activity, tone: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'after', label: 'After', icon: CheckCircle2, tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

export default function SafetyGuide() {
  const [active, setActive] = useState(safetyGuide[0].id);
  const current = safetyGuide.find((g) => g.id === active) || safetyGuide[0];
  const Icon = iconByName(current.icon);

  return (
    <div>
      <PageHeader
        eyebrow="Safety Guide"
        icon={BookOpen}
        title="Disaster Safety Guide"
        description="Practical before, during and after guidance for common disasters in Odisha. Written in simple language."
      />

      <div className="container-page py-8">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Disaster categories">
          {safetyGuide.map((g) => {
            const TabIcon = iconByName(g.icon);
            const isActive = g.id === active;
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(g.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <TabIcon size={16} /> {g.title}
              </button>
            );
          })}
        </div>

        {/* Active category */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon size={24} />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{current.title}</h2>
              <p className="text-sm text-slate-600">{current.summary}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {PHASES.map((phase) => {
              const PhaseIcon = phase.icon;
              return (
                <section key={phase.key} className="card p-5">
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${phase.tone}`}>
                    <PhaseIcon size={14} /> {phase.label.toUpperCase()}
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {current[phase.key].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
