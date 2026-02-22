import pandas as pd
import numpy as np
from datetime import datetime, timedelta

np.random.seed(42)           # fixed seed → same data every run
BLOCKS = ["A", "B", "C"]
START  = datetime(2025, 1, 1)
data   = []

for day in range(30):
    date       = START + timedelta(days=day)
    is_weekend = date.weekday() >= 5        # Sat=5, Sun=6

    for block in BLOCKS:
        # ── Base values: lower on weekends (campus less occupied) ──
        elec  = np.random.normal(460 if not is_weekend else 340, 35)
        water = np.random.normal(185 if not is_weekend else 140, 18)
        food  = np.random.normal(78  if not is_weekend else 55,   8)

        # ── Block-specific baseline offsets (C is worst, B is mid) ──
        if block == "B": elec += 30;  water += 15
        if block == "C": elec += 70;  water += 30;  food += 12

        # ── Inject electricity spikes: Block C on days 14, 21, 27 ──
        if block == "C" and day in [14, 21, 27]:
            elec += 200

        # ── Inject water spike: Block B day 18 (simulates a leak) ──
        if block == "B" and day == 18:
            water += 100

        # ── Friday food event spikes (days 4, 11, 18, 25) ──
        if day in [4, 11, 18, 25]:
            food += 22

        data.append([
            date.strftime("%Y-%m-%d"), block,
            round(max(elec,  80), 2),   # floor at 80  kWh
            round(max(water, 40), 2),   # floor at 40  m³
            round(max(food,  10), 2),   # floor at 10  kg
        ])

df = pd.DataFrame(data, columns=[
    "date", "block", "electricity_kwh", "water_m3", "food_waste_kg"
])
df.to_csv("data.csv", index=False)
print(f"✅ Generated {len(df)} rows → data.csv")