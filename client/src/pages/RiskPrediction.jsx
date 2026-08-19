import { useState } from 'react';
import { Brain, Gauge, ArrowRight, Info } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import DemoBanner from '../components/ui/DemoBanner.jsx';
import { RiskBadge } from '../components/ui/Badges.jsx';
import { LoadingSpinner } from '../components/ui/StateViews.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { RiskService } from '../services/resources.js';
import { ApiError } from '../services/api.js';
import { clamp } from '../utils/helpers.js';

const DEFAULTS = {
  rainfall: 120,
  windSpeed: 60,
  riverLevel: 'Moderate',
  temperature: 34,
  humidity: 70,
  populationDensity: 'Medium',
  historicalRisk: 'Moderate',
};

const RIVER = { Low: 5, Moderate: 15, High: 28, 'Very High': 40 };
const POP = { Low: 4, Medium: 8, High: 12 };
const HIST = { Low: 5, Moderate: 12, High: 20 };

/**
 * Transparent rule-based risk model (client-side fallback).
 * Structured so a real ML model (Python/FastAPI) can replace it via /api/risk/predict.
 */
export function computeRuleBasedRisk(input) {
  const reasons = [];
  let score = 0;

  // Rainfall (0–35)
  const rain = clamp(Number(input.rainfall) || 0, 0, 400);
  const rainScore = clamp((rain / 200) * 35, 0, 35);
  score += rainScore;
  if (rain >= 150) reasons.push('Heavy rainfall increases flood potential.');

  // Wind (0–30)
  const wind = clamp(Number(input.windSpeed) || 0, 0, 250);
  const windScore = clamp((wind / 120) * 30, 0, 30);
  score += windScore;
  if (wind >= 90) reasons.push('High wind speed indicates cyclonic conditions.');

  // River level (0–40 mapped down)
  score += RIVER[input.riverLevel] ?? 15;
  if (['High', 'Very High'].includes(input.riverLevel)) reasons.push('Elevated river level raises flood risk.');

  // Heat contribution (temperature + low humidity)
  const temp = Number(input.temperature) || 0;
  if (temp >= 42) {
    score += 12;
    reasons.push('Very high temperature suggests heat-wave risk.');
  } else if (temp >= 38) {
    score += 6;
  }

  // Population + historical modifiers
  score += POP[input.populationDensity] ?? 8;
  score += HIST[input.historicalRisk] ?? 12;
  if (input.historicalRisk === 'High') reasons.push('Area has high historical disaster risk.');

  const finalScore = Math.round(clamp(score, 0, 100));
  let level = 'LOW';
  if (finalScore >= 80) level = 'CRITICAL';
  else if (finalScore >= 60) level = 'HIGH';
  else if (finalScore >= 35) level = 'MODERATE';

  const actionByLevel = {
    LOW: 'Conditions appear normal. Continue routine monitoring of official updates.',
    MODERATE: 'Stay alert. Prepare emergency supplies and monitor official warnings.',
    HIGH: 'Prepare evacuation resources and monitor official warnings closely.',
    CRITICAL: 'Consider early evacuation of vulnerable groups and follow official emergency orders.',
  };

  return {
    score: finalScore,
    level,
    action: actionByLevel[level],
    reasons: reasons.length ? reasons : ['Inputs indicate limited immediate hazard.'],
    model: 'rule-based',
  };
}

