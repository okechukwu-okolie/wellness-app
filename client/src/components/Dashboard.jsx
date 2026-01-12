import React, { useEffect, useState } from "react";
import API from "../api";
import Charts from "./Charts";
import Recommendations from "./Recommendations";

export default function Dashboard() {
  const [summary, setSummary] = useState({ steps: 0, mood: "", habits: [] });

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get("/tracking");
        const latest = res.data[0];
        setSummary({
          steps: latest?.steps || 0,
          mood: latest?.mood || "neutral",
          habits: [],
        });
      } catch (e) {
        /* ignore */
      }
    }
    load();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-white rounded p-4 shadow">
        <h3 className="font-semibold">Today</h3>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="p-3 bg-green-50 rounded">
            Steps
            <br />
            <b>{summary.steps}</b>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            Mood
            <br />
            <b>{summary.mood}</b>
          </div>
          <div className="p-3 bg-yellow-50 rounded">
            Habits
            <br />
            <b>{summary.habits.length}</b>
          </div>
        </div>
        <div className="mt-6">
          <Charts />
        </div>
      </div>
      <div className="bg-white rounded p-4 shadow">
        <h4 className="font-semibold">Recommendations</h4>
        <Recommendations />
      </div>
    </div>
  );
}
