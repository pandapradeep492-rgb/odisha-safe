# 🛡️ ODISHA SAFE

### AI & GIS Based Smart Disaster Management and Emergency Response System

> **“Stay Alert. Stay Safe. Save Lives.”**
>
> 🎓 **COLLEGE PROJECT PROTOTYPE** — This is an educational prototype, **not** an
> official Government of Odisha / OSDMA platform. All alerts, maps, shelters,
> contact numbers and risk scores are **simulated demo data** and are **not**
> real-time official warnings. In a real emergency, always follow official
> government instructions and dial your official emergency number (112 in India).

---

## ⚡ Quick Start (TL;DR)

> **IMPORTANT:** This is a **React + Vite** app. Do **NOT** open
> `client/index.html` with VS Code **Live Server** (`127.0.0.1:5500`) — that
> shows a blank/placeholder page because the JSX is never compiled. Always start
> it with Vite as shown below.

```bash
# From the project root — installs client + server + root deps
npm run install:all

# Start BOTH frontend and backend together
npm run dev
```

Then open **http://localhost:5173**

- Frontend (Vite): http://localhost:5173
- Backend  (Express API): http://localhost:5000/api/health

MongoDB is **optional** — the app runs fully in **Demo Mode** without it.

---

## 📖 Table of Contents

