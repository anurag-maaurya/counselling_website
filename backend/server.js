import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app", // frontend (Vercel)
      "http://localhost:5173",    // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/students", studentRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend is running fine without AI!");
});

// ✅ Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
