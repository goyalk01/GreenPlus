import React from "react";

export default function AIRecommendations({ block, data }) {
  const { latest_alert, cost, dates, peak_food_idx, food } = data;

  return (
    <>
      {latest_alert?.electricity === "High" && (
        <div className="recommendation">
          💡 <strong>AI Suggestion:</strong> Block {block} AC usage is {(latest_alert?.elec_deviation || 0).toFixed(1)}% above optimal. 
          Raising AC setpoint by 1°C cuts electricity ~6% → <strong>saves ₹{Math.round(cost.electricity * 0.06).toLocaleString()}/month</strong>
        </div>
      )}
      {dates[peak_food_idx] && (
        <div className="recommendation food-tip">
          🍛 <strong>AI Insight:</strong> Highest food waste on <strong>{dates[peak_food_idx]}</strong> ({food[peak_food_idx]} kg).
          Reduce portion size by 10% → <strong>save ~{Math.round(food[peak_food_idx] * 0.1)} kg/day</strong>
        </div>
      )}
    </>
  );
}