import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ CORS fix (production + local)
app.use(
  cors({
    origin: ["https://stbg1.vercel.app", "http://localhost:5174"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Manual headers (Vercel safety net)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://stbg1.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

// ✅ Gemini route
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post("/api/college-review", async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      { role: "user", parts: [{ text: `Give college review: ${prompt}` }] },
    ]);
    res.json({ text: result.response.text() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "AI error" });
  }
});

app.get("/", (req, res) => res.send("✅ Server Working"));

export default app;
