# E-WasteX — Smart E-Waste Collection, Recycling & Management Platform

> **Tagline:** Recycle Smart. Track Every Step. Build a Cleaner Future.

E-WasteX is a modern environmental-technology platform for smart e-waste collection, doorstep logistics, AI device appraisal, digital QR passports, and zero-landfill recycling transparency.

---

## 📋 Project Credits

- **Project:** E-WasteX
- **UI & DEV:** Sawan Kr.
- **Year:** 2026

---

## 🚀 Features

- **Cinematic Landing Page:** Animated statistics (`10,000+ KG Recycled`, `5,000+ Devices`, `2,500+ Users`, `120+ Collection Points`), How It Works, categories, environmental impact, and testimonials.
- **AI E-Waste Scanner:** Live camera capture (`getUserMedia`), file upload, drag-and-drop, and direct mobile camera capture (`capture="environment"`). Returns realistic AI classification, confidence %, hazard rating, estimated weight, and buyback valuation.
- **Value Calculator:** Instant appraisal tool calculating monetary buyback (₹), material salvage value, reward points, and CO₂ offsets.
- **Multi-Step Pickup Booking:** Complete 5-step doorstep collection wizard generating `PU-2026-XXXXXX` pickup IDs.
- **Live Lifecycle Tracking & QR Passport:** Real-time milestone progress bar (`REQUEST CREATED` → `COLLECTOR ASSIGNED` → `PICKUP SCHEDULED` → `COLLECTED` → `SORTING CENTER` → `PROCESSING` → `RECYCLED`) with downloadable SVG/PNG QR Code passports.
- **Role-Based Portals & Dashboards:**
  - **User Portal:** Inventory registry, rewards wallet, and category analytics.
  - **Collector Hub:** Assigned task queue, 4-stage workflow switcher, verified weight entry, customer call shortcut, and proof photo capture.
  - **Recycler Control Panel:** 4-stage plant pipeline switcher and material yield recorder (Copper, Gold, Polymers).
  - **Admin Command Center:** 8 KPI cards, monthly growth bar charts, user directory, e-waste passport directory, pickup logistics management, and drop-off network management.
- **Collection Centers Network:** Search, category filters, distance sorting, open/closed status, and GIS map view.
- **Eco-Loyalty Rewards Store:** Redeem points for gift cards, tree planting sponsorships, solar gear, and zero-waste certificates, plus global leaderboard rankings.
- **Global Quick Action Button:** Floating **"♻ Recycle Now"** menu active throughout the app.

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4, React Router v7, Lucide React, Recharts, QRCodeSVG, Framer Motion, React Hook Form, Zod.
- **Backend:** Node.js, Express.js API, MongoDB Mongoose schemas with hybrid fallback mode.

---

## 🏃 Getting Started

### Installation
```bash
npm install
```

### Running Frontend Dev Server
```bash
npm run dev
```

### Running Backend API Server
```bash
npm run server
```

### Production Build
```bash
npm run build
```
