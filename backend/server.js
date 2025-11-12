import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import studentRoutes from "./routes/studentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ VERY IMPORTANT — this must be before any routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // ✅ for all domains (temporary)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ OR if you want stricter CORS for your frontend only:
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Gemini AI route (keep this same)
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/gemini-college-review", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: "Prompt is required." });

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      { text: `Give college review for: ${prompt}` },
    ]);
    const text = result.response.text();
    res.json({ text });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ message: "AI error" });
  }
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/api/students", studentRoutes);
app.use("/api", aiRoutes);

app.get("/", (req, res) => res.send("Server running fine ✅"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
