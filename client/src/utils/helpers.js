/**
 * Small shared utilities: risk styling, formatting, distance, icon mapping.
 */
import {
  Wind,
  Waves,
  Zap,
  Flame,
  ThermometerSun,
  CloudRain,
  Mountain,
  AlertTriangle,
} from 'lucide-react';
import { DISASTER_ICON } from '../data/constants.js';

/** Map a risk level to Tailwind classes + accessible label + emoji marker. */
export function riskStyle(level) {
  switch ((level || '').toUpperCase()) {
    case 'CRITICAL':
      return {
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-800 border-red-200',
        dot: 'bg-red-600',
        emoji: '🔴',
        label: 'CRITICAL RISK',
        hex: '#dc2626',
      };
    case 'HIGH':
      return {
        text: 'text-orange-700',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-800 border-orange-200',
        dot: 'bg-orange-500',
        emoji: '🟠',
        label: 'HIGH RISK',
        hex: '#ea580c',
      };
    case 'MODERATE':
      return {
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        emoji: '🟡',
        label: 'MODERATE RISK',
        hex: '#d97706',
      };
    case 'LOW':
    default:
      return {
        text: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        emoji: '🟢',
        label: 'LOW RISK',
        hex: '#16a34a',
      };
  }
}

/** Map report/alert status to badge classes. */
export function statusStyle(status) {
  const map = {
    Active: 'bg-red-100 text-red-800 border-red-200',
    Resolved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Pending: 'bg-slate-100 text-slate-700 border-slate-200',
    Verified: 'bg-brand-100 text-brand-800 border-brand-200',
    Assigned: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'In Progress': 'bg-amber-100 text-amber-800 border-amber-200',
    Rejected: 'bg-rose-100 text-rose-800 border-rose-200',
  };
  return map[status] || 'bg-slate-100 text-slate-700 border-slate-200';
}

const ICON_COMPONENTS = {
  Wind,
  Waves,
  Zap,
  Flame,
  ThermometerSun,
  CloudRain,
  Mountain,
  AlertTriangle,
};

/** Return a lucide icon component for a disaster type. */
export function disasterIcon(type) {
  const key = DISASTER_ICON[type] || 'AlertTriangle';
  return ICON_COMPONENTS[key] || AlertTriangle;
}

/** Return a lucide icon component by its string name (safe fallback). */
export function iconByName(name) {
  return ICON_COMPONENTS[name] || AlertTriangle;
}

/** Format an ISO date string into a readable local string. */
export function formatDateTime(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

/** Relative "time ago" formatter for compact UI. */
export function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

/** Haversine distance between two [lat, lng] points, in kilometres. */
export function distanceKm(a, b) {
  if (!a || !b) return null;
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Clamp a number between min and max. */
export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
