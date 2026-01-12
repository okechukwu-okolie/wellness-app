const express = require("express");
const auth = require("../middleware/auth");
const Tracking = require("../models/Tracking");

const router = express.Router();

// Simple mock AI recommendations: if steps low, suggest walk; if mood low, suggest breathing
router.get("/", auth, async (req, res) => {
  try {
    const latest = await Tracking.findOne({ user: req.user._id }).sort({
      date: -1,
    });
    const recs = [];
    if (!latest || (latest.steps || 0) < 3000)
      recs.push({
        type: "activity",
        text: "Take a 15-minute walk to boost steps and mood.",
      });
    if (
      latest &&
      latest.mood &&
      ["sad", "stressed", "anxious"].includes(latest.mood)
    )
      recs.push({
        type: "mindfulness",
        text: "Try a 3-minute breathing exercise.",
      });
    if (latest && latest.sleepHours && latest.sleepHours < 6)
      recs.push({
        type: "sleep",
        text: "Aim to rest earlier tonight; try a calming routine.",
      });
    res.json({ recs });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
