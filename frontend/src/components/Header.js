import React from "react";

export default function Header({ block, setBlock }) {
  return (
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
  );
}