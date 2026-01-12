const express = require("express");
const Tracking = require("../models/Tracking");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const entry = await Tracking.create({ user: req.user._id, ...req.body });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const items = await Tracking.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
