// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kumaralok2472000:F6tGCjYqUapcXY9N@cluster0.wu842de.mongodb.net/todo-app?retryWrites=true&w=majority"
    );
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
