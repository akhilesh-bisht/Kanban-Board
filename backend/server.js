import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js"; // Import MongoDB connection

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // JSON Body Parser
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); // Enable CORS
app.use(cookieParser()); // Handle Cookies

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is Running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
