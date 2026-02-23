import React from "react";
import StatCard from "./StatCard";

export default function ImpactSummary({ block, data }) {
  const { cost, co2, trees, km_equivalent } = data;
  return (
    <section className="impact-section">
      <h2 className="section-title">📊 30-Day Impact Summary — Hostel {block}</h2>
      <div className="impact-grid">
        <StatCard icon="💰" label="Total ₹ Cost" value={`₹${cost.total.toLocaleString()}`} sub={`Elec ₹${cost.electricity.toLocaleString()} · Water ₹${cost.water.toLocaleString()}`} color="#facc15" />
        <StatCard icon="🌍" label="CO₂ Emitted" value={`${co2.total} kg`} sub={`Elec ${co2.electricity}kg · Food ${co2.food}kg`} color="#f87171" />
        <StatCard icon="🌳" label="Trees to Offset" value={String(trees)} sub="Trees needed 1 yr to absorb this CO₂" color="#4ade80" />
        <StatCard icon="🚗" label="Car Equivalent" value={`${km_equivalent.toLocaleString()} km`} sub="Car travel equivalent of total CO₂" color="#a78bfa" />
      </div>
    </section>
  );
}