import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export default function useLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios.get(`${API}/leaderboard`)
      .then(res => setLeaderboardData(res.data))
      .catch(err => console.error("Leaderboard API error:", err));
  }, []);

  return leaderboardData;
}