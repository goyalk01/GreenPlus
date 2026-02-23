import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { buildLineData, buildForecastData, chartOpts } from "../utils/chartHelpers";

export default function ChartsGrid({ data, forecast, setForecast }) {
  const {
    dates, electricity, water, food, electricity_baseline, electricity_alerts,
    water_baseline, water_alerts, food_alerts, elec_forecast, water_forecast, peak_elec_idx
  } = data;

  return (
    <>
      <label className="forecast-toggle">
        <input type="checkbox" checked={forecast} onChange={(e) => setForecast(e.target.checked)} />
        Show 7-Day AI Forecast
      </label>

      <div className="charts-grid">
        
        {/* Electricity Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>⚡ Electricity (kWh)</h3>
            <span className={`badge badge-${electricity_alerts.at(-1)?.toLowerCase()}`}>{electricity_alerts.at(-1)}</span>
          </div>
          <Line data={forecast ? buildForecastData("Electricity", electricity, elec_forecast, dates, "#4ade80") : buildLineData("Electricity (kWh)", electricity, dates, electricity_baseline, electricity_alerts, "#4ade80")} options={chartOpts("kWh")} />
          <p className="chart-note">📌 Peak: {electricity[peak_elec_idx]} kWh on {dates[peak_elec_idx]}</p>
        </div>

        {/* Water Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>💧 Water (m³)</h3>
            <span className={`badge badge-${water_alerts.at(-1)?.toLowerCase()}`}>{water_alerts.at(-1)}</span>
          </div>
          <Line data={forecast ? buildForecastData("Water", water, water_forecast, dates, "#38bdf8") : buildLineData("Water (m³)", water, dates, water_baseline, water_alerts, "#38bdf8")} options={chartOpts("m³")} />
        </div>

        {/* Food Waste Chart */}
        <div className="chart-card chart-full">
          <div className="chart-header">
            <h3>🍛 Food Waste (kg)</h3>
            <span className={`badge badge-${food_alerts.at(-1)?.toLowerCase()}`}>{food_alerts.at(-1)}</span>
          </div>
          <Bar data={{
            labels: dates,
            datasets: [{ 
              label: "Food Waste (kg)", 
              data: food, 
              backgroundColor: food.map((_, i) => food_alerts[i] === "High" ? "#ff6b6b" : "#fb923c"), 
              borderRadius: 4 
            }]
          }} options={chartOpts("kg")} />
          <p className="chart-note">
            🔴 Red bars = abnormal waste days (&gt;20% above average)
          </p>
        </div>

      </div>
    </>
  );
}