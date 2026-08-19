/**
 * Emergency services list.
 *
 * ⚠️ IMPORTANT: The numbers below are DEMO/placeholder values for a college
 * project. They are NOT verified official emergency numbers. Always use the
 * official numbers published by government authorities in a real emergency.
 *
 * The widely-recognised national emergency number in India is 112 (shown here
 * for educational context only).
 */

export const emergencyContacts = [
  {
    id: 'police',
    label: 'Police',
    number: '100',
    demoNote: 'Nationally recognised (shown for education)',
    icon: 'Shield',
  },
  {
    id: 'fire',
    label: 'Fire & Rescue',
    number: '101',
    demoNote: 'Nationally recognised (shown for education)',
    icon: 'Flame',
  },
  {
    id: 'ambulance',
    label: 'Ambulance',
    number: '108',
    demoNote: 'Commonly used medical helpline (shown for education)',
    icon: 'Ambulance',
  },
  {
    id: 'unified',
    label: 'Unified Emergency',
    number: '112',
    demoNote: 'National emergency number (shown for education)',
    icon: 'PhoneCall',
  },
  {
    id: 'disaster',
    label: 'Disaster Management',
    number: '1070',
    demoNote: 'Demo placeholder — verify locally',
    icon: 'LifeBuoy',
  },
  {
    id: 'control-room',
    label: 'District Emergency Control Room',
    number: '1077',
    demoNote: 'Demo placeholder — verify locally',
    icon: 'Radio',
  },
];

// Quick "what to do" checklists surfaced on the Emergency Help page.
export const emergencyChecklist = [
  'Keep a charged phone and power bank ready.',
  'Store drinking water and non-perishable food.',
  'Keep documents in a waterproof bag.',
  'Note your nearest shelter and evacuation route.',
  'Keep a torch, first-aid kit and basic medicines.',
  'Agree on a family meeting point and contacts.',
];
