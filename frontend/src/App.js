import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "./App.css";

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, Filler
);

const API = process.env.REACT_APP_API_URL || "https://greenpulse-b41g.onrender.com";

// ── Alert Banner ─────────────────────────────────────────────────
function AlertBanner({ status, metric, deviation }) {
  if (status === "Normal") return null;
  const isHigh = status === "High";
  return (
    <div className={`alert-banner ${isHigh ? "alert-high" : "alert-low"}`}>
      <span className="alert-icon">{isHigh ? "⚠️" : "ℹ️"}</span>
      <span>
        <strong>{metric} {status} Usage Detected</strong>
        {" — "}{Math.abs(deviation).toFixed(1)}%{" "}
        {isHigh ? "above" : "below"} 7-day average
      </span>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `3px solid ${color}` }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

// ── Chart data builders ──────────────────────────────────────────
function buildLineData(label, values, dates, baseline, alerts, color) {
  return {
    labels: dates,
    datasets: [
      {
        label,
        data: values,
        borderColor: color,
        backgroundColor: color + "22",
        fill: true,
        tension: 0.4,
        pointRadius: values.map((_, i) => alerts[i] === "High" ? 7 : 3),
        pointBackgroundColor: values.map((_, i) =>
          alerts[i] === "High" ? "#ff4444" : color
        ),
      },
      {
        label: "7-Day Baseline",
        data: baseline,
        borderColor: "#555",
        borderDash: [6, 3],
        borderWidth: 1.5,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };
}

function buildForecastData(label, historical, forecast, dates, color) {
  const lastDate = new Date(dates[dates.length - 1]);
  const futureDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lastDate);
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });
  const allDates    = [...dates, ...futureDates];
  const histPad     = [...historical, ...Array(7).fill(null)];
  const forecastPad = [
    ...Array(historical.length - 1).fill(null),
    historical[historical.length - 1],
    ...forecast,
  ];
  return {
    labels: allDates,
    datasets: [
      {
        label: `${label} (Actual)`,
        data: histPad,
        borderColor: color,
        backgroundColor: color + "22",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        spanGaps: false,
      },
      {
        label: `${label} (Forecast)`,
        data: forecastPad,
        borderColor: color,
        borderDash: [8, 4],
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 3,
        spanGaps: false,
      },
    ],
  };
}

const chartOpts = (unit) => ({
  responsive: true,
  plugins: {
    legend: { labels: { color: "#ccc", boxWidth: 12 } },
    tooltip: {
      callbacks: { label: (ctx) => `${ctx.parsed.y.toFixed(1)} ${unit}` },
    },
  },
  scales: {
    x: { ticks: { color: "#aaa", maxTicksLimit: 8 }, grid: { color: "#2a2d3e" } },
    y: { ticks: { color: "#aaa" },                   grid: { color: "#2a2d3e" } },
  },
});

// ── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [block,       setBlock]       = useState("C");
  const [data,        setData]        = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [forecast,    setForecast]    = useState(false);

  useEffect(() => {
    setLoading(true);
    setData(null);
    Promise.all([
      axios.get(`${API}/block/${block}`),
      axios.get(`${API}/leaderboard`),
    ])
      .then(([bRes, lRes]) => {
        setData(bRes.data);
        setLeaderboard(lRes.data);
      })
      .catch((err) => console.error("API error:", err))
      .finally(() => setLoading(false));
  }, [block]);

  // Loading screen
  if (loading || !data) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading GreenPulse...</p>
      </div>
    );
  }

  // Destructure all API fields
  const {
    dates, electricity, water, food,
    electricity_baseline, electricity_alerts,
    water_baseline, water_alerts, food_alerts,
    elec_forecast, water_forecast, food_forecast,
    electricity_deviation, water_deviation,
    latest_alert, cost, co2,
    trees, km_equivalent, greenpulse_score,
    peak_elec_idx, peak_food_idx,
  } = data;

  const scoreColor =
    greenpulse_score >= 70 ? "#4ade80" :
    greenpulse_score >= 50 ? "#facc15" : "#f87171";

  return (
    <div className="app">

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🌱</span>
          <span className="logo-text">GreenPulse</span>
          <span className="logo-sub">AI Campus Sustainability Copilot</span>
        </div>
        <div className="block-selector">
          {["A", "B", "C"].map((b) => (
            <button
              key={b}
              className={`block-btn ${block === b ? "active" : ""}`}
              onClick={() => setBlock(b)}
            >
              Hostel {b}
            </button>
          ))}
        </div>
      </header>

      <main className="main">

        {/* ── Alert Banners ─────────────────────────────────── */}
        <AlertBanner
          status={latest_alert.electricity}
          metric="⚡ Electricity"
          deviation={latest_alert.elec_deviation}
        />
        <AlertBanner
          status={latest_alert.water}
          metric="💧 Water"
          deviation={latest_alert.water_deviation}
        />

        {/* ── AI Recommendations ────────────────────────────── */}
        {latest_alert.electricity === "High" && (
          <div className="recommendation">
            💡 <strong>AI Suggestion:</strong> Block {block} AC usage is{" "}
            {latest_alert.elec_deviation.toFixed(1)}% above optimal.
            Raising AC setpoint by 1°C cuts electricity ~6% →{" "}
            <strong>saves ₹{Math.round(cost.electricity * 0.06).toLocaleString()}/month</strong>
          </div>
        )}
        {dates[peak_food_idx] && (
          <div className="recommendation food-tip">
            🍛 <strong>AI Insight:</strong> Highest food waste on{" "}
            <strong>{dates[peak_food_idx]}</strong> ({food[peak_food_idx]} kg).
            Reduce portion size by 10% →{" "}
            <strong>save ~{Math.round(food[peak_food_idx] * 0.1)} kg/day</strong>
          </div>
        )}

        {/* ── Forecast Toggle ───────────────────────────────── */}
        <label className="forecast-toggle">
          <input
            type="checkbox"
            checked={forecast}
            onChange={(e) => setForecast(e.target.checked)}
          />
          Show 7-Day AI Forecast
        </label>

        {/* ── Charts ────────────────────────────────────────── */}
        <div className="charts-grid">

          {/* Electricity */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>⚡ Electricity (kWh)</h3>
              <span className={`badge badge-${electricity_alerts.at(-1).toLowerCase()}`}>
                {electricity_alerts.at(-1)}
              </span>
            </div>
            <Line
              data={
                forecast
                  ? buildForecastData("Electricity", electricity, elec_forecast, dates, "#4ade80")
                  : buildLineData("Electricity (kWh)", electricity, dates,
                      electricity_baseline, electricity_alerts, "#4ade80")
              }
              options={chartOpts("kWh")}
            />
            <p className="chart-note">
              📌 Peak: {electricity[peak_elec_idx]} kWh on {dates[peak_elec_idx]}
            </p>
          </div>

          {/* Water */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>💧 Water (m³)</h3>
              <span className={`badge badge-${water_alerts.at(-1).toLowerCase()}`}>
                {water_alerts.at(-1)}
              </span>
            </div>
            <Line
              data={
                forecast
                  ? buildForecastData("Water", water, water_forecast, dates, "#38bdf8")
                  : buildLineData("Water (m³)", water, dates,
                      water_baseline, water_alerts, "#38bdf8")
              }
              options={chartOpts("m³")}
            />
          </div>

          {/* Food Waste — full width */}
          <div className="chart-card chart-full">
            <div className="chart-header">
              <h3>🍛 Food Waste (kg)</h3>
              <span className={`badge badge-${food_alerts.at(-1).toLowerCase()}`}>
                {food_alerts.at(-1)}
              </span>
            </div>
            <Bar
              data={{
                labels: dates,
                datasets: [{
                  label: "Food Waste (kg)",
                  data: food,
                  backgroundColor: food.map((_, i) =>
                    food_alerts[i] === "High" ? "#ff6b6b" : "#fb923c"
                  ),
                  borderRadius: 4,
                }],
              }}
              options={chartOpts("kg")}
            />
            <p className="chart-note">
              🔴 Red bars = abnormal waste days (&gt;20% above average)
            </p>
          </div>
        </div>

        {/* ── Impact Panel ──────────────────────────────────── */}
        <section className="impact-section">
          <h2 className="section-title">
            📊 30-Day Impact Summary — Hostel {block}
          </h2>
          <div className="impact-grid">
            <StatCard
              icon="💰" label="Total ₹ Cost"
              value={`₹${cost.total.toLocaleString()}`}
              sub={`Elec ₹${cost.electricity.toLocaleString()} · Water ₹${cost.water.toLocaleString()} · Food ₹${cost.food.toLocaleString()}`}
              color="#facc15"
            />
            <StatCard
              icon="🌍" label="CO₂ Emitted"
              value={`${co2.total} kg`}
              sub={`Elec ${co2.electricity}kg · Food ${co2.food}kg · Water ${co2.water}kg`}
              color="#f87171"
            />
            <StatCard
              icon="🌳" label="Trees to Offset"
              value={String(trees)}
              sub="Trees needed 1 yr to absorb this CO₂"
              color="#4ade80"
            />
            <StatCard
              icon="🚗" label="Car Equivalent"
              value={`${km_equivalent.toLocaleString()} km`}
              sub="Car travel equivalent of total CO₂"
              color="#a78bfa"
            />
          </div>
        </section>

        {/* ── Score + Leaderboard ───────────────────────────── */}
        <section className="leaderboard-section">

          <div className="score-card">
            <p className="score-label">GreenPulse Score</p>
            <p className="score-value" style={{ color: scoreColor }}>
              {greenpulse_score}
            </p>
            <p className="score-sub">/100</p>
            <p className="score-grade" style={{ color: scoreColor }}>
              {greenpulse_score >= 70 ? "🟢 Excellent"
               : greenpulse_score >= 50 ? "🟡 Moderate"
               : "🔴 Needs Improvement"}
            </p>
          </div>

          <div className="leaderboard-card">
            <h3>🏆 Hostel Leaderboard</h3>
            <table className="lb-table">
              <thead>
                <tr>
                  <th>Rank</th><th>Block</th><th>Score</th>
                  <th>Avg Electricity</th><th>Avg Water</th><th>Avg Food Waste</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((row) => (
                  <tr key={row.block} className={row.block === block ? "active-row" : ""}>
                    <td>{row.medal} {row.rank}</td>
                    <td><strong>Block {row.block}</strong></td>
                    <td>
                      <span style={{
                        color: row.score >= 70 ? "#4ade80" : row.score >= 50 ? "#facc15" : "#f87171",
                        fontWeight: "bold",
                      }}>
                        {row.score}
                      </span>
                    </td>
                    <td>{row.avg_electricity} kWh</td>
                    <td>{row.avg_water} m³</td>
                    <td>{row.avg_food} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </main>

      <footer className="footer">
        🌱 GreenPulse — AI Campus Sustainability Copilot &nbsp;|&nbsp; AMD Slingshot 2026
      </footer>
    </div>
  );
}