import { useState } from 'react';
import { FileWarning, CheckCircle2, Copy, LocateFixed } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import DemoBanner from '../components/ui/DemoBanner.jsx';
import { StatusBadge } from '../components/ui/Badges.jsx';
import { LoadingSpinner } from '../components/ui/StateViews.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { ReportsService } from '../services/resources.js';
import { ApiError } from '../services/api.js';
import { DISTRICTS, DISASTER_TYPES, SEVERITIES } from '../data/constants.js';

const EMPTY = {
  name: '',
  mobile: '',
  disasterType: '',
  district: '',
  location: '',
  description: '',
  severity: 'Moderate',
};

/** Generate a local demo report ID when the backend is unreachable. */
function localReportId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `OD-REPORT-${new Date().getFullYear()}-${n}`;
}

export default function ReportDisaster() {
  const { notify } = useNotification();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { reportId, status, source }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Please enter your name.';
    if (!/^[0-9+\-\s]{8,15}$/.test(form.mobile.trim()))
      err.mobile = 'Enter a valid mobile number.';
    if (!form.disasterType) err.disasterType = 'Select a disaster type.';
    if (!form.district) err.district = 'Select a district.';
    if (!form.location.trim()) err.location = 'Describe the location.';
    if (form.description.trim().length < 10)
      err.description = 'Please provide at least 10 characters.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      notify.warning('Geolocation unavailable. Please type your location.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((f) => ({
          ...f,
          location: `${f.location ? f.location + ' ' : ''}(GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
        }));
        notify.success('Approximate GPS added to location.');
      },
      () => notify.error('Could not get location. Please type it manually.')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      notify.error('Please fix the highlighted fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await ReportsService.create(form);
      setResult({ reportId: res.reportId, status: res.status || 'Pending', source: 'api' });
      notify.success('Report submitted successfully.');
      setForm(EMPTY);
    } catch (err) {
      // If the backend responded with a validation error, surface it.
      if (err instanceof ApiError) {
        notify.error(err.message || 'Submission failed. Please review your details.');
      } else {
        // Network error -> generate a local demo report so the flow completes.
        const reportId = localReportId();
        setResult({ reportId, status: 'Pending', source: 'demo' });
        notify.success('Report submitted successfully (demo mode).');
        setForm(EMPTY);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const copyId = () => {
    if (result?.reportId) {
      navigator.clipboard?.writeText(result.reportId);
      notify.info('Report ID copied.');
    }
  };

  const fieldError = (key) =>
    errors[key] ? <p className="mt-1 text-xs font-medium text-red-600">{errors[key]}</p> : null;

  return (
    <div>
      <PageHeader
        eyebrow="Citizen Reporting"
        icon={FileWarning}
        title="Report a Disaster"
        description="Submit a disaster report. Admins can verify and coordinate a response. (Prototype workflow.)"
      />

      <div className="container-page py-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-5">
          {/* Success panel or form */}
          <div className="lg:col-span-3">
            {result ? (
              <div className="card p-6 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={30} />
                </span>
                <h2 className="mt-4 text-xl font-bold text-slate-900">Report submitted successfully</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Please save your Report ID to track the status later.
                </p>

                <div className="mx-auto mt-5 flex max-w-sm items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="font-mono text-lg font-semibold text-slate-900">
                    {result.reportId}
                  </span>
                  <button type="button" onClick={copyId} className="btn-ghost" aria-label="Copy report ID">
                    <Copy size={16} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-sm text-slate-600">Status:</span>
                  <StatusBadge status={result.status} />
                </div>

                {result.source === 'demo' && (
                  <p className="mt-4 text-xs text-amber-700">
                    Submitted in demo mode (backend offline). This ID is generated locally.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="btn-primary mt-6"
                >
                  Submit another report
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Full name
                    </label>
                    <input id="name" className="form-input" value={form.name} onChange={update('name')} />
                    {fieldError('name')}
                  </div>
                  <div>
                    <label htmlFor="mobile" className="form-label">
                      Mobile number
                    </label>
                    <input
                      id="mobile"
                      inputMode="tel"
                      className="form-input"
                      value={form.mobile}
                      onChange={update('mobile')}
                      placeholder="e.g. 90000-00000"
                    />
                    {fieldError('mobile')}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="disasterType" className="form-label">
                      Disaster type
                    </label>
                    <select
                      id="disasterType"
                      className="form-select"
                      value={form.disasterType}
                      onChange={update('disasterType')}
                    >
                      <option value="">Select type…</option>
                      {DISASTER_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {fieldError('disasterType')}
                  </div>
                  <div>
                    <label htmlFor="district" className="form-label">
                      District
                    </label>
                    <select
                      id="district"
                      className="form-select"
                      value={form.district}
                      onChange={update('district')}
                    >
                      <option value="">Select district…</option>
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {fieldError('district')}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="location" className="form-label">
                      Location details
                    </label>
                    <button
                      type="button"
                      onClick={useMyLocation}
                      className="mb-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-800"
                    >
                      <LocateFixed size={13} /> Use my location
                    </button>
                  </div>
                  <input
                    id="location"
                    className="form-input"
                    value={form.location}
                    onChange={update('location')}
                    placeholder="Village / area / landmark"
                  />
                  {fieldError('location')}
                </div>

                <div>
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="form-textarea"
                    value={form.description}
                    onChange={update('description')}
                    placeholder="Describe what is happening, people affected, immediate needs…"
                  />
                  {fieldError('description')}
                </div>

                <div>
                  <span className="form-label">Severity</span>
                  <div className="flex flex-wrap gap-2">
                    {SEVERITIES.map((s) => (
                      <label
                        key={s}
                        className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          form.severity === s
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="severity"
                          value={s}
                          checked={form.severity === s}
                          onChange={update('severity')}
                          className="sr-only"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="form-label">
                    Photo (optional)
                  </label>
                  <input id="image" type="file" accept="image/*" className="form-input" />
                  <p className="mt-1 text-xs text-slate-400">
                    In this prototype, images are not uploaded to a server.
                  </p>
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  {submitting ? (
                    <>
                      <LoadingSpinner size={16} /> Submitting…
                    </>
                  ) : (
                    <>
                      <FileWarning size={16} /> Submit Report
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar info */}
          <aside className="space-y-4 lg:col-span-2">
            <DemoBanner message="This is a prototype reporting workflow. Reports are stored for demonstration. For real emergencies, contact official services immediately." />
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-900">What happens next?</h3>
              <ol className="mt-3 space-y-3">
                {['Pending', 'Verified', 'Assigned', 'Resolved'].map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                      {i + 1}
                    </span>
                    <StatusBadge status={s} />
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-slate-500">
                Your report generates a unique ID like <span className="font-mono">OD-REPORT-2026-0001</span>.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
