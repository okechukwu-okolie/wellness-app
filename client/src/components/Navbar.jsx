import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup");

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-bold text-lg text-green-700">
            WellnessApp
          </Link>

          {/* Desktop Navigation - hide on auth pages */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/tracker"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Tracker
              </Link>
              <Link
                to="/goals"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Goals
              </Link>
              <Link
                to="/community"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Community
              </Link>
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* On auth pages show only Login/Signup (no hamburger) */}
          {isAuthPage ? (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-gray-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Auth Section */}
              <div className="hidden md:flex">
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-700">
                      {user.displayName || user.email}
                    </span>
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      className="text-sm text-gray-700 hover:text-gray-800"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Menu - hidden on auth pages */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu - right-side transparent overlay */}
      {!isAuthPage && mobileMenuOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full w-64 z-40 pointer-events-auto">
          <div
            className="h-full flex flex-col p-4 gap-2 text-gray-800"
            style={{ background: "transparent" }}
          >
            <Link
              to="/tracker"
              className="text-sm text-gray-800 py-2 px-2 rounded hover:bg-gray-100"
              onClick={handleNavClick}
            >
              Tracker
            </Link>
            <Link
              to="/goals"
              className="text-sm text-gray-800 py-2 px-2 rounded hover:bg-gray-100"
              onClick={handleNavClick}
            >
              Goals
            </Link>
            <Link
              to="/community"
              className="text-sm text-gray-800 py-2 px-2 rounded hover:bg-gray-100"
              onClick={handleNavClick}
            >
              Community
            </Link>
            <hr className="my-2" />
            {user ? (
              <div className="flex flex-col gap-2 mt-auto">
                <span className="text-sm text-gray-800 py-2 px-2">
                  {user.displayName || user.email}
                </span>
                <button
                  className="w-full text-left px-2 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => {
                    logout();
                    handleNavClick();
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  to="/login"
                  className="text-sm text-gray-800 py-2 px-2 rounded hover:bg-gray-100"
                  onClick={handleNavClick}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="w-full text-center px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleNavClick}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
