from fastapi import FastAPI, HTTPException
import pandas as pd
from utils import analyze_block, get_leaderboard
from fastapi.middleware.cors import CORSMiddleware

# ── App init ─────────────────────────────────────────────────────
app = FastAPI(
    title       = "GreenPulse API 🌱",
    description = "AI Campus Sustainability Copilot — AMD Slingshot 2026",
    version     = "1.0.0",
)

# ── CORS (allow React frontend to call this API) ─────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["*"],   # ← replace with Vercel URL after deploy
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)

# ── Helper: load CSV once per request ────────────────────────────
def load_data():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DATA_PATH = os.path.join(BASE_DIR, "data.csv")
    return pd.read_csv(DATA_PATH)

# ════════════════════════════════════════════════════════════════
# ROUTES
# ════════════════════════════════════════════════════════════════

# 1. Root — sanity check
@app.get("/")
def root():
    return {
        "status":  "GreenPulse API running 🌱",
        "version": "1.0.0",
    }

# 2. Health check — confirms CSV loaded + blocks present
@app.get("/health")
def health():
    try:
        df = load_data()
        return {
            "status":      "ok",
            "rows_loaded": len(df),
            "blocks":      sorted(df["block"].unique().tolist()),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Data load failed: {str(e)}")

# 3. Block analysis — main endpoint
@app.get("/block/{block_name}")
def get_block(block_name: str):
    """
    Returns full 30-day analysis for a hostel block.
    Includes: time-series, anomaly alerts, forecasts,
              CO₂, cost, GreenPulse Score, emotional equivalents.
    """
    block_name = block_name.upper().strip()

    if block_name not in ["A", "B", "C"]:
        raise HTTPException(
            status_code = 404,
            detail      = f"Block '{block_name}' not found. Valid options: A, B, C."
        )

    df = load_data()
    return analyze_block(df, block_name)

# 4. Leaderboard — all blocks ranked by GreenPulse Score
@app.get("/leaderboard")
def leaderboard():
    """
    Returns all 3 blocks ranked by composite GreenPulse Score.
    Includes medal, rank, averages for electricity/water/food.
    """
    df = load_data()
    return get_leaderboard(df)
