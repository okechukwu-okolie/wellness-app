require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Tracking = require("./models/Tracking");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Tracking.deleteMany({});

  const pass = await bcrypt.hash("password", 10);
  const u = await User.create({
    email: "demo@wellness.app",
    passwordHash: pass,
    displayName: "Demo User",
    activityLevel: "moderate",
    points: 100,
  });
  await Tracking.create({
    user: u._id,
    steps: 2500,
    sleepHours: 6,
    mood: "tired",
    nutrition: { mealType: "lunch", category: "neutral" },
  });
  console.log("Seed complete. User: demo@wellness.app / password");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
