import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import { GoogleGenAI } from "@google/genai";

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Enable CORS for both local and deployed frontend (no trailing slash)
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app", // your frontend on Vercel
      "http://localhost:5173", // for local testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Initialize Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- 🧠 AI College Review Route ---
app.post("/api/gemini-college-review", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res
      .status(400)
      .json({ message: "Prompt is required in the request body." });
  }

  const systemInstruction =
    "Act as a professional college counselor specializing in Indian engineering admissions. Provide a concise, objective, and factual review of the institution. Focus on NIRF ranking (if available), top branches, placement statistics (average CTC), and location advantage. Format the output using clear headings and markdown.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve AI review. Check backend logs." });
  }
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Student Routes
app.use("/api/students", studentRoutes);

// ✅ Test Root Route
app.get("/", (req, res) => {
  res.send("Server working fine ✅");
});

// ✅ Start Server (for Render / Railway / Localhost)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
