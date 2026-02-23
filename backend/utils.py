import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

# ── Conversion constants ──────────────────────────────────────────
ELEC_RATE     = 8.5    # ₹/kWh  (India avg commercial rate)
WATER_RATE    = 25     # ₹/m³
FOOD_COST     = 120    # ₹/kg wasted
CO2_PER_KWH   = 0.82   # kg CO₂/kWh  (India grid emission factor)
CO2_PER_FOOD  = 2.5    # kg CO₂/kg food waste
CO2_PER_WATER = 0.3    # kg CO₂/m³
TREE_ABSORB   = 21     # kg CO₂ absorbed per tree per year
KM_PER_CO2    = 4.0    # car km equivalent per kg CO₂

# Replace the _rolling_anomaly function in utils.py with this:

def _rolling_anomaly(series):
    s = pd.Series(series)
    mean = s.mean()
    std = s.std()
    
    # Constant baseline for the chart based on overall mean
    avg_list = [round(mean, 1)] * len(s)
    
    # Deviation percentage from the mean
    dev_list = (((s - mean) / mean) * 100).round(1).tolist() if mean != 0 else [0] * len(s)
    
    alerts = []
    for val in s:
        if (val - mean) > 1.5 * std:
            alerts.append("High")
        elif (mean - val) > 1.5 * std:
            alerts.append("Low")
        else:
            alerts.append("Normal")
            
    return avg_list, dev_list, alerts

# (The rest of utils.py remains exactly the same)

# ── Helper: Linear regression forecast ──────────────────────────
def _linear_forecast(series, steps=7):
    y  = np.array(series, dtype=float)
    x  = np.arange(len(y)).reshape(-1, 1)
    lr = LinearRegression().fit(x, y)
    fx = np.arange(len(y), len(y) + steps).reshape(-1, 1)
    return [round(max(v, 0), 1) for v in lr.predict(fx)]

# ── Helper: GreenPulse Score (0–100) ────────────────────────────
def _greenpulse_score(elec_mean, water_mean, food_mean):
    """
    Compares block averages against ideal campus targets.
    Lower usage vs target = higher score.
    Weights: Electricity 40%, Water 30%, Food Waste 30%
    """
    e = max(0, min(100, 100 - (elec_mean  - 400) / 4))
    w = max(0, min(100, 100 - (water_mean - 170) / 1.7))
    f = max(0, min(100, 100 - (food_mean  - 65)  / 0.65))
    return round(0.4 * e + 0.3 * w + 0.3 * f, 1)

# ── Core: Analyze single block ───────────────────────────────────
def analyze_block(df, block):
    b  = df[df["block"] == block].sort_values("date").copy()
    el = b["electricity_kwh"].tolist()
    wa = b["water_m3"].tolist()
    fo = b["food_waste_kg"].tolist()
    dt = b["date"].tolist()

    el_base, el_dev, el_alerts = _rolling_anomaly(el)
    wa_base, wa_dev, wa_alerts = _rolling_anomaly(wa)
    _,       _,      fo_alerts = _rolling_anomaly(fo)

    total_el = sum(el); total_wa = sum(wa); total_fo = sum(fo)

    co2_el    = round(total_el * CO2_PER_KWH,   1)
    co2_fo    = round(total_fo * CO2_PER_FOOD,  1)
    co2_wa    = round(total_wa * CO2_PER_WATER, 1)
    total_co2 = round(co2_el + co2_fo + co2_wa, 1)

    cost_el = int(total_el * ELEC_RATE)
    cost_wa = int(total_wa * WATER_RATE)
    cost_fo = int(total_fo * FOOD_COST)

    score = _greenpulse_score(
        b["electricity_kwh"].mean(),
        b["water_m3"].mean(),
        b["food_waste_kg"].mean()
    )

    return {
        # ── Time series ───────────────────────────────────────
        "block":                 block,
        "dates":                 dt,
        "electricity":           [round(v, 1) for v in el],
        "water":                 [round(v, 1) for v in wa],
        "food":                  [round(v, 1) for v in fo],
        # ── Baselines (chart overlay) ─────────────────────────
        "electricity_baseline":  el_base,
        "water_baseline":        wa_base,
        # ── Deviations (chart tooltip) ────────────────────────
        "electricity_deviation": el_dev,
        "water_deviation":       wa_dev,
        # ── Alerts per day (chart point color) ───────────────
        "electricity_alerts":    el_alerts,
        "water_alerts":          wa_alerts,
        "food_alerts":           fo_alerts,
        # ── 7-day forecasts ───────────────────────────────────
        "elec_forecast":         _linear_forecast(el),
        "water_forecast":        _linear_forecast(wa),
        "food_forecast":         _linear_forecast(fo),
        # ── Latest day summary (alert banner) ────────────────
        "latest_alert": {
            "electricity":       el_alerts[-1],
            "water":             wa_alerts[-1],
            "elec_deviation":    el_dev[-1],
            "water_deviation":   wa_dev[-1],
        },
        # ── Cost impact (₹) ──────────────────────────────────
        "cost": {
            "electricity": cost_el,
            "water":       cost_wa,
            "food":        cost_fo,
            "total":       cost_el + cost_wa + cost_fo,
        },
        # ── CO₂ impact (kg) ──────────────────────────────────
        "co2": {
            "electricity": co2_el,
            "food":        co2_fo,
            "water":       co2_wa,
            "total":       total_co2,
        },
        # ── Emotional equivalents ─────────────────────────────
        "trees":            round(total_co2 / TREE_ABSORB, 1),
        "km_equivalent":    int(total_co2 * KM_PER_CO2),
        # ── Composite score ──────────────────────────────────
        "greenpulse_score": score,
        # ── Peak indices (chart annotation) ──────────────────
        "peak_elec_idx":    int(el.index(max(el))),
        "peak_food_idx":    int(fo.index(max(fo))),
    }

# ── Leaderboard: all blocks ranked ──────────────────────────────
def get_leaderboard(df):
    rows = []
    for block in ["A", "B", "C"]:
        b = df[df["block"] == block]
        score = _greenpulse_score(
            b["electricity_kwh"].mean(),
            b["water_m3"].mean(),
            b["food_waste_kg"].mean()
        )
        rows.append({
            "block":            block,
            "score":            score,
            "avg_electricity":  round(b["electricity_kwh"].mean(), 1),
            "avg_water":        round(b["water_m3"].mean(), 1),
            "avg_food":         round(b["food_waste_kg"].mean(), 1),
        })
    rows.sort(key=lambda x: x["score"], reverse=True)
    for i, r in enumerate(rows):
        r["rank"]  = i + 1
        r["medal"] = ["🥇", "🥈", "🥉"][i]
    return rows
