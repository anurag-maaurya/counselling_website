// routes/aiRoutes.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Initialize Gemini client
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST route to get AI review
router.post("/review", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ review: response });
  } catch (error) {
    console.error("AI Review Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
