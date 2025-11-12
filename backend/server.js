import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Correct import
import studentRoutes from "./routes/studentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Initialize Gemini client (use correct class name)
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app", // ✅ Deployed frontend
      "http://localhost:5174",    // ✅ Local frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Gemini AI Route
app.post("/api/gemini-college-review", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction =
      "Act as a professional college counselor for Indian colleges. Provide objective markdown format reviews with sections like Ranking, Courses, Placements, and Location.";

    const result = await model.generateContent([
      { text: `${systemInstruction}\n\nCollege: ${prompt}` },
    ]);

    const text =
      result?.response?.text() ||
      "Sorry, I couldn't fetch the review right now. Please try again later.";

    res.json({ text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({
      message:
        "Server error while fetching college review. Please check API key or logs.",
    });
  }
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Other routes
app.use("/api/students", studentRoutes);
app.use("/api", aiRoutes);

// ✅ Health check
app.get("/", (req, res) => res.send("Server running fine ✅"));

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
