import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ Gemini API setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/college-review", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt required" });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `Give a concise, factual review of the college ${prompt}. 
       Include details like location, placement record, and reputation.`
    );

    res.json({ review: result.response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: "Error fetching college review" });
  }
});

export default router;
