import React, { useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Goals() {
  const [title, setTitle] = useState("");
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get("/goals");
        setGoals(res.data);
      } catch (e) {}
    }
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      await API.post("/goals", { title });
      toast.success("Goal added");
      setTitle("");
      const res = await API.get("/goals");
      setGoals(res.data);
    } catch (e) {
      toast.error("Failed");
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Goals</h3>
      <form onSubmit={submit} className="flex gap-2 mt-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded flex-1"
          placeholder="New goal (e.g., Walk 30 min/day)"
        />
        <button className="bg-green-600 text-white px-4 rounded">Add</button>
      </form>
      <ul className="mt-4 space-y-2">
        {goals.map((g) => (
          <li key={g._id} className="p-2 border rounded">
            {g.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
