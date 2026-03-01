<div align="center">

# 🌱 GreenPulse

### AI-Powered Campus Sustainability Intelligence Platform

<br/>

<p>
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-0.131.0-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Chart.js-4.5-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/scikit--learn-1.7-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"/>
</p>

<p>
  <img src="https://img.shields.io/badge/AI-Statistical%20Anomaly%20Detection-00C853?style=flat-square"/>
  <img src="https://img.shields.io/badge/ML-LinearRegression%20Forecasting-2962FF?style=flat-square"/>
  <img src="https://img.shields.io/badge/Impact-CO₂%20·%20₹%20Cost%20·%20Behavioral%20Nudges-FF6D00?style=flat-square"/>
  <img src="https://img.shields.io/badge/License-MIT-8E24AA?style=flat-square"/>
</p>

<br/>

**Real-time anomaly detection · Predictive forecasting · Cost & emission quantification · Gamified sustainability scoring**

*Transforming invisible campus resource waste into visible, measurable, and actionable climate intelligence.*

<br/>

[Getting Started](#-quick-start) · [Architecture](#-system-architecture) · [API Reference](#-api-reference) · [AI Engine](#-ai--ml-engine) · [Deployment](#-deployment)

</div>

<br/>

---

<br/>

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [AI / ML Engine](#-ai--ml-engine)
- [API Reference](#-api-reference)
- [Data Pipeline](#-data-pipeline)
- [Frontend Architecture](#-frontend-architecture)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Performance Snapshot](#-performance-snapshot)
- [Demo Walkthrough](#-demo-walkthrough)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

<br/>

---

<br/>

## 🌍 Overview

**GreenPulse** is a full-stack sustainability intelligence platform that monitors three critical campus resources — **electricity (kWh)**, **water (m³)**, and **food waste (kg)** — across hostel blocks in real time. It applies **statistical anomaly detection** and **linear regression forecasting** to surface actionable insights, quantify financial and environmental impact, and drive behavioral change through gamified scoring.

> **Core Loop:**  Raw Sensor Data → AI Analytics → Quantified Impact (₹ + CO₂) → Emotional Equivalents (🌳 + 🚗) → Behavioral Nudge → Leaderboard Competition

The platform processes 30-day rolling windows of resource consumption data, computes per-block sustainability scores on a 0–100 composite index, and renders everything through an interactive dark-mode dashboard built with React and Chart.js.

<br/>

---

<br/>

## 🎯 Problem Statement

| Campus Reality | GreenPulse Solution |
|:---|:---|
| No block-level resource visibility | Per-hostel live dashboards with daily granularity |
| Static annual sustainability audits | Real-time statistical anomaly detection with instant alerts |
| No link between behavior → cost → emissions | Automated ₹ cost + kg CO₂ + emotional equivalent conversion |
| Zero competitive incentive structure | Weighted composite scoring + ranked leaderboard with medals |
| Undetected infrastructure issues (leaks, AC spikes) | 1.5σ deviation-based spike and leak detection |

<br/>

---

<br/>

## 🚀 Key Features

| Module | Feature | Technical Detail |
|:------:|:--------|:-----------------|
| ⚡ | **Electricity Monitoring** | 30-day kWh time series · 7-day rolling baseline overlay · AC spike detection · Peak day annotation |
| 💧 | **Water Intelligence** | Daily m³ tracking · Infrastructure leak detection · 7-day LinearRegression forecast |
| 🍛 | **Food Waste Analytics** | kg/day bar chart · High-waste day identification · Color-coded anomaly bars |
| 🧠 | **AI Anomaly Engine** | Dual-layer detection: rolling average (visualization) + 1.5σ std dev (alerts) · High / Low / Normal classification |
| 📈 | **Predictive Forecasting** | `sklearn.LinearRegression` on time-indexed data · 7-step ahead projection · Non-negative clamping |
| 💰 | **Financial Impact** | Per-resource ₹ costing: electricity @ ₹8.5/kWh · water @ ₹25/m³ · food waste @ ₹120/kg |
| 🌍 | **Carbon Footprint** | CO₂ conversion: 0.82 kg/kWh + 2.5 kg/kg food + 0.3 kg/m³ water → tree offset + car-km equivalents |
| 🏆 | **GreenPulse Score** | Weighted composite: `0.4×Elec + 0.3×Water + 0.3×Food` efficiency vs. ideal campus targets |
| 📊 | **Gamified Leaderboard** | Block ranking with 🥇🥈🥉 medals · Score color grading (green/yellow/red) · Active row highlighting |
| 💡 | **AI Recommendations** | Context-aware tips: AC setpoint optimization with ₹ savings · Portion control with kg reduction estimates |

<br/>

---

<br/>

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT  (React 19)                             │
│                                                                         │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────────────┐  │
│  │  Header   │  │ AlertBanner  │  │  ChartsGrid │  │ LeaderboardPanel │  │
│  │  + Block  │  │ + AI Recs    │  │  (Chart.js) │  │ + ScoreCard      │  │
│  │  Selector │  │              │  │  3 charts   │  │                  │  │
│  └──────────┘  └──────────────┘  └────────────┘  └──────────────────┘  │
│       │               │                │                   │            │
│       └───────────────┴────────────────┴───────────────────┘            │
│                                │                                        │
│                    ┌───────────┴───────────┐                            │
│                    │   useBlockData Hook   │  ← Axios GET /block/{name} │
│                    │   useLeaderboard Hook │  ← Axios GET /leaderboard  │
│                    └───────────┬───────────┘                            │
└────────────────────────────────┼────────────────────────────────────────┘
                                 │ HTTP/JSON
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        SERVER  (FastAPI + Uvicorn)                       │
│                                                                         │
│  ┌─────────────────────┐    ┌──────────────────────────────────────┐   │
│  │      main.py         │    │              utils.py                │   │
│  │                      │    │                                      │   │
│  │  GET /               │───▶│  analyze_block(df, block)           │   │
│  │  GET /health         │    │    ├─ _rolling_anomaly(series)      │   │
│  │  GET /block/{name}   │    │    ├─ _linear_forecast(series, 7)   │   │
│  │  GET /leaderboard    │    │    ├─ _greenpulse_score(e, w, f)    │   │
│  │                      │    │    └─ cost / co2 / equivalents      │   │
│  │  CORS Middleware      │    │                                      │   │
│  │  Global DataFrame     │    │  get_leaderboard(df)                │   │
│  └──────────┬───────────┘    └──────────────────────────────────────┘   │
│             │                                                           │
│             ▼                                                           │
│  ┌─────────────────────┐                                               │
│  │     data.csv         │  ← 90 rows · 3 blocks · 30 days             │
│  │  (Pandas DataFrame)  │  ← generated by generate_data.py            │
│  └─────────────────────┘                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

<br/>

---

<br/>

## 🛠 Tech Stack

### Backend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **Python** | 3.10+ | Runtime |
| **FastAPI** | 0.131.0 | Async REST API framework with auto-generated OpenAPI docs |
| **Uvicorn** | 0.41.0 | ASGI server (production-grade) |
| **Pandas** | 2.3.3 | DataFrame operations, rolling window computations, data filtering |
| **NumPy** | 2.2.6 | Numerical array operations, random data generation |
| **scikit-learn** | 1.7.2 | `LinearRegression` model for 7-day resource forecasting |
| **Pydantic** | 2.12.5 | Request/response data validation (via FastAPI) |

### Frontend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **React** | 19.2.4 | Component-driven UI with hooks-based state management |
| **Chart.js** | 4.5.1 | High-performance canvas-based charting (line + bar) |
| **react-chartjs-2** | 5.3.1 | React wrapper for declarative Chart.js integration |
| **Axios** | 1.13.5 | Promise-based HTTP client with clean error handling |

### Infrastructure

| Layer | Tool | Notes |
|:------|:-----|:------|
| Backend Hosting | Render | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Frontend Hosting | Vercel | Zero-config React deployment via GitHub integration |
| API Protocol | REST / JSON | 4 endpoints, OpenAPI/Swagger auto-docs at `/docs` |
| CORS | FastAPI Middleware | Configurable origin allowlist |

<br/>

---

<br/>

## 📁 Project Structure

```
GreenPulse/
│
├── backend/
│   ├── main.py                 # FastAPI app — routes, CORS, data loading
│   ├── utils.py                # AI engine — anomaly detection, forecasting, scoring, impact calc
│   ├── generate_data.py        # Synthetic data generator (numpy, seed=42, anomaly injection)
│   ├── data.csv                # Generated dataset: 90 rows × 5 columns (date, block, elec, water, food)
│   └── requirements.txt        # 24 pinned Python dependencies
│
├── frontend/
│   ├── package.json            # Node dependencies + scripts (react 19, chart.js 4, axios)
│   ├── public/
│   │   ├── index.html          # SPA entry point
│   │   ├── manifest.json       # PWA metadata
│   │   └── robots.txt          # Crawler rules
│   │
│   └── src/
│       ├── App.js              # Root — Chart.js registration + Dashboard mount
│       ├── App.css             # Full design system (dark theme, responsive, CSS variables)
│       ├── index.js            # ReactDOM.createRoot entry
│       ├── index.css           # Base reset
│       │
│       ├── pages/
│       │   └── Dashboard.js    # Main page — state management, data orchestration, layout
│       │
│       ├── components/
│       │   ├── Header.js       # Logo + hostel block selector (A / B / C)
│       │   ├── AlertBanner.js  # Conditional High/Low alert with deviation %
│       │   ├── AIRecommendations.js  # Context-aware AI tips (AC setpoint, portion control)
│       │   ├── ChartsGrid.js   # 3-chart grid — electricity line, water line, food bar
│       │   ├── ImpactSummary.js # 4-card impact grid (₹, CO₂, trees, car km)
│       │   ├── StatCard.js     # Reusable stat display component
│       │   └── LeaderboardPanel.js  # Score card + ranked leaderboard table
│       │
│       ├── hooks/
│       │   ├── useBlockData.js     # Custom hook — fetches /block/{name}, returns {data, loading, error}
│       │   └── useLeaderboard.js   # Custom hook — fetches /leaderboard on mount
│       │
│       └── utils/
│           └── chartHelpers.js # buildLineData(), buildForecastData(), chartOpts() — Chart.js config
│
└── README.md
```

<br/>

---

<br/>

## 🧠 AI / ML Engine

The analytics core lives in `backend/utils.py` and implements three distinct AI/ML subsystems:

### 1. Statistical Anomaly Detection

A **dual-layer** approach that separates visualization concerns from alert logic:

```python
# LAYER 1 — Visualization: 7-day rolling average (smooth baseline for charts)
rolling_avg = series.rolling(7, min_periods=1).mean()
deviation_pct = ((value - rolling_avg) / rolling_avg) * 100   # tooltip display

# LAYER 2 — Alerting: Global statistical thresholds (stable alert boundaries)
overall_mean = series.mean()
std_dev = series.std()

if (value - overall_mean) > 1.5 * std_dev:
    alert = "High"      # ⚠️  Anomalous spike detected
elif (overall_mean - value) > 1.5 * std_dev:
    alert = "Low"       # ℹ️  Unusually low (possible infrastructure issue)
else:
    alert = "Normal"    # ✅  Within expected bounds
```

> **Design Rationale:** Rolling averages create intuitive chart overlays that follow trends, but they're poor alert thresholds (they drift with anomalies). The 1.5σ rule provides mathematically stable boundaries — roughly flagging the top/bottom ~7% of observations assuming normal distribution.

**Applied to:** Electricity (kWh), Water (m³), Food Waste (kg) — independently per block.

---

### 2. Linear Regression Forecasting

```python
from sklearn.linear_model import LinearRegression

def _linear_forecast(series, steps=7):
    y = np.array(series, dtype=float)          # historical values
    X = np.arange(len(y)).reshape(-1, 1)        # time index [0, 1, ..., 29]

    model = LinearRegression().fit(X, y)        # fit on 30-day window

    X_future = np.arange(len(y), len(y) + steps).reshape(-1, 1)  # [30, 31, ..., 36]
    predictions = model.predict(X_future)

    return [round(max(v, 0), 1) for v in predictions]  # non-negative clamping
```

> Produces a 7-day ahead forecast for electricity, water, and food waste. Linear regression is intentionally chosen for interpretability and stability on short time windows — more complex models (ARIMA, LSTM) would overfit on 30 data points.

---

### 3. GreenPulse Composite Score (0–100)

```
Score = 0.4 × E_eff + 0.3 × W_eff + 0.3 × F_eff

Where:
  E_eff = clamp(100 − (elec_mean − 400) / 4,      0, 100)
  W_eff = clamp(100 − (water_mean − 170) / 1.7,    0, 100)
  F_eff = clamp(100 − (food_mean  − 65)  / 0.65,   0, 100)
```

| Parameter | Ideal Target | Weight | Rationale |
|:----------|:-------------|:-------|:----------|
| Electricity | 400 kWh/day | **40%** | Highest ₹ cost and CO₂ contributor |
| Water | 170 m³/day | **30%** | Infrastructure cost + supply scarcity |
| Food Waste | 65 kg/day | **30%** | Direct waste + methane decomposition emissions |

Each efficiency component measures **how close a block's average consumption is to the ideal target**, linearly scaled and clamped to [0, 100].

---

### 4. Impact Quantification

| Conversion | Factor | Source |
|:-----------|:-------|:-------|
| Electricity → CO₂ | **0.82 kg CO₂/kWh** | India grid emission factor (CEA 2024) |
| Food Waste → CO₂ | **2.5 kg CO₂/kg** | Lifecycle emissions including methane |
| Water → CO₂ | **0.3 kg CO₂/m³** | Treatment & pumping energy |
| CO₂ → Trees | **21 kg CO₂/tree/year** | Average mature tree absorption rate |
| CO₂ → Car Travel | **4 km/kg CO₂** | Average petrol car emissions (~120g/km) |
| Electricity → ₹ | **₹8.5/kWh** | India commercial tariff |
| Water → ₹ | **₹25/m³** | Municipal supply rate |
| Food Waste → ₹ | **₹120/kg** | Preparation + disposal cost |

> **Purpose:** Converts abstract resource numbers into **emotional equivalents** — "your block's waste equals 850 trees or 72,000 km of car travel" — proven to drive behavioral change more effectively than raw statistics.

<br/>

---

<br/>

## 📡 API Reference

**Base URL:** `http://127.0.0.1:8000` &nbsp;|&nbsp; **Interactive Docs:** [`/docs`](http://127.0.0.1:8000/docs) (Swagger UI)

### `GET /`

Health ping.

```json
{ "status": "GreenPulse API running 🌱", "version": "1.0.0" }
```

---

### `GET /health`

System status check. Returns `500` if data failed to load.

```json
{
  "status": "ok",
  "rows_loaded": 90,
  "blocks": ["A", "B", "C"]
}
```

---

### `GET /block/{block_name}`

Full analytics payload for a single hostel block.

**Parameters:**

| Param | Type | Valid Values | Description |
|:------|:-----|:-------------|:------------|
| `block_name` | `path string` | `A`, `B`, `C` | Hostel block identifier (case-insensitive) |

**Response Schema:**

```jsonc
{
  // ── Time Series (30 data points each) ───────────────
  "block":                 "C",
  "dates":                 ["2026-01-26", ...],       // 30 dates
  "electricity":           [510.2, ...],              // kWh per day
  "water":                 [209.5, ...],              // m³ per day
  "food":                  [85.1, ...],               // kg per day

  // ── Anomaly Detection Outputs ───────────────────────
  "electricity_baseline":  [505.3, ...],              // 7-day rolling avg
  "water_baseline":        [207.1, ...],
  "electricity_deviation": [0.9, ...],                // % deviation from rolling avg
  "water_deviation":       [1.2, ...],
  "electricity_alerts":    ["Normal", ..., "High"],   // per-day alert status
  "water_alerts":          ["Normal", ...],
  "food_alerts":           ["Normal", ..., "High"],

  // ── ML Forecasts (7 future days) ────────────────────
  "elec_forecast":         [525.1, 527.3, ...],       // 7-day prediction
  "water_forecast":        [212.0, 213.5, ...],
  "food_forecast":         [87.2, 88.0, ...],

  // ── Latest Day Alert Summary ────────────────────────
  "latest_alert": {
    "electricity":         "High",
    "water":               "Normal",
    "elec_deviation":      32.5,                      // % above rolling avg
    "water_deviation":     -2.1
  },

  // ── Financial Impact (₹) ───────────────────────────
  "cost": {
    "electricity":         131096,                    // sum(kWh) × ₹8.5
    "water":               161250,                    // sum(m³) × ₹25
    "food":                306000,                    // sum(kg) × ₹120
    "total":               598346
  },

  // ── Carbon Footprint (kg CO₂) ──────────────────────
  "co2": {
    "electricity":         12651.3,                   // sum(kWh) × 0.82
    "food":                6375.0,                    // sum(kg) × 2.5
    "water":               1935.0,                    // sum(m³) × 0.3
    "total":               20961.3
  },

  // ── Emotional Equivalents ──────────────────────────
  "trees":                 998.2,                     // total_co2 / 21
  "km_equivalent":         83845,                     // total_co2 × 4

  // ── Composite Score ────────────────────────────────
  "greenpulse_score":      73.0,                      // 0–100 weighted index

  // ── Chart Annotations ──────────────────────────────
  "peak_elec_idx":         27,                        // index of max electricity day
  "peak_food_idx":         15                         // index of max food waste day
}
```

---

### `GET /leaderboard`

Returns all blocks ranked by GreenPulse Score (descending).

```json
[
  { "rank": 1, "medal": "🥇", "block": "A", "score": 92.9, "avg_electricity": 391.5, "avg_water": 159.8, "avg_food": 57.3 },
  { "rank": 2, "medal": "🥈", "block": "B", "score": 84.8, "avg_electricity": 449.5, "avg_water": 199.4, "avg_food": 74.0 },
  { "rank": 3, "medal": "🥉", "block": "C", "score": 73.0, "avg_electricity": 517.2, "avg_water": 213.4, "avg_food": 87.5 }
]
```

<br/>

---

<br/>

## 🗃 Data Pipeline

### Synthetic Data Generation (`generate_data.py`)

The data generator creates a realistic 30-day campus dataset with deterministic reproducibility (`np.random.seed(42)`).

**Block Profiles:**

| Block | Elec μ ± σ | Water μ ± σ | Food μ ± σ | Role |
|:------|:-----------|:------------|:-----------|:-----|
| **A** | 410 ± 15 kWh | 160 ± 8 m³ | 55 ± 5 kg | Best performer (baseline reference) |
| **B** | 460 ± 20 kWh | 190 ± 10 m³ | 70 ± 6 kg | Middle tier |
| **C** | 510 ± 25 kWh | 210 ± 12 m³ | 85 ± 8 kg | Worst performer (demo focus) |

**Injected Patterns:**

| Pattern | Block | Days | Effect | Purpose |
|:--------|:------|:-----|:-------|:--------|
| Weekend seasonality | All | Every Sat–Sun | −15% electricity, +25% food | Realistic behavioral cycle |
| AC spike | C | 27, 28, 29 | +190 kWh | Triggers live High alert on dashboard load |
| Food waste incident | C | 15 | +75 kg | Triggers AI portion-control recommendation |
| Water leak | B | 10, 11, 12 | +85 m³ | Demonstrates infrastructure anomaly detection |
| Efficiency day | A | 20 | −80 kWh | Demonstrates Low alert detection |

**Output:** `data.csv` — 90 rows × 5 columns (`date`, `block`, `electricity_kwh`, `water_m3`, `food_waste_kg`)

<br/>

---

<br/>

## 🎨 Frontend Architecture

### Design System

Dark-mode interface built with **CSS custom properties** for consistent theming:

```css
--bg:      #0f1117    /* Page background */
--surface: #1a1d27    /* Header, panels */
--card:    #1e2130    /* Card backgrounds */
--border:  #2e3347    /* Borders, dividers */
--text:    #e2e8f0    /* Primary text */
--muted:   #94a3b8    /* Secondary text */
--green:   #4ade80    /* Success, electricity charts, high scores */
--blue:    #38bdf8    /* Water charts, low alerts */
--orange:  #fb923c    /* Food waste charts */
--red:     #f87171    /* Anomaly highlights, low scores */
```

**Responsive breakpoints:** 900px (tablet — single column charts) · 500px (mobile — compact grid)

### Component Tree

```
<App>
  └─ <Dashboard>                        ← State: block ("C"), forecast (false)
       ├─ <Header>                       ← Block selector (A/B/C buttons)
       ├─ <AlertBanner /> × 2            ← Electricity + Water latest-day alerts
       ├─ <AIRecommendations>            ← Conditional AC tip + food tip
       ├─ <ChartsGrid>                   ← 3 interactive charts (2-col grid)
       │    ├─ ⚡ Electricity Line Chart  ← Actual + baseline + anomaly points + peak annotation
       │    ├─ 💧 Water Line Chart        ← Actual + baseline + forecast toggle
       │    └─ 🍛 Food Waste Bar Chart    ← Full-width, red bars = anomaly days
       ├─ <ImpactSummary>                ← 4× <StatCard> — ₹ Cost, CO₂, Trees, Car km
       └─ <LeaderboardPanel>             ← Score card (large number) + ranked table
```

### Data Flow

```
User clicks "Hostel C"
  → setBlock("C") triggers re-render
  → useBlockData("C") fires Axios GET /block/C
  → FastAPI calls analyze_block(df, "C")
  → utils.py computes anomalies, forecasts, costs, CO₂, score
  → JSON response flows back through hook → Dashboard → all child components
  → Chart.js re-renders 3 charts, alerts update, score updates
```

### Custom Hooks

| Hook | Endpoint | Trigger | Returns |
|:-----|:---------|:--------|:--------|
| `useBlockData(block)` | `GET /block/{block}` | On `block` state change | `{ data, loading, error }` |
| `useLeaderboard()` | `GET /leaderboard` | Once on mount | `leaderboardData[]` |

### Chart Configuration (`chartHelpers.js`)

| Function | Chart Type | Features |
|:---------|:-----------|:---------|
| `buildLineData()` | Line (filled area) | Actual values + dashed baseline overlay · Anomaly points: 7px red circles · Normal points: 3px |
| `buildForecastData()` | Line (dual series) | Historical (solid) + Forecast (dashed) · Auto-generated future date labels · Null-gap separation |
| `chartOpts()` | Options object | Dark grid (`#2a2d3e`) · Unit-aware tooltips · Compact legend · 8 max x-axis ticks |

<br/>

---

<br/>

## ⚙️ Quick Start

### Prerequisites

- **Python** 3.10+ &nbsp; · &nbsp; **Node.js** 18+ &nbsp; · &nbsp; **npm** 9+

### 1. Clone & Setup Backend

```bash
git clone https://github.com/your-username/GreenPulse.git
cd GreenPulse/backend

# Create virtual environment
python -m venv venv

# Activate (choose your OS)
.\venv\Scripts\activate          # Windows
source venv/bin/activate         # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# (Optional) Regenerate synthetic data
python generate_data.py

# Start API server
uvicorn main:app --reload
```

**Verify:** Open [`http://127.0.0.1:8000/docs`](http://127.0.0.1:8000/docs) — you should see the Swagger UI with all 4 endpoints.

### 2. Start Frontend (new terminal)

```bash
cd GreenPulse/frontend

npm install
npm start
```

**Verify:** Open [`http://localhost:3000`](http://localhost:3000) — the dashboard loads with Block C selected, showing live anomaly alerts.

### 3. Environment Variables (Optional)

| Variable | Default | Description |
|:---------|:--------|:------------|
| `REACT_APP_API_URL` | `http://127.0.0.1:8000` | Backend API base URL (set for production deployment) |

> **Both terminals must remain running simultaneously.** The React frontend communicates with the FastAPI backend via HTTP on port 8000.

<br/>

---

<br/>

## 🚢 Deployment

### Backend → Render

| Setting | Value |
|:--------|:------|
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Root Directory** | `backend/` |
| **Python Version** | 3.10+ |

### Frontend → Vercel

| Setting | Value |
|:--------|:------|
| **Framework Preset** | Create React App |
| **Build Command** | `npm run build` |
| **Output Directory** | `build/` |
| **Root Directory** | `frontend/` |
| **Environment Variable** | `REACT_APP_API_URL` = your Render backend URL |

> Connect your GitHub repo to both platforms for automatic CI/CD on every push.

<br/>

---

<br/>

## 📊 Performance Snapshot

Sample analytics output for the default demo state (Block C, 30-day window):

| Metric | Block A (Best) | Block B (Mid) | Block C (Worst) |
|:-------|:--------------:|:-------------:|:---------------:|
| **GreenPulse Score** | 🟢 **92.9** | 🟢 **84.8** | 🟢 **73.0** |
| Avg Electricity | 391.5 kWh | 449.5 kWh | 517.2 kWh |
| Avg Water | 159.8 m³ | 199.4 m³ | 213.4 m³ |
| Avg Food Waste | 57.3 kg | 74.0 kg | 87.5 kg |
| Total ₹ Cost | ~₹500K | ~₹537K | ~₹594K |
| Total CO₂ | ~17,000 kg | ~19,000 kg | ~21,000 kg |
| Trees to Offset | ~810 | ~905 | ~998 |
| Car km Equivalent | ~68,000 km | ~76,000 km | ~84,000 km |
| Active Alerts | 1 Low (efficiency day) | 3 High (water leak) | 3 High (AC spike) + 1 High (food) |

<br/>

---

<br/>

## 🎮 Demo Walkthrough

> **Optimized for a 2-minute live demo to judges or stakeholders.**

| Step | Action | What Happens |
|:----:|:-------|:-------------|
| **1** | Dashboard loads with **Block C** selected | Immediate ⚠️ red alert banner — electricity is 30%+ above baseline |
| **2** | Observe the **AI Recommendation** | 💡 "Raise AC setpoint by 1°C → save ₹X/month" appears contextually |
| **3** | Scroll to **Electricity Chart** | Red anomaly dots on days 27-29, dashed baseline clearly shows the spike |
| **4** | Toggle **"Show 7-Day AI Forecast"** | Charts switch to historical + dashed ML forecast line |
| **5** | View **Impact Summary** cards | ₹594K cost · 21,000 kg CO₂ · 998 trees · 84,000 km car travel |
| **6** | Compare on **Leaderboard** | Block C ranked 🥉 at 73.0 vs Block A's 🥇 92.9 — competitive gap visible |
| **7** | Switch to **Block A** | Alerts disappear, charts are stable, score is 92.9 — the "gold standard" |
| **8** | Switch to **Block B** | Water chart shows mid-month spike (leak detection on days 10-12) |

**Narrative arc:** Problem detection → AI quantification → Emotional impact → Competitive motivation → Behavioral change signal.

<br/>

---

<br/>

## 🔮 Roadmap

| Phase | Feature | Status |
|:------|:--------|:------:|
| **v1.0** | Core dashboard + anomaly detection + scoring + leaderboard | ✅ Complete |
| **v1.1** | IoT smart meter integration (MQTT/WebSocket real-time ingestion) | 🔲 Planned |
| **v1.2** | Advanced ML models (ARIMA, Prophet) for seasonal forecasting | 🔲 Planned |
| **v1.3** | Per-room granularity with sub-block analytics | 🔲 Planned |
| **v1.4** | Real-time WebSocket streaming dashboard (no polling) | 🔲 Planned |
| **v1.5** | GenAI integration — LLM-driven dynamic sustainability recommendations | 🔲 Planned |
| **v2.0** | Mobile companion app (React Native) with push notifications | 🔲 Planned |
| **v2.1** | Edge AI — on-device anomaly detection at the meter level | 🔲 Planned |

<br/>

---

<br/>

## 📜 License

```
MIT License

Copyright (c) 2026 Krish Goyal & Abhinav Atul

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

<br/>

---

<br/>

## 🙌 Acknowledgments

- [**FastAPI**](https://fastapi.tiangolo.com/) — High-performance Python API framework
- [**Chart.js**](https://www.chartjs.org/) — Flexible canvas-based charting
- [**scikit-learn**](https://scikit-learn.org/) — Machine learning toolkit
- [**React**](https://react.dev/) — Component-driven UI library
- [**AMD Slingshot Hackathon 2026**](https://www.amd.com/) — Inspiration and event platform
- Sustainability research from [IPCC](https://www.ipcc.ch/) and [CEA India](https://cea.nic.in/) for emission factors

<br/>

---

<br/>

<div align="center">

**GreenPulse** is not just a dashboard — it is a **behavioral intelligence system** that converts invisible resource waste into **measurable climate action**.

<br/>

Built with precision. Designed for impact. 🌱

<br/>

⭐ **Star this repo** if you believe in data-driven sustainability.

</div>