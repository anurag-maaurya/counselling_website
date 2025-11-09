import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// ✅ Initialize environment variables first
dotenv.config();

const app = express();

// ✅ Allow both local and deployed frontend origins
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app/", // ✅ your live frontend on Vercel
      "http://localhost:5173", // ✅ keep this for local testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Initialize Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- 🧠 College Review AI Route ---
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

// ✅ Connect MongoDB (Atlas)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Student routes
app.use("/api/students", studentRoutes);

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Server working fine ✅");
});

// ✅ Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
