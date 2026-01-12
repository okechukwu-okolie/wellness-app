const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// helper to check JWT_SECRET
function ensureJwtSecret(req, res) {
  if (!process.env.JWT_SECRET) {
    res
      .status(500)
      .json({ message: "Server misconfiguration: JWT_SECRET missing" });
    return false;
  }
  return true;
}

router.post("/signup", async (req, res) => {
  const { email, password, displayName } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });
  if (!ensureJwtSecret(req, res)) return;
  try {
    const sanitizedEmail = String(email).trim().toLowerCase();
    const existing = await User.findOne({ email: sanitizedEmail });
    if (existing) return res.status(400).json({ message: "Email exists" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: sanitizedEmail,
      passwordHash: hash,
      displayName,
    });
    console.log("Signup: created user", user._id.toString());
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      user: { id: user._id, email: user.email, displayName: user.displayName },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err && err.message ? err.message : err);
    res
      .status(500)
      .json({ message: "Server error", detail: err && err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });
  if (!ensureJwtSecret(req, res)) return;
  try {
    const user = await User.findOne({
      email: String(email).trim().toLowerCase(),
    });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    console.log("Login: successful for user", user._id.toString());
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      user: { id: user._id, email: user.email, displayName: user.displayName },
      token,
    });
  } catch (err) {
    console.error("Login error:", err && err.message ? err.message : err);
    res
      .status(500)
      .json({ message: "Server error", detail: err && err.message });
  }
});

module.exports = router;