1. [Description](#-description)
2. [Problem Statement](#-problem-statement)
3. [Objectives](#-objectives)
4. [Features](#-features)
5. [Technology Stack](#-technology-stack)
6. [Architecture](#-architecture)
7. [Folder Structure](#-folder-structure)
8. [Installation](#-installation)
9. [Environment Variables](#-environment-variables)
10. [Database Setup](#-database-setup)
11. [Running the App](#-running-the-app)
12. [Demo Mode](#-demo-mode)
13. [API Documentation](#-api-documentation)
14. [Testing](#-testing)
15. [Screenshots](#-screenshots)
16. [Future Improvements](#-future-improvements)
17. [Limitations](#-limitations)
18. [Disclaimer](#-disclaimer)

---

## 📝 Description

ODISHA SAFE is a full-stack (MERN) web application that demonstrates a smart
disaster-management and emergency-response workflow for the disaster-prone state
of Odisha. It brings together live alerts, an interactive GIS map, shelter
discovery, citizen reporting, safety guidance, a transparent risk-prediction
prototype, and an administrative dashboard — all in one clean, responsive UI.

## 🎯 Problem Statement

Disasters such as cyclones, floods, lightning and heat waves cause significant
loss of life and property. Timely information, easy emergency reporting, shelter
discovery and risk awareness can dramatically improve preparedness and response.
ODISHA SAFE shows how a modern web platform can unify these capabilities.

## ✅ Objectives

- Provide simulated, district-wise disaster **alerts** with clear risk levels.
- Help users **find nearby shelters** with capacity and facilities.
- Enable **citizen disaster reporting** with a tracked status workflow.
- Visualise disaster information on an interactive **GIS map** (Leaflet/OSM).
- Offer **emergency information** and practical **safety guidance**.
- Demonstrate a transparent, rule-based **risk-analysis** prototype.
- Provide an **admin dashboard** with analytics and management tools.

## 🌟 Features

| Area | Highlights |
|------|-----------|
| **Home** | Hero, current disaster status, featured alerts, map preview, "how it works" |
| **Live Alerts** | Filter by district, type, risk level, status |
| **Disaster Map** | Leaflet + OpenStreetMap, risk zones, shelters, resources, user location, layer control |
| **Shelter Finder** | Geolocation, sort-by-distance, search, capacity bars, directions |
| **Report Disaster** | Validated form, auto Report-ID (`OD-REPORT-2026-0001`), localStorage/demo fallback |
| **Emergency Help** | Services + checklists (clearly-labeled demo numbers) |
| **Safety Guide** | Before / During / After guidance for 5 disaster types |
| **Risk Prediction** | Transparent rule-based score (ML-ready API) |
| **Disaster History** | Historical table + charts (Recharts) |
| **Admin Dashboard** | Stat cards, charts, report management, alerts & shelters |
| **Auth** | JWT + bcrypt (backend); clearly-labeled demo session offline |
| **Resilience** | Error boundary, loading/error/empty states, demo fallback, no blank screens |

## 🧰 Technology Stack

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Leaflet + React-Leaflet
(OpenStreetMap), Recharts, Lucide React.

**Backend:** Node.js, Express.js, JWT, bcryptjs, Helmet, CORS, morgan,
express-rate-limit.

**Database:** MongoDB + Mongoose.

**Optional ML (future):** Python, FastAPI, scikit-learn (the `/api/risk/predict`
endpoint is structured so a trained model can replace the rule-based logic).

## 🏗 Architecture

```
┌─────────────────────────┐        HTTP / JSON        ┌──────────────────────────┐
│      React + Vite        │  ───────────────────────► │      Express REST API     │
│  (client, port 5173)     │   /api/* (Vite proxy)     │     (server, port 5000)   │
│                          │ ◄───────────────────────  │                           │
│  • Pages / Components    │                           │  • Routes / Controllers   │
│  • services/api.js       │                           │  • Auth (JWT + bcrypt)    │
│  • Demo-data fallback    │                           │  • Mongoose models        │
└─────────────────────────┘                           └────────────┬─────────────┘
                                                                    │
                                                          ┌─────────▼─────────┐
                                                          │      MongoDB      │
                                                          │    (optional)     │
                                                          └───────────────────┘
```

If the API or MongoDB is unavailable, the client automatically falls back to
clearly-labeled **demo data** so the UI never breaks.

## 📁 Folder Structure

```text
odisha safe/
├── package.json            # Root scripts (install:all, dev, build, seed)
├── README.md
├── client/                 # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── tailwind.config.js
│   ├── .env / .env.example
│   └── src/
│       ├── main.jsx  App.jsx  index.css
│       ├── components/  (layout, ui, cards, charts, map, admin)
│       ├── pages/       (Home, LiveAlerts, DisasterMap, ShelterFinder, …, admin/)
│       ├── context/     (AuthContext, NotificationContext)
│       ├── services/    (api.js, hooks.js, resources.js)
│       ├── data/        (demoData.js, constants.js, safetyGuide.js, …)
│       └── utils/       (helpers.js)
└── server/                 # Node + Express backend
    ├── package.json
    ├── .env / .env.example
    └── src/
        ├── server.js  app.js
        ├── config/db.js
        ├── middleware/  (auth.js, requireDb.js, errorHandler.js)
        ├── models/      (User, DisasterAlert, DisasterReport, Shelter, …)
        ├── controllers/ (auth, alert, shelter, report, dashboard, risk, history)
        ├── routes/index.js
        └── seed/seed.js
```

## 💾 Installation

**Prerequisites:** Node.js 18+ (tested on Node 23) and npm. MongoDB is optional.

```bash
# 1) Clone / open the project, then from the project root:
npm run install:all      # installs root + client + server dependencies
```

Or install each package individually:

```bash
cd client && npm install
cd ../server && npm install
```

## 🔐 Environment Variables

`.env` files are created automatically, but you can copy the examples:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

**client/.env**
```env
VITE_API_URL=/api
# VITE_PROXY_TARGET=http://localhost:5000
```

**server/.env**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/odisha_safe
JWT_SECRET=change_this_to_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
SEED_ADMIN_EMAIL=admin@odishasafe.demo
SEED_ADMIN_PASSWORD=Admin@12345
```

> 🔒 **Never commit real secrets.** `.env` is git-ignored. `JWT_SECRET` lives only
> on the server and is never exposed to the frontend.

## 🗄 Database Setup

MongoDB is **optional**. To enable full DB-backed features:

1. Install & start MongoDB locally (`mongodb://127.0.0.1:27017`) or use MongoDB Atlas.
2. Set `MONGODB_URI` in `server/.env`.
3. Seed demo data + an admin user:
   ```bash
   npm run seed          # from the project root
   # or: cd server && npm run seed
   ```
   This creates the admin `admin@odishasafe.demo` / `Admin@12345` and demo
   alerts, shelters, reports, history and resources.

## ▶ Running the App

### Option A — Run everything (recommended)
```bash
npm run install:all
npm run dev              # starts client (5173) + server (5000) together
```

### Option B — Run separately (two terminals)
```bash
# Terminal 1 — frontend
cd client
npm install
npm run dev              # http://localhost:5173

# Terminal 2 — backend
cd server
npm install
npm run dev              # http://localhost:5000
```

### Production build (frontend)
```bash
cd client
npm run build            # outputs client/dist
npm run preview          # serves the built app on http://localhost:4173
```

## 🧪 Demo Mode

ODISHA SAFE is designed to be demonstrable **anywhere**, even without a backend
or database:

- If the **API is unreachable**, the frontend falls back to `src/data/demoData.js`
  and shows a **"Demo Data"** badge / banner.
- If **MongoDB is down**, the backend still starts and DB routes return a fast
  **503** (so the client can fall back instantly instead of hanging).
- **Report submission** works offline: a local `OD-REPORT-YYYY-NNNN` ID is
  generated and shown.
- **Admin login** works offline: any credentials create a clearly-labeled
  **demo admin session** (this is NOT secure auth — demo only).
- Every data page has **loading / error / empty** states and the app is wrapped
  in a React **ErrorBoundary**, so a failure never yields a blank white screen.

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth | Description |
|-------|----------|------|-------------|
| GET  | `/health` | – | Health check `{ success, message, db, demoMode }` |
| POST | `/auth/login` | – | Login, returns `{ token, user }` |
| GET  | `/auth/me` | Bearer | Current user |
| GET  | `/alerts` | – | List alerts (filters: district, disasterType, riskLevel, status) |
| POST | `/alerts` | Admin | Create alert |
| PUT  | `/alerts/:id` | Admin | Update alert |
| DELETE | `/alerts/:id` | Admin | Delete alert |
| GET  | `/shelters` | – | List shelters (filter: district) |
| POST | `/shelters` | Admin | Create shelter |
| PUT  | `/shelters/:id` | Admin | Update shelter |
| DELETE | `/shelters/:id` | Admin | Delete shelter |
| POST | `/reports` | – | Submit a citizen report (auto Report-ID) |
| GET  | `/reports` | Admin | List reports |
| GET  | `/reports/:id` | – | Get report by Report-ID |
| PUT  | `/reports/:id/status` | Admin | Update report status |
| GET  | `/dashboard/stats` | Admin | Aggregated dashboard metrics |
| POST | `/risk/predict` | – | Rule-based risk score (no DB needed) |
| GET  | `/history` | – | Historical disaster records |
| GET  | `/resources` | – | Emergency resources (map layer) |

**Example — risk prediction (works without a database):**
```bash
curl -X POST http://localhost:5000/api/risk/predict \
  -H "Content-Type: application/json" \
  -d '{"rainfall":180,"windSpeed":90,"riverLevel":"High"}'
# → { "score": 86, "level": "HIGH", "action": "...", "reasons": [...], "model": "rule-based" }
```

## 🔎 Testing

Manual test checklist (all should work in Demo Mode):

1. Home renders with hero, status, featured alerts, map preview.
2. Navbar + mobile hamburger menu navigate correctly.
3. `/alerts` filters by district / type / risk / status.
4. `/map` shows markers, popups, layer control, "Use my location".
5. `/shelters` sorts by distance, search + district filter, directions.
6. `/report` validates, submits, generates a Report-ID.
7. `/safety`, `/emergency`, `/history`, `/about` render fully.
8. `/risk` returns a score + recommendation.
9. `/login` → `/admin` (demo session) → dashboard charts + tables.
10. `npm run build` succeeds; no blank screens on any route; 404 page works.

Backend smoke test:
```bash
curl http://localhost:5000/api/health
```

## 🖼 Screenshots

_Add screenshots here for your presentation:_

- `docs/screenshots/home.png`
- `docs/screenshots/map.png`
- `docs/screenshots/admin-dashboard.png`

## 🚀 Future Improvements

- Replace the rule-based risk model with a trained ML model (Python/FastAPI).
- Real-time alerts via WebSockets / push notifications.
- Image uploads for reports (Multer) and cloud storage.
- Multi-language (Odia / Hindi / English) support.
- Role-based access for district-level officers.

## ⚠ Limitations

- All data is **simulated demo data**, not real-time official information.
- Emergency numbers shown are educational placeholders — verify locally.
- The risk model is a transparent heuristic, not a validated predictor.

## 📜 Disclaimer

ODISHA SAFE is an **academic college project prototype**. It is **not** an
official emergency service and must not be relied upon in real emergencies.
Always follow official government instructions and use official emergency
numbers (112 in India).

---

© ODISHA SAFE — College Project Prototype • Built with the MERN stack.
