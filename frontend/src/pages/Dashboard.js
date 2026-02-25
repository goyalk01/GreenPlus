import React, { useState } from "react";
import useBlockData from "../hooks/useBlockData";
import useLeaderboard from "../hooks/useLeaderboard";

import Header from "../components/Header";
import AlertBanner from "../components/AlertBanner";
import AIRecommendations from "../components/AIRecommendations";
import ChartsGrid from "../components/ChartsGrid";
import ImpactSummary from "../components/ImpactSummary";
import LeaderboardPanel from "../components/LeaderboardPanel";

export default function Dashboard() {
  const [block, setBlock] = useState("C");
  const [forecast, setForecast] = useState(false);

  const { data, error, loading } = useBlockData(block);
  const leaderboard = useLeaderboard();

  if (error) {
    return (
      <div style={{ color: "#ff6b6b", padding: "40px", textAlign: "center", marginTop: "10vh" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>⚠️ Connection Error</h2>
        <p>Unable to connect to the GreenPulse server.</p>
        <p style={{ color: "#888", marginTop: "10px" }}>Ensure your FastAPI backend is running on port 8000.</p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading GreenPulse...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header block={block} setBlock={setBlock} />
      
      <main className="main">
        <AlertBanner status={data.latest_alert?.electricity} metric="⚡ Electricity" deviation={data.latest_alert?.elec_deviation} />
        <AlertBanner status={data.latest_alert?.water} metric="💧 Water" deviation={data.latest_alert?.water_deviation} />
        
        <AIRecommendations block={block} data={data} />
        <ChartsGrid data={data} forecast={forecast} setForecast={setForecast} />
        <ImpactSummary block={block} data={data} />
        <LeaderboardPanel block={block} greenpulse_score={data.greenpulse_score} leaderboard={leaderboard} />
      </main>

      <footer className="footer">
        🌱 GreenPulse — AI Campus Sustainability Copilot &nbsp;|&nbsp; AMD Slingshot 2026
      </footer>
    </div>
  );
}