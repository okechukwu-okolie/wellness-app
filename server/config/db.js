require('dotenv').config();
const mongoose = require("mongoose");
const connect = async () => {
  try {
    require("dotenv").config();
    const uri = 'mongodb+srv://wellnessApp:wellnessApp@wellnessapp.pyj5uba.mongodb.net/?appName=wellnessApp';
    if (!uri) throw new Error("MONGO_URI not set in environment");
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    process.exit(1);
  }
};
module.exports = connect;
