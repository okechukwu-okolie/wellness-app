require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  // If bypass mode is enabled, attach a guest user and continue
  if (process.env.BYPASS_AUTH === "true") {
    try {
      const guestEmail = process.env.GUEST_EMAIL || "guest@local";
      const guest = await User.findOneAndUpdate(
        { email: guestEmail },
        { $setOnInsert: { displayName: "Guest", email: guestEmail } },
        { upsert: true, new: true }
      ).select("-passwordHash");
      req.user = guest;
      return next();
    } catch (err) {
      console.error("BYPASS_AUTH failed:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });
  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select("-passwordHash");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
