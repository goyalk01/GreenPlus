import React from "react";

export default function LeaderboardPanel({ block, greenpulse_score, leaderboard }) {
  const scoreColor = greenpulse_score >= 70 ? "#4ade80" : greenpulse_score >= 50 ? "#facc15" : "#f87171";
  
  return (
    <section className="leaderboard-section">
      <div className="score-card">
        <p className="score-label">GreenPulse Score</p>
        <p className="score-value" style={{ color: scoreColor }}>{greenpulse_score}</p>
        <p className="score-sub">/100</p>
        <p className="score-grade" style={{ color: scoreColor }}>
          {greenpulse_score >= 70 ? "🟢 Excellent" : greenpulse_score >= 50 ? "🟡 Moderate" : "🔴 Needs Improvement"}
        </p>
      </div>

      <div className="leaderboard-card">
        <h3>🏆 Hostel Leaderboard</h3>
        <table className="lb-table">
          <thead>
            <tr><th>Rank</th><th>Block</th><th>Score</th><th>Avg Electricity</th><th>Avg Water</th><th>Avg Food Waste</th></tr>
          </thead>
          <tbody>
            {leaderboard && leaderboard.map((row) => (
              <tr key={row.block} className={row.block === block ? "active-row" : ""}>
                <td>{row.medal} {row.rank}</td>
                <td><strong>Block {row.block}</strong></td>
                <td><span style={{ color: row.score >= 70 ? "#4ade80" : row.score >= 50 ? "#facc15" : "#f87171", fontWeight: "bold" }}>{row.score}</span></td>
                <td>{row.avg_electricity} kWh</td>
                <td>{row.avg_water} m³</td>
                <td>{row.avg_food} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}