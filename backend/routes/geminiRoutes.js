const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/college-details', async (req, res) => {
  try {
    const { collegeName } = req.body;
    if (!collegeName) {
      return res.status(400).json({ error: "College name is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Provide detailed information about ${collegeName} for students seeking admission. Include courses, eligibility, fees, and notable alumni.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ success: true, details: text });
  } catch (error) {
    console.error("Error fetching college details:", error);
    res.status(500).json({ success: false, error: "Failed to fetch college details" });
  }
});

module.exports = router;
