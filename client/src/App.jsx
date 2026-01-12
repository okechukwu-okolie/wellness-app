import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Tracker from "./components/Tracker";
import Goals from "./components/Goals";
import Community from "./components/Community";
import PageWrapper from "./components/PageWrapper";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <PageWrapper page="dashboard">
                    <Dashboard />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoute>
                  <PageWrapper page="tracker">
                    <Tracker />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <PrivateRoute>
                  <PageWrapper page="goals">
                    <Goals />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/community"
              element={
                <PrivateRoute>
                  <PageWrapper page="community">
                    <Community />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PageWrapper page="login">
                  <Login />
                </PageWrapper>
              }
            />
            <Route
              path="/signup"
              element={
                <PageWrapper page="signup">
                  <Signup />
                </PageWrapper>
              }
            />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}
