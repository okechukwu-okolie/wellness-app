import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const { user } = useAuth();

  async function load() {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (e) {}
  }
  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      await API.post("/posts", { content: text });
      setText("");
      load();
    } catch (e) {}
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Community</h3>
      {user && (
        <form onSubmit={submit} className="mt-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Share something..."
          />
          <div className="text-right">
            <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
              Post
            </button>
          </div>
        </form>
      )}
      <ul className="mt-4 space-y-3">
        {posts.map((p) => (
          <li key={p._id} className="p-3 border rounded">
            <div className="text-sm text-gray-600">
              {p.user?.displayName || "Anonymous"}
            </div>
            <div className="mt-1">{p.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
