require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/auth");
const trackingRoutes = require("./routes/tracking");
const postsRoutes = require("./routes/posts");
const goalsRoutes = require("./routes/goals");
const recommendRoutes = require("./routes/recommend");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 100 });
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/recommend", recommendRoutes);

// Ensure critical env is present
if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET is not set. Please set JWT_SECRET in server/.env or environment variables.');
  console.error('You can copy .env.example to server/.env and fill JWT_SECRET with a strong random string.');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

// simple health check
app.get("/health", (req, res) =>
  res.json({ ok: true, env: process.env.NODE_ENV || "development" })
);

connectDB()
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(
        `Server running on ${PORT} (NODE_ENV=${
          process.env.NODE_ENV || "development"
        })`
      )
    );
    server.on("error", (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Change PORT or stop the using process.`
        );
        process.exit(1);
      }
      console.error("Server error:", err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB error", err);
    process.exit(1);
  });
