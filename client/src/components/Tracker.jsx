import React, { useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Tracker() {
  const [steps, setSteps] = useState(0);
  const [mood, setMood] = useState("neutral");
  const [entries, setEntries] = useState([]);

  async function load() {
    try {
      const res = await API.get("/tracking");
      setEntries(res.data);
    } catch (e) {}
  }
  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      await API.post("/tracking", { steps, mood });
      toast.success("Saved");
      setSteps(0);
      load();
    } catch (e) {
      toast.error("Failed");
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Quick Log</h3>
      <form onSubmit={submit} className="flex gap-2 mt-3">
        <input
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="p-2 border rounded"
          placeholder="steps"
        />
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="happy">happy</option>
          <option value="neutral">neutral</option>
          <option value="tired">tired</option>
          <option value="stressed">stressed</option>
        </select>
        <button className="bg-green-600 text-white px-4 rounded">Save</button>
      </form>

      <div className="mt-6">
        <h4 className="font-semibold">Recent entries</h4>
        <ul className="mt-2 space-y-2">
          {entries.map((e) => (
            <li key={e._id} className="p-2 border rounded">
              {new Date(e.date).toLocaleDateString()} — Steps: {e.steps} — Mood:{" "}
              {e.mood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
