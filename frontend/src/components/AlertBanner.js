import React from "react";

export default function AlertBanner({ status, metric, deviation }) {
  if (status === "Normal" || !status) return null;
  const isHigh = status === "High";
  return (
    <div className={`alert-banner ${isHigh ? "alert-high" : "alert-low"}`}>
      <span className="alert-icon">{isHigh ? "⚠️" : "ℹ️"}</span>
      <span>
        <strong>{metric} {status} Usage Detected</strong>
        {" — "}{Math.abs(deviation).toFixed(1)}% {isHigh ? "above" : "below"} average
      </span>
    </div>
  );
}