export default function RiskPrediction() {
  const { notify } = useNotification();
  const [form, setForm] = useState(DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      // Try the backend (which may proxy a Python ML service).
      const res = await RiskService.predict(form);
      setResult(res);
      notify.success('Risk assessment complete.');
    } catch (err) {
      // Fall back to the transparent rule-based model.
      if (err instanceof ApiError) {
        notify.error(err.message || 'Prediction failed.');
      } else {
        const local = computeRuleBasedRisk(form);
        setResult(local);
        notify.info('Showing rule-based estimate (backend offline).');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="AI Risk Prediction"
        icon={Brain}
        title="Disaster Risk Prediction (Prototype)"
        description="Enter environmental parameters to estimate a disaster-risk score. This is a transparent, rule-based prototype — not an official prediction system."
      />

      <div className="container-page py-8">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <form onSubmit={handleSubmit} className="card space-y-4 p-6 lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="rainfall" className="form-label">Rainfall (mm)</label>
                <input id="rainfall" type="number" min="0" className="form-input" value={form.rainfall} onChange={update('rainfall')} />
              </div>
              <div>
                <label htmlFor="wind" className="form-label">Wind speed (km/h)</label>
                <input id="wind" type="number" min="0" className="form-input" value={form.windSpeed} onChange={update('windSpeed')} />
              </div>
              <div>
                <label htmlFor="river" className="form-label">River level</label>
                <select id="river" className="form-select" value={form.riverLevel} onChange={update('riverLevel')}>
                  {Object.keys(RIVER).map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="temp" className="form-label">Temperature (°C)</label>
                <input id="temp" type="number" className="form-input" value={form.temperature} onChange={update('temperature')} />
              </div>
              <div>
                <label htmlFor="humidity" className="form-label">Humidity (%)</label>
                <input id="humidity" type="number" min="0" max="100" className="form-input" value={form.humidity} onChange={update('humidity')} />
              </div>
              <div>
                <label htmlFor="pop" className="form-label">Population density</label>
                <select id="pop" className="form-select" value={form.populationDensity} onChange={update('populationDensity')}>
                  {Object.keys(POP).map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="hist" className="form-label">Historical risk</label>
                <select id="hist" className="form-select" value={form.historicalRisk} onChange={update('historicalRisk')}>
                  {Object.keys(HIST).map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <>
                  <LoadingSpinner size={16} /> Assessing…
                </>
              ) : (
                <>
                  <Gauge size={16} /> Assess Risk
                </>
              )}
            </button>
          </form>

          {/* Result */}
          <div className="space-y-4 lg:col-span-2">
            {result ? (
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Assessment Result</h3>
                  <RiskBadge level={result.level} size="lg" />
                </div>

                {/* Score gauge */}
                <div className="mt-5 text-center">
                  <div className="relative mx-auto h-32 w-32">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${(result.score / 100) * 327} 327`}
                        className={
                          result.level === 'CRITICAL'
                            ? 'text-red-600'
                            : result.level === 'HIGH'
                              ? 'text-orange-500'
                              : result.level === 'MODERATE'
                                ? 'text-amber-500'
                                : 'text-emerald-500'
                        }
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-slate-900">{result.score}</span>
                      <span className="text-xs text-slate-500">Risk Score</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recommended action</p>
                  <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-700">
                    <ArrowRight size={14} className="mt-0.5 shrink-0 text-brand-600" />
                    {result.action}
                  </p>
                </div>

                {result.reasons?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Key factors</p>
                    <ul className="mt-2 space-y-1.5">
                      {result.reasons.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-400">
                  Model: {result.model || 'rule-based'} · Prototype estimate
                </p>
              </div>
            ) : (
              <div className="card flex h-full flex-col items-center justify-center p-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Gauge size={28} />
                </span>
                <p className="mt-4 text-sm font-medium text-slate-700">Enter parameters and assess</p>
                <p className="mt-1 text-sm text-slate-500">
                  Your risk score and recommended action will appear here.
                </p>
              </div>
            )}

            <div className="flex items-start gap-2 rounded-lg border border-brand-200 bg-brand-50 p-3 text-xs text-brand-800">
              <Info size={16} className="mt-0.5 shrink-0" />
              <span>
                This prototype uses a transparent rule-based model. The API endpoint
                <span className="font-mono"> /api/risk/predict </span>
                is structured so a trained ML model (Python/FastAPI/scikit-learn) can be integrated later.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <DemoBanner message="Risk scores are illustrative and generated by a simple prototype model. Do not use for real safety decisions — always follow official warnings." />
        </div>
      </div>
    </div>
  );
}
