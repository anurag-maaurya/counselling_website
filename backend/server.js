import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai"; // ✅ NEW: Import the Google GenAI SDK
import studentRoutes from "./routes/studentRoutes.js";

import aiRoutes from "./routes/aiRoutes.js";
app.use("/api", aiRoutes);


dotenv.config();

const app = express();

// ✅ Initialize the Gemini Client with the API Key
// This should be done once outside the route handler
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY); 

// ✅ CORS setup (fix for all browsers + production)
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app", // ✅ Your frontend domain
      "http://localhost:5173",    // ✅ Local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// 🧠 Gemini Route — UPDATED to use Node.js SDK for reliability
app.post("/api/gemini-college-review", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    // Define the system instruction separately for better control
    const systemInstruction = "Act as a college counselor for Indian engineering colleges. Provide an objective review in markdown format with sections like Ranking, Courses, Placements, Location.";
    
    // 💡 Use the SDK's generateContent method
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Using the model you specified
      contents: [
        {
          role: "user",
          parts: [{ text: `College: ${prompt}` }], // The user's query
        },
      ],
      config: {
        systemInstruction: systemInstruction,
        // Using Google Search grounding tool to ensure factual results
        tools: [{ "google_search": {} }], 
      }
    });

    // Extract the text safely from the SDK response
    const text = 
      response?.text || 
      "Sorry, I couldn't fetch the review right now. The API might be facing an issue. Please try again later or refine your college name.";

    res.json({ text });
  } catch (error) {
    // Log the error for server-side debugging
    console.error("❌ Gemini API Error (Using SDK):", error); 
    res.status(500).json({
      message:
        "An unexpected server error occurred while fetching the review. Please check your API key and server logs.",
    });
  }
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api/students", studentRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server working fine ✅");
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
