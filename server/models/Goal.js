const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: String,
  targetValue: Number,
  currentValue: { type: Number, default: 0 },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Goal", GoalSchema);
