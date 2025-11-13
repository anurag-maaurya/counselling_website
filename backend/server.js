import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

// ✅ Explicit CORS setup
const allowedOrigins = [
  "https://stbg1.vercel.app", // frontend
  "http://localhost:5173",    // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests manually (important for Vercel)
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/ai", aiRoutes);
app.use("/api/students", studentRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Backend server running successfully!");
});

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Server start (for local use; Vercel ignores this)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
