import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import fetch from "node-fetch"; // ✅ explicitly import for server-side reliability

dotenv.config();
const app = express();

// ✅ Global middleware
app.use(express.json());

// ✅ CORS (compatible with all browsers + mobile)
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app", // your frontend
      "http://localhost:5173", // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🧠 Gemini Route (fixed)
app.post("/api/gemini-college-review", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "counselling-app/1.0", // ✅ important for Safari & mobile
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Act as a college counselor for Indian engineering colleges. 
Provide a short and objective review with these sections:
- Ranking
- Courses
- Placements
- Location
College: ${prompt}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return res.status(500).json({
        message: "Gemini API returned an error. Try again later.",
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Sorry, I couldn't fetch the review right now. Please try again later or refine your college name.";

    res.json({ text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({
      message:
        "Sorry, I couldn't fetch the review right now. Please try again later or refine your college name.",
    });
  }
});

// ✅ MongoDB (no change)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api/students", studentRoutes);

// ✅ Health check
app.get("/", (req, res) => res.send("Server working fine ✅"));

// ✅ Server start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
