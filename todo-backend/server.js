const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());             // Enables Cross-Origin requests
app.use(express.json());     // Parses incoming JSON requests

// Connect to MongoDB
connectDB();                 // Calls the DB connection from config/db.js

// Routes
app.use("/api", todoRoutes); // All todo APIs are prefixed with /api

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
