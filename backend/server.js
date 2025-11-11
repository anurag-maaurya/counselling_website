import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Enable CORS for all trusted origins (Safari, iPhone, Android supported)
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app", // your deployed frontend
      "http://localhost:5173",    // for local testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🧠 AI College Review Route (Fixed version for cross-browser support)
app.post("/api/gemini-college-review", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
        Act as a professional college counselor specializing in Indian engineering admissions. 
        Provide a concise, factual, and objective review of the institution. 
        Focus on NIRF ranking (if available), top branches, placement statistics (average CTC), 
        and location advantage. Use clear headings and markdown format.
      `,
    });

    const result = await model.generateContent(prompt);
    const text = result?.response?.text() || "No review generated.";

    res.json({ text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({
      message:
        "Sorry, I couldn't fetch the review right now. Please try again later.",
    });
  }
});

// ✅ Student Routes (unchanged — DB works as before)
app.use("/api/students", studentRoutes);

// ✅ MongoDB Connection (unchanged)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Server working fine ✅");
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
