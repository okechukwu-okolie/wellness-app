import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-bold text-lg text-green-700">
            WellnessApp
          </Link>
          <Link to="/tracker" className="text-sm text-gray-600">
            Tracker
          </Link>
          <Link to="/goals" className="text-sm text-gray-600">
            Goals
          </Link>
          <Link to="/community" className="text-sm text-gray-600">
            Community
          </Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">
                {user.displayName || user.email}
              </span>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="text-sm text-gray-700">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
