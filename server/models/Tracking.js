const mongoose = require("mongoose");

const TrackingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  steps: { type: Number, default: 0 },
  sleepHours: { type: Number, default: 0 },
  mood: { type: String },
  nutrition: {
    mealType: String,
    category: String,
    notes: String,
  },
  activities: [{ type: String }],
});

module.exports = mongoose.model("Tracking", TrackingSchema);
