const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String,  unique: true },//required: true,
  passwordHash: { type: String, },// required: true
  displayName: { type: String },
  age: { type: Number },
  gender: { type: String },
  goals: { type: String },
  activityLevel: {
    type: String,
    enum: ["low", "moderate", "high"],
    default: "moderate",
  },
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
