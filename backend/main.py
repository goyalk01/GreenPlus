from fastapi import FastAPI, HTTPException
import os
import pandas as pd
from utils import analyze_block, get_leaderboard
from fastapi.middleware.cors import CORSMiddleware

# ── App init ─────────────────────────────────────────────────────
app = FastAPI(
    title       = "GreenPulse API 🌱",
    description = "AI Campus Sustainability Copilot — AMD Slingshot 2026",
    version     = "1.0.0",
)

# ── CORS (Production Ready) ──────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["http://localhost:3000"],   # ← replace with Vercel URL after deploy
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)

# ── Global Data Load (Runs once at startup) ──────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data.csv")
try:
    df = pd.read_csv(DATA_PATH)
except Exception as e:
    df = pd.DataFrame() # Fallback if missing during init
    print(f"Warning: Could not load data.csv: {e}")

# ════════════════════════════════════════════════════════════════
# ROUTES
# ════════════════════════════════════════════════════════════════

@app.get("/")
def root():
    return {"status": "GreenPulse API running 🌱", "version": "1.0.0"}

@app.get("/health")
def health():
    if df.empty:
        raise HTTPException(status_code=500, detail="Data not loaded properly.")
    return {
        "status":      "ok",
        "rows_loaded": len(df),
        "blocks":      sorted(df["block"].unique().tolist()),
    }

@app.get("/block/{block_name}")
def get_block(block_name: str):
    block_name = block_name.upper().strip()
    if block_name not in ["A", "B", "C"]:
        raise HTTPException(
            status_code=404, detail=f"Block '{block_name}' not found. Valid options: A, B, C."
        )
    return analyze_block(df, block_name)

@app.get("/leaderboard")
def leaderboard():
    return get_leaderboard(df)