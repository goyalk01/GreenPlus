import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Set seed so the "random" data looks the same and perfect every time
np.random.seed(42) 

def generate_robust_data():
    blocks = ["A", "B", "C"]
    
    # Generate dates for the last 30 days up to today
    start_date = datetime.today() - timedelta(days=29)
    dates = [(start_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(30)]

    data = []

    for block in blocks:
        for i, date in enumerate(dates):
            # 1. Base Usage (A is best, C is worst)
            if block == "A":
                elec = np.random.normal(410, 15)
                water = np.random.normal(160, 8)
                food = np.random.normal(55, 5)
            elif block == "B":
                elec = np.random.normal(460, 20)
                water = np.random.normal(190, 10)
                food = np.random.normal(70, 6)
            else: # Block C (The demo block with the most action)
                elec = np.random.normal(510, 25)
                water = np.random.normal(210, 12)
                food = np.random.normal(85, 8)

            # 2. Add Weekly Seasonality (Weekends = higher food, lower elec)
            is_weekend = (i % 7 >= 5)
            if is_weekend:
                elec *= 0.85  # 15% drop in electricity on weekends
                food *= 1.25  # 25% more food waste on weekends

            # 3. INJECT ANOMALIES FOR THE HACKATHON DEMO

            # Block C: End of month Electricity Spikes (triggers active Red alert on Dashboard)
            if block == "C" and i in [27, 28, 29]:
                elec += 190  # Huge AC usage spike

            # Block C: Major Food Waste incident on Day 15 (triggers the AI tip)
            if block == "C" and i == 15:
                food += 75

            # Block B: Water leak mid-month
            if block == "B" and i in [10, 11, 12]:
                water += 85

            # Block A: A random highly efficient day
            if block == "A" and i == 20:
                elec -= 80

            # Append to data list (ensure no negative numbers)
            data.append({
                "date": date,
                "block": block,
                "electricity_kwh": round(max(0, elec), 1),
                "water_m3": round(max(0, water), 1),
                "food_waste_kg": round(max(0, food), 1)
            })

    # Save to CSV
    df = pd.DataFrame(data)
    df.to_csv("data.csv", index=False)
    print("✅ PERFECT data.csv generated successfully with 90 rows of robust visualization data!")

if __name__ == "__main__":
    generate_robust_data()