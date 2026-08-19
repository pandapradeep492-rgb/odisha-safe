import RiskPrediction from '../models/RiskPrediction.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const RIVER = { Low: 5, Moderate: 15, High: 28, 'Very High': 40 };
const POP = { Low: 4, Medium: 8, High: 12 };
const HIST = { Low: 5, Moderate: 12, High: 20 };

/**
 * Transparent rule-based risk model.
 * Kept in sync with the client fallback so results match offline/online.
 * A real ML model can replace this (e.g. by calling a FastAPI service here).
 */
export function computeRuleBasedRisk(input = {}) {
  const reasons = [];
  let score = 0;

  const rain = clamp(Number(input.rainfall) || 0, 0, 400);
  score += clamp((rain / 200) * 35, 0, 35);
  if (rain >= 150) reasons.push('Heavy rainfall increases flood potential.');

  const wind = clamp(Number(input.windSpeed) || 0, 0, 250);
  score += clamp((wind / 120) * 30, 0, 30);
  if (wind >= 90) reasons.push('High wind speed indicates cyclonic conditions.');

  score += RIVER[input.riverLevel] ?? 15;
  if (['High', 'Very High'].includes(input.riverLevel)) reasons.push('Elevated river level raises flood risk.');

  const temp = Number(input.temperature) || 0;
  if (temp >= 42) {
    score += 12;
    reasons.push('Very high temperature suggests heat-wave risk.');
  } else if (temp >= 38) {
    score += 6;
  }

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

/** POST /api/risk/predict (public) */
export const predictRisk = asyncHandler(async (req, res) => {
  const result = computeRuleBasedRisk(req.body);

  // Best-effort audit log (ignore failures so predictions always return).
  try {
    await RiskPrediction.create({
      input: req.body,
      score: result.score,
      level: result.level,
      action: result.action,
      model: result.model,
    });
  } catch {
    /* non-fatal */
  }

  res.json(result);
});
