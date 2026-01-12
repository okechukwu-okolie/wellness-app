const express = require("express");
const Goal = require("../models/Goal");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const g = await Goal.create({ user: req.user._id, ...req.body });
    res.json(g);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
