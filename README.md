# 🌱 GreenPulse  
## AI-Powered Campus Sustainability Copilot

<p align="center">
  <img src="https://img.shields.io/badge/AI-Anomaly%20Detection-00C853?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/FullStack-FastAPI%20%2B%20React-2962FF?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Impact-CO₂%20%2B%20₹%20Savings-FF6D00?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Hackathon-Ready-8E24AA?style=for-the-badge"/>
</p>

---

## 🌍 Overview

**GreenPulse** transforms invisible campus waste — ⚡ electricity, 💧 water, 🍛 food — into **visible, measurable impact** using AI-powered anomaly detection, predictive analytics, and behavioral nudges.

> Real-time insights → Quantified savings → Competitive sustainability culture.

Built as a **full-stack hackathon-ready prototype** with deployable architecture.

---

## 🎯 Core Value Proposition

| Most Campuses | GreenPulse Solves |
|---------------|-------------------|
| Lack block-level visibility | Live hostel dashboards |
| Static annual audits | Real-time anomaly alerts |
| No behavior → cost → emissions link | ₹ + CO₂ + emotional equivalents |

GreenPulse creates a **live feedback loop for behavior change**.

---

## 🚀 Key Features

| Feature | Description |
|----------|------------|
| ⚡ Electricity Monitoring | 30-day kWh tracking + AC spike detection + baseline overlay |
| 💧 Water Intelligence | Daily m³ tracking + leak alerts + 7-day AI forecast |
| 🍛 Food Waste Analytics | kg/day tracking + high-waste day identification |
| 💰 Cost Impact | Real-time ₹ calculation per block |
| 🌍 CO₂ Conversion | kg CO₂ → 🌳 trees equivalent → 🚗 km avoided |
| 🏆 GreenPulse Score | Weighted composite sustainability index (0–100) |
| 📊 Leaderboard | Block ranking with gamified incentives |
| 🧠 AI Engine | Rolling anomaly detection + LinearRegression forecasts |

---

## 📊 Sample Output Snapshot

| Block | Score | Avg kWh | Avg m³ | Avg kg | ₹ Cost | CO₂ |
|-------|-------|--------|--------|--------|--------|------|
| 🥇 A | 92.9 | 434 | 185 | 78 | ₹500K | 17K kg |
| 🥈 B | 84.8 | 461 | 200 | 82 | ₹537K | 19K kg |
| 🥉 C | 73.0 | 517 | 215 | 90 | ₹594K | 21K kg |

> Block C shows a detectable electricity spike → anomaly alert → quantified cost & emission impact.

---

## 🧠 AI Logic Explained

### 🔹 Anomaly Detection

```python
# 7-day rolling baseline + deviation
avg = series.rolling(7).mean()
dev = ((series - avg) / avg) * 100
alert = "High" if dev > 20 else "Normal"
```

---

### 🔹 GreenPulse Score (0–100)

```
Score = 0.4 × Electricity Efficiency
      + 0.3 × Water Efficiency
      + 0.3 × Food Waste Efficiency
```

Weighted for real-world cost + CO₂ impact dominance.

---

### 🔹 Impact Conversion

```
1 kWh ≈ 0.82 kg CO₂
1 tree absorbs ≈ 21 kg CO₂
1 kg CO₂ ≈ 4 km car travel
```

Raw numbers → Emotional equivalents.

---

## 🎮 Demo Flow (2-Minute Judge Script)

1. Select Block C  
2. Show electricity spike  
3. Alert triggers  
4. Show ₹ + CO₂ impact  
5. Convert to 🌳 + 🚗 equivalents  
6. Display leaderboard comparison  

Visual + Analytical + Emotional + Competitive.

---

## 🛠 Tech Stack

### Backend
- FastAPI  
- Pandas  
- Scikit-learn (LinearRegression)  
- Uvicorn  

### Frontend
- React 18  
- Chart.js  
- Axios  

### Data
- Simulated 30-day campus dataset  
- 3 hostel blocks  
- Injected anomaly scenarios  

### Deployment Ready
- Render (Backend)  
- Vercel (Frontend)  

---

## 📁 Project Structure

```
GreenPulse/
├── backend/
│   ├── main.py
│   ├── utils.py
│   ├── generate_data.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   ├── public/
│   └── package.json
│
└── .gitignore
```

---

## ⚙️ Local Setup (5 Minutes)

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Open:  
`http://127.0.0.1:8000/docs`

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Open:  
`http://localhost:3000`

Keep both terminals running.

---

## 🌎 Production Deployment

### Backend → Render

```
Build: pip install -r requirements.txt
Start: uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

### Frontend → Vercel

```
npm run build
```

Deploy automatically via GitHub integration.

---

## 🏆 Why This Wins Hackathons

- ✅ Real-world sustainability problem  
- ✅ Quantified measurable impact  
- ✅ Explainable AI logic  
- ✅ Behavioral science layer  
- ✅ Visual storytelling dashboard  
- ✅ Gamified leaderboard system  
- ✅ Scalable to IoT Smart Campus  

---

## 🔮 Future Scope

- IoT smart meter integration  
- Edge AI anomaly detection  
- Per-room optimization  
- Real-time dashboard streaming  
- Mobile companion app  

---

## 📜 License

MIT License © 2026 Krish Goyal

MIT License © 2026 Abhinav Atul

---

## 🙌 Acknowledgments

- FastAPI  
- Chart.js  
- Sustainability research studies  
- AMD Slingshot Hackathon Inspiration  

---

<p align="center">
  ⭐ If you like this project, consider starring the repo!
</p>

---

## 🚀 Final Statement

GreenPulse is not just a dashboard.  

It is a behavioral intelligence system that converts resource waste into measurable climate action.

Built to win. 🌱