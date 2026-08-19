/**
 * Educational disaster safety content (BEFORE / DURING / AFTER).
 * Written in simple language for a general audience.
 */

export const safetyGuide = [
  {
    id: 'cyclone',
    title: 'Cyclone Safety',
    icon: 'Wind',
    summary: 'Coastal Odisha faces cyclones during pre- and post-monsoon seasons.',
    before: [
      'Keep an emergency kit ready (water, food, torch, medicines, documents).',
      'Charge phones and power banks; note emergency contacts.',
      'Follow official alerts and identify your nearest cyclone shelter.',
      'Secure loose objects and reinforce doors and windows.',
    ],
    during: [
      'Stay indoors and away from windows and glass.',
      'Switch off electricity and gas if advised by authorities.',
      'Do not go outside during the "eye" — winds return suddenly.',
      'Follow official instructions and move to a shelter if asked.',
    ],
    after: [
      'Avoid flooded roads and fallen power lines.',
      'Check for electrical hazards and structural damage before entering buildings.',
      'Use stored/boiled water until supply is confirmed safe.',
      'Help neighbours and follow official recovery instructions.',
    ],
  },
  {
    id: 'flood',
    title: 'Flood Safety',
    icon: 'Waves',
    summary: 'Heavy rain and river overflow can cause rapid flooding in low-lying areas.',
    before: [
      'Know if you live in a flood-prone or low-lying area.',
      'Keep important documents in a waterproof bag.',
      'Plan an evacuation route to higher ground.',
      'Store drinking water and essential supplies.',
    ],
    during: [
      'Move to higher ground immediately if water rises.',
      'Never walk or drive through moving flood water.',
      'Disconnect electrical appliances if it is safe to do so.',
      'Listen to official updates and evacuation orders.',
    ],
    after: [
      'Return home only when authorities say it is safe.',
      'Avoid flood water — it may be contaminated or electrically charged.',
      'Clean and disinfect anything that touched flood water.',
      'Watch for weakened structures and report damage.',
    ],
  },
  {
    id: 'lightning',
    title: 'Lightning Safety',
    icon: 'Zap',
    summary: 'Lightning is a leading cause of weather fatalities in interior districts.',
    before: [
      'Check the forecast before outdoor activities.',
      'Plan a safe indoor location you can reach quickly.',
      'Remember the phrase: "When thunder roars, go indoors."',
    ],
    during: [
      'Go indoors; avoid open fields, tall trees and water bodies.',
      'Avoid using wired electronics and landline phones.',
      'If outdoors with no shelter, crouch low; do not lie flat.',
      'Stay away from metal objects and fences.',
    ],
    after: [
      'Wait at least 30 minutes after the last thunder before going out.',
      'Check on others and call for medical help if someone is struck.',
      'Lightning victims are safe to touch — begin first aid immediately.',
    ],
  },
  {
    id: 'heatwave',
    title: 'Heat Wave Safety',
    icon: 'ThermometerSun',
    summary: 'High temperatures can cause heat exhaustion and heat stroke.',
    before: [
      'Stay updated on temperature forecasts.',
      'Keep oral rehydration salts (ORS) and water handy.',
      'Wear light, loose, light-coloured cotton clothing.',
    ],
    during: [
      'Drink water frequently even if not thirsty.',
      'Avoid going out between 12 PM and 3 PM.',
      'Never leave children or pets in parked vehicles.',
      'Rest in shade or cool indoor spaces.',
    ],
    after: [
      'Watch for signs of heat illness: dizziness, nausea, cramps.',
      'Move affected persons to a cool place and give fluids.',
      'Seek medical help for high body temperature or fainting.',
    ],
  },
  {
    id: 'rainfall',
    title: 'Heavy Rainfall Safety',
    icon: 'CloudRain',
    summary: 'Intense rainfall can cause waterlogging, traffic disruption and local flooding.',
    before: [
      'Clear drains near your home to reduce waterlogging.',
      'Keep rain gear and a torch accessible.',
      'Avoid scheduling travel during heavy-rain warnings.',
    ],
    during: [
      'Avoid flooded underpasses and fast-flowing water.',
      'Drive slowly and keep a safe distance from others.',
      'Stay away from electric poles and hanging wires.',
    ],
    after: [
      'Report waterlogging and blocked drains to authorities.',
      'Check for damage and avoid stagnant water where possible.',
      'Be alert for follow-up weather advisories.',
    ],
  },
];
