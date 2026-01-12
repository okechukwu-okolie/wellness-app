import React, { useEffect, useState } from "react";
import API from "../api";

export default function Recommendations() {
  const [recs, setRecs] = useState([]);
  useEffect(() => {
    async function load() {
      try {
        const res = await API.get("/recommend");
        setRecs(res.data.recs || []);
      } catch (e) {}
    }
    load();
  }, []);
  return (
    <div className="flex flex-col gap-2 mt-3">
      {recs.length === 0 && (
        <div className="text-sm text-gray-500">No recommendations yet.</div>
      )}
      {recs.map((r, i) => (
        <div key={i} className="p-3 bg-green-50 rounded">
          {r.text}
        </div>
      ))}
    </div>
  );
}
