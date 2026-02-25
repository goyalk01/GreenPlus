export function buildLineData(label, values, dates, baseline, alerts, color) {
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
        pointRadius: values.map((_, i) => (alerts[i] === "High" ? 7 : 3)),
        pointBackgroundColor: values.map((_, i) =>
          alerts[i] === "High" ? "#ff4444" : color
        ),
      },
      {
        label: "Baseline Average",
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

export function buildForecastData(label, historical, forecast, dates, color) {
  const lastDate = new Date(dates[dates.length - 1]);
  const futureDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lastDate);
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });
  const allDates = [...dates, ...futureDates];
  const histPad = [...historical, ...Array(7).fill(null)];
  const forecastPad = [
    ...Array(historical.length - 1).fill(null),
    historical[historical.length - 1],
    ...forecast,
  ];
  return {
    labels: allDates,
    datasets: [
      {
        label: `${label} (Actual)`, data: histPad,
        borderColor: color, backgroundColor: color + "22",
        fill: true, tension: 0.4, pointRadius: 3, spanGaps: false,
      },
      {
        label: `${label} (Forecast)`, data: forecastPad,
        borderColor: color, borderDash: [8, 4], backgroundColor: "transparent",
        tension: 0.4, pointRadius: 3, spanGaps: false,
      },
    ],
  };
}

export const chartOpts = (unit) => ({
  responsive: true,
  plugins: {
    legend: { labels: { color: "#ccc", boxWidth: 12 } },
    tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y.toFixed(1)} ${unit}` } },
  },
  scales: {
    x: { ticks: { color: "#aaa", maxTicksLimit: 8 }, grid: { color: "#2a2d3e" } },
    y: { ticks: { color: "#aaa" }, grid: { color: "#2a2d3e" } },
  },
});
