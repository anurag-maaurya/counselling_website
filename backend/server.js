import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS fix — works both on localhost & Vercel
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (you can restrict below)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// ✅ Optional: Restrict to your frontend
app.use(
  cors({
    origin: ["https://stbg1.vercel.app", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ AI Route
app.post("/api/college-review", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction =
      "You are an expert Indian college counselor. Provide factual, structured reviews with sections: Ranking, Courses, Placements, Location, Campus Life.";

    const result = await model.generateContent([
      { role: "user", parts: [{ text: `${systemInstruction}\nCollege: ${prompt}` }] },
    ]);

    const text =
      result?.response?.text() ||
      "Sorry, I couldn’t fetch the review right now. Please try again later.";

    res.json({ text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ message: "Gemini API request failed", error });
  }
});

// ✅ Students route
app.use("/api/students", studentRoutes);

// ✅ Test route
app.get("/", (req, res) => res.send("✅ Server Working Fine!"));

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app; // ✅ Needed for Vercel deployment